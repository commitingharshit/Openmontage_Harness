import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C, INOUT, Scene, k, useT} from './Film';

// V28 hook: the same story and VO timing as the V27 opening (o1–o7, ../../audio/vo/v22), restaged as a dark,
// cinematic night: a moving camera in depth, glowing "screens", rack focus, grain, a glitch when the file breaks,
// and a hard cut to black for the question. Everything here is still an illustration (generic chat, typeset documents).
const SERIF = 'Georgia, "Times New Roman", serif';
export const ICE = '#7FE3F2';
export const glow = '0 0 0 1px rgba(255,255,255,.06), 0 50px 120px rgba(0,0,0,.65), 0 0 140px rgba(90,200,225,.16)';
const sweep = (t: number, a: number, b: number) => k(t, [a, b], [-30, 130], INOUT);

// ---------- look: night stage, light leak, vignette, grain ----------
export const Night: React.FC<{warm?: number}> = ({warm = 0}) => {
  const t = useT();
  const x = 50 + 14 * Math.sin(t * 0.25), y = 38 + 10 * Math.cos(t * 0.19);
  return <AbsoluteFill style={{background: `radial-gradient(1100px 760px at ${x}% ${y}%, rgba(40,120,140,.28), transparent 70%),
    radial-gradient(900px 600px at 85% 90%, rgba(200,90,60,${0.10 + 0.25 * warm}), transparent 70%), linear-gradient(180deg, #0A1316, #04080A)`}} />;
};
export const Grade: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,.72) 100%)'}} />
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'screen'}}>
      <filter id={`g${f}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={f % 97} /></filter>
      <rect width="1920" height="1080" filter={`url(#g${f})`} />
    </svg>
  </AbsoluteFill>;
};
// 3D camera: everything inside drifts, dollies and (optionally) shakes
export const Cam3: React.FC<{z: number; ry: number; rx: number; x?: number; y?: number; shake?: number; children: React.ReactNode}> = ({z, ry, rx, x = 0, y = 0, shake = 0, children}) => {
  const t = useT(), sx = Math.sin(t * 71) * shake, sy = Math.cos(t * 53) * shake;
  return <AbsoluteFill style={{transformStyle: 'preserve-3d', transform: `translate3d(${x + sx}px, ${y + sy}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`}}>{children}</AbsoluteFill>;
};
export const Label: React.FC<{at: number; until: number}> = ({at, until}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 60, top: 1034, fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(220,235,238,.8)',
    opacity: k(t, [at, at + 0.5], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]))}}>Illustration</div>;
};
// big white title with a light sweep through it
export const Title: React.FC<{text: string; hi?: string[]; at: number; until: number; y?: number; size?: number}> = ({text, hi = [], at, until, y = 900, size = 74}) => {
  const t = useT(), o = k(t, [at, at + 0.4], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1])), s = sweep(t, at + 0.2, at + 1.2);
  return <div style={{position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontSize: size, fontWeight: 700, letterSpacing: -size * 0.03, whiteSpace: 'nowrap',
    opacity: o, transform: `translateY(${(1 - o) * 24}px)`, filter: `blur(${(1 - o) * 10}px)`}}>
    {text.split(' ').map((w, i) => { const p = k(t, [at + i * 0.07, at + i * 0.07 + 0.35], [0, 1]), h = hi.includes(w);
      return <span key={i} style={{display: 'inline-block', marginRight: size * 0.25, opacity: p, transform: `translateY(${(1 - p) * 18}px)`,
        backgroundImage: `linear-gradient(100deg, ${h ? ICE : '#F2F7F8'} ${s - 18}%, #FFFFFF ${s}%, ${h ? ICE : '#F2F7F8'} ${s + 18}%)`,
        WebkitBackgroundClip: 'text', color: 'transparent', textShadow: h ? `0 0 40px rgba(127,227,242,.35)` : 'none'}}>{w}</span>; })}
  </div>;
};
const Bar: React.FC<{title: string; c: string}> = ({title, c}) =>
  <div style={{height: 54, display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: '1px solid #E3EAEB', fontSize: 22, fontWeight: 700, color: C.ink, background: '#FBFCFC'}}>
    {['#FF5F57', '#FEBC2E', '#28C840'].map((d) => <div key={d} style={{width: 13, height: 13, borderRadius: '50%', background: d}} />)}
    <div style={{width: 22, height: 22, borderRadius: 5, background: c, marginLeft: 10}} />{title}</div>;
