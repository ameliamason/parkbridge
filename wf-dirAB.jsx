/* ParkBridge wireframes — Directions A (Two Doors) & B (Map Canvas) */

// shared sample data
const DEST = 'Bristol Royal Infirmary';
const PROVIDERS = [
{ name: 'NCP Trenchard St', code: 'NCP', price: '£3.20', dist: 'Multi-storey · 220m', tags: ['24h', 'ANPR'] },
{ name: 'RingGo Zone 8821', code: 'RGo', price: '£1.80', dist: 'On-street · 90m', tags: ['Max 4h', 'Pay-by-app'] },
{ name: 'Q-Park Harbourside', code: 'QP', price: '£2.60', dist: 'Pre-book · 340m', tags: ['EV bays', 'Covered'], sponsor: true },
{ name: 'JustPark — Private', code: 'JP', price: '£2.10', dist: 'Driveway · 180m', tags: ['Book ahead'] }];

const FILTERS = [
{ label: 'Under £3', on: true }, { label: 'Accessible', on: false },
{ label: 'Pre-book', on: false }, { label: 'Covered', on: false }, { label: '24h', on: false }];


// ════════════════════════════════════════════════════════════
// DIRECTION A — TWO DOORS  (decision-first)
// ════════════════════════════════════════════════════════════
function A1() {
  return (
    <Phone>
      <div className="pad col" style={{ height: '100%', gap: 12 }}>
        <div className="between"><Brand /><span className="chip">Bristol</span></div>
        <div className="hero sk r3" style={{ flex: 1, justifyContent: 'space-between' }}>
          <div className="top"><span className="label">RIGHT NOW</span>
            <Icon name="car" w={30} c="var(--accent-ink)" sw={1.7} /></div>
          <div className="col" style={{ gap: 8 }}>
            <h2>I'm Parked</h2>
            <p>Find the provider where you're standing and pay in two taps.</p>
          </div>
          <div className="act">Tap to pay
            <span className="disc"><Icon name="chev" w={16} c="var(--accent-ink)" sw={2.4} /></span></div>
        </div>
        <div className="secondary sk tight">
          <span className="ic"><Icon name="map" w={17} c="var(--ink2)" /></span>
          <div className="meta"><b>Plan a journey</b><span>Compare parking before you set off</span></div>
          <Icon name="chev" w={14} c="var(--ink3)" />
        </div>
        <div className="row sk tight" style={{ padding: '9px 11px' }}>
          <Icon name="clock" w={15} c="var(--ink3)" />
          <span className="meta" style={{ fontSize: 12 }}><b style={{ display: 'inline' }}>Last:</b> Westfield · RingGo 8821</span>
          <Icon name="chev" w={13} c="var(--ink3)" />
        </div>
      </div>
      <Annot><b>I'm Parked is the hero.</b> Pay-where-you-stand fills the screen; planning sits quietly beneath, still one tap away.</Annot>
    </Phone>);

}

function A2() {
  return (
    <Phone>
      <div className="col" style={{ height: '100%' }}>
        <div className="row" style={{ padding: '9px 12px', gap: 8 }}>
          <Icon name="back" w={17} c="var(--ink)" />
          <div style={{ flex: 1 }}><Search filled value={DEST} /></div>
        </div>
        <div className="map-region">
          <MapField
            pins={[
            { x: 90, y: 120, label: '£1.80', kind: '' },
            { x: 185, y: 78, label: '£3.20', kind: 'alt' },
            { x: 240, y: 160, label: '£2.60', kind: 'alt' },
            { x: 120, y: 200, label: '£2.10', kind: 'alt' }]
            }
            you={{ x: 150, y: 150 }} />
        </div>
        <FilterChips items={FILTERS} />
        <div className="between" style={{ padding: '2px 13px 6px' }}>
          <span className="label">4 results · nearest first</span>
          <span className="chip"><Icon name="list" w={12} c="var(--ink2)" /> Sort</span>
        </div>
        <div className="col" style={{ flex: 1, overflow: 'hidden', borderTop: '1.5px solid var(--hair)' }}>
          {PROVIDERS.slice(0, 3).map((p, i) => <ResRow key={i} {...p} />)}
        </div>
      </div>
      <Annot><b>Map + list together.</b> Pins carry price; list ranks by distance. Filters up top.</Annot>
    </Phone>);

}

