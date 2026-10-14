import React, {useState} from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {INOUT, Scene, k, useT} from './Film';
import {Grade, ICE, Night, Title, glow} from './Hook23';
import {Lens, Notif, S1, S2, S3, S4, S5, Slide, UI, WIN} from './Hook31a';

// V29 hook "Done." (49.6 s; spliced in front of V27 from 21.8 s). Times are absolute seconds.
// Cold open on the consequence (8:59, cursor over Send, the numbers don't match) → 45 minutes earlier →
// three "Done." beats, each exposing a new failure → overload → back to Send: she stops → silence → the promise.
// Real footage: Mixkit (free licence), one protagonist (clips 24054 + 23717, same shoot). App windows are illustrations.
// VO: k1@0.4 o1@6.0 k3@11.0 o3b@12.5 o4@15.55 o5f@18.15 n1@24.0 n2@28.35 n3@30.2 k4@34.6 o6@37.6 k5@42.3 k6@46.3
const FPS = 30;
const Shift: React.FC<{by: number; children: React.ReactNode}> = ({by, children}) => <Sequence from={Math.round(by * FPS)} layout="none">{children}</Sequence>;

// ---------- real footage, graded to the night look ----------
export const Foot: React.FC<{src: string; from: number; to: number; ss: number; z?: [number, number]; fx?: number; fy?: number; dim?: number}> = ({src, from, to, ss, z = [1.02, 1.1], fx = 960, fy = 540, dim = 0}) => {
  const Inner = () => { const t = useT(), s = k(t, [from, to], z, (x) => x);
    return <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `translate(${960 - fx * s}px, ${540 - fy * s}px) scale(${s})`, transformOrigin: '0 0'}}>
        <OffthreadVideo src={staticFile(`aofoot/${src}.mp4`)} startFrom={Math.round(ss * FPS)} muted style={{width: 1920, height: 1080, objectFit: 'cover',
          filter: `contrast(1.08) saturate(.92) brightness(${0.95 - dim}) sepia(.08)`}} /></AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10,40,55,.18), rgba(0,10,20,.12))', mixBlendMode: 'multiply'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0,0,0,.6) 100%)'}} />
    </AbsoluteFill>; };
  return <Scene from={from} to={to}><Inner /><Grade /></Scene>;
};
export const Super: React.FC<{text: string; at: number; until: number; y?: number}> = ({text, at, until, y = 900}) => {
  const t = useT(), o = k(t, [at, at + 0.3], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: UI, fontSize: 30, fontWeight: 700, letterSpacing: 10, color: '#fff', opacity: o,
    textShadow: '0 2px 20px rgba(0,0,0,.8)'}}>{text}</div>;
};

// ---------- the email she is about to send (cold open + breaking point) ----------
const Cursor: React.FC<{x: number; y: number}> = ({x, y}) =>
  <svg width={44} height={56} viewBox="0 0 22 28" style={{position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.4))'}}>
    <path d="M1 1 L1 22 L6.5 17 L10 26 L13.5 24.5 L10 16 L17.5 16 Z" fill="#111" stroke="#fff" strokeWidth={1.6} /></svg>;
const Attach: React.FC<{name: string; c: string; ext: string}> = ({name, c, ext}) =>
  <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px 10px 10px', border: '1px solid #DADCE0', borderRadius: 10, fontSize: 20, color: '#222', background: '#F8F9FA'}}>
    <div style={{width: 36, height: 42, borderRadius: 5, background: c, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700}}>{ext}</div>{name}</div>;
