import React from "react";
import { Label, useLayout, useSceneText } from "../../kit/scene-context";
import { Arrow, G, Stage, useArt } from "../bai-4-harness/art";
import { EL, GOLD, GOLDL, HOV, INK, PAPER, SEC, SURF, TXT } from "../shared/art";

export { Arrow, EL, G, GOLD, GOLDL, HOV, INK, PAPER, SEC, SURF, Stage, TXT, useArt };
export const ERROR = "#f06558";
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

export const Caption: React.FC<{i:number; x?:number; y?:number; hot?:boolean}> = ({i,x=50,y=22,hot=false}) => {
  const {width,height,landscape}=useLayout();
  const {hideText}=useSceneText();
  if (hideText) return null;
  const unit=Math.min(width/100,height/125);
  return <Label i={i} style={{
    position:"absolute",left:`${landscape?8+.84*x:x}%`,top:`${y/125*100}%`,
    transform:"translate(-50%, -50%)",whiteSpace:"nowrap",
    background:hot?"#762c25":GOLDL,color:hot?TXT:INK,borderRadius:2*unit,
    padding:`${.42*unit}px ${1.4*unit}px`,fontSize:3.45*unit,fontWeight:700,
  }}/>;
};

export const Symbol: React.FC<{wrong?:boolean; outline?:boolean}> = ({wrong=false,outline=false}) => <g>
  <circle r={4.6} fill={outline?SURF:wrong?ERROR:GOLDL} stroke={wrong?ERROR:GOLDL} strokeWidth=".7"/>
  <path d={wrong?"M-1.65 -1.65 L1.65 1.65 M1.65 -1.65 L-1.65 1.65":"M-2 0 L-.55 1.45 L2.35 -1.65"}
    fill="none" stroke={outline?GOLDL:INK} strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round"/>
</g>;

export const Badge: React.FC = () => <g>
  <rect x={-10} y={-10} width={20} height={20} rx={5} fill={SURF} stroke={GOLD} strokeWidth=".8"/>
  <path d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6 M5 -7 Q5.6 -5.6 7 -5 Q5.6 -4.6 5 -3 Q4.6 -4.6 3 -5 Q4.6 -5.6 5 -7" fill={GOLDL}/>
</g>;

export const Person: React.FC<{x:number;y:number; scale?:number; reach?:number; wave?:boolean}> = ({x,y,scale=1,reach=0,wave=false}) => <G x={x} y={y} s={scale}>
  <g shapeRendering="crispEdges">
    <circle cy={-13} r={6} fill={TXT}/>
    <path d="M-11 12 V4 Q-10 -4 0 -4 Q10 -4 11 4 V12 Z" fill={TXT}/>
    <path d={wave?`M8 4 L15 0 L17 ${-5-reach*6}`:`M8 4 L${13+4*reach} ${7-3*reach}`} stroke={TXT} strokeWidth="3.9" strokeLinecap="round" fill="none"/>
    <path d="M-5 12 V20 M5 12 V20" stroke={SEC} strokeWidth="3.5" strokeLinecap="round"/>
  </g>
</G>;

export const Window: React.FC<{w?:number;h?:number;children?:React.ReactNode; submit?:boolean}> = ({w=75,h=57,children,submit=false}) => <g>
  <rect x={-w/2} y={-h/2} width={w} height={h} rx={2.6} fill={EL} stroke={GOLD} strokeWidth=".72"/>
  <path d={`M${-w/2} ${-h/2+7} h${w}`} stroke={HOV} strokeWidth=".65"/>
  {[0,1,2].map(i=><circle key={i} cx={-w/2+4+i*3} cy={-h/2+3.5} r={.83} fill={i===0?GOLD:HOV}/>)}
  {submit&&<g>
    <rect x={-w/2+4} y={h/2-9} width={w-8} height={5.2} rx={1.4} fill={SURF} stroke={HOV} strokeWidth=".6"/>
    <path d={`M${w/2-10} ${h/2-7.4} l3 1.2 -3 1.2 .65 -1.2 z`} fill={GOLDL}/>
  </g>}
  {children}
