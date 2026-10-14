import React, {createContext, useContext, useState} from 'react';
import {AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame} from 'remotion';

// V12: OpenArt hero shot (S01) + real UI from the product recording + kinetic type.
// Times are absolute film seconds, locked to the V11 voice stems (see README.md).
export const FPS = 30;
export const C = {paper: '#F6F8F7', ink: '#10262D', teal: '#066D82', ice: '#0A8BA3', muted: '#42656D', line: '#A6C8CE', word: '#2F6DB5', excel: '#1E8A5A', ppt: '#E26332', red: '#C8463D'};
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const INOUT = Easing.bezier(0.65, 0, 0.35, 1);
export const k = (t: number, [a, b]: number[], [x, y]: number[], easing = OUT) =>
  interpolate(t, [a, b], [x, y], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

// ---------- time plumbing: scenes are Sequences, children read absolute time ----------
export const SceneStart = createContext(0);
export const useT = () => useCurrentFrame() / FPS + useContext(SceneStart);
export const Scene: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => (
  <Sequence from={Math.round(from * FPS)} durationInFrames={Math.round((to - from) * FPS)}>
    <SceneStart.Provider value={from}><AbsoluteFill style={{perspective: 2200, overflow: 'hidden'}}>{children}</AbsoluteFill></SceneStart.Provider>
  </Sequence>
);
// Mounts children (videos) at absolute time `at` for `dur` seconds.
export const At: React.FC<{at: number; dur: number; children: React.ReactNode}> = ({at, dur, children}) => {
  const start = useContext(SceneStart);
  return <Sequence layout="none" from={Math.round((at - start) * FPS)} durationInFrames={Math.round(dur * FPS)}>{children}</Sequence>;
};

// ---------- stages ----------
export const Stage: React.FC<{dark?: boolean}> = () => {
  const t = useT();
  const x = 50 + 10 * Math.sin(t * 0.3), y = 40 + 8 * Math.cos(t * 0.23);
  return <AbsoluteFill style={{background: `radial-gradient(900px 650px at ${x}% ${y}%, rgba(117,214,229,.22), transparent 70%), radial-gradient(1400px 900px at 50% 40%, #FFFFFF, #E9F0EF)`}} />;
};

// ---------- kinetic type ----------
export type W = {w: string; at: number; c?: string};
export const Line: React.FC<{words: W[]; x?: number; y: number; size: number; color?: string; out?: number; center?: boolean; weight?: number}> =
  ({words, x = 140, y, size, color = C.ink, out, center, weight = 700}) => {
    const t = useT();
    const q = out === undefined ? 0 : k(t, [out, out + 0.35], [0, 1], INOUT);
    return (
      <div style={{position: 'absolute', top: y, left: center ? 0 : x, right: center ? 0 : undefined, textAlign: center ? 'center' : 'left',
        fontSize: size, fontWeight: weight, letterSpacing: -size * 0.035, lineHeight: 1.05, color, whiteSpace: 'nowrap',
        opacity: 1 - q, filter: `blur(${q * 12}px)`, transform: `translateY(${-q * 30}px)`}}>
        {words.map(({w, at, c}, i) => {
          const p = k(t, [at, at + 0.55], [0, 1]);
          return <span key={i} style={{display: 'inline-block', marginRight: size * 0.26, color: c, opacity: p,
            filter: `blur(${(1 - p) * 14}px)`, transform: `translateY(${(1 - p) * 40}px) scale(${1.06 - 0.06 * p})`}}>{w}</span>;
        })}
      </div>
    );
  };

export const Tag: React.FC<{x: number; y: number; at: number; until?: number; dark?: boolean; children: React.ReactNode}> = ({x, y, at, until = 99, dark, children}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: x, top: y, fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
    color: '#5B7279', opacity: k(t, [at, at + 0.5], [0, 0.9]) * (1 - k(t, [until, until + 0.3], [0, 1]))}}>{children}</div>;
};


// Editorial focus ring drawn over a real UI region (does not alter UI pixels).
export const Ring: React.FC<{r: number[]; at: number; until?: number}> = ({r: [left, top, width, height], at, until = 99}) => {
  const t = useT();
  const o = k(t, [at, at + 0.35], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left, top, width, height, borderRadius: 12, border: `3px solid ${C.teal}`,
    boxShadow: `0 0 0 8px rgba(6,109,130,.12), 0 0 36px rgba(117,214,229,.6)`, opacity: o, transform: `scale(${1.04 - 0.04 * o})`}} />;
};

