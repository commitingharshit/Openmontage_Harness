import React, {useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile} from 'remotion';
import {C, INOUT, Scene, k, useT} from './Film';
import {Cam3, Flag, Grade, ICE, Label, Night, Title, glow} from './Hook23';

// V28 hook (standalone, 35.4 s; spliced in front of V27 from 21.8 s). Times are absolute seconds.
// VO: o1@0.5 o2@3.0 o3b@6.8 o4@9.8 o5f@12.4 (v22) · n1@17.4 n2@21.6 n3@23.6 (v28) · o6@28.6 o7@33.0 (v22)
// All app windows are generic illustrations of a chatbot and office apps (no vendor names or logos).
const SERIF = 'Georgia, "Times New Roman", serif';
export const UI = 'Inter, -apple-system, sans-serif';
const typed = (t: number, s: string, a: number, b: number) => s.slice(0, Math.round(k(t, [a, b], [0, s.length], (x) => x)));
const caret = (t: number) => <span style={{opacity: Math.round(t * 4) % 2, fontWeight: 300}}>|</span>;
export const WIN = {left: 110, top: 64, width: 1700, height: 950};

// ---------- the chatbot (minimal assistant layout) ----------
const Side = () => <div style={{width: 280, borderRight: '1px solid #ECECEC', padding: '26px 22px', fontSize: 19, color: '#333', display: 'flex', flexDirection: 'column', gap: 4, background: '#FAFAFA'}}>
  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 24}}><div style={{width: 30, height: 30, borderRadius: '50%', border: '2px solid #333'}} /><span style={{color: '#999', letterSpacing: 2}}>⋮⋮</span></div>
  {['✎  New chat', '⌕  Search', '◎  Agents', '▭  Notebooks', '☑  Tasks'].map((s) => <div key={s} style={{padding: '8px 6px'}}>{s}</div>)}
  <div style={{color: '#A0A0A0', fontSize: 16, margin: '22px 6px 6px'}}>Chats</div>
  {['Board memo FY26 update', 'Board pack Q3', 'Summarize covenant pack', 'Draft client email'].map((s, i) => <div key={s} style={{padding: '8px 6px', borderRadius: 8, background: i === 0 ? '#EFEFEF' : 'none'}}>{s}</div>)}
  <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, fontSize: 16}}><div style={{width: 30, height: 30, borderRadius: '50%', background: '#C9B8A6'}} />You</div>
</div>;
const Input: React.FC<{text: string; t: number; active: boolean}> = ({text, t, active}) =>
  <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 24px', borderRadius: 30, border: '1px solid #DADADA', fontSize: 24, color: text ? '#111' : '#9A9A9A', background: '#fff', boxShadow: '0 6px 24px rgba(0,0,0,.06)'}}>
    <span style={{fontSize: 30, color: '#666'}}>+</span><div style={{flex: 1}}>{text || 'Ask anything'}{active && caret(t)}</div>
    <div style={{width: 44, height: 44, borderRadius: '50%', background: text ? '#111' : '#E6E6E6', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22}}>↑</div></div>;
const Bubble: React.FC<{children: React.ReactNode}> = ({children}) =>
  <div style={{alignSelf: 'flex-end', maxWidth: 760, padding: '16px 24px', borderRadius: 24, background: '#F1F1F1', fontSize: 25, color: '#111'}}>{children}</div>;
const FileCard: React.FC<{name: string; c: string; sub: string; o?: number}> = ({name, c, sub, o = 1}) =>
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, padding: '14px 22px 14px 14px', borderRadius: 16, border: '1px solid #E2E2E2', background: '#fff', opacity: o, transform: `translateY(${(1 - o) * 10}px)`}}>
    <div style={{width: 48, height: 56, borderRadius: 8, background: c, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 18}}>{name.split('.').pop()!.toUpperCase()}</div>
    <div><div style={{fontSize: 22, fontWeight: 700, color: '#111'}}>{name}</div><div style={{fontSize: 18, color: '#888'}}>{sub}</div></div></div>;
const Chips: React.FC<{items: string[]; at: number; t: number}> = ({items, at, t}) =>
  <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>{items.map((s, i) => { const p = k(t, [at + i * 0.12, at + i * 0.12 + 0.3], [0, 1]);
    return <div key={s} style={{padding: '10px 18px', borderRadius: 20, border: '1px solid #DEDEDE', fontSize: 19, color: '#333', opacity: p, transform: `translateY(${(1 - p) * 8}px)`}}>{s}</div>; })}</div>;
