import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type HanziPoetryProps = {
  audioSrc?: string;
};

type SceneKind =
  | 'split-static'
  | 'split-steady'
  | 'split-busy'
  | 'near-poor'
  | 'fame-profit'
  | 'gain-loss'
  | 'cause-effect'
  | 'flower-fall'
  | 'right-wrong'
  | 'heart-lock'
  | 'smile-release'
  | 'half-life'
  | 'bitter-joy'
  | 'self'
  | 'sorrow'
  | 'thoughts'
  | 'no-force';

type Segment = {
  start: number;
  end: number;
  lyric: string;
  kind: SceneKind;
};

export const SEGMENTS: Segment[] = [
  {start: 0.0, end: 2.4, lyric: '静字有个争', kind: 'split-static'},
  {start: 2.4, end: 4.8, lyric: '稳字有个急', kind: 'split-steady'},
  {start: 4.8, end: 6.8, lyric: '争时要静', kind: 'split-static'},
  {start: 6.8, end: 9.0, lyric: '急时稳住心', kind: 'split-steady'},
  {start: 9.0, end: 11.4, lyric: '忙里有个亡', kind: 'split-busy'},
  {start: 11.4, end: 13.8, lyric: '贪字近于贫', kind: 'near-poor'},
  {start: 13.8, end: 16.0, lyric: '看淡名利', kind: 'fame-profit'},
  {start: 16.0, end: 18.2, lyric: '得失要宽心', kind: 'gain-loss'},
  {start: 18.2, end: 20.8, lyric: '一念一因果', kind: 'cause-effect'},
  {start: 20.8, end: 23.2, lyric: '一叹一花落', kind: 'flower-fall'},
  {start: 23.2, end: 25.8, lyric: '世间本无对错', kind: 'right-wrong'},
  {start: 25.8, end: 28.3, lyric: '何必把心锁', kind: 'heart-lock'},
  {start: 28.3, end: 30.5, lyric: '一笑一洒脱', kind: 'smile-release'},
  {start: 30.5, end: 33.0, lyric: '半生就匆匆过', kind: 'half-life'},
  {start: 33.0, end: 35.6, lyric: '尝遍人间苦乐', kind: 'bitter-joy'},
  {start: 35.6, end: 38.0, lyric: '方知我是我', kind: 'self'},
  {start: 38.0, end: 40.6, lyric: '愁字心上秋', kind: 'sorrow'},
  {start: 40.6, end: 43.0, lyric: '思绪惹烦忧', kind: 'thoughts'},
  {start: 43.0, end: 45.2, lyric: '命里无时', kind: 'no-force'},
  {start: 45.2, end: 48.0, lyric: '莫须强求', kind: 'no-force'},
];

export const HANZI_DURATION_SECONDS = SEGMENTS[SEGMENTS.length - 1].end;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => {
  const t = clamp01(n);
  return t * t * (3 - 2 * t);
};

const paper = '#f3efe5';
const ink = '#1d2526';
const muted = '#7e8078';
const cinnabar = '#a94d38';
const moss = '#5c6f63';
const gold = '#a68143';

const calligraphy: React.CSSProperties = {
  fontFamily: '"STKaiti", "KaiTi", "FangSong", "Noto Serif CJK SC", serif',
  color: ink,
  fontWeight: 600,
};

const Char: React.FC<{
  children: React.ReactNode;
  size?: number;
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  color?: string;
  blur?: number;
}> = ({children, size = 330, x = 0, y = 0, opacity = 1, scale = 1, rotate = 0, color = ink, blur = 0}) => (
  <div
    style={{
      ...calligraphy,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
      transformOrigin: 'center',
      fontSize: size,
      lineHeight: 1,
      opacity,
      color,
      filter: blur ? `blur(${blur}px)` : undefined,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const InkRing: React.FC<{progress: number; radius?: number; opacity?: number}> = ({progress, radius = 360, opacity = 0.2}) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: radius * 2,
      height: radius * 2,
      borderRadius: '50%',
      border: `3px solid ${ink}`,
      opacity: opacity * (1 - progress * 0.55),
      transform: `translate(-50%, -50%) scale(${0.45 + progress * 0.8})`,
    }}
  />
);