// =====================================================================================
export const Film: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useState(() => {
    Promise.all([
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Regular.ttf')})`, {weight: '400'}).load(),
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Bold.ttf')})`, {weight: '700'}).load(),
    ]).then((faces) => { faces.forEach((f) => (document.fonts as any).add(f)); continueRender(handle); });
    return null;
  });
  return (
    <AbsoluteFill style={{fontFamily: 'Inter, sans-serif', background: '#0A1C21'}}>
      <S01 /><S02 /><S03 /><S04 /><MainCam /><DeckScroll /><S05 /><S06 /><S07 /><S08 /><S09 />
    </AbsoluteFill>
  );
};

// S01 0–5.4 · "Word. Excel. PowerPoint. Your work. Too many places." — OpenArt Veo 3.1 clip, lands on the exact keyframe.
export const S01 = () => {
  const End = () => { const t = useT(); return <Img src={staticFile('ui/s01-end.png')} style={{position: 'absolute', inset: 0, width: 1920, height: 1080, opacity: k(t, [4.4, 4.9], [0, 1], INOUT)}} />; };
  return (
    <Scene from={0} to={5.4}>
      <At at={0} dur={4.95}><OffthreadVideo src={staticFile('clips/s01-merge-veo-720p.mp4')} muted style={{position: 'absolute', width: 1920, height: 1080}} /></At>
      <End />
    </Scene>
  );
};

// ---------- camera over a full 1920x1080 UI frame ----------
// Each key: which source rect [sx,sy,sw,sh] is visible, and the screen rect [x,y,w] it fills. Between keys the camera
// eases and the visible window (clip) moves with it, so a zoom is one continuous move over the real UI pixels.
export type CamKey = {t: number; src: number[]; dst: number[]};
export const Cam: React.FC<{keys: CamKey[]; enter?: number[]; exit?: number[]; children: React.ReactNode}> = ({keys, enter, exit, children}) => {
  const t = useT();
  let i = 0;
  while (i < keys.length - 2 && t >= keys[i + 1].t) i++;
  const a = keys[i], b = keys[i + 1] ?? a;
  const p = b === a ? 0 : k(t, [a.t, b.t], [0, 1], INOUT);
  const L = (u: number[], v: number[], j: number) => u[j] + (v[j] - u[j]) * p;
  const [sx, sy, sw, sh] = [0, 1, 2, 3].map((j) => L(a.src, b.src, j));
  const [dx, dy, dw] = [0, 1, 2].map((j) => L(a.dst, b.dst, j));
  const s = dw / sw;
  const o = (enter ? k(t, enter, [0, 1]) : 1) * (exit ? 1 - k(t, exit, [0, 1], INOUT) : 1);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: o, filter: `blur(${(1 - o) * 10}px) drop-shadow(0 40px 60px rgba(16,38,45,.22)) drop-shadow(0 10px 20px rgba(16,38,45,.12))`}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', overflow: 'hidden',
        transform: `translate(${dx - sx * s}px, ${dy - sy * s}px) scale(${s})`,
        clipPath: `inset(${sy}px ${1920 - sx - sw}px ${1080 - sy - sh}px ${sx}px round ${16 / s}px)`}}>
        {children}
      </div>
    </div>
  );
};
export const FullImg: React.FC<{src: string}> = ({src}) => <Img src={staticFile(src)} style={{position: 'absolute', width: 1920, height: 1080}} />;
export const FullVid: React.FC<{src: string; startFrom: number; rate?: number}> = ({src, startFrom, rate = 1}) =>
  <OffthreadVideo src={staticFile(src)} muted startFrom={Math.round(startFrom * FPS)} playbackRate={rate} style={{position: 'absolute', width: 1920, height: 1080}} />;
// Screen rect of a source region while the camera rests on `win` at `dst` (for focus rings).
export const onScreen = (win: number[], dst: number[], [rx, ry, rw, rh]: number[]) => {
  const s = dst[2] / win[2];
  return [dst[0] + (rx - win[0]) * s, dst[1] + (ry - win[1]) * s, rw * s, rh * s];
};

// ---------- framing ----------
// Whole-app views sit centred in U (16:9). Detail views isolate one real UI piece and use the free side for big type:
// the Assistant panel on the RIGHT, slides / popovers / the document page on the LEFT. All stages are dark.
export const U = [190, 168, 1540];
export const FULL = [0, 0, 1920, 1080];
export const TREE_SRC = [62, 212, 286, 842], TREE_DST = [150, 104, 315];          // file tree piece (left)
export const RIGHT = [1260, 110, 520];                                             // Assistant-panel piece, 284x500 windows
export const P_COMPOSER = [1627, 555, 284, 500], P_STEPS = [1627, 280, 284, 500], P_TOP = [1627, 262, 284, 500];
export const PAGE = [512, 308, 596, 470], PAGE_DST = [160, 220, 960];                 // memo page piece (task-3 frames)
export const LIGHT = '#5B7279';
export const Captions: React.FC<{lines: [W[], number?][]}> = ({lines}) => <>
  {lines.map(([words, out], i) => <Line key={i} center y={40} size={56} words={words} out={out} />)}
