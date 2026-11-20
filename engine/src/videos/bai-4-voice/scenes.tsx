import React from "react";
import { useSceneText } from "../../kit/scene-context";
import { Arrow, Bubble, C, Criteria, Cross, G, Hand, Lens, Paper, Rules, Stage, Tag, Tick, Window, mix, useArt } from "../bai-4-harness/art";
import { SegNum } from "../bai-4/art";

const Labels: React.FC<{ items: [number, number, number, number][] }> = ({items}) => {
  const { t } = useArt();
  return <>{items.map(([i,x,y,beat]) => <Tag key={i} i={i} x={x} y={y} show={t(beat)} />)}</>;
};

const Stack: React.FC<{count?:number; clean?:boolean}> = ({count=5,clean}) => <>
  {Array.from({length:count}, (_,i)=><G key={i} x={i*.65} y={-i*1.5}>
    <Paper w={32} h={50} rows={4} clean={clean}/>
  </G>)}
</>;

const Digits: React.FC<{value:number; n?:number}> = ({value,n=4}) => {
  const {hideText}=useSceneText();
  return hideText ? null : <G s={.072}><SegNum value={value} n={n}/></G>;
};

const Limit: React.FC<{y:number}> = ({y}) => <path d={`M9 ${y} H91`} stroke={C.red} strokeWidth={.9} strokeDasharray="2 1.3"/>;

export const VuotVach: React.FC = () => {
  const { t }=useArt();
  return <Stage overlay={<Labels items={[[0,50,27,1],[1,72,87,2]]}/>}>
    <G x={50} y={67}><Window w={83} h={77}/></G>
    <G x={mix(28,32,t(0))} y={66}><Stack/></G>
    <G x={mix(62,65,t(0,.08))} y={61}><Stack count={6}/></G>
    <G o={t(1)}><Limit y={48}/><G x={69} y={39}><Digits value={1200}/></G></G>
    <G x={72} y={95} s={t(2)}><Bubble w={29} h={13} done/></G>
  </Stage>;
};

export const DemBanThao: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,23,18,0],[1,68,18,1],[2,50,95,3]]}/>}>
    <G x={mix(50,24,t(1))} y={70}><Stack count={4}/></G>
    <Limit y={62}/>
    <G x={19} y={54} o={t(1)}><Digits value={1200}/></G>
    {[1555,1658].map((v,i)=>{
      const p=t(i+1,.1,35), x=54+i*23, height=v/32*p;
      return <G key={v} o={p}>
        <rect x={x-8} y={99-height} width={16} height={height} fill={C.gold} rx={1.2}/>
        <rect x={x-8} y={99-height} width={16} height={Math.max(0,height-37)} fill={C.red} rx={1.2}/>
        <G x={x} y={92-height}><Digits value={v}/></G>
      </G>;
    })}
    <G x={49} y={109} o={t(3)}><Arrow x1={-24} y1={0} x2={25} y2={0} p={t(3)}/></G>
  </Stage>;
};

export const TuCham: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,25,21,0],[1,66,95,3]]}/>}>
    <G x={29} y={51}><Window w={40} h={49}/><Bubble w={25} h={15} done/></G>
    <G x={72} y={64}><Paper w={33} h={65} marked={t(2)>.5?2:-1}/></G>
    <G o={t(1)}><Limit y={47}/><G x={77} y={52}><Cross/></G></G>
    <G x={mix(72,33,t(3))} y={mix(92,82,t(3))} s={t(3)*.65}><Paper w={24} h={34} rows={2}/></G>
    <Arrow x1={66} y1={96} x2={26} y2={86} p={t(3,.12)}/>
    <G x={28} y={102} s={t(3,.28)}><Bubble done w={20} h={11}/></G>
  </Stage>;
};

const Desk: React.FC = () => <>
  <rect x={9} y={31} width={82} height={81} rx={3} fill="#423420" stroke={C.gold} strokeWidth={.8}/>
  {[40,54,75,100,107].map(y=><path key={y} d={`M12 ${y} H88`} stroke="#58432a" strokeWidth={.35}/>)}
  {[13,87].map(x=><circle key={x} cx={x} cy={107} r={.9} fill={C.gold}/>)}