// red callout with a leader line drawn to the defect
export const Flag: React.FC<{text: string; x: number; y: number; tx: number; ty: number; at: number; until: number}> = ({text, x, y, tx, ty, at, until}) => {
  const t = useT(), d = k(t, [at, at + 0.3], [0, 1], INOUT), o = k(t, [at + 0.15, at + 0.4], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  const len = Math.hypot(tx - x, ty - y);
  return <>
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: 1 - k(t, [until, until + 0.3], [0, 1])}}>
      <line x1={x} y1={y + 24} x2={tx} y2={ty} stroke="#FF5A4E" strokeWidth={3} strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
      <circle cx={tx} cy={ty} r={9 * d} fill="#FF5A4E" />
    </svg>
    <div style={{position: 'absolute', left: x, top: y, padding: '10px 18px', borderRadius: 10, background: '#FF5A4E', color: '#fff', fontSize: 26, fontWeight: 700,
      opacity: o, transform: `scale(${0.85 + 0.15 * o})`, boxShadow: '0 0 40px rgba(255,90,78,.45)'}}>{text}</div>
  </>;
};

// ---------- 0–8.3 · The false promise ----------
const ASK = 'Update the supply agreement with the new payment terms.';
const REPLY = ['Here\'s your revised agreement ✓', '• Payment terms updated to 45 days', '• Clause 7 revised', '• Formatting preserved'];
const Promise1 = () => {
  const Chat = () => {
    const t = useT(), o = k(t, [0.1, 0.8], [0, 1]), back = k(t, [5.9, 6.5], [0, 1], INOUT);
    const n = Math.round(k(t, [0.5, 1.7], [0, ASK.length], (x) => x)), dots = t > 2.2 && t < 2.85;
    const words = REPLY.join(' \n ').split(' '), shown = Math.round(k(t, [2.85, 3.9], [0, words.length], (x) => x));
    const chip = k(t, [3.9, 4.2], [0, 1]), tick = k(t, [3.0, 3.4], [0, 1]);
    return <div style={{position: 'absolute', left: 410, top: 150, width: 1100, height: 680, borderRadius: 26, background: '#fff', boxShadow: glow, overflow: 'hidden',
      opacity: o * (1 - 0.75 * back), transform: `translateZ(${-900 * back}px) rotateX(${(1 - o) * 14}deg)`, filter: `blur(${back * 8}px)`}}>
      <div style={{height: 70, display: 'flex', alignItems: 'center', gap: 14, padding: '0 30px', borderBottom: '1px solid #E3EAEB', fontSize: 26, fontWeight: 700, color: C.ink}}>
        <div style={{width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#B9C7CA,#8FA6AB)'}} />AI chat</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, padding: 32}}>
        <div style={{alignSelf: 'flex-end', maxWidth: 660, padding: '18px 26px', borderRadius: 22, background: C.teal, color: '#fff', fontSize: 30, opacity: n ? 1 : 0}}>
          {ASK.slice(0, n)}{n < ASK.length && <span style={{opacity: Math.round(t * 4) % 2}}>|</span>}</div>
        {dots && <div style={{alignSelf: 'flex-start', padding: '16px 26px', borderRadius: 22, background: '#F0F4F4', fontSize: 30, letterSpacing: 4}}>
          {[0, 1, 2].map((i) => <span key={i} style={{opacity: 0.3 + 0.7 * Math.abs(Math.sin(t * 9 - i))}}>•</span>)}</div>}
        {t > 2.85 && <div style={{alignSelf: 'flex-start', maxWidth: 820, padding: '22px 28px', borderRadius: 22, background: '#F0F4F4', color: C.ink, fontSize: 29, lineHeight: 1.45, whiteSpace: 'pre-wrap'}}>
          {words.slice(0, shown).map((w, i) => w === '\n' ? <br key={i} /> : <span key={i} style={{fontWeight: i < 4 ? 700 : 400}}>{w} </span>)}
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 18, padding: '12px 18px', borderRadius: 14, background: '#fff', border: '1px solid #DCE6E8',
            fontSize: 26, fontWeight: 700, opacity: chip, transform: `translateY(${(1 - chip) * 10}px)`}}><div style={{width: 26, height: 26, borderRadius: 6, background: C.word}} />Supply_Agreement_v8.docx</div>
        </div>}
      </div>
      <div style={{position: 'absolute', right: 40, top: 14, width: 42, height: 42, borderRadius: '50%', background: '#28C840', color: '#fff', display: 'grid', placeItems: 'center',
        fontSize: 26, fontWeight: 700, opacity: tick * (1 - back), transform: `scale(${0.6 + 0.4 * tick})`, boxShadow: `0 0 ${30 * tick}px rgba(40,200,64,.7)`}}>✓</div>
    </div>;
  };
  // the file they open: it lands clean, then breaks (glitch on "wrecked"), then slides left to be fixed by hand
  const Doc = () => {
    const t = useT(), o = k(t, [6.0, 6.5], [0, 1]), brk = k(t, [6.95, 7.25], [0, 1]), fix = k(t, [8.2, 9.0], [0, 1], INOUT);
    const g = t > 6.95 && t < 7.35 ? 1 : 0, gx = g * (Math.round(t * 30) % 2 ? 9 : -7);
    return <div style={{position: 'absolute', left: 460 - 300 * fix, top: 90 + 40 * fix, width: 1000, height: 860, borderRadius: 22, background: '#fff', boxShadow: glow, overflow: 'hidden',
      opacity: o, transform: `translateZ(${(1 - o) * 700}px) translateX(${gx}px) scale(${1 - 0.18 * fix})`, transformOrigin: '50% 30%',
      filter: g ? 'drop-shadow(10px 0 rgba(255,40,80,.75)) drop-shadow(-10px 0 rgba(0,220,255,.75))' : 'none'}}>
      <Bar title="Supply_Agreement_v8.docx" c={C.word} />
      <div style={{padding: '30px 60px', fontFamily: SERIF, color: C.ink}}>
        <div style={{height: 70, border: `3px ${brk ? 'dashed' : 'solid'} ${brk ? '#E06A60' : '#2F6DB5'}`, borderRadius: 10, display: 'grid', placeItems: 'center',
          color: brk ? '#E06A60' : '#2F6DB5', fontSize: 22, fontFamily: 'Inter', fontWeight: 700, marginBottom: 26, background: brk ? '#FFF4F3' : '#EEF4FB'}}>
          {brk ? '[ company letterhead missing ]' : 'MERIDIAN LEGAL LLP'}</div>
        <div style={{fontSize: 38, fontWeight: 700, marginBottom: 18}}>SUPPLY AGREEMENT</div>
        {[['1.', '1.', 'Definitions'], ['2.', '2.', 'Term'], ['3.', '2.', 'Payment'], ['4.', '5.', 'Liability']].map(([a, b, h], i) => {
          const bad = brk > 0.5 && a !== b;
          return <div key={i} style={{fontSize: 28, marginBottom: 10, transform: `translateX(${brk * (i % 2 ? 22 : -6)}px)`}}>
            <span style={{color: bad ? '#FF5A4E' : C.ink, fontWeight: 700}}>{brk > 0.5 ? b : a}</span> {h}</div>; })}
        <div style={{marginTop: 20, fontSize: 22, fontFamily: 'Inter'}}>
          {[['Milestone', 'Amount', 'Due'], ['Delivery', '€240,000', '45 days'], ['Acceptance', '€160,000', '30 days']].map((r, i) =>
            <div key={i} style={{display: 'flex', borderBottom: '1px solid #DCE6E8', transform: `translateX(${brk * i * 46}px) rotate(${brk * (i ? 1.4 : 0)}deg)`}}>
              {r.map((v, j) => <div key={j} style={{width: 220, padding: '10px 12px', fontWeight: i ? 400 : 700, background: i ? 'transparent' : '#EEF3F3'}}>{v}</div>)}</div>)}
        </div>
      </div>
    </div>;
  };
  const Flash = () => { const t = useT(); return <AbsoluteFill style={{background: '#fff', opacity: k(t, [6.95, 7.0], [0, 0.35]) * (1 - k(t, [7.0, 7.25], [0, 1]))}} />; };
  const Cam = ({children}: {children: React.ReactNode}) => {
    const t = useT();
    const z = k(t, [0, 5.9], [-260, 60], INOUT) + k(t, [6.0, 8.2], [0, 90]), ry = k(t, [0, 5.9], [-7, 3], INOUT) + k(t, [6.0, 8.2], [4, -2]);
    return <Cam3 z={z} ry={ry} rx={k(t, [0, 5.9], [6, 1], INOUT)} shake={t > 6.95 && t < 7.5 ? 6 : 0}>{children}</Cam3>;
  };
  return (
    <Scene from={0} to={8.3}>
      <Night /><Cam><Chat /><Doc /></Cam><Flash />
      <Flag text="Template gone" x={1240} y={130} tx={1100} ty={205} at={7.25} until={8.2} />
      <Flag text="Numbering wrong" x={1300} y={360} tx={560} ty={395} at={7.45} until={8.2} />
      <Flag text="Table shifted" x={1300} y={640} tx={1150} ty={590} at={7.65} until={8.2} />
      <Title text="AI said it was done." hi={['done.']} at={4.9} until={5.95} />
      <Label at={0.3} until={8.0} /><Grade />
    </Scene>
  );
};

