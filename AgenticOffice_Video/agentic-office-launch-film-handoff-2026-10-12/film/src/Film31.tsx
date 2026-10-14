import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile} from 'remotion';
import {At, FullVid, INOUT, Scene, k, useT} from './Film';
import {Grade, ICE, Night, Title, glow} from './Hook23';
import {Lens, Notif, UI} from './Hook31a';
import {Foot, Hook31h, Mail, SEND} from './Hook31';

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
  return <div style={{position: 'absolute', left: 90, top: 70, fontFamily: UI, fontSize: 58, fontWeight: 800, letterSpacing: -1.5, color: '#fff', opacity: o,
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
  const t = useT(), lo = k(t, [49.9, 50.5], [0, 1]), up = k(t, [51.5, 52.2], [0, 1], INOUT);
  const files: [string, number][] = [['ui/ws-word.png', -1], ['ui/excel-full.png', 0], ['ui/ws-deck.png', 1]];
  const join = k(t, [53.4, 54.4], [0, 1], INOUT);
  return <Scene from={49.6} to={55.0}>
    <AbsoluteFill style={{background: '#04080A'}} />
    <AbsoluteFill style={{background: 'radial-gradient(1000px 600px at 50% 45%, rgba(60,170,195,.22), transparent 70%)', opacity: lo}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 330 - 230 * up, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${(0.8 + 0.2 * lo) * (1 - 0.45 * up)})`, opacity: lo}}>
      <Img src={staticFile('ui/logo.png')} style={{width: 190, height: 190, filter: 'drop-shadow(0 0 60px rgba(90,200,225,.5))'}} />
      <div style={{fontFamily: UI, fontSize: 96, fontWeight: 800, color: '#fff', letterSpacing: -3, marginTop: 20}}>Agentic <span style={{color: ICE}}>Office</span></div></div>
    <AbsoluteFill style={{perspective: 2200}}>
      {files.map(([src, i], j) => { const p = k(t, [51.8 + j * 0.25, 52.4 + j * 0.25], [0, 1]);
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
    {!list ? <Lens z={2.4} fx={1120} fy={392}>
        <Shot src="ui/excel-bar.png" w={1258} h={334} />
        <Pointer x={px} y={py} />
        <div style={{position: 'absolute', left: 331 + 990, top: 373 + 8, width: 66, height: 24, borderRadius: 6, boxShadow: `0 0 ${24 * k(t, [65.8, 66.1], [0, 1])}px rgba(40,200,64,.9)`}} /></Lens>
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
    <Tag text="Product UI · real screenshots" at={64.5} until={72.3} /><Grade />
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
      <div style={{fontSize: 30, color: '#AFC3C8', marginTop: 10}}>See exactly what changed. Decide what stays.</div>
      <div style={{marginTop: 36, padding: '16px 40px', borderRadius: 40, background: ICE, color: '#04202A', fontSize: 28, fontWeight: 800, opacity: k(t, [83.2, 83.6], [0, 1])}}>Request early access</div></div>
    <Grade />
  </Scene>;
};

export const Film31: React.FC = () => <AbsoluteFill style={{background: '#000'}}>
  <Hook31h />
  {/* more of her: the pain inserts over the V29 hook */}
  <Foot src="pexels_typing_dark_a" from={24.15} to={24.85} ss={3} z={[1.1, 1.16]} />
  <Scene from={29.85} to={31.0}><Notif title="Partner" at={28.4} until={30.7} body={<>Revenue is now <b style={{color: '#fff'}}>€74.6m</b>, not €71–73m. Fix slide 2.</>} /></Scene>
  <Foot src="mixkit_23717" from={31.05} to={31.8} ss={11.2} z={[1.2, 1.28]} fx={1250} fy={400} />
  <Foot src="mixkit_24054" from={36.75} to={37.4} ss={6.0} z={[1.15, 1.22]} fx={1000} fy={520} />
  <Reveal /><Finds /><Fixes /><Decide /><Payoff />
  <Foot src="pexels_mouse_click" from={74.0} to={75.0} ss={3.4} z={[1.05, 1.1]} />
  <Dawn /><End />
</AbsoluteFill>;