const Base: React.FC<{children: React.ReactNode; lyric: string; local: number}> = ({children, lyric, local}) => (
  <AbsoluteFill style={{backgroundColor: paper, overflow: 'hidden'}}>
    <AbsoluteFill
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 15%, rgba(39,35,28,.055) 0 1px, transparent 1.5px), radial-gradient(circle at 75% 70%, rgba(39,35,28,.045) 0 1px, transparent 1.4px)',
        backgroundSize: '34px 34px, 41px 41px',
        opacity: 0.8,
      }}
    />
    <div style={{position: 'absolute', inset: 0, opacity: 0.06, background: 'linear-gradient(145deg, transparent 10%, #6e624e 50%, transparent 90%)'}} />
    {children}
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        bottom: 120,
        textAlign: 'center',
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
        fontSize: 52,
        letterSpacing: 5,
        color: ink,
        opacity: ease(Math.min(local / 0.28, (1 - local) / 0.15)),
      }}
    >
      {lyric}
    </div>
    <div style={{position: 'absolute', left: 72, top: 86, fontFamily: 'serif', fontSize: 24, letterSpacing: 8, color: muted}}>一字 · 一心</div>
  </AbsoluteFill>
);

const SplitStatic: React.FC<{p: number}> = ({p}) => {
  const split = ease((p - 0.18) / 0.38);
  const returnP = ease((p - 0.7) / 0.28);
  const q = split * (1 - returnP);
  const shake = Math.sin(p * Math.PI * 30) * 7 * q;
  return <>
    <InkRing progress={p} />
    <Char opacity={1 - q} scale={1 + q * 0.06}>静</Char>
    <Char x={-210 * q} opacity={q} color={moss}>青</Char>
    <Char x={210 * q + shake} opacity={q} color={cinnabar}>争</Char>
    {q > 0.25 && Array.from({length: 10}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: `${13 + ((i * 37) % 73)}%`, top: `${24 + ((i * 19) % 50)}%`, width: 3, height: 80 + (i % 4) * 35, background: cinnabar, opacity: 0.08 + 0.1 * q, transform: `rotate(${(i % 2 ? 1 : -1) * (8 + i)}deg)`}} />
    ))}
  </>;
};

const SplitSteady: React.FC<{p: number}> = ({p}) => {
  const split = ease((p - 0.12) / 0.36);
  const returnP = ease((p - 0.72) / 0.24);
  const q = split * (1 - returnP);
  const jitter = Math.sin(p * Math.PI * 44) * 16 * q;
  return <>
    <div style={{position: 'absolute', left: '50%', top: '67%', width: 560, height: 4, transform: 'translateX(-50%)', background: ink, opacity: 0.18}} />
    <Char opacity={1 - q}>稳</Char>
    <Char x={-210 * q} y={20 * q} opacity={q} color={moss}>禾</Char>
    <Char x={210 * q + jitter} y={-10 * q} opacity={q} color={cinnabar}>急</Char>
    <div style={{position: 'absolute', left: '50%', top: '64%', width: 5, height: 150 * q, background: moss, opacity: 0.28, transform: 'translateX(-50%)'}} />
  </>;
};

const SplitBusy: React.FC<{p: number}> = ({p}) => {
  const split = ease((p - 0.18) / 0.36);
  const returnP = ease((p - 0.73) / 0.2);
  const q = split * (1 - returnP);
  const spin = 220 * p;
  return <>
    {Array.from({length: 14}).map((_, i) => {
      const a = (i / 14) * Math.PI * 2 + spin * Math.PI / 180;
      const r = 330 + (i % 3) * 48;
      return <div key={i} style={{position:'absolute', left:540 + Math.cos(a) * r, top:860 + Math.sin(a) * r, width: 12, height: 12, borderRadius:'50%', background:i%3===0?cinnabar:ink, opacity:0.12 + 0.1*q}}/>;
    })}
    <Char opacity={1 - q}>忙</Char>
    <Char x={-190 * q} opacity={q} color={moss}>忄</Char>
    <Char x={145 * q} opacity={q} color={cinnabar}>亡</Char>
  </>;
};

