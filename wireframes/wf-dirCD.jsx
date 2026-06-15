/* ParkBridge wireframes — Directions C (Smart Context) & D (Search Hub) */

// ════════════════════════════════════════════════════════════
// DIRECTION C — SMART CONTEXT  (app anticipates your mode)
// ════════════════════════════════════════════════════════════
function C1() {
  return (
    <Phone>
      <div className="ctx parked">
        <span className="blip"/> Stopped a moment ago · looks parked
      </div>
      <div className="pad col" style={{ flex:1, gap:13 }}>
        <div className="between"><Brand/><span className="chip warn">Not parked?</span></div>
        <div className="hero sk r3">
          <div className="top"><span className="label">PAY WHERE YOU ARE</span><Conf pct={92}/></div>
          <div className="row" style={{ padding:0, gap:11 }}>
            <Logo name="RGo"/>
            <div className="meta">
              <b style={{ fontSize:17, color:'var(--accent-ink)' }}>RingGo · Zone 8821</b>
              <span className="zone" style={{ color:'var(--accent-ink)', opacity:.85 }}>£1.80/hr · max £9.50</span>
            </div>
          </div>
          <div className="act pay">Pay now
            <span className="disc"><Icon name="chev" w={16} c="var(--pay-ink)" sw={2.4}/></span></div>
        </div>
        <div className="secondary sk tight">
          <span className="ic"><Icon name="map" w={17} c="var(--ink2)"/></span>
          <div className="meta"><b>Going somewhere later?</b><span>Plan & compare ahead — you usually park at The Office</span></div>
          <Icon name="chev" w={14} c="var(--ink3)"/>
        </div>
        <div style={{ display:'flex', gap:9 }}>
          <div className="chip" style={{ padding:'9px 12px' }}><Icon name="qr" w={13} c="var(--ink2)"/> Scan QR</div>
          <div className="chip" style={{ padding:'9px 12px' }}><Icon name="star" w={13} c="var(--ink2)"/> Saved</div>
          <div className="chip" style={{ padding:'9px 12px' }}><Icon name="clock" w={13} c="var(--ink2)"/> Recents</div>
        </div>
        <div style={{ flex:1 }}/>
      </div>
      <Annot><b>It assumes you just parked</b> — the pay card is waiting on open. Planning is the quiet row beneath.</Annot>
    </Phone>
  );
}

function C2() {
  return (
    <Phone>
      <div className="col" style={{ height:'100%' }}>
        <div className="row" style={{ padding:'9px 12px', gap:8 }}>
          <Icon name="back" w={17} c="var(--ink)"/>
          <div style={{ flex:1 }}><Search filled value={DEST}/></div>
        </div>
        <div className="map-region strip"><MapField pins={[{ x:80, y:46, label:'£1.80' },{ x:210, y:40, label:'£3.20', kind:'alt' }]} you={{ x:150, y:60 }}/></div>
        <div className="between" style={{ padding:'9px 13px 6px' }}>
          <span className="label">Ranked for you · 4 options</span><span className="chip">Why? ⓘ</span></div>
        <div className="col" style={{ flex:1, overflow:'hidden', gap:10, padding:'0 12px 12px' }}>
          {PROVIDERS.slice(0,3).map((p,i)=>(
            <div key={i} className="sk col" style={{ padding:12, gap:8 }}>
              <div className="row" style={{ padding:0, gap:10 }}>
                <Logo name={p.code}/>
                <div className="meta"><b style={{ fontSize:14 }}>{p.name}</b><span>{p.dist}</span></div>
                <div className="price"><b style={{ fontSize:17 }}>{p.price}</b><span>/hr</span></div>
              </div>
              {i===0 && <div style={{ display:'flex', gap:6 }}>
                <span className="chip on">Best value</span><span className="chip">Closest</span></div>}
            </div>
          ))}
        </div>
      </div>
      <Annot><b>A ranked card feed, not a map dump.</b> Map shrinks to a strip; the recommendation does the work.</Annot>
    </Phone>
  );
}

