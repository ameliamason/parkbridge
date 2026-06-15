/* ParkBridge wireframe kit — shared primitives.
   Exports to window so the screen file can use them. */

// ── minimal line icons (simple shapes only) ──────────────────
function Icon({ name, w = 18, c = 'currentColor', sw = 1.8 }) {
  const p = {
    pin:  <><path d="M9 16s5.5-4.6 5.5-8.5A5.5 5.5 0 0 0 3.5 7.5C3.5 11.4 9 16 9 16Z"/><circle cx="9" cy="7.4" r="1.9"/></>,
    car:  <><path d="M2.5 11.5V9l1.6-3.4A1.6 1.6 0 0 1 5.6 4.7h6.8a1.6 1.6 0 0 1 1.5 1l1.6 3.3v2.5"/><path d="M2.5 11.5h13M4 11.5v1.6M14 11.5v1.6"/><circle cx="5.4" cy="11.5" r="1.1"/><circle cx="12.6" cy="11.5" r="1.1"/></>,
    mag:  <><circle cx="8" cy="8" r="5"/><path d="M12 12l3.5 3.5"/></>,
    nav:  <><path d="M16 2 2 8.3l6 1.7 1.7 6L16 2Z"/></>,
    star: <path d="M9 2.5l1.9 3.9 4.3.6-3.1 3 .8 4.3L9 12.3l-3.9 2 .8-4.3-3.1-3 4.3-.6L9 2.5Z"/>,
    list: <><path d="M6 5h10M6 9h10M6 13h10"/><circle cx="2.8" cy="5" r=".5"/><circle cx="2.8" cy="9" r=".5"/><circle cx="2.8" cy="13" r=".5"/></>,
    map:  <><path d="M2.5 5 7 3.2 11 5l4.5-1.8v9.6L11 14.6 7 12.8 2.5 14.6V5Z"/><path d="M7 3.2v9.6M11 5v9.6"/></>,
    clock:<><circle cx="9" cy="9" r="6.3"/><path d="M9 5.4V9l2.4 1.6"/></>,
    bridge: <><path d="M1.5 12c2.4 0 2.4-4 5.5-4s3.1 4 5.5 4 2.4-4 3.5-4"/><path d="M1.5 12v2M16.5 12v2M6 9.2v4.8M12 9.2v4.8"/></>,
    qr:   <><rect x="2.5" y="2.5" width="5" height="5"/><rect x="10.5" y="2.5" width="5" height="5"/><rect x="2.5" y="10.5" width="5" height="5"/><path d="M10.5 10.5h2v2M14 14v1.5M15.5 10.5v3"/></>,
    chev: <path d="M5 3l5 6-5 6"/>,
    back: <path d="M11 3 5.5 9 11 15"/>,
    bolt: <path d="M10 2 4 10h4l-1 6 6-8H9l1-6Z"/>,
    pound:<path d="M11 4.5A2.5 2.5 0 0 0 6.5 6.2c0 2-.5 4.3-2 5.8h7M5 9h4.5M4.5 12h9"/>,
  }[name];
  return (
    <svg width={w} height={w} viewBox="0 0 18 18" fill="none" stroke={c}
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
         style={{ display:'block', flex:'0 0 auto' }}>{p}</svg>
  );
}

function Phone({ children }) {
  return (
    <div className="ab">
      <div className="phone">
        <div className="screen">
          <div className="statusbar">
            <span>9:41</span>
            <span className="dots"><i/><i/><i/></span>
          </div>
          <div className="body">{children}</div>
          <div className="homebar"/>
        </div>
      </div>
    </div>
  );
}

function Brand({ sub = 'PARK · BRIDGE · PAY' }) {
  return (
    <div className="brand">
      <span className="mk"><Icon name="bridge" w={22} c="var(--accent)" sw={2}/></span>
      <div className="col" style={{ lineHeight: 1 }}>
        <b>ParkBridge</b>
        <small>{sub}</small>
      </div>
    </div>
  );
}

function Annot({ children }) {
  return (
    <div className="annot">
      <span className="arr"><Icon name="bolt" w={15} c="var(--accent)" sw={2}/></span>
      <div>{children}</div>
    </div>
  );
}

// ── sketch map field with roads, blocks, water ───────────────
function MapField({ pins = [], you, dim }) {
  return (
    <div className="mapf">
      <div className="blk" style={{ left:24, top:30, width:70, height:54 }}/>
      <div className="blk" style={{ left:120, top:18, width:90, height:40 }}/>
      <div className="blk" style={{ right:18, top:70, width:64, height:74 }}/>
      <div className="blk" style={{ left:40, bottom:40, width:84, height:60 }}/>
      <div className="blk" style={{ right:30, bottom:24, width:74, height:50 }}/>
      <div className="water" style={{ right:-20, top:-10, width:90, height:70 }}/>
      {/* roads */}
      <div className="road" style={{ left:0, top:96, width:'100%', height:7 }}/>
      <div className="road" style={{ left:108, top:0, width:7, height:'100%' }}/>
      <div className="road" style={{ left:-30, top:170, width:'120%', height:6, transform:'rotate(-9deg)' }}/>
      <div className="road" style={{ right:24, top:0, width:6, height:'100%', transform:'rotate(4deg)' }}/>
      {pins.map((p, i) => (
        <div key={i} className={'pin ' + (p.kind || '')} style={{ left:p.x, top:p.y }}>
          <span className="bub">{p.label}</span>
          <span className="stem"/>
        </div>
      ))}
      {you && <div className="youdot" style={{ left:you.x, top:you.y }}/>}
      {dim && <div className="scrim"/>}
    </div>
  );
}

function Search({ value, placeholder = 'Where are you going?', filled, cls = '' }) {
  return (
    <div className={'search sk tight ' + (filled ? 'filled ' : '') + cls} style={{ margin: 0 }}>
      <span className="mag"><Icon name="mag" w={16} c="var(--ink3)"/></span>
      <span className="ph">{filled ? value : placeholder}</span>
    </div>
  );
}

function Logo({ name }) {
  return <div className="logo">{name}</div>;
}

// one parking result row (used in list + sheets)
function ResRow({ name, code, price, per = '/hr', dist, tags = [], sponsor }) {
  return (
    <div className="row">
      <Logo name={code}/>
      <div className="meta">
        <b>{name}{sponsor && <span className="chip sponsor" style={{ marginLeft:6, verticalAlign:'middle' }}>AD</span>}</b>
        <span>{dist}</span>
        {tags.length > 0 && (
          <div style={{ display:'flex', gap:5, marginTop:5, flexWrap:'wrap' }}>
            {tags.map((t, i) => <span key={i} className="chip">{t}</span>)}
          </div>
        )}
      </div>
      <div className="price">
        <b>{price}</b><span>{per}</span>
      </div>
    </div>
  );
}

function Conf({ pct }) {
  return (
    <span className="conf">
      <span className="bar"><i style={{ width: pct + '%' }}/></span>
      {pct}% sure
    </span>
  );
}

function FilterChips({ items }) {
  return (
    <div style={{ display:'flex', gap:7, padding:'10px 13px', overflow:'hidden' }}>
      {items.map((t, i) => (
        <span key={i} className={'chip' + (t.on ? ' on' : '')}>{t.on && '✓ '}{t.label}</span>
      ))}
    </div>
  );
}

Object.assign(window, { Icon, Phone, Brand, Annot, MapField, Search, Logo, ResRow, Conf, FilterChips });
