/* ParkBridge wireframes — app shell: tweaks → body classes, canvas layout */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "surface": "Paper",
  "accent": "Cobalt",
  "sketch": "Sketchy",
  "mapEmph": "Map-first",
  "annotations": true
}/*EDITMODE-END*/;

const SURFACE = { 'Paper':'', 'Blueprint':'bp' };
const ACCENT  = { 'Cobalt':'acc-cobalt', 'Teal':'acc-teal', 'Violet':'acc-violet' };
const SKETCH  = { 'Crisp':'sk-crisp', 'Sketchy':'sk-sketchy', 'Wobbly':'sk-wobbly' };
const MAPEMPH = { 'Map-first':'map-first', 'Balanced':'map-balanced', 'List-first':'list-first' };

const AW = 360, AH = 772;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const cls = [
      SURFACE[t.surface], ACCENT[t.accent], SKETCH[t.sketch], MAPEMPH[t.mapEmph],
      t.annotations ? '' : 'annot-off',
    ].filter(Boolean);
    document.body.className = cls.join(' ');
  }, [t.surface, t.accent, t.sketch, t.mapEmph, t.annotations]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="A" title="A · Parked-First Stack" subtitle="I'm-Parked is the hero; Plan a Journey sits quietly beneath">
          <DCArtboard id="a1" label="A1 · Home" width={AW} height={AH}><A1/></DCArtboard>
          <DCArtboard id="a2" label="A2 · Compare" width={AW} height={AH}><A2/></DCArtboard>
          <DCArtboard id="a3" label="A3 · Detail" width={AW} height={AH}><A3/></DCArtboard>
          <DCArtboard id="a4" label="A4 · I'm Parked" width={AW} height={AH}><A4/></DCArtboard>
        </DCSection>

        <DCSection id="B" title="B · Map Canvas" subtitle="Land on the live map; a full-width Pay-here bar is the hero, planning is the quiet pill">
          <DCArtboard id="b1" label="B1 · Home / Map" width={AW} height={AH}><B1/></DCArtboard>
          <DCArtboard id="b2" label="B2 · Compare" width={AW} height={AH}><B2/></DCArtboard>
          <DCArtboard id="b3" label="B3 · Detail" width={AW} height={AH}><B3/></DCArtboard>
          <DCArtboard id="b4" label="B4 · I'm Parked" width={AW} height={AH}><B4/></DCArtboard>
        </DCSection>

        <DCSection id="C" title="C · Smart Context" subtitle="Assumes you just parked — pay card waiting on open; planning is secondary">
          <DCArtboard id="c1" label="C1 · Home" width={AW} height={AH}><C1/></DCArtboard>
          <DCArtboard id="c2" label="C2 · Compare" width={AW} height={AH}><C2/></DCArtboard>
          <DCArtboard id="c3" label="C3 · Detail" width={AW} height={AH}><C3/></DCArtboard>
          <DCArtboard id="c4" label="C4 · I'm Parked" width={AW} height={AH}><C4/></DCArtboard>
        </DCSection>

        <DCSection id="D" title="D · Search Hub" subtitle="Familiar tabbed app — Parked leads via a hero button + raised tab; Search just below">
          <DCArtboard id="d1" label="D1 · Home" width={AW} height={AH}><D1/></DCArtboard>
          <DCArtboard id="d2" label="D2 · Compare" width={AW} height={AH}><D2/></DCArtboard>
          <DCArtboard id="d3" label="D3 · Detail" width={AW} height={AH}><D3/></DCArtboard>
          <DCArtboard id="d4" label="D4 · Parked tab" width={AW} height={AH}><D4/></DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Surface & accent"/>
        <TweakRadio label="Surface" value={t.surface} options={['Paper','Blueprint']}
                    onChange={(v)=>setTweak('surface', v)}/>
        <TweakRadio label="Accent" value={t.accent} options={['Cobalt','Teal','Violet']}
                    onChange={(v)=>setTweak('accent', v)}/>
        <TweakSection label="Sketch & layout"/>
        <TweakRadio label="Line style" value={t.sketch} options={['Crisp','Sketchy','Wobbly']}
                    onChange={(v)=>setTweak('sketch', v)}/>
        <TweakSelect label="Map emphasis" value={t.mapEmph}
                     options={['Map-first','Balanced','List-first']}
                     onChange={(v)=>setTweak('mapEmph', v)}/>
        <div style={{ fontSize:11, opacity:.6, margin:'2px 2px 8px', lineHeight:1.4 }}>
          Map emphasis resizes the map on the compare screens (A2 / C2 / D2).
        </div>
        <TweakSection label="Notes"/>
        <TweakToggle label="Annotations" value={t.annotations}
                     onChange={(v)=>setTweak('annotations', v)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