function C3() {
  return (
    <Phone>
      <div className="col" style={{ height:'100%' }}>
        <div className="row" style={{ padding:'9px 12px', gap:8 }}>
          <Icon name="back" w={17} c="var(--ink)"/>
          <div style={{ flex:1 }}><Search filled value={DEST}/></div>
        </div>
        <div className="col" style={{ flex:1, overflow:'hidden', gap:10, padding:'12px' }}>
          {/* expanded top card */}
          <div className="sk col" style={{ padding:13, gap:10 }}>
            <div className="row" style={{ padding:0, gap:10 }}>
              <Logo name="RGo"/>
              <div className="meta"><b style={{ fontSize:15 }}>RingGo Zone 8821</b><span className="zone">On-street · 90m</span></div>
              <div className="price"><b style={{ fontSize:18 }}>£1.80</b><span>/hr</span></div>
            </div>
            <hr className="divider"/>
            <div className="between" style={{ fontSize:12 }}><span className="muted">Daily max</span><b>£9.50</b></div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              <span className="chip">Max 4h</span><span className="chip warn">No return 1h</span><span className="chip">Blue Badge ✓</span></div>
            <div className="btn block sk tight"><Icon name="nav" w={16} c="var(--accent-ink)"/> Navigate here</div>
          </div>
          {/* collapsed below */}
          {PROVIDERS.slice(0,2).map((p,i)=>(
            <div key={i} className="row sk tight" style={{ padding:'10px 12px' }}>
              <Logo name={p.code}/>
              <div className="meta"><b style={{ fontSize:13 }}>{p.name}</b><span>{p.dist}</span></div>
              <Icon name="chev" w={14} c="var(--ink3)"/>
            </div>
          ))}
        </div>
      </div>
      <Annot><b>Detail expands in place.</b> The card grows inline — no new screen, you keep the list's context.</Annot>
    </Phone>
  );
}

function C4() {
  return (
    <Phone>
      <div className="ctx parked">
        <span className="blip"/> Stopped 2 min ago · looks parked
      </div>
      <div className="pad col" style={{ flex:1, gap:13 }}>
        <div className="between"><Brand/><span className="chip warn">Not parked?</span></div>
        <div className="sk r3 col" style={{ padding:16, gap:12 }}>
          <div className="between"><span className="label" style={{ color:'var(--park)' }}>● WE THINK YOU'RE AT</span>
            <Conf pct={91}/></div>
          <div className="row" style={{ padding:0, gap:11 }}>
            <Logo name="RGo"/>
            <div className="meta"><b style={{ fontSize:17 }}>RingGo · Zone 8821</b>
              <span className="zone">£1.80/hr · max £9.50</span></div>
          </div>
          <div className="btn pay block big sk tight"><Icon name="pound" w={17} c="var(--pay-ink)"/> Pay now →</div>
        </div>
        <div className="tcent" style={{ fontFamily:'var(--fhand)', fontSize:17, color:'var(--ink2)' }}>No tapping "I'm parked" — it's already here.</div>
        <div style={{ flex:1 }}/>
        <div className="between">
          <span className="chip"><Icon name="qr" w={13} c="var(--ink2)"/> Scan QR</span>
          <span className="chip">Wrong spot</span>
          <span className="chip">Set a reminder</span>
        </div>
      </div>
      <Annot><b>Parked is auto-detected.</b> The pay card is waiting when you open the app — zero taps to identify.</Annot>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════
// DIRECTION D — SEARCH HUB + BOTTOM NAV  (familiar tabbed app)
// ════════════════════════════════════════════════════════════
function TabBar({ active }) {
  const tabs = [
    { id:'search', label:'Search', ic:'mag' },
    { id:'saved', label:'Saved', ic:'star' },
    { id:'parked', label:'Parked', ic:'car', raised:true },
    { id:'you', label:'You', ic:'list' },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t=>{
        const on = active===t.id;
        if (t.raised) return (
          <div key={t.id} className={'tab raised' + (on ? ' on' : '')}>
            <span className="ic"><Icon name="car" w={22} c="var(--accent-ink)" sw={1.9}/></span>
            {t.label}
          </div>
        );
        return (
          <div key={t.id} className={'tab' + (on ? ' on' : '')}>
            <span className="ic"><Icon name={t.ic} w={20} c={on ? 'var(--accent)' : 'var(--ink3)'}/></span>
            {t.label}
          </div>
        );
      })}
    </div>
  );
}