export const Slide: React.FC<{w: number; n: number; big?: boolean; rev?: string}> = ({w, n, big, rev = '€71–73m'}) => {
  const s = w / 400;
  return <div style={{width: w, height: w * 0.5625, borderRadius: 6 * s, background: n % 3 === 1 ? '#F4F1EA' : '#13294B', color: n % 3 === 1 ? '#13294B' : '#fff', padding: 26 * s, boxSizing: 'border-box', overflow: 'hidden', flex: 'none',
    boxShadow: '0 4px 14px rgba(0,0,0,.15)', fontFamily: UI}}>
    {n === 1 ? <><div style={{fontSize: 14 * s, opacity: 0.6, letterSpacing: 2 * s}}>FY26 OUTLOOK</div><div style={{fontSize: 34 * s, fontWeight: 700, marginTop: 6 * s}}>Revenue {big ? <span data-rev>{rev}</span> : rev}</div>
      <div style={{display: 'flex', gap: 10 * s, alignItems: 'flex-end', height: 90 * s, marginTop: 18 * s}}>{[40, 55, 62, 78, 90].map((h, i) => <div key={i} style={{flex: 1, height: `${h}%`, background: i === 4 ? '#C8463D' : '#2F6DB5', borderRadius: 3 * s}} />)}</div></>
      : <><div style={{fontSize: 26 * s, fontWeight: 700}}>{['Board Pack Q3', '', 'DACH performance', 'Cash & covenants', 'Next steps', 'Appendix'][n] || 'Board Pack Q3'}</div>
        {[80, 64, 72].map((x, i) => <div key={i} style={{height: 8 * s, width: `${x}%`, background: 'currentColor', opacity: 0.25, borderRadius: 4 * s, marginTop: 14 * s}} />)}</>}
  </div>;
};
export const Chat: React.FC<{phase: 'agreement' | 'deck' | 'regen'}> = ({phase}) => {
  const t = useT();
  const ask1 = 'Update the board memo with the new FY26 forecast.';
  const ask2 = 'Now update the board deck to match the memo.';
  const ask3 = 'Change the revenue on slide 2 to €74.6m.';
  let input = '', active = false; const msgs: React.ReactNode[] = [];
  if (phase === 'agreement') {
    input = t < 1.9 ? typed(t, ask1, 0.6, 1.9) : ''; active = t < 1.9;
    if (t >= 1.95) msgs.push(<Bubble key="a">{ask1}</Bubble>);
    if (t > 2.2 && t < 3.0) msgs.push(<div key="d" style={{fontSize: 24, color: '#888'}}>Thinking{'.'.repeat(1 + (Math.round(t * 6) % 3))}</div>);
    if (t >= 3.0) { const L = ['Here\'s your updated memo ✓', 'FY26 outlook revised', 'Key figures table updated', 'Formatting preserved'], n = k(t, [3.0, 4.3], [0, 4], (x) => x);
      msgs.push(<div key="r" style={{fontSize: 25, lineHeight: 1.6, color: '#111'}}>{L.map((l, i) => n > i && <div key={i} style={{fontWeight: i ? 400 : 700}}>{i ? '• ' : ''}{l}</div>)}</div>);
      msgs.push(<div key="f"><FileCard name="Board_Memo_Q3.docx" c="#185ABD" sub="Document · 14 pages" o={k(t, [4.3, 4.6], [0, 1])} /></div>);
      msgs.push(<Chips key="c" t={t} at={4.6} items={['Also update the deck?', 'Summarize the changes', 'Draft a cover email']} />); }
  } else {
    msgs.push(<Bubble key="a">{ask1}</Bubble>, <div key="r" style={{fontSize: 25, color: '#999'}}>Here's your updated memo ✓ …</div>);
    const t2 = phase === 'deck' ? t : 99;
    if (phase === 'deck') { input = t2 < 18.6 ? typed(t2, ask2, 17.5, 18.6) : ''; active = t2 < 18.6; }
    if (t2 >= 18.65) msgs.push(<Bubble key="b">{ask2}</Bubble>);
    if (t2 >= 18.9) { const p = phase === 'deck' ? k(t2, [18.9, 20.9], [0, 1], (x) => x) : 1, done = p >= 1;
      msgs.push(<div key="g" style={{border: '1px solid #E4E4E4', borderRadius: 18, padding: 22, width: 1080, background: '#fff'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#111', fontWeight: 700, marginBottom: 14}}>
          <span>{done ? 'Board_Presentation.pptx · 12 slides ✓' : 'Generating presentation…'}</span><span style={{color: '#888', fontWeight: 400}}>{done ? 'Download' : `${Math.round(p * 100)}%`}</span></div>
        <div style={{display: 'flex', gap: 12}}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{opacity: p * 6 > i ? 1 : 0.08}}>{p * 6 > i ? <Slide w={164} n={i} /> : <div style={{width: 164, height: 92, borderRadius: 6, background: '#EEE'}} />}</div>)}</div>
      </div>); }
    if (phase === 'regen') {
      input = t < 24.3 ? typed(t, ask3, 23.55, 24.3) : ''; active = t < 24.3;
      if (t >= 24.35) msgs.push(<Bubble key="c">{ask3}</Bubble>);
      if (t >= 24.6) { const p = k(t, [24.6, 27.6], [0.02, 0.97], (x) => x * x), mins = Math.max(0, Math.ceil(5 * (1 - p)));
        msgs.push(<div key="r2" style={{fontSize: 25, color: '#111'}}>Sure! I'll regenerate the presentation with the updated figure.</div>);
        msgs.push(<div key="p" style={{border: '1px solid #E4E4E4', borderRadius: 18, padding: 22, width: 1080, background: '#fff'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 700, color: '#111'}}><span>Regenerating all 12 slides…</span><span style={{color: '#C8463D'}}>about {mins} min left</span></div>
          <div style={{height: 12, borderRadius: 6, background: '#EEE', marginTop: 16, overflow: 'hidden'}}><div style={{height: '100%', width: `${p * 100}%`, background: '#111', borderRadius: 6}} /></div>
          <div style={{fontSize: 19, color: '#888', marginTop: 12}}>Slide {Math.max(1, Math.round(p * 12))} of 12 · rebuilding layouts and charts</div></div>);
        msgs.push(<Chips key="ch" t={t} at={26.9} items={['Also update the chart on slide 4?', 'Re-check the appendix?']} />); }
    }
  }
  const scroll = phase === 'regen' ? -300 : phase === 'deck' ? -k(t, [18.6, 19.2], [0, 160]) : 0;
  const empty = phase === 'agreement' && t < 1.95;
  return <div style={{position: 'absolute', ...WIN, borderRadius: 22, background: '#fff', boxShadow: glow, overflow: 'hidden', display: 'flex', fontFamily: UI}}>
    <Side />
    <div style={{flex: 1, position: 'relative'}}>
      <div style={{height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 28px', fontSize: 18, color: '#555'}}><span style={{padding: '5px 12px', borderRadius: 8, background: '#F0F0F0', fontWeight: 700}}>Work</span>Auto ⌄</div>
      {empty ? <div style={{position: 'absolute', left: 140, right: 140, top: 300}}>
        <div style={{fontSize: 52, fontWeight: 600, color: '#111', marginBottom: 34, letterSpacing: -1}}>Hi, <span style={{color: '#A8A8A8'}}>how can I help?</span></div>
        <Input text={input} t={t} active={active} />
        <div style={{marginTop: 22}}><Chips t={t} at={0.1} items={['Get to know your assistant', 'Prepare for what\'s ahead', 'Create something']} /></div>
      </div> : <>
        <div style={{position: 'absolute', left: 120, right: 120, top: 100 + scroll, display: 'flex', flexDirection: 'column', gap: 26}}>{msgs}</div>
        <div style={{position: 'absolute', left: 120, right: 120, bottom: 40}}><Input text={input} t={t} active={active} /></div></>}
    </div>
  </div>;
};

// ---------- office-app windows (generic, recognisable layouts) ----------
type G = {label: string; w: number; items: React.ReactNode};
const Btn: React.FC<{g: string; s?: string; big?: boolean}> = ({g, s, big}) => <div style={{display: 'flex', flexDirection: big ? 'column' : 'row', alignItems: 'center', gap: 4, fontSize: big ? 30 : 20, color: '#333', minWidth: big ? 58 : 30}}>
  <span>{g}</span>{s && <span style={{fontSize: 15}}>{s}</span>}</div>;
const Box: React.FC<{w: number; s: string}> = ({w, s}) => <div style={{width: w, height: 30, border: '1px solid #C8C8C8', borderRadius: 4, fontSize: 15, padding: '4px 8px', boxSizing: 'border-box', color: '#333', background: '#fff'}}>{s} ⌄</div>;
const AppWin: React.FC<{title: string; accent: string; tabs: string[]; groups: G[]; children: React.ReactNode; dark?: boolean; style?: React.CSSProperties}> = ({title, accent, tabs, groups, children, style}) =>
  <div style={{position: 'absolute', ...WIN, borderRadius: 14, background: '#E9E9E9', boxShadow: glow, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: UI, ...style}}>
    <div style={{height: 46, background: accent, color: '#fff', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 17, gap: 18, flex: 'none'}}>
      <span>▣</span><span>↶</span><span>↷</span><div style={{flex: 1, textAlign: 'center'}}>{title}</div><span>—</span><span>☐</span><span>✕</span></div>
    <div style={{height: 42, background: '#F7F7F7', display: 'flex', alignItems: 'flex-end', gap: 30, padding: '0 24px', fontSize: 18, color: '#333', flex: 'none'}}>
      {tabs.map((x, i) => <div key={x} style={{paddingBottom: 8, borderBottom: i === 1 ? `3px solid ${accent}` : '3px solid transparent', fontWeight: i === 1 ? 700 : 400, color: i === 1 ? accent : '#333'}}>{x}</div>)}</div>
    <div style={{background: '#F7F7F7', padding: '0 10px 10px', flex: 'none'}}>
      <div style={{height: 118, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,.08)', display: 'flex'}}>
        {groups.map((g) => <div key={g.label} style={{width: g.w, borderRight: '1px solid #E4E4E4', display: 'flex', flexDirection: 'column', padding: '10px 14px 6px'}}>
          <div style={{flex: 1, display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'flex-start'}}>{g.items}</div>
          <div style={{fontSize: 14, color: '#666', textAlign: 'center'}}>{g.label}</div></div>)}</div></div>
    <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}>{children}</div>
  </div>;
const clip: G = {label: 'Clipboard', w: 150, items: <><Btn big g="📋" s="Paste" /><div style={{display: 'flex', flexDirection: 'column', gap: 2}}><Btn g="✂" /><Btn g="⧉" /><Btn g="🖌" /></div></>};
const font = (w = 330): G => ({label: 'Font', w, items: <><Box w={170} s="Aptos (Body)" /><Box w={64} s="12" /><Btn g="A˄" /><Btn g="A˅" />
  {['B', 'I', 'U'].map((x) => <div key={x} style={{fontSize: 21, fontWeight: x === 'B' ? 800 : 400, fontStyle: x === 'I' ? 'italic' : 'normal', textDecoration: x === 'U' ? 'underline' : 'none', width: 24}}>{x}</div>)}
  <span style={{fontSize: 20, textDecoration: 'line-through'}}>ab</span><span style={{fontSize: 20, borderBottom: '4px solid #FFE600'}}>✎</span><span style={{fontSize: 20, borderBottom: '4px solid #E81123'}}>A</span></>});
const para: G = {label: 'Paragraph', w: 280, items: <>{['☰', '⋮☰', '≔', '⇤', '⇥', '↕', '¶', '≡', '≣', '☷', '▦'].map((g, i) => <Btn key={i} g={g} />)}</>};

const WORD_TABS = ['File', 'Home', 'Insert', 'Design', 'Layout', 'References', 'Mailings', 'Review', 'View'];
export const Word: React.FC<{broken: number; fixed: number}> = ({broken, fixed}) => {
  const t = useT(), styles: G = {label: 'Styles', w: 520, items: <>{['Normal', 'No Spacing', 'Heading 1', 'Heading 2', 'Title'].map((s, i) =>
    <div key={s} style={{width: 88, height: 62, border: i ? '1px solid #E4E4E4' : '2px solid #185ABD', borderRadius: 4, display: 'grid', placeItems: 'center', fontSize: i > 1 ? 17 : 14, color: i > 1 ? '#185ABD' : '#333', fontWeight: i > 1 ? 600 : 400}}>{s}</div>)}</>};
  const edit: G = {label: 'Editing', w: 200, items: <><Btn g="⌕" s="Find" /><Btn g="⇄" s="Replace" /><Btn g="⬚" s="Select" /></>};
  const nums: [string, string][] = [['1.', '1.'], ['2.', '2.'], ['3.', '2.'], ['4.', '5.']];
  return <AppWin title="Board_Memo_Q3.docx · Saved" accent="#185ABD" tabs={WORD_TABS} groups={[clip, font(), para, styles, edit]}>
    <div style={{height: 26, background: '#F3F3F3', borderBottom: '1px solid #DDD', fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 46, paddingLeft: 440}}>{Array.from({length: 18}, (_, i) => <span key={i}>{i % 2 ? '·' : i / 2 + 1}</span>)}</div>
    <div style={{position: 'absolute', left: 390, top: 50, width: 920, height: 1100, background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,.15)', padding: '60px 90px', boxSizing: 'border-box', fontFamily: SERIF, color: '#111'}}>
      <div style={{height: 64, border: `2px ${broken ? 'dashed' : 'solid'} ${broken ? '#E06A60' : '#185ABD'}`, borderRadius: 8, display: 'grid', placeItems: 'center', fontFamily: UI, fontWeight: 700, fontSize: 20,
        color: broken ? '#E06A60' : '#185ABD', background: broken ? '#FFF4F3' : '#EEF4FB', marginBottom: 26}}>{broken ? '[ company letterhead missing ]' : 'NORTHWIND CAPITAL · BOARD'}</div>
      <div style={{fontSize: 34, fontWeight: 700, marginBottom: 16, transform: `translateX(${broken * 40}px)`}}>Q3 BOARD MEMORANDUM</div>
      {nums.map(([a, b], i) => { const bad = broken > 0.5 && a !== b && fixed <= i - 1.5;
        return <div key={i} style={{fontSize: 24, marginBottom: 8, transform: `translateX(${broken * (1 - Math.min(1, fixed / 3)) * (i % 2 ? 26 : -8)}px)`}}>
          <b style={{color: bad ? '#E81123' : '#111'}}>{bad ? b : a}</b> {['Q3 performance', 'FY26 outlook', 'Key figures', 'Matters for decision'][i]}</div>; })}
      <div style={{marginTop: 18, fontSize: 19, fontFamily: UI}}>
        {[['Metric', 'Q3', 'FY26 outlook'], ['Revenue', '€18.2m', '€74.6m'], ['Gross margin', '71%', '71%']].map((r, i) =>
          <div key={i} style={{display: 'flex', borderBottom: '1px solid #DDD', transform: `translateX(${broken * i * 44}px) rotate(${broken * (i ? 1.3 : 0)}deg)`}}>
            {r.map((v, j) => <div key={j} style={{width: 200, padding: '9px 12px', fontWeight: i ? 400 : 700, background: i ? 'transparent' : '#F0F0F0'}}>{v}</div>)}</div>)}</div>
      {[96, 90, 94, 72, 88, 92, 60].map((w, i) => <div key={i} style={{height: 9, width: `${w}%`, background: '#E4E4E4', borderRadius: 4, margin: '16px 0'}} />)}
      {t > 9.8 && t < 11.4 && <div style={{position: 'absolute', left: 88, top: 214 + Math.min(3, Math.floor(fixed)) * 38, width: 2, height: 28, background: '#111', opacity: Math.round(t * 3) % 2}} />}
    </div>
  </AppWin>;
};
const Excel: React.FC = () => {
  const num: G = {label: 'Number', w: 220, items: <><Box w={150} s="General" /><Btn g="$" /><Btn g="%" /><Btn g="," /><Btn g=".0" /></>};
  const sty: G = {label: 'Styles', w: 340, items: <><Btn g="▤" s="Conditional Formatting" /><Btn g="▦" s="Format as Table" /></>};
  const rows = [['', 'FY26 Model · Revenue by segment', '', '', ''], ['', 'Item', 'Q1', 'Q2', 'Q3', 'FY26'], ['', 'Revenue', '17.8', '18.4', '19.1', '74.6'], ['', 'DACH', '4.1', '4.3', '4.5', '8.5'], ['', 'Gross margin', '70%', '71%', '71%', '71%'], ['', 'Cash', '38.2', '40.1', '42.9', '42.9']];
  return <AppWin title="FY26_Model.xlsx · Saved" accent="#107C41" tabs={['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View']} groups={[clip, font(300), {label: 'Alignment', w: 220, items: para.items}, num, sty]}>
    <div style={{height: 38, background: '#fff', borderBottom: '1px solid #D4D4D4', display: 'flex', alignItems: 'center', fontSize: 17, color: '#333'}}><div style={{width: 110, borderRight: '1px solid #D4D4D4', paddingLeft: 12}}>F3</div><span style={{padding: '0 14px', color: '#888', fontStyle: 'italic'}}>fx</span>=SUM(C3:E3)+Q4_rev</div>
    <div style={{display: 'grid', gridTemplateColumns: `52px repeat(12, 130px)`, fontSize: 17, background: '#fff'}}>
      {['', ...'ABCDEFGHIJKL'].map((c, i) => <div key={i} style={{height: 30, background: c === 'F' ? '#D3F0E0' : '#F3F3F3', border: '1px solid #E1E1E1', textAlign: 'center', color: '#555', lineHeight: '30px'}}>{c}</div>)}
      {Array.from({length: 22}, (_, r) => [<div key={`h${r}`} style={{height: 31, background: '#F3F3F3', border: '1px solid #E1E1E1', textAlign: 'center', color: '#555', lineHeight: '31px'}}>{r + 1}</div>,
        ...Array.from({length: 12}, (_, c) => { const v = rows[r]?.[c] ?? '', sel = r === 2 && c === 5;
          return <div key={`${r}-${c}`} style={{height: 31, border: sel ? '2px solid #107C41' : '1px solid #EDEDED', padding: '0 8px', lineHeight: '31px', fontWeight: r < 2 && v ? 700 : 400, textAlign: c > 1 ? 'right' : 'left', color: '#222', whiteSpace: 'nowrap'}}>{v}</div>; })])}
    </div>
  </AppWin>;
};
const Ppt: React.FC = () => {
  const slides: G = {label: 'Slides', w: 200, items: <><Btn big g="▭" s="New Slide" /><Btn g="▤" s="Layout" /></>};
  const draw: G = {label: 'Drawing', w: 260, items: <><Btn big g="△" s="Shapes" /><Btn big g="⧉" s="Arrange" /><Btn big g="◩" s="Styles" /></>};
  return <AppWin title="Board_Presentation.pptx · Saved" accent="#C43E1C" tabs={['File', 'Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Review', 'View']} groups={[clip, slides, font(320), para, draw]}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 250, background: '#F3F3F3', borderRight: '1px solid #DDD', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16}}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{display: 'flex', gap: 8, fontSize: 15, color: '#555'}}>{i + 1}<div style={{outline: i === 1 ? '3px solid #C43E1C' : 'none', borderRadius: 4}}><Slide w={190} n={i} /></div></div>)}</div>
    <div style={{position: 'absolute', left: 330, top: 40}}><Slide w={1240} n={1} /></div>
  </AppWin>;
};
const Pdf: React.FC = () =>
  <div style={{position: 'absolute', ...WIN, borderRadius: 14, background: '#525659', boxShadow: glow, overflow: 'hidden', fontFamily: UI}}>
    <div style={{height: 56, background: '#323639', color: '#F1F1F1', display: 'flex', alignItems: 'center', gap: 26, padding: '0 22px', fontSize: 19}}>
      <span>☰</span><span style={{flex: 1}}>Lender_Covenant_Pack.pdf</span><span style={{padding: '4px 10px', background: '#191B1C', borderRadius: 4}}>3</span><span>/ 14</span><span>−</span><span style={{padding: '4px 10px', background: '#191B1C', borderRadius: 4}}>100%</span><span>+</span><span>⤓</span><span>⎙</span><span>⋮</span></div>
    <div style={{position: 'absolute', left: 0, top: 56, bottom: 0, width: 220, background: '#3C4043', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center'}}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{width: 120, height: 160, background: '#fff', outline: i === 2 ? '4px solid #8AB4F8' : 'none'}} />)}</div>
    <div style={{position: 'absolute', left: 520, top: 90, width: 860, height: 1100, background: '#fff', padding: '70px 80px', boxSizing: 'border-box', fontFamily: SERIF, color: '#111'}}>
      <div style={{fontSize: 30, fontWeight: 700}}>3. Financial covenants</div>
      {[94, 88, 96, 70].map((w, i) => <div key={i} style={{height: 9, width: `${w}%`, background: '#DDD', margin: '18px 0'}} />)}
      <div style={{fontSize: 22, padding: '6px 4px', background: 'rgba(255,230,0,.45)', display: 'inline-block'}}>Q3 actuals: revenue €19.1m · cash €42.9m</div>
      {[92, 84, 90, 66, 88].map((w, i) => <div key={i} style={{height: 9, width: `${w}%`, background: '#DDD', margin: '18px 0'}} />)}
    </div>
  </div>;

// ---------- overlays ----------
export const Notif: React.FC<{title: string; body: React.ReactNode; at: number; until: number; big?: number}> = ({title, body, at, until, big = 0}) => {
  const t = useT(), o = k(t, [at, at + 0.35], [0, 1]) * (1 - k(t, [until, until + 0.3], [0, 1])), buzz = t > at + 0.1 && t < at + 0.5 ? Math.sin(t * 120) * 6 : 0;
  const s = 1 + 0.35 * big, x = 1880 - 640 * s - big * 420, y = 40 + big * 300;
  return <div style={{position: 'absolute', left: x, top: y + (1 - o) * -140, width: 640, transform: `translateX(${buzz}px) scale(${s})`, transformOrigin: '0 0', padding: '22px 26px', borderRadius: 26,
    background: 'rgba(30,34,38,.9)', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 40px 100px rgba(0,0,0,.6)', opacity: o, fontFamily: UI}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}><div style={{width: 40, height: 40, borderRadius: 10, background: '#2F6DB5', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 22}}>✉</div>
      <div style={{flex: 1, fontSize: 22, fontWeight: 700, color: '#fff'}}>{title}</div><div style={{fontSize: 18, color: '#9AA'}}>now</div></div>
    <div style={{fontSize: 24, lineHeight: 1.35, color: '#E8EEF0'}}>{body}</div></div>;
};
export const Clock: React.FC<{from: number; to: number; a: number; b: number; until: number; at: number}> = ({from, to, a, b, at, until}) => {
  const t = useT(), m = Math.round(k(t, [a, b], [from, to], (x) => x)), o = k(t, [at, at + 0.3], [0, 1]) * (1 - k(t, [until, until + 0.2], [0, 1]));
  const ff = t > a && t < b;
  return <div style={{position: 'absolute', left: 70, bottom: 50, opacity: o, fontFamily: UI, color: '#FF5A4E', textShadow: '0 0 50px rgba(255,90,78,.5)'}}>
    <div style={{fontSize: 22, letterSpacing: 4, fontWeight: 700, color: 'rgba(255,200,195,.8)'}}>MEETING AT 9:00</div>
    <div style={{fontSize: 140, fontWeight: 700, letterSpacing: -5, fontVariantNumeric: 'tabular-nums', filter: ff ? 'blur(1.2px)' : 'none'}}>8:{String(m).padStart(2, '0')}</div></div>;
};
export const Hi: React.FC<{text: string; at: number}> = ({text, at}) => {   // big word beat
  const t = useT(); if (t < at || t > at + 0.45) return null;
  return <div style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', fontSize: 170, fontWeight: 800, letterSpacing: -6, color: text === 'Repeat.' ? '#FF5A4E' : '#fff', fontFamily: UI,
    transform: `scale(${k(t, [at, at + 0.1], [1.3, 1])})`, textShadow: '0 0 80px rgba(0,0,0,.9), 0 0 40px rgba(127,227,242,.4)'}}>{text}</div>;
};
export const Ring: React.FC<{x: number; y: number; w: number; h: number; at: number; until: number}> = ({x, y, w, h, at, until}) => {
  const t = useT(), d = k(t, [at, at + 0.4], [0, 1], INOUT), o = 1 - k(t, [until, until + 0.3], [0, 1]), L = 2 * (w + h) * 1.2;
  return <svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: o}}><ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2 + 24} ry={h / 2 + 18} fill="none" stroke="#FF5A4E" strokeWidth={6}
    strokeDasharray={L} strokeDashoffset={L * (1 - d)} style={{filter: 'drop-shadow(0 0 12px rgba(255,90,78,.7))'}} /></svg>;
};
// a camera that frames a 1920 canvas: zoom about a focus point, with a slow drift
export const Lens: React.FC<{z: number; fx: number; fy: number; shake?: number; children: React.ReactNode}> = ({z, fx, fy, shake = 0, children}) => {
  const t = useT(), sx = Math.sin(t * 71) * shake, sy = Math.cos(t * 53) * shake;
  return <AbsoluteFill style={{transform: `translate(${960 - fx * z + sx}px, ${540 - fy * z + sy}px) scale(${z})`, transformOrigin: '0 0'}}>{children}</AbsoluteFill>;
};

