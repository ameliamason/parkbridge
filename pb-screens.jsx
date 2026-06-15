/* ParkBridge prototype — screens (render inside the phone .body) */

/* ════════ HOME · map canvas + both entry modes ════════ */
function HomeScreen({onSearch, onParked}) {
  return (
    <div className="body">
      <div className="map-region">
        <MapField
          you={{x:160, y:300}}
          pins={[
            {x:118,y:150,label:"£3.30",cls:"alt"},
            {x:208,y:104,label:"£4.20",cls:"alt"},
            {x:250,y:188,label:"£5.00",cls:"alt"},
            {x:104,y:236,label:"£2.50",cls:"alt"},
          ]}
        />
        {/* top floating brand + search */}
        <div style={{position:"absolute", top:10, left:12, right:12, zIndex:22}}>
          <div className="between" style={{marginBottom:10}}>
            <Brand/>
            <div className="fab ghost" style={{position:"static", padding:"8px 10px"}}><IconTarget size={16}/></div>
          </div>
          <div className="sk tight search filled" onClick={onSearch}
               style={{background:"var(--paper)", boxShadow:"0 6px 18px oklch(0.29 0.02 262 / .16)"}}>
            <IconSearch className="mag"/>
            <span className="ph muted" style={{fontWeight:500}}>Where are you headed?</span>
          </div>
        </div>
        <div className="label" style={{position:"absolute", left:"50%", top:280, transform:"translateX(-50%)",
             background:"var(--paper)", padding:"3px 8px", borderRadius:10, border:"1.5px solid var(--hair)", zIndex:5}}>
          YOU ARE HERE
        </div>
      </div>
      {/* bottom full-width Pay-here bar — the at-car entry */}
      <div style={{position:"absolute", left:0, right:0, bottom:0, zIndex:25, padding:"0 12px 18px"}}>
        <div className="sk r2 btn park big block" onClick={onParked}
             style={{flexDirection:"column", alignItems:"stretch", gap:6, padding:"16px 18px", borderRadius:22}}>
          <div className="between">
            <span style={{display:"flex",alignItems:"center",gap:9,fontSize:16,fontWeight:700}}><IconCar size={20}/> I'm parked — how do I pay?</span>
            <IconChevron size={18}/>
          </div>
          <span style={{fontFamily:"var(--fmono)",fontSize:10,opacity:.85,letterSpacing:.3,textTransform:"none"}}>
            Uses GPS to find your provider & zone in two taps
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════ SEARCH · destination autocomplete ════════ */
function SuggIcon({type}) {
  const m = {pin:IconPin, home:IconHome, work:IconBriefcase, star:IconStar};
  const I = m[type] || IconPin;
  return <span className="logo" style={{borderStyle:"solid",background:"var(--paper2)"}}><I size={18}/></span>;
}
function SearchScreen({onPick, onBack}) {
  const [q, setQ] = React.useState("Guy's");
  const inputRef = React.useRef(null);
  React.useEffect(() => { if(inputRef.current) inputRef.current.focus(); }, []);
  const showSugg = q.trim().length > 0;
  return (
    <div className="body">
      <div className="pad col gap10" style={{paddingBottom:8}}>
        <div className="between">
          <div className="fab ghost" style={{position:"static",padding:"8px 10px"}} onClick={onBack}><IconBack size={16}/></div>
          <span className="label">PLAN A JOURNEY</span>
          <span style={{width:34}}></span>
        </div>
        <div className="sk tight search filled" style={{borderColor:"var(--accent)"}}>
          <IconSearch className="mag" style={{color:"var(--accent)"}}/>
          <input ref={inputRef} value={q} onChange={(e)=>setQ(e.target.value)}
                 placeholder="Postcode, place or venue"/>
          {q && <span onClick={()=>setQ("")} style={{cursor:"pointer",color:"var(--ink3)",fontFamily:"var(--fmono)",fontSize:14}}>✕</span>}
        </div>
      </div>
      <div className="col" style={{flex:"1 1 auto", overflow:"hidden"}}>
        {showSugg ? (
          <div className="col">
            {SUGGESTIONS.map((s,i)=>(
              <div className="row" key={i} onClick={()=>onPick(s)}>
                <SuggIcon type={s.icon}/>
                <div className="meta"><b>{s.big}</b><span style={{fontFamily:"var(--fui)"}}>{s.small}</span></div>
                <IconChevron size={16} style={{color:"var(--ink3)"}}/>
              </div>
            ))}
          </div>
        ) : (
          <div className="col">
            <div className="label pad" style={{paddingBottom:6}}>SAVED & RECENT</div>
            {FAVOURITES.map((s,i)=>(
              <div className="row" key={i} onClick={()=>onPick(s)}>
                <SuggIcon type={s.icon}/>
                <div className="meta"><b>{s.big}</b><span style={{fontFamily:"var(--fui)"}}>{s.small}</span></div>
                <IconStar size={15} style={{color:"var(--ink3)"}}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════ RESULTS · map + sortable list ════════ */
const FILTERS = ["Under £4","Covered","Accessible","Pre-book","On-street","24h"];
function ResultsScreen({dest, onBack, onParked}) {
  const [sort, setSort] = React.useState("near");           // near | cheap
  const [sel, setSel] = React.useState("ringgo");
  const [active, setActive] = React.useState(()=>new Set());
  const toggle = (f) => setActive(prev => { const n = new Set(prev); n.has(f)?n.delete(f):n.add(f); return n; });
  const list = React.useMemo(() => {
    const arr = [...RESULTS];
    if (sort === "cheap") arr.sort((a,b)=>parseFloat(a.price.slice(1))-parseFloat(b.price.slice(1)));
    return arr;
  }, [sort]);
  const pins = RESULTS.map(r => ({
    x:r.x, y:r.y, label:r.price, cls:(r.id===sel?"sel":"alt"), onClick:()=>setSel(r.id),
  }));
  return (
    <div className="body">
      <div className="pad col gap8" style={{paddingBottom:8, zIndex:22}}>
        <div className="sk tight search filled" onClick={onBack} style={{padding:"10px 13px"}}>
          <IconBack className="mag" style={{color:"var(--ink)"}}/>
          <span className="ph" style={{fontWeight:600}}>{dest}</span>
          <IconSearch size={15} style={{color:"var(--ink3)"}}/>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2,margin:"0 -2px"}}>
          {FILTERS.map(f=>(
            <span key={f} className={"chip"+(active.has(f)?" on":"")} onClick={()=>toggle(f)}>{f}</span>
          ))}
        </div>
      </div>
      <div className="map-region" style={{flex:"0 0 186px"}}>
        <MapField
          you={{x:160, y:300}}
          dest={{x:170, y:120, label:"◎"}}
          pins={pins}
        />
        <div className="fab ghost" style={{right:12, top:12, padding:"8px 11px", fontSize:12}}><IconTarget size={14}/> Recentre</div>
      </div>
      {/* bottom sheet list */}
      <div className="sheet" style={{maxHeight:"none", position:"relative", flex:"1 1 auto", borderRadius:"24px 24px 0 0", marginTop:-22, zIndex:18}}>
        <div className="grab"></div>
        <div className="between pad" style={{padding:"4px 14px 8px"}}>
          <span className="label">{RESULTS.length} RESULTS · WITHIN 400M</span>
          <span className="chip" onClick={()=>setSort(s=>s==="near"?"cheap":"near")} style={{fontWeight:600}}>
            {sort==="near"?"Nearest first":"Cheapest first"} ▾
          </span>
        </div>
        <div className="col" style={{overflowY:"auto"}}>
          {list.map(r=>(
            <div className={"row"+(r.id===sel?" sel":"")} key={r.id} onClick={()=>setSel(r.id)}>
              <span className="logo">{r.logo}</span>
              <div className="meta">
                <b>{r.name}</b>
                <span>{r.type}</span>
                <div style={{display:"flex",gap:5,marginTop:5,flexWrap:"wrap"}}>
                  {r.tags.map(t=><span key={t} className="chip" style={{padding:"2px 7px",fontSize:10}}>{t}</span>)}
                </div>
              </div>
              <div className="price">
                <b>{r.price}</b><span>{r.unit}</span>
                <span style={{marginTop:2}}>{r.dailymax}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════ IDENTIFYING · GPS loading ════════ */
function IdentifyingScreen({onLocated, onFallback}) {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const t1 = setInterval(()=>setPct(p=>Math.min(100, p+4)), 90);
    const t2 = setTimeout(onLocated, 2600);
    return () => { clearInterval(t1); clearTimeout(t2); };
  }, []);
  const rings = [40,70,104].map((r,i)=>(
    <div key={i} className="gpsring" style={{left:160, top:264, width:r*2, height:r*2,
      opacity:0.5 - i*0.13, animation:`pbpulse 2s ${i*0.3}s infinite ease-out`}}></div>
  ));
  return (
    <div className="body">
      <div className="map-region">
        <MapField you={{x:160, y:264}} gpsRings={rings} dim/>
        <div className="col gap10" style={{position:"absolute", inset:0, alignItems:"center", justifyContent:"flex-end",
             padding:"0 18px 22px", zIndex:10}}>
          <div className="sk r2 col gap8" style={{width:"100%", padding:"18px 18px 16px", background:"var(--paper)"}}>
            <span className="label">AT-CAR MODE · IDENTIFYING</span>
            <b style={{fontSize:18, letterSpacing:"-.4px"}}>Finding your parking location…</b>
            <div className="conf"><span>GPS lock</span>
              <span className="bar" style={{width:"100%"}}><i style={{width:pct+"%"}}></i></span>
              <span>±8m</span>
            </div>
            <p className="muted" style={{fontSize:11.5, margin:"2px 0 0", lineHeight:1.4}}>
              Matching your position to a parking zone polygon.
            </p>
            <div className="sk tight row" style={{justifyContent:"center", gap:8, padding:"10px", marginTop:4}}
                 onClick={onFallback}>
              <IconWarn size={15} style={{color:"var(--ink2)"}}/>
              <b style={{fontSize:12.5}}>Weak signal? Enter manually</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════ LOCATED · provider + zone + pay ════════ */
function LocatedScreen({onPay, onWrong, onBack}) {
  const p = PARKED;
  return (
    <div className="body">
      <div className="map-region" style={{flex:"0 0 150px"}}>
        <MapField you={{x:150, y:90}} pins={[{x:150,y:96,label:"● PARKED",cls:"car"}]}/>
        <div className="fab ghost" style={{left:12, top:12, padding:"7px 10px", fontSize:12}} onClick={onBack}><IconBack size={14}/> Home</div>
      </div>
      <div className="col gap10 pad" style={{flex:"1 1 auto", overflowY:"auto"}}>
        <div className="between">
          <span className="label">IDENTIFIED IN {p.seconds}s · GPS {p.accuracy}</span>
          <span className="conf"><span>{p.confidence}%</span><span className="bar"><i style={{width:p.confidence+"%"}}></i></span></span>
        </div>
        <div className="sk r2 col gap10" style={{padding:16}}>
          <div className="row" style={{padding:0, cursor:"default"}}>
            <span className="logo" style={{width:46,height:46,fontSize:11}}>{p.logo}</span>
            <div className="meta">
              <b style={{fontSize:16}}>{p.provider}</b>
              <span style={{fontFamily:"var(--fui)"}}>{p.street}</span>
            </div>
          </div>
          <div className="sk tight col" style={{background:"var(--paper2)", padding:"11px 13px", gap:3, transform:"none", borderRadius:12}}>
            <span className="label">ZONE / LOCATION CODE</span>
            <span className="zone" style={{fontSize:22}}>{p.zone}</span>
          </div>
          <div className="between">
            <div className="col"><span className="label">TARIFF</span><b style={{fontSize:20}}>{p.tariff}<span style={{fontSize:12,fontWeight:500}} className="muted"> {p.unit}</span></b></div>
            <div className="col" style={{textAlign:"right"}}><span className="label">CAP</span><b style={{fontSize:14}}>{p.daymax}</b></div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {p.rules.map(r=><span key={r} className="chip">{r}</span>)}
          </div>
        </div>
        <div className="sk r3 btn pay big block" onClick={onPay}
             style={{flexDirection:"column", gap:4, padding:"15px", borderRadius:18}}>
          <span style={{fontSize:16,fontWeight:700,display:"flex",alignItems:"center",gap:8}}>Pay with {p.provider} <IconChevron size={16}/></span>
          <span style={{fontFamily:"var(--fmono)",fontSize:9.5,opacity:.9,letterSpacing:.3}}>OPENS RINGGO AT THE PAYMENT SCREEN</span>
        </div>
        <div className="between" style={{padding:"0 2px"}}>
          <span className="chip warn"><IconWarn size={13}/> Always check the sign on street</span>
          <span className="chip" onClick={onWrong} style={{borderStyle:"dashed"}}>Not right? ⓘ</span>
        </div>
      </div>
    </div>
  );
}

/* ════════ FALLBACK · GPS failed (multi-storey) ════════ */
function FallbackScreen({onBack, onResolved}) {
  const [mode, setMode] = React.useState("choose");  // choose | qr | manual
  const [code, setCode] = React.useState("");
  return (
    <div className="body">
      <div className="pad col gap10" style={{flex:"1 1 auto"}}>
        <div className="between">
          <div className="fab ghost" style={{position:"static",padding:"8px 10px"}} onClick={mode==="choose"?onBack:()=>setMode("choose")}><IconBack size={16}/></div>
          <span className="label">SIGNAL LOST</span>
          <span style={{width:34}}></span>
        </div>
        <div className="sk tight col gap6" style={{padding:"12px 14px", background:"oklch(0.95 0.04 82)", borderColor:"oklch(0.66 0.13 70 / .55)"}}>
          <b style={{fontSize:14,display:"flex",alignItems:"center",gap:7,color:"oklch(0.45 0.11 68)"}}><IconWarn size={16}/> No GPS — likely a multi-storey</b>
          <span className="muted" style={{fontSize:11.5,lineHeight:1.4}}>GPS often fails above level 2 and underground. Identify your zone another way:</span>
        </div>

        {mode==="choose" && (
          <div className="col gap10" style={{flex:"1 1 auto"}}>
            <div className="sk r2 tile go" onClick={()=>setMode("qr")} style={{minHeight:0, padding:16, flexDirection:"row", alignItems:"center", gap:12}}>
              <IconQr size={26}/><div className="col" style={{gap:2}}><h3 style={{fontSize:15}}>Scan a QR code</h3><p style={{color:"var(--accent-ink)",opacity:.85}}>On the meter, sign or bay marking</p></div>
            </div>
            <div className="sk r3 tile" onClick={()=>setMode("manual")} style={{minHeight:0, padding:16, flexDirection:"row", alignItems:"center", gap:12, background:"var(--paper2)"}}>
              <IconKeypad size={26}/><div className="col" style={{gap:2}}><h3 style={{fontSize:15}}>Enter zone or postcode</h3><p>Type the code shown on the sign</p></div>
            </div>
            <div className="col" style={{flex:"1 1 auto"}}>
              <div className="label" style={{padding:"4px 2px"}}>OR PICK FROM NEARBY</div>
              {RESULTS.slice(0,2).map(r=>(
                <div className="row sk tight" key={r.id} onClick={onResolved} style={{marginBottom:7, padding:"9px 11px"}}>
                  <span className="logo" style={{width:32,height:32}}>{r.logo}</span>
                  <div className="meta"><b style={{fontSize:13}}>{r.name}</b><span>{r.type}</span></div>
                  <IconChevron size={15} style={{color:"var(--ink3)"}}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode==="qr" && (
          <div className="col gap10" style={{flex:"1 1 auto", alignItems:"center", justifyContent:"center"}}>
            <div className="placeholder" style={{width:208, height:208, borderRadius:18, position:"relative", borderWidth:2, borderStyle:"solid", borderColor:"var(--ink)", background:"oklch(0.22 0.02 262)"}}>
              <span style={{color:"var(--paper2)"}}>CAMERA</span>
              {[[0,0,"nwse"],[1,0],[0,1],[1,1]].map((c,i)=>(
                <span key={i} style={{position:"absolute",width:30,height:30,borderColor:"var(--accent)",
                  [c[0]?"right":"left"]:10,[c[1]?"bottom":"top"]:10,
                  borderTop:c[1]?0:"3px solid",borderBottom:c[1]?"3px solid":0,
                  borderLeft:c[0]?0:"3px solid",borderRight:c[0]?"3px solid":0}}></span>
              ))}
            </div>
            <b style={{fontSize:14}}>Point at the code on the meter or sign</b>
            <span className="muted" style={{fontSize:11.5}}>RingGo, PayByPhone & council signs supported</span>
            <button className="sk r2 btn block" onClick={onResolved} style={{marginTop:4}}>Simulate scan ✓</button>
          </div>
        )}

        {mode==="manual" && (
          <div className="col gap12" style={{flex:"1 1 auto"}}>
            <div className="col gap6">
              <span className="label">ZONE / LOCATION CODE</span>
              <div className="sk tight search filled" style={{borderColor:"var(--accent)"}}>
                <IconKeypad size={16} style={{color:"var(--accent)"}}/>
                <input autoFocus value={code} onChange={(e)=>setCode(e.target.value)} placeholder="e.g. 36417" inputMode="numeric"/>
              </div>
              <span className="muted" style={{fontSize:11}}>Printed on every RingGo / PayByPhone sign.</span>
            </div>
            <div className="between" style={{gap:8}}>
              <div className="divider" style={{flex:1}}></div><span className="label">OR</span><div className="divider" style={{flex:1}}></div>
            </div>
            <div className="col gap6">
              <span className="label">POSTCODE</span>
              <div className="sk tight search filled">
                <IconPin size={16} style={{color:"var(--ink3)"}}/>
                <input placeholder="SE1 9RT"/>
              </div>
            </div>
            <button className="sk r2 btn block big" onClick={onResolved} style={{marginTop:"auto"}}>Find this zone</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, SearchScreen, ResultsScreen, IdentifyingScreen, LocatedScreen, FallbackScreen });