function A3() {
  return (
    <Phone>
      <div style={{ position: 'absolute', inset: 0 }}>
        <MapField dim pins={[{ x: 150, y: 130, label: '£1.80' }]} you={{ x: 150, y: 175 }} />
      </div>
      <div className="sheet" style={{ maxHeight: '78%' }}>
        <div className="grab" />
        <div className="pad col" style={{ gap: 12 }}>
          <div className="row" style={{ padding: 0, gap: 11 }}>
            <Logo name="RGo" />
            <div className="meta">
              <b style={{ fontSize: 15 }}>RingGo · On-street</b>
              <span className="zone">ZONE 8821 · 90m away</span>
            </div>
            <div className="price"><b style={{ fontSize: 20 }}>£1.80</b><span>per hour</span></div>
          </div>
          <hr className="divider" />
          <div className="between" style={{ fontSize: 12 }}>
            <span className="muted">Daily max</span><b>£9.50</b></div>
          <div className="between" style={{ fontSize: 12 }}>
            <span className="muted">Hours</span><b>Mon–Sat 8am–8pm</b></div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="chip">Max stay 4h</span>
            <span className="chip warn">No return within 1h</span>
            <span className="chip">Blue Badge ✓</span>
          </div>
          <div className="placeholder sk tight" style={{ height: 34, fontSize: 9 }}>
            ⚠ ALWAYS CHECK THE SIGN ON STREET
          </div>
          <div className="col" style={{ gap: 9 }}>
            <div className="btn block big sk tight"><Icon name="nav" w={17} c="var(--accent-ink)" /> Navigate here</div>
            <div className="btn pay block big sk tight"><Icon name="pound" w={16} c="var(--pay-ink)" /> Pay with RingGo</div>
          </div>
        </div>
      </div>
      <Annot><b>Tap a pin → detail sheet.</b> Tariff, restrictions, and a verify-the-sign nudge before any CTA.</Annot>
    </Phone>);

}

function A4() {
  return (
    <Phone>
      <div className="col" style={{ height: '100%' }}>
        <div style={{ background: 'var(--park)', color: 'var(--park-ink)', padding: '12px 14px' }}>
          <div className="between">
            <span className="label" style={{ color: 'var(--park-ink)', opacity: .85 }}>I'M PARKED · LOCATED</span>
            <Icon name="car" w={18} c="var(--park-ink)" /></div>
          <div style={{ fontSize: 13, marginTop: 4, fontFamily: 'var(--fmono)' }}>Identified in 6s · GPS ±8m</div>
        </div>
        <div className="pad col" style={{ flex: 1, gap: 13 }}>
          <div className="sk col" style={{ padding: 14, gap: 9 }}>
            <div className="row" style={{ padding: 0, gap: 11 }}>
              <Logo name="RGo" />
              <div className="meta"><b style={{ fontSize: 16 }}>RingGo</b>
                <span className="zone" style={{ fontSize: 13 }}>ZONE 8821</span></div>
              <Conf pct={97} />
            </div>
            <hr className="divider" />
            <div className="between" style={{ fontSize: 12 }}><span className="muted">Tariff</span><b>£1.80/hr · max £9.50</b></div>
            <div className="between" style={{ fontSize: 12 }}><span className="muted">Pay by</span><b>App or 0117 xxx</b></div>
          </div>
          <div className="btn pay block big sk"><Icon name="pound" w={18} c="var(--pay-ink)" /> Pay in RingGo →</div>
          <div className="tcent muted" style={{ fontSize: 12, fontFamily: 'var(--fhand)', fontSize: 16 }}>Opens RingGo at the payment screen</div>
          <div style={{ flex: 1 }} />
          <div className="between">
            <span className="chip"><Icon name="qr" w={13} c="var(--ink2)" /> Scan QR</span>
            <span className="chip">Enter postcode</span>
            <span className="chip warn">Not right?</span>
          </div>
        </div>
      </div>
      <Annot><b>Two taps to pay.</b> Confidence shown, never a silent wrong answer — and an easy "not right?".</Annot>
    </Phone>);

}

// ════════════════════════════════════════════════════════════
// DIRECTION B — MAP CANVAS  (you land on the live map)
// ════════════════════════════════════════════════════════════
function BMap({ pins, you, dim }) {
  return <div style={{ position: 'absolute', inset: 0 }}><MapField pins={pins} you={you} dim={dim} /></div>;
}

