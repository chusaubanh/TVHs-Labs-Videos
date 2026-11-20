import React from "react";
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Label, SceneProvider } from "../../kit/scene-context";
import type { TrainingScene } from "../../training/training-contract";

export interface AccountingBeat {
  id: string; labels: string[]; section: string; voiceText: string; visual: string;
  kind: string; startFrame: number; durationInFrames: number; audioDurationSec: number; audio: string;
}
export interface AccountingTimeline { totalFrames: number; beats: AccountingBeat[] }

const INK = "#EDEDED", GOLD = "#C5A059", PAPER = "#0C0C0C", GRAY = "#5E6065";
const SURFACE = "#141517", ELEVATED = "#1E1F23", GOLD_LIGHT = "#E0C286";
const clipRoot = "jobs/ke-toan-to-uyen/";
const ease = Easing.bezier(0.18, 0.72, 0.26, 1);
const bounded = (f: number, a: number, b: number, x = 0, y = 1) => interpolate(f, [a, Math.max(a + 1, b)], [x, y], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

const Page: React.FC<{ x: number; y: number; w?: number; h?: number; fill?: string; scan?: number; draft?: boolean }> = ({ x, y, w = 270, h = 360, fill = SURFACE, scan = -1, draft = false }) => <g transform={`translate(${x} ${y})`}>
  <path d={`M 0 18 Q 0 0 18 0 H ${w - 50} L ${w} 50 V ${h - 18} Q ${w} ${h} ${w - 18} ${h} H 18 Q 0 ${h} 0 ${h - 18} Z`} fill={fill} stroke={INK} strokeWidth={5} />
  <path d={`M ${w - 50} 0 V 50 H ${w}`} fill="none" stroke={INK} strokeWidth={5} />
  <rect x={28} y={65} width={w - 56} height={14} rx={7} fill={draft ? GOLD : INK} />
  {Array.from({ length: Math.max(1, Math.min(6, Math.floor((h - 125) / 31))) }, (_, v) => <rect key={v} x={28} y={108 + v * 31} width={w - 56 - (v % 3) * 17} height={9} rx={4} fill={GRAY} />)}
  <path d={`M 30 ${h - 45} H ${w * 0.56}`} stroke={INK} strokeWidth={3} />
  {scan >= 0 && <rect x={14} y={60 + scan * (h - 95)} width={w - 28} height={16} rx={8} fill={GOLD} opacity={0.7} />}
</g>;

const Folder: React.FC<{ x: number; y: number; scale?: number; open?: number }> = ({ x, y, scale = 1, open = 0 }) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M 0 65 Q 0 40 25 40 H 135 L 169 75 H 360 Q 385 75 385 100 V 305 Q 385 330 360 330 H 25 Q 0 330 0 305 Z" fill={GOLD_LIGHT} stroke={PAPER} strokeWidth={6} />
  <g transform={`translate(65 ${90 - open * 95})`}><Page x={0} y={0} w={245} h={255} /></g>
  <path d={`M 0 120 Q 0 100 25 100 H 370 Q 395 100 391 125 L ${370 + open * 20} 310 Q 367 330 345 330 H 25 Q 0 330 0 305 Z`} fill={GOLD} stroke={PAPER} strokeWidth={6} />
</g>;

const Receipt: React.FC<{ x: number; y: number; scan?: number }> = ({ x, y, scan = -1 }) => <g transform={`translate(${x} ${y})`}>
  <path d="M 0 0 H 250 V 370 L 230 355 L 210 370 L 190 355 L 170 370 L 150 355 L 130 370 L 110 355 L 90 370 L 70 355 L 50 370 L 30 355 L 0 370 Z" fill={SURFACE} stroke={INK} strokeWidth={5} />
  <circle cx={125} cy={59} r={24} fill={GOLD} />
  {[0, 1, 2, 3, 4].map((v) => <g key={v}><rect x={27} y={112 + v * 35} width={111 - v % 2 * 22} height={9} rx={3} fill={GRAY} /><rect x={170} y={112 + v * 35} width={50} height={9} rx={3} fill={GRAY} /></g>)}
  <path d="M 27 300 H 220" stroke={INK} strokeWidth={3} /><rect x={143} y={321} width={77} height={13} rx={3} fill={INK} />
  {scan >= 0 && <rect x={12} y={95 + scan * 230} width={226} height={17} rx={7} fill={GOLD} opacity={0.75} />}
</g>;

const Person: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <circle cx={0} cy={0} r={69} fill={PAPER} stroke={INK} strokeWidth={6} />
  <path d="M -125 220 V 142 Q -125 82 -66 82 H 66 Q 125 82 125 142 V 220" fill={GOLD} stroke={INK} strokeWidth={6} />
  <path d="M -30 85 L 0 133 L 30 85 M 0 133 V 216" fill="none" stroke={PAPER} strokeWidth={5} />
</g>;

const Arrow: React.FC<{ x: number; y: number; length?: number; p?: number }> = ({ x, y, length = 180, p = 1 }) => <g opacity={p} transform={`translate(${x} ${y})`}>
  <path d={`M 0 0 H ${length}`} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeDasharray={length} strokeDashoffset={length * (1 - p)} />
  <path d={`M ${length - 21} -18 L ${length} 0 L ${length - 21} 18`} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
</g>;

const Text: React.FC<{ i?: number; x?: number; y?: number; size?: number; width?: number }> = ({ i = 0, x = 50, y = 82, size = 39, width = 88 }) => <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: `${width}%`, transform: "translateX(-50%)", textAlign: "center", color: INK, fontSize: size, fontWeight: 800, lineHeight: 1.25 }}><Label i={i} /></div>;

