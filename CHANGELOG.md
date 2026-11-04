# Changelog

## 0.1.0 — 2026-11-04

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
