/* ParkBridge prototype — shared parts: icons, brand, map field, London sample data */

const S = React.createElement; // not used; JSX below

/* ───────── Icons (simple stroke marks only) ───────── */
function Ic({d, size = 18, fill = "none", sw = 2, style, children}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{display:"block", flex:"0 0 auto", ...style}}>
      {d ? <path d={d}></path> : children}
    </svg>
  );
}
const IconSearch  = (p) => <Ic {...p}><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></Ic>;
const IconPin     = (p) => <Ic {...p}><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z"></path><circle cx="12" cy="10" r="2.4"></circle></Ic>;
const IconCar     = (p) => <Ic {...p}><path d="M3 13l1.6-4.4A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.6L21 13"></path><path d="M3 13h18v4a1 1 0 0 1-1 1h-1.5M3 13v4a1 1 0 0 0 1 1h1.5"></path><path d="M6.5 18v1.5M17.5 18v1.5"></path><circle cx="7" cy="15.5" r="1"></circle><circle cx="17" cy="15.5" r="1"></circle></Ic>;
const IconQr      = (p) => <Ic {...p} sw={1.8}><path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4z"></path><path d="M15 15h2v2M20 15v5h-5M17 20h3"></path></Ic>;
const IconBack    = (p) => <Ic {...p}><path d="M15 5l-7 7 7 7"></path></Ic>;
const IconChevron = (p) => <Ic {...p}><path d="M9 6l6 6-6 6"></path></Ic>;
const IconClock   = (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5V12l3 2"></path></Ic>;
const IconAccess  = (p) => <Ic {...p}><circle cx="12" cy="4.5" r="1.6"></circle><path d="M8 8h6M11 8v5h4l2 5M11 13a4 4 0 1 0 3.4 6"></path></Ic>;
const IconBolt    = (p) => <Ic {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6z"></path></Ic>;
const IconCheck   = (p) => <Ic {...p}><path d="M5 12.5l4.5 4.5L19 6.5"></path></Ic>;
const IconInfo    = (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5"></circle><path d="M12 11v5M12 7.6v.4"></path></Ic>;
const IconWarn    = (p) => <Ic {...p}><path d="M12 3.5L21 19H3z"></path><path d="M12 9.5v4M12 16.4v.3"></path></Ic>;
const IconNav     = (p) => <Ic {...p}><path d="M12 3l8 18-8-4-8 4z"></path></Ic>;
const IconTarget  = (p) => <Ic {...p}><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="2.2"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path></Ic>;
const IconStar    = (p) => <Ic {...p}><path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z"></path></Ic>;
const IconHome    = (p) => <Ic {...p}><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5"></path></Ic>;
const IconBriefcase=(p) => <Ic {...p}><rect x="3.5" y="8" width="17" height="11" rx="2"></rect><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></Ic>;
const IconKeypad  = (p) => <Ic {...p} sw={1.8}><circle cx="7" cy="7" r="1.1"></circle><circle cx="12" cy="7" r="1.1"></circle><circle cx="17" cy="7" r="1.1"></circle><circle cx="7" cy="12" r="1.1"></circle><circle cx="12" cy="12" r="1.1"></circle><circle cx="17" cy="12" r="1.1"></circle><circle cx="12" cy="17" r="1.1"></circle></Ic>;

function BrandMark({size = 22}) {
  return (
    <span className="mk">
      <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="var(--accent)"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"block", flex:"0 0 auto"}}>
        <path d="M1.5 12c2.4 0 2.4-4 5.5-4s3.1 4 5.5 4 2.4-4 3.5-4"></path>
        <path d="M1.5 12v2M16.5 12v2M6 9.2v4.8M12 9.2v4.8"></path>
      </svg>
    </span>
  );
}
function Brand({sub = "PARK · BRIDGE · PAY"}) {
  return (
    <div className="brand">
      <BrandMark/>
      <div className="col" style={{lineHeight:1}}>
        <b>ParkBridge</b>
        <small>{sub}</small>
      </div>
    </div>
  );
}

function StatusBar({dark}) {
  return (
    <div className="statusbar" style={dark ? {color:"var(--accent-ink)"} : null}>
      <span>9:41</span>
      <span className="dots"><i></i><i></i><i></i>&nbsp;<span style={{fontSize:10}}>5G</span>&nbsp;<span style={{fontSize:10}}>100</span></span>
    </div>
  );
}

/* ───────── Sketch map field ─────────
   Shared base streets; caller passes pins (each {x,y,price,kind}) + you/dest dots. */
function MapField({pins = [], you, dest, gpsRings, children, dim}) {
  return (
    <div className="mapf">
      <div className="blk" style={{left:18, top:24, width:74, height:52}}></div>
      <div className="blk" style={{left:118, top:14, width:96, height:44}}></div>
      <div className="blk" style={{right:14, top:64, width:66, height:84}}></div>
      <div className="blk" style={{left:34, bottom:118, width:88, height:62}}></div>
      <div className="blk" style={{right:24, bottom:96, width:78, height:58}}></div>
      <div className="blk" style={{left:26, bottom:24, width:70, height:60}}></div>
      <div className="water" style={{right:-26, top:-14, width:96, height:78}}></div>
      <div className="road" style={{left:0, top:104, width:"100%", height:7}}></div>
      <div className="road" style={{left:108, top:0, width:7, height:"100%"}}></div>
      <div className="road" style={{left:-30, top:188, width:"122%", height:6, transform:"rotate(-9deg)"}}></div>
      <div className="road" style={{right:30, top:0, width:6, height:"100%", transform:"rotate(4deg)"}}></div>
      <div className="road" style={{left:0, bottom:88, width:"100%", height:6}}></div>
      {gpsRings}
      {pins.map((p, i) => (
        <div key={i} className={"pin " + (p.cls || "")} style={{left:p.x, top:p.y}} onClick={p.onClick}>
          <span className="bub">{p.label}</span>
          <span className="stem"></span>
        </div>
      ))}
      {dest && <div className="pin dest" style={{left:dest.x, top:dest.y}}><span className="bub">{dest.label || "◎"}</span><span className="stem"></span></div>}
      {you && <div className="youdot" style={{left:you.x, top:you.y}}></div>}
      {dim && <div style={{position:"absolute", inset:0, background:"oklch(0.985 0.006 95 / .45)", zIndex:2}}></div>}
      {children}
    </div>
  );
}

/* ───────── London sample data ───────── */
const DESTINATION = "Guy's Hospital, London SE1";

const SUGGESTIONS = [
  {big:"Guy's Hospital", small:"Great Maze Pond, London SE1 9RT", icon:"pin"},
  {big:"Guy's & St Thomas' NHS", small:"Westminster Bridge Rd, SE1 7EH", icon:"pin"},
  {big:"Guildhall", small:"Gresham St, London EC2V 7HH", icon:"pin"},
  {big:"Guards Museum", small:"Birdcage Walk, London SW1E 6HQ", icon:"pin"},
];

const FAVOURITES = [
  {big:"Home", small:"Camberwell · SE5", icon:"home"},
  {big:"Work", small:"More London · SE1", icon:"work"},
  {big:"Tate Modern", small:"Bankside · SE1 9TG", icon:"star"},
];

/* results near Guy's Hospital — London tariffs */
const RESULTS = [
  {id:"ringgo", logo:"RGo",  name:"Great Maze Pond",      type:"On-street · 120m",   price:"£3.30", unit:"/hr",  tags:["Max 4h","Pay-by-app"],  dailymax:"—",        x:118, y:150, kind:"" },
  {id:"ncp",    logo:"NCP",  name:"NCP Snowsfields",       type:"Multi-storey · 280m", price:"£4.20", unit:"/hr", tags:["24h","ANPR"],           dailymax:"£24 daily", x:196, y:96,  kind:"alt" },
  {id:"qpark",  logo:"Q",    name:"Q-Park London Bridge",  type:"Multi-storey · 350m", price:"£5.00", unit:"/hr", tags:["Pre-book","Covered"],   dailymax:"£30 daily", x:248, y:172, kind:"alt" },
  {id:"justp",  logo:"JP",   name:"Driveway · Bermondsey", type:"Private · 410m",     price:"£2.50", unit:"/hr",  tags:["Book ahead","EV bay"],  dailymax:"£14 daily", x:128, y:214, kind:"alt" },
];

/* at-car identification result (on-street RingGo) */
const PARKED = {
  provider:"RingGo",
  logo:"RGo",
  zone:"SOUTHWARK · 36417",
  street:"Great Maze Pond, SE1",
  tariff:"£3.30",
  unit:"per hour",
  daymax:"£18 daily max",
  rules:["Max stay 4h","No return within 1h","Blue Badge ✓"],
  confidence:96,
  accuracy:"±8m",
  seconds:6,
};

Object.assign(window, {
  Ic, IconSearch, IconPin, IconCar, IconQr, IconBack, IconChevron, IconClock,
  IconAccess, IconBolt, IconCheck, IconInfo, IconWarn, IconNav, IconTarget,
  IconStar, IconHome, IconBriefcase, IconKeypad,
  BrandMark, Brand, StatusBar, MapField,
  DESTINATION, SUGGESTIONS, FAVOURITES, RESULTS, PARKED,
});