/** Each illustration is private to this screencast; all motions are frame functions. */
export const AccountingArtwork: React.FC<{ beatId: string }> = ({ beatId }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = bounded(f, 0, Math.min(durationInFrames - 1, fps * 3.5));
  const enter = bounded(f, 0, fps * 0.55);
  const progress = f / Math.max(1, durationInFrames - 1);
  const introPages = beatId === "intro-01";
  const identity = beatId === "intro-02";
  const flow = beatId === "intro-03";
  const compare = beatId === "intro-04" || beatId === "b24";
  const update = beatId === "intro-05";
  const unzip = beatId === "b01";
  const handoff = beatId === "b39";
  const three = beatId === "b40";
  const finish = beatId === "b41";
  return <AbsoluteFill style={{ backgroundColor: PAPER, overflow: "hidden", fontFamily: "Be Vietnam Pro, sans-serif" }}>
    <svg width="100%" height="100%" viewBox="0 0 1600 900" style={{ position: "absolute" }}>
      <rect x={0} y={0} width={1600} height={900} fill={PAPER} />
      <circle cx={1240} cy={340} r={350} fill={SURFACE} />
      <g opacity={enter} transform={`translate(0 ${30 * (1 - enter)})`}>
        {introPages && <>
          <g transform={`translate(${20 * (1 - p)} 0) rotate(${-4 * (1 - p)} 530 400)`}><Page x={330} y={170} w={360} h={465} scan={Math.min(1, p * 1.5)} /></g>
          <g transform={`rotate(${4 * (1 - p)} 1050 400)`}><Page x={905} y={170} w={360} h={465} draft scan={Math.max(0, Math.min(1, (p - 0.3) * 1.5))} /></g>
          <path d="M 718 375 H 860 M 842 356 L 861 375 L 842 394" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
        </>}
        {identity && <><rect x={255} y={190} width={1080} height={480} rx={22} fill={SURFACE} stroke={GOLD} strokeWidth={5} /><path d="M 255 260 H 1335" stroke={GRAY} strokeWidth={4} /><circle cx={290} cy={224} r={8} fill={GOLD} /><Folder x={605} y={270} scale={1.05} open={p} /><path d={`M 390 415 H ${390 + p * 170}`} stroke={INK} strokeWidth={6} /><circle cx={370} cy={415} r={27} fill={GOLD} /></>}
        {flow && <>
          <Person x={195} y={305} scale={0.68} /><Receipt x={365} y={265} />
          <Arrow x={648} y={435} length={130} p={bounded(f, fps * 0.6, fps * 1.5)} />
          <rect x={815} y={321} width={175} height={220} rx={24} fill={ELEVATED} stroke={GOLD} strokeWidth={4} />
          {[0, 1, 2].map((row) => [0, 1, 2].map((col) => <rect key={`${row}-${col}`} x={842 + col * 45} y={370 + row * 46} width={27} height={26} rx={5} fill={GOLD} opacity={bounded(f, fps * (1.2 + (row + col) * .18), fps * (1.5 + (row + col) * .18))} />))}
          <Arrow x={1030} y={435} length={120} p={bounded(f, fps * 2, fps * 2.8)} />
          <g opacity={bounded(f, fps * 2.1, fps * 3.1)}><Page x={1210} y={165} w={235} h={300} /><Page x={1240} y={480} w={235} h={210} draft /></g>
        </>}
        {compare && <>
          <rect x={225} y={168} width={585} height={505} rx={24} fill={SURFACE} stroke={INK} strokeWidth={5} />
          <Receipt x={1040} y={230} scan={p} />
          <path d="M 835 470 H 1000" stroke={INK} strokeWidth={6} strokeDasharray="13 12" strokeDashoffset={-Math.min(f, 100)} />
          <path d="M 975 450 L 1000 470 L 975 490" fill="none" stroke={INK} strokeWidth={6} />
          <circle cx={922} cy={470} r={30} fill={GOLD} /><circle cx={918} cy={465} r={13} fill="none" stroke={PAPER} strokeWidth={4} /><path d="M 928 476 L 940 488" stroke={PAPER} strokeWidth={5} strokeLinecap="round" />
        </>}
        {update && <>
          <Page x={570} y={125} w={470} h={560} />
          <rect x={604} y={315} width={402} height={78} rx={9} fill={GOLD} />
          <path d="M 260 390 H 510 M 490 370 L 511 390 L 490 410" fill="none" stroke={INK} strokeWidth={6} />
          <Arrow x={1040} y={390} length={240} p={p} />
        </>}
        {unzip && <>
          <g transform={`rotate(${-5 * (1 - p)} 370 400)`}><Page x={225} y={195} w={310} h={420} /><path d="M 380 220 V 570" stroke={INK} strokeWidth={17} strokeDasharray="13 9" /><rect x={359} y={260 + p * 225} width={43} height={61} rx={10} fill={GOLD} stroke={INK} strokeWidth={5} /></g>
          <Arrow x={610} y={425} length={180} p={p} /><Folder x={900} y={245} scale={1.15} open={p} />
        </>}
        {handoff && <>
          <Page x={225} y={180} w={345} h={460} draft />
          <Arrow x={655} y={435} length={260} p={p} />
          <Person x={1195} y={285} scale={1.15} />
          <g transform={`translate(${580 + p * 390} 475)`}><Page x={0} y={0} w={155} h={195} draft /></g>
        </>}
        {three && <>
          <Page x={320} y={145} w={390} h={515} scan={Math.min(1, progress * 2.7)} />
          <g opacity={bounded(f, durationInFrames * .25, durationInFrames * .4)} transform={`translate(${80 * (1 - bounded(f, durationInFrames * .25, durationInFrames * .4))} 0)`}><Receipt x={1010} y={210} scan={Math.min(1, Math.max(0, (progress - .35) * 3))} /></g>
          <Arrow x={760} y={440} length={170} p={bounded(f, durationInFrames * .35, durationInFrames * .55)} />
          <ellipse cx={490} cy={616} rx={128} ry={29} fill="none" stroke={GOLD} strokeWidth={10} opacity={bounded(f, durationInFrames * .65, durationInFrames * .8)} />
        </>}
        {finish && <>
          <g transform={`translate(${140 * p} 0)`}><Page x={300} y={160} w={365} h={470} /><rect x={327 + bounded(f, durationInFrames * .35, durationInFrames * .65) * 400} y={225} width={310} height={25} rx={5} fill={GOLD} opacity={1 - bounded(f, durationInFrames * .45, durationInFrames * .7)} /></g>
          <Arrow x={850} y={435} length={150} p={bounded(f, durationInFrames * .5, durationInFrames * .8)} />
          <path d="M 1050 460 H 1370 L 1400 630 H 1020 Z" fill={GOLD} stroke={INK} strokeWidth={6} /><path d="M 1040 530 H 1135 L 1165 570 H 1255 L 1285 530 H 1385" fill="none" stroke={INK} strokeWidth={6} />
        </>}
      </g>
    </svg>
    {introPages && <><Img src={staticFile(clipRoot + "decision-page.png")} style={{ position: "absolute", left: "22%", top: "22%", width: "19%", height: "43%", objectFit: "cover", objectPosition: "top", opacity: bounded(f, fps * .6, fps) }} /><Img src={staticFile(clipRoot + "report-page.png")} style={{ position: "absolute", left: "58%", top: "22%", width: "19%", height: "43%", objectFit: "cover", objectPosition: "top", opacity: bounded(f, fps * .9, fps * 1.3) }} /></>}
    {compare && <Img src={staticFile(clipRoot + "report-detail.png")} style={{ position: "absolute", left: "15%", top: "20%", width: "34%", height: "52%", objectFit: "contain" }} />}
    {update && <><div style={{ position: "absolute", left: "38%", top: "36%", width: "24%", textAlign: "center", color: PAPER, fontSize: 37, fontWeight: 800, opacity: 1 - bounded(f, fps, fps * 1.6) }}><Label i={1} /></div><div style={{ position: "absolute", left: "38%", top: "36%", width: "24%", textAlign: "center", color: PAPER, fontSize: 37, fontWeight: 800, opacity: bounded(f, fps * 1.5, fps * 2) }}><Label i={2} /></div></>}
    <Img src={staticFile("brand/tvhs-logo.png")} style={{ position: "absolute", left: "5%", top: "4%", width: "21%", height: "auto", objectFit: "contain" }} />
    {flow ? <><Text i={0} x={21} y={76} size={31} width={30} /><Text i={1} x={30} y={71} size={29} width={20} /><Text i={2} x={85} y={13} size={30} width={20} /><Text i={3} x={85} y={78} size={30} width={20} /></> : three ? <>{[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: `${23 + i * 28}%`, top: "83%", transform: "translateX(-50%)", opacity: bounded(f, durationInFrames * i / 3, durationInFrames * i / 3 + 10), color: INK, fontSize: 37, fontWeight: 800 }}><Label i={i} /></div>)}</> : <Text size={identity ? 43 : 39} />}
  </AbsoluteFill>;
};

