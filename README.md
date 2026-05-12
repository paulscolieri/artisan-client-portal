# Claire Crowe Collection — Portal

Next.js client portal demo for Claire Crowe Collection. See the [root README](../README.md) for full project context.

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build check
```

Redirects to `/portal` on load. Use the floating role switcher (bottom-right) to toggle between Customer, Admin, and Production views.

## Project structure

```
app/
  portal/           Customer portal (dashboard, orders, new project form)
  admin/            Admin portal (dashboard, pipeline, orders, customers)
  production/       Production queue
  checkout/[id]/    Standalone Stripe-style checkout (outside portal layout)

components/
  role-switcher.tsx     Floating demo role toggle
  status-badge.tsx      Pipeline stage badge with colors
  revenue-chart.tsx     SVG bar chart (no library)

data/
  customers.ts          4 demo customers
  orders.ts             8 demo orders across all pipeline stages
  sales.ts              2026 YTD P&L + lost deal records

lib/
  types.ts              All shared TypeScript types + label/color maps
  role-context.tsx      React context for demo role state
```

## Notes

- `params` in dynamic routes is a `Promise` in this version of Next.js — always `await params` before accessing properties.
- No database. All data is hardcoded in `/data/*.ts`.
- The checkout page lives at `/checkout/[id]` (not nested under `/portal`) to avoid inheriting the portal header layout.
- Brand color: `#b87d6b` (rose/copper). Stripe checkout uses `#635bff` to match Stripe's actual UI.
