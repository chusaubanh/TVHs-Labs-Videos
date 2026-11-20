import React from "react";
import { Arrow, Badge, Book, Calendar, Caption, Cursor, Drawer, EL, ERROR, Folder, G, GOLD, GOLDL, HOV, INK, Ledger, PAPER, Person, Prompt, Rule, Stage, SURF, Symbol, TXT, Ticket, Window, mix, useArt } from "./art";

const Rail: React.FC<{progress:number; alert?:boolean}> = ({progress,alert=false}) => <g>
  <path d="M-23 0 H23" stroke={HOV} strokeWidth=".9"/>
  <path d={`M-23 0 H${mix(-23,23,progress)}`} stroke={alert?ERROR:GOLD} strokeWidth=".95"/>
  {[-23,0,23].map((x,i)=><G key={x} x={x}>
    {progress>i/3+.11?<G s={.82}><Symbol wrong={alert&&i===2}/></G>:<circle r={3.4} fill={SURF} stroke={HOV} strokeWidth=".75"/>}
  </G>)}
</g>;

const Morning: React.FC<{day:number; lines:number; sent:number; tasks:number; compare?:number; shortcut?:number; prior?:number; stop?:number}> =
({day,lines,sent,tasks,compare=0,shortcut=0,prior=0,stop=0}) => <>
  <G x={50} y={63}>
    <Window w={84} h={83} submit>
      <G x={-22} y={-12} s={.58}><Badge/></G>
      <G x={16} y={-7} s={.75}><Calendar day={day} tasks={tasks}/></G>
      <G x={-23} y={5} s={.56} o={compare}><Calendar day={6} month/></G>
      <Arrow x1={-10} y1={6} x2={-2} y2={3} p={compare} color={GOLDL}/>
      <G x={-16} y={24} o={prior*(1-shortcut)}><Prompt w={36} lines={2} muted/></G>
      <G x={mix(-18,4,sent)} y={mix(33,19,sent)} s={.91} o={sent*(1-shortcut)}><Prompt w={37} lines={lines}/></G>
      <G x={mix(-15,6,sent)} y={mix(33,20,sent)} s={.92} o={shortcut}><Ticket selected={sent>.55}/></G>
      <G x={30} y={32} o={stop}><Symbol wrong/></G>
    </Window>
  </G>
  <path d="M9 110 H91" stroke={HOV} strokeWidth="1.1" strokeLinecap="round"/>
  {[0,1,2,3,4].map(i=><path key={i} d={`M${13+i*16} 110 h8`} stroke={GOLD} strokeWidth=".4" opacity=".65"/>)}
</>;

export const MoiSang: React.FC = () => {
  const {active,t}=useArt();
  const repeat=t(3,.14,25);
  const count=[.04,.22,.42].filter(f=>t(2,f,16)>.61).length;
  return <Stage overlay={active<3?<Caption i={active} x={50} y={16}/>:null}>
    <Morning day={repeat>.53?7:6} lines={active===0?1:3} tasks={active===3?Math.round(3*repeat):count}
      sent={active===3?repeat:t(0,.05,28)} compare={active===3?0:t(1,.05)} prior={t(3)}/>
  </Stage>;
};

export const DatTen: React.FC = () => {
  const {active,t}=useArt();
  const fold=t(2,.25,38);
  const short=t(3,.1,24);
  return <Stage overlay={active===2?<Caption i={0} y={17}/>:active===4?<Caption i={1} y={17}/>:null}>
    <G o={1-fold+short}>
      <Morning day={short>.5?8:7} tasks={active>=3?Math.round(3*short):3} lines={3}
        sent={active>=3?short:1-t(1,.05,22)} prior={1-fold} stop={t(1)*(1-fold)} shortcut={short}/>
    </G>
    {active===2&&<>
      {[-1,0,1].map((slot,i)=><G key={slot} x={mix(50+slot*24,50,fold)} y={mix(63+i*8,64,fold)} s={.59} o={t(2,i*.06)*(1-fold)}><Prompt w={37} lines={3}/></G>)}
      <G x={50} y={64} s={1.29*fold}><Book/></G>
    </>}
    {active===4&&<G x={20} y={45} s={.61*t(4)}><Book open={t(4,.26,20)} saved={t(4,.55)>.6}/></G>}
  </Stage>;
};