export const Mail: React.FC<{cx: number; cy: number; pressGlow?: number}> = ({cx, cy, pressGlow = 0}) =>
  <div style={{position: 'absolute', ...WIN, borderRadius: 18, background: '#fff', boxShadow: glow, overflow: 'hidden', fontFamily: UI}}>
    <div style={{height: 60, background: '#404040', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 26px', fontSize: 22, fontWeight: 600}}>
      <span style={{flex: 1}}>New Message</span><span style={{letterSpacing: 16}}>— ⤢ ✕</span></div>
    {[['To', 'Elena Ruiz (Partner)'], ['Subject', 'Board pack: final files for 9:00']].map(([a, b]) =>
      <div key={a} style={{display: 'flex', gap: 18, padding: '18px 30px', borderBottom: '1px solid #EEE', fontSize: 24, color: '#222'}}><span style={{color: '#888', width: 90}}>{a}</span>{b}</div>)}
    <div style={{padding: '30px 30px', fontSize: 25, color: '#222', lineHeight: 1.6}}>Hi Elena,<br />Attached are the final memo, model and board deck for this morning.<br />Best,<br />Maya</div>
    <div style={{display: 'flex', gap: 14, padding: '0 30px'}}>
      <Attach name="Board_Memo_Q3.docx" c="#185ABD" ext="DOCX" /><Attach name="FY26_Model.xlsx" c="#107C41" ext="XLSX" /><Attach name="Board_Presentation.pptx" c="#C43E1C" ext="PPTX" /></div>
    <div style={{position: 'absolute', left: 30, bottom: 30, display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{padding: '16px 44px', borderRadius: 30, background: '#0B57D0', color: '#fff', fontSize: 26, fontWeight: 700, boxShadow: `0 0 ${50 * pressGlow}px rgba(11,87,208,.8)`}}>Send</div>
      <span style={{fontSize: 26, color: '#666', letterSpacing: 14}}>A 📎 ☺ ▭</span></div>
    <Cursor x={cx} y={cy} />
  </div>;
export const SEND = [140, 890];   // tip of the cursor on Send, in window coords
const ColdOpen = () => {   // 0–4.5
  const t = useT(), mm = k(t, [0, 0.15], [0.6, 1]), dd = k(t, [0, 0.15], [0.6, 1]), neq = k(t, [0.1, 0.4], [0, 1]);
  const cx = k(t, [0.5, 2.0], [700, SEND[0] + 30], INOUT), cy = k(t, [0.5, 2.0], [600, SEND[1] - 10], INOUT);
  return <Scene from={0} to={4.5}>
    <Night warm={0.6} />
    <Lens z={k(t, [0, 4.5], [1.0, 1.12])} fx={760} fy={700}><div style={{filter: `brightness(${1 - 0.35 * mm})`}}><Mail cx={cx} cy={cy} /></div></Lens>
    {[['FY26_Model.xlsx', 'FY26 revenue', '€74.6m', '#107C41', mm, 300], ['Board_Presentation.pptx', 'Slide 4', '€71–73m', '#C43E1C', dd, 640]].map(([f, l, v, c, o, y]) =>
      <div key={f as string} style={{position: 'absolute', right: 120, top: y as number, width: 620, padding: '24px 30px', borderRadius: 20, background: 'rgba(20,24,28,.92)', border: `2px solid ${c}`,
        fontFamily: UI, color: '#fff', opacity: o as number, transform: `translateX(${(1 - (o as number)) * 80}px)`, boxShadow: '0 30px 80px rgba(0,0,0,.6)'}}>
        <div style={{fontSize: 20, color: '#AAB'}}>{f} · {l}</div><div style={{fontSize: 72, fontWeight: 800, letterSpacing: -2}}>{v}</div></div>)}
    <div style={{position: 'absolute', right: 380, top: 500, fontSize: 110, fontWeight: 800, color: '#FF5A4E', fontFamily: UI, opacity: neq, transform: `scale(${1.4 - 0.4 * neq})`, textShadow: '0 0 40px rgba(255,90,78,.6)'}}>≠</div>
    <div style={{position: 'absolute', right: 120, top: 150, textAlign: 'right', fontFamily: UI, color: '#FF5A4E', fontSize: 64, fontWeight: 800, letterSpacing: -2, textShadow: '0 0 40px rgba(255,90,78,.5)'}}>8:57<span style={{fontSize: 26, marginLeft: 12, color: '#FFC9C4', letterSpacing: 4}}>AM · BOARD AT 9:00</span></div>
    <Grade />
  </Scene>;
};
const Rewind = () => {   // 4.5–5.05
  const t = useT(), lines = Array.from({length: 18}, (_, i) => i);
  return <Scene from={4.5} to={5.05}>
    <AbsoluteFill style={{background: '#06090B'}} />
    {lines.map((i) => <div key={i} style={{position: 'absolute', left: ((i * 397 + t * 9000) % 2400) - 300, top: i * 60, width: 500 + (i * 113) % 700, height: 4 + (i % 3) * 3, background: i % 4 ? 'rgba(127,227,242,.5)' : 'rgba(255,90,78,.6)'}} />)}
    <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: UI, fontSize: 140, fontWeight: 800, color: '#fff', letterSpacing: -10, opacity: 0.9}}>◀◀</div>
    <AbsoluteFill style={{background: '#fff', opacity: k(t, [4.5, 4.58], [0.5, 0])}} /><Grade />
  </Scene>;
};

// ---------- "Done." — the motif. Same words, same chime, a little worse every time ----------
const Done: React.FC<{at: number; until: number; n: 1 | 2 | 3}> = ({at, until, n}) => {
  const Inner = () => {
    const t = useT(), o = k(t, [at, at + 0.12], [0, 1]) * (1 - k(t, [until - 0.2, until], [0, 1])), pop = k(t, [at, at + 0.18], [1.25, 1]);
    const sh = n === 3 && t < at + 0.5 ? Math.sin(t * 90) * 8 : 0;
    return <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: `rgba(0,0,0,${0.45 + 0.12 * n})`}} />
      {(n === 3 ? [3, 2, 1, 0] : [0]).map((g) => <div key={g} style={{position: 'absolute', left: 0, right: 0, top: 360 - g * 26, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40,
        transform: `translateX(${sh + g * 14}px) scale(${pop * (1 + 0.06 * (n - 1))})`, opacity: g ? 0.18 : 1, fontFamily: UI}}>
        <div style={{width: 150, height: 150, borderRadius: '50%', background: '#28C840', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 96, fontWeight: 800, boxShadow: '0 0 80px rgba(40,200,64,.6)'}}>✓</div>
        <div style={{fontSize: 230, fontWeight: 800, color: '#fff', letterSpacing: -10}}>Done.</div></div>)}
      {n > 1 && <div style={{position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', fontFamily: UI, fontSize: 30, letterSpacing: 8, color: n === 3 ? '#FF9A90' : '#BFD5DA', fontWeight: 700}}>{n === 2 ? 'AGAIN.' : 'AND AGAIN.'}</div>}
    </AbsoluteFill>;
  };
  return <Scene from={at} to={until}><Inner /></Scene>;
};
// Done #3 result: slide 2 is fixed… and slide 4 has reverted to the old number
const DeckResult = () => {   // 35.0–37.45
  const t = useT(), ring = k(t, [36.2, 36.6], [0, 1], INOUT);
  const thumb = (i: number) => i === 3
    ? <div style={{width: 250, height: 141, borderRadius: 8, background: '#13294B', color: '#fff', padding: 16, boxSizing: 'border-box', fontFamily: UI, boxShadow: '0 4px 14px rgba(0,0,0,.2)'}}>
        <div style={{fontSize: 17, fontWeight: 700}}>Cash & covenants</div><div style={{fontSize: 13, opacity: 0.6, marginTop: 8}}>FY26 revenue basis</div>
        <div style={{fontSize: 30, fontWeight: 800, marginTop: 4, color: t > 36.2 ? '#FF8A80' : '#fff'}}>€71–73m</div></div>
    : <Slide w={250} n={i} rev="€74.6m" />;
  return <Scene from={35.0} to={37.45}>
    <Night warm={0.8} />
    <Lens z={k(t, [35.0, 36.1], [1.0, 1.0]) + k(t, [36.1, 37.2], [0, 0.6], INOUT)} fx={k(t, [36.1, 37.2], [960, 1150], INOUT)} fy={k(t, [36.1, 37.2], [540, 560], INOUT)}>
      <div style={{position: 'absolute', left: 160, top: 300, width: 1600, padding: 34, borderRadius: 24, background: '#fff', boxShadow: glow, fontFamily: UI}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30, fontWeight: 700, color: '#111', marginBottom: 24}}><span>Board_Presentation.pptx · regenerated ✓</span><span style={{color: '#888', fontWeight: 400}}>12 slides</span></div>
        <div style={{display: 'flex', gap: 14}}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{position: 'relative'}}>{thumb(i)}
          {i === 1 && <div style={{position: 'absolute', right: -10, top: -12, width: 40, height: 40, borderRadius: '50%', background: '#28C840', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 800}}>✓</div>}</div>)}</div>
      </div>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}><ellipse cx={194 + 3 * 264 + 125} cy={300 + 34 + 54 + 70} rx={160} ry={110} fill="none" stroke="#FF5A4E" strokeWidth={7}
        strokeDasharray={900} strokeDashoffset={900 * (1 - ring)} style={{filter: 'drop-shadow(0 0 14px rgba(255,90,78,.8))'}} /></svg>
    </Lens>
    <Grade />
  </Scene>;
};

