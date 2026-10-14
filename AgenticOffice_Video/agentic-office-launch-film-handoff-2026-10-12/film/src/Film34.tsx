import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {At, FullVid, INOUT, Scene, k, useT} from './Film';
import {Grade, ICE, Night, Title, glow} from './Hook23';
import {Lens, Notif, UI} from './Hook32a';
import {Foot, Hook32h, Mail, SEND} from './Hook32';
import tdTrack from '../public/aotrack/lap_topdown.json';
import mkTrack from '../public/aotrack/lap_mockup.json';
import dkTrack from '../public/aotrack/lap_desk.json';

// V30: the V29 "Done." hook with more of her (pain inserts), then a new second half built only from real product UI:
// It finds → It fixes → You decide (the same slide 4 that slipped in the hook, caught) → she finally presses Send → dawn → tagline.
// Tail VO (audio/vo/v30): a1@49.9 a2@55.1 a3@57.0 a4@60.1 a5@64.6 a6@69.6 a7@75.2 a8@82.6. Total 85.1 s.
const FPS = 30;
const Tag: React.FC<{text: string; at: number; until: number}> = ({text, at, until}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 60, top: 1040, fontFamily: UI, fontSize: 18, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(200,225,230,.5)',
    opacity: k(t, [at, at + 0.4], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]))}}>{text}</div>;
};
const Chapter: React.FC<{text: string; at: number; until: number}> = ({text, at, until}) => {
  const t = useT(), o = k(t, [at, at + 0.35], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: 70, top: 56, padding: '14px 26px 16px', borderRadius: 18, background: 'rgba(6,12,15,.72)', backdropFilter: 'blur(10px)', fontFamily: UI, fontSize: 58, fontWeight: 800, letterSpacing: -1.5, color: '#fff', opacity: o,
    transform: `translateX(${(1 - o) * -30}px)`, textShadow: '0 4px 30px rgba(0,0,0,.7)'}}>{text}<div style={{height: 5, width: 120 * o, background: ICE, marginTop: 10, borderRadius: 3}} /></div>;
};
const Shot: React.FC<{src: string; w: number; h: number; x?: number; y?: number; clip?: string; o?: number}> = ({src, w, h, x = (1920 - w) / 2, y = (1080 - h) / 2, clip, o = 1}) =>
  <Img src={staticFile(src)} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 14, boxShadow: glow, clipPath: clip, opacity: o}} />;
const Pointer: React.FC<{x: number; y: number}> = ({x, y}) =>
  <svg width={44} height={56} viewBox="0 0 22 28" style={{position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.5))'}}>
    <path d="M1 1 L1 22 L6.5 17 L10 26 L13.5 24.5 L10 16 L17.5 16 Z" fill="#fff" stroke="#111" strokeWidth={1.4} /></svg>;

const Env: React.FC = () => <AbsoluteFill>
  <OffthreadVideo src={staticFile('aofoot/mixkit_24054.mp4')} startFrom={30} muted style={{width: 1920, height: 1080, objectFit: 'cover', filter: 'blur(26px) brightness(.38) saturate(.8)', transform: 'scale(1.15)'}} />
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(90,200,225,.10), rgba(0,0,0,.55) 100%)'}} /></AbsoluteFill>;