export const NoiQuy: React.FC = () => {
  const {active,t}=useArt();
  return <Stage overlay={<Caption i={1} x={52} y={17}/>}>
    <path d="M10 80 H90" stroke={HOV} strokeWidth=".72"/>
    <G x={48} y={56} s={1.12}><Rule wrong={active===1&&t(1,.19)>.6}/></G>
    <Person x={18} y={82} scale={.7} reach={1-t(1)}/>
    <G x={80} y={94} s={.49}><Book/></G>
    {active===1&&<>
      <G x={mix(22,48,t(1,.08,30))} y={mix(97,91,t(1,.08,30))} s={.53}><Prompt lines={1}/></G>
      <Arrow x1={48} y1={84} x2={48} y2={70} p={t(1,.22)} color={ERROR}/>
    </>}
  </Stage>;
};

export const NganKeo: React.FC = () => {
  const {t,active}=useArt();
  const pull=t(0,.05,29), lift=t(0,.17,33), read=t(1,0,25);
  return <Stage overlay={<Caption i={active===2?1:0} y={17}/>}>
    <G x={54} y={mix(81,88,read)} s={1.15} o={1-.52*read}><Drawer open={pull}/></G>
    <G x={54} y={mix(79,50,lift)} s={mix(.43,1.23,lift)} o={lift}><Book open={read} saved={t(2,.5)>.69}/></G>
    {active===2&&<G x={mix(20,49,t(2,.06,29))} y={76} s={.67}><Ticket selected={t(2,.25)>.5}/></G>}
    <G x={54} y={103} o={read}><Rail progress={active===2?t(2,.29,28):0}/></G>
  </Stage>;
};

export const CaHai: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<><Caption i={0} x={26} y={27}/><Caption i={1} x={73} y={27}/></>}>
    <G x={26} y={60} s={1.04}><Rule wrong={t(1,.15)>.5}/></G>
    <G x={69} y={61} s={.94}><Book open={t(1,0,25)} saved={t(1,.59)>.6}/></G>
    <Arrow x1={45} y1={63} x2={54} y2={63} p={t(1,.2)} color={GOLDL}/>
    <path d="M12 94 H88" stroke={HOV} strokeWidth=".8"/>
    <G x={50} y={94} s={.94*t(1,.4)}><Symbol/></G>
  </Stage>;
};

const LedgerDesk: React.FC<{split:number; missing:number; cursor?:React.ReactNode; children?:React.ReactNode; file?:boolean}> =
({split,missing,cursor,children,file=false}) => <G x={50} y={62}>
  <Window w={84} h={84} submit>
    <G x={-31} y={-26} s={.32}><Folder/></G>
    <G x={28} y={-26} s={.43}><Badge/></G>
    <path d="M-22 -26 H4" stroke={HOV} strokeWidth="1.25" strokeLinecap="round"/>
    <G y={3}><Ledger split={split} missing={missing} file={file}/></G>
    {cursor}
    {children}
  </Window>
</G>;

export const LamCung: React.FC = () => {
  const {t,active}=useArt();
  const draft=t(1,.13,20);
  const split=t(2,.14,29);
  const flag=t(2,.49,17);
  const review=t(3,.24,20);
  const cursorX=active<2?mix(-33,-2,t(active,.08,22)):mix(-4,13,t(2,.39,24));
  return <Stage overlay={active<2?<Caption i={0} y={17}/>:flag<.62?<Caption i={1} y={17}/>:<Caption i={2} y={85} x={68} hot/>}>
    <LedgerDesk split={split} missing={flag} cursor={<G x={cursorX} y={active===2?8:3} s={.84} o={1-review}><Cursor/></G>}>
      {active===1&&<G x={7} y={32} s={.51} o={draft}><Prompt w={43} lines={1}/></G>}
      <G x={32} y={26} s={review*.84}><Symbol/></G>
    </LedgerDesk>
  </Stage>;
};

