# Final Mile Techies — Driver App

A phone-first driver web app: login → dashboard → pickup (box count + box
stickers) → out-for-delivery (photo/GPS/POD) → delivered. Built from the
Claude Design handoff in `../project/Driver App.dc.html` (same 19-screen
flow), restyled to a flat white-card look in the FMT orange/charcoal brand.

## Demo login

The login screen has no visible demo-credentials shortcut (removed so it
isn't sitting in plain view on a public build). To sign in during testing,
use:

- **Mobile:** `98195 77340`
- **Password:** `fmt2026`

This is a client-side mock backend, not a real auth system — see below.

## Stack

- React 19 + Vite (SPA)
- No backend service — a client-side mock backend (`src/state/store.jsx`)
  holds shipment state, statuses, and the activity timeline, persisted to
  `localStorage` so a refresh doesn't lose progress.
- Real browser APIs where the prototype only mocked them: `navigator.geolocation`
  for GPS capture, `<input type="file" capture="environment">` for the
  camera/photo and POD upload steps (with client-side file-type/size
  validation), Google Maps / `tel:` / `mailto:` links for Navigate, Call
  and Forgot password.

## Features

- **Login** — mock auth against the demo credentials above; Forgot password
  opens a pre-filled `mailto:support@finalmiletechies.com` draft.
- **Dashboard** — today's pickup/delivery counts, route preview map, and an
  on-duty/off-duty toggle (top right) that gates starting a route.
- **Route** — tap any stop to jump straight into its pickup or delivery
  flow; closed stops show a checkmark.
- **Pickup flow** — box counter with a mismatch warning, then optional
  **box stickers**: one 2×1 in label per box (Docket No. + N/total),
  printed via the browser's normal print dialog sized to the label.
- **Delivery flow** — out-for-delivery → shipment photo → GPS → POD upload
  → remarks → delivered, each step backed by a real browser API.
- **Profile** — editable photo (stored locally), vehicle number, and duty
  status.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure

- `src/state/data.js` — seed data (driver, shipments, timeline events, notifications)
- `src/state/store.jsx` — the mock backend: state, derived selectors, actions
- `src/components/` — phone chrome (frame, top bar, bottom nav, toast, modal) and shared pieces
- `src/components/screens/` — one component per screen (login, dashboard, route, pickups, pickup detail, box count, box stickers, pickup confirmed, deliveries, delivery detail, out-for-delivery, photo, GPS, POD upload, POD preview, remarks, delivered, timeline, notifications, profile)
- `src/styles/theme.css` — design tokens (white cards, soft shadow, FMT orange/charcoal) and component classes
- `src/assets/fmt-logo.png` — the company logo, used on the login screen
