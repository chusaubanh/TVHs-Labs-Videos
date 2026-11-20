import React from "react";
import { Arrow, Bubble, C, Criteria, G, Hand, Lens, Paper, Stage, Stroke, Tag, Window, mix, useArt } from "./art";

export const SuaKiemLai: React.FC = () => {
  const {t,p} = useArt(); const corrected=t(0,.4); const gate=t(1,.45); const save=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={28} y={20} show={p(0)} size={3.7}/>
    <Tag i={1} x={72} y={92} show={t(0,.4)} size={3.8}/>
    <Tag i={2} x={75} y={49} show={t(1)} size={3.2}/>
    <Tag i={3} x={75} y={19} show={gate} size={3.1}/>
  </>}>
    <G x={28} y={67} s={p(0)}><Window w={43} h={84}/><G y={1}><Paper w={31} h={61} marked={2} before={!corrected}/></G></G>
    <G x={72} y={74} s={p(0,.1)} r={3}><Paper w={32} h={73} marked={2}/></G>
    <G x={mix(73,30,t(0,0,35))} y={mix(34,65,t(0,0,35))} s={1-corrected}><Bubble w={20} h={10} hot/></G>
    <Arrow x1={45} y1={69} x2={56} y2={69} p={corrected}/>
    <G x={69} y={69} s={corrected}><Lens r={11}/></G>
    <G x={75} y={35} s={t(1)}><Criteria checked={gate>.8} w={27}/></G>
    <Arrow x1={74} y1={59} x2={74} y2={51} p={t(1,.1)}/>
    <G x={90} y={43} o={t(1)}><path d={`M0 -13 V${mix(13,-5,gate)}`} stroke={C.gold} strokeWidth={1.5} strokeLinecap="round"/><path d="M-2 -14 H2 M-2 14 H2" stroke={C.paper} strokeWidth={.5}/></G>
    <Arrow x1={77} y1={30} x2={85} y2={23} p={gate}/>
    <G x={48} y={103} s={save}>
      <path d="M-8 -12 H8 V11 L0 5 L-8 11 Z" fill={C.gold} stroke={C.ink} strokeWidth={.7}/>
      <path d="M-4 -7 H4 M-4 -3 H2" stroke={C.ink} strokeWidth={.7}/>
    </G>
    <G x={54} y={102} s={save*.8}><Hand/></G>
  </Stage>;
};

export const ChatKhongBaoDam: React.FC = () => {
  const {t,p} = useArt(); const separate=t(1); const check=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={24} y={19} show={p(0)} size={3.8}/>
    <Tag i={1} x={53} y={45} show={t(1)} hot size={3.8}/>
    <Tag i={2} x={51} y={94} show={check} size={3.8}/>
  </>}>
    <G x={51} y={75} s={p(0)}><Window w={84} h={80}/></G>
    <G x={73} y={23} s={p(0,.15)}>
      <circle r={8} fill={C.panel} stroke={C.gold} strokeWidth={.8}/>
      <path d="M-2 -2 Q-2 -5 1 -5 Q5 -5 4 -1 Q4 1 1 2 V4" fill="none" stroke={C.paper} strokeWidth={1.3} strokeLinecap="round"/>
      <circle cx={1} cy={6.5} r={.8} fill={C.paper}/>
    </G>
    <G x={mix(24,16,separate)} y={mix(34,26,separate)} r={-6} s={.7}>
      <Bubble w={24} h={12}/><G x={9} y={8}><Bubble w={20} h={10}/></G>
    </G>
    <Stroke d="M36 29 Q46 30 50 37" p={1-separate} color={C.line}/>
    <G x={30} y={79} s={p(0,.1)} r={-3}><Paper w={30} h={60} marked={check>.5?2:-1}/></G>
    <G x={72} y={79} s={p(0,.15)} r={3}><Paper w={30} h={60} marked={check>.5?2:-1}/></G>
    <Arrow x1={46} y1={64} x2={55} y2={64} p={1-separate} color={C.red}/>
    <G x={50} y={64} o={1-separate}><path d="M-1 -4 V4" stroke={C.red} strokeWidth={1.2}/></G>
    <G x={50} y={74} s={check}><Lens r={12}/></G>
    <Arrow x1={63} y1={79} x2={40} y2={79} p={t(2,.15)}/>
    <G x={55} y={99} s={check*.9}><Hand/></G>
  </Stage>;
};

export const BaiTap: React.FC = () => {
  const {t,p} = useArt(); const versions=t(1); const finish=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={50} y={17} show={p(0)} size={4.5}/>
    <Tag i={1} x={50} y={43} show={t(0,.2)*(1-finish)} size={3.5}/>
    <Tag i={2} x={26} y={88} show={versions*(1-finish)} size={3.6}/>
    <Tag i={3} x={74} y={88} show={versions*(1-finish)} size={3.6}/>
    <Tag i={4} x={22} y={93} show={finish} size={3.1}/>
    <Tag i={5} x={51} y={93} show={t(2,.25)} size={3.1}/>
    <Tag i={6} x={80} y={93} show={t(2,.55)} size={3.1}/>
  </>}>
    <G x={50} y={72} s={mix(1,.56,versions)} r={mix(0,-3,finish)}><Paper w={62} h={83} marked={finish>.5?2:-1}/></G>
    <G x={26} y={75} s={versions} r={-5}><Paper w={34} h={74} before={true} marked={2}/></G>
    <G x={74} y={75} s={versions} r={5}><Paper w={34} h={74} marked={2}/></G>
    <Arrow x1={41} y1={64} x2={58} y2={64} p={versions}/>
    <G x={50} y={69} s={finish}><Lens r={11}/></G>
    <G x={74} y={97} s={t(2,.5)}><Hand pen/></G>
    <Stroke d="M67 107 Q70 102 73 107 T82 106" p={t(2,.65)} color={C.ink} w={.6}/>
    <G x={27} y={54} s={finish*.8}><Hand/></G>
    <G x={75} y={31} s={t(2,.7)}><Bubble w={21} h={11} done/></G>
    <Stroke d="M18 33 H65" p={finish} color={C.gold}/>
    <G x={18} y={33} o={finish}><path d="M0 -2 V2 M47 -2 V2" stroke={C.gold} strokeWidth={.7}/></G>
  </Stage>;
};