</>;

export const MatBan: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,25,20,0],[1,72,20,0],[2,50,96,1]]}/>}>
    <G o={t(1)}><Desk/></G>
    {[25,73].map(x=><G key={x} x={x} y={mix(59,38,t(1))} s={mix(1,.55,t(1))}><Window w={33} h={32}/><Bubble done w={21} h={13}/></G>)}
    <G x={mix(26,48,t(3))} y={68} s={t(2)}><Paper w={25} h={36} rows={3}/></G>
    <G x={62} y={71} s={t(2)*(1-t(3))}><Stack count={3}/></G>
    <G x={78} y={87} s={t(2,.15)*(1-t(3))}><Bubble w={20} h={13}/></G>
  </Stage>;
};

export const DonBan: React.FC = () => {
  const {t}=useArt();
  const cleared=t(1,.12);
  return <Stage overlay={<Labels items={[[0,50,19,1],[1,50,92,3],[2,77,99,4]]}/>}>
    <Desk/>
    {[0,1,2,3,4,5].map(i=><G key={i} x={mix(24+i%3*24,48,cleared)} y={mix(53+Math.floor(i/3)*31,70,cleared)} s={mix(.87,.3,cleared)*t(0,i*.08)}>
      {i%2===0?<Stack count={3}/>:<Bubble w={22} h={12}/>}
    </G>)}
    <G x={48} y={68} s={cleared}><Paper w={36} h={58} rows={5}/></G>
    {[0,1].map(i=><G key={i} x={mix(37+i*25,20+i*61,t(4,i*.08))} y={mix(84+i*4,105+i*3,t(4,i*.08))} s={t(2,i*.15)}>
      <rect x={-10} y={-7} width={20} height={14} rx={2} fill={C.panel} stroke={t(3)>.1?C.red:C.gold} strokeWidth={.6}/>
      <Rules x={-7} y={-1} w={14} n={i===0?2:1}/>
    </G>)}
  </Stage>;
};

export const BaLoi: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,70,25,0],[1,70,53,1],[2,70,83,2]]}/>}>
    <G x={22} y={68}><Paper w={27} h={82} rows={6}/></G>
    <Arrow x1={36} y1={39} x2={56} y2={39} p={t(0)}/>
    <G x={70} y={39} s={t(0,.12)}><Bubble done w={28} h={13}/></G>
    <Arrow x1={36} y1={62} x2={84} y2={70} p={t(1)} color={C.red}/>
    <G x={66} y={96} s={t(2)}><Window w={44} h={27}/><Bubble done w={22} h={12}/></G>
    <Arrow x1={33} y1={96} x2={45} y2={96} p={t(2,.13)}/>
  </Stage>;
};

export const ChiaLuot: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,50,19,0],[1,25,92,1],[2,74,92,2]]}/>}>
    <Desk/>
    <G x={mix(50,26,t(0,.5,38))} y={66} o={1-t(3)}><Stack count={8}/></G>
    <G x={74} y={63} s={t(0,.55)}><Stack count={3}/></G>
    <G x={25} y={68} s={t(1)}><Paper w={31} h={61} rows={8}/></G>
    <G x={72} y={67} s={t(2)}><Lens r={13} hot/></G>
    <G x={73} y={97} o={t(2)}><Digits value={5} n={1}/><G x={12}><Digits value={12} n={2}/></G></G>
    <G x={49} y={104} s={t(3)}><Hand/></G>
  </Stage>;
};

export const ThuocDo: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,50,19,0],[1,29,95,1],[2,58,70,2]]}/>}>
    <G x={39} y={69}><Paper w={60} h={83} rows={10} missing={t(2)>.2?6:-1}/></G>
    <rect x={12} y={101} rx={1} width={52*t(1,.1,52)} height={2} fill={C.gold}/>
    <G x={26} y={107} o={t(1)}><Digits value={50} n={2}/></G>
    <G x={54} y={79} s={t(2)}><Lens r={10} hot/></G>
    <G x={79} y={52} s={t(3)}><Criteria w={21} checked={t(3,.35)>.6}/></G>
    <G x={80} y={84} s={t(3,.6)}><Bubble w={18} done/></G>
  </Stage>;
};