// ---------- 49.6–55.0 · "Meet Agentic Office. Your Word, Excel and PowerPoint, in one workspace." ----------
const Reveal = () => {
  const t = useT(), lo = 1, up = k(t, [49.8, 50.5], [0, 1], INOUT);
  const files: [string, number][] = [['ui/ws-word.png', -1], ['ui/excel-full.png', 0], ['ui/ws-deck.png', 1]];
  const join = k(t, [52.6, 53.6], [0, 1], INOUT);
  return <Scene from={49.6} to={55.0}>
    <AbsoluteFill style={{background: '#04080A'}} />
    <AbsoluteFill style={{background: 'radial-gradient(1000px 600px at 50% 45%, rgba(60,170,195,.22), transparent 70%)', opacity: lo}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 330 - 230 * up, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${(0.8 + 0.2 * lo) * (1 - 0.45 * up)})`, opacity: lo}}>
      <Img src={staticFile('ui/logo.png')} style={{width: 190, height: 190, filter: 'drop-shadow(0 0 60px rgba(90,200,225,.5))'}} />
      <div style={{fontFamily: UI, fontSize: 96, fontWeight: 800, color: '#fff', letterSpacing: -3, marginTop: 20}}>Agentic <span style={{color: ICE}}>Office</span></div></div>
    <AbsoluteFill style={{perspective: 2200}}>
      {files.map(([src, i], j) => { const p = k(t, [50.2 + j * 0.25, 50.8 + j * 0.25], [0, 1]);
        return <div key={src} style={{position: 'absolute', left: 560, top: 430, width: 800, height: 450, opacity: p,
          transform: `translateX(${i * 560 * (1 - join)}px) translateZ(${(i === 0 ? 0 : -260) * (1 - join) - (i ? 40 * join : 0)}px) rotateY(${-i * 18 * (1 - join)}deg) translateY(${(1 - p) * 60}px)`,
          zIndex: i === 0 ? 2 : 1}}><Shot src={src} w={800} h={450} x={0} y={0} /></div>; })}
    </AbsoluteFill>
    <Tag text="Product UI · real screenshots" at={51.9} until={54.8} /><Grade />
  </Scene>;
};
// ---------- 55.0–60.0 · "Tell it what changed. Once." "It finds every place that number lives." (real prompt, sped up) ----------
const Finds = () => {
  const t = useT(), z = k(t, [55.0, 57.8], [3.6, 3.3], INOUT) - k(t, [57.8, 58.6], [0, 1.3], INOUT);
  return <Scene from={55.0} to={60.0}>
    <Env />
    <Lens z={z} fx={k(t, [57.8, 58.6], [1650, 1500], INOUT)} fy={k(t, [57.8, 58.6], [830, 560], INOUT)}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', boxShadow: glow}}>
        <At at={55.0} dur={3.0}><FullVid src="clips/task3full.mp4" startFrom={4} rate={3} /></At>
        <At at={58.0} dur={2.0}><FullVid src="clips/task3full.mp4" startFrom={15} rate={6} /></At>
      </div>
    </Lens>
    <Chapter text="It finds." at={57.0} until={59.8} />
    <Tag text="Product UI · real recording · sped up" at={55.1} until={59.8} /><Grade />
  </Scene>;
};
// ---------- 60.0–64.4 · "And fixes each one, in place. Nothing regenerated." ----------
const Fixes = () => {
  const t = useT(), a = t < 62.2;
  return <Scene from={60.0} to={64.4}>
    <Env />
    {a ? <Lens z={k(t, [60.0, 62.2], [1.25, 1.75], INOUT)} fx={k(t, [60.0, 62.2], [960, 1180], INOUT)} fy={k(t, [60.0, 62.2], [540, 470], INOUT)}>
          <Shot src="ui/excel-bar.png" w={1258} h={334} />
          <div style={{position: 'absolute', left: 331 + 832, top: 373 + 8, width: 92, height: 24, border: `3px solid ${ICE}`, borderRadius: 6, opacity: k(t, [60.9, 61.2], [0, 1]), boxShadow: `0 0 20px ${ICE}`}} /></Lens>
      : <Lens z={k(t, [62.2, 64.4], [2.2, 2.6], INOUT)} fx={800} fy={500}><Shot src="ui/memo-tracked.png" w={1920} h={1080} x={0} y={0} clip="inset(300px 812px 300px 505px round 6px)" /></Lens>}
    <Chapter text="It fixes." at={60.6} until={64.2} />
    <Tag text="Product UI · real screenshots" at={60.1} until={64.2} /><Grade />
  </Scene>;
};
// ---------- 64.4–72.6 · "Every change is marked, in every file. You accept it, or reject it." "Even slide four." ----------
const Decide = () => {
  const t = useT(), list = t >= 66.6;
  const px = k(t, [64.6, 65.8], [1520, 1345], (x) => 1 - Math.pow(1 - x, 3)), py = k(t, [64.6, 65.8], [700, 393], (x) => 1 - Math.pow(1 - x, 3));
  const S = 2.2, LW = 284 * S, LH = 750 * S, LX = 960 - LW / 2, scroll = k(t, [67.4, 69.4], [140, -700], INOUT);
  const rowY = 545, ring = k(t, [69.5, 69.95], [0, 1], INOUT), hdr = k(t, [66.9, 67.3], [0, 1]);
  return <Scene from={64.4} to={72.6}>
    <Env />
    {!list ? <Lens z={2.0} fx={1440} fy={340}><div style={{position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', boxShadow: glow}}>
        <At at={64.4} dur={2.2}><FullVid src="clips/accept.mp4" startFrom={0.9} /></At></div></Lens>
      : <AbsoluteFill style={{transform: `translateY(${scroll}px)`}}>
          <Shot src="ui/reviewed.png" w={LW} h={LH} x={LX} y={0} />
          <div style={{position: 'absolute', left: LX + 8, top: 60 * S, width: LW - 16, height: 40 * S, borderRadius: 10, border: `3px solid ${ICE}`, opacity: hdr * (1 - k(t, [68.2, 68.6], [0, 1])), boxShadow: `0 0 24px ${ICE}`}} />
          <svg width="1920" height="1400" style={{position: 'absolute', inset: 0}}><ellipse cx={LX + LW / 2} cy={rowY * S} rx={LW / 2 + 40} ry={44} fill="none" stroke="#FF5A4E" strokeWidth={7}
            strokeDasharray={1500} strokeDashoffset={1500 * (1 - ring)} style={{filter: 'drop-shadow(0 0 14px rgba(255,90,78,.8))'}} /></svg>
        </AbsoluteFill>}
    {list && <div style={{position: 'absolute', right: 90, top: 440, width: 420, fontFamily: UI, color: '#fff', opacity: ring}}>
      <div style={{fontSize: 22, letterSpacing: 6, color: '#FF9A90', fontWeight: 700}}>THE SLIDE THAT SLIPPED</div>
      <div style={{fontSize: 52, fontWeight: 800, letterSpacing: -1.5, marginTop: 8}}>Slide 4.<br /><span style={{color: ICE}}>Caught.</span></div></div>}
    <Chapter text="You decide." at={65.0} until={72.3} />
    <Tag text="Product UI · real recording + screenshot" at={64.5} until={72.3} /><Grade />
  </Scene>;
};
// ---------- 72.6–79.0 · back at Send. This time she presses it. "Done. And this time, you know it." → dawn ----------
const Payoff = () => {
  const t = useT(), sent = t >= 75.0;
  return <Scene from={72.6} to={76.1}>
    <Night warm={0.3} />
    <Lens z={k(t, [72.6, 74.0], [1.2, 1.5], INOUT)} fx={k(t, [72.6, 74.0], [800, 420], INOUT)} fy={k(t, [72.6, 74.0], [640, 880], INOUT)}>
      <Mail cx={k(t, [72.7, 73.8], [700, SEND[0] + 34], INOUT)} cy={k(t, [72.7, 73.8], [620, SEND[1] - 6], INOUT)} pressGlow={sent ? 0 : k(t, [73.6, 73.95], [0, 1])} />
    </Lens>
    {sent && <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '26px 44px', borderRadius: 26, background: 'rgba(20,24,28,.92)', border: '1px solid rgba(255,255,255,.15)', fontFamily: UI,
        transform: `scale(${k(t, [75.0, 75.25], [0.85, 1])})`, opacity: k(t, [75.0, 75.2], [0, 1]), boxShadow: '0 40px 100px rgba(0,0,0,.6)'}}>
        <div style={{width: 64, height: 64, borderRadius: '50%', background: '#28C840', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 40, fontWeight: 800}}>✓</div>
        <div><div style={{fontSize: 44, fontWeight: 800, color: '#fff'}}>Sent</div><div style={{fontSize: 22, color: '#AAB'}}>Memo · model · deck · every change reviewed</div></div></div></AbsoluteFill>}
    <Grade />
  </Scene>;
};
const Dawn = () => {   // 76.1–79.0 · warm grade, no teal: the release
  const Inner = () => { const t = useT(), s = k(t, [76.1, 79.0], [1.04, 1.12], (x) => x);
    return <AbsoluteFill style={{background: '#000'}}><AbsoluteFill style={{transform: `scale(${s})`}}>
      <OffthreadVideo src={staticFile('aofoot/pexels_sunrise_window.mp4')} startFrom={Math.round(14 * FPS)} muted style={{width: 1920, height: 1080, objectFit: 'cover', filter: 'contrast(1.05) saturate(1.1)'}} /></AbsoluteFill>
      <AbsoluteFill style={{background: '#000', opacity: k(t, [76.1, 76.6], [0.6, 0])}} /></AbsoluteFill>; };
  return <Scene from={76.1} to={79.0}><Inner /><Grade /></Scene>;
};
// ---------- 79.0–85.1 · "AI said it was done." → "This time, it is." → Agentic Office ----------
const End = () => {
  const t = useT(), a = k(t, [79.3, 79.7], [0, 1]), strike = k(t, [80.3, 80.7], [0, 1], INOUT), b = k(t, [80.8, 81.2], [0, 1]), out = k(t, [82.2, 82.6], [0, 1]), lo = k(t, [82.5, 83.0], [0, 1]);
  return <Scene from={79.0} to={85.1}>
    <AbsoluteFill style={{background: '#04080A'}} />
    <AbsoluteFill style={{background: 'radial-gradient(1000px 600px at 50% 50%, rgba(60,170,195,.18), transparent 70%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: UI, opacity: 1 - out}}>
      <div style={{display: 'inline-block', position: 'relative', fontSize: 64, fontWeight: 700, color: '#8FA3A8', opacity: a}}>"AI said it was done."
        <div style={{position: 'absolute', left: -6, top: '52%', height: 5, width: `${strike * 104}%`, background: '#FF5A4E', borderRadius: 3}} /></div>
      <div style={{fontSize: 110, fontWeight: 800, color: '#fff', letterSpacing: -4, marginTop: 18, opacity: b, transform: `translateY(${(1 - b) * 20}px)`}}>This time, <span style={{color: ICE}}>you checked.</span></div></div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: UI, opacity: lo, transform: `scale(${0.94 + 0.06 * lo})`}}>
      <Img src={staticFile('ui/logo.png')} style={{width: 150, height: 150}} />
      <div style={{fontSize: 92, fontWeight: 800, color: '#fff', letterSpacing: -3, marginTop: 16}}>Agentic <span style={{color: ICE}}>Office</span></div>
      <div style={{fontSize: 34, color: '#fff', fontWeight: 700, marginTop: 12}}>Your workspace. Your team and their agents. <span style={{color: ICE}}>Your control.</span></div><div style={{fontSize: 22, color: '#9FB4B9', marginTop: 10}}>Real documents · Shared context · Reviewable work</div>
      <div style={{marginTop: 36, padding: '16px 40px', borderRadius: 40, background: ICE, color: '#04202A', fontSize: 28, fontWeight: 800, opacity: k(t, [83.2, 83.6], [0, 1])}}>Request early access</div></div>
    <Grade />
  </Scene>;
};

// 8.0–8.8 · ease the cut from the dark office into the white chat (no luma jump)
const Ease = () => { const t = useT(); return <AbsoluteFill style={{background: '#000', opacity: k(t, [8.0, 8.7], [0.75, 0])}} />; };
// 46.0–49.6 · the promise and the brand arrive together, then the Reveal continues from this exact frame
const Bridge = () => { const t = useT(), lo = k(t, [46.2, 46.9], [0, 1]), pr = k(t, [46.4, 46.9], [0, 1]) * (1 - k(t, [49.2, 49.6], [0, 1]));
  return <Scene from={46.0} to={49.6}>
    <AbsoluteFill style={{background: '#04080A'}} />
    <AbsoluteFill style={{background: 'radial-gradient(1000px 600px at 50% 45%, rgba(60,170,195,.22), transparent 70%)', opacity: lo}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${0.8 + 0.2 * lo})`, opacity: lo}}>
      <Img src={staticFile('ui/logo.png')} style={{width: 190, height: 190, filter: 'drop-shadow(0 0 60px rgba(90,200,225,.5))'}} />
      <div style={{fontFamily: UI, fontSize: 96, fontWeight: 800, color: '#fff', letterSpacing: -3, marginTop: 20}}>Agentic <span style={{color: ICE}}>Office</span></div></div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', fontFamily: UI, fontSize: 44, fontWeight: 700, color: '#D9E7EA', opacity: pr}}>
      See exactly what changed. <span style={{color: ICE}}>Decide what stays.</span></div>
    <Grade /></Scene>; };