type Span = [number, number];
const cuts: Record<string, { clip: string; spans: Span[]; focus?: [number, number, number] }> = {
  b02: { clip: "c1", spans: [[4.35, 6.2]] }, b03: { clip: "c1", spans: [[6.2, 8.5]] },
  b04: { clip: "c1", spans: [[9.6, 11], [24.8, 26.8]], focus: [2.35, .51, .47] }, b05: { clip: "c1", spans: [[27, 29.3]] },
  b06: { clip: "c1", spans: [[32.4, 34.9]] }, b07: { clip: "c1", spans: [[34.9, 36.3]] }, b08: { clip: "c1", spans: [[36.6, 38.8]] },
  b09: { clip: "c2", spans: [[0, 12.25]], focus: [1.7, .56, .26] }, b10: { clip: "c2", spans: [[12.15, 14.1]] },
  b11: { clip: "c2", spans: [[24, 25.4], [62, 64.2]] }, b12: { clip: "c2", spans: [[64.2, 65.5]], focus: [1.8, .63, .45] },
  b13: { clip: "c3", spans: [[.8, 3.3]] }, b14: { clip: "c3", spans: [[3.3, 6.3]] },
  b15: { clip: "c3", spans: [[43, 46.7]] }, b16: { clip: "c3", spans: [[46.7, 51.1]] }, b17: { clip: "c3", spans: [[51.8, 53.4]] },
  b18: { clip: "c3", spans: [[56, 58], [69, 75]], focus: [2.2, .52, .82] },
  b19: { clip: "c3", spans: [[76, 96]], focus: [2.2, .52, .82] }, b20: { clip: "c3", spans: [[97, 109]], focus: [2.2, .52, .82] },
  b21: { clip: "c3", spans: [[109, 111]] }, b22: { clip: "c3", spans: [[143, 147]], focus: [1.8, .62, .56] },
  b23: { clip: "c3", spans: [[147, 151]], focus: [2.05, .62, .63] }, b25: { clip: "c3", spans: [[237, 241], [243, 244]], focus: [1.45, .53, .79] },
  b26: { clip: "c3", spans: [[250, 252], [322, 326]] }, b27: { clip: "c3", spans: [[326, 330]], focus: [1.85, .61, .39] },
  b28: { clip: "c3", spans: [[330, 335]], focus: [1.8, .6, .48] }, b29: { clip: "c3", spans: [[362, 367]], focus: [1.25, .63, .5] },
  b30: { clip: "c3", spans: [[367, 370]], focus: [1.4, .65, .5] }, b31: { clip: "c3", spans: [[370, 374]], focus: [1.4, .65, .48] },
  b32: { clip: "c3", spans: [[394, 397], [404.6, 405.5]] }, b33: { clip: "c3", spans: [[405.5, 407.5]], focus: [1.35, .5, .38] },
  b34: { clip: "c3", spans: [[407.5, 410.7]], focus: [1.4, .5, .54] }, b35: { clip: "c3", spans: [[410.7, 412.1]], focus: [1.45, .5, .6] },
  b36: { clip: "c3", spans: [[412.1, 418.4]] }, b37: { clip: "c3", spans: [[418.4, 422.7]], focus: [1.25, .5, .47] },
  b38: { clip: "c3", spans: [[422.7, 427]] , focus: [1.25, .5, .57] },
};