function B1() {
  return (
    <Phone>
      <BMap
        pins={[
        { x: 86, y: 116, label: '£1.80' },
        { x: 206, y: 88, label: '£3.20', kind: 'alt' },
        { x: 252, y: 164, label: '£2.60', kind: 'alt' },
        { x: 116, y: 196, label: '£2.10', kind: 'alt' }]
        }
        you={{ x: 158, y: 250 }} />

      {/* top: minimal so the map leads — current area + locate */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="chip" style={{ background: 'var(--paper)', padding: '7px 11px', gap: 6 }}>
          <Icon name="pin" w={13} c="var(--accent)" /> <b style={{ fontSize: 12 }}>Harbourside, Bristol</b>
        </div>
        <span className="chip" style={{ background: 'var(--paper)', padding: 0, width: 32, height: 32, justifyContent: 'center' }}>
          <Icon name="nav" w={15} c="var(--accent)" />
        </span>
      </div>

      {/* bottom sheet: you-are-here + two clear actions */}
      <div className="sheet" style={{ paddingBottom: 16 }}>
        <div className="grab" />
        <div className="pad col" style={{ gap: 11, paddingTop: 3 }}>
          <div className="between">
            <div className="col" style={{ gap: 2 }}>
              <span className="label">YOU'RE HERE · 5 PARKING NEARBY</span>
              <b style={{ fontSize: 14.5 }}>Tap a price on the map to see a spot</b>
            </div>
            <span className="mk"><Icon name="bridge" w={20} c="var(--accent)" sw={2} /></span>
          </div>
          <div className="hero sk" style={{ padding: '14px 16px', gap: 0 }}>
            <div className="between">
              <div className="col" style={{ gap: 2 }}>
                <span className="label" style={{ color: 'var(--accent-ink)', opacity: .8 }}>RIGHT NOW</span>
                <b style={{ fontSize: 18, letterSpacing: '-.4px' }}>I'm parked — tap to pay</b>
              </div>
              <span className="disc"><Icon name="car" w={20} c="var(--accent-ink)" /></span>
            </div>
          </div>
          <div className="secondary sk tight">
            <span className="ic"><Icon name="mag" w={16} c="var(--ink2)" /></span>
            <div className="meta"><b>Plan a journey</b><span>Find parking where you're heading</span></div>
            <Icon name="chev" w={14} c="var(--ink3)" />
          </div>
        </div>
      </div>
      <Annot><b>Opens on your live map.</b> You-are-here with parking priced around you — then pay where you're parked or plan a journey, both one tap from here.</Annot>
    </Phone>);

}

function B2() {
  return (
    <Phone>
      <BMap dim
      pins={[{ x: 88, y: 120, label: '£1.80' }, { x: 200, y: 80, label: '£3.20', kind: 'alt' }]}
      you={{ x: 150, y: 150 }} />
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20 }}>
        <div className="search sk tight filled"><span className="mag"><Icon name="mag" w={16} c="var(--ink3)" /></span>
          <span className="ph">{DEST}</span></div>
      </div>
      <div className="sheet" style={{ top: '42%' }}>
        <div className="grab" />
        <FilterChips items={FILTERS.slice(0, 4)} />
        <div className="between" style={{ padding: '0 13px 6px' }}>
          <span className="label">Cheapest first</span><span className="chip">Sort ▾</span></div>
        <div className="col" style={{ overflow: 'hidden', borderTop: '1.5px solid var(--hair)' }}>
          {PROVIDERS.map((p, i) => <ResRow key={i} {...p} />)}
        </div>
      </div>
      <Annot><b>Search → sheet rises over the map.</b> Pins and list stay linked; map never leaves the screen.</Annot>
    </Phone>);

}

function B3() {
  return (
    <Phone>
      <BMap dim pins={[{ x: 150, y: 110, label: '£3.20' }]} you={{ x: 150, y: 160 }} />
      <div className="sheet" style={{ top: '34%' }}>
        <div className="grab" />
        <div className="pad col" style={{ gap: 11 }}>
          <div className="row" style={{ padding: 0, gap: 11 }}>
            <Logo name="NCP" />
            <div className="meta"><b style={{ fontSize: 15 }}>NCP Trenchard St</b>
              <span className="zone">Multi-storey · 220m</span></div>
            <div className="price"><b style={{ fontSize: 19 }}>£3.20</b><span>per hour</span></div>
          </div>
          <div className="placeholder sk tight" style={{ height: 64, fontSize: 9 }}>STREET VIEW OF ENTRANCE</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="chip">24h</span><span className="chip">EV bays</span>
            <span className="chip">2.0m height</span><span className="chip">Blue Badge ✓</span>
          </div>
          <div className="between" style={{ fontSize: 12 }}><span className="muted">Daily max</span><b>£18.00</b></div>
          <div className="btn block big sk tight"><Icon name="nav" w={17} c="var(--accent-ink)" /> Navigate to entrance</div>
        </div>
      </div>
      <Annot><b>Pin → sheet snaps to detail.</b> Same surface, deeper — entrance street-view kills the "where's the door?" hunt.</Annot>
    </Phone>);

}

function B4() {
  return (
    <Phone>
      <BMap dim pins={[{ x: 160, y: 150, label: 'YOU', kind: 'car' }]} you={{ x: 160, y: 188 }} />
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 84, zIndex: 20 }}>
        <div className="sk col" style={{ padding: 13, gap: 10, background: 'var(--paper)' }}>
          <div className="between">
            <span className="label" style={{ color: 'var(--park)' }}>● PARKED HERE</span>
            <Conf pct={94} /></div>
          <div className="row" style={{ padding: 0, gap: 10 }}>
            <Logo name="RGo" />
            <div className="meta"><b style={{ fontSize: 15 }}>RingGo · Zone 8821</b>
              <span className="zone">£1.80/hr · max £9.50</span></div>
          </div>
          <div className="btn pay block sk tight"><Icon name="pound" w={16} c="var(--pay-ink)" /> Pay now →</div>
        </div>
      </div>
      <Annot><b>Parked FAB → map zooms to your car.</b> One focused card floats over the spot; everything else recedes.</Annot>
    </Phone>);

}

Object.assign(window, { A1, A2, A3, A4, B1, B2, B3, B4, DEST, PROVIDERS, FILTERS });