// ---------- 72.6–82.6 · collaboration (real app, demo session with a simulated teammate) + your workspace ----------
const COL = 'Product UI · real recording · demo session, simulated teammate';
const Team = () => { const t = useT();
  return <Scene from={72.6} to={76.6}><Env />
    <Lens z={k(t, [72.6, 76.6], [2.2, 2.4])} fx={1520} fy={600}><div style={{position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', boxShadow: glow}}>
      <At at={72.6} dur={4.0}><FullVid src="clips/collab-take.mp4" startFrom={21.0} /></At></div></Lens>
    <Chapter text="Bring in your team." at={72.8} until={76.4} /><Tag text={COL} at={72.7} until={76.4} /><Grade /></Scene>; };
const Proposal = () => { const t = useT(), ring = k(t, [77.5, 77.9], [0, 1], INOUT);
  return <Scene from={76.6} to={79.4}><Env />
    <Lens z={2.4} fx={1520} fy={770}><div style={{position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', boxShadow: glow}}>
      <At at={76.6} dur={2.8}><FullVid src="clips/collab-take.mp4" startFrom={27.3} /></At></div>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}><ellipse cx={1657} cy={820} rx={120} ry={34} fill="none" stroke={ICE} strokeWidth={3}
        strokeDasharray={600} strokeDashoffset={600 * (1 - ring)} style={{filter: `drop-shadow(0 0 8px ${ICE})`}} /></svg></Lens>
    <Chapter text="Only a person says yes." at={76.8} until={79.2} /><Tag text={COL} at={76.7} until={79.2} /><Grade /></Scene>; };
const Local = () => { const t = useT(), o = k(t, [79.5, 80.0], [0, 1]), s = 2.4;
  return <Scene from={79.4} to={82.6}><Env />
    <div style={{position: 'absolute', left: 330, top: 130 + (1 - o) * 30, opacity: o}}><Img src={staticFile('ui/filetree.png')} style={{width: 286 * 1.05, height: 842 * 1.05, borderRadius: 14, boxShadow: glow}} /></div>
    <div style={{position: 'absolute', left: 760, top: 330, fontFamily: UI, color: '#fff', opacity: k(t, [79.8, 80.3], [0, 1])}}>
      <div style={{fontSize: 84, fontWeight: 800, letterSpacing: -2.5}}>Your workspace.</div>
      <div style={{fontSize: 44, fontWeight: 700, color: ICE, marginTop: 8}}>Your files, stored on your device.</div>
      <div style={{width: 274 * s, height: 26 * s, overflow: 'hidden', position: 'relative', marginTop: 40, borderRadius: 10, boxShadow: glow, opacity: k(t, [80.4, 80.8], [0, 1])}}>
        <Img src={staticFile('ui/memo-tracked.png')} style={{position: 'absolute', width: 1920 * s, height: 1080 * s, left: -1636 * s, top: -1026 * s}} /></div>
      <div style={{fontSize: 22, color: '#9FB4B9', marginTop: 22}}>Cloud AI may process document content.</div></div>
    <Tag text="Product UI · real screenshots" at={79.5} until={82.4} /><Grade /></Scene>; };

const _Film33: React.FC = () => <AbsoluteFill style={{background: '#000'}}>
  <Hook32h />
  <Scene from={8.0} to={8.8}><Ease /></Scene>
  <Bridge />
  {/* more of her: the pain inserts over the V29 hook */}
  <Foot src="pexels_typing_dark_a" from={24.15} to={24.85} ss={3} z={[1.1, 1.16]} />
  <Scene from={29.85} to={31.25}><Notif title="Partner" at={28.4} until={30.95} body={<>The deck still says €71–73m. The model says <b style={{color: '#fff'}}>€74.6m</b>. Fix slide 2.</>} /></Scene>
  <Foot src="mixkit_23717" from={31.05} to={31.8} ss={11.2} z={[1.2, 1.28]} fx={1250} fy={400} />
  <Foot src="mixkit_24054" from={36.75} to={37.4} ss={6.0} z={[1.15, 1.22]} fx={1000} fy={520} />
  <Reveal /><Finds /><Fixes /><Decide />
  <Team /><Proposal /><Local />
  <Sequence from={300} layout="none"><Payoff />
  <Foot src="pexels_mouse_click" from={74.0} to={75.0} ss={3.4} z={[1.05, 1.1]} />
  <Dawn /><End /></Sequence>
</AbsoluteFill>;

// =====================================================================================================
// V34 post-reveal (46 → 145 s): one evolving task, real product UI, and real UI placed ON real laptops
// (screen corners tracked per frame with OpenCV: brief/track_screen.py → public/aotrack/*.json).
// =====================================================================================================
type Q = number[][];
const solve = (A: number[][], b: number[]) => { const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let i = 0; i < n; i++) { let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r; [M[i], M[p]] = [M[p], M[i]];
    for (let r = 0; r < n; r++) { if (r === i) continue; const q = M[r][i] / M[i][i]; for (let c = i; c <= n; c++) M[r][c] -= q * M[i][c]; } }
  return M.map((r, i) => r[n] / r[i]); };
const m3d = (w: number, h: number, q: Q) => { const s = [[0, 0], [w, 0], [w, h], [0, h]], A: number[][] = [], b: number[] = [];
  for (let i = 0; i < 4; i++) { const [x, y] = s[i], [u, v] = q[i]; A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u); A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v); }
  const [a, bb, c, d, e, ff, g, hh] = solve(A, b); return `matrix3d(${a},${d},0,${g},${bb},${e},0,${hh},0,0,1,0,${c},${ff},0,1)`; };