</g>;

export const Prompt: React.FC<{w?:number; lines?:number; muted?:boolean}> = ({w=34,lines=2,muted=false}) => {
  const h=lines*3.5+5;
  return <g>
    <rect x={-w/2} y={-h/2} width={w} height={h} rx={1.8} fill={muted?HOV:GOLDL}/>
    <path d={`M${-w/2+3} ${h/2-1} v3 l4 -3.5`} fill={muted?HOV:GOLDL}/>
    {Array.from({length:lines},(_,i)=><path key={i} d={`M${-w/2+3.5} ${-h/2+3.5+i*3.1} h${w*(i===lines-1?.61:.77)}`} stroke={muted?SEC:INK} strokeWidth=".7" strokeLinecap="round"/>)}
  </g>;
};

export const Ticket: React.FC<{selected?:boolean}> = ({selected=false}) => <g>
  <path d="M-14 -5.3 H7 L14 0 L7 5.3 H-14 Z" fill={selected?GOLDL:SURF} stroke={GOLDL} strokeWidth=".78" strokeLinejoin="round"/>
  <circle cx={-10} r={1.25} fill={selected?INK:GOLDL}/>
  <path d="M-6 -1 H6 M-6 1.8 H3" stroke={selected?INK:GOLDL} strokeWidth=".7" strokeLinecap="round"/>
</g>;

export const Calendar: React.FC<{day:number; month?:boolean; tasks?:number}> = ({day,month=false,tasks=0}) => <g>
  <rect x={-22} y={-18} width={44} height={36} rx={2.1} fill={PAPER} stroke={GOLD} strokeWidth=".65"/>
  <path d="M-21.5 -12 H21.5 V-16 Q21.5 -17.5 20 -17.5 H-20 Q-21.5 -17.5 -21.5 -16Z" fill={GOLD}/>
  <path d="M-12 -21 V-15 M12 -21 V-15" stroke={TXT} strokeWidth="1.2" strokeLinecap="round"/>
  {Array.from({length:month?21:15},(_,i)=>{
    const count=month?7:5;
    const w=39/count;
    const x=-19.5+(i%count)*w;
    const y=-8.5+Math.floor(i/count)*8;
    return <g key={i}>
      <rect x={x} y={y} width={w-1.5} height={5.7} rx={.9} fill={day===i?GOLDL:"#d7cfbf"} stroke={day===i?GOLD:"none"} strokeWidth=".55"/>
      {i>=day&&i<day+tasks&&<path d={`M${x+1.3} ${y+2.8} h${w-4.1}`} stroke={SURF} strokeWidth="1.55" strokeLinecap="round"/>}
    </g>;
  })}
</g>;

/** Giữ nguyên hình bảng và tai vàng để nhận ra cùng loại tệp qua các lần chạy. */
export const Ledger: React.FC<{split?:number; missing?:number; incorrect?:boolean; file?:boolean}> = ({split=0,missing=0,incorrect=false,file=false}) => <g>
  <rect x={-28} y={-19} width={56} height={38} rx={2} fill={PAPER} stroke={GOLD} strokeWidth=".65"/>
  <path d="M-28 -15 V-17 Q-28 -19 -26 -19 H-5 V-23 H10 V-19 H26 Q28 -19 28 -17 V-15Z" fill={GOLD}/>
  <path d="M-23 -11 H23" stroke={HOV} strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M0 -8 V15" stroke={SEC} strokeWidth=".66" opacity={split}/>
  {[0,1,2,3].map(i=>{
    const y=-7+i*6.3;
    const alert=i===2&&missing>0;
    return <g key={i}>
      <rect x={-23} y={y-1} width={46} height={4.7} rx={.55} fill={alert?"#ecc4b5":i%2?"#d9d3c6":"#e5dccb"}/>
      <path d={`M-21 ${y+1.3} H${mix(17-i*2,-5-i*.8,split)}`} stroke={HOV} strokeWidth="1.07" strokeLinecap="round"/>
      {(!alert||incorrect)&&<path d={`M4 ${y+1.3} H${16-i*.9}`} stroke={incorrect&&alert?ERROR:HOV} strokeWidth="1.1" strokeLinecap="round" opacity={split}/>}
      {alert&&<G x={i===2?19:20} y={y+1.4} s={.49} o={missing}><Symbol wrong/></G>}
    </g>;
  })}
  {file&&<path d="M18 19 H28 V9 Z" fill={GOLDL} stroke={GOLD} strokeWidth=".4"/>}
