import React, {useState} from 'react';
import {AbsoluteFill, Img, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {At, C, Cam, Chip, EX_ZOOM, FullImg, FullVid, INOUT, LIGHT, Line, Scene, Stage, Tag, k, useT} from './Film';
import {Hook} from './Hook23';
import {Ask, BIG, Bridge, Cap, Card, ModelLabel, Pill} from './Film21';

// V22: the team's 23-second opening (false promise → real work → turning point), then the V21e real app flow,
// then a callback close and the line "AI that works with your work. Not against it." Times are absolute seconds (../../v22/vo).
// Opening visuals are illustrations (generic AI chat, typeset documents); the app section is the real recording.
const SERIF = 'Georgia, "Times New Roman", serif';
const shadow = '0 40px 90px rgba(16,38,45,.18), 0 0 0 1px rgba(16,38,45,.08)';
const Bar: React.FC<{title: string; c: string}> = ({title, c}) =>
  <div style={{height: 54, display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: '1px solid #E3EAEB', fontSize: 22, fontWeight: 700, color: C.ink}}>
    {['#FF5F57', '#FEBC2E', '#28C840'].map((d) => <div key={d} style={{width: 13, height: 13, borderRadius: '50%', background: d}} />)}
    <div style={{width: 22, height: 22, borderRadius: 5, background: c, marginLeft: 10}} />{title}</div>;
const Note: React.FC<{text: string; x: number; y: number; at: number; until: number}> = ({text, x, y, at, until}) => {
  const t = useT(), o = k(t, [at, at + 0.25], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1]));
  return <div style={{position: 'absolute', left: x, top: y, padding: '8px 16px', borderRadius: 10, background: C.red, color: '#fff', fontSize: 24, fontWeight: 700,
    opacity: o, transform: `scale(${0.8 + 0.2 * o})`, boxShadow: '0 12px 30px rgba(200,70,61,.35)'}}>{text}</div>;
};

// ---------- 0–8 · The false promise ----------
const Promise1 = () => {
  const Chat = () => {
    const t = useT(), o = k(t, [0.1, 0.5], [0, 1]), back = k(t, [5.9, 6.4], [0, 1], INOUT);
    const u = k(t, [0.5, 0.9], [0, 1]), dots = t > 2.3 && t < 2.85, r = k(t, [2.85, 3.3], [0, 1]), chip = k(t, [3.6, 3.9], [0, 1]);
    return <div style={{position: 'absolute', left: 410, top: 110, width: 1100, height: 700, borderRadius: 26, background: '#fff', boxShadow: shadow, overflow: 'hidden',
      opacity: o * (1 - 0.6 * back), transform: `scale(${1 - 0.08 * back})`, filter: `blur(${back * 4}px)`}}>
      <div style={{height: 70, display: 'flex', alignItems: 'center', gap: 14, padding: '0 30px', borderBottom: '1px solid #E3EAEB', fontSize: 26, fontWeight: 700, color: C.ink}}>
        <div style={{width: 32, height: 32, borderRadius: '50%', background: '#B9C7CA'}} />AI chat</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, padding: 32}}>
        <div style={{alignSelf: 'flex-end', maxWidth: 640, padding: '18px 26px', borderRadius: 22, background: C.teal, color: '#fff', fontSize: 30, opacity: u}}>
          Update the supply agreement with the new payment terms.</div>
        {dots && <div style={{alignSelf: 'flex-start', padding: '16px 26px', borderRadius: 22, background: '#F0F4F4', fontSize: 30}}>• • •</div>}
        <div style={{alignSelf: 'flex-start', maxWidth: 820, padding: '22px 28px', borderRadius: 22, background: '#F0F4F4', color: C.ink, fontSize: 29, lineHeight: 1.45, opacity: r}}>
          <b>Here's your revised agreement ✓</b><br />• Payment terms updated to 45 days<br />• Clause 7 revised<br />• Formatting preserved
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 18, padding: '12px 18px', borderRadius: 14, background: '#fff', border: '1px solid #DCE6E8',
            fontSize: 26, fontWeight: 700, opacity: chip}}><div style={{width: 26, height: 26, borderRadius: 6, background: C.word}} />Supply_Agreement_v8.docx</div>
        </div>
      </div>
    </div>;
  };
  // the file they open: template gone, numbering wrong, table shifted
  const Doc = () => {
    const t = useT(), o = k(t, [6.0, 6.45], [0, 1]), fix = k(t, [8.2, 9.0], [0, 1]), s = 1 - 0.18 * fix;
    return <div style={{position: 'absolute', left: 460 - 300 * fix, top: 90 + 40 * fix, width: 1000, height: 860, borderRadius: 22, background: '#fff', boxShadow: shadow, overflow: 'hidden',
      opacity: o, transform: `scale(${(0.6 + 0.4 * o) * s})`, transformOrigin: '50% 30%'}}>
      <Bar title="Supply_Agreement_v8.docx" c={C.word} />
      <div style={{padding: '30px 60px', fontFamily: SERIF, color: C.ink}}>
        <div style={{height: 70, border: '3px dashed #D9A7A2', borderRadius: 10, display: 'grid', placeItems: 'center', color: '#B98580', fontSize: 22, fontFamily: 'Inter', marginBottom: 26}}>
          [ company letterhead ]</div>
        <div style={{fontSize: 38, fontWeight: 700, marginBottom: 18}}>SUPPLY AGREEMENT</div>
        {[['1.', 'Definitions'], ['2.', 'Term'], [t > 9.0 ? '3.' : '2.', 'Payment'], ['5.', 'Liability']].map(([n, h], i) =>
          <div key={i} style={{fontSize: 28, marginBottom: 10}}><span style={{color: (i === 2 && t <= 9.0) || i === 3 ? C.red : C.ink, fontWeight: 700}}>{n}</span> {h}</div>)}
        <div style={{marginTop: 20, fontSize: 22, fontFamily: 'Inter'}}>
          {[['Milestone', 'Amount', 'Due'], ['Delivery', '€240,000', '45 days'], ['Acceptance', '€160,000', '30 days']].map((r, i) =>
            <div key={i} style={{display: 'flex', borderBottom: '1px solid #DCE6E8', transform: `translateX(${i * 46}px) rotate(${i ? 1.2 : 0}deg)`}}>
              {r.map((v, j) => <div key={j} style={{width: 220, padding: '10px 12px', fontWeight: i ? 400 : 700, background: i ? 'transparent' : '#EEF3F3'}}>{v}</div>)}</div>)}
        </div>
      </div>
    </div>;
  };
  return (
    <Scene from={0} to={8.3}>
      <Stage /><Chat />
      <Card text="AI said it was *done.*" at={4.9} until={6.0} />
      <Doc />
      <Note text="Template gone" x={1190} y={150} at={7.2} until={8.2} />
      <Note text="Numbering wrong" x={1190} y={420} at={7.4} until={8.2} />
      <Note text="Table shifted" x={1190} y={640} at={7.6} until={8.2} />
      <Tag x={60} y={1046} at={0.3} until={8.0}>Illustration</Tag>
    </Scene>
  );
};