const NearPoor: React.FC<{p: number}> = ({p}) => {
  const q = ease((p - 0.12) / 0.5);
  const fall = ease((p - 0.55) / 0.4);
  return <>
    <Char x={-210 + 150 * q} y={-80} size={300} color={cinnabar}>贪</Char>
    <Char x={210 - 150 * q} y={120} size={300} color={gold}>贫</Char>
    <Char y={390 - 80 * q} size={120} color={muted} opacity={0.65}>贝</Char>
    {Array.from({length: 8}).map((_, i) => (
      <div key={i} style={{position:'absolute', left:420 + i*34, top:1180 + fall*(200+i*18), width:20, height:20, borderRadius:'50%', border:`2px solid ${gold}`, opacity:0.45*(1-fall)}} />
    ))}
  </>;
};

const FameProfit: React.FC<{p: number}> = ({p}) => {
  const drift = ease((p - 0.18) / 0.66);
  return <>
    <Char x={-160 - 260 * drift} y={-40 - 120 * drift} rotate={-8*drift} opacity={1-drift*0.85} color={gold}>名</Char>
    <Char x={160 + 260 * drift} y={80 + 130 * drift} rotate={9*drift} opacity={1-drift*0.85} color={cinnabar}>利</Char>
    <Char y={40} size={115} opacity={ease((p-.5)/.3)} color={moss}>淡</Char>
  </>;
};

const GainLoss: React.FC<{p: number}> = ({p}) => {
  const settle = ease((p - 0.15) / 0.62);
  return <>
    <div style={{position:'absolute', left:'50%', top:'50%', width:640, height:8, background:ink, opacity:.22, transform:`translate(-50%,-50%) rotate(${8*(1-settle)}deg)`}}/>
    <Char x={-230} y={-60*(1-settle)} size={260} color={gold}>得</Char>
    <Char x={230} y={60*(1-settle)} size={260} color={cinnabar}>失</Char>
    <Char y={330} size={105} opacity={settle} color={moss}>宽心</Char>
  </>;
};

const CauseEffect: React.FC<{p: number}> = ({p}) => {
  const seed = ease((p - 0.08) / 0.22);
  const root = ease((p - 0.26) / 0.34);
  const fruit = ease((p - 0.58) / 0.3);
  return <>
    <Char y={-420} size={180} opacity={1-seed*.5}>念</Char>
    <div style={{position:'absolute', left:'50%', top:820+seed*220, width:26, height:26, borderRadius:'50%', background:ink, transform:'translate(-50%,-50%)', opacity:seed}}/>
    <div style={{position:'absolute', left:'50%', top:1070, width:5, height:320*root, background:moss, opacity:.42, transform:'translateX(-50%)', transformOrigin:'top'}}/>
    <Char x={-210} y={320} size={190} opacity={root} color={moss}>因</Char>
    <Char x={210} y={-20} size={210} opacity={fruit} scale={.7+.3*fruit} color={gold}>果</Char>
  </>;
};

const FlowerFall: React.FC<{p: number}> = ({p}) => {
  const y = -470 + 980 * ease(p);
  const x = Math.sin(p*Math.PI*3)*90;
  return <>
    <Char x={-280} y={40} size={220} opacity={.18 + .32*(1-p)} color={muted}>叹</Char>
    <div style={{position:'absolute', left:`calc(50% + ${x}px)`, top:`calc(50% + ${y}px)`, width:88, height:60, borderRadius:'70% 15% 70% 15%', background:cinnabar, opacity:.55, transform:`translate(-50%,-50%) rotate(${p*280}deg)`}}/>
    <div style={{position:'absolute', left:'50%', top:'76%', width:520+280*p, height:170+90*p, borderRadius:'50%', border:`3px solid ${ink}`, opacity:.18*(1-p), transform:'translate(-50%,-50%)'}}/>
  </>;
};