</>;
export const Big: React.FC<{lines: W[][]; y?: number; size?: number; out?: number; x?: number}> = ({lines, y = 300, size = 100, out, x = 120}) => <>
  {lines.map((words, i) => <Line key={i} x={x} y={y + i * size * 1.12} size={size} words={words} out={out} />)}
</>;
export const Note: React.FC<{text: string; x: number; y: number; at: number; until?: number; size?: number; center?: boolean}> = ({text, x, y, at, until = 99, size = 34, center}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: center ? 0 : x, right: center ? 0 : undefined, top: y, textAlign: center ? 'center' : 'left', fontSize: size, color: LIGHT,
    opacity: k(t, [at, at + 0.5], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]))}}>{text}</div>;
};
// File chip (editorial, outside the UI): app colour + real filename.
export const Chip: React.FC<{c: string; text: string; at: number; until: number; x: number; y: number}> = ({c, text, at, until, x, y}) => {
  const t = useT();
  const p = k(t, [at, at + 0.45], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderRadius: 16,
    background: '#fff', border: '1px solid rgba(16,38,45,.1)', boxShadow: '0 12px 30px rgba(16,38,45,.1)', color: C.ink, fontSize: 30, fontWeight: 700, opacity: p,
    transform: `translateY(${(1 - p) * 20}px)`}}><div style={{width: 30, height: 30, borderRadius: 8, background: c}} />{text}</div>;
};

// One continuous camera over the real recording, S02–S04 (6.6–28.6 s): first and second demo tasks.
export const MainCam = () => (
  <Scene from={6.6} to={24.9}>
    <Cam enter={[6.6, 7.0]} exit={[24.45, 24.85]} keys={[
      {t: 6.6, src: FULL, dst: [300, 197, 1320]},          // emerges where the S01 workspace window receded
      {t: 7.5, src: FULL, dst: U},
      {t: 9.7, src: FULL, dst: U},
      {t: 10.6, src: TREE_SRC, dst: TREE_DST},            // S03: the file tree lifts out as its own piece
      {t: 18.6, src: TREE_SRC, dst: TREE_DST},
      {t: 19.3, src: FULL, dst: U},                       // S04: back to the whole app
      {t: 19.6, src: FULL, dst: U},
      {t: 20.3, src: P_COMPOSER, dst: RIGHT},             // the Assistant panel lifts out; prompt types
      {t: 22.3, src: P_COMPOSER, dst: RIGHT},
      {t: 22.8, src: P_STEPS, dst: RIGHT},                // scroll up: the agent's steps
      {t: 24.6, src: P_STEPS, dst: RIGHT},
    ]}>
      <At at={6.6} dur={12.0}><FullImg src="ui/memo-start.png" /></At>
      <At at={18.6} dur={1.0}><FullImg src="ui/typing-start.png" /></At>
      <At at={19.6} dur={2.7}><FullVid src="clips/typing.mp4" startFrom={3} rate={5.33} /></At>
      <At at={22.3} dur={2.3}><FullVid src="clips/working-deck.mp4" startFrom={0} rate={2.6} /></At>
    </Cam>
  </Scene>
);

// V15 deck 24.5–29.4 · the proposed deck, scrolled page by page (team's V5 sequence: opens in the app, zooms, scrolls all pages).
// Deck pages are illustrative (labelled), the in-app view is the real recording.
export const DECK_WIN = [100, 62, 1724, 960], DECK_WIN_DST = [150, 128, 1620];
export const DeckScroll = () => (
  <Scene from={24.4} to={29.4}>
    <Cam enter={[24.45, 24.9]} exit={[29.0, 29.4]} keys={[{t: 24.45, src: DECK_WIN, dst: DECK_WIN_DST}]}>
      <At at={24.5} dur={4.9}><FullVid src="clips/deck-scroll.mp4" startFrom={0} rate={1.2} /></At>
    </Cam>
    <Tag x={150} y={1046} at={24.7} until={28.9} dark>Product UI · real recording · deck pages illustrative</Tag>
  </Scene>
);