const ScreencastBeat: React.FC<{ beat: AccountingBeat }> = ({ beat }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const edit = cuts[beat.id];
  if (!edit) throw new Error(`Missing cut map: ${beat.id}`);
  const sum = edit.spans.reduce((v, [a, b]) => v + b - a, 0);
  let consumed = 0;
  const [zoom = 1, x = .5, y = .5] = edit.focus ?? [];
  const focusY = beat.id === "b25" ? interpolate(f, [0, beat.durationInFrames * .65, beat.durationInFrames * .84], [.79, .79, .2], { extrapolateRight: "clamp" }) : y;
  // Ease toward the relevant UI region; never animate from wall-clock time.
  const scale = zoom === 1 ? 1 : interpolate(f, [0, Math.min(18, beat.durationInFrames - 1), beat.durationInFrames - 1], [zoom * .98, zoom, zoom * 1.025], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ overflow: "hidden", backgroundColor: PAPER }}>
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: `${x * 100}% ${focusY * 100}%` }}>
      {edit.spans.map(([a, b], i) => {
        const from = Math.round(consumed / sum * beat.durationInFrames);
        consumed += b - a;
        const end = i === edit.spans.length - 1 ? beat.durationInFrames : Math.round(consumed / sum * beat.durationInFrames);
        const duration = end - from;
        return <Sequence key={i} from={from} durationInFrames={duration} layout="none"><OffthreadVideo src={staticFile(clipRoot + edit.clip + ".mp4")} trimBefore={Math.round(a * fps)} playbackRate={(b - a) / (duration / fps)} muted style={{ width: "100%", height: "100%", objectFit: "contain" }} /></Sequence>;
      })}
    </AbsoluteFill>
  </AbsoluteFill>;
};

