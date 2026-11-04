import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

// Run against an existing Storybook, or start an isolated server with --start-server.
const baseUrl = process.env.KANBAN_STORYBOOK_URL ?? 'http://127.0.0.1:6007';
const startServer = process.argv.includes('--start-server');
let server;
let browser;
let page;
let serverOutput = '';
try {
  if (startServer) {
    const url = new URL(baseUrl);
    server = spawn(
      process.execPath,
      [
        'node_modules/storybook/dist/bin/dispatcher.js',
        'dev',
        '--host',
        url.hostname,
        '--port',
        url.port,
        '--ci',
        '--no-open',
      ],
      {
        cwd: process.cwd(),
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      }
    );
    for (const stream of [server.stdout, server.stderr]) {
      stream.on('data', (chunk) => {
        serverOutput = (serverOutput + chunk).slice(-8000);
      });
    }
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      if (server.exitCode !== null)
        throw new Error(`Storybook exited: ${serverOutput}`);
      try {
        ready = (await fetch(`${baseUrl}/index.json`)).ok;
        if (ready) break;
      } catch {
        /* Wait for our server to accept requests. */
      }
      await delay(500);
    }
    assert.ok(ready, `Storybook did not become ready: ${serverOutput}`);
  }
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage({
    viewport: { width: 1550, height: 1450 },
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const open = async (story) => {
    await page.goto(
      `${baseUrl}/iframe.html?id=components-kanban--${story}&viewMode=story`
    );
    await page.waitForLoadState('networkidle');
    await page.locator('.rkk-board').first().waitFor({ state: 'visible' });
  };
  const host = (id, scope = page) =>
    scope.locator(`.rkk-column-host[data-rkk-column="${id}"]`);
  const card = (id, scope = page) =>
    scope.locator(`.rkk-card-outer[data-test-id="${id}"] .rkk-card-inner`);
  const ids = (scope) =>
    scope
      .locator('.rkk-card-outer')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-test-id'))
      );
  const assertColumn = async (id, expected) => {
    await page.waitForFunction(
      ({ id, expected }) => {
        const elements = document.querySelectorAll(
          `.rkk-column-host[data-rkk-column="${id}"] .rkk-card-outer`
        );
        return (
          JSON.stringify(
            [...elements].map((element) => element.getAttribute('data-test-id'))
          ) === JSON.stringify(expected)
        );
      },
      { id, expected }
    );
  };

  await open('plain-list');
  console.log(
    'Layout:',
    await page.locator('.rkk-column-outer').evaluateAll((elements) =>
      elements.map((element) => ({
        width: element.clientWidth,
        height: element.clientHeight,
        scroller: element.querySelector('.rkk-column-content-list')
          ?.clientHeight,
      }))
    )
  );
  assert.ok(
    await host('backlog')
      .locator('.rkk-column-content-list')
      .evaluate((element) => element.clientHeight > 100)
  );
  await card('task-1').dragTo(host('review'));
  await assertColumn('review', ['task-1']);
  await assertColumn('backlog', ['task-2']);
  const targetCardBounds = await card('task-4').boundingBox();
  await card('task-3').dragTo(card('task-4'), {
    targetPosition: { x: 50, y: targetCardBounds.height - 5 },
  });
  await assertColumn('progress', ['task-4', 'task-3']);
  // A tail self-drop must not reorder or duplicate the final card.
  const listBounds = await host('progress')
    .locator('.rkk-column-content-list')
    .boundingBox();
  await card('task-3').dragTo(
    host('progress').locator('.rkk-column-content-list'),
    { targetPosition: { x: 80, y: listBounds.height - 5 } }
  );
  await assertColumn('progress', ['task-4', 'task-3']);
  const columnBounds = await host('review').boundingBox();
  await host('backlog')
    .locator('.rkk-column-header-slot')
    .dragTo(host('review'), {
      targetPosition: { x: columnBounds.width - 5, y: 15 },
    });
  assert.deepEqual(
    await page
      .locator('.rkk-column-host')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-rkk-column'))
      ),
    ['progress', 'review', 'backlog', 'done']
  );
  console.log(
    'PASS: cross-column move, same-column reorder, tail no-op, column reorder'
  );

  await open('custom-slots');
  const before = await ids(host('backlog'));
  await card('task-1').dragTo(host('review'));
  assert.deepEqual(await ids(host('backlog')), before);
  await card('task-2').dragTo(host('review'));
  await assertColumn('review', ['task-2']);
  console.log(
    'PASS: per-type drag permission and custom wrapper/preview slots'
  );

  await open('view-only');
  await page.waitForFunction(() => !document.querySelector('[role="dialog"]'));
  await card('task-1').dragTo(host('review'));
  await assertColumn('backlog', ['task-1', 'task-2']);
  await assertColumn('review', []);
  console.log('PASS: view-only drag prevention');

  await open('many-cards');
  const mounted = await page.locator('.rkk-card-outer').count();
  assert.ok(
    mounted > 0 && mounted < 100,
    `Expected virtual rows, mounted ${mounted}`
  );
  const scroller = host('backlog').locator('.rkk-column-content-list');
  const initialIds = await ids(host('backlog'));
  await scroller.evaluate((element) => {
    element.scrollTop = 2000;
  });
  await page.waitForFunction((initial) => {
    const current = [
      ...document.querySelectorAll(
        '.rkk-column-host[data-rkk-column="backlog"] .rkk-card-outer'
      ),
    ].map((element) => element.getAttribute('data-test-id'));
    return (
      current.length > 0 && JSON.stringify(current) !== JSON.stringify(initial)
    );
  }, initialIds);
  console.log(`PASS: virtual scrolling (mounted ${mounted} of 600 cards)`);
  // Choose a fully visible card, excluding virtua's offscreen overscan rows.
  const virtualCardId = await scroller.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return [...element.querySelectorAll('.rkk-card-outer')]
      .find((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top >= bounds.top && rect.bottom <= bounds.bottom;
      })
      ?.getAttribute('data-test-id');
  });
  assert.ok(virtualCardId);
  await page.waitForFunction(
    (id) =>
      getComputedStyle(
        document.querySelector(
          `.rkk-card-outer[data-test-id="${id}"] .rkk-card-inner`
        )
      ).pointerEvents !== 'none',
    virtualCardId
  );
  await card(virtualCardId).dragTo(host('review'));
  await assertColumn('review', [virtualCardId]);
  assert.equal(await card(virtualCardId).isVisible(), true);
  console.log('PASS: virtualized cross-column native drag');
  await page.getByRole('button', { name: 'Reset board' }).click();
  await scroller.evaluate((element) => {
    element.scrollTop = 0;
  });
  await card('task-1').scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () =>
      getComputedStyle(
        document.querySelector(
          '.rkk-card-outer[data-test-id="task-1"] .rkk-card-inner'
        )
      ).pointerEvents !== 'none'
  );
  const startBounds = await card('task-1').boundingBox();
  const scrollBounds = await scroller.boundingBox();
  await page.mouse.move(startBounds.x + 40, startBounds.y + 30);
  await page.mouse.down();
  await page.mouse.move(startBounds.x + 55, startBounds.y + 45, { steps: 5 });
  await page.waitForFunction(
    () =>
      document.querySelector(
        '.rkk-card-outer[data-test-id="task-1"] .rkk-card-inner'
      )?.style.opacity === '0.6'
  );
  // Update the controlled board while a native drag is active.
  await page
    .getByRole('button', { name: 'Add ticket to Done' })
    .evaluate((button) => button.click());
  await page.mouse.move(
    scrollBounds.x + 100,
    scrollBounds.y + scrollBounds.height - 2,
    { steps: 10 }
  );
  await page.waitForFunction(
    () =>
      document.querySelector(
        '.rkk-column-host[data-rkk-column="backlog"] .rkk-column-content-list'
      ).scrollTop > 50
  );
  await page.mouse.up();
  await page
    .getByRole('status')
    .filter({ hasText: 'Moved task-1 to backlog' })
    .waitFor();
  console.log(
    'PASS: virtualized DnD, drag autoscroll, and controlled update mid-drag'
  );

  await open('isolated-boards');
  const product = page.getByRole('region', {
    name: 'Product board',
    exact: true,
  });
  const operations = page.getByRole('region', {
    name: 'Operations board',
    exact: true,
  });
  // The story play function demonstrates add isolation; reset before testing DnD.
  await product.getByRole('button', { name: 'Reset board' }).click();
  await operations.getByRole('button', { name: 'Reset board' }).click();
  await card('task-1', product).dragTo(host('review', operations));
  assert.deepEqual(await ids(host('backlog', product)), ['task-1', 'task-2']);
  assert.deepEqual(await ids(host('review', operations)), []);
  await card('task-1', product).dragTo(host('review', product));
  assert.deepEqual(await ids(host('review', product)), ['task-1']);
  assert.deepEqual(await ids(host('backlog', operations)), [
    'task-1',
    'task-2',
  ]);
  console.log('PASS: board identity isolation with reused IDs');

  await open('plain-list');
  await mkdir('test-results', { recursive: true });
  await page.screenshot({
    path: 'test-results/kanban-light.png',
    fullPage: true,
  });
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.screenshot({
    path: 'test-results/kanban-dark.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(
    await page
      .locator('.rkk-board')
      .evaluate((element) => element.scrollWidth > element.clientWidth)
  );
  await page.screenshot({
    path: 'test-results/kanban-mobile.png',
    fullPage: true,
  });
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log(
    'PASS: dark theme, mobile horizontal overflow, no runtime errors'
  );
} catch (error) {
  if (page && !page.isClosed()) {
    await mkdir('test-results', { recursive: true });
    await page.screenshot({
      path: 'test-results/kanban-failure.png',
      fullPage: true,
    });
  }
  throw error;
} finally {
  await browser?.close();
  server?.kill();
}
