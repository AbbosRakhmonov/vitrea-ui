# Changelog

## 2.0.0 — 2026-11-05

The kit is now domain-neutral: components and tokens tied to one kind of
app were removed, and class names carry a single prefix.

### Breaking

- **Removed `PlatformCard` and `PlatformMark`** (and `PLATFORM_KEYS`,
  `PlatformKey`, their props types and stories). Compose the same card from
  `StatTiles`, `Meter` and `.lq-card`; see the Liquid Glass "Dashboard"
  story.
- **Removed category tokens:** `--platform-*` and `--act-*`, and the
  `.lq-mark` / `.lq-platform-*` classes. Define category colours in the app.
- **Single class prefix:** the `.ph-*` aliases of every `.lq-*` class are gone,
  as are `--ph-fade-*`. Keyframes are `lq-materialize-in`,
  `lq-materialize-out` and `lq-scroll-fade`. Replace `ph-` with `lq-` in
  class names.
- **`phToasterProps` removed;** use `liquidToasterProps`.
- The empty `ph-overrides` cascade layer is no longer declared; overrides live
  in `liquid-overrides`.

### Fixes

- **Button:** tinted buttons are capsules again; the capsule selector list was
  missing a comma, so the tinted class never matched.
- **Kanban:** columns default to `--fill-4` instead of `--bg-inset`. Inset is
  the canvas colour, so on a page the column disappeared and its footer looked
  detached. `--kanban-column-background` still overrides it.
- **Accent text:** `text-item-primary` now resolves to `--accent`. It shared
  `--accent-fill` with the solid button fill (#0071e3 in both themes), which
  fell to ~3:1 as text on dark surfaces. Fills are unchanged.

### Components

- **MyPagination:** redesigned as a segmented pager (real buttons,
  `aria-current`, dimmed arrows at either end); `onPageChange` is no longer
  called for the page already shown. New `showPageSelect` prop (default
  `true`) toggles the "Go to page" select, now a tinted capsule.
- **MyLimitSelect:** tinted capsule trigger and footnote label.
- **Empty:** new `title`, `description` and `action` props for a taller
  page-level layout; the compact layout is unchanged. Default icon is now
  `FileWarning`.
- **Loader:** new `size` (`sm` | `md` | `lg`) and `text` props;
  `className` now merges instead of replacing the container classes.
- **MyCheckbox:** new `helperText` prop; renders a plain labelled checkbox
  without `control`/`name` instead of rendering nothing.
- `LoaderProps`, `SpinProps`, `MyPaginationProps` and `MyLimitSelectProps`
  are exported.

### Docs and tooling

- Stories and source comments use neutral examples only.
- New `unit` Vitest project runs component tests outside the kanban suite
  (they were never picked up before); stale Avatar fallback assertion fixed.

## 1.0.1 — 2026-11-04

### Documentation & Showcase

- Deployed interactive Storybook showcase to GitHub Pages: [abbosrakhmonov.github.io/liquid-ui](https://abbosrakhmonov.github.io/liquid-ui/).
- Updated README with live interactive demo banner, component catalog breakdown, and usage guidelines.

## 1.0.0 — 2026-11-04

### Initial Release

- **Apple Liquid Glass design language** on React 19, Radix UI, Tailwind CSS v4 and TypeScript.
- **Two themes:** Light and Dark (Apple graphite) with a complete semantic token system (`src/styles/liquid-tokens.css`).
- **Core Primitives (Atoms):**
  - Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Collapsible, Dialog, Dropdown, Form, Pagination, Popover, Progress, Scroll Area, Separator, Sheet, Skeleton, Stepper, Tabs, Table, Toast, Tooltip.
- **Composite Components:**
  - Actions, Confirm Dialog, DataTable, DatePicker, Empty State, Export, Filters, Form Builders, Gallery, Kanban, Layouts (PageHeader, ActionBar, StatusScreen), Loader, Modal, Pagination, Scroll, Stat, ThemeProvider, Tooltip.
- **Kanban Board:**
  - Native drag-and-drop board with virtualization, autoscroll, permissions, and typed normalized data.
- **Package Architecture:**
  - Multi-entry subpath exports for tree-shaking (`@abbosraxmonov/liquid-ui/*`).
  - ESM and CommonJS support.
  - Full TypeScript declaration files.
  - Interactive Storybook documentation for all components.
