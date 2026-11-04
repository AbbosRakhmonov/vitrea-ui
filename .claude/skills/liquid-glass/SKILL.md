---
name: liquid-glass
description: Liquid UI's Apple Liquid Glass design language (macOS Tahoe). Load before styling, adding, or migrating any component in @abbosraxmonov/liquid-ui — it defines which surfaces may use the glass material, the token contract that must not be renamed, and the accessibility and performance rules a glass surface has to satisfy.
---

# Liquid Glass — Liquid UI design language

Apple's Liquid Glass, calibrated to **macOS Tahoe desktop chrome** (not iOS
Control Center, not visionOS) because it targets a dense operator dashboard.

## The one rule that matters most

**Glass is chrome, never content.**

| Gets glass                                | Stays opaque                     |
| ----------------------------------------- | -------------------------------- |
| sidebar, toolbar, titlebar                | table rows and cells             |
| popover, dropdown, menu, tooltip          | list items, feed items           |
| modal, sheet, dialog, command palette     | form fields and inputs           |
| toast, tab bar, dock, floating action bar | KPI tiles inside a panel         |
| gallery / media chrome                    | anything that repeats per record |

This is not taste. Each `backdrop-filter` element gets its own compositing
layer and re-samples everything behind it on every paint. A DataTable with 50
glass rows is 50 such layers and drops frames on the device-fleet screens this
kit exists for. **Keep concurrent glass surfaces in the single digits.**

When a design asks for glass on a repeating element, use `.lq-glass--static`
(keeps the look, drops the sampling) or push the material to the container.

## Token contract — do not rename

`@abbosraxmonov/liquid-ui` keeps a fixed set of primitive token _names_. Every primitive resolves
its Tailwind utilities through them: `bg-item-primary` →
`--color-item-primary-primary`, `rounded-4` → `calc(var(--radius-xs) * 4)`.

Re-pointing a value re-skins all 24 primitives with zero component edits.
Renaming one breaks every primitive silently, because the utility class still
exists and just resolves to nothing.

- **Add** new names freely (`--glass-*`, `--lq-elevation-*` are ours).
- **Re-point** inherited values in `src/styles/tokens.css`.
- **Never rename** an inherited name.

## File layout and load order

```
src/index.css          inherited token declarations + Tailwind  (load 1st)
src/styles/index.css   @imports the two below                   (load 2nd)
  ├─ tokens.css        Apple palette, radius, type, easings
  └─ liquid-glass.css  the material, elevation, fallbacks
```

Entries import `'./index.css'` then `'./styles/index.css'` — a pair that sorts
stably under `prettier-plugin-organize-imports`, which rewrites import order on
every commit. **Never add a third top-level CSS import to a JS entry**; add it
to `src/styles/index.css` instead, where CSS `@import` fixes the order.

## Material classes

```
.lq-glass              base material (required with every variant)
.lq-glass--thin        blur 20px  — menu, tooltip, segmented control
.lq-glass--regular     blur 30px  — sidebar, toolbar, popover  (default)
.lq-glass--thick       blur 50px  — modal, sheet, command palette
.lq-glass--clear       blur 12px  — over imagery; pair with .lq-scrim
.lq-glass--static      look without sampling, for scrolling containers

.lq-elevation-1..4     resting / floating / modal / window
.lq-scrim              legibility layer for text on thin or clear glass
.lq-pressable          gel press (scale 0.97, spring easing)
.lq-lift               hover lift
.lq-squircle           superellipse corners where supported
```

`.lq-glass` owns its `::after` pseudo-element (the directional specular rim).
Do not attach another `::after` to the same element.

Its default `border-radius` is wrapped in `:where()` so it carries zero
specificity — a `rounded-*` utility on the same element always wins. Keep any
new defaults inside `:where()` for the same reason; this file loads after the
Tailwind utilities.

## Accessibility — non-negotiable

Glass over arbitrary content routinely fails WCAG 1.4.3 (4.5:1). The material
layer therefore ships four opaque escape hatches, all already implemented:

- `prefers-reduced-transparency: reduce` — blur off, opaque fill
- `prefers-contrast: more` — material traded for an explicit border
- `prefers-reduced-motion: reduce` — press and lift disabled
- `@supports not (backdrop-filter)` — opaque fallback

**When adding any glass surface, verify it in all four states.** If text gets
harder to read in a fallback, the material was wrong — never the setting.
`@storybook/addon-a11y` is installed and runs on every story; keep it green.

Text on `--glass-tint-clear` (20% opacity) is not legible on its own. It
requires `.lq-scrim` or an opaque backing.

## Design values

- **Accent** — systemBlue `#007AFF` light / `#0A84FF` dark. One accent only.
  Status colors (systemGreen / Orange / Red / Teal) are semantic, not accents.
- **Neutrals** — Apple's systemGray family, cool-biased toward the accent.
  Never a pure mid-grey; never pure `#fff` text on dark (use `#F5F5F7`).
- **Labels** — macOS alphas exactly: primary 85%, secondary 50%, tertiary 26%,
  quaternary 10% (dark: 92 / 55 / 25 / 10).
- **Radius** — `--radius-xs` is `0.1875rem` (3px). Controls `rounded-4` (12px),
  cards `rounded-5` (15px), sheets `rounded-7`+ (24px).
- **Type** — `-apple-system` → `SF Pro` → `Segoe UI Variable` → `Inter`. SF Pro
  is not redistributable, and operators work on Windows, so Segoe UI
  Variable is the realistic rendering target. Digits in columns get
  `tabular-nums` via `table`, `[data-numeric]`, or `.tabular`.
- **Motion** — `--ease-glass` for sheets, `--ease-spring` for presses,
  `--ease-standard` otherwise; `--duration-fast|base|slow`.

## Verification before claiming a component done

```bash
npm run typecheck                      # must be clean
npx vitest run --project=storybook     # 232+ render tests, chromium
npm run build                          # dts errors in src/stories/* are
                                       # pre-existing upstream, not yours
```

Pre-existing upstream issues — do not claim credit for fixing, do not treat as
regressions: Storybook generic-type errors in `src/stories/Accordion`,
`Calendar`, `Form`, `HtmlEditor`, `Sheet`, and `bg-gray-*` classes in
`badge.tsx` that resolve to Tailwind's default gray rather than a project token.
