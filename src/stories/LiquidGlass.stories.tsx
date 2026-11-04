import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import {
  Meter,
  PlatformCard,
  PlatformMark,
  StatCard,
  StatusBadge,
} from '../components/stat';

/**
 * Liquid Glass — the design system's own reference.
 *
 * Built against the Liquid Glass spec: chrome is glass, content is a
 * solid surface, and glass only ever sits on `.lq-canvas`, whose ambient
 * beams are the thing it refracts. UI copy is Uzbek Cyrillic, as the product
 * is — sentence case, no emoji, dates DD.MM.YYYY.
 *
 * Typed as a bare `Meta`: these stories compose raw markup against the CSS
 * layer and have no single `component` to bind a generic to.
 */
const meta: Meta = {
  title: 'Design System/Liquid Glass',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/* -------------------------------------------------------------------------- */

function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="lq-canvas min-h-screen p-8">
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  );
}

const PLATFORMS = [
  { key: 'youtube', name: 'Ютуб', total: 9, ok: 9, fail: 0, people: 10 },
  {
    key: 'facebook',
    name: 'Фейсбук',
    total: 1128,
    ok: 1124,
    fail: 4,
    people: 132,
  },
  {
    key: 'instagram',
    name: 'Инстаграм',
    total: 136,
    ok: 133,
    fail: 3,
    people: 132,
  },
];

/* ------------------------------------------------------------- materials --- */

/** The two layers, side by side, on the canvas that makes them legible. */
export const Materials: Story = {
  render: () => (
    <Canvas>
      <h1 className="lq-title-1 lq-label mb-1">Икки қатлам</h1>
      <p className="lq-subheadline lq-label-2 mb-6">
        Бошқарув қатлами шишада, контент қаттиқ юзада
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="lq-glass p-6">
          <h2 className="lq-title-3 lq-label">Бошқарув</h2>
          <p className="lq-footnote lq-label-2 mt-2">
            Сайдбар, тулбар, сана майдони, сегментли бошқарув, сahifalash
          </p>
          <p className="lq-caption-1 lq-label-3 mt-4">
            .lq-glass · blur 24px · saturate 180%
          </p>
        </div>

        <div className="lq-card p-6">
          <h2 className="lq-title-3 lq-label">Контент</h2>
          <p className="lq-footnote lq-label-2 mt-2">
            Платформа карталари, графиклар, жадваллар, рўйхатлар
          </p>
          <div className="lq-tile mt-4 p-3">
            <p className="lq-caption-1 lq-label-2">
              Ичкарида плитка — радиус концентрик: 24 − 12 = 12
            </p>
          </div>
        </div>
      </div>
    </Canvas>
  ),
};

/* -------------------------------------------------------------- controls --- */

/** Every control is a capsule; only the primary action is filled. */
export const Controls: Story = {
  render: () => (
    <Canvas>
      <h1 className="lq-title-1 lq-label mb-6">Бошқарув элементлари</h1>

      <div className="lq-glass mb-6 flex flex-wrap items-center gap-3 p-5">
        <button type="button" className="lq-btn lq-btn--md lq-btn--primary">
          Нашр қилиш
        </button>
        {/* Inside a glass panel buttons go plain — glass is never stacked. */}
        <button type="button" className="lq-btn lq-btn--md lq-btn--plain">
          Батафсил кўриш
        </button>
        <button type="button" className="lq-btn lq-btn--md lq-btn--glass">
          Сана
        </button>
        <button
          type="button"
          className="lq-btn lq-btn--md lq-btn--glass"
          disabled
        >
          Ўчирилган
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button type="button" className="lq-btn lq-btn--sm lq-btn--glass">
          Кичик
        </button>
        <button type="button" className="lq-btn lq-btn--md lq-btn--glass">
          Ўрта
        </button>
        <button type="button" className="lq-btn lq-btn--lg lq-btn--glass">
          Катта
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="lq-segmented" role="tablist">
          {['Жами', 'Пост яратиш', 'Изоҳ'].map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={i === 0}
              className="lq-segmented__item"
            >
              {t}
            </button>
          ))}
        </div>
        <div className="lq-segmented" role="tablist">
          {['Кун', 'Ҳафта', 'Ой'].map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={i === 1}
              className="lq-segmented__item"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Status never travels on colour alone — StatusBadge requires its word. */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <StatusBadge>0</StatusBadge>
        <StatusBadge tone="accent" dot={false}>
          5
        </StatusBadge>
        <StatusBadge tone="green">Фаол</StatusBadge>
        <StatusBadge tone="orange">Навбатда</StatusBadge>
        <StatusBadge tone="red">Хато</StatusBadge>
        <StatusBadge dot>Офлайн</StatusBadge>
      </div>

      {/* The dot plus the name is why the platform palette is safe to use:
       * two of its hues separate by only ΔE 5.9 under protanopia, so colour
       * is never the only identifier. */}
      <div className="mb-6 flex flex-wrap gap-4">
        {(
          [
            ['youtube', 'Ютуб'],
            ['facebook', 'Фейсбук'],
            ['instagram', 'Инстаграм'],
            ['threads', 'Threads'],
            ['telegram', 'Телеграм'],
            ['x', 'X'],
            ['tiktok', 'TikTok'],
          ] as const
        ).map(([k, label]) => (
          <PlatformMark key={k} platform={k}>
            {label}
          </PlatformMark>
        ))}
      </div>

      <div className="lq-card max-w-md p-4">
        <p className="lq-caption-1 lq-label-2 mb-2">Meter</p>
        <Meter name="Лайк" value={707} maxValue={917} index={0} />
        <Meter name="Кўриш" value={210} maxValue={917} index={1} />
        <Meter name="Изоҳ" value={0} maxValue={917} index={2} />
      </div>
    </Canvas>
  ),
};

