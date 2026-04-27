# Customer-Facing Delivery Ordering App

A mobile-first, multi-page food ordering experience for a single restaurant, with menu browsing, product detail, cart, and order tracking. Uses Manrope + a teal/emerald palette for a clean, premium-but-warm feel.

## Pages & Routes

- `/` — **Store / Menu**: hero, category pills, product grid, sticky cart bar (mobile)
- `/cart` — **Cart**: line items, summary, address, payment method, place-order CTA
- `/order/tracking` — **Order Tracking**: 4-step stepper, ETA badge, order summary, address

Product detail opens as a **bottom sheet** (Drawer on mobile, Dialog on desktop) over the menu — no separate route.

## Page details

### Store / Menu (`/`)
- Top bar: store logo + cart icon with live item-count badge
- Hero: cover image, store name, short tagline, star rating badge
- Horizontally scrollable category pill tabs (teal active, muted inactive)
- Product grid: 2 cols mobile, 3 cols desktop. Each card has image, name, description, price, teal `+` button
- Sticky bottom bar (mobile only): "View cart — N items — R$ XX,XX" full-width teal button linking to `/cart`

### Product Detail (bottom sheet)
- Full-width image, name, description, price
- Quantity stepper (`−` / count / `+`)
- Notes textarea ("Observações")
- CTA: "Adicionar — R$ XX,XX"

### Cart (`/cart`)
- Editable line items with thumbnail, name, qty stepper, subtotal, remove (Trash icon)
- Summary card: subtotal, delivery fee, total
- Address input with MapPin icon
- Payment method selector (Credit Card / Pix / Cash on delivery) with card icons
- CTA: "Finalizar pedido" → navigates to `/order/tracking`

### Order Tracking (`/order/tracking`)
- 4-step horizontal stepper: Recebido → Preparando → Saiu para entrega → Entregue
  - Active = filled teal circle + teal connector; inactive = muted
  - Auto-advances on a timer for demo feel
- ETA badge (teal pill with Clock icon)
- Compact order summary card
- Delivery address block with MapPin

## State

Global cart store via lightweight Zustand store (`src/stores/cart.ts`):
- `items: { product, quantity, notes }[]`, `add`, `remove`, `updateQty`, `clear`
- Derived: `count`, `subtotal`
- Persisted to `localStorage` so cart survives page reloads

Cart icon badge and sticky bottom bar both subscribe to this store.

## Design system wiring

Update `src/styles.css` to convert the brief into the existing token system:
- Switch all color tokens to HSL values from the brief (background, foreground, primary, muted-foreground, border, card)
- `--radius: 0.75rem` (12px), so `rounded-md` → 10px, `rounded-sm` → 8px
- Add Manrope via Google Fonts `<link>` in `__root.tsx` head and set as the body font
- Custom card shadow utility (`shadow-card`) and primary button shadow (`shadow-primary-glow`) defined as CSS vars
- All semantic tokens (primary, border, etc.) updated so existing shadcn components inherit the new look automatically

## Components to build

Reuse shadcn primitives (Button, Card, Badge, Input, Textarea, Tabs, Drawer/Dialog, Sheet, RadioGroup) and add:
- `StoreHeader` — logo + cart icon with badge
- `StoreHero` — cover, name, rating
- `CategoryTabs` — pill tabs, scrollable
- `ProductCard` — grid item with `+` action
- `ProductSheet` — bottom sheet for product detail (uses `Drawer`)
- `StickyCartBar` — fixed bottom CTA on mobile
- `CartLineItem`, `OrderSummary`, `AddressInput`, `PaymentSelector`
- `OrderStepper` — 4-step horizontal progress

All cards use `rounded-xl`, white bg, `border-border/70`, and the subtle `shadow-card`. Buttons get `rounded-xl font-semibold transition-all duration-200`. Inputs are `h-12 rounded-xl` with teal focus ring. Icons from `lucide-react` (ShoppingCart, MapPin, Phone, Star, Plus, Minus, ChevronRight, Clock, CheckCircle2, Bike, Trash2, CreditCard).

## Sample content

Seed a single mock restaurant ("Cantina Verde") with ~8 products across 3 categories (Entradas, Pratos principais, Bebidas) so the UI feels real out of the box. Prices in BRL (`R$`), Portuguese labels to match the brief's `R$ XX,XX` formatting.

## Out of scope

- No auth, no real backend, no real payment processing — all demo
- No multi-restaurant browsing (single store experience)
- No address autocomplete (plain text input)
