import React from "react";
import { Arrow, Bubble, C, Clip, Cross, G, Hand, Lens, Paper, Rules, Stage, Stroke, Tag, Tick, Window, mix, useArt } from "./art";

export const BanGiao: React.FC = () => {
  const {t,p} = useArt(); const wait=t(1); const compare=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={27} y={18} show={p(0)} size={3.8}/>
    <Tag i={1} x={75} y={18} show={p(0,.1)} size={3.8}/>
    <Tag i={2} x={26} y={94} show={compare} size={3.5}/>
    <Tag i={3} x={74} y={94} show={compare} size={3.5}/>
  </>}>
    <G x={26} y={71} s={p(0)} r={-4}><Paper w={35} h={84} rows={5} marked={compare>.5?2:-1}/></G>
    <G x={74} y={71} s={p(0,.07)} r={4}><Paper w={35} h={84} rows={5} missing={2}/></G>
    {[0,1,2,3,4].map(i=><G key={i} x={50} y={39+i*14}>
      <path d="M-5 0 H5" stroke={C.line} strokeWidth={.5}/>
      <circle r={1.3} fill={i===2?C.red:C.gold}/>
    </G>)}
    <G x={73} y={70} o={1-compare}><rect x={-11} y={-22} width={22} height={44} rx={1.5} fill={C.paper} stroke={C.line} strokeDasharray="2 1" strokeWidth={.7}/><Rules x={-7} y={-16} w={13} n={3} color={C.line}/></G>
    <G x={53} y={36} s={wait*(1-compare)}><Bubble w={28} h={12} done/><G x={13} y={8}><Cross/></G></G>
    <G x={74} y={110} s={wait}>
      <path d="M-13 0 H13 M0 -2 V2" stroke={C.line} strokeWidth={1}/>
      <rect x={-8} y={-5} width={16} height={2} rx={1} fill={C.paper}/>
    </G>
    <G o={compare}><path d="M58 62 H89 V77 H58 Z" fill="none" stroke={C.red} strokeWidth={1} strokeDasharray="2 1"/><Arrow x1={39} y1={66} x2={57} y2={66} p={compare} color={C.red}/></G>
    <G x={67} y={71} s={compare}><Lens r={10} hot/></G>
    <G x={73} y={82} s={compare}><Hand/></G>
  </Stage>;
};

export const ChatDuNguon: React.FC = () => {
  const {t,p} = useArt(); const send=t(1); const incomplete=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={69} y={mix(55,30,send)} show={p(0)} size={4.2}/>
    <Tag i={1} x={27} y={47} show={send} size={3.5}/>
    <Tag i={2} x={74} y={47} show={send} size={3.5}/>
    <Tag i={3} x={27} y={79} show={send} size={3.1}/>
    <Tag i={4} x={74} y={79} show={send} size={3.5}/>
  </>}>
    <G x={mix(30,23,send)} y={mix(49,25,send)} s={p(0)} r={-5}><Window w={mix(40,29,send)} h={mix(35,22,send)} old/><G x={1} y={0}><Bubble w={17} h={8}/></G></G>
    <Arrow x1={mix(48,42,send)} y1={mix(56,27,send)} x2={mix(56,50,send)} y2={mix(65,34,send)} p={t(0,.18)}/>
    <G x={mix(72,50,send)} y={mix(88,77,send)} s={p(0,.05)}><Window w={mix(36,84,send)} h={mix(45,79,send)}/></G>
    <G x={mix(17,27,send)} y={mix(57,63,send)} s={send} r={mix(-10,-3,send)}><Paper w={26} h={24} rows={2}/><G y={-13}><Clip/></G></G>
    <G x={mix(86,74,send)} y={mix(57,63,send)} s={send} r={3}>
      <rect x={-14} y={-12} width={28} height={24} rx={2} fill={C.gold}/>
      {[0,1,2].map(i=><G key={i} x={-8} y={-7+i*7}><rect x={-1.6} y={-1.6} width={3.2} height={3.2} rx={.5} fill="none" stroke={C.ink} strokeWidth={.5}/><rect x={4} y={-.4} width={13} height={.7} fill={C.ink}/></G>)}
    </G>
    <G x={mix(17,27,send)} y={mix(102,96,send)} s={send} r={-3}><Paper w={26} h={25} rows={2} clean/></G>
    <G x={74} y={96} s={t(0,.2)} r={3}><Paper w={26} h={25} rows={2}/></G>
    <G o={incomplete}>
      <path d="M44 65 H53 M49 60 V101 M44 95 H53" stroke={C.gold} strokeWidth={.6}/>
      <circle cx={49} cy={79} r={2} fill={C.gold}/>
      <Arrow x1={60} y1={95} x2={51} y2={81} p={t(2,.1)}/>
    </G>
  </Stage>;
};

export const LoiCoCanCu: React.FC = () => {
  const {t,p} = useArt(); const noQuota=t(1); const conditional=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={23} y={18} show={p(0)} size={3.5}/>
    <Tag i={1} x={72} y={18} show={p(0,.05)*(1-t(2,.5))} size={3.5} hot/>
    <Tag i={2} x={27} y={91} show={t(0,.12)} size={3.7}/>
    <Tag i={3} x={73} y={91} show={t(0,.23)} size={3.7}/>
    <Tag i={4} x={52} y={26} show={noQuota*(1-conditional)} hot size={3.4}/>
    <Tag i={5} x={53} y={55} show={conditional*(1-t(2,.5))} hot size={3.4}/>
  </>}>
    <G x={28} y={65} s={p(0)} r={-5}><Paper w={37} h={76} rows={5} marked={2}/></G>
    <G x={72} y={65} s={p(0,.05)} r={5}><Paper w={37} h={76} rows={5} before={!conditional} marked={2}/></G>
    <G x={50} y={64} s={p(0,.15)}><Lens r={15} hot={!conditional}/></G>
    <Stroke d="M39 62 C46 49 54 49 61 62" p={t(0,.15)} color={t(2,.5)>.5?C.gold:C.red}/>
    <Arrow x1={73} y1={100} x2={73} y2={78} p={t(0,.25)}/>
    
    <G x={53} y={36} o={noQuota*(1-conditional)}>{[-7,0,7].map(x=><G key={x} x={x}><circle r={2.6} fill={C.paper} stroke={C.red} strokeWidth={.65}/><G s={.55}><Cross/></G></G>)}<path d="M-11 -4 L11 4" stroke={C.red} strokeWidth={.9}/></G>
    <G o={conditional}>
      <path d="M44 64 H57" fill="none" stroke={t(2,.5)>.5?C.gold:C.red} strokeWidth={.7} strokeDasharray={t(2,.5)>.5?undefined:"1 2"}/>
      <G x={65} y={64} o={1-t(2,.5)}><Cross/></G>
      
    </G>
    <G x={75} y={99} r={25} s={t(0,.32)}><path d="M0 -12 V6" stroke={C.gold} strokeWidth={2}/><path d="M-1 6 L0 10 L1 6" fill={C.ink}/></G>
  </Stage>;
};