// ---------- 8–19.4 · The real work: fixing by hand, the email, five tabs, copy-paste ----------
const TABS: [string, string][] = [['Supply_Agreement_v8.docx', C.word], ['Financial_Annexure.xlsx', C.excel], ['Board_Presentation.pptx', C.ppt], ['AI chat', '#9AAEB2'], ['Browser · sources', '#5B7279']];
const Work = () => {
  const Doc = () => {   // the same broken document, now small on the left, being fixed by hand
    const t = useT(), o = 1 - k(t, [18.0, 18.3], [0, 1]);
    return <div style={{position: 'absolute', left: 120, top: 230, width: 680, height: 600, borderRadius: 20, background: '#fff', boxShadow: shadow, overflow: 'hidden', opacity: o}}>
      <Bar title="Supply_Agreement_v8.docx" c={C.word} />
      <div style={{padding: '24px 40px', fontFamily: SERIF, color: C.ink}}>
        <div style={{fontSize: 30, fontWeight: 700, marginBottom: 14}}>SUPPLY AGREEMENT</div>
        {['1. Definitions', '2. Term', '3. Payment', `${t > 10.6 ? '4.' : '5.'} Liability`].map((l, i) => <div key={i} style={{fontSize: 24, marginBottom: 8}}>{l}</div>)}
        {[96, 88, 92, 70, 84].map((w, i) => <div key={i} style={{height: 10, width: `${w}%`, background: '#E3EAEB', borderRadius: 5, margin: '14px 0'}} />)}
        {t > 9.2 && t < 11.2 && <div style={{position: 'absolute', left: 64, top: 268, width: 3, height: 28, background: C.ink, opacity: Math.round(t * 3) % 2}} />}
      </div>
    </div>;
  };
  const Email = () => {
    const t = useT(), o = k(t, [9.8, 10.2], [0, 1]) * (1 - k(t, [12.0, 12.4], [0, 1]));
    return <div style={{position: 'absolute', left: 860, top: 120 + (1 - o) * -60, width: 940, padding: '28px 34px', borderRadius: 28, background: 'rgba(255,255,255,.96)', boxShadow: shadow, opacity: o}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: '#2F6DB5', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 26, fontWeight: 700}}>✉</div>
        <div style={{fontSize: 30, fontWeight: 700, color: C.ink, flex: 1}}>Partner · Before the meeting</div><div style={{fontSize: 24, color: LIGHT}}>now</div></div>
      <div style={{fontSize: 34, lineHeight: 1.35, color: C.ink}}>Please include the updated <b>financial annexure</b> and <b>presentation</b> before the meeting.</div>
    </div>;
  };
  const Tabs = () => {   // five tabs, five windows cascading on the right
    const t = useT(), out = 1 - k(t, [18.0, 18.3], [0, 1]);
    return <>
      <div style={{position: 'absolute', left: 120, right: 120, top: 110, display: 'flex', gap: 10, opacity: out}}>
        {TABS.map(([n, c], i) => { const p = k(t, [11.9 + i * 0.25, 12.2 + i * 0.25], [0, 1]);
          return <div key={i} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: '14px 14px 0 0', background: '#fff', boxShadow: '0 -2px 14px rgba(16,38,45,.08)',
            fontSize: 21, fontWeight: 700, color: C.ink, opacity: p, transform: `translateY(${(1 - p) * 20}px)`, whiteSpace: 'nowrap', overflow: 'hidden'}}>
            <div style={{width: 18, height: 18, borderRadius: 5, background: c, flex: 'none'}} />{n}</div>; })}
      </div>
      {TABS.slice(1).map(([n, c], i) => { const p = k(t, [12.2 + i * 0.3, 12.6 + i * 0.3], [0, 1]);
        return <div key={i} style={{position: 'absolute', left: 900 + i * 70, top: 240 + i * 60, width: 820, height: 500, borderRadius: 20, background: '#fff', boxShadow: shadow, overflow: 'hidden',
          opacity: p * out, transform: `translateY(${(1 - p) * 40}px)`}}>
          <Bar title={n} c={c} />
          {i === 0 && <div style={{padding: 26, fontSize: 24, color: C.ink}}>{[['Item', 'FY26'], ['Revenue', '€74.6m'], ['Gross margin', '71%'], ['Cash', '€42.9m']].map((r, j) =>
            <div key={j} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 6px', borderBottom: '1px solid #E3EAEB', fontWeight: j ? 400 : 700}}>{r.map((v) => <span key={v}>{v}</span>)}</div>)}</div>}
          {i === 1 && <div style={{margin: 26, height: 380, borderRadius: 12, background: '#123B44', color: '#fff', padding: 34, fontSize: 34, fontWeight: 700}}>Financial update<div style={{fontSize: 24, fontWeight: 400, opacity: 0.7, marginTop: 14}}>[ figures to paste ]</div></div>}
          {i === 2 && <div style={{padding: 26, fontSize: 24, color: C.ink, lineHeight: 1.5}}>Here's a draft annexure paragraph you can paste into your agreement…</div>}
          {i === 3 && <div style={{padding: 26, fontSize: 24, color: '#2F6DB5', lineHeight: 1.7}}>Q3 Actuals — source table<br />Lender covenant pack, p.3<br />Board minutes, 6 Oct</div>}
        </div>; })}
    </>;
  };
  // copy-paste: chips fly between windows on each beat of "Copy. Paste. Check. Repeat."
  const Fly = () => {
    const t = useT();
    const runs: [string, number, number, number, number, number][] = [   // [text, start, x0, y0, x1, y1]
      ['€74.6m', 16.4, 1000, 420, 1320, 560], ['Annexure paragraph', 16.85, 1200, 600, 300, 520], ['Source: Q3 Actuals', 17.3, 1300, 700, 320, 640], ['€42.9m', 17.7, 1000, 520, 1360, 600]];
    return <>{runs.map(([s, at, x0, y0, x1, y1], i) => { const p = k(t, [at, at + 0.55], [0, 1], INOUT), o = k(t, [at, at + 0.1], [0, 1]) * (1 - k(t, [at + 0.5, at + 0.65], [0, 1]));
      return <div key={i} style={{position: 'absolute', left: x0 + (x1 - x0) * p, top: y0 + (y1 - y0) * p - Math.sin(p * Math.PI) * 120, padding: '10px 18px', borderRadius: 12,
        background: C.ink, color: '#fff', fontSize: 24, fontWeight: 700, opacity: o, boxShadow: '0 20px 40px rgba(16,38,45,.3)'}}>{s}</div>; })}</>;
  };
  return (
    <Scene from={8.0} to={18.4}>
      <Stage /><Doc /><Tabs /><Email /><Fly />
      <Card text="The work had just *begun.*" at={13.6} until={15.4} />
      <Line center y={880} size={84} words={[{w: 'Copy.', at: 16.45}, {w: 'Paste.', at: 16.9}, {w: 'Check.', at: 17.35}, {w: 'Repeat.', at: 17.75, c: C.red}]} out={18.1} />
      <Tag x={60} y={1046} at={8.1} until={18.0}>Illustration</Tag>
    </Scene>
  );
};

// ---------- 19.4–23 · Turning point: overload, hard cut to silence, the question ----------
const Turn = () => {
  const Chaos = () => {
    const t = useT(), on = t < 20.6 ? 1 : 0, sh = Math.sin(t * 60) * 5 * k(t, [19.4, 20.5], [0, 1]);
    const wins = Array.from({length: 9}, (_, i) => i);
    const notes = ['Meeting in 15 min', 'Client: any update?', 'Partner: ETA?', '3 new comments', 'Calendar: Board review'];
    return <AbsoluteFill style={{opacity: on, transform: `translate(${sh}px, ${-sh / 2}px)`}}>
      {wins.map((i) => { const p = k(t, [19.4 + i * 0.1, 19.6 + i * 0.1], [0, 1]);
        return <div key={i} style={{position: 'absolute', left: 120 + (i * 173) % 1100, top: 120 + (i * 97) % 520, width: 640, height: 420, borderRadius: 18, background: '#fff', boxShadow: shadow,
          opacity: p, transform: `rotate(${((i * 37) % 9) - 4}deg)`}}><Bar title={TABS[i % 5][0]} c={TABS[i % 5][1]} /></div>; })}
      {notes.map((n, i) => { const p = k(t, [19.5 + i * 0.18, 19.7 + i * 0.18], [0, 1]);
        return <div key={i} style={{position: 'absolute', right: 60, top: 60 + i * 96, width: 560, padding: '18px 24px', borderRadius: 20, background: 'rgba(255,255,255,.97)', boxShadow: shadow,
          fontSize: 26, fontWeight: 700, color: C.ink, opacity: p, transform: `translateX(${(1 - p) * 80}px)`}}>{n}</div>; })}
      <div style={{position: 'absolute', left: 80, bottom: 70, fontSize: 120, fontWeight: 700, color: C.red, letterSpacing: -4}}>{t < 19.9 ? '8:52' : t < 20.3 ? '8:56' : '8:59'}</div>
    </AbsoluteFill>;
  };
  return (
    <Scene from={19.4} to={23.2}>
      <Stage /><Chaos />
      <Line center y={440} size={112} words={[{w: 'What', at: 21.1}, {w: 'if', at: 21.25}, {w: 'AI', at: 21.4}, {w: 'could', at: 21.55}, {w: 'finish', at: 21.75, c: C.ice}, {w: 'the', at: 21.95}, {w: 'work?', at: 22.1, c: C.ice}]} out={22.85} />
    </Scene>
  );
};

// ---------- 36.4–44.1 · Review: "Nothing changes without you. Every edit is marked, in the memo, the model and the deck. Accept it, or reject it." ----------
// Real Excel bar → real Word tracked changes → zoom into the real Changes tab → a dedicated diff card (illustration of the same three
// real edits) where each change is accepted or rejected on its own.
const EDITS: [string, string, string, string][] = [   // [file, colour, before, after]
  ['Board Memo Q3 · revenue outlook', C.word, '€71–73m', '€74.6m'],
  ['FY26 Model · DACH Q4', C.excel, '8.9', '8.5'],
  ['Board Deck Q3 · slide 4 title', C.ppt, '€71–73m', '€74.6m'],
];
const CLICK = [42.0, 42.45, 42.95], VERDICT = [true, true, false];
const DiffCard = () => {
  const t = useT(), o = k(t, [39.6, 40.05], [0, 1]) * (1 - k(t, [43.8, 44.1], [0, 1]));
  const done = CLICK.map((c) => t >= c + 0.12), acc = done.filter((d, i) => d && VERDICT[i]).length, rej = done.filter((d, i) => d && !VERDICT[i]).length;
  const W = 1560, X = 180, Y = 120, ROW = 230;
  const btn = (i: number) => [X + W - (VERDICT[i] ? 150 : 370), Y + 150 + i * ROW + 150];
  const seg = CLICK.findIndex((c) => t < c + 0.05), to = btn(seg < 0 ? 2 : seg), from = seg <= 0 ? [X + W - 60, Y + 60] : btn(seg - 1);
  const m = seg < 0 ? 1 : k(t, [CLICK[seg] - 0.4, CLICK[seg] - 0.05], [0, 1], INOUT), cx = from[0] + (to[0] - from[0]) * m, cy = from[1] + (to[1] - from[1]) * m;
  // the card grows out of the Changes tab's position on the right of the app
  const grow = k(t, [39.6, 40.15], [0, 1], INOUT);
  return <div style={{position: 'absolute', inset: 0, opacity: o}}>
    <div style={{position: 'absolute', left: X, top: Y, width: W, padding: '34px 44px', borderRadius: 34, background: '#fff', boxShadow: '0 70px 140px rgba(16,38,45,.22), 0 0 0 1px rgba(16,38,45,.08)',
      transformOrigin: '92% 30%', transform: `scale(${0.35 + 0.65 * grow})`}}>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: 26}}>
        <div style={{flex: 1}}><div style={{fontSize: 46, fontWeight: 700, letterSpacing: -1, color: C.ink}}>Review proposed changes</div>
          <div style={{fontSize: 28, color: LIGHT, marginTop: 6}}>Nothing is applied until you decide</div></div>
        <div style={{padding: '10px 22px', borderRadius: 24, background: '#EEF4F4', fontSize: 28, fontWeight: 700, color: C.ink}}>3 edits</div>
      </div>
      {EDITS.map(([file, c, a, b], i) => {
        const at = 39.95 + i * 0.6, p = k(t, [at, at + 0.4], [0, 1]), strike = k(t, [at + 0.3, at + 0.6], [0, 1], INOUT), nu = k(t, [at + 0.5, at + 0.85], [0, 1]);
        const d = done[i], ok = VERDICT[i], press = t >= CLICK[i] ? k(t, [CLICK[i], CLICK[i] + 0.14], [1, 0]) : 0, pop = k(t, [CLICK[i] + 0.1, CLICK[i] + 0.35], [0, 1]);
        return <div key={i} style={{position: 'relative', height: ROW - 20, marginBottom: 20, padding: '24px 32px', borderRadius: 24, overflow: 'hidden',
          border: `3px solid ${d ? (ok ? C.excel : C.red) : '#E3EAEB'}`, background: d ? (ok ? 'rgba(30,138,90,.07)' : 'rgba(200,70,61,.06)') : '#fff',
          opacity: p, transform: `translateY(${(1 - p) * 30}px)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 700, color: C.ink}}><div style={{width: 26, height: 26, borderRadius: 7, background: c}} />{file}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, fontSize: 56, fontWeight: 700}}>
            <span style={{position: 'relative', color: C.red}}>{a}<span style={{position: 'absolute', left: 0, right: 0, top: '52%', height: 5, background: C.red, transformOrigin: 'left', transform: `scaleX(${strike})`}} /></span>
            <span style={{color: LIGHT, fontSize: 40, opacity: nu}}>→</span>
            <span style={{position: 'relative', color: C.excel, opacity: nu * (d && !ok ? 0.35 : 1), transform: `translateX(${(1 - nu) * 30}px)`}}>{b}
              {d && !ok && <span style={{position: 'absolute', left: 0, right: 0, top: '52%', height: 5, background: C.red, transformOrigin: 'left', transform: `scaleX(${pop})`}} />}</span>
            <div style={{flex: 1}} />
            {!d && <>
              <div style={{padding: '14px 28px', borderRadius: 30, border: '2px solid #C9D5D7', fontSize: 30, color: C.ink, background: '#fff', transform: `scale(${!ok ? 1 - 0.1 * press : 1})`}}>✕ Reject</div>
              <div style={{padding: '14px 28px', borderRadius: 30, background: C.ink, color: '#fff', fontSize: 30, transform: `scale(${ok ? 1 - 0.1 * press : 1})`}}>✓ Accept</div></>}
            {d && <div style={{padding: '14px 28px', borderRadius: 30, background: ok ? C.excel : C.red, color: '#fff', fontSize: 30, transform: `scale(${0.8 + 0.2 * pop})`}}>{ok ? '✓ Accepted' : '✕ Rejected'}</div>}
          </div>
        </div>;
      })}
      <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 700, color: LIGHT}}>
        <span style={{color: acc ? C.excel : LIGHT}}>{acc} accepted</span>·<span style={{color: rej ? C.red : LIGHT}}>{rej} rejected</span></div>
    </div>
    {t > 41.3 && t < 43.6 && <div style={{position: 'absolute', left: cx, top: cy, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
      borderBottom: `46px solid ${C.ink}`, transform: 'rotate(-28deg)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.25))'}} />}
  </div>;
};
// Tracked-change author: the recording shows an internal name; "Assistant" text and avatar letter are lifted from the app's own
// Room thread (same UI font) and placed over the two comment cards (source-frame coordinates).
const AuthorFix = () => <>{[0, 82].map((dy) => <React.Fragment key={dy}>
  <Img src={staticFile('ui/hermes-name.png')} style={{position: 'absolute', left: 1171, top: 491 + dy, width: 78, height: 15}} />
  <Img src={staticFile('ui/hermes-avatar.png')} style={{position: 'absolute', left: 1137, top: 499 + dy, width: 16, height: 16}} />
</React.Fragment>)}</>;
const FR = [200, 95, 1720, 882], FR2 = [290, 140, 1540, 790];   // shared framing for Excel / Word / PowerPoint
const Review23 = () => (
  <Scene from={36.4} to={44.1}>
    <Stage />
    {/* one framing for every file, a slow push, and a dissolve between files (no jump-cuts) */}
    <Cam enter={[36.4, 36.7]} exit={[37.7, 38.05]} keys={[{t: 36.4, src: FR, dst: BIG}, {t: 38.05, src: FR2, dst: BIG}]}>
      <At at={36.4} dur={1.65}><FullImg src="ui/excel-126.png" /></At>
    </Cam>
    <Cam enter={[37.7, 38.05]} exit={[39.1, 39.45]} keys={[{t: 37.7, src: FR, dst: BIG}, {t: 39.45, src: FR2, dst: BIG}]}>
      <At at={37.7} dur={1.75}><FullVid src="clips/task3full.mp4" startFrom={25.5} rate={0.6} /></At>
      <ModelLabel><At at={37.7} dur={1.75}><FullVid src="clips/task3full.mp4" startFrom={25.5} rate={0.6} /></At></ModelLabel>
      <At at={37.82} dur={1.63}><AuthorFix /></At>
    </Cam>
    <Cam enter={[39.1, 39.45]} exit={[39.75, 40.1]} keys={[{t: 39.1, src: FR, dst: BIG}, {t: 39.45, src: FR, dst: BIG}, {t: 40.1, src: [1560, 300, 360, 185], dst: BIG}]}>
      <At at={39.1} dur={1.0}><FullImg src="ui/deck-review.png" /></At>
    </Cam>
    <DiffCard />
    <Cap text="Nothing changes *without* *you.*" at={36.7} out={38.2} />
    <Cap text="Every edit is *marked.*" at={38.4} out={41.6} />
    <Cap text="*Accept* it, or *reject* it." at={41.8} out={43.75} />
    <Chip c={C.excel} text="Excel · FY26 Model" x={110} y={1004} at={36.55} until={37.75} />
    <Chip c={C.word} text="Word · Board Memo Q3" x={110} y={1004} at={37.95} until={39.15} />
    <Tag x={1180} y={1046} at={36.5} until={39.6}>Product UI · real recording · sped up</Tag>
    <Tag x={60} y={1046} at={40.0} until={43.8}>Illustration of the real edits above</Tag>
  </Scene>
);

// ---------- 42.8–51.6 · Team: "Bring in your team. It's one agentic, collaborative workspace: people and their assistants, on the same files. Only a person says yes." ----------
// Real live session (clips/collab-take.mp4): who's here → Priya's assistant editing live → its proposal → you Accept.
const TEAM_ZOOM = [700, 200, 1220, 686];
const TeamNew = () => (
  <Scene from={42.8} to={51.7}>
    <Stage />
    <Cam enter={[42.8, 43.2]} exit={[51.3, 51.7]} keys={[{t: 42.8, src: [0, 0, 1920, 1080], dst: BIG}, {t: 44.2, src: [0, 0, 1920, 1080], dst: BIG}, {t: 45.2, src: TEAM_ZOOM, dst: BIG}]}>
      <At at={42.8} dur={2.4}><FullVid src="clips/collab-take.mp4" startFrom={12.7} /></At>
      <At at={45.2} dur={2.4}><FullVid src="clips/collab-take.mp4" startFrom={19.5} rate={0.9} /></At>
      <At at={47.6} dur={2.0}><FullVid src="clips/collab-take.mp4" startFrom={27.2} /></At>
      <At at={49.6} dur={2.1}><FullVid src="clips/collab-take.mp4" startFrom={29.9} /></At>
    </Cam>
    <Cap text="Bring in your *team.*" at={43.0} out={44.3} />
    <Cap text="One *agentic,* *collaborative* workspace." at={44.45} out={47.0} />
    <Cap text="People and their assistants. *Same* *files.*" at={47.2} out={49.6} />
    <Cap text="Only a *person* says *yes.*" at={49.8} out={51.3} />
    <Chip c={C.teal} text="Live · you, Priya and Priya's assistant" x={110} y={1004} at={43.2} until={47.0} />
    <Tag x={1050} y={1046} at={43.0} until={51.3}>Product UI · real recording · demo session, simulated teammate</Tag>
  </Scene>
);

// The three real, accepted files side by side (flat, aligned). The change starts in the model (DACH Q4 8.5 → FY26 74.6) and
// one connector carries it to the memo's €74.6m and the deck's slide 4: change it once, every file follows.
const PW = 560, PH = 315, PY = 410;
const FILES3: [string, string, string, number][] = [   // [image, file, colour, left]
  ['ui/sync-memo.png', 'Board Memo Q3.docx', C.word, 70], ['ui/sync-model.png', 'FY26 Model.xlsx', C.excel, 680], ['ui/sync-deck.png', 'Board Deck Q3.pptx', C.ppt, 1290]];
const Flow = () => {
  const t = useT(), o = k(t, [49.6, 50.0], [0, 1]) * (1 - k(t, [53.4, 53.8], [0, 1]));
  const src = k(t, [49.95, 50.3], [0, 1]), draw = k(t, [50.4, 51.1], [0, 1], INOUT), hit = k(t, [51.0, 51.3], [0, 1]), tag = k(t, [51.3, 51.6], [0, 1]);
  const ring = (x: number, y: number, w: number, h: number, c: string, p: number) =>
    <div style={{position: 'absolute', left: x - 6, top: y - 6, width: w + 12, height: h + 12, borderRadius: 10, border: `3px solid ${c}`, opacity: p,
      boxShadow: `0 0 0 6px ${c}22`, transform: `scale(${1.15 - 0.15 * p})`}} />;
  const BUS = PY + PH + 60;                       // connector runs under the files
  const MX = 1218, MY = PY + 0.83 * PH;           // model total 74.6
  const AX = 352, AY = PY + 0.56 * PH;            // memo €74.6m
  const DX = 1460, DY = PY + PH - 50;             // deck slide-4 tag
  const pathL = `M ${MX} ${MY + 12} L ${MX} ${BUS} L ${AX} ${BUS} L ${AX} ${PY + PH + 18}`, lenL = (BUS - MY) + (MX - AX) + (BUS - PY - PH);
  const pathR = `M ${MX + 10} ${MY + 12} L ${MX + 10} ${BUS} L ${DX} ${BUS} L ${DX} ${DY + 34}`, lenR = (BUS - MY) + (DX - MX) + (BUS - DY);
  return <AbsoluteFill style={{opacity: o}}>
    {FILES3.map(([img, name, c, x], i) => {
      const p = k(t, [49.6 + i * 0.1, 50.0 + i * 0.1], [0, 1]);
      return <div key={i} style={{position: 'absolute', left: x, top: PY - 58 + (1 - p) * 30, width: PW, opacity: p}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, height: 40, fontSize: 26, fontWeight: 700, color: C.ink}}>
          <div style={{width: 20, height: 20, borderRadius: 5, background: c}} />{name}
          <div style={{flex: 1}} />
          <div style={{fontSize: 20, padding: '4px 12px', borderRadius: 14, opacity: tag, background: i === 1 ? '#EEF4F4' : C.excel, color: i === 1 ? C.ink : '#fff'}}>{i === 1 ? 'Changed here' : '✓ Updated'}</div>
        </div>
        <div style={{marginTop: 18, width: PW, height: PH, borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 30px 70px rgba(16,38,45,.16), 0 0 0 1px rgba(16,38,45,.08)'}}>
          <Img src={staticFile(img)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      </div>;
    })}
    {ring(680 + 0.81 * PW, PY + 0.45 * PH, 0.055 * PW, 0.08 * PH, C.teal, src)}
    {ring(MX - 18, MY - 12, 40, 24, C.teal, src)}
    {ring(AX - 28, AY - 12, 56, 26, C.excel, hit)}
    <div style={{position: 'absolute', left: AX - 9, top: PY + PH + 12, width: 18, height: 18, borderRadius: '50%', background: C.excel, opacity: hit}} />
    <div style={{position: 'absolute', left: DX - 120, top: DY, padding: '8px 16px', borderRadius: 12, background: '#fff', border: `3px solid ${C.excel}`, fontSize: 22, fontWeight: 700,
      color: C.ink, opacity: hit, transform: `scale(${0.85 + 0.15 * hit})`}}>Slide 4 · €74.6m</div>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {[[pathL, lenL], [pathR, lenR]].map(([d, len], i) =>
        <path key={i} d={d as string} fill="none" stroke={C.teal} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={len as number} strokeDashoffset={(len as number) * (1 - draw)} style={{filter: 'drop-shadow(0 0 8px rgba(117,214,229,.9))'}} />)}
    </svg>
  </AbsoluteFill>;
};

// ---------- 49.6–53.7 · Callback close: "This time, it's actually done. And you approved every change." ----------
const Done = () => {
  const Callback = () => {
    const t = useT(), a = k(t, [49.8, 50.2], [0, 1]), strike = k(t, [50.5, 50.8], [0, 1], INOUT), b = k(t, [50.9, 51.3], [0, 1]), out = k(t, [53.3, 53.7], [0, 1]);
    return <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', opacity: 1 - out}}>
      <span style={{position: 'relative', fontSize: 52, fontWeight: 700, color: LIGHT, opacity: a * (1 - 0.4 * strike)}}>"AI said it was done."
        <span style={{position: 'absolute', left: 0, right: 0, top: '52%', height: 5, background: C.red, transformOrigin: 'left', transform: `scaleX(${strike})`}} /></span>
      <div style={{fontSize: 96, fontWeight: 700, letterSpacing: -3, color: C.ink, opacity: b, transform: `translateY(${(1 - b) * 20}px)`}}>This time, <span style={{color: C.ice}}>it is.</span></div>
    </div>;
  };
  return (
    <Scene from={49.6} to={53.8}>
      <Stage />
      <Flow />
      <Callback />
      <Pill text="✓ Changed once · every file updated · approved by you" color={C.excel} at={51.8} until={53.3} y={930} />
    </Scene>
  );
};

// ---------- 53.6–61 · Close card: "Agentic Office. Agents that work with your work… not against it." ----------
const Close = () => {
  const Card2 = () => {
    const t = useT(), o = k(t, [53.7, 54.3], [0, 1]) * (1 - k(t, [60.6, 61.0], [0, 1]));
    const f = (a: number) => k(t, [a, a + 0.45], [0, 1]);
    const line = k(t, [57.4, 58.0], [0, 1], INOUT);
    return <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', opacity: o, transform: `translateY(${(1 - o) * 30}px)`}}>
      <div style={{fontSize: 28, fontWeight: 700, letterSpacing: 8, color: C.ice, opacity: f(53.8)}}>INTRODUCING</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 26, opacity: f(54.1)}}>
        <Img src={staticFile('ui/logo.png')} style={{width: 120, height: 120, filter: 'drop-shadow(0 18px 30px rgba(16,38,45,.2))'}} />
        <div style={{fontSize: 130, fontWeight: 700, letterSpacing: -5, color: C.ink}}>Agentic Office</div>
      </div>
      <div style={{fontSize: 64, fontWeight: 700, letterSpacing: -2, color: C.ink, marginTop: 36}}>
        <span style={{opacity: f(55.1)}}>Agents that work with your work. </span><span style={{color: C.ice, opacity: f(56.6)}}>Not against it.</span></div>
      <div style={{width: 900, height: 2, background: '#CFDCDD', margin: '48px auto 40px', transform: `scaleX(${line})`}} />
      <div style={{fontSize: 44, fontWeight: 700, color: C.ink}}>
        {['Create.', 'Edit.', 'Collaborate.', 'Verify.'].map((w, i) => <span key={w} style={{display: 'inline-block', margin: '0 14px', opacity: f(57.7 + i * 0.25), transform: `translateY(${(1 - f(57.7 + i * 0.25)) * 14}px)`}}>{w}</span>)}</div>
      <div style={{fontSize: 34, color: LIGHT, marginTop: 22, opacity: f(58.9)}}>Your documents. <span style={{color: C.ice}}>Your decisions.</span></div>
    </div>;
  };
  return (
    <Scene from={53.6} to={61.0}>
      <Stage /><Card2 />
      <Pill text="Request early access" color={C.teal} at={59.4} until={60.6} y={880} solid />
    </Scene>
  );
};

const SHIFT = Math.round(-1.8 * 30);   // the V21e app scenes start 1.8 s earlier here
export const Film23: React.FC = () => {
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
      <Hook />
      <Sequence from={-36} layout="none"><Sequence from={SHIFT} layout="none"><Bridge /><Ask /></Sequence><Review23 /></Sequence>
      <TeamNew />
      <Sequence from={60} layout="none"><Done /><Close /></Sequence>
    </AbsoluteFill>
  );
};
