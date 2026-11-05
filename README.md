<div align="center">

# vitrea-ui

**Apple Liquid Glass Design Language for React 19, Radix UI & Tailwind CSS v4**

[![npm version](https://img.shields.io/npm/v/vitrea-ui.svg?color=blue&style=flat-square)](https://www.npmjs.com/package/vitrea-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React 19](https://img.shields.io/badge/React-19.1+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)

<br />

<p align="center">
  <a href="https://abbosrakhmonov.github.io/liquid-ui/">
    <img src="https://img.shields.io/badge/Live%20Demo-Explore%20Components%20in%20Storybook-blue?style=for-the-badge&logo=storybook&logoColor=white" alt="Live Storybook Showcase" />
  </a>
</p>

[**Explore Live Interactive Demo →**](https://abbosrakhmonov.github.io/liquid-ui/)

</div>

---

## 🌟 Overview

`vitrea-ui` is a modern, production-grade UI component library built on the **Apple macOS Tahoe Liquid Glass** design foundation. It provides an uncompromised blend of aesthetic translucency, accessibility, and high runtime performance for complex operator dashboards and consumer applications alike.

### Key Highlights

- 🪟 **True Liquid Glass Material:** Real-time multi-layered backdrop blur, specular rims, chromatic edges, and vibrance layers.
- 🌓 **Dual Adaptive Themes:** Hand-calibrated **Light** and **Dark (Apple Graphite)** modes driven entirely by semantic design tokens.
- ♿ **Accessible by Design:** Built on top of Radix UI primitives with full WAI-ARIA compliance, keyboard navigation, and visible focus rings.
- 🧩 **26+ Primitives & 16+ Composites:** Complete set of atoms (Buttons, Dialogs, Cards) and advanced composites (Virtual Kanban Board, DataTable, DatePickers).
- 🌲 **Tree-Shakeable Subpaths:** Import granularly (`vitrea-ui/button`, `vitrea-ui/card`) to optimize your production bundle.

---

## 🚀 Quick Start

### 1. Installation

```bash
# npm
npm install vitrea-ui

# yarn
yarn add vitrea-ui

# pnpm
pnpm add vitrea-ui
```

> **Peer Dependencies:** `react >= 19.1`, `react-dom >= 19.1`, `react-hook-form ^7.50`, `i18next >= 24`, `react-i18next >= 15`.

### 2. Include Styles

Import the stylesheets in your root entry file (`main.tsx` or `index.tsx`). **Order is critical** to ensure proper CSS cascade:

```tsx
// main.tsx
import 'vitrea-ui/styles.css'; // 1. Base tokens, utilities & Liquid Glass material
import './index.css'; // 2. Your application's custom CSS
import 'vitrea-ui/theme.css'; // 3. (Last): Theme overrides & token enforcement
```

### 3. Usage Example

```tsx
import React from 'react';
import { Button } from 'vitrea-ui/button';
import { Card } from 'vitrea-ui/card';
import { PageHeader } from 'vitrea-ui/components/layout';

export function Dashboard() {
  return (
    <div className="lq-canvas min-h-screen space-y-6 p-6">
      <PageHeader
        title="Workspace Overview"
        actions={
          <div className="flex gap-2">
            <Button variant="tinted">Export</Button>
            <Button variant="default">New Project</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card material="glass" className="p-6">
          <h3 className="text-lg font-medium text-[var(--label)]">
            Liquid Glass Surface
          </h3>
          <p className="mt-1 text-sm text-[var(--label-2)]">
            Translucent frosted backdrop with specular rim highlights.
          </p>
          <div className="mt-4 flex gap-3">
            <Button variant="primary">Confirm</Button>
            <Button variant="tinted">Details</Button>
          </div>
        </Card>

        <Card material="solid" className="p-6">
          <h3 className="text-lg font-medium text-[var(--label)]">
            Solid Surface
          </h3>
          <p className="mt-1 text-sm text-[var(--label-2)]">
            High-contrast opaque ground for dense data readability.
          </p>
        </Card>
      </div>
    </div>
  );
}
```

---

## 🎨 Design System & The Liquid Glass Principle

### The Golden Rule: _Glass is Chrome, Never Content_

In Liquid Glass, blur and translucency are reserved for persistent navigation, overlays, floating chrome, and contextual controls. Dense content (such as table rows, form inputs, and list feeds) remains on opaque or solid tile surfaces to prevent GPU composite bloat and preserve legibility.

| Surface Type             | When to Use                                  | Recommended Material                    |
| :----------------------- | :------------------------------------------- | :-------------------------------------- |
| **Chrome & Shell**       | Navigation, Sidebars, Toolbars, ActionBars   | `.lq-glass` / `<Card material="glass">` |
| **Overlays**             | Modals, Sheets, Drawers, Dropdowns, Popovers | `.lq-glass` with `.lq-scrim`            |
| **Interactive Controls** | Buttons, Segmented Tabs, Status Badges       | `.lq-btn`, `.lq-segmented`, `.lq-badge` |
| **Repeating Data**       | Table rows, List cards, KPI tiles            | Solid tiles (`var(--fill-4)`)           |

### Color Tokens

Colors resolve through semantic CSS variables defined in `src/styles/liquid-tokens.css`:

- **Text:** `--label`, `--label-2`, `--label-3`, `--label-disabled`
- **Fills:** `--fill-1`, `--fill-2`, `--fill-3`, `--fill-4` (soft neutral backdrops)
- **Accents:** `--accent`, `--accent-soft`, `--accent-contrast`
- **Status Tones:** `--green`, `--red`, `--orange` (with `-soft` and `-text` variants)
- **Separators:** `--separator`, `--separator-opaque`

Theme switching is handled by adding or removing the `.dark` class on the `<html>` element (or via the built-in `<ThemeProvider />`).

---

## 📦 Component Catalog

### Core Primitives (Atoms)

| Component             | Path                               | Description                                                          |
| :-------------------- | :--------------------------------- | :------------------------------------------------------------------- |
| **Accordion**         | `vitrea-ui/accordion`              | Collapsible interactive accordion panels.                            |
| **Alert & Dialog**    | `vitrea-ui/alert`, `/alert-dialog` | Accessible system banners and modal confirmation dialogs.            |
| **Avatar & Badge**    | `vitrea-ui/avatar`, `/badge`       | User disc representation and status notification badges.             |
| **Button**            | `vitrea-ui/button`                 | Primary, Tinted, Glass, Plain and Icon button variants.              |
| **Calendar & Picker** | `vitrea-ui/calendar`               | Interactive date, time, and multi-range calendar selectors.          |
| **Card & Sheet**      | `vitrea-ui/card`, `/sheet`         | Glass-morphic containers and edge-anchored slide-out sheets.         |
| **Form Controls**     | `vitrea-ui/form`                   | Inputs, Checkboxes, Switches, Radio Groups, ReactSelect, HtmlEditor. |
| **Tabs & Stepper**    | `vitrea-ui/tab`, `/stepper`        | macOS segmented controls and progress steppers.                      |
| **Toast**             | `vitrea-ui/toast`                  | Glass capsule notification presets for Sonner.                       |

### Composite Patterns

| Pattern           | Path                             | Description                                              |
| :---------------- | :------------------------------- | :------------------------------------------------------- |
| **Kanban Board**  | `vitrea-ui/components/kanban`    | Native Pragmatic DnD virtualized drag-and-drop board.    |
| **DataTable**     | `vitrea-ui/components/datatable` | Sortable, filterable, paginated enterprise data table.   |
| **Layouts**       | `vitrea-ui/components/layout`    | `PageHeader`, `ActionBar`, `DetailList`, `StatusScreen`. |
| **Filters**       | `vitrea-ui/components/filters`   | `FilterWrapper`, `AppliedFilters`, `SearchWithCtrl`.     |
| **Media Gallery** | `vitrea-ui/components/gallery`   | Fullscreen zoom and thumbnail carousel gallery.          |

---

## 🛠️ Local Development & Storybook

To explore and test components locally:

```bash
# Clone the repository
git clone https://github.com/AbbosRakhmonov/liquid-ui.git
cd liquid-ui

# Install dependencies
npm ci

# Start interactive Storybook
npm run storybook

# Run test suite & type checks
npm test
npm run typecheck

# Production build
npm run build
```

---

## 📄 License

Distributed under the [MIT License](LICENSE). Built on foundations from Radix UI and shadcn/ui. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for full licensing details.