// A real laptop plate with our content mapped onto its tracked screen. `ss` = plate start time; content is a 1920×1080 layer.
const OnScreen: React.FC<{plate: string; track: {frames: Q[]; w: number}; ss: number; from: number; children: React.ReactNode; dim?: number}> = ({plate, track, ss, from, children, dim = 0}) => {
  const f = useCurrentFrame(), i = Math.min(track.frames.length - 1, Math.round(ss * 30) + f), sc = 1920 / track.w, r = track.frames[i].map(([x, y]) => [x * sc, y * sc]), cx = r.reduce((s, p) => s + p[0], 0) / 4, cy = r.reduce((s, p) => s + p[1], 0) / 4,
    q = r.map(([x, y]) => [cx + (x - cx) * 1.015, cy + (y - cy) * 1.02]);
  return <AbsoluteFill style={{background: '#000'}}>
    <OffthreadVideo src={staticFile(`aofoot/${plate}.mp4`)} startFrom={Math.round(ss * 30)} muted style={{width: 1920, height: 1080}} />
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: m3d(1920, 1080, q), overflow: 'hidden', background: '#111'}}>
      {children}<AbsoluteFill style={{background: `rgba(0,0,0,${0.08 + dim})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(125deg, rgba(255,255,255,.07), transparent 40%)'}} /></div>
  </AbsoluteFill>;
};
const Full: React.FC<{src: string}> = ({src}) => <Img src={staticFile(src)} style={{position: 'absolute', width: 1920, height: 1080}} />;
const Caption: React.FC<{text: React.ReactNode; at: number; until: number; y?: number}> = ({text, at, until, y = 900}) => {
  const t = useT(), o = k(t, [at, at + 0.35], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${(1 - o) * 14}px)`}}>
    <div style={{padding: '14px 30px 16px', borderRadius: 18, background: 'rgba(6,12,15,.74)', backdropFilter: 'blur(10px)', fontFamily: UI, fontSize: 52, fontWeight: 800, letterSpacing: -1.4, color: '#fff'}}>{text}</div></div>;
};
const Hi2: React.FC<{c: string}> = ({c}) => <span style={{color: ICE}}>{c}</span>;
const Chip: React.FC<{x: number; y: number; s?: number; o?: number}> = ({x, y, s = 1, o = 1}) =>
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, opacity: o, padding: '14px 30px', borderRadius: 40, background: 'rgba(10,30,36,.9)',
    border: `2px solid ${ICE}`, color: '#fff', fontFamily: UI, fontSize: 54, fontWeight: 800, letterSpacing: -1, boxShadow: `0 0 50px rgba(127,227,242,.55)`}}>€74.6m</div>;