// ---------- scenes ----------
export const S1 = () => {   // 0–6.7 · "You ask a chatbot…" "It writes back: here's your revised agreement."
  const t = useT(), z = k(t, [0, 2.0], [1.1, 1.04], INOUT) * k(t, [2.0, 6.0], [1, 0.98]), out = k(t, [6.25, 6.7], [0, 1], INOUT);
  const fx = k(t, [0, 2.0], [960, 980], INOUT), fy = k(t, [0, 2.0], [560, 560]) + k(t, [3, 4.6], [0, 60], INOUT);
  return <Scene from={0} to={6.7}>
    <Night /><Lens z={z * (1 + 1.6 * out)} fx={fx + out * -300} fy={fy + out * 80}><div style={{opacity: 1 - out}}><Chat phase="agreement" /></div></Lens>
    <Title text="AI said it was done." hi={['done.']} at={5.3} until={6.3} y={930} />
    <Label at={0.3} until={6.5} /><Grade />
  </Scene>;
};
export const S2 = () => {   // 6.7–17.2 · open the file → wrecked → fix by hand → the email
  const t = useT(), open = k(t, [6.7, 7.2], [0, 1]), brk = k(t, [8.75, 9.0], [0, 1]), fixed = k(t, [9.9, 11.2], [0, 3]), g = t > 8.75 && t < 9.15;
  const z = k(t, [6.7, 8.7], [1.05, 1.18], INOUT) + (g ? 0.02 : 0) - k(t, [11.3, 12.2], [0, 0.14], INOUT), dim = k(t, [12.3, 12.9], [0, 1]);
  return <Scene from={6.7} to={17.2}>
    <Night />
    <Lens z={z} fx={960 + k(t, [9.8, 11.2], [0, -80])} fy={k(t, [6.7, 8.7], [520, 460])} shake={g ? 7 : 0}>
      <div style={{opacity: open, transform: `scale(${0.9 + 0.1 * open})`, filter: `${g ? 'drop-shadow(10px 0 rgba(255,40,80,.75)) drop-shadow(-10px 0 rgba(0,220,255,.75))' : ''} brightness(${1 - 0.45 * dim}) blur(${dim * 3}px)`}}>
        <Word broken={brk} fixed={fixed} /></div>
    </Lens>
    <AbsoluteFill style={{background: '#fff', opacity: g ? 0.25 : 0}} />
    <Flag text="Template gone" x={1440} y={400} tx={1400} ty={510} at={9.0} until={9.9} />
    <Flag text="Numbering wrong" x={120} y={600} tx={520} ty={740} at={9.2} until={9.9} />
    <Flag text="Table shifted" x={1440} y={820} tx={1250} ty={930} at={9.4} until={9.9} />
    <Notif title="Partner · Before the meeting" at={11.4} until={17.0} big={k(t, [12.4, 12.9], [0, 1], INOUT)}
      body={<>Please update the <b style={{color: t > 13.4 ? ICE : '#fff'}}>model</b> and the <b style={{color: t > 14.4 ? ICE : '#fff'}}>board deck</b> to match, before the meeting.</>} />
    <Label at={6.8} until={17} /><Grade />
  </Scene>;
};
export const S3 = () => {   // 17.2–23.4 · "So you ask it for the deck… and it builds one, in the chat." "Then one number changes."
  const t = useT(), ring = t > 21.9;
  const z = k(t, [17.2, 18.6], [1.15, 1.0], INOUT) + k(t, [21.7, 22.6], [0, 0.55], INOUT);
  return <Scene from={17.2} to={23.4}>
    <Night />
    <Lens z={z} fx={k(t, [21.7, 22.6], [960, 640], INOUT)} fy={k(t, [21.7, 22.6], [540, 520], INOUT)}><Chat phase="deck" /></Lens>
    <Notif title="Partner" at={21.8} until={23.3} body={<>Revenue is now <b style={{color: '#fff'}}>€74.6m</b>, not €71–73m. Fix slide 2.</>} />
    {ring && <Ring x={1060} y={200} w={260} h={130} at={22.55} until={23.2} />}
    <Label at={17.3} until={23.2} /><Grade />
  </Scene>;
};
export const S4 = () => {   // 23.4–28.4 · "Prompt again. Wait again. Five minutes… for one number."
  const t = useT(), lapse = k(t, [25.1, 26.0], [0, 1]) * (1 - k(t, [27.7, 28.2], [0, 1]));
  const z = k(t, [23.4, 24.6], [1.2, 1.05], INOUT) - 0.06 * lapse + k(t, [27.6, 28.3], [0, 0.4], INOUT);
  return <Scene from={23.4} to={28.4}>
    <Night warm={lapse} />
    <Lens z={z} fx={960} fy={k(t, [23.4, 24.6], [800, 600], INOUT)}><div style={{filter: `brightness(${1 - 0.2 * lapse})`}}><Chat phase="regen" /></div></Lens>
    <Clock from={41} to={46} a={25.1} b={27.4} at={24.9} until={28.2} />
    <Title text="Five minutes. For one number." hi={['one', 'number.']} at={26.0} until={28.1} y={930} size={64} />
    <Label at={23.5} until={28.2} /><Grade />
  </Scene>;
};
export const S5 = () => {   // 28.4–33.0 · "Five tabs. Copy. Paste. Check. Repeat." → overload → cut to black
  const t = useT(), B = [29.0, 29.4, 29.8, 30.2, 30.7], idx = B.reduce((a, b, i) => (t >= b ? i : a), -1);
  const wins = [<Chat key="c" phase="regen" />, <Word key="w" broken={0} fixed={3} />, <Excel key="x" />, <Ppt key="p" />, <Pdf key="d" />];
  const tabs = ['AI chat', 'Board_Memo_Q3.docx', 'FY26_Model.xlsx', 'Board_Presentation.pptx', 'Lender_Covenant_Pack.pdf'];
  const tabC = ['#555', '#185ABD', '#107C41', '#C43E1C', '#B30B00'];
  const chaos = k(t, [31.3, 32.6], [0, 1]), cur = Math.max(0, idx), wp = idx >= 0 ? k(t, [B[idx], B[idx] + 0.18], [1, 0]) : 0;
  if (t >= 32.6) return null;
  return <Scene from={28.4} to={32.6}>
    <Night warm={1} />
    {t < 31.3 ? <Lens z={1.04} fx={960 + wp * 260} fy={560}><div style={{filter: `blur(${wp * 14}px)`}}>{t < B[0] ? wins[1] : wins[[1, 2, 3, 4, 0][cur]]}</div></Lens>
      : <Cam3 z={k(t, [31.3, 32.6], [-200, 200])} ry={k(t, [31.3, 32.6], [-8, 8])} rx={4} shake={10 * chaos}>
        {[2, 3, 4, 1, 0, 2, 3].map((w, i) => { const p = k(t, [31.3 + i * 0.1, 31.5 + i * 0.1], [0, 1]);
          return <div key={i} style={{position: 'absolute', inset: 0, opacity: p, transform: `translate(${((i * 337) % 900) - 450}px, ${((i * 191) % 500) - 250}px) translateZ(${-i * 120}px) scale(.55) rotate(${((i * 37) % 9) - 4}deg)`}}>{wins[w]}</div>; })}
      </Cam3>}
    <div style={{position: 'absolute', left: 110, right: 110, top: 10, display: 'flex', gap: 8, fontFamily: UI, opacity: t < 31.3 ? 1 : 0}}>
      {tabs.map((n, i) => { const p = k(t, [28.6 + i * 0.12, 28.85 + i * 0.12], [0, 1]), on = [1, 2, 3, 4, 0][cur] === i;
        return <div key={n} style={{flex: 1, padding: '10px 14px', borderRadius: '12px 12px 0 0', background: on ? '#fff' : 'rgba(255,255,255,.55)', fontSize: 17, fontWeight: 700, color: '#222', opacity: p,
          display: 'flex', gap: 8, alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden'}}><span style={{width: 14, height: 14, borderRadius: 3, background: tabC[i], flex: 'none'}} />{n}</div>; })}</div>
    <Hi text="Copy." at={29.4} /><Hi text="Paste." at={29.8} /><Hi text="Check." at={30.2} /><Hi text="Repeat." at={30.7} />
    {['Meeting in 5 min', 'Client: any update?', 'Partner: ETA?', '3 new comments'].map((n, i) => <Notif key={n} title={n} body="" at={31.4 + i * 0.2} until={32.5} />).map((el, i) =>
      <div key={i} style={{position: 'absolute', inset: 0, transform: `translateY(${i * 96}px)`}}>{el}</div>)}
    <Clock from={52} to={59} a={31.3} b={32.4} at={31.3} until={32.6} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(120,0,0,.4) 100%)', opacity: chaos}} />
    <Label at={28.5} until={31.3} /><Grade />
  </Scene>;
};
const S6 = () => {   // 32.6–35.4 · hard cut to black, "What if AI could finish the work?"
  const t = useT();
  return <Scene from={32.6} to={35.4}>
    <AbsoluteFill style={{background: '#000'}} />
    <AbsoluteFill style={{background: 'radial-gradient(900px 500px at 50% 48%, rgba(60,170,195,.18), transparent 70%)', opacity: k(t, [33.8, 34.8], [0, 1])}} />
    <AbsoluteFill style={{transform: `scale(${k(t, [32.6, 35.4], [0.97, 1.03])})`, fontFamily: UI}}>
      <Title text="What if AI could finish the work?" hi={['finish', 'the', 'work?']} at={33.0} until={35.0} y={470} size={104} /></AbsoluteFill>
    <Grade />
  </Scene>;
};

export const Hook28: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useState(() => {
    Promise.all([
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Regular.ttf')})`, {weight: '400'}).load(),
      new FontFace('Inter', `url(${staticFile('fonts/Inter-Bold.ttf')})`, {weight: '700'}).load(),
    ]).then((faces) => { faces.forEach((f) => (document.fonts as any).add(f)); continueRender(handle); });
    return null;
  });
  return <AbsoluteFill style={{fontFamily: UI, background: '#000'}}><S1 /><S2 /><S3 /><S4 /><S5 /><S6 /></AbsoluteFill>;
};
