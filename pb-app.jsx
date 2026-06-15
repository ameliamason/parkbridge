/* ParkBridge prototype — app shell: flow state machine, annotations, tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3f6fd6",
  "sketch": "sketchy",
  "annotations": true
}/*EDITMODE-END*/;

const ACCENT_CLASS = {"#3f6fd6":"acc-cobalt", "#2f97a8":"acc-teal", "#7a5be0":"acc-violet"};

/* screen meta: title, PRD tag, one-line intent, branch */
const SCREENS = {
  home:      {n:"01", title:"Home · Live map",        prd:"F1 · Discovery",      branch:"plan",  intent:"Land straight on the map. Search up top to plan a journey; the full-width bar drops you into at-car mode."},
  search:    {n:"02", title:"Destination search",     prd:"F1 · Autocomplete",   branch:"plan",  intent:"UK-biased autocomplete. Saved & recent surface first when the field is empty."},
  results:   {n:"03", title:"Results · map + list",   prd:"F1 · Compare",        branch:"plan",  intent:"Every nearby option pinned and listed. Filter chips, sort by nearest/cheapest, tap a pin or row to select."},
  identify:  {n:"04", title:"Identifying (at-car)",   prd:"F2 · GPS identify",   branch:"park",  intent:"Two taps from home. GPS locks to a zone polygon; escape hatch to manual entry if the signal is weak."},
  located:   {n:"05", title:"Located · provider",     prd:"F2 · Identify result",branch:"park",  intent:"Provider, zone code, tariff and confidence. One green CTA deep-links to the payment screen."},
  fallback:  {n:"06", title:"GPS-fail fallback",      prd:"F2 · Fallback",       branch:"park",  intent:"Multi-storey / underground. Recover via QR scan, manual zone/postcode, or pick from nearby."},
};

/* margin notes per screen */
const NOTES = {
  home: [
    {side:"l", top:70,  text:"Map-first — no splash, no mode menu. The map IS the home."},
    {side:"r", top:430, text:"At-car entry lives as a persistent bar, reachable from anywhere."},
  ],
  search: [
    {side:"l", top:150, text:"Postcode, POI or venue. Biased to UK results."},
    {side:"r", top:300, text:"Home / Work / recents = the commuter's fast path."},
  ],
  results: [
    {side:"l", top:240, text:"Pins ↔ list stay in sync. Selecting one highlights the other."},
    {side:"r", top:360, text:"Sort + filter without leaving the comparison view."},
  ],
  identify: [
    {side:"l", top:300, text:"Show how certain we are — never a silent wrong answer."},
    {side:"r", top:430, text:"Always offer a way out before GPS even fails."},
  ],
  located: [
    {side:"l", top:250, text:"Zone code is the hero — it's what you type into the provider app."},
    {side:"r", top:470, text:"\"Always check the sign\" — PCN-liability guardrail."},
  ],
  fallback: [
    {side:"l", top:150, text:"The realistic failure: GPS dies in car parks."},
    {side:"r", top:330, text:"Three recoveries, ranked by speed."},
  ],
};