const Win: React.FC<{children: React.ReactNode}> = ({children}) => <div style={{position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', boxShadow: glow}}>{children}</div>;

// 49.0–54.4 · "Not another chatbot. Your workspace: Word, Excel and PowerPoint, together."
const R1 = () => { const t = useT(), z = k(t, [51.6, 52.6], [1, 2.7], INOUT);
  return <Scene from={49.0} to={54.4}>
    {t < 52.6 ? <Lens z={z} fx={k(t, [51.6, 52.6], [960, 664], INOUT)} fy={k(t, [51.6, 52.6], [540, 372], INOUT)}>
        <Sequence from={0} layout="none"><OnScreen plate="pexels_lap_mockup" track={mkTrack} ss={2.0} from={49.0}><Full src="ui/ws-word.png" /></OnScreen></Sequence></Lens>
      : <Lens z={k(t, [52.6, 54.4], [1.06, 1.16])} fx={k(t, [52.6, 54.4], [900, 1100])} fy={300}><Full src="ui/ws-word.png" /></Lens>}
    <Caption text={<>Not another chatbot. <Hi2 c="Your workspace." /></>} at={49.6} until={54.1} />
    <Tag text="Real laptop footage · product UI: real screenshot" at={49.1} until={54.2} /><Grade /></Scene>; };
// 54.4–58.4 · templates (real screenshot; crop excludes the side panel's temp path / model label)
const R2 = () => { const t = useT();
  return <Scene from={54.4} to={58.4}><Env />
    <Lens z={k(t, [54.4, 58.4], [1.5, 1.75], INOUT)} fx={k(t, [54.4, 58.4], [960, 1010], INOUT)} fy={k(t, [54.4, 58.4], [560, 520], INOUT)}>
      <Img src={staticFile('ui_new/create_new_templates.png')} style={{position: 'absolute', left: 160, top: 90, width: 1600, height: 939, borderRadius: 16, boxShadow: glow, clipPath: 'inset(0 300px 0 330px round 16px)'}} /></Lens>
    <Caption text={<>Templates, or <Hi2 c="a sentence." /></>} at={54.6} until={58.1} />
    <Tag text="Product UI · real screenshot" at={54.5} until={58.2} /><Grade /></Scene>; };
// 58.4–67.4 · "Tell it what changed, once. It finds where that number lives…" (hands on a real laptop → the real prompt → reading files)
const R3 = () => { const t = useT();
  return <Scene from={58.4} to={67.4}>
    {t < 61.4 ? <OnScreen plate="pexels_lap_topdown" track={tdTrack} ss={1.0} from={58.4}><At at={58.4} dur={3.0}><FullVid src="clips/task3full.mp4" startFrom={4} rate={3} /></At></OnScreen>
      : t < 64.4 ? <AbsoluteFill><Env /><Lens z={3.4} fx={1650} fy={830}><Win><At at={61.4} dur={3.0}><FullVid src="clips/task3full.mp4" startFrom={13} rate={1.2} /></At></Win></Lens></AbsoluteFill>
      : <AbsoluteFill><Env /><Lens z={2.2} fx={1490} fy={560}><Win><At at={64.4} dur={3.0}><FullVid src="clips/task3full.mp4" startFrom={15} rate={4} /></At></Win></Lens></AbsoluteFill>}
    <Caption text={<>The context is <Hi2 c="already here." /></>} at={64.6} until={67.1} y={920} />
    <Tag text="Real laptop footage · product UI: real recording, sped up" at={58.5} until={67.2} /><Grade /></Scene>; };
// 67.4–78.0 · assistants plan, check and hand off; the validated €74.6m travels (real plan + real Room handoff)
const R4 = () => { const t = useT(), lift = k(t, [74.6, 75.4], [0, 1], INOUT), fly = k(t, [76.2, 77.8], [0, 1], INOUT);
  return <Scene from={67.4} to={78.0}><Env />
    {t < 71.4 ? <Lens z={2.3} fx={1500} fy={600}><Win><At at={67.4} dur={4.0}><FullVid src="clips/task3full.mp4" startFrom={22} rate={4} /></At></Win></Lens>
      : <Lens z={2.6} fx={1551} fy={800}><Win><At at={71.4} dur={6.6}><FullVid src="clips/collab-take.mp4" startFrom={25.6} rate={0.25} /></At></Win></Lens>}
    {t >= 74.6 && <Chip x={k(t, [74.6, 75.4], [1280, 960], INOUT) + 700 * fly} y={k(t, [74.6, 75.4], [760, 520], INOUT)} s={0.7 + 0.5 * lift} o={1 - k(t, [77.4, 77.8], [0, 1])} />}
    <Caption text={<>One request. <Hi2 c="A team of assistants." /></>} at={67.7} until={74.4} y={920} />
    <Tag text="Product UI · real recording · sped up · Room: demo session, simulated teammate" at={67.5} until={77.8} /><Grade /></Scene>; };
// 78.0–91.0 · "No regenerating…" split: the chatbot's whole-deck regeneration (illustration) vs real targeted edits
const R5 = () => { const t = useT(), p = k(t, [78.2, 90.8], [0.03, 0.31], (x) => x);
  const right = t < 82.2 ? 'xl' : t < 86.2 ? 'memo' : 'ppt';
  return <Scene from={78.0} to={91.0}><Env />
    <div style={{position: 'absolute', left: 70, top: 230, width: 640, padding: 30, borderRadius: 20, background: '#fff', fontFamily: UI, boxShadow: glow, opacity: 0.92}}>
      <div style={{fontSize: 18, letterSpacing: 4, color: '#A33', fontWeight: 800, marginBottom: 14}}>THE CHATBOT</div>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, fontWeight: 700, color: '#111'}}><span>Regenerating all 12 slides…</span><span style={{color: '#C8463D'}}>{Math.round(p * 100)}%</span></div>
      <div style={{height: 12, borderRadius: 6, background: '#EEE', marginTop: 16, overflow: 'hidden'}}><div style={{height: '100%', width: `${p * 100}%`, background: '#111'}} /></div>
      <div style={{fontSize: 20, color: '#888', marginTop: 14}}>…to change one number</div></div>
    <div style={{position: 'absolute', left: 70, top: 470, fontFamily: UI, fontSize: 16, letterSpacing: 3, color: 'rgba(200,225,230,.5)', fontWeight: 700}}>ILLUSTRATION</div>
    <div style={{position: 'absolute', left: 770, top: 120, width: 1080, height: 720, borderRadius: 18, overflow: 'hidden', boxShadow: glow, background: '#0D1114'}}>
      <div style={{position: 'absolute', left: 20, top: 14, zIndex: 2, fontFamily: UI, fontSize: 18, letterSpacing: 4, color: ICE, fontWeight: 800}}>AGENTIC OFFICE · {right === 'xl' ? 'ONE CELL' : right === 'memo' ? 'ONE SENTENCE' : 'ONE SLIDE ELEMENT'}</div>
      {right === 'xl' && <Img src={staticFile('ui/excel-bar.png')} style={{position: 'absolute', left: -40, top: 140, width: 1258 * 1.35, height: 334 * 1.35}} />}
      {right === 'memo' && <Img src={staticFile('ui/memo-tracked.png')} style={{position: 'absolute', left: -505 * 1.75 + 30, top: -420 * 1.75 + 60, width: 1920 * 1.75, height: 1080 * 1.75, clipPath: 'inset(0 1420px 0 0)'}} />}
      {right === 'ppt' && <Img src={staticFile('ui_new/pptx_diff_new_elements.png')} style={{position: 'absolute', left: -400 * 1.25 + 30, top: -255 * 1.25 + 50, width: 1600 * 1.25, height: 954 * 1.25, clipPath: 'inset(255px 390px 230px 400px)'}} />}
    </div>
    <Caption text={<>Change what matters. <Hi2 c="Keep everything else." /></>} at={84.4} until={90.7} />
    <Tag text="Right: product UI · real screenshots" at={78.1} until={90.8} /><Grade /></Scene>; };
