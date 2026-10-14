import React, {useState} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, continueRender, delayRender, staticFile} from 'remotion';
import {APP, At, C, Cam, Chip, EX_ZOOM, FullImg, FullVid, INOUT, LIGHT, Layers, Line, ROOM_VIEW, Scene, Spark, Stage, Tag, k, useT} from './Film';

// V21: open loop + Before-After-Bridge (SCRIPT-v21-draft.md, Hook A, slogan 1). Times are absolute film seconds, set from ../../../v21/vo.
// Reuses the V20 light look and real-UI views; the hook, "after" and slogan scenes are new.
type Wd = {w: string; at: number; c?: string};
export const ws = (text: string, at: number, step = 0.12): Wd[] =>
  text.split(' ').map((w, i) => (w.includes('*') ? {w: w.replace(/\*/g, ''), at: at + i * step, c: C.ice} : {w, at: at + i * step}));
export const Cap: React.FC<{text: string; at: number; out: number; y?: number; size?: number}> = ({text, at, out, y = 40, size = 56}) =>
  <Line center y={y} size={size} words={ws(text, at)} out={out} />;
// Frosted caption card for the dark team footage.
export const Card: React.FC<{text: string; at: number; until: number}> = ({text, at, until}) => {
  const t = useT(), o = k(t, [at, at + 0.35], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: 0, right: 0, top: 930, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${(1 - o) * 20}px)`}}>
    <div style={{padding: '18px 36px', borderRadius: 26, background: 'rgba(255,255,255,.92)', fontSize: 46, fontWeight: 700, letterSpacing: -1.4, color: C.ink,
      boxShadow: '0 30px 60px rgba(0,0,0,.25)'}}>{ws(text, at, 0.08).map(({w, c}, i) => <span key={i} style={{color: c, marginRight: 12}}>{w}</span>)}</div>
  </div>;
};
export const Pill: React.FC<{text: string; color: string; at: number; until?: number; y: number; solid?: boolean}> = ({text, color, at, until = 999, y, solid}) => {
  const t = useT(), o = k(t, [at, at + 0.3], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center', opacity: o, transform: `scale(${0.85 + 0.15 * o})`}}>
    <div style={{padding: solid ? '20px 44px' : '12px 26px', borderRadius: 40, background: solid ? color : '#fff', border: `2px solid ${color}`, color: solid ? '#fff' : color,
      fontSize: solid ? 36 : 28, fontWeight: 700, boxShadow: '0 14px 34px rgba(16,38,45,.14)'}}>{text}</div>
  </div>;
};

// ---------- 0–6.6 · Hook (lifestyle): "It's 11:47 at night. Your client wants one small change… to a number that's in every file you own." ----------
// Lock-screen clock + client message (illustration), then the three files that all quote the old number.
const SERIF = 'Georgia, "Times New Roman", serif';
const PANELS: {app: string; file: string; c: string; x: number; ry: number; at: number}[] = [
  {app: 'Word', file: 'Board Memo Q3.docx', c: C.word, x: 70, ry: 10, at: 4.15},
  {app: 'Excel', file: 'FY26 Model.xlsx', c: C.excel, x: 680, ry: 0, at: 4.4},
  {app: 'PowerPoint', file: 'Board Deck Q3.pptx', c: C.ppt, x: 1290, ry: -10, at: 4.65},
];
const Hook = () => {
  const Phone = () => {
    const t = useT(), lift = k(t, [3.95, 4.5], [0, 1], INOUT), out = k(t, [6.1, 6.5], [0, 1]);
    const clock = k(t, [0.1, 0.6], [0, 1]) * (1 - lift), note = k(t, [1.95, 2.4], [0, 1]);
    return <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 130, textAlign: 'center', color: C.ink, opacity: clock, transform: `translateY(${-lift * 80}px)`}}>
        <div style={{fontSize: 40, fontWeight: 700, color: LIGHT}}>Thursday, 14 October</div>
        <div style={{fontSize: 230, fontWeight: 400, letterSpacing: -10, lineHeight: 1.05}}>11:47</div>
      </div>
      <div style={{position: 'absolute', left: 960 - 520 * (1 - 0.3 * lift), top: 560 - 500 * lift + (1 - note) * -60, width: 1040 * (1 - 0.3 * lift), opacity: note * (1 - out),
        transform: `scale(${1 - 0.3 * lift})`, transformOrigin: '50% 0'}}>
        <div style={{width: 1040, padding: '30px 36px', borderRadius: 36, background: 'rgba(255,255,255,.92)', boxShadow: '0 40px 90px rgba(16,38,45,.2), 0 0 0 1px rgba(16,38,45,.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14}}>
            <div style={{width: 54, height: 54, borderRadius: 14, background: '#34C759', display: 'grid', placeItems: 'center'}}>
              <div style={{width: 28, height: 22, borderRadius: 11, background: '#fff'}} /></div>
            <div style={{fontSize: 34, fontWeight: 700, color: C.ink, flex: 1}}>Client</div>
            <div style={{fontSize: 28, color: LIGHT}}>now</div>
          </div>
          <div style={{fontSize: 40, lineHeight: 1.35, color: C.ink}}>Quick one: DACH Q4 is now <b style={{color: C.teal}}>8.5</b>, not 8.9. Can the memo and deck match by <b>9 a.m.</b>? 🙏</div>
        </div>
      </div>
    </>;
  };
  const Panels = () => {
    const t = useT(), out = k(t, [6.1, 6.5], [0, 1]), red = k(t, [5.2, 5.5], [0, 1]);
    const Num: React.FC<{dark?: boolean}> = ({dark}) =>
      <span style={{display: 'inline-block', padding: '2px 14px', borderRadius: 12, background: `rgba(200,70,61,${0.14 * red})`,
        boxShadow: `0 0 0 ${4 * red}px rgba(200,70,61,${0.9 * red})`, color: red > 0.5 ? C.red : dark ? '#fff' : C.ink, textDecoration: red > 0.5 ? 'line-through' : 'none'}}>€71–73m</span>;
    return <AbsoluteFill style={{perspective: 2000, opacity: 1 - out}}>
      {PANELS.map(({app, file, c, x, ry, at}, i) => {
        const p = k(t, [at, at + 0.45], [0, 1]);
        return <div key={i} style={{position: 'absolute', left: x, top: 360 + (1 - p) * 70, width: 560, height: 500, borderRadius: 22, overflow: 'hidden', opacity: p,
          transform: `rotateY(${ry}deg)`, background: '#fff', boxShadow: '0 50px 100px rgba(16,38,45,.18), 0 0 0 1px rgba(16,38,45,.08)'}}>
          <div style={{height: 64, display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px', background: c, color: '#fff', fontSize: 26, fontWeight: 700}}>
            <div style={{width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,.9)'}} />{app}<span style={{fontWeight: 400, opacity: 0.85, marginLeft: 6}}>{file}</span></div>
          {i === 0 && <div style={{padding: '34px 40px', fontFamily: SERIF, color: C.ink}}>
            <div style={{fontSize: 30, fontWeight: 700, marginBottom: 22}}>Q3 performance and revised FY26 outlook</div>
            <div style={{fontSize: 25, lineHeight: 1.5, color: '#3A4E54'}}>Revised FY26 revenue outlook:</div>
            <div style={{fontSize: 72, fontWeight: 700, margin: '22px 0 20px'}}><Num /></div>
            {[96, 88, 72].map((w, j) => <div key={j} style={{height: 12, width: `${w}%`, background: '#E3EAEB', borderRadius: 6, marginBottom: 14}} />)}
          </div>}
          {i === 1 && <div style={{padding: '30px 34px', color: C.ink}}>
            {[['Segment', 'Q4', 'FY26'], ['DACH', '8.9', '31.2'], ['Nordics', '4.2', '14.4'], ['UK & Ireland', '4.2', '15.0']].map((r, j) =>
              <div key={j} style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', fontSize: 24, padding: '10px 12px', fontWeight: j === 0 ? 700 : 400,
                background: j === 0 ? '#E6F2EC' : 'transparent', borderBottom: '1px solid #E3EAEB'}}>{r.map((v, m) => <div key={m} style={{textAlign: m ? 'right' : 'left'}}>{v}</div>)}</div>)}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 12px 0', fontSize: 26, fontWeight: 700}}>
              FY26 outlook<span style={{fontSize: 54}}><Num /></span></div>
          </div>}
          {i === 2 && <div style={{margin: 26, height: 384, borderRadius: 14, background: '#123B44', padding: '38px 40px', color: '#fff'}}>
            <div style={{fontSize: 22, fontWeight: 700, letterSpacing: 3, color: '#75D6E5', marginBottom: 20}}>OUTLOOK · SLIDE 4</div>
            <div style={{fontSize: 34, fontWeight: 700, marginBottom: 24}}>FY26 revenue expected at</div>
            <div style={{fontSize: 72, fontWeight: 700}}><Num dark /></div>
          </div>}
        </div>;
      })}
    </AbsoluteFill>;
  };
  return (
    <Scene from={0} to={6.6}>
      <Stage /><Panels /><Phone />
      <Pill text="3 files to fix by 9 a.m." color={C.red} at={5.5} until={6.1} y={900} />
      <Tag x={60} y={1046} at={0.4} until={6.0}>Illustration</Tag>
    </Scene>
  );
};

// ---------- 6.4–18.6 · Before: the team's opening, retimed (public/clips/before.mp4) ----------
const Before = () => {
  const Clip = () => { const t = useT(); return <AbsoluteFill style={{opacity: k(t, [6.4, 6.8], [0, 1]) * (1 - k(t, [18.2, 18.6], [0, 1], INOUT))}}>
    <OffthreadVideo src={staticFile('clips/before.mp4')} muted style={{width: 1920, height: 1080}} /></AbsoluteFill>; };
  return (
    <Scene from={6.4} to={18.6}>
      <At at={6.4} dur={12.2}><Clip /></At>
      <Card text="It's in the memo. The model. The *deck.*" at={6.7} until={9.4} />
      <Card text="Miss one, and it goes out *wrong.*" at={9.6} until={12.3} />
      <Card text="So you hunt, file by file." at={12.5} until={15.1} />
      <Card text="Or a chatbot hands you a *to-do list.*" at={15.3} until={18.1} />
    </Scene>
  );
};

// ---------- the three real files on a curved wall, linked by one beam (after / loop closed) ----------
const SYNC: [string, string, string, number, number][] = [
  ['ui/sync-memo.png', 'Board Memo Q3.docx', C.word, 370, 34], ['ui/sync-deck.png', 'Board Deck Q3.pptx', C.ppt, 960, 0], ['ui/sync-model.png', 'FY26 Model.xlsx', C.excel, 1550, -34]];
export const Wall: React.FC<{from: number; to: number; beamAt: number; tagAt: number; accepted?: boolean}> = ({from, to, beamAt, tagAt, accepted}) => {
  const t = useT();
  const o = k(t, [from, from + 0.5], [0, 1]) * (1 - k(t, [to - 0.4, to], [0, 1])), beam = k(t, [beamAt, beamAt + 0.9], [0, 1], INOUT), pulse = ((t - beamAt) / 1.1) % 1;
  return <AbsoluteFill style={{perspective: 1800, opacity: o}}>
    {SYNC.map(([src, name, c, x, ry], i) => {
      const p = k(t, [from + i * 0.12, from + 0.6 + i * 0.12], [0, 1]), tag = k(t, [tagAt + i * 0.2, tagAt + 0.3 + i * 0.2], [0, 1]);
      return <div key={i} style={{position: 'absolute', left: x - 330, top: 300 + (1 - p) * 50, width: 660, opacity: p, transform: `rotateY(${ry}deg) scale(${0.94 + 0.06 * p})`}}>
        <div style={{position: 'relative', width: 660, height: 371, borderRadius: 16, overflow: 'hidden', background: '#fff',
          boxShadow: `0 40px 80px rgba(16,38,45,.2), 0 0 0 1px rgba(16,38,45,.08), 0 0 ${40 * beam}px rgba(117,214,229,.55)`}}>
          <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <div style={{position: 'absolute', right: 14, top: 14, padding: '8px 16px', borderRadius: 20, fontSize: 22, fontWeight: 700, opacity: tag,
            background: accepted ? C.excel : '#F2B33D', color: accepted ? '#fff' : C.ink}}>{accepted ? '✓ Accepted' : 'Waiting for your OK'}</div>
        </div>
        <div style={{marginTop: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, color: C.ink, fontSize: 28, fontWeight: 700}}>
          <div style={{width: 20, height: 20, borderRadius: 5, background: c}} />{name}</div>
      </div>;
    })}
    <div style={{position: 'absolute', left: 40, width: 1840, top: 483, height: 5, borderRadius: 2, transformOrigin: 'center', transform: `scaleX(${beam})`,
      background: `linear-gradient(90deg, transparent, ${C.teal} 12%, #75D6E5 50%, ${C.teal} 88%, transparent)`, boxShadow: '0 0 18px rgba(117,214,229,.9)'}} />
    {t > beamAt + 0.5 && <div style={{position: 'absolute', left: 40 + 1840 * pulse - 70, top: 474, width: 140, height: 24, borderRadius: 12,
      background: 'radial-gradient(closest-side, #fff, rgba(117,214,229,.9), transparent)'}} />}
  </AbsoluteFill>;
};

// ---------- 18.4–25 · After: "Now imagine changing it once, and watching every file catch up, waiting only for your OK." ----------
const After = () => (
  <Scene from={18.4} to={25.0}>
    <Stage />
    <Wall from={18.5} to={25.0} beamAt={20.7} tagAt={22.6} />
    <Line center y={110} size={96} words={ws('Change it *once.*', 18.9)} out={20.5} />
    <Line center y={110} size={96} words={ws('Every file *catches* *up.*', 20.7)} out={22.4} />
    <Line center y={110} size={96} words={ws('Waiting for *your* *OK.*', 22.6)} out={24.6} />
    <Tag x={120} y={1046} at={18.8} until={24.6}>Product UI · real files</Tag>
  </Scene>
);

export const BIG = [100, 112, 1720];
// Model picker: the recording shows "No model". It is covered with the frame's own background (cloned from a blank strip on the same
// row, so it matches every frame) and the real "gpt-5.5" picker text, lifted from the app's collaboration recording, sits on top.
export const ModelLabel: React.FC<{hide?: number[][]; children: React.ReactNode}> = ({hide = [], children}) => {
  const t = useT();
  if (hide.some(([a, b]) => t >= a && t < b)) return null;
  // background: the blank 24 px strip on the same row just right of the picker (x 1798–1822), stretched 4× across the label
  return <div style={{position: 'absolute', left: 1700, top: 985, width: 96, height: 25, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -1798 * 4, top: -985, width: 1920, height: 1080, transformOrigin: '0 0', transform: 'scaleX(4)'}}>{children}</div>
    <Img src={staticFile('ui/model-gpt55.png')} style={{position: 'absolute', left: 3, top: 1, width: 89, height: 23}} /></div>;
};                 // whole-app window, frame-filling
const ZOOM = [700, 280, 1220, 686];           // composer + steps, ~1.4×

// ---------- 24.8–33 · Bridge: "That's Agentic Office. Your Word, Excel and PowerPoint files in one workspace, with an assistant that does the fixing." ----------
export const Bridge = () => {
  const Title = () => {
    const t = useT(), o = k(t, [25.0, 25.5], [0, 1]) * (1 - k(t, [26.4, 26.8], [0, 1]));
    return <div style={{position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', opacity: o, transform: `scale(${0.95 + 0.05 * o})`}}>
      <Img src={staticFile('ui/logo.png')} style={{width: 150, height: 150, filter: 'drop-shadow(0 24px 36px rgba(16,38,45,.2))'}} />
      <div style={{fontSize: 130, fontWeight: 700, letterSpacing: -4, color: C.ink, marginTop: 20}}>Agentic <span style={{color: C.ice}}>Office.</span></div>
    </div>;
  };
  return (
    <Scene from={24.8} to={33.1}>
      <Stage /><Title />
      <Cam enter={[26.6, 27.0]} exit={[32.7, 33.1]} keys={[{t: 26.6, src: APP, dst: BIG}, {t: 30.2, src: APP, dst: BIG}, {t: 31.2, src: [1100, 580, 820, 461], dst: BIG}]}>
        <Layers shots={[['ui/ws-word.png', 26.6], ['ui/excel-126.png', 27.45], ['ui/ws-deck.png', 27.95], ['ui/ws-word.png', 29.4]]} />
        <ModelLabel hide={[[27.4, 28.05]]}><Layers shots={[['ui/ws-word.png', 26.6], ['ui/excel-126.png', 27.45], ['ui/ws-deck.png', 27.95], ['ui/ws-word.png', 29.4]]} /></ModelLabel>
      </Cam>
      <Cap text="Word, Excel and PowerPoint. *One* *workspace.*" at={26.8} out={30.2} />
      <Cap text="With an *assistant* that does the fixing." at={30.4} out={32.7} />
      <Chip c={C.word} text="Word" x={110} y={1004} at={26.9} until={30.2} />
      <Chip c={C.excel} text="Excel" x={290} y={1004} at={27.45} until={30.2} />
      <Chip c={C.ppt} text="PowerPoint" x={470} y={1004} at={27.95} until={30.2} />
      <Tag x={1050} y={1046} at={27.0} until={32.7}>Product UI · real recording · files stored on your device · cloud AI may process content</Tag>
    </Scene>
  );
};

// ---------- 32.9–38.3 · "Tell it what changed. It finds every place that number lives, and drafts each fix." (task 3, real, 4×) ----------
export const Ask = () => (
  <Scene from={32.9} to={38.3}>
    <Stage />
    <Cam enter={[32.9, 33.3]} exit={[38.1, 38.3]} keys={[{t: 32.9, src: [1100, 560, 820, 461], dst: BIG}, {t: 36.3, src: [1100, 560, 820, 461], dst: BIG}, {t: 36.9, src: [1100, 170, 820, 461], dst: BIG}]}>
      <At at={32.9} dur={3.67}><FullVid src="clips/task3full.mp4" startFrom={4} rate={3} /></At>
      <At at={36.57} dur={1.73}><FullVid src="clips/task3full.mp4" startFrom={15} rate={6} /></At>
      <ModelLabel>
        <At at={32.9} dur={3.67}><FullVid src="clips/task3full.mp4" startFrom={4} rate={3} /></At>
        <At at={36.57} dur={1.73}><FullVid src="clips/task3full.mp4" startFrom={15} rate={6} /></At>
      </ModelLabel>
    </Cam>
    <Cap text="Tell it *what* *changed.*" at={33.2} out={34.45} />
    <Cap text="It finds every place that *number* *lives.*" at={34.6} out={36.5} />
    <Cap text="And *drafts* each fix." at={36.6} out={38.0} />
    <Tag x={230} y={1046} at={33.0} until={38.0}>Product UI · real recording · sped up 4×</Tag>
  </Scene>
);

// ---------- 38.2–45.9 · "Nothing changes without you. Every edit is marked, in the memo, the model and the deck. Accept it, or reject it." ----------
export const Review = () => (
  <Scene from={38.2} to={45.9}>
    <Stage />
    <Cam enter={[38.2, 38.5]} exit={[45.6, 45.9]} keys={[
      {t: 38.2, src: EX_ZOOM, dst: BIG}, {t: 39.59, src: EX_ZOOM, dst: BIG},
      {t: 39.6, src: [250, 95, 1350, 759], dst: BIG}, {t: 41.89, src: [250, 95, 1350, 759], dst: BIG},
      {t: 41.9, src: [600, 200, 1320, 743], dst: BIG}, {t: 44.89, src: [600, 200, 1320, 743], dst: BIG},
      {t: 44.9, src: APP, dst: BIG},
    ]}>
      <At at={38.2} dur={1.4}><FullVid src="clips/task3full.mp4" startFrom={25.25} rate={0.22} /></At>
      <At at={39.6} dur={2.3}><FullVid src="clips/task3full.mp4" startFrom={25.6} rate={0.6} /></At>
      <At at={41.9} dur={3.0}><FullVid src="clips/task3full.mp4" startFrom={38.6} /></At>
      <At at={44.9} dur={1.0}><FullVid src="clips/task3full.mp4" startFrom={43.5} /></At>
    </Cam>
    <Cap text="Nothing changes *without* *you.*" at={38.5} out={40.0} />
    <Cap text="Every edit is *marked.*" at={40.2} out={43.4} />
    <Cap text="*Accept* it, or *reject* it." at={43.6} out={45.5} />
    <Chip c={C.excel} text="Excel · FY26 Model" x={110} y={1004} at={38.35} until={39.45} />
    <Chip c={C.word} text="Word · Board Memo Q3" x={110} y={1004} at={39.7} until={41.75} />
    <Chip c={C.ppt} text="PowerPoint · Board Deck Q3 · all changes" x={110} y={1004} at={42.0} until={44.75} />
    <Tag x={1180} y={1046} at={38.3} until={45.5}>Product UI · real recording · sped up</Tag>
  </Scene>
);

// ---------- 45.8–51.4 · "Your team's assistants share what they know, and hand off the work. Only a person says yes." ----------
const Agent: React.FC<{label: string; sub: string; style: React.CSSProperties}> = ({label, sub, style}) => (
  <div style={{position: 'absolute', top: 330, width: 500, height: 190, background: '#fff', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 26,
    padding: '0 34px 0 40px', boxShadow: '0 40px 80px rgba(16,38,45,.16), 0 0 0 1px rgba(16,38,45,.08)', ...style}}>
    <div style={{width: 96, height: 96, borderRadius: 24, background: C.teal, display: 'grid', placeItems: 'center', flex: 'none'}}><Spark /></div>
    <div><div style={{fontSize: 42, fontWeight: 700, letterSpacing: -1, color: C.ink, lineHeight: 1.05}}>{label}</div>
      <div style={{fontSize: 24, color: LIGHT, marginTop: 8}}>{sub}</div></div>
  </div>
);
export const Team = () => {
  const Diagram = () => {
    const t = useT();
    const dim = k(t, [49.6, 49.95], [0, 1], INOUT), inL = k(t, [45.9, 46.5], [0, 1]), inR = k(t, [46.05, 46.65], [0, 1]);
    const draw = k(t, [46.6, 47.3], [0, 1], INOUT), solid = k(t, [48.3, 48.6], [0, 1]), pk = k(t, [48.4, 49.3], [0, 1], INOUT), pkIn = k(t, [46.9, 47.3], [0, 1]);
    return <AbsoluteFill style={{opacity: 1 - dim, filter: `blur(${dim * 10}px)`}}>
      <div style={{position: 'absolute', left: 660, width: 600, top: 423, height: 4, transformOrigin: 'center', transform: `scaleX(${draw})`,
        background: 'repeating-linear-gradient(90deg, rgba(6,109,130,.45) 0 14px, transparent 14px 28px)'}} />
      <div style={{position: 'absolute', left: 660, width: 600, top: 423, height: 4, borderRadius: 2, background: C.teal, boxShadow: '0 0 20px rgba(117,214,229,.9)', opacity: solid}} />
      <Agent label="Your assistant" sub="works in your files" style={{left: 150 - (1 - inL) * 220, opacity: inL}} />
      <Agent label="Priya's assistant" sub="works in Priya's files" style={{left: 1270 + (1 - inR) * 220, opacity: inR}} />
      <div style={{position: 'absolute', width: 230, height: 280, padding: 24, background: '#fff', borderRadius: 24, boxShadow: '0 30px 60px rgba(16,38,45,.18)',
        left: 280 + 1130 * pk, top: 590 - 150 * Math.sin(Math.PI * pk), opacity: pkIn, transform: `rotate(${-4 + 7 * pk}deg)`}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: C.word, marginBottom: 18}} />
        {[90, 80, 94, 66, 86].map((w, i) => <div key={i} style={{height: 10, width: `${w}%`, background: '#DCE6E8', borderRadius: 5, marginBottom: 13}} />)}
      </div>
    </AbsoluteFill>;
  };
  return (
    <Scene from={45.8} to={51.5}>
      <Stage /><Diagram />
      <Cap text="Assistants share what they *know.*" at={46.0} out={48.2} y={110} size={60} />
      <Cap text="They hand off the *work.*" at={48.4} out={49.6} y={110} size={60} />
      <Tag x={140} y={1046} at={46.0} until={49.6}>Illustration</Tag>
      <Cam enter={[49.7, 50.0]} exit={[51.15, 51.4]} keys={[{t: 49.7, src: ROOM_VIEW, dst: BIG}]}>
        <At at={49.7} dur={0.5}><FullImg src="ui/room-29.png" /></At>
        <At at={50.2} dur={1.3}><FullVid src="clips/collab-take.mp4" startFrom={29.9} /></At>
      </Cam>
      <Cap text="Only a *person* says *yes.*" at={49.85} out={51.1} />
      <Tag x={230} y={1046} at={49.8} until={51.1}>Product UI · real recording · simulated teammate</Tag>
    </Scene>
  );
};

// ---------- 51.3–54.8 · Loop closed: "Ten places. Three files. One review." ----------
const Closed = () => (
  <Scene from={51.1} to={54.9}>
    <Stage />
    <Wall from={51.1} to={54.9} beamAt={51.4} tagAt={52.4} accepted />
    <Line center y={110} size={96} words={[{w: 'Ten places.', at: 51.6}, {w: 'Three files.', at: 52.6}, {w: 'One review.', at: 53.5, c: C.ice}]} />
    <Pill text="✓ 10 of 10 changes accepted · 3 of 3 files" color={C.excel} at={53.6} until={54.5} y={880} />
  </Scene>
);

// ---------- 54.7–61 · Slogan + action: "Agentic Office. Change it once. Every file follows." ----------
const Slogan = () => {
  const Lockup = () => {
    const t = useT(), o = k(t, [54.8, 55.4], [0, 1]) * (1 - k(t, [60.6, 61.0], [0, 1]));
    return <div style={{position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', opacity: o, transform: `translateY(${(1 - o) * 30}px)`}}>
      <Img src={staticFile('ui/logo.png')} style={{width: 170, height: 170, filter: 'drop-shadow(0 24px 36px rgba(16,38,45,.2))'}} />
      <div style={{fontSize: 190, fontWeight: 700, letterSpacing: -7, color: C.ink, marginTop: 18}}>Agentic Office</div>
    </div>;
  };
  return (
    <Scene from={54.7} to={61.0}>
      <Stage /><Lockup />
      <Line center y={560} size={72} words={[{w: 'Change it once.', at: 56.3}, {w: 'Every file follows.', at: 57.4, c: C.ice}]} out={60.6} />
      <Line center y={680} size={34} weight={400} color={LIGHT} words={[{w: 'You stay in control.', at: 58.0}]} out={60.6} />
      <Pill text="Request early access" color={C.teal} at={58.6} until={60.6} y={790} solid />
    </Scene>
  );
};

export const Film21: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useState(() => {
    Promise.all([
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Regular.ttf')})`, {weight: '400'}).load(),
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Bold.ttf')})`, {weight: '700'}).load(),
    ]).then((faces) => { faces.forEach((f) => (document.fonts as any).add(f)); continueRender(handle); });
    return null;
  });
  return (
    <AbsoluteFill style={{fontFamily: 'Inter, sans-serif', background: C.paper}}>
      <Hook /><Before /><After /><Bridge /><Ask /><Review /><Team /><Closed /><Slogan />
    </AbsoluteFill>
  );
};
