/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { defineConfig, type PluginOption } from 'vite';
import dtsPlugin from 'vite-plugin-dts';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const uiComponents = [
  'alert',
  'alert-dialog',
  'avatar',
  'accordion',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'calendar',
  'carousel',
  'collapsible',
  'dialog',
  'dropdown',
  'form',
  'pagination',
  'popover',
  'scroll-area',
  'separator',
  'sheet',
  'skeleton',
  'tab',
  'table',
  'tooltip',
  'progress',
  'stepper',
  'toast',
] as const;
const compositeComponents = [
  'actions',
  'confirm',
  'datatable',
  'datepicker',
  'empty',
  'export',
  'filters',
  'form',
  'gallery',
  'kanban',
  'layout',
  'loader',
  'modal',
  'pagination',
  'scroll',
  'stat',
  'theme',
  'tooltip',
] as const;
// Namespaced under components/ so the composite `form`, `pagination` and
// `tooltip` do not collide with the atoms of the same name.
const topLevelModules = ['hooks', 'enums', 'providers', 'stores'] as const;
// The types module is intentionally absent: it exports only types, so a
// runtime entry would emit an empty chunk. It stays a types-only subpath.

const entries = {
  index: 'src/index.ts',
  ...Object.fromEntries(
    uiComponents.map((name) => [`${name}/index`, `src/ui/${name}/index.ts`])
  ),
  ...Object.fromEntries(
    compositeComponents.map((name) => [
      `components/${name}/index`,
      `src/components/${name}/index.ts`,
    ])
  ),
  ...Object.fromEntries(
    topLevelModules.map((name) => [`${name}/index`, `src/${name}/index.ts`])
  ),
  'utils/index': 'src/lib/index.ts',
};
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'i18next',
  'react-i18next',
  'react-hook-form',
];
/**
 * Emits dist/theme — the design language without Tailwind's utilities, so a
 * consumer can re-assert just the tokens and material after its own
 * stylesheet. This runs inside the build rather than as a chained npm script:
 * as `vite build && node scripts/copy-theme.cjs` it silently skipped once,
 * vite build having emptied dist first, and the app lost its theme at runtime.
 */
function emitTheme(): PluginOption {
  return {
    name: 'liquid-emit-theme',
    apply: 'build',
    closeBundle() {
      const from = resolve(dirname, 'src/styles');
      const to = resolve(dirname, 'dist/theme');
      fs.mkdirSync(to, { recursive: true });
      let n = 0;
      for (const file of fs.readdirSync(from)) {
        if (!file.endsWith('.css')) continue;
        fs.copyFileSync(resolve(from, file), resolve(to, file));
        n++;
      }
      this.info(`theme: ${n} css file(s) -> dist/theme`);
    },
  };
}

export default defineConfig({
  plugins: [
    emitTheme(),
    react(),
    tailwindcss(),
    dtsPlugin({
      include: ['src'],
      // Stories and tests are dev-only artefacts: they are not part of the
      // published API, so they are kept out of the generated .d.ts (and out of
      // the shipped tarball). This also keeps CSF story typing out of the dts
      // program, which resolves StoryObj args more strictly than tsc does.
      exclude: [
        'src/**/*.test.*',
        'src/**/*.spec.*',
        'src/**/*.stories.*',
        'src/setupTests.ts',
      ],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.build.json',
      // ← Use build config
      copyDtsFiles: true,
      rollupTypes: false,
      strictOutput: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    workspace: [
      {
        extends: true,
        test: {
          name: 'kanban',
          include: ['src/components/kanban/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
          browser: { enabled: false },
          setupFiles: ['./src/setupTests.ts'],
        },
      },
      {
        // Component unit tests outside the kanban suite. Before this project
        // existed, nothing picked them up and they never ran.
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/components/kanban/**'],
          environment: 'jsdom',
          browser: { enabled: false },
          setupFiles: ['./src/setupTests.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          // Keep browser memory bounded while isolating each story file's
          // runtime, including portal cleanup and interaction-test globals.
          fileParallelism: false,
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            isolate: true,
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  build: {
    // No JS source maps in the published tarball: they are the bulk of the
    // package size and consumers debug against their own sources, not the kit's.
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: false,
    lib: {
      entry: Object.fromEntries(
        Object.entries(entries).map(([key, value]) => [
          key,
          resolve(__dirname, value),
        ])
      ),
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: (id) =>
        external.some((ext) => id === ext || id.startsWith(`${ext}/`)),
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].es.js',
          chunkFileNames: 'chunks/[name]-[hash].es.js',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          interop: 'auto',
        },
      ],
    },
  },
});