const RightWrong: React.FC<{p: number}> = ({p}) => {
  const swap = ease((p - .18)/.58);
  return <>
    <Char x={-220 + 440*swap} y={-30} size={260} color={moss}>对</Char>
    <Char x={220 - 440*swap} y={30} size={260} color={cinnabar}>错</Char>
    <div style={{position:'absolute', left:'50%', top:'65%', width:540, height:2, background:ink, opacity:.14, transform:'translateX(-50%)'}}/>
  </>;
};

const HeartLock: React.FC<{p: number}> = ({p}) => {
  const lock = ease((p-.08)/.42);
  const open = ease((p-.58)/.32);
  const q = lock*(1-open);
  return <>
    <Char size={280} scale={1-.24*q} color={cinnabar}>心</Char>
    <div style={{position:'absolute', left:'50%', top:'50%', width:420, height:420, border:`14px solid ${ink}`, borderRadius:48, transform:`translate(-50%,-50%) scale(${.65+.35*q}) rotate(${open*5}deg)`, opacity:.5*q}}/>
    <div style={{position:'absolute', left:'50%', top:'29%', width:230, height:210, border:`14px solid ${ink}`, borderBottom:0, borderRadius:'130px 130px 0 0', transform:`translateX(-50%) translateY(${-open*170}px) rotate(${open*16}deg)`, transformOrigin:'left bottom', opacity:.5*q}}/>
  </>;
};

const SmileRelease: React.FC<{p: number}> = ({p}) => {
  const release = ease((p-.18)/.65);
  return <>
    <Char x={-150-180*release} y={-70} size={220} opacity={1-release*.8}>笑</Char>
    <Char x={160+210*release} y={90} size={220} opacity={1-release*.8} color={moss}>洒脱</Char>
    <InkRing progress={release} radius={260} opacity={.28}/>
  </>;
};

const HalfLife: React.FC<{p: number}> = ({p}) => {
  const seasons = ['春','夏','秋','冬'];
  return <>
    {seasons.map((s,i)=>{
      const center=i/(seasons.length-1);
      const d=Math.abs(p-center);
      const op=Math.max(0,1-d*5);
      return <Char key={s} size={270} opacity={op} color={i===2?gold:i===3?muted:moss}>{s}</Char>;
    })}
    <div style={{position:'absolute', left:110, right:110, top:'60%', height:3, background:ink, opacity:.16}}>
      <div style={{height:'100%', width:`${p*100}%`, background:cinnabar, opacity:.55}}/>
    </div>
  </>;
};

const BitterJoy: React.FC<{p: number}> = ({p}) => {
  const swap = ease((p-.18)/.58);
  return <>
    <Char x={-190+100*swap} y={50} size={300} color={cinnabar} opacity={1-.25*swap}>苦</Char>
    <Char x={190-100*swap} y={-40} size={300} color={gold} opacity={.55+.45*swap}>乐</Char>
    <div style={{position:'absolute', left:'50%', top:'50%', width:2, height:520, background:ink, opacity:.12, transform:'translate(-50%,-50%)'}}/>
  </>;
};

const SelfScene: React.FC<{p: number}> = ({p}) => {
  const vanish=ease((p-.16)/.55);
  const words=['名','利','得','失','争','急','忙','贪','愁'];
  return <>
    {words.map((w,i)=>{
      const a=(i/words.length)*Math.PI*2;
      const r=230+vanish*470;
      return <Char key={w} x={Math.cos(a)*r} y={Math.sin(a)*r} size={95} opacity={(1-vanish)*.5} rotate={(i-4)*3}>{w}</Char>;
    })}
    <Char size={360} scale={.72+.28*ease((p-.38)/.36)} color={ink}>我</Char>
    <Char size={360} scale={1.35-.35*ease((p-.38)/.36)} opacity={.22*(1-ease((p-.4)/.35))} color={cinnabar}>我</Char>
  </>;
};

