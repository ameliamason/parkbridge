# Handoff: ParkBridge — Wireframe Directions

## Overview
ParkBridge is a UK mobile-first parking app that unifies a fragmented market of car-park
operators and on-street pay-by-app providers (NCP, Q-Park, RingGo, JustPark, etc.) behind two
core jobs:

1. **I'm Parked** (primary) — the user has just parked; identify *which provider/zone* they're
   standing in via GPS and hand off to that provider to pay, in as few taps as possible.
2. **Plan a Journey** (secondary) — before setting off, search a destination and compare nearby
   parking by price/distance/restrictions.

This bundle contains a **low-fidelity wireframe exploration**: one HTML "design canvas" presenting
**four whole-app directions (A–D), each across four key screens** (Home → Compare → Detail →
I'm-Parked). It is for mapping the design space and agreeing on structure — not final visuals.

See the PRD (`ParkBridge_PRD_v0.1.docx` / `PRD_readable.txt`) for full product context, market,
success metrics, and edge cases (GPS-fail fallbacks, "was this correct?" feedback loop, etc.).

## About the Design Files
The files in this bundle are **design references created in HTML** — low-fi prototypes showing
intended **structure, hierarchy, and flow**, not production code to copy. The task is to **recreate
the chosen direction in the target codebase's environment** (React Native / Flutter / native iOS+
Android — ParkBridge is a mobile app) using its established patterns, navigation, and component
library. If no codebase exists yet, choose the most appropriate mobile framework and implement there.

The HTML uses a React + Babel canvas purely to lay the screens out side by side; **do not port the
canvas, the phone-bezel chrome, or the sketch/hand-drawn styling** — those are presentation scaffolding.

## Fidelity
**Low-fidelity (lofi).** These are wireframes. Use them as the source of truth for **layout,
information hierarchy, what's on each screen, and the interaction flow**. Apply the product's real
design system for final colour, type, spacing, iconography, and motion. The palette/type here is a
deliberate "hint," not a spec:
- Type used in the wireframes: Space Grotesk (UI), Space Mono (data/labels), Caveat (annotations only).
- Accent: a single **cobalt** brand colour (`oklch(0.55 0.15 250)`, ≈ `#2f63d6`) used for ParkBridge
  identity, the "I'm Parked" entry, and Navigate.
- **Green** (`oklch(0.58 0.13 150)`, ≈ `#2f9e5e`) is used **only** on the final *payment* button
  ("Pay in RingGo" / "Pay now" once a provider + tariff are shown) as a "go / confirm" signal.
- Earlier red/green-as-accent was explicitly rejected (red read as "unavailable").

## Chosen Direction
**Direction B — "Map Canvas" is the selected direction.** The other three (A, C, D) are kept in the
file only as contrast and can be ignored for implementation unless revisited. Implement **B**.

### Direction B in one line
The app opens directly onto a **live map of where the user currently is**, with parking priced on
pins all around them; from that one screen they can **pay for where they're parked** or **plan a
journey**, and tapping any price pin opens that spot.

---

## Screens / Views  (Direction B)

All screens are a single mobile viewport (design frame 360 × 772). The map is the persistent base
layer; sheets and cards rise over it.