// ---------- breaking point: back at Send. She stops. Silence. ----------
const Break = () => {   // 41.6–46.0 (footage insert 44.0–45.4 is laid on top)
  const t = useT(), cx = k(t, [42.0, 43.6], [900, SEND[0] + 34], (x) => 1 - Math.pow(1 - x, 3)), cy = k(t, [42.0, 43.6], [560, SEND[1] - 6], (x) => 1 - Math.pow(1 - x, 3));
  const dim = k(t, [45.4, 46.0], [0, 1]);
  return <Scene from={41.6} to={46.0}>
    <Night warm={0.7} />
    <Lens z={k(t, [41.6, 43.6], [1.0, 1.55], INOUT) + k(t, [45.4, 46.0], [0, 0.15])} fx={k(t, [41.6, 43.6], [960, 420], INOUT)} fy={k(t, [41.6, 43.6], [540, 900], INOUT)}>
      <div style={{filter: `brightness(${1 - 0.8 * dim})`}}><Mail cx={cx} cy={cy} pressGlow={k(t, [43.3, 43.6], [0, 0.6])} /></div></Lens>
    <Notif title="Elena Ruiz" at={41.7} until={44.4} body={<>Are these the final files? The client is waiting.</>} />
    <Grade />
  </Scene>;
};
const Promise2 = () => {   // 46.0–49.6
  const t = useT();
  return <Scene from={46.0} to={49.6}>
    <AbsoluteFill style={{background: '#000'}} />
    <AbsoluteFill style={{background: 'radial-gradient(900px 500px at 50% 50%, rgba(60,170,195,.16), transparent 70%)', opacity: k(t, [47.5, 49.0], [0, 1])}} />
    <AbsoluteFill style={{transform: `scale(${k(t, [46.0, 49.6], [0.98, 1.03])})`, fontFamily: UI}}>
      <Title text="See exactly what changed." hi={['changed.']} at={46.35} until={49.3} y={400} size={96} />
      <Title text="Decide what stays." hi={['stays.']} at={47.75} until={49.3} y={530} size={96} />
    </AbsoluteFill><Grade />
  </Scene>;
};