const PackStrip: React.FC<{split:number; flagged:number}> = ({split,flagged}) => <g>
  <rect x={-18} y={-9} width={36} height={18} rx={1.9} fill={EL} stroke={GOLD} strokeWidth=".7"/>
  <path d="M-13 -3 H-5 M-13 2 H-5 M-2 -6 V6 M2 -3 H10" stroke={GOLDL} strokeWidth="1" strokeLinecap="round" opacity={split}/>
  {flagged>.1&&<G x={9} y={3} s={.51} o={flagged}><Symbol wrong/></G>}
</g>;

export const DongGoi: React.FC = () => {
  const {t,active}=useArt();
  const pack=t(0,.27,48), detail=t(1,.04,25), guard=t(1,.55,22), call=t(2,.19,26);
  return <Stage overlay={<Caption i={active===1?1:0} y={17}/>}>
    <G x={50} y={63}><Window w={86} h={85}/></G>
    <G x={mix(50,26,pack)} y={mix(59,45,pack)} s={mix(1.2,.57,pack)} o={1-.12*pack}><Ledger split={1} missing={1}/></G>
    <G x={mix(28,64,pack)} y={mix(58,62,pack)} s={.69} o={pack*(1-detail)}><PackStrip split={1} flagged={1}/></G>
    <G x={64} y={63} s={1.00*pack}><Book open={detail} saved={call>.69}/></G>
    {detail>.2&&<G x={68} y={62} s={.64} o={detail}><PackStrip split={detail} flagged={guard}/></G>}
    <Arrow x1={42} y1={52} x2={56} y2={60} p={pack} color={GOLDL}/>
    {active===2&&<G x={mix(27,59,call)} y={mix(94,83,call)} s={.79}><Ticket selected={call>.64}/></G>}
  </Stage>;
};

const TestRoute: React.FC<{y:number; guard:boolean; p:number}> = ({y,guard,p}) => <G x={50} y={y}>
  <G x={-28} s={.43}><Ledger split={1} missing={1}/></G>
  <path d="M-17 0 H18" stroke={HOV} strokeWidth=".85" strokeDasharray="1.5 1.5"/>
  <G x={28} s={.46}><Ledger split={1} missing={p>.74?1:0} incorrect={!guard}/></G>
  <G x={36} y={11} s={.53} o={Math.max(0,(p-.72)/.28)}><Symbol wrong={!guard}/></G>
  {guard&&<path d="M-1 -8 L5 -5 V0 Q4 5 -1 8 Q-7 5 -7 0 V-5Z" fill={GOLDL} stroke={INK} strokeWidth=".6"/>}
  <G x={mix(-14,guard?-8:18,p)} s={.58} o={p}><Symbol wrong/></G>
</G>;

export const DieuCam: React.FC = () => {
  const {active,t}=useArt();
  const second=t(1,.05,22);
  return <Stage overlay={<Caption i={active===0?0:1} y={17}/>}>
    <G x={50} y={63}><Window w={86} h={85}/></G>
    <G x={50} y={34} s={.66} o={1-second}><PackStrip split={1} flagged={1}/></G>
    <TestRoute y={mix(65,49,second)} guard p={t(0,.19,25)}/>
    <G o={second}><path d="M15 67 H85" stroke={HOV} strokeWidth=".6"/><TestRoute y={86} guard={false} p={t(1,.18,32)}/></G>
  </Stage>;
};

export const GoiTen: React.FC = () => {
  const {t,active}=useArt();
  const load=t(0,.34,26), request=t(0,.57,20);
  const split=t(1,.12,23), flag=t(1,.43,19), confirmed=t(1,.69,16);
  return <Stage overlay={<Caption i={2} y={17}/>}>
    <LedgerDesk split={split} missing={flag} file>
      <G x={mix(-23,4,request)} y={32} s={.69} o={load*(1-confirmed)}><Ticket selected={request>.6}/></G>
      <G x={27} y={-26} s={.56} o={confirmed}><Symbol/></G>
      {active===1&&<G x={32} y={26} s={confirmed*.84}><Symbol/></G>}
    </LedgerDesk>
    {active===0&&<G x={mix(15,22,load)} y={mix(108,43,load)} s={.72} o={1-load}><Folder/></G>}
  </Stage>;
};