export const TachChat: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,71,58,0],[1,70,101,0]]}/>}>
    <G x={32} y={47}><Window old w={43} h={48}/><G x={-3} y={-6}><Bubble w={23} h={11}/></G></G>
    <G x={71} y={79} s={t(0,.1)}><Window w={43} h={49}/><G y={2}><Paper w={23} h={25} rows={2}/></G></G>
    <Arrow x1={48} y1={62} x2={54} y2={73} p={t(0,.22)}/>
    <G x={29} y={46} s={t(1)}><Bubble w={26} h={12} done/><G x={12} y={9}><Cross/></G></G>
  </Stage>;
};

export const CauLenhKiem: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,48,19,0],[1,69,95,1],[2,23,94,1]]}/>}>
    <G x={52} y={68}><Window w={82} h={84}/></G>
    <G x={42} y={66} s={t(0)}><Paper w={42} h={61} rows={6}/></G>
    <G x={mix(57,68,t(3,.1,55))} y={mix(60,79,t(3,.14,55))} s={t(1)}><Lens r={14} hot/></G>
    {[0,1,2].map(i=><G key={i} x={21} y={48+i*14} s={t(1,.12+i*.15)}><Cross/></G>)}
    <G x={80} y={49} s={t(2)*(1-t(3))}><Bubble w={14} h={10} done/><Cross/></G>
    <G x={77} y={91} s={t(3)*.75}><Hand/></G>
  </Stage>;
};

export const ViecHomNay: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,50,21,0],[1,28,93,1],[2,75,93,1]]}/>}>
    <G x={50} y={41} s={1-t(2)}>
      <circle r={13} fill={C.panel} stroke={C.gold} strokeWidth={.9}/>
      <path d={`M0 -8 V0 L${mix(0,8,t(0,.1,50))} 0`} stroke={C.paper} strokeWidth={1.2} fill="none"/>
    </G>
    <G x={28} y={72} s={t(1)}><Paper w={34} h={51} rows={5}/></G>
    <G x={73} y={72} s={t(1)*(1-t(2))}>
      <Paper w={33} h={49} rows={5}/>
      {[0,1,2].map(i=><path key={i} d={`M${-6+i*7} -16 V19`} stroke={C.gold} strokeWidth={.35}/>)}
    </G>
    <G x={73} y={70} s={t(2)}><Window w={35} h={56}/><Bubble w={20} h={12}/></G>
    <Arrow x1={45} y1={71} x2={56} y2={71} p={t(2,.15)}/>
    <G x={28} y={69} s={t(3)}><Lens r={12} hot/></G>
  </Stage>;
};

export const HenBaiSau: React.FC = () => {
  const {t}=useArt();
  return <Stage overlay={<Labels items={[[0,50,25,0],[1,50,90,1]]}/>}>
    <Desk/>
    <G x={24} y={64} s={1-t(1)*.45}><Paper w={31} h={48} rows={5}/></G>
    <G x={49} y={49} s={1-t(1)}><Bubble w={25} h={15}/></G>
    <G x={61} y={76} s={t(1)}>
      <rect x={-23} y={-10} width={46} height={31} rx={3} fill={C.panel} stroke={C.gold} strokeWidth={1}/>
      <G y={mix(-46,-12,t(2))}><rect x={-25} y={-4} width={50} height={8} rx={2} fill={C.gold}/></G>
      {[0,1,2].map(i=><G key={i} x={mix(-14+i*14,0,t(2))} y={mix(-21-i*4,0,t(2))} s={.55*(1-t(2))}><Paper w={21} h={27} rows={2}/></G>)}
      <G y={7} s={t(2)}><Tick/></G>
    </G>
  </Stage>;
};