# Changelog

## 2.1.0 — 2026-11-05

### Components

- **MyModal:** one modal layout - header (optional `icon`, `title`,
  `description`, `headerActions`, close), a body that scrolls on its own and
  an optional `footer` on a hairline, all on a 24px inset. New sizes `sm`
  and `md`, `bodyClassName`, `hideClose`; opens focused on the first field.
  `header` still works (deprecated, use `title`).
- **Section:** new layout block - a quiet heading (icon, title, description,
  actions) over content grouped on an inset tile; `plain` drops the tile.
- **Sheet:** new `SheetBody`; header, title and footer share the modal's
  inset and type. **Dialog / AlertDialog:** left-aligned headers, the
  headline title, opaque modal material on alerts, footers without
  breakpoint variants (an app's own `flex-col` utility beat `sm:flex-row`).
- **Labels:** secondary text in a modal or sheet is the plain secondary
  label - the vibrancy boost is for translucent glass only.

### Design system

- **One field surface** (`.lq-field`, `--field-bg` / `--field-stroke`): Input,
  Textarea, Select and ReactSelect share a solid surface with a hairline rim
  and, on focus, the accent rim with a soft halo (no offset double ring). The
  glass behind a sheet no longer shows through a field.
- **ReactSelect:** thin Lucide chevron and clear icons in the secondary label
  colour (the defaults took the page text colour: a heavy black cross);
  tinted capsule chips for multi values.
- **Badge** is a tinted capsule on theme tokens with no border. The solid and
  `-outlined` variants resolve to the same soft tint (they were Tailwind
  100/500 fills with a rim, saturated blocks in dark); `type="indicator"` draws
  a dot in the tone colour. New tones: `--purple-*`, `--teal-*`, `--indigo-*`.
- **Status badge dot** follows the badge tone (an app base rule that colours
  every element made it the text colour).
- **Segmented control:** new `--segmented-thumb` (dark: #636366, lighter than
  its track, as on macOS); `TabsList type="segmented" full` shares the width
  between tabs; `aria-selected` tabs get the thumb too.
- **Menus and popovers** are more opaque (82%) with 140% saturation, so
  coloured content behind them no longer bleeds through.
- **DateRangePicker:** the two panes are labelled (start / end); in-range days
  use a soft accent tint with label-coloured numerals; new `align` prop.
- **Textarea** grows with its text up to 24rem, then scrolls; no resize grip.
- **Number inputs** drop the browser's stepper arrows.
- **Calendar:** a date range is one band per week (only its ends and the ends
  of each week are rounded); it was separate tinted squares.

### Fixes

- **Sheets and dialogs** use an opaque modal material (`.lq-glass--modal`),
  so the page behind no longer shows through a form.
- **FilePond:** one dashed outline on the drop area. Each panel piece carries
  `.filepond--panel-root`, so the border drew a line around every piece.

### Icons and dependencies

- **Lucide only.** Breadcrumb, calendar, time picker, checkbox, input, toast
  and the stories used Remix icons beside Lucide ones; `@remixicon/react` is
  no longer a dependency.

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