function MarginNotes({screen}) {
  const notes = NOTES[screen] || [];
  return (
    <React.Fragment>
      {notes.map((nt,i)=>(
        <div key={i} className={"margin-note "+nt.side} style={{top:nt.top}}>
          <span className="mn-arrow">{nt.side==="l"?"→":"←"}</span>
          <span className="mn-text">{nt.text}</span>
        </div>
      ))}
    </React.Fragment>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState(() => localStorage.getItem("pb_screen") || "home");
  const [dest, setDest] = React.useState("Guy's Hospital, SE1");
  const [paying, setPaying] = React.useState(false);
  const [anim, setAnim] = React.useState(0);

  React.useEffect(() => {
    const ac = ACCENT_CLASS[t.accent] || "acc-cobalt";
    document.body.className = `${ac} sk-${t.sketch} ` + (t.annotations ? "annot-on" : "annot-off");
  }, [t.accent, t.sketch, t.annotations]);

  const go = (s) => { setScreen(s); setAnim(a=>a+1); localStorage.setItem("pb_screen", s); };

  const pick = (s) => { setDest(s.big + (s.small?", "+s.small.split(",").pop().trim():"")); go("results"); };
  const pay = () => { setPaying(true); setTimeout(()=>setPaying(false), 2200); };

  const meta = SCREENS[screen];

  let view;
  switch(screen){
    case "home":     view = <HomeScreen onSearch={()=>go("search")} onParked={()=>go("identify")}/>; break;
    case "search":   view = <SearchScreen onPick={pick} onBack={()=>go("home")}/>; break;
    case "results":  view = <ResultsScreen dest={dest} onBack={()=>go("search")} onParked={()=>go("identify")}/>; break;
    case "identify": view = <IdentifyingScreen onLocated={()=>go("located")} onFallback={()=>go("fallback")}/>; break;
    case "located":  view = <LocatedScreen onPay={pay} onWrong={()=>go("fallback")} onBack={()=>go("home")}/>; break;
    case "fallback": view = <FallbackScreen onBack={()=>go("identify")} onResolved={()=>go("located")}/>; break;
    default: view = null;
  }

  const planSteps = [["home","Home"],["search","Search"],["results","Results"]];
  const parkSteps = [["identify","Identify"],["located","Located"],["fallback","Fallback"]];

  return (
    <div className="page">
      <header className="pb-head">
        <Brand/>
        <div className="col" style={{textAlign:"right",gap:2}}>
          <b style={{fontSize:13,letterSpacing:"-.2px"}}>MVP Wireframes</b>
          <span className="label">PHASE 1 · LONDON PILOT</span>
        </div>
      </header>

      <div className="flowrail">
        <div className="track">
          <span className="tracklabel">PLAN A JOURNEY</span>
          {planSteps.map(([s,lbl])=>(
            <span key={s} className={"step"+(screen===s?" on":"")} onClick={()=>go(s)}>{lbl}</span>
          ))}
        </div>
        <div className="track">
          <span className="tracklabel park">I'M PARKED</span>
          {parkSteps.map(([s,lbl])=>(
            <span key={s} className={"step"+(screen===s?" on":"")} onClick={()=>go(s)}>{lbl}</span>
          ))}
        </div>
      </div>

      <div className="stage">
        <MarginNotes screen={screen}/>
        <div className="phone">
          <StatusBar/>
          <div className="screenwrap" key={anim}>{view}</div>
          {paying && (
            <div className="scrim col" style={{alignItems:"center",justifyContent:"center",gap:14,zIndex:50}}>
              <div className="sk r2 col gap10" style={{background:"var(--paper)",padding:"22px 24px",alignItems:"center",width:"74%"}}>
                <span className="logo" style={{width:50,height:50,fontSize:12}}>RGo</span>
                <b style={{fontSize:15}}>Opening RingGo…</b>
                <span className="muted fmono" style={{fontSize:10,letterSpacing:.5,textAlign:"center"}}>HANDING OFF TO THE<br/>PROVIDER PAYMENT SCREEN</span>
                <div className="conf"><span className="bar" style={{width:90}}><i style={{width:"100%"}}></i></span></div>
              </div>
            </div>
          )}
          <div className="homebar"></div>
        </div>
      </div>

      <div className="caption">
        <div className="between" style={{width:"100%",maxWidth:520}}>
          <div className="col" style={{gap:3}}>
            <div style={{display:"flex",alignItems:"baseline",gap:9}}>
              <span className="capn">{meta.n}</span>
              <b style={{fontSize:16,letterSpacing:"-.3px"}}>{meta.title}</b>
              <span className="chip" style={{borderStyle:"dashed",fontSize:10}}>{meta.prd}</span>
            </div>
            <p className="muted" style={{fontSize:12.5,margin:0,lineHeight:1.45,maxWidth:500}}>{meta.intent}</p>
          </div>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Look"/>
        <TweakColor label="Accent" value={t.accent}
          options={["#3f6fd6","#2f97a8","#7a5be0"]}
          onChange={(v)=>setTweak("accent", v)}/>
        <TweakRadio label="Sketch" value={t.sketch} options={["sketchy","crisp","wobbly"]}
          onChange={(v)=>setTweak("sketch", v)}/>
        <TweakSection label="Review"/>
        <TweakToggle label="Margin annotations" value={t.annotations}
          onChange={(v)=>setTweak("annotations", v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