export const AccountingFilm: React.FC<{ timeline: AccountingTimeline; hideText?: boolean }> = ({ timeline, hideText = false }) => <AbsoluteFill style={{ backgroundColor: PAPER }}>
  {timeline.beats.map((beat) => {
    const labels = beat.id === "intro-05" ? [...beat.labels, "3.238.000 đồng", "3.560.000 đồng"] : beat.labels;
    const scene: TrainingScene = { id: beat.id, section: beat.section, contentType: "huong-dan", component: "ke-toan-to-uyen/film", voiceSegments: [beat.voiceText], visual: [beat.visual], labels, sfx: [] };
    const timing = { id: beat.id, startSec: beat.startFrame / 30, durationSec: beat.durationInFrames / 30, sentences: [{ text: beat.voiceText, audio: beat.audio, startSec: 0, durationSec: beat.audioDurationSec }] };
    return <Sequence key={beat.id} name={beat.id} from={beat.startFrame} durationInFrames={beat.durationInFrames}>
      <SceneProvider value={{ scene, timing, hideText }}>
        {beat.kind === "broll" ? <AccountingArtwork beatId={beat.id} /> : <ScreencastBeat beat={beat} />}
        <Audio src={staticFile(beat.audio)} playbackRate={1.1} />
      </SceneProvider>
    </Sequence>;
  })}
  <Img src={staticFile("brand/watermark.png")} style={{ position: "absolute", top: 44, right: 44, width: 84, height: "auto", opacity: .4 }} />
</AbsoluteFill>;

export const AccountingOpening: React.FC = () => <AccountingArtwork beatId="intro-01" />;
export const AccountingIdentity: React.FC = () => <AccountingArtwork beatId="intro-02" />;
export const AccountingWorkflow: React.FC = () => <AccountingArtwork beatId="intro-03" />;
export const AccountingCompare: React.FC = () => <AccountingArtwork beatId="b24" />;
export const AccountingUpdate: React.FC = () => <AccountingArtwork beatId="intro-05" />;
export const AccountingUnzip: React.FC = () => <AccountingArtwork beatId="b01" />;
export const AccountingHandoff: React.FC = () => <AccountingArtwork beatId="b39" />;
export const AccountingThreeChecks: React.FC = () => <AccountingArtwork beatId="b40" />;
export const AccountingFinish: React.FC = () => <AccountingArtwork beatId="b41" />;