const Sorrow: React.FC<{p: number}> = ({p}) => {
  const fall=ease((p-.12)/.46);
  const merge=ease((p-.58)/.3);
  return <>
    <Char y={170-150*merge} size={250} opacity={1-merge} color={cinnabar}>心</Char>
    <Char y={-300+310*fall+140*merge} size={250} opacity={1-merge} color={gold}>秋</Char>
    <Char size={360} opacity={merge} scale={.82+.18*merge}>愁</Char>
    {Array.from({length:7}).map((_,i)=><div key={i} style={{position:'absolute', left:160+i*125, top:420+i*65, width:55, height:35, borderRadius:'70% 15% 70% 15%', background:gold, opacity:.1+.12*fall, transform:`rotate(${i*33}deg) translateY(${fall*180}px)`}}/>)}
  </>;
};

const Thoughts: React.FC<{p: number}> = ({p}) => {
  return <>
    <Char size={330} color={ink}>愁</Char>
    {Array.from({length:8}).map((_,i)=>{
      const r=180+i*32;
      const a=p*Math.PI*(1.5+i*.1)+i;
      return <div key={i} style={{position:'absolute', left:540+Math.cos(a)*r, top:930+Math.sin(a)*r, width:70+i*10, height:2, background:i%2?cinnabar:ink, opacity:.12+.07*Math.sin(p*Math.PI), transform:`rotate(${a}rad)`}}/>;
    })}
  </>;
};

const NoForce: React.FC<{p: number}> = ({p}) => {
  const open=ease((p-.3)/.45);
  return <>
    <div style={{position:'absolute', left:'50%', top:'50%', width:220, height:140, borderRadius:'85% 20% 85% 20%', background:gold, opacity:.38, transform:`translate(-50%,-50%) translateY(${-120*open}px) rotate(${25+180*open}deg)`}}/>
    <div style={{position:'absolute', left:'50%', top:'61%', width:250, height:110, borderRadius:'50% 50% 45% 45%', border:`8px solid ${ink}`, borderTop:0, opacity:.18*(1-open), transform:'translateX(-50%)'}}/>
    <Char y={360} size={110} opacity={ease((p-.52)/.28)} color={muted}>松手，风自来</Char>
  </>;
};

const Scene: React.FC<{kind:SceneKind; p:number}> = ({kind,p}) => {
  switch(kind){
    case 'split-static': return <SplitStatic p={p}/>;
    case 'split-steady': return <SplitSteady p={p}/>;
    case 'split-busy': return <SplitBusy p={p}/>;
    case 'near-poor': return <NearPoor p={p}/>;
    case 'fame-profit': return <FameProfit p={p}/>;
    case 'gain-loss': return <GainLoss p={p}/>;
    case 'cause-effect': return <CauseEffect p={p}/>;
    case 'flower-fall': return <FlowerFall p={p}/>;
    case 'right-wrong': return <RightWrong p={p}/>;
    case 'heart-lock': return <HeartLock p={p}/>;
    case 'smile-release': return <SmileRelease p={p}/>;
    case 'half-life': return <HalfLife p={p}/>;
    case 'bitter-joy': return <BitterJoy p={p}/>;
    case 'self': return <SelfScene p={p}/>;
    case 'sorrow': return <Sorrow p={p}/>;
    case 'thoughts': return <Thoughts p={p}/>;
    case 'no-force': return <NoForce p={p}/>;
  }
};

export const HanziPoetry: React.FC<HanziPoetryProps> = ({audioSrc = ''}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const seg = SEGMENTS.find((s) => t >= s.start && t < s.end) ?? SEGMENTS[SEGMENTS.length - 1];
  const p = clamp01((t - seg.start) / (seg.end - seg.start));
  return (
    <Base lyric={seg.lyric} local={p}>
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      <Scene kind={seg.kind} p={p}/>
    </Base>
  );
};