</g>;

export const Rule: React.FC<{wrong?:boolean}> = ({wrong=false}) => <g>
  <path d="M-18 -26 H18 V18 L10 26 H-18Z" fill={PAPER} stroke={GOLD} strokeWidth=".65"/>
  <circle cy={-25} r={2} fill={GOLD}/>
  <path d="M-11 -17 H11" stroke={HOV} strokeWidth="1.55"/>
  {[-8,1,10].map((y,i)=><G key={y} x={-10} y={y}>
    <G s={.66}><Symbol wrong={i===1}/></G>
    <path d="M6 -.8 H21 M6 1.8 H18" stroke={SEC} strokeWidth=".73" strokeLinecap="round"/>
  </G>)}
  {wrong&&<rect x={-16} y={-3.2} width={32} height={8.5} rx={1.4} fill="none" stroke={ERROR} strokeWidth=".9"/>}
</g>;

export const Book: React.FC<{open?:number; saved?:boolean; blocked?:boolean}> = ({open=0,saved=false,blocked=false}) => <g>
  <rect x={-15} y={-21} width={30+12*open} height={42} rx={2.3} fill={SURF} stroke={GOLD} strokeWidth=".9"/>
  <rect x={-12} y={-18.4} width={24+12*open} height={36.8} rx={1.55} fill={PAPER} opacity={open}/>
  <path d={`M${-10+14*open} -20 V20`} stroke={GOLD} strokeWidth="1.3"/>
  <path d="M-5 -10 H9 M-5 -6 H5" stroke={GOLDL} strokeWidth=".9" opacity={1-open}/>
  {[0,1,2].map(i=><G key={i} x={-6} y={-11+i*10} o={open}>
    <path d="M0 0 H7 M14 0 H24 M14 2.5 H21" stroke={HOV} strokeWidth=".8" strokeLinecap="round"/>
    <circle cx={-2} r={.85} fill={GOLD}/>
  </G>)}
  {saved&&<G x={19} y={14} s={.89}><Symbol/></G>}
  {blocked&&<G x={19} y={14} s={.89}><Symbol wrong/></G>}
</g>;

export const Drawer: React.FC<{open:number}> = ({open}) => <g>
  <rect x={-24} y={-13} width={48} height={33} rx={2.1} fill={SURF} stroke={GOLD} strokeWidth=".8"/>
  <rect x={-21} y={-10} width={42} height={12} rx={1} fill={INK}/>
  <rect x={-21} y={4} width={42} height={12} rx={1} fill={EL} stroke={HOV} strokeWidth=".65"/>
  <path d="M-4 10 H4" stroke={GOLD} strokeWidth=".8" strokeLinecap="round"/>
  <G x={open*4} y={open*6}>
    <path d="M-21 -10 H21 L24 2 H-19 Z" fill={EL} stroke={GOLD} strokeWidth=".8"/>
    <path d="M-4 -4 H4" stroke={GOLDL} strokeWidth=".9" strokeLinecap="round"/>
  </G>
</g>;

export const Folder: React.FC = () => <g>
  <path d="M-18 10 V-12 H-5 L1 -7 H18 V10 Z" fill={GOLDL} stroke={GOLD} strokeWidth=".6"/>
  <path d="M-18 10 L-15 -4 H21 L18 10 Z" fill={GOLD} stroke={PAPER} strokeWidth=".55"/>
</g>;

export const Cursor: React.FC = () => <path d="M0 0 V7.3 L1.8 5.8 L3.5 8.2 L5 7.2 L3.4 4.8 H6.5Z" fill={TXT} stroke={INK} strokeWidth=".65" strokeLinejoin="round"/>;