// 91.0–104.0 · hero review: real Accept-all recording → the reviewed list, slide 4 caught (slow)
const R6 = () => { const t = useT(), list = t >= 94.1, S = 2.2, LW = 284 * S, LH = 750 * S, LX = 960 - LW / 2;
  const scroll = k(t, [94.6, 96.4], [140, -700], INOUT), ring = k(t, [95.6, 96.1], [0, 1], INOUT);
  return <Scene from={91.0} to={104.0}><Env />
    {!list ? <Lens z={2.0} fx={1440} fy={340}><Win><At at={91.0} dur={3.1}><FullVid src="clips/accept.mp4" startFrom={0.9} /></At></Win></Lens>
      : <AbsoluteFill style={{transform: `translateY(${scroll}px) scale(${k(t, [96.4, 104], [1, 1.04])})`}}>
          <Img src={staticFile('ui/reviewed.png')} style={{position: 'absolute', left: LX, top: 0, width: LW, height: LH, borderRadius: 14, boxShadow: glow}} />
          <svg width="1920" height="1700" style={{position: 'absolute', inset: 0}}><ellipse cx={LX + LW / 2} cy={548 * S} rx={LW / 2 + 40} ry={44} fill="none" stroke="#FF5A4E" strokeWidth={7}
            strokeDasharray={1500} strokeDashoffset={1500 * (1 - ring)} style={{filter: 'drop-shadow(0 0 14px rgba(255,90,78,.8))'}} /></svg></AbsoluteFill>}
    {list && <div style={{position: 'absolute', right: 90, top: 440, width: 420, fontFamily: UI, color: '#fff', opacity: ring}}>
      <div style={{fontSize: 22, letterSpacing: 6, color: '#FF9A90', fontWeight: 700}}>THE SLIDE THAT SLIPPED</div>
      <div style={{fontSize: 52, fontWeight: 800, letterSpacing: -1.5, marginTop: 8}}>Slide 4.<br /><span style={{color: ICE}}>Caught.</span></div></div>}
    <Caption text={<>See every change. <Hi2 c="Choose what stays." /></>} at={97.0} until={103.7} y={940} />
    <Tag text="Product UI · real recording + screenshot" at={91.1} until={103.8} /><Grade /></Scene>; };
