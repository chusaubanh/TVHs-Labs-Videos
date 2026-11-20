import React from "react";
import { Arrow, Bubble, C, Criteria, G, Hand, Lens, Paper, Rules, Stage, Stroke, Tag, Window, clamp, mix, useArt } from "./art";

/** Lời báo xong đụng vào đúng phần bài vượt vạch; không bịa mức trần. */
export const BaoXong: React.FC = () => {
  const {t,p,f} = useArt(); const back=t(1); const tools=t(2);
  const lensY=mix(44,66,t(1,.1,70));
  return <Stage overlay={<>
    <Tag i={0} x={50} y={17} show={p(0)} size={4.5} hot/>
    <Tag i={1} x={27} y={91} show={t(2)} size={3.3}/>
    <Tag i={2} x={73} y={91} show={t(2)} size={3.3}/>
  </>}>
    <G x={mix(57,51,back)} y={mix(72,64,back)} s={mix(1,.88,tools)}>
      <Paper w={55} h={82} rows={5}/>
      <G y={-29}>
        <path d="M-33 0 H34" stroke={C.red} strokeWidth={1} strokeDasharray="2 1"/>
        <path d="M-32 -3 V3 M33 -3 V3" stroke={C.red} strokeWidth={1}/>
        {[0,1,2,3].map(i=><rect key={i} x={-19} y={-15+i*3} width={mix(14,32,t(0,i*.03))} height={1.2} rx={.6} fill={C.red}/>)}
      </G>
    </G>
    <G x={mix(20,23,back)} y={mix(48,41,back)} r={mix(-12,0,back)} s={p(0,.03)}>
      <Bubble w={28} h={17} done/>
      <G x={13} y={10} o={t(1)}><path d="M-4 -4 L4 4 M-4 4 L4 -4" stroke={C.red} strokeWidth={1.5}/></G>
    </G>
    <G x={mix(59,64,back)} y={lensY} s={t(0,.12)}><Lens r={12} hot={!tools}/></G>
    <G x={72} y={84} s={back}><Hand/></G>
    <G x={27} y={101} s={tools}><Window w={35} h={27}><G x={2} y={0}><Bubble w={20} h={9} done/></G></Window></G>
    <G x={73} y={101} s={tools}><Window w={35} h={27}><G x={2} y={0}><Bubble w={20} h={9} done/></G></Window></G>
    <Arrow x1={28} y1={84} x2={40} y2={76} p={t(2,.2)}/>
    <Arrow x1={72} y1={84} x2={63} y2={76} p={t(2,.35)}/>
  </Stage>;
};

/** Tập nguồn sạch, ngoặc phạm vi năm mục và tiêu chí gắn đúng chặng đang giao. */
export const ChonChang: React.FC = () => {
  const {t,p,f} = useArt(); const choose=t(1); const focus=t(2);
  return <Stage overlay={<>
    <Tag i={0} x={44} y={20} show={p(0)} size={4}/>
    <Tag i={1} x={28} y={43} show={t(1)} size={3.4}/>
    <Tag i={2} x={79} y={35} show={t(1,.2)} size={3.4}/>
    <Tag i={3} x={49} y={101} show={t(2)} size={3.7}/>
  </>}>
    <G x={43} y={70} r={-3} s={p(0)}><Paper w={62} h={84} rows={5} clean/></G>
    <G x={40} y={51} o={1-choose}>
      <rect x={-13} y={-2} width={mix(0,25,t(0,.1))} height={4.5} rx={1} fill={C.ink}/>
      <rect x={-13} y={11} width={mix(0,18,t(0,.3))} height={4.5} rx={1} fill={C.ink}/>
    </G>
    <G x={14} y={48} s={1-choose}><Hand/></G>
    <G o={choose}>
      <path d="M17 38 H12 V94 H17 M65 38 H70 V94 H65" fill="none" stroke={C.gold} strokeWidth={1.3}/>
      {[0,1,2,3,4].map(i=><circle key={i} cx={12} cy={43+i*11.8} r={1.5} fill={C.gold} opacity={clamp((choose*6)-i)}/>)}
    </G>
    <G x={81} y={54} s={t(1,.15)}><Criteria w={23}/></G>
    <Stroke d="M70 51 Q74 49 78 49" p={t(1,.3)}/>
    <G x={80} y={99} s={t(0,.35)} r={6}><Paper w={21} h={29} rows={2}/></G>
    <G x={79} y={80} s={focus}><Window w={25} h={18}/></G>
    <G x={11} y={104} o={focus}><Stroke d="M0 0 H56" w={1.1} p={focus}/></G>
  </Stage>;
};

/** Các mục được ghép bằng đường dẫn tới chính đoạn nguồn, không phải hai bảng chữ. */
export const KetQuaNguon: React.FC = () => {
  const {t,p,f,at} = useArt(); const missing=t(1); const inspect=t(2);
  const scan=mix(0,4,t(2,.05,80)); const row=Math.min(4,Math.floor(scan));
  const yy=40+row*13.6;
  return <Stage overlay={<>
    <Tag i={0} x={73} y={24} show={p(0)} size={3.8}/>
    <Tag i={1} x={26} y={24} show={p(0,.05)} size={3.6}/>
    <Tag i={2} x={74} y={73} show={missing} size={3.5} hot/>
    <Tag i={3} x={50} y={103} show={inspect} size={3.8}/>
  </>}>
    <G x={26} y={71} r={-3} s={p(0)}><Paper w={35} h={81} marked={row}/></G>
    <G x={74} y={71} r={3} s={p(0,.04)}><Paper w={35} h={81} missing={missing>.5?2:-1}/></G>
    {[0,1,2,3,4].map(i=><g key={i}>
      <Stroke d={`M43 ${40+i*13.6} C49 ${35+i*13.6} 51 ${45+i*13.6} 57 ${40+i*13.6}`} p={t(0,i*.1)} color={i===2&&missing>.2?C.red:C.gold} dash={i===2&&missing>.2}/>
      <circle cx={43} cy={40+i*13.6} r={.9} fill={C.gold}/>
      <circle cx={57} cy={40+i*13.6} r={.9} fill={i===2&&missing>.2?C.red:C.gold}/>
    </g>)}
    <G x={29} y={yy} s={inspect*.8}><Lens r={9} hot={row===2}/></G>
    <G x={35} y={Math.min(yy+7,99)} s={inspect*.85}><Hand/></G>
    <G x={74} y={111} o={inspect}><path d="M-12 0 H12" stroke={C.gold} strokeWidth={.8}/>{[0,1,2,3,4].map(i=><circle key={i} cx={-10+i*5} cy={0} r={1.1} fill={C.gold}/>)}</G>
  </Stage>;
};