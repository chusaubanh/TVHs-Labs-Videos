import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Label, useBeats, useLayout, useSceneText } from "../../kit/scene-context";

export const C = { bg: "#0C0C0C", panel: "#1E1F23", line: "#6E7179", paper: "#F1E8D6", white: "#EDEDED", gold: "#C5A059", light: "#E0C286", red: "#EB7269", ink: "#22242A" };
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const mix = (a: number, b: number, v: number) => a + (b - a) * v;
export function useArt() {
  const f = useCurrentFrame(); const { fps } = useVideoConfig(); const { starts, ends, active, at } = useBeats();
  const layout = useLayout();
  const W = layout.landscape ? 160 : 100;
  const H = W * layout.height / layout.width;
  const sx = W / 100; const sy = H / 125;
  const t = (i: number, fraction = 0, frames = 18) => interpolate(f - at(i, fraction), [0, frames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const p = (i: number, fraction = 0) => spring({ frame: f - at(i, fraction), fps, config: { damping: 18, mass: 0.65, stiffness: 130 } });
  return { f, active, starts, ends, at, t, p, W, H, sx, sy, landscape: layout.landscape };
}
export const G: React.FC<{x?: number;y?: number;s?: number;r?: number;o?: number;children?: React.ReactNode}> = ({x=0,y=0,s=1,r=0,o=1,children}) => <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={clamp(o)}>{children}</g>;
/** Layout dùng kích thước Composition; tranh riêng của Bài 4, không dùng Stage 1080 cố định của bài cũ. */
export const Stage: React.FC<{children?:React.ReactNode;overlay?:React.ReactNode}> = ({children,overlay}) => {
  const {W,H,sx,sy,landscape,f} = useArt();
  const {width} = useLayout();
  const grid = Math.max(24, Math.round(width/18));
  const gridX = Math.floor(f/4)%grid; const gridY = Math.floor(f/6)%grid;
  // Khổ ngang dùng vùng tranh rộng hơn và nhãn hai bên; khổ 4:5 đã chọn dùng một trục dọc.
  return <AbsoluteFill style={{background:C.bg,overflow:"hidden"}}>
    <AbsoluteFill style={{background:"radial-gradient(ellipse 78% 68% at 50% 50%, rgba(197,160,89,.25) 0%, rgba(197,160,89,.09) 48%, rgba(197,160,89,0) 100%)"}} />
    {/* Nền vàng và lưới chạy theo frame; không timer, không randomness. Dịch nguyên pixel để giữ hash. */}
    <AbsoluteFill style={{backgroundImage:"linear-gradient(rgba(197,160,89,.12) 1px, transparent 1px),linear-gradient(90deg, rgba(197,160,89,.12) 1px, transparent 1px)",backgroundSize:`${grid}px ${grid}px`,backgroundPosition:`${gridX}px ${gridY}px`,maskImage:"radial-gradient(ellipse 95% 80% at 50% 50%, #000 10%, rgba(0,0,0,.28) 100%)"}} />
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{position:"absolute",inset:0}}>
      <g transform={landscape ? `translate(${W*0.08} 0) scale(${sx*0.84} ${sy})` : `scale(${sx} ${sy})`}>{children}</g>
    </svg>
    {overlay}
  </AbsoluteFill>;
};
export const Tag: React.FC<{i:number;x:number;y:number;show?:number;size?:number;hot?:boolean;plain?:boolean}> = ({i,x,y,show=1,size=3.7,hot=false,plain=false}) => {
  const { width, height, landscape } = useLayout();
  const { hideText } = useSceneText();
  if (hideText) return null;
  const actualX=landscape ? 8+x*.84 : x;
  return <div style={{position:"absolute",left:`${actualX}%`,top:`${y/125*100}%`,transform:`translate(-50%, -50%) translateY(${(1-clamp(show))*height*.012}px)`,opacity:clamp(show),fontSize:width/100*size*(landscape?.72:1),fontWeight:650,lineHeight:1.4,color:plain?C.paper:hot?C.red:C.light,background:plain?"transparent":"rgba(12,12,12,.94)",padding:`${width*.004}px ${width*.012}px`,borderRadius:width*.012,whiteSpace:"nowrap"}}><Label i={i}/></div>;
};
export const Stroke: React.FC<{d:string;color?:string;w?:number;p?:number;dash?:boolean}> = ({d,color=C.gold,w=.65,p=1,dash=false}) => p<=0 ? null : <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={dash?"1 1":1} strokeDashoffset={dash?0:1-clamp(p)} opacity={dash?clamp(p):1}/>;
export const Arrow: React.FC<{x1:number;y1:number;x2:number;y2:number;p?:number;color?:string}> = ({x1,y1,x2,y2,p=1,color=C.gold}) => {
  if (p<=0) return null;
  const x=mix(x1,x2,clamp(p)), y=mix(y1,y2,clamp(p)); const angle=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
  return <g><Stroke d={`M${x1} ${y1} L${x} ${y}`} color={color} w={.8}/><G x={x} y={y} r={angle} o={p}><path d="M-2 -1.8 L0 0 L-2 1.8" fill="none" stroke={color} strokeWidth={.8} strokeLinecap="round"/></G></g>;
};
export const Tick: React.FC<{p?:number;color?:string}> = ({p=1,color=C.gold}) => <Stroke d="M-2.4 0 L-.5 2 L3.8 -3" w={1.1} color={color} p={p}/>;
export const Cross: React.FC<{p?:number}> = ({p=1}) => <g><Stroke d="M-2 -2 L2 2" color={C.red} p={p}/><Stroke d="M-2 2 L2 -2" color={C.red} p={p}/></g>;
export const Rules: React.FC<{x:number;y:number;w:number;n?:number;gap?:number;color?:string}> = ({x,y,w,n=5,gap=3,color=C.line}) => <g>{Array.from({length:n},(_,i)=><rect key={i} x={x} y={y+i*gap} width={w*(i%3===2?.62:i%3===1?.84:1)} height={.65} rx={.32} fill={color}/>)}</g>;
export const Paper: React.FC<{w?:number;h?:number;rows?:number;marked?:number;clean?:boolean;missing?:number;before?:boolean}> = ({w=34,h=54,rows=5,marked=-1,clean=false,missing=-1,before=false}) => <g>
  <rect x={-w/2+1.1} y={-h/2+1.4} width={w} height={h} rx={2.2} fill="#000" opacity={.32}/>
  <rect x={-w/2} y={-h/2} width={w} height={h} rx={2.2} fill={C.paper}/>
  <path d={`M${-w/2+3} ${-h/2+6} H${w/2-3}`} stroke={C.gold} strokeWidth={1.2}/>
  {Array.from({length:rows},(_,i)=>{
    const rowH=(h-13)/rows; const y=-h/2+10+i*rowH;
    return <g key={i} opacity={missing===i?.4:1}>
      {marked===i&&<rect x={-w/2+2} y={y-2} width={w-4} height={rowH-.8} rx={1} fill={C.gold} opacity={.4}/>}
      <circle cx={-w/2+4} cy={y+.3} r={.9} fill={marked===i?C.ink:C.gold}/>
      <Rules x={-w/2+7} y={y} w={w-11} n={2} gap={2} color={before&&i===2?C.red:C.line}/>
      {clean&&i===1&&<rect x={-w/2+6} y={y-.4} width={w*.54} height={4} rx={.5} fill={C.ink}/>}
      {missing===i&&<path d={`M${-w/2+7} ${y+1} H${w/2-4}`} stroke={C.paper} strokeWidth={5}/>}
    </g>;
  })}
  <path d={`M${w/2-7} ${h/2-4} H${w/2-3}`} stroke={C.gold} strokeWidth={.7}/>
</g>;
export const Window: React.FC<{w?:number;h?:number;children?:React.ReactNode;old?:boolean}> = ({w=40,h=50,children,old=false}) => <g>
  <rect x={-w/2} y={-h/2} width={w} height={h} rx={2.8} fill={C.panel} stroke={old?C.line:C.gold} strokeWidth={.65}/>
  <path d={`M${-w/2} ${-h/2+6} H${w/2}`} stroke={C.line} strokeWidth={.5}/>
  {[0,1,2].map(i=><circle key={i} cx={-w/2+3+i*2.6} cy={-h/2+3} r={.65} fill={i===0?C.gold:C.line}/>)}
  <rect x={-w/2+3} y={h/2-7} width={w-6} height={4} rx={1.5} fill={C.bg} stroke={C.line} strokeWidth={.35}/>
  <path d={`M${w/2-7} ${h/2-5} h1.5 m-.7 -.7 l.7 .7 -.7 .7`} stroke={C.gold} strokeWidth={.5} fill="none"/>
  {children}
</g>;
export const Bubble: React.FC<{w?:number;h?:number;hot?:boolean;done?:boolean}> = ({w=23,h=13,hot=false,done=false}) => <g>
  <rect x={-w/2} y={-h/2} width={w} height={h} rx={2} fill={hot?C.red:C.gold}/>
  <path d={`M${-w/2+3} ${h/2-1} v4 l5 -4`} fill={hot?C.red:C.gold}/>
  {done?<G s={1.3}><Tick color={C.ink}/></G>:<Rules x={-w/2+3} y={-h/2+3} w={w-6} n={2} gap={2.7} color={C.ink}/>}
</g>;
export const Lens: React.FC<{r?:number;hot?:boolean}> = ({r=10,hot=false}) => <g>
  <path d={`M${r*.68} ${r*.68} L${r*1.5} ${r*1.5}`} stroke={C.ink} strokeWidth={4.4} strokeLinecap="round"/>
  <path d={`M${r*.68} ${r*.68} L${r*1.5} ${r*1.5}`} stroke={C.gold} strokeWidth={2.4} strokeLinecap="round"/>
  <circle r={r} fill="rgba(197,160,89,.07)" stroke={C.ink} strokeWidth={2.3}/>
  <circle r={r} fill="none" stroke={hot?C.red:C.gold} strokeWidth={1.2}/>
  <path d={`M${-r*.65} ${-r*.2} Q${-r*.5} ${-r*.7} 0 ${-r*.72}`} stroke={C.paper} strokeWidth={.6} fill="none"/>
</g>;
export const Hand: React.FC<{pen?:boolean}> = ({pen=false}) => <g>
  <path d="M-1 13 L-4 6 Q-5 3 -3 2 L0 5 L0 -5 Q0 -8 2 -8 Q4 -8 4 -5 L4 0 Q6 -3 8 0 Q10 -2 11 2 Q14 0 14 4 L13 12 L9 17 L1 17 Z" fill={C.paper} stroke={C.ink} strokeWidth={.65} strokeLinejoin="round"/>
  <path d="M0 5 L3 8 M5 2 v5 M9 2 v5" fill="none" stroke={C.line} strokeWidth={.5}/>
  <rect x={-1} y={15} width={12} height={5} rx={1} fill={C.gold} stroke={C.ink} strokeWidth={.5}/>
  {pen&&<G x={-1} y={3} r={25}><rect x={-1} y={-13} width={2} height={21} rx={.6} fill={C.gold}/><path d="M-1 8 L0 12 L1 8" fill={C.ink}/></G>}
</g>;
export const Clip: React.FC = () => <g><path d="M-3 2 v-8 q0 -4 4 -4 q4 0 4 4 v9 q0 3 -3 3 q-3 0 -3 -3 v-8" fill="none" stroke={C.gold} strokeWidth={1.1}/></g>;
export const Criteria: React.FC<{checked?:boolean;w?:number}> = ({checked=false,w=30}) => <g>
  <rect x={-w/2} y={-13} width={w} height={26} rx={2} fill={C.panel} stroke={C.gold} strokeWidth={.6}/>
  {[0,1,2].map(i=><G key={i} x={-w/2+5} y={-7+i*7}>
    <rect x={-2.1} y={-2.1} width={4.2} height={4.2} rx={.6} stroke={C.gold} strokeWidth={.5} fill="none"/>
    {checked&&<G s={.65}><Tick/></G>}
    <rect x={5} y={-.5} width={w-13} height={.7} rx={.3} fill={C.paper}/>
  </G>)}
</g>;