// 110.8–115.0 · the Room thread: the assistant's handoff, with €74.6m (real, demo session)
const R7b = () => { const t = useT();
  return <Scene from={110.8} to={115.0}><Env />
    <Lens z={2.6} fx={1551} fy={800}><Win><At at={110.8} dur={4.2}><FullVid src="clips/collab-take.mp4" startFrom={31.0} /></At></Win></Lens>
    <Caption text={<>Your team. <Hi2 c="Their agents." /> One workspace.</>} at={111.0} until={114.8} y={940} />
    <Tag text="Product UI · real recording · demo session, simulated teammate" at={110.9} until={114.8} /><Grade /></Scene>; };
// 115.0–123.0 · real Evidence panel ("Confidence: high", per-file evidence)
const R8 = () => { const t = useT();
  return <Scene from={115.0} to={123.0}><Env />
    <Lens z={k(t, [115, 123], [2.2, 2.45])} fx={1500} fy={k(t, [115, 123], [480, 520])}><Win><At at={115.0} dur={8.0}><FullVid src="clips/demo-full.mp4" startFrom={92.0} rate={0.6} /></At></Win></Lens>
    <Caption text={<>Evidence for <Hi2 c="every change." /></>} at={115.3} until={122.7} y={940} />
    <Tag text="Product UI · real recording" at={115.1} until={122.8} /><Grade /></Scene>; };