### B1 — Home / Live Map  *(the key screen)*
- **Purpose:** Orient the user on a map of their current area and offer the two primary actions.
- **Layout (top → bottom):**
  - **Full-bleed map** fills the entire screen as the base layer.
    - A centred **"you are here" dot** (filled dot, white ring, soft halo).
    - **Price pins** scattered around the user — each a small rounded pill showing the price
      (e.g. "£1.80"), one highlighted (filled cobalt = cheapest/nearest), the rest outline style.
      Pins are **tappable → opens that spot's detail (B3)**.
  - **Top overlay row** (12px inset, over the map): left = a white pill chip with a location pin
    icon + current area name ("Harbourside, Bristol"); right = a square white "locate me / recentre"
    button (navigation arrow icon).
  - **Bottom sheet** pinned to the bottom edge (rounded top corners, 2.5px ink top border, grab
    handle). Contents, stacked with ~11px gaps:
    1. Header row: small uppercase label "YOU'RE HERE · 5 PARKING NEARBY" + line "Tap a price on the
       map to see a spot"; ParkBridge bridge mark at right.
    2. **Primary action — "I'm parked — tap to pay"**: a full-width **cobalt** hero block. Small
       "RIGHT NOW" label, bold title, car icon in a circular disc at right. This is the dominant CTA.
    3. **Secondary action — "Plan a journey"**: a quiet bordered row (search icon, title "Plan a
       journey", sub "Find parking where you're heading", chevron). Visibly lighter weight than (2).
- **Hierarchy intent:** map leads → "I'm parked" is the hero → "Plan a journey" is easy but secondary.

### B2 — Plan a Journey: search + compare
- **Purpose:** After choosing "Plan a journey," search a destination and compare nearby parking.
- **Layout:** Map remains the base (dimmed slightly). A **filled search field** at top shows the
  destination ("Bristol Royal Infirmary"). A **bottom sheet rises to ~mid-screen** containing:
  - A horizontal row of **filter chips** (Under £3 [active], Accessible, Pre-book, Covered).
  - A sort row ("Cheapest first" + "Sort ▾").
  - A **scrollable list of result rows** — each: provider logo tile, name (+ optional "AD" sponsor
    chip), distance/type line, tags, and price ("£x.xx /hr") right-aligned.
- The map pins and the list stay linked; the map never leaves the screen.

### B3 — Parking Detail
- **Purpose:** Inspect one spot before navigating.
- **Layout:** Map base (dimmed) with the selected pin emphasised. A **detail sheet** snaps up:
  - Header row: provider logo, name ("NCP Trenchard St"), type/distance ("Multi-storey · 220m"),
    price ("£3.20 /hr") right-aligned.
  - A **placeholder image strip** ("STREET VIEW OF ENTRANCE") — entrance/photo goes here.
  - **Tag chips:** 24h, EV bays, 2.0m height, "Blue Badge ✓".
  - A "Daily max £18.00" line.
  - **Primary button: "Navigate to entrance"** (cobalt) — this flow's CTA is *navigate*, not pay.

### B4 — I'm Parked (at-car) + Pay
- **Purpose:** The user just parked; confirm the detected provider/zone and pay.
- **Layout:** Map zoomed to the car; the car pin labelled "YOU". A **floating card** sits over the
  spot:
  - Label "● PARKED HERE" + a **confidence meter** ("94% sure" — a small bar).
  - Provider row: logo, "RingGo · Zone 8821", "£1.80/hr · max £9.50".
  - **Primary button: "Pay now →"** rendered in **green** (the only green button — the real
    payment/confirm action; deep-links to the provider).
- Always provide an escape hatch (see Interactions): scan QR / enter postcode / "not right?".

---

## Interactions & Behavior
- **App launch → B1.** Request location; centre map on user; render priced pins for nearby parking.
- **Tap a price pin (B1/B2) → B3** detail sheet for that spot.
- **Tap "I'm parked — tap to pay" (B1) →** GPS identification flow → **B4** result card.
- **Tap "Plan a journey" (B1) →** focus the search field → **B2** results.
- **B3 "Navigate to entrance" →** hand off to the device's maps app routed to the entrance.
- **B4 "Pay now" →** deep-link to the matched provider's app **at its payment screen**, with a web
  fallback if the app isn't installed. (Per PRD: deep-link schemas must be verified per provider.)
- **GPS-fail fallback (PRD):** if location can't be resolved, surface manual options — enter
  postcode, scan an on-street QR/signage code, or pick from a list. These appear as the chips on B4.
- **"Was this correct?" feedback (PRD):** on return from a provider, prompt the user to confirm the
  identification was right; feed corrections back to improve matching. A "not right?" affordance is
  on B4.
- **Confidence, never silent wrong answers:** B4 always shows how sure the match is and an easy way
  to correct it.
- **Sheets:** bottom sheets are draggable (peek / mid / full). Map stays interactive behind them.

## State Management
- `location` — current GPS position + permission state (granted / denied / unavailable).
- `nearbyParking[]` — fetched parking options around `location` (id, provider, type, price, tariff,
  restrictions, coords, tags).
- `mode` — implicit; the user is either browsing the map, in a planned search, or in the parked flow.
- `selectedSpot` — the pin/spot opened in B3.
- `parkedMatch` — `{ provider, zone, tariff, confidencePct }` from the I'm-Parked identification.
- `destination` / `searchResults[]` / `filters` / `sort` — for the plan-a-journey flow (B2).
- `identificationStatus` — idle | locating | matched | failed (drives loading + fallback UI).
- Data fetching: nearby parking + tariffs from the aggregation backend; provider deep-link schemas.

## Design Tokens  (wireframe "hint" values — confirm against the real design system)
- **Colours**
  - Brand / parked / navigate (cobalt): `oklch(0.55 0.15 250)` ≈ `#2f63d6`
  - **Payment CTA only (green):** `oklch(0.58 0.13 150)` ≈ `#2f9e5e`
  - Ink (text): `oklch(0.29 0.022 262)`; secondary ink `oklch(0.50 0.020 262)`; tertiary `oklch(0.68 0.015 262)`
  - Paper / surfaces: `oklch(0.985 0.006 95)`, `oklch(0.955 0.009 95)`, panel `oklch(0.93 0.010 95)`
  - Map field: `oklch(0.935 0.006 250)`; blocks `oklch(0.905 0.008 250)`; roads `oklch(0.80 0.008 250)`
  - "Caution" chip (restrictions): amber `oklch(0.50 0.11 68)` text on `oklch(0.95 0.04 82)`
  - Sponsored/"AD" chip: `oklch(0.80 0.085 85)`
- **Type:** UI = Space Grotesk; data/labels/zone codes = Space Mono; (Caveat is annotation-only).
- **Radius / shape:** pills for chips & price pins (~20–34px); sheets 24px top radius; logo tiles ~9px.
- **Confidence meter:** small horizontal bar with ink border + cobalt fill, labelled "NN% sure".

## Assets
- **No production imagery in this lofi.** Striped/dashed placeholders mark where real assets go:
  - B3 "STREET VIEW OF ENTRANCE" — a photo/streetview of each car-park entrance.
  - Provider **logo tiles** (NCP, Q-Park, RingGo, JustPark, …) — use official provider marks, licensed.
- **Icons** are simple inline line glyphs (pin, car, search, navigate, star, clock, QR, chevron,
  pound, bridge). Replace with the codebase's icon set; the "bridge" glyph stands in for the app logo.
- **Map** is an abstract placeholder — implement with a real map SDK (Mapbox / MapLibre / Google /
  Apple Maps) and custom price-pin + you-are-here markers.

## Files
Included in this handoff folder:
- `ParkBridge Wireframes.html` — the design canvas entry point (open in a browser to view all screens).
- `wireframes.jsx` — canvas layout, section/screen wiring, and the tweak controls.
- `wf-dirAB.jsx` — screens for Directions A and **B** (B is the chosen direction).
- `wf-dirCD.jsx` — screens for Directions C and D (contrast only).
- `wf-kit.jsx` — shared primitives (phone shell, map field, rows, icons, buttons).
- `wf.css` — the wireframe styling system, palette, and tokens.
- `design-canvas.jsx`, `tweaks-panel.jsx` — presentation scaffolding (the pan/zoom canvas + tweak
  panel). **Not part of the product — do not port.**
- `ParkBridge_PRD_v0.1.docx` — the original product requirements document.
- `PRD_readable.txt` — plain-text extraction of the PRD for quick reference.

### How to view
Open `ParkBridge Wireframes.html` in a browser. Pan/zoom the canvas; click any frame's expand
control to focus it. Direction **B** is the second section. A "Tweaks" panel toggles surface,
accent, sketch intensity, map emphasis, and annotations — these are exploration aids, not product
requirements.