// S02 5.4–10.2 · "Agentic Office. One agentic, collaborative workspace."
export const S02 = () => {
  return (
    <Scene from={5.4} to={10.2}>
      <Stage />
      <Line center y={440} size={156} words={[{w: 'Agentic', at: 5.5}, {w: 'Office.', at: 5.82, c: C.ice}]} out={6.55} />
      <Captions lines={[[[{w: 'One', at: 6.81}, {w: 'agentic,', at: 7.05}, {w: 'collaborative', at: 7.3}, {w: 'workspace.', at: 7.7, c: C.ice}], 9.55]]} />
      <Tag x={U[0]} y={1046} at={7.6} until={9.55} dark>Product UI · real recording</Tag>
    </Scene>
  );
};

// S03 10.2–18.6 · "Keep your files close. Stored on your device, with your agent working right inside your workspace."
export const S03 = () => (
  <Scene from={10.2} to={18.6}>
    <Stage dark />
    <Big x={640} y={290} lines={[[{w: 'Your', at: 10.7}, {w: 'files.', at: 10.85}], [{w: 'Your', at: 11.9}, {w: 'device.', at: 12.1}], [{w: 'Your', at: 13.23}, {w: 'workspace.', at: 13.45, c: C.ice}]]} out={18.15} />
    <Note x={646} y={660} at={14.9} until={18.15} size={40} text="Local file storage. No extra upload step." />
    <Note x={646} y={964} at={15.2} until={18.15} size={28} text="Cloud AI may process document content." />
    <Ring r={onScreen(TREE_SRC, TREE_DST, [68, 340, 280, 112])} at={13.4} until={17.9} />
    <Tag x={TREE_DST[0]} y={66} at={10.8} until={18.15} dark>Product UI · real recording</Tag>
  </Scene>
);

// S04 18.6–28.6 · "Just ask your agent: create a presentation from this memo and forecast. One prompt. A proposed deck, right in your workspace."
export const S04 = () => (
  <Scene from={18.6} to={28.6}>
    <Stage dark />
    <Captions lines={[[[{w: 'Just', at: 18.75}, {w: 'ask', at: 18.95}, {w: 'your', at: 19.15}, {w: 'agent.', at: 19.35, c: C.ice}], 19.95]]} />
    <Big lines={[[{w: 'Just', at: 20.15}, {w: 'ask', at: 20.25}], [{w: 'your', at: 20.35}, {w: 'agent.', at: 20.45, c: C.ice}]]} out={22.9} />
    <Chip c={C.word} text="Board Memo Q3.docx" x={124} y={560} at={20.9} until={22.9} />
    <Chip c={C.excel} text="FY26 Model.xlsx" x={124} y={650} at={21.4} until={22.9} />
    <Chip c={C.ppt} text="New presentation" x={124} y={760} at={22.0} until={22.9} />
    <Big y={380} size={124} lines={[[{w: 'One', at: 23.1}], [{w: 'prompt.', at: 23.3, c: C.ice}]]} out={24.45} />
    <Captions lines={[[[{w: 'A', at: 24.6}, {w: 'proposed', at: 24.7, c: C.ice}, {w: 'deck,', at: 24.85, c: C.ice}, {w: 'right', at: 25.25}, {w: 'in', at: 25.4}, {w: 'your', at: 25.55}, {w: 'workspace.', at: 25.75}], 28.9]]} />
    <Tag x={120} y={1046} at={19.6} until={24.45} dark>Product UI · real recording · sped up</Tag>
  </Scene>
);

// ---------- full-app views: the whole window, gentle push-ins (max ~1.3×), cross-dissolves between real frames ----------
export const APP = [0, 95, 1920, 985], APP_DST = [180, 150, 1560];   // whole app below the recording's speed badge
export const Layers: React.FC<{shots: [string, number][]}> = ({shots}) => {
  const t = useT();
  return <>{shots.map(([src, at], i) => <div key={i} style={{position: 'absolute', inset: 0, opacity: k(t, [at, at + 0.3], [0, 1], INOUT)}}><FullImg src={src} /></div>)}</>;
};