// ---------- 8–18.4 · The real work: fixing by hand, the email, five tabs in depth, copy-paste ----------
const TABS: [string, string][] = [['Supply_Agreement_v8.docx', C.word], ['Financial_Annexure.xlsx', C.excel], ['Board_Presentation.pptx', C.ppt], ['AI chat', '#9AAEB2'], ['Browser · sources', '#5B7279']];
const Win: React.FC<{i: number}> = ({i}) => <>
  <Bar title={TABS[i + 1][0]} c={TABS[i + 1][1]} />
  {i === 0 && <div style={{padding: 26, fontSize: 24, color: C.ink}}>{[['Item', 'FY26'], ['Revenue', '€74.6m'], ['Gross margin', '71%'], ['Cash', '€42.9m']].map((r, j) =>
    <div key={j} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 6px', borderBottom: '1px solid #E3EAEB', fontWeight: j ? 400 : 700}}>{r.map((v) => <span key={v}>{v}</span>)}</div>)}</div>}
  {i === 1 && <div style={{margin: 26, height: 380, borderRadius: 12, background: '#123B44', color: '#fff', padding: 34, fontSize: 34, fontWeight: 700}}>Financial update<div style={{fontSize: 24, fontWeight: 400, opacity: 0.7, marginTop: 14}}>[ figures to paste ]</div></div>}
  {i === 2 && <div style={{padding: 26, fontSize: 24, color: C.ink, lineHeight: 1.5}}>Here's a draft annexure paragraph you can paste into your agreement…</div>}
  {i === 3 && <div style={{padding: 26, fontSize: 24, color: '#2F6DB5', lineHeight: 1.7}}>Q3 Actuals — source table<br />Lender covenant pack, p.3<br />Board minutes, 6 Oct</div>}
</>;
const Work = () => {
  const Doc = () => {
    const t = useT(), o = 1 - k(t, [18.0, 18.3], [0, 1]), dim = k(t, [11.9, 12.6], [0, 1]);
    return <div style={{position: 'absolute', left: 120, top: 230, width: 680, height: 600, borderRadius: 20, background: '#fff', boxShadow: glow, overflow: 'hidden', opacity: o,
      filter: `brightness(${1 - 0.35 * dim}) blur(${dim * 2}px)`}}>
      <Bar title="Supply_Agreement_v8.docx" c={C.word} />
      <div style={{padding: '24px 40px', fontFamily: SERIF, color: C.ink}}>
        <div style={{fontSize: 30, fontWeight: 700, marginBottom: 14}}>SUPPLY AGREEMENT</div>
        {['1. Definitions', '2. Term', '3. Payment', `${t > 10.6 ? '4.' : '5.'} Liability`].map((l, i) => <div key={i} style={{fontSize: 24, marginBottom: 8}}>{l}</div>)}
        {[96, 88, 92, 70, 84].map((w, i) => <div key={i} style={{height: 10, width: `${w * k(t, [8.4 + i * 0.35, 8.9 + i * 0.35], [0.2, 1])}%`, background: '#E3EAEB', borderRadius: 5, margin: '14px 0'}} />)}
        {t > 9.2 && t < 11.2 && <div style={{position: 'absolute', left: 64, top: 268, width: 3, height: 28, background: C.ink, opacity: Math.round(t * 3) % 2}} />}
      </div>
    </div>;
  };
  // the email lands like a phone notification: drop, buzz, settle
  const Email = () => {
    const t = useT(), o = k(t, [9.8, 10.15], [0, 1]) * (1 - k(t, [12.0, 12.4], [0, 1])), buzz = t > 9.95 && t < 10.4 ? Math.sin(t * 120) * 6 : 0;
    return <div style={{position: 'absolute', left: 880, top: 110 + (1 - o) * -140, width: 920, padding: '28px 34px', borderRadius: 30, background: 'rgba(28,40,44,.88)',
      border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(18px)', boxShadow: '0 40px 100px rgba(0,0,0,.6)', opacity: o, transform: `translateX(${buzz}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: '#2F6DB5', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 26, fontWeight: 700}}>✉</div>
        <div style={{fontSize: 30, fontWeight: 700, color: '#fff', flex: 1}}>Partner · Before the meeting</div><div style={{fontSize: 24, color: '#9AB3B9'}}>now</div></div>
      <div style={{fontSize: 34, lineHeight: 1.35, color: '#E8F0F2'}}>Please include the updated <b style={{color: '#fff'}}>financial annexure</b> and <b style={{color: '#fff'}}>presentation</b> before the meeting.</div>
    </div>;
  };
  // five tabs; the four other windows fan out in depth and the camera tracks across them
  const Tabs = () => {
    const t = useT(), out = 1 - k(t, [18.0, 18.3], [0, 1]);
    return <>
      <div style={{position: 'absolute', left: 120, right: 120, top: 110, display: 'flex', gap: 10, opacity: out}}>
        {TABS.map(([n, c], i) => { const p = k(t, [11.9 + i * 0.25, 12.2 + i * 0.25], [0, 1]);
          return <div key={i} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: '14px 14px 0 0', background: i ? '#E9EFF0' : '#fff',
            fontSize: 21, fontWeight: 700, color: C.ink, opacity: p, transform: `translateY(${(1 - p) * 20}px)`, whiteSpace: 'nowrap', overflow: 'hidden', boxShadow: '0 0 30px rgba(90,200,225,.12)'}}>
            <div style={{width: 18, height: 18, borderRadius: 5, background: c, flex: 'none'}} />{n}</div>; })}
      </div>
      {TABS.slice(1).map((_, i) => { const p = k(t, [12.2 + i * 0.3, 12.7 + i * 0.3], [0, 1]);
        return <div key={i} style={{position: 'absolute', left: 900 + i * 70, top: 240 + i * 60, width: 820, height: 500, borderRadius: 20, background: '#fff', boxShadow: glow, overflow: 'hidden',
          opacity: p * out, transform: `translateZ(${-i * 140 + (1 - p) * 500}px) rotateY(${-10 + i * 2}deg)`}}><Win i={i} /></div>; })}
    </>;
  };
  // copy-paste: chips arc between windows with a light trail
  const Fly = () => {
    const t = useT();
    const runs: [string, number, number, number, number, number][] = [
      ['€74.6m', 16.4, 1000, 420, 1320, 560], ['Annexure paragraph', 16.85, 1200, 600, 300, 520], ['Source: Q3 Actuals', 17.3, 1300, 700, 320, 640], ['€42.9m', 17.7, 1000, 520, 1360, 600]];
    return <>{runs.map(([s, at, x0, y0, x1, y1], i) => { const p = k(t, [at, at + 0.5], [0, 1], INOUT), o = k(t, [at, at + 0.08], [0, 1]) * (1 - k(t, [at + 0.45, at + 0.6], [0, 1]));
      const pos = (q: number) => [x0 + (x1 - x0) * q, y0 + (y1 - y0) * q - Math.sin(q * Math.PI) * 140];
      return <React.Fragment key={i}>{[0.16, 0.1, 0.05].map((d, j) => { const [x, y] = pos(Math.max(0, p - d));
        return <div key={j} style={{position: 'absolute', left: x, top: y, padding: '10px 18px', borderRadius: 12, background: ICE, color: C.ink, fontSize: 24, fontWeight: 700, opacity: o * 0.15 * (j + 1), filter: 'blur(3px)'}}>{s}</div>; })}
        <div style={{position: 'absolute', left: pos(p)[0], top: pos(p)[1], padding: '10px 18px', borderRadius: 12, background: '#fff', color: C.ink, fontSize: 24, fontWeight: 700, opacity: o,
          boxShadow: '0 0 40px rgba(127,227,242,.6)'}}>{s}</div></React.Fragment>; })}</>;
  };
  // Copy. Paste. Check. Repeat. — one hard beat each
  const Beats = () => {
    const t = useT(), W = [['Copy.', 16.45], ['Paste.', 16.9], ['Check.', 17.35], ['Repeat.', 17.75]] as const;
    const cur = W.reduce((a, [, at], i) => (t >= at ? i : a), -1);
    if (cur < 0 || t > 18.2) return null;
    const [w, at] = W[cur], p = k(t, [at, at + 0.12], [1.25, 1]);
    return <div style={{position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', fontSize: 120, fontWeight: 700, letterSpacing: -4,
      color: cur === 3 ? '#FF5A4E' : '#fff', transform: `scale(${p})`, textShadow: cur === 3 ? '0 0 60px rgba(255,90,78,.5)' : '0 0 50px rgba(127,227,242,.35)'}}>{w}</div>;
  };
  const Cam = ({children}: {children: React.ReactNode}) => {
    const t = useT(), whip = [16.45, 16.9, 17.35, 17.75].reduce((a, b) => a + (t >= b ? 1 : 0), 0);
    const x = k(t, [11.9, 15.5], [0, -180], INOUT) + whip * (whip % 2 ? 26 : -26), z = k(t, [8.0, 11.9], [40, 0]) + k(t, [11.9, 15.5], [0, -140], INOUT);
    return <Cam3 z={z} x={x} ry={k(t, [8, 18.4], [-3, 5])} rx={2} shake={t > 16.4 && t < 18.1 ? 2.5 : 0}>{children}</Cam3>;
  };
  return (
    <Scene from={8.0} to={18.4}>
      <Night warm={k(useT(), [12, 18], [0, 1])} /><Cam><Doc /><Tabs /><Fly /></Cam><Email />
      <Title text="The work had just begun." hi={['begun.']} at={13.6} until={15.4} />
      <Beats />
      <Label at={8.1} until={18.0} /><Grade />
    </Scene>
  );
};

// ---------- (internal 19.4–23.2 = absolute 18.2–22.0) · overload, hard cut to black, the question ----------
const Turn = () => {
  const Chaos = () => {
    const t = useT(), on = t < 20.6 ? 1 : 0, build = k(t, [19.4, 20.5], [0, 1]), sh = Math.sin(t * 60) * 8 * build;
    const notes = ['Meeting in 15 min', 'Client: any update?', 'Partner: ETA?', '3 new comments', 'Calendar: Board review'];
    return <AbsoluteFill style={{opacity: on}}>
      <Night warm={1} />
      <Cam3 z={k(t, [19.4, 20.6], [0, 260])} ry={k(t, [19.4, 20.6], [-6, 6])} rx={3} shake={8 * build}>
        {Array.from({length: 12}, (_, i) => { const p = k(t, [19.4 + i * 0.08, 19.6 + i * 0.08], [0, 1]);
          return <div key={i} style={{position: 'absolute', left: 60 + (i * 173) % 1180, top: 90 + (i * 97) % 560, width: 640, height: 420, borderRadius: 18, background: '#fff', boxShadow: glow, overflow: 'hidden',
            opacity: p, transform: `translateZ(${-((i * 131) % 600)}px) rotate(${((i * 37) % 9) - 4}deg)`}}><Bar title={TABS[i % 5][0]} c={TABS[i % 5][1]} /></div>; })}
      </Cam3>
      {notes.map((n, i) => { const p = k(t, [19.5 + i * 0.16, 19.7 + i * 0.16], [0, 1]);
        return <div key={i} style={{position: 'absolute', right: 60, top: 60 + i * 96, width: 560, padding: '18px 24px', borderRadius: 20, background: 'rgba(28,40,44,.9)', border: '1px solid rgba(255,255,255,.12)',
          fontSize: 26, fontWeight: 700, color: '#fff', opacity: p, transform: `translateX(${(1 - p) * 80 + sh}px)`, boxShadow: '0 30px 60px rgba(0,0,0,.5)'}}>{n}</div>; })}
      <div style={{position: 'absolute', left: 80, bottom: 60, fontSize: 150, fontWeight: 700, color: '#FF5A4E', letterSpacing: -5, fontVariantNumeric: 'tabular-nums',
        textShadow: '0 0 60px rgba(255,90,78,.55)', transform: `translate(${sh}px, ${-sh / 2}px)`}}>{t < 19.9 ? '8:52' : t < 20.3 ? '8:56' : '8:59'}</div>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(120,0,0,.35) 100%)', opacity: build}} />
    </AbsoluteFill>;
  };
  // after the cut: black, then the question with a slow push and a light sweep
  const Question = () => {
    const t = useT(); if (t < 20.6) return null;
    return <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{background: 'radial-gradient(900px 500px at 50% 48%, rgba(60,170,195,.18), transparent 70%)', opacity: k(t, [21.6, 22.6], [0, 1])}} />
      <AbsoluteFill style={{transform: `scale(${k(t, [21.0, 23.2], [0.97, 1.03])})`}}>
        <Title text="What if AI could finish the work?" hi={['finish', 'the', 'work?']} at={21.1} until={22.85} y={470} size={104} />
      </AbsoluteFill>
    </AbsoluteFill>;
  };
  return (
    <Scene from={19.4} to={23.2}>
      <Chaos /><Question /><Grade />
    </Scene>
  );
};

export const Hook: React.FC = () => <>
  <Promise1 /><Work />
  <Sequence from={-36} layout="none"><Turn /></Sequence>
</>;