function D1() {
  return (
    <Phone>
      <div className="col" style={{ height:'100%' }}>
        <div className="pad col" style={{ flex:1, gap:12 }}>
          <div className="between" style={{ marginTop:2 }}>
            <div><div className="label">PARK ANYWHERE IN THE UK</div>
              <b style={{ fontSize:21, letterSpacing:'-.4px' }}>ParkBridge</b></div>
            <Icon name="bridge" w={26} c="var(--accent)" sw={2}/>
          </div>
          <div className="hero sk" style={{ padding:18 }}>
            <div className="between">
              <div className="col" style={{ gap:4 }}>
                <span className="label" style={{ color:'var(--accent-ink)', opacity:.8 }}>RIGHT NOW</span>
                <b style={{ fontSize:20, letterSpacing:'-.4px' }}>I'm Parked — pay</b>
                <p style={{ margin:0, fontSize:12, opacity:.9 }}>Identify the provider & pay in two taps</p>
              </div>
              <span className="disc" style={{ width:52, height:52 }}><Icon name="car" w={24} c="var(--accent-ink)"/></span>
            </div>
          </div>
          <div className="search sk tight" style={{ background:'var(--paper)', padding:'13px 14px' }}>
            <span className="mag"><Icon name="mag" w={16} c="var(--ink3)"/></span>
            <span className="ph" style={{ fontSize:13.5 }}>Plan ahead — find parking somewhere else</span>
          </div>
          <span className="label" style={{ paddingLeft:2 }}>Favourites</span>
          <div style={{ display:'flex', gap:9 }}>
            {[['Home','star'],['Work','star'],['+ Add','pin']].map(([t,ic],i)=>(
              <div key={i} className="sk tight col" style={{ flex:1, padding:'11px 8px', gap:6, alignItems:'center' }}>
                <Icon name={ic} w={16} c={i<2?'var(--accent)':'var(--ink3)'}/>
                <span style={{ fontSize:11, fontWeight:600 }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="col sk tight" style={{ overflow:'hidden' }}>
            {[['Westfield Bristol','RingGo · 2 days ago'],['BRI Hospital','NCP · last week']].map(([a,b],i)=>(
              <div key={i} className="row" style={{ padding:'11px 12px' }}>
                <Icon name="clock" w={15} c="var(--ink3)"/>
                <div className="meta"><b style={{ fontSize:13 }}>{a}</b><span>{b}</span></div>
                <Icon name="chev" w={13} c="var(--ink3)"/>
              </div>
            ))}
          </div>
          <div style={{ flex:1 }}/>
        </div>
        <TabBar active="search"/>
      </div>
      <Annot><b>Even in a tabbed app, Parked leads</b> — a hero pay button up top and a raised Parked tab. Search stays one line below.</Annot>
    </Phone>
  );
}

function D2() {
  return (
    <Phone>
      <div className="col" style={{ height:'100%' }}>
        <div className="row" style={{ padding:'9px 12px', gap:8 }}>
          <Icon name="back" w={17} c="var(--ink)"/>
          <div style={{ flex:1 }}><Search filled value={DEST}/></div>
        </div>
        <div className="map-region strip"><MapField pins={[{ x:80, y:46, label:'£1.80' },{ x:210, y:42, label:'£3.20', kind:'alt' }]} you={{ x:150, y:58 }}/></div>
        <FilterChips items={FILTERS}/>
        <div className="col" style={{ flex:1, overflow:'hidden', borderTop:'1.5px solid var(--hair)' }}>
          {PROVIDERS.slice(0,3).map((p,i)=><ResRow key={i} {...p}/>)}
        </div>
        <TabBar active="search"/>
      </div>
      <Annot><b>Results = map strip + list,</b> with the tab bar always present. Conventional and predictable.</Annot>
    </Phone>
  );
}

function D3() {
  return (
    <Phone>
      <div className="col" style={{ height:'100%' }}>
        <div className="row" style={{ padding:'10px 13px', gap:9, borderBottom:'1.5px solid var(--hair)' }}>
          <Icon name="back" w={17} c="var(--ink)"/>
          <b style={{ flex:1, fontSize:15 }}>NCP Trenchard St</b>
          <Icon name="star" w={17} c="var(--ink3)"/>
        </div>
        <div className="col" style={{ flex:1, overflow:'hidden', padding:13, gap:12 }}>
          <div className="placeholder sk tight" style={{ height:96, fontSize:9 }}>MAP / PHOTO OF CAR PARK</div>
          <div className="between">
            <div><b style={{ fontSize:20 }}>£3.20</b><span className="muted" style={{ fontSize:12 }}> /hr · £18 daily</span></div>
            <span className="chip on">Open · 24h</span>
          </div>
          <div className="col sk tight" style={{ overflow:'hidden' }}>
            {[['1 hour','£3.20'],['3 hours','£8.40'],['All day','£18.00'],['Overnight','£12.00']].map(([a,b],i)=>(
              <div key={i} className="between" style={{ padding:'10px 13px', borderTop:i?'1.5px solid var(--hair)':'none', fontSize:13 }}>
                <span className="muted">{a}</span><b className="fmono">{b}</b></div>
            ))}
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <span className="chip">EV bays</span><span className="chip">2.0m height</span><span className="chip">Blue Badge ✓</span></div>
          <div style={{ flex:1 }}/>
          <div className="btn block big sk tight"><Icon name="nav" w={17} c="var(--accent-ink)"/> Navigate to entrance</div>
        </div>
        <TabBar active="search"/>
      </div>
      <Annot><b>Detail is a full page,</b> not a sheet — room for a tariff table. Back chevron returns to results.</Annot>
    </Phone>
  );
}

function D4() {
  return (
    <Phone>
      <div className="col" style={{ height:'100%' }}>
        <div className="pad col" style={{ flex:1, gap:13 }}>
          <div className="between" style={{ marginTop:2 }}>
            <div><div className="label" style={{ color:'var(--park)' }}>PARKED</div>
              <b style={{ fontSize:21, letterSpacing:'-.4px' }}>Where you parked</b></div>
            <Icon name="car" w={24} c="var(--park)"/>
          </div>
          <div className="sk col" style={{ padding:14, gap:10 }}>
            <div className="between"><span className="label">DETECTED PROVIDER</span><Conf pct={96}/></div>
            <div className="row" style={{ padding:0, gap:11 }}>
              <Logo name="RGo"/>
              <div className="meta"><b style={{ fontSize:16 }}>RingGo · Zone 8821</b>
                <span className="zone">£1.80/hr · max £9.50</span></div>
            </div>
            <div className="btn pay block big sk tight"><Icon name="pound" w={17} c="var(--pay-ink)"/> Pay in RingGo →</div>
          </div>
          <div className="between">
            <span className="chip"><Icon name="qr" w={13} c="var(--ink2)"/> Scan QR</span>
            <span className="chip">Enter postcode</span>
            <span className="chip warn">Wrong?</span>
          </div>
          <div className="placeholder sk tight" style={{ height:40, fontSize:9 }}>⚠ CHECK SIGNAGE BEFORE PAYING</div>
          <div style={{ flex:1 }}/>
        </div>
        <TabBar active="parked"/>
      </div>
      <Annot><b>"Parked" is its own tab.</b> Always reachable, but you choose it — identification isn't automatic here.</Annot>
    </Phone>
  );
}

Object.assign(window, { C1, C2, C3, C4, D1, D2, D3, D4, TabBar });