// S05 29–36 · "Review each change. Accept or reject. Keep the edits you want, without a whole-document rewrite."
// V20: one task (DACH Q4 → 8.5) across all three apps in the full window: Word tracked changes → Excel cell with its own
// Reject / Accept bar → PowerPoint with the Changes list → the real Accept all click → the updated memo.
export const EX_ZOOM = [443, 95, 1477, 758];         // Excel: the inline bar and the changed table
export const S05 = () => (
  <Scene from={29.0} to={36}>
    <Stage />
    <Cam enter={[29.0, 29.4]} keys={[
      {t: 29.0, src: APP, dst: APP_DST}, {t: 30.1, src: APP, dst: APP_DST},
      {t: 31.2, src: EX_ZOOM, dst: APP_DST}, {t: 33.7, src: EX_ZOOM, dst: APP_DST},
      {t: 34.3, src: APP, dst: APP_DST},
    ]}>
      <Layers shots={[['ui/memo-tracked.png', 29.0], ['ui/excel-126.png', 30.0], ['ui/deck-review.png', 31.75]]} />
      <At at={32.6} dur={1.35}><FullVid src="clips/deck-accept.mp4" startFrom={0.3} rate={1.4} /></At>
      <At at={33.9} dur={2.1}><Layers shots={[['ui/memo-accepted.png', 33.9]]} /></At>
    </Cam>
    <Captions lines={[
      [[{w: 'Review', at: 29.55}, {w: 'each', at: 29.7}, {w: 'change.', at: 29.85, c: C.ice}], 30.75],
      [[{w: 'Accept', at: 30.93, c: C.ice}, {w: 'or', at: 31.25}, {w: 'reject.', at: 31.45}], 32.5],
      [[{w: 'Keep', at: 32.73}, {w: 'the', at: 32.9}, {w: 'edits', at: 33.05}, {w: 'you', at: 33.25}, {w: 'want.', at: 33.45, c: C.ice}], 33.95],
      [[{w: 'No', at: 34.1}, {w: 'whole-document', at: 34.25}, {w: 'rewrite.', at: 34.5, c: C.ice}]],
    ]} />
    <Chip c={C.word} text="Word · Board Memo Q3" x={180} y={968} at={29.1} until={29.9} />
    <Chip c={C.excel} text="Excel · FY26 Model" x={180} y={968} at={30.05} until={31.6} />
    <Chip c={C.ppt} text="PowerPoint · Board Deck Q3" x={180} y={968} at={31.8} until={33.8} />
    <Chip c={C.word} text="Word · memo updated to €74.6m" x={180} y={968} at={34.0} until={35.7} />
    <Tag x={1180} y={1046} at={29.1}>Product UI · real recording · sped up</Tag>
  </Scene>
);

// S06 36–43.8 · "Work in the same document with your team. See who's here, what changed, and what each agent proposes."
// Real app, real live session and Room view (clips/collab-take.mp4, recorded 10 Oct 2026 from a local build).
// The teammate "Priya Raman" and her Assistant are a scripted demo participant on the same room API.
export const COLLAB_DST = [230, 130, 1460];
export const COL_ZOOM = [640, 300, 1280, 720];       // memo page + Room panel
export const COLLAB_SEGS: [number, number, number][] = [   // [film from, film to, source from]
  [36.0, 39.45, 12.7],    // presence arrives, Priya + her Assistant join the Room
  [39.45, 40.3, 19.5],    // her Assistant writes §3: runway 26 → 28 months, live on your page
];
export const S06 = () => (
  <Scene from={36} to={43.8}>
    <Stage />
    <Cam enter={[36.0, 36.4]} exit={[43.4, 43.8]} keys={[{t: 36, src: FULL, dst: COLLAB_DST}, {t: 38.3, src: FULL, dst: COLLAB_DST}, {t: 39.3, src: COL_ZOOM, dst: COLLAB_DST}]}>
      {COLLAB_SEGS.map(([a, b, src], i) => <At key={i} at={a} dur={b - a}><FullVid src="clips/collab-take.mp4" startFrom={src} /></At>)}
      <At at={40.3} dur={3.5}><FullVid src="clips/collab-take.mp4" startFrom={20.3} rate={0.5} /></At>
    </Cam>
    <Captions lines={[
      [[{w: 'Same', at: 36.3}, {w: 'document.', at: 36.55}, {w: 'Together.', at: 37.4, c: C.ice}], 38.35],
      [[{w: "Who's", at: 38.53}, {w: 'here.', at: 38.7, c: C.ice}], 39.35],
      [[{w: 'What', at: 39.51}, {w: 'changed.', at: 39.68, c: C.ice}], 40.2],
      [[{w: 'What', at: 40.34}, {w: 'each', at: 40.5}, {w: 'assistant', at: 40.65}, {w: 'suggests.', at: 40.95, c: C.ice}], 43.5],
    ]} />
    <Tag x={230} y={1046} at={36.4}>Product UI · real recording · demo session, simulated teammate</Tag>
  </Scene>
);