const Envelope: React.FC = () => <g>
  <rect x={-16} y={-10} width={32} height={20} rx={2} fill={PAPER} stroke={GOLD} strokeWidth=".85"/>
  <path d="M-15 -8 L0 2 L15 -8 M-15 8 L-7 1 M15 8 L7 1" fill="none" stroke={HOV} strokeWidth=".75"/>
</g>;

const Minutes: React.FC<{assign:number}> = ({assign}) => <g>
  <path d="M-19 -24 H13 L19 -18 V24 H-19Z" fill={PAPER} stroke={GOLD} strokeWidth=".7"/>
  <path d="M13 -24 V-18 H19" fill={GOLDL} stroke={GOLD} strokeWidth=".65"/>
  <path d="M-13 -16 H9" stroke={HOV} strokeWidth="1.45" strokeLinecap="round"/>
  {[-7,4,15].map((y,i)=><G key={y} y={y}>
    <rect x={-14} y={-4} width={28} height={8.5} rx="1" fill={i===2?"#e6d5ad":"#dfd9cd"}/>
    {i<2?<G x={-10} s={.49}><Symbol/></G>:<g fill={HOV}><circle cx={-10} cy={-1.4} r="1.2"/><path d="M-12 2 Q-12 -.1 -10 -.1 Q-8 -.1 -8 2Z"/></g>}
    <path d="M-5 -1 H9 M-5 1.9 H6" stroke={HOV} strokeWidth=".74" strokeLinecap="round"/>
  </G>)}
  <rect x={-14} y={11} width={28} height={8.5} rx="1" fill="none" stroke={GOLD} strokeWidth="1" opacity={assign}/>
</g>;
export const BaViec: React.FC = () => {
  const {t,active}=useArt();
  const choose=t(0,.14,21), flag=t(1,.22,22), send=t(2,.29,25), assign=t(3,.28,29);
  return <Stage overlay={active>0?<Caption i={active-1} y={17}/>:null}>
    {active===0&&<>
      {[0,1,2].map(i=><G key={i} x={mix(50,23,choose)+i} y={72-i*4} s={.55} o={1-choose*.4}><Ledger/></G>)}
      <G x={70} y={65} s={.82} o={choose}><Calendar day={7} month/></G>
    </>}
    {active===1&&<LedgerDesk split={1} missing={flag} file/>}
    {active===2&&<G x={50} y={62}>
      <Window w={76} h={71}>
        <G x={-9} y={0} s={.71}><Ledger split={1}/></G>
        <G x={mix(33,16,send)} y={mix(24,15,send)} s={.85}><Envelope/></G>
      </Window>
    </G>}
    {active===3&&<>
      <G x={38} y={63} s={1.22}><Minutes assign={assign}/></G>
      <Person x={77} y={65} scale={.92} reach={assign}/>
      <Arrow x1={60} y1={68} x2={70} y2={68} p={assign} color={GOLDL}/>
      <G x={72} y={88} s={.79*assign}><Symbol/></G>
    </>}
  </Stage>;
};

export const ChayTay: React.FC = () => {
  const {t,active}=useArt();
  const verify=t(1,.1,31), store=t(1,.47,29), returnWork=t(2,.36,37);
  return <Stage overlay={<Caption i={active===1?1:0} y={17}/>}>
    <G x={active===0?51:34} y={active===2?77:65} s={active===0?1.25:.93}>
      <Ledger split={active===0?t(0,.13,28):1} missing={active===2?1:t(0,.37,19)}/>
    </G>
    {active===0&&<G x={mix(26,61,t(0,.13,27))} y={70} s={.92}><Cursor/></G>}
    {active>0&&<>
      <G x={70} y={active===2?44:60} s={.81}><Drawer open={active===1?store:1}/></G>
      {active===1&&<>
        <G x={mix(45,70,store)} y={mix(49,51,store)} s={.55*store}><Book saved/></G>
        <G x={48} y={98}><Rail progress={verify}/></G>
      </>}
      {active===2&&<>
        <Arrow x1={70} y1={60} x2={57} y2={74} p={returnWork} color={ERROR}/>
        <G x={mix(71,67,returnWork)} y={mix(44,90,returnWork)} s={.62}><Book blocked/></G>
      </>}
    </>}
  </Stage>;
};

