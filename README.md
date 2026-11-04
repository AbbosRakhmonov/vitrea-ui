# @abbosraxmonov/liquid-ui

React, Radix UI, Tailwind CSS v4 va TypeScript ustida **Apple Liquid Glass** dizayn tili. Ikki mavzu: **Light** va **Dark** (Apple grafit).

Bitta paket: atomlar (tugma, input, dialog, sheet, jadval…), kompozitlar (DataTable, formalar, filtrlar, sana tanlash, galereya…), layout (PageHeader, StatusScreen), tokenlar va Liquid Glass material — barchasi `@abbosraxmonov/liquid-ui` va uning subpath'lari ostida.

- **npm:** [`@abbosraxmonov/liquid-ui`](https://www.npmjs.com/package/@abbosraxmonov/liquid-ui)
- **GitHub:** [`AbbosRakhmonov/liquid-ui`](https://github.com/AbbosRakhmonov/liquid-ui)

## O'rnatish

```bash
npm install @abbosraxmonov/liquid-ui
# yoki
yarn add @abbosraxmonov/liquid-ui
```

Peer bog'liqliklar (loyihaning o'zida bo'lishi kerak): `react >=19.1`, `react-dom >=19.1`, `react-hook-form ^7.50`, `i18next >=24`, `react-i18next >=15`.

## Ulash

```ts
// main.tsx — CSS tartibi muhim
import '@abbosraxmonov/liquid-ui/styles.css'; // utility'lar, tokenlar va material
import './index.css'; // loyihaning o'z CSS'i
import '@abbosraxmonov/liquid-ui/theme.css'; // OXIRIDA: tokenlar va materialni qayta tasdiqlaydi
```

```tsx
import { Button, Sheet, SheetContent, Table } from '@abbosraxmonov/liquid-ui';
import { Card } from '@abbosraxmonov/liquid-ui/card';
import { PageHeader, StatusScreen } from '@abbosraxmonov/liquid-ui/components/layout';
import { Form, MyInput } from '@abbosraxmonov/liquid-ui/components/form';

<Card material="glass">…</Card>
<Button variant="tinted">Shablonlar</Button>
<PageHeader title="Qurilmalar" actions={<Button>Qo'shish</Button>} />
```

Mavzu: `<html>`dagi `dark` klassi (kitning `ThemeProvider`i boshqaradi). Ranglar faqat tokenlardan olinadi: `--label`, `--label-2`, `--fill-1..4`, `--separator`, `--bg-*`, `--accent`, `--green` / `--red` / `--orange` va boshqalar (`src/styles/liquid-tokens.css`).

## Tarkib

- **Atomlar:** `accordion, alert, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, carousel, collapsible, dialog, dropdown, form, pagination, popover, progress, scroll-area, separator, sheet, skeleton, stepper, tab, table, toast, tooltip`
- **Kompozitlar** (`@abbosraxmonov/liquid-ui/components/*`): `actions, confirm, datatable, datepicker, empty, export, filters, form, gallery, kanban, layout, loader, modal, pagination, scroll, stat, theme, tooltip`
- **Boshqalar:** `@abbosraxmonov/liquid-ui/{hooks, enums, providers, stores, utils, types}`

Har bir komponentning to'liq variantlari va API'si Storybook'da (`npm run storybook`) hujjatlangan.

## Hujjatlar

- [`.claude/skills/liquid-glass/SKILL.md`](.claude/skills/liquid-glass/SKILL.md) — dizayn qoidalari: glass ustma-ust qo'yilmaydi, glass ichida `--fill-4`, ikkilamchi tugma `tinted`, rang faqat tokendan.
- [Kanban](src/components/kanban/README.md) — controlled board, drag/drop, virtualizatsiya va moslashtirish.
- [Changelog](CHANGELOG.md) — versiyalar va release o'zgarishlari.

## Ishlab chiqish

```bash
npm ci              # o'rnatish (prepare kitni ham yig'adi)
npm run storybook   # komponentlar (port 6006)
npm run typecheck
npm test            # vitest (Storybook stories browser'da)
npm run build       # dist/
```

## Nashr etish (publish)

npm'ga nashr avtomatik — **GitHub Release** chiqarilganda `.github/workflows/publish.yml` ishga tushadi (`npm ci` → typecheck → build → `npm publish --provenance`).

1. `package.json`dagi `version`ni oshiring (npm bir xil versiyani ikki marta qabul qilmaydi).
2. GitHub'da tegishli tag bilan Release yarating (masalan `v0.1.1`).
3. Workflow avtomatik publish qiladi. (Repo secret: `NPM_TOKEN` — npm Automation token.)

Qo'lda nashr: `npm login && npm publish` yoki Actions'dan `workflow_dispatch`.

## Litsenziya

MIT. shadcn/ui va Radix UI (MIT) asosida. Kanban adaptatsiyasi va boshqa dependency'lar uchun [third-party notices](THIRD_PARTY_NOTICES.md)ga qarang.