/* ------------------------------------------------------------- dashboard --- */

/** The whole arrangement: glass chrome, solid content, KPI row on canvas. */
export const Dashboard: Story = {
  render: () => (
    <Canvas>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="lq-title-1 lq-label">Бошқарув панели</h1>
          <p className="lq-footnote lq-label-2 mt-1">Мониторинг · бугун</p>
        </div>
        <div className="lq-glass lq-glass--control lq-subheadline lq-label flex items-center gap-2 px-4 py-2">
          23.10.2026 – 23.10.2026
        </div>
      </div>

      {/* KPI row sits directly on the canvas, so it takes the glass material —
       * the spec's iOS-26-widget case. */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ['Жами шахслар', 159],
          ['Жами аккаунтлар', 740],
          ['Жами қурилмалар', 101],
          ['Жами ҳаракатлар', 2512],
        ].map(([label, value]) => (
          <StatCard
            key={label as string}
            title={label as string}
            value={value as number}
            icon={<span className="lq-numeral-s">●</span>}
          />
        ))}
      </div>

      <h2 className="lq-title-2 lq-label mb-3">Платформалар</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {PLATFORMS.map((p) => (
          <PlatformCard
            key={p.key}
            platform={p.key as 'youtube'}
            title={p.name}
            accounts={p.people}
            stats={[
              { label: 'Жами ҳаракатлар', value: p.total },
              { label: 'Муваффақиятли', value: p.ok, tone: 'green' },
              { label: 'Бажарилмаган', value: p.fail, tone: 'red' },
            ]}
            actions={[
              { name: 'Лайк', value: 5 },
              { name: 'Кўриш', value: 4 },
              { name: 'Изоҳ', value: 0 },
            ]}
            footer={
              <button type="button" className="lq-btn lq-btn--sm lq-btn--plain">
                Батафсил кўриш
              </button>
            }
          />
        ))}
      </div>
    </Canvas>
  ),
};

/* --------------------------------------------------------- cascade guards --- */

/**
 * Regression guard, not a visual reference.
 *
 * liquid-material.css loads after Tailwind's utilities. Declaring these rules
 * unlayered would outrank a utility on the same element regardless of
 * specificity — that already cost one real bug, where a winning
 * `position: relative` dropped every modal out of its fixed placement. The
 * material therefore lives in `@layer components`, and these assertions are
 * what prove it stayed there.
 *
 * The blur assertion guards a second bug: an earlier material pass defined
 * `.lq-glass` too, unlayered, and silently won — the panel rendered at 30px
 * blur instead of the spec's 24px until that file was removed.
 */
export const CascadeGuards: Story = {
  render: () => (
    <div className="lq-canvas flex flex-col gap-4 p-8">
      <div data-testid="glass" className="lq-glass size-24" />
      <div
        data-testid="glass-radius"
        className="lq-glass size-24 rounded-[6px]"
      />
      <div
        data-testid="glass-fixed"
        className="lq-glass fixed top-4 left-4 size-16"
      />
      <div data-testid="card" className="lq-card size-24" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const css = (id: string) => {
      const el = canvasElement.querySelector(`[data-testid="${id}"]`);
      if (!el) throw new Error(`missing fixture: ${id}`);
      return getComputedStyle(el);
    };

    // A positioning utility must beat the material, or every modal mispositions.
    await expect(css('glass-fixed').position).toBe('fixed');
    // ...while an unpositioned panel still gets the containing block its
    // ::before specular ring anchors to.
    await expect(css('glass').position).toBe('relative');

    // An explicit radius utility must beat the material's radius-lg default.
    await expect(css('glass-radius').borderTopLeftRadius).toBe('6px');
    // Tailwind 4 resolves rounded-* through --radius-*, which this spec also
    // names, so the utility scale now speaks the design system by itself.
    await expect(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--radius-lg')
        .trim()
    ).toBe('24px');
    await expect(css('glass').borderTopLeftRadius).toBe('24px');
    await expect(css('card').borderTopLeftRadius).toBe('24px');

    // The spec's material, not an earlier pass's.
    await expect(css('glass').backdropFilter).toContain('blur(24px)');
  },
};