// S07 43.8–53.4 · "Your agent and your teammate's agent share context, coordinate the handoff, and propose the next change. You review. You decide."
// V20: the V12 two-agent diagram returns (light, plain words: an agent is "an assistant that works inside your files"),
// then the real Room: Priya's Assistant proposes an edit and you click Accept.
export const Spark: React.FC<{size?: number}> = ({size = 46}) =>
  <div style={{width: size, height: size, background: '#fff', clipPath: 'polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)'}} />;
export const Agent: React.FC<{label: string; sub: string; style: React.CSSProperties}> = ({label, sub, style}) => (
  <div style={{position: 'absolute', top: 330, width: 500, height: 190, background: '#fff', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 26,
    padding: '0 34px 0 40px', boxShadow: '0 40px 80px rgba(16,38,45,.16), 0 0 0 1px rgba(16,38,45,.08)', ...style}}>
    <div style={{position: 'absolute', left: -26, top: -30, width: 84, height: 84, borderRadius: '50%', background: '#BFE9F0', border: '5px solid #fff', overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(16,38,45,.15)'}}>
      <div style={{position: 'absolute', left: 22, top: 12, width: 30, height: 30, borderRadius: '50%', background: C.ink}} />
      <div style={{position: 'absolute', left: 9, top: 48, width: 56, height: 40, borderRadius: '28px 28px 0 0', background: C.ink}} />
    </div>
    <div style={{width: 96, height: 96, borderRadius: 24, background: C.teal, display: 'grid', placeItems: 'center', flex: 'none'}}><Spark /></div>
    <div><div style={{fontSize: 42, fontWeight: 700, letterSpacing: -1, color: C.ink, lineHeight: 1.05}}>{label}</div>
      <div style={{fontSize: 24, color: LIGHT, marginTop: 8}}>{sub}</div></div>
  </div>
);
export const DocCard: React.FC<{style: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', width: 250, height: 300, padding: 26, background: '#fff', borderRadius: 26, overflow: 'hidden',
    boxShadow: '0 30px 60px rgba(16,38,45,.18), 0 0 0 1px rgba(16,38,45,.06)', ...style}}>
    <div style={{width: 52, height: 52, borderRadius: 14, background: C.word, marginBottom: 20}} />
    <div style={{height: 14, width: '72%', background: C.ink, borderRadius: 7, marginBottom: 18}} />
    {[96, 88, 92, 70, 94, 86, 60].map((w, i) => <div key={i} style={{height: 10, width: `${w}%`, background: i === 5 ? 'rgba(6,109,130,.45)' : '#DCE6E8', borderRadius: 5, marginBottom: 13}} />)}
  </div>
);
export const ROOM_VIEW = [700, 330, 1220, 686];      // memo + Room panel with the proposal card
export const S07 = () => {
  const Diagram = () => {
    const t = useT();
    const dim = k(t, [49.65, 50.05], [0, 1], INOUT);
    const inL = k(t, [43.9, 44.6], [0, 1]), inR = k(t, [44.05, 44.75], [0, 1]);
    const draw = k(t, [44.7, 45.5], [0, 1], INOUT), solid = k(t, [46.83, 47.15], [0, 1]);
    const pk = k(t, [46.9, 47.9], [0, 1], INOUT), pkIn = k(t, [45.0, 45.5], [0, 1]);
    const prop = k(t, [48.1, 48.65], [0, 1]), bars = k(t, [48.4, 48.95], [0, 1]);
    return (
      <AbsoluteFill style={{opacity: 1 - dim, filter: `blur(${dim * 10}px)`, transform: `scale(${1 - dim * 0.04})`}}>
        <div style={{position: 'absolute', left: 660, width: 600, top: 423, height: 4, transformOrigin: 'center', transform: `scaleX(${draw})`,
          background: `repeating-linear-gradient(90deg, rgba(6,109,130,.45) 0 14px, transparent 14px 28px)`}} />
        <div style={{position: 'absolute', left: 660, width: 600, top: 423, height: 4, borderRadius: 2, background: C.teal, boxShadow: '0 0 20px rgba(117,214,229,.9)', opacity: solid}} />
        <Agent label="Your assistant" sub="works in your files" style={{left: 150 - (1 - inL) * 220, opacity: inL}} />
        <Agent label="Priya's assistant" sub="works in Priya's files" style={{left: 1270 + (1 - inR) * 220, opacity: inR}} />
        <DocCard style={{left: 260 + 1150 * pk, top: 590 - 150 * Math.sin(Math.PI * pk) + (1 - pkIn) * 40, opacity: pkIn, transform: `rotate(${-4 + 7 * pk}deg)`}} />
        <div style={{position: 'absolute', left: 690, top: 590 + (1 - prop) * 60, width: 540, padding: '34px 38px', background: '#fff', borderRadius: 30, opacity: prop,
          boxShadow: '0 40px 80px rgba(16,38,45,.16), 0 0 0 1px rgba(16,38,45,.08)'}}>
          <div style={{fontSize: 40, fontWeight: 700, letterSpacing: -1, color: C.ink, marginBottom: 28}}>Suggested change</div>
          <div style={{height: 54, borderRadius: 12, background: 'rgba(226,99,50,.14)', marginBottom: 14, position: 'relative'}}>
            <div style={{position: 'absolute', left: 22, top: 22, height: 10, width: `${62 * bars}%`, borderRadius: 5, background: 'rgba(226,99,50,.7)'}} />
          </div>
          <div style={{height: 54, borderRadius: 12, background: 'rgba(30,138,90,.16)', position: 'relative'}}>
            <div style={{position: 'absolute', left: 22, top: 22, height: 10, width: `${74 * bars}%`, borderRadius: 5, background: C.excel}} />
          </div>
        </div>
      </AbsoluteFill>
    );
  };
  return (
    <Scene from={43.8} to={53.4}>
      <Stage /><Diagram />
      <Line center y={110} size={60} words={[{w: 'They', at: 43.95}, {w: 'share', at: 44.1}, {w: 'what', at: 44.25}, {w: 'they', at: 44.35}, {w: 'know.', at: 44.5, c: C.ice}]} out={46.6} />
      <Line center y={110} size={60} words={[{w: 'They', at: 46.83}, {w: 'hand', at: 46.95}, {w: 'off', at: 47.05}, {w: 'the', at: 47.15}, {w: 'work.', at: 47.25, c: C.ice}]} out={48.0} />
      <Line center y={110} size={60} words={[{w: 'They', at: 48.11}, {w: 'suggest', at: 48.25}, {w: 'the', at: 48.4}, {w: 'next', at: 48.5}, {w: 'change.', at: 48.6, c: C.ice}]} out={49.6} />
      <Note center x={0} y={200} at={44.3} until={49.6} size={32} text="Everyone on the team has an assistant that works inside their files." />
      <Tag x={140} y={1046} at={44.2} until={49.6}>Illustration</Tag>
      <Cam enter={[49.8, 50.2]} keys={[{t: 49.8, src: ROOM_VIEW, dst: COLLAB_DST}]}>
        <At at={49.8} dur={1.5}><FullImg src="ui/room-29.png" /></At>
        <At at={51.3} dur={2.1}><FullVid src="clips/collab-take.mp4" startFrom={29.9} /></At>
      </Cam>
      <Line center y={40} size={56} words={[{w: 'You', at: 50.1}, {w: 'review.', at: 50.3}, {w: 'You', at: 50.9}, {w: 'decide.', at: 51.1, c: C.ice}]} />
      <Tag x={230} y={1046} at={50.0}>Product UI · real recording · demo session, simulated teammate</Tag>
    </Scene>
  );
};