export const Hook31h: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useState(() => {
    Promise.all([
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Regular.ttf')})`, {weight: '400'}).load(),
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Bold.ttf')})`, {weight: '700'}).load(),
    ]).then((faces) => { faces.forEach((f) => (document.fonts as any).add(f)); continueRender(handle); });
    return null;
  });
  return <AbsoluteFill style={{fontFamily: UI, background: '#000'}}>
    <ColdOpen /><Rewind />
    <Foot src="mixkit_24054" from={5.05} to={8.0} ss={0.6} z={[1.05, 1.15]} fx={900} fy={500} />
    <Scene from={5.05} to={8.0}><Super text="45 MINUTES EARLIER" at={5.2} until={7.4} y={920} /></Scene>
    <Shift by={8.0}><S1 /></Shift>
    <Done at={11.05} until={12.45} n={1} />
    <Shift by={5.75}><S2 /></Shift>
    <Foot src="mixkit_1808" from={15.6} to={16.5} ss={2} z={[1.1, 1.18]} />
    <Shift by={6.6}><S3 /></Shift>
    <Foot src="mixkit_23717" from={22.95} to={24.05} ss={10.6} z={[1.12, 1.2]} fx={1250} fy={420} />
    <Done at={27.5} until={28.35} n={2} />
    <Shift by={6.6}><S4 /></Shift>
    <Done at={34.45} until={35.2} n={3} />
    <DeckResult />
    <Shift by={9.0}><S5 /></Shift>
    <Break />
    <Foot src="mixkit_24054" from={44.55} to={45.6} ss={10.4} z={[1.12, 1.2]} fx={1000} fy={560} dim={0.05} />
    <Promise2 />
  </AbsoluteFill>;
};