// 130.0–136.1 · payoff on a real laptop: the cold-open email, now 74.6 = 74.6 → click → the lights come on → Sent
const R10 = () => { const t = useT(), sent = t >= 131.6, eq = k(t, [130.1, 130.4], [0, 1]) * (1 - k(t, [130.9, 131.0], [0, 1]));
  const mail = (s: boolean) => <AbsoluteFill style={{background: '#202124'}}><div style={{position: 'absolute', inset: 0, transform: 'scale(1.06)', transformOrigin: '0 0'}}>
    <Mail cx={SEND[0] + 34} cy={SEND[1] - 6} pressGlow={s ? 0 : 0.6} /></div>
    {s && <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: 30, padding: '40px 64px', borderRadius: 34, background: 'rgba(20,24,28,.95)', fontFamily: UI}}>
      <div style={{width: 110, height: 110, borderRadius: '50%', background: '#28C840', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 70, fontWeight: 800}}>✓</div>
      <div><div style={{fontSize: 80, fontWeight: 800, color: '#fff'}}>Sent</div><div style={{fontSize: 34, color: '#AAB'}}>Memo · model · deck · every change reviewed</div></div></div></AbsoluteFill>}</AbsoluteFill>;
  return <Scene from={130.0} to={136.1}>
    {!sent ? <Sequence from={0} layout="none"><OnScreen plate="pexels_lap_desk" track={dkTrack} ss={0} from={130.0} dim={0.1}>{mail(false)}</OnScreen></Sequence>
      : <Sequence from={48} layout="none"><OnScreen plate="pexels_lap_desk" track={dkTrack} ss={1.6} from={131.6}>{mail(true)}</OnScreen></Sequence>}
    {!sent && <div style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, opacity: eq, fontFamily: UI}}>
      {['FY26_Model.xlsx', 'Board_Presentation.pptx · Slide 4'].map((n, i) => <React.Fragment key={n}>{i === 1 && <div style={{fontSize: 110, fontWeight: 800, color: '#3DDC84', textShadow: '0 0 40px rgba(61,220,132,.6)'}}>=</div>}
        <div style={{padding: '20px 30px', borderRadius: 20, background: 'rgba(20,24,28,.92)', border: '2px solid #3DDC84', color: '#fff'}}><div style={{fontSize: 20, color: '#AAB'}}>{n}</div><div style={{fontSize: 64, fontWeight: 800}}>€74.6m</div></div></React.Fragment>)}</div>}
    <Tag text="Real laptop footage · email: illustration" at={130.1} until={135.9} /><Grade /></Scene>; };

export const Film34: React.FC = () => <AbsoluteFill style={{background: '#000'}}>
  <Hook32h />
  <Scene from={8.0} to={8.8}><Ease /></Scene>
  <Bridge />
  <Foot src="pexels_typing_dark_a" from={24.15} to={24.85} ss={3} z={[1.1, 1.16]} />
  <Scene from={29.85} to={31.25}><Notif title="Partner" at={28.4} until={30.95} body={<>The deck still says €71–73m. The model says <b style={{color: '#fff'}}>€74.6m</b>. Fix slide 2.</>} /></Scene>
  <Foot src="mixkit_23717" from={31.05} to={31.8} ss={11.2} z={[1.2, 1.28]} fx={1250} fy={400} />
  <Foot src="mixkit_24054" from={36.75} to={37.4} ss={6.0} z={[1.15, 1.22]} fx={1000} fy={520} />
  <R1 /><R2 /><R3 /><R4 /><R5 /><R6 />
  <Sequence from={Math.round((104 - 72.6) * 30)} layout="none"><Team /><Proposal /></Sequence>
  <R7b /><R8 />
  <Sequence from={Math.round((123 - 79.4) * 30)} layout="none"><Local /></Sequence>
  <Scene from={126.2} to={130.0}><Env /><Lens z={1.0} fx={960} fy={540}><Img src={staticFile('ui/filetree.png')} style={{position: 'absolute', left: 820, top: 119, width: 286, height: 842, borderRadius: 14, boxShadow: glow}} /></Lens>
    <Caption text={<>Built around <Hi2 c="your local workspace." /></>} at={126.3} until={129.8} y={940} /><Grade /></Scene>
  <R10 />
  <Foot src="pexels_mouse_click" from={131.0} to={131.6} ss={3.6} z={[1.05, 1.08]} />
  <Sequence from={Math.round(60.0 * 30)} layout="none"><Dawn /><End /></Sequence>
</AbsoluteFill>;