// S08 53.4–58.2 · "Less copying. Less rework. More time for the work that matters."
// V17: "Every file. In sync." Three real, accepted files on a curved wall, linked by one light beam (built locally, no generated UI).
export const SYNC: [string, string, string, number, number][] = [   // [image, file, colour, centre x, rotateY]
  ['ui/sync-memo.png', 'Board Memo Q3.docx', C.word, 400, 32],
  ['ui/sync-deck.png', 'Board Deck Q3.pptx', C.ppt, 960, 0],
  ['ui/sync-model.png', 'FY26 Model.xlsx', C.excel, 1520, -32],
];
export const S08 = () => {
  const Wall = () => {
    const t = useT();
    const beam = k(t, [54.1, 55.0], [0, 1], INOUT);
    const pulse = ((t - 54.6) / 1.1) % 1;
    return <AbsoluteFill style={{perspective: 1800}}>
      {SYNC.map(([src, name, c, x, ry], i) => {
        const p = k(t, [53.45 + i * 0.12, 54.05 + i * 0.12], [0, 1]);
        return <div key={i} style={{position: 'absolute', left: x - 290, top: 400 + (1 - p) * 50, width: 580, opacity: p,
          transform: `rotateY(${ry}deg) scale(${0.94 + 0.06 * p})`}}>
          <div style={{width: 580, height: 326, borderRadius: 16, overflow: 'hidden', background: '#fff',
            boxShadow: `0 40px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(117,214,229,${0.25 + 0.35 * beam}), 0 0 ${40 * beam}px rgba(117,214,229,.35)`}}>
            <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div style={{marginTop: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, color: C.ink, fontSize: 24, fontWeight: 700}}>
            <div style={{width: 18, height: 18, borderRadius: 5, background: c}} />{name}
          </div>
        </div>;
      })}
      {/* the beam runs through all three files */}
      <div style={{position: 'absolute', left: 90, width: 1740, top: 561, height: 4, borderRadius: 2, transformOrigin: 'center', transform: `scaleX(${beam})`,
        background: `linear-gradient(90deg, transparent, ${C.ice} 12%, ${C.ice} 88%, transparent)`, boxShadow: '0 0 18px rgba(117,214,229,.9), 0 0 50px rgba(117,214,229,.5)', mixBlendMode: 'screen'}} />
      {t > 54.6 && <div style={{position: 'absolute', left: 90 + 1740 * pulse - 60, top: 551, width: 120, height: 24, borderRadius: 12,
        background: 'radial-gradient(closest-side, #fff, rgba(117,214,229,.8), transparent)', filter: 'blur(2px)', mixBlendMode: 'screen'}} />}
    </AbsoluteFill>;
  };
  const Done = () => {
    const t = useT(), p = k(t, [55.4, 55.9], [0, 1]);
    return <div style={{position: 'absolute', left: 0, right: 0, top: 900, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 16}px)`}}>
      <div style={{padding: '12px 26px', borderRadius: 30, background: '#fff', border: '2px solid #1E8A5A', color: '#1E8A5A', boxShadow: '0 12px 30px rgba(16,38,45,.12)', fontSize: 26, fontWeight: 700}}>
        ✓ Every file in sync · 3 of 3 updated
      </div>
    </div>;
  };
  return (
    <Scene from={53.4} to={58.2}>
      <Stage dark /><Wall /><Done />
      <Tag x={120} y={1046} at={53.8} dark>Product UI · real recording</Tag>
      <Line center y={150} size={120} words={[{w: 'Less', at: 53.5}, {w: 'copying.', at: 53.68}]} out={54.12} />
      <Line center y={150} size={120} words={[{w: 'Less', at: 54.25}, {w: 'rework.', at: 54.43, c: C.ice}]} out={55.12} />
      <Line center y={110} size={96} words={[{w: 'More', at: 55.31}, {w: 'time', at: 55.48}, {w: 'for', at: 55.65}]} out={57.9} />
      <Line center y={220} size={96} words={[{w: 'the', at: 55.85}, {w: 'work', at: 56.05, c: C.ice}, {w: 'that', at: 56.25, c: C.ice}, {w: 'matters.', at: 56.45, c: C.ice}]} out={57.9} />
    </Scene>
  );
};

// S09 58.2–64.8 · "Agentic Office. Your files. Your team. Your agents. One workspace. You stay in control."
export const S09 = () => {
  const Lockup = () => {
    const t = useT();
    const word = 'Agentic Office'.split('').map((ch, i) => {
      const p = k(t, [58.3 + i * 0.045, 58.75 + i * 0.045], [0, 1]);
      return <span key={i} style={{display: 'inline-block', whiteSpace: 'pre', opacity: p, filter: `blur(${(1 - p) * 10}px)`, transform: `translateY(${(1 - p) * 30}px)`}}>{ch}</span>;
    });
    const lp = k(t, [58.2, 58.8], [0, 1]);
    return <>
      {/* Official app icon (Agentic_Office_ultra vscode/resources/darwin/code.icns) */}
      <Img src={staticFile('ui/logo.png')} style={{position: 'absolute', left: 960 - 110, top: 150, width: 220, height: 220, opacity: lp,
        filter: `blur(${(1 - lp) * 10}px) drop-shadow(0 30px 50px rgba(0,0,0,.35))`, transform: `translateY(${(1 - lp) * 30}px) scale(${0.85 + 0.15 * lp})`}} />
      <div style={{position: 'absolute', top: 400, left: 0, right: 0, textAlign: 'center', fontSize: 150, fontWeight: 700, letterSpacing: -5, color: C.ink}}>{word}</div>
    </>;
  };
  return (
    <Scene from={58.2} to={64.8}>
      <Stage dark /><Lockup />
      <Line center y={650} size={52} words={[{w: 'Your files.', at: 59.67}, {w: '·', at: 60.2, c: C.ice}, {w: 'Your team.', at: 60.29}, {w: '·', at: 60.85, c: C.ice}, {w: 'Your agents.', at: 60.92}]} out={61.6} />
      <Line center y={650} size={56} words={[{w: 'One workspace.', at: 61.86}, {w: 'You stay in control.', at: 62.9, c: C.ice}]} />
    </Scene>
  );
};