const Clock: React.FC<{p:number}> = ({p}) => <g>
  <circle r={22} fill={PAPER} stroke={GOLD} strokeWidth="1.5"/>
  {Array.from({length:12},(_,i)=>{
    const x=Math.sin(i*Math.PI/6), y=-Math.cos(i*Math.PI/6);
    return <path key={i} d={`M${x*18} ${y*18} L${x*20} ${y*20}`} stroke={HOV} strokeWidth=".8"/>;
  })}
  <path d="M0 0 V-10" stroke={INK} strokeWidth="1.22" strokeLinecap="round"/>
  <path d={`M0 0 L${Math.sin(p*Math.PI/2)*15} ${-Math.cos(p*Math.PI/2)*15}`} stroke={GOLD} strokeWidth="1.26" strokeLinecap="round"/>
  <circle r={1.4} fill={INK}/>
</g>;

export const HomNay: React.FC = () => {
  const {t,active}=useArt();
  const move=t(1,.22,30), run=t(3,.25,27);
  return <Stage overlay={active===0?<Caption i={0} y={20}/>:active===1?<><Caption i={1} x={25} y={31}/><Caption i={2} x={74} y={31}/></>:null}>
    {active===0&&<G x={50} y={65} s={1.45}><Clock p={t(0,0,30)}/></G>}
    {active===1&&<>
      <G x={26} y={60} s={.85}><Calendar day={7}/></G>
      <Arrow x1={46} y1={61} x2={54} y2={61} p={move} color={GOLDL}/>
      <G x={74} y={60} s={.85}><Calendar day={move>.62?7:-1}/></G>
      <G x={mix(26,74,move)} y={82} s={.77}><Ticket selected={move>.62}/></G>
    </>}
    {active>=2&&<Morning day={run>.5?8:7} tasks={Math.round(3*run)} lines={1} sent={active===2?t(2,.36,28):run} shortcut={1}/>}
  </Stage>;
};

const Contract: React.FC = () => <g>
  <path d="M-16 -21 H9 L16 -14 V21 H-16Z" fill={PAPER} stroke={GOLD} strokeWidth=".65"/>
  <path d="M9 -21 V-14 H16" fill={GOLDL} stroke={GOLD} strokeWidth=".65"/>
  <path d="M-10 -13 H4 M-10 -6 H10 M-10 -1 H10 M-10 4 H8 M-10 9 H10" stroke={HOV} strokeWidth=".95" strokeLinecap="round"/>
  <path d="M1 16 Q3 12 6 15 T12 15" fill="none" stroke={GOLD} strokeWidth=".8"/>
</g>;

export const BaiSau: React.FC = () => {
  const {t}=useArt();
  const close=t(1,0,17);
  return <Stage overlay={<Caption i={close>.4?1:0} y={19}/>}>
    <G x={50} y={65} o={1-close}>
      <Window w={77} h={73}>
        {Array.from({length:6},(_,i)=><G key={i} x={mix(-25,-16+i*.9,t(0,i*.09,23))} y={13-i*2} s={.88} o={t(0,i*.09)}><Contract/></G>)}
        <G x={23} y={5} s={.9}><Badge/></G>
        <Arrow x1={3} y1={8} x2={13} y2={8} p={t(0,.44)} color={GOLDL}/>
      </Window>
    </G>
    <G o={close}><Person x={48} y={65} scale={1.73} wave reach={close}/></G>
  </Stage>;
};

