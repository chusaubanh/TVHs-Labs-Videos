import React from "react";
import { Img, staticFile } from "remotion";
import { Arrow, Box, Cross, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, Mag, PAPER, Person, Question, RED, SEC, Stamp, SURF, TXT, lerp, useT } from "../shared/art";
import {
  Ban, Battery, Belt, BigArrow, Brain, Briefcase, Chain, ChatWin, clamp01, Coin, Computer, Corner, CornerTile, Crowd, DIM, Gear, Guy, Hourglass, House, Ladder, MarkGem,
  Map4, Mini, Mold, Moon, Network, Office, Paper, Pin, PromptCard, Quad, Quadrants, Runner, School, Spiral, Spirit, Stairs, Talk, Trophy, Tube, Weight, YinYang,
  Stage, Tag,
} from "./art";
import { MarkClaude } from "../bai-1/art";
import { Mirror, Shield, Star } from "../bai-4/art";

/** Giọt mồ hôi. */
const Drop: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <path d={`M${x} ${y - 16} Q${x + 12} ${y} ${x} ${y + 8} Q${x - 12} ${y} ${x} ${y - 16} Z`} fill="#9CC7E8" opacity={o} />
);

/** Cảnh 1 — Người đẩy mũi tên thu nhập không nhích; băng chuyền chạy ngược; lùi ra thấy khối bốn mặt bị dây kéo xuống. */
export const MoDau: React.FC = () => {
  const { f, p, l } = useT();
  const belt = l(1, 0, 12);
  const zoom = l(2, 0, 22);
  const sag = l(2, 0.3, 30) + l(3, 0.2, 20) * 0.6;
  const shake = Math.sin(f * 1.7) * 3 * (1 - zoom * 0.5);
  const S = lerp(1.45, 1, zoom);
  const cx = lerp(560, 540, zoom);
  const cy = lerp(520, 640, zoom);
  const w = [l(3, 0.05, 16), l(3, 0.38, 16), l(3, 0.72, 16)];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={lerp(760, 750, zoom)} y={lerp(300, 250, zoom)} p={p(0, 0.1)} solid size={50} />
      <Tag i={1} x={lerp(540, 250, zoom)} y={lerp(1010, 440, zoom)} p={p(1, 0.15)} solid color={RED} size={44} />
      <Tag i={2} x={880} y={620} p={p(2, 0.5)} color={RED} size={40} />
      {/* Nhãn nằm dưới quả tạ, không đè dây kéo. */}
      <Tag i={3} x={200} y={1210} p={p(3, 0.12)} size={34} />
      <Tag i={4} x={540} y={1210} p={p(3, 0.45)} size={34} />
      <Tag i={5} x={860} y={1210} p={p(3, 0.78)} size={34} />
    </>}>
      <g transform={`translate(${cx} ${cy}) scale(${S}) translate(${-640} ${-640})`}>
        {/* Băng chuyền dưới chân, chạy ngược. */}
        <G x={560} y={870} o={clamp01(belt * 2)}>
          <Belt w={720} t={f} speed={-6} />
        </G>
        {/* Vạch mốc đứng yên. */}
        <G x={300} y={846} o={belt}>
          <rect x={-5} y={-80} width={10} height={80} fill={SEC} />
          <path d="M5 -80 L50 -66 L5 -52 Z" fill={SEC} />
        </G>
        {/* Khối bốn mặt hiện khi lùi ra. */}
        <G x={660 + shake} y={680} r={sag * 7} o={clamp01(zoom * 2)}>
          <Quad size={300} lit={[zoom, zoom, zoom, zoom]} red={sag > 0.3 ? 1 : -1} t={f} />
        </G>
        {/* Mũi tên thu nhập. */}
        <G x={lerp(660, 735, zoom) + shake} y={lerp(830, 535, zoom)} r={sag * 7} s={lerp(1, 0.62, zoom) * p(0, 0)}>
          <BigArrow h={430} w={170} />
          <rect x={-40} y={-260} width={80} height={14} rx={7} fill={INK} opacity={0.35} />
          <rect x={-40} y={-220} width={80} height={14} rx={7} fill={INK} opacity={0.35} />
        </G>
        {/* Người đẩy. */}
        <G x={lerp(470, 420, zoom)} y={760} s={0.95}>
          <Guy pose="push" t={f * (0.4 + belt)} />
          <Drop x={-4} y={-200} o={0.5 + 0.5 * Math.sin(f / 5)} />
          <Drop x={34} y={-176} o={0.5 + 0.5 * Math.cos(f / 6)} />
        </G>
        {/* Dây kéo từ ba mặt xuống ba quả tạ. */}
        {zoom > 0.05 && [0, 1, 2].map((k) => {
          const from = [[580, 760], [660, 790], [740, 760]][k];
          const to = [[300, 1080], [640, 1080], [960, 1080]][k];
          const drop = w[k];
          const ty = lerp(940, to[1], drop);
          return (
            <g key={k} opacity={clamp01(zoom * 2)}>
              <line x1={from[0]} y1={from[1]} x2={lerp(from[0], to[0], clamp01(sag + drop))} y2={lerp(from[1] + 60, ty - 90, clamp01(sag + drop))} stroke={k === 1 && sag > 0.3 ? RED : SEC} strokeWidth={6} strokeDasharray={drop > 0.5 ? undefined : "10 8"} />
              <G x={to[0]} y={ty} s={drop * 0.95} o={drop}>
                <Weight color={HOV}>
                  {k === 0 && <G y={0}><Moon r={34} color={GOLDL} /><rect x={20} y={-30} width={40} height={10} rx={5} fill={RED} /></G>}
                  {k === 1 && <Battery level={0.15} s={0.8} />}
                  {k === 2 && <Question s={0.42} color={GOLDL} />}
                </Weight>
              </G>
            </g>
          );
        })}
      </g>
    </Stage>
  );
};

/** Cảnh 2 — Khối bốn mặt trải thành bản đồ; khung chat hỏi từng câu, mỗi câu thắp một ghim; con đường bốn trạm. */
export const BanDo: React.FC = () => {
  const { f, p, l, at } = useT();
  const open = l(0, 0, 22);
  const chat = l(1, 0, 16);
  const route = l(2, 0.05, 50);
  const q = [l(1, 0.15, 10), l(1, 0.45, 10), l(1, 0.72, 10)];
  const stops = [l(2, 0.2, 10), l(2, 0.38, 10), l(2, 0.6, 10), l(2, 0.82, 10)];
  void at;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.15)} solid size={56} />
      <Tag i={1} x={820} y={340} p={p(1, 0.08)} solid size={34} o={1 - route} />
      <Tag i={2} x={180} y={1130} p={p(1, 0.3)} solid size={34} o={1 - route} />
      <Tag i={3} x={450} y={1130} p={p(1, 0.55)} solid color={RED} size={34} o={1 - route} />
      <Tag i={4} x={770} y={1130} p={p(1, 0.8)} solid size={34} o={1 - route} />
      <Tag i={5} x={190} y={1130} p={p(2, 0.38)} size={34} />
      <Tag i={6} x={450} y={1130} p={p(2, 0.6)} size={34} />
      <Tag i={7} x={640} y={1130} p={p(2, 0.62)} size={34} />
      <Tag i={8} x={890} y={1130} p={p(2, 0.84)} size={34} />
    </>}>
      <G x={lerp(540, 340, chat * (1 - route))} y={lerp(640, 600, chat)} s={lerp(1.15, lerp(0.72, 0.85, route), chat) * lerp(0.6, 1, open)}>
        <Map4 w={760} h={560} open={open} lit={1} />
        {/* Ghim: điểm mạnh, điểm yếu, mong muốn thật. */}
        <G x={-230} y={-120} s={q[0]}><Pin color={GOLD} /></G>
        <G x={140} y={100} s={q[1]}><Pin color={RED} /></G>
        <G x={240} y={-150} s={q[2]}><Pin color={GOLDL} star /></G>
        {/* Con đường bốn trạm vẽ dần. */}
        <path d="M-330 230 Q-200 120 -120 160 T120 120 T300 -40 T320 -230" fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - route} />
        {([[-260, 175], [-20, 150], [210, 30], [315, -200]] as const).map(([x, y], k) => (
          <G key={k} x={x} y={y} s={stops[k]}>
            <circle r={34} fill={INK} stroke={GOLD} strokeWidth={7} />
            <text x={0} y={13} textAnchor="middle" fontSize={36} fontWeight={700} fill={GOLDL} fontFamily="Inter, sans-serif">{k + 1}</text>
          </G>
        ))}
      </G>
      {/* Trạm 2: phiếu chấm; trạm 3: Claude và Gemini; trạm 4: chồng ba thẻ prompt. */}
      <G x={190} y={1000} s={stops[1] * 0.75}>
        <Paper w={200} h={150} n={3} head={GOLD} />
        <G x={70} y={-60} s={0.5}><Hourglass p={0.4} /></G>
      </G>
      <G x={545} y={1000} s={stops[2] * 0.62}>
        <ChatWin w={420} h={220} mark={<MarkClaude r={44} />}><G x={-60} y={10}><Talk w={220} h={56} n={1} /></G></ChatWin>
        <G x={170} y={-60}><MarkGem r={40} /></G>
      </G>
      <G x={880} y={990} s={stops[3] * 0.42}>
        {[2, 1, 0].map((k) => <G key={k} x={k * 30} y={-k * 30}><PromptCard w={260} h={320} /></G>)}
      </G>
      {/* Khung chat phỏng vấn từng câu. */}
      <G x={lerp(1300, 820, chat)} y={640} o={chat * (1 - route)}>
        <ChatWin w={400} h={540}>
          {q.map((v, k) => (
            <G key={k} x={-30} y={-170 + k * 120} s={v}>
              <Talk w={300} h={70} n={1} />
              <G x={60} y={52} s={0.6}><Talk w={240} h={60} me n={1} /></G>
            </G>
          ))}
        </ChatWin>
      </G>
    </Stage>
  );
};

/** Cảnh 3 — Thẻ tác giả (ảnh thật) và tờ lịch; bốn cột năng lượng mọc cùng lúc; cột thấp nhất xích chân. */
export const LaGi: React.FC = () => {
  const { f, p, l } = useT();
  const author = l(0, 0, 16);
  const rise = l(1, 0.05, 30);
  const lock = l(2, 0.1, 18);
  const heights = [300, 250, 120, 280];
  const tug = Math.sin(f / 5) * 6 * lock;
  // Thẻ tác giả: ảnh đại diện chính thức (kênh YouTube Dan Koe), cùng toạ độ và cỡ với khung vẽ bên dưới.
  const ax = lerp(300, 230, rise);
  const ay = lerp(600, 330, rise);
  const as = author * lerp(1, 0.55, rise);
  return (
    <Stage bg={INK} overlay={<>
      {as > 0.01 && (
        <Img src={staticFile("jobs/human-3-0/dan-koe.jpg")} style={{ position: "absolute", left: ax - 132 * as, top: ay - 132 * as, width: 264 * as, height: 264 * as, borderRadius: 22 * as, objectFit: "cover" }} />
      )}
      <Tag i={0} x={lerp(300, 230, rise)} y={lerp(830, 460, rise)} p={p(0, 0.05)} solid size={44} />
      <Tag i={1} x={lerp(780, 850, rise)} y={lerp(830, 460, rise)} p={p(0, 0.6)} size={40} />
      <Tag i={2} x={540} y={560} p={p(1, 0.05)} size={36} o={1 - lock} />
      <Tag i={3} x={540} y={640} p={p(1, 0.3)} solid size={44} o={1 - lock} />
      <Tag i={4} x={540} y={600} p={p(2, 0.15)} solid color={RED} size={44} />
    </>}>
      {/* Tác giả: người cầm bút cạnh laptop, tờ lịch ngày công bố. */}
      <G x={ax} y={ay} s={as}>
        <Box cx={0} cy={0} w={300} h={300} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
      </G>
      <G x={lerp(780, 850, rise)} y={lerp(600, 330, rise)} s={p(0, 0.55) * lerp(1, 0.55, rise)}>
        <G x={0} y={0} s={1.2}>
          <Box cx={0} cy={0} w={230} h={210} rx={18} fill={TXT} />
          <rect x={-115} y={-105} width={230} height={56} rx={18} fill={GOLD} />
          <rect x={-115} y={-70} width={230} height={21} fill={GOLD} />
          <text x={0} y={40} textAnchor="middle" fontSize={96} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">8</text>
        </G>
      </G>
      {/* Bốn cột quanh hình người. */}
      <G x={540} y={1090} o={clamp01(rise * 3)}>
        {[0, 1, 2, 3].map((k) => {
          const x = [-360, -170, 170, 360][k];
          const h = heights[k] * rise;
          const weak = k === 2 && lock > 0.3;
          return (
            <G key={k} x={x}>
              <Box cx={0} cy={-h / 2} w={130} h={h} rx={20} fill={weak ? "#3A1D1D" : "#3A3322"} stroke={weak ? RED : GOLD} strokeWidth={6} />
              <G y={-h - 70} s={0.62}><Corner k={k} color={weak ? RED : GOLDL} t={f} /></G>
            </G>
          );
        })}
        <G x={tug * 0.4} y={0}><Guy s={0.95} pose={lock > 0.3 ? "walk" : "stand"} t={f * lock * 0.6} /></G>
        {lock > 0.01 && <Chain x1={170} y1={-heights[2] * rise} x2={20 + tug} y2={84} color={RED} p={lock} />}
      </G>
    </Stage>
  );
};

/** Cảnh 4 — Người thành máy tính: phần cứng, phần mềm, mạng, ứng dụng; nâng cấp ứng dụng thì giật; khung quét cả máy. */
export const MayTinh: React.FC = () => {
  const { f, p, l } = useT();
  const morph = l(0, 0.1, 18);
  const hw = l(1, 0, 16);
  const sw = l(1, 0.5, 16);
  const net = l(2, 0, 16);
  const app = l(2, 0.5, 14);
  const up = l(3, 0, 26);
  const lag = l(3, 0.55, 8);
  const scan = l(4, 0.05, 40);
  const jit = lag * (1 - scan) * Math.sin(f * 2.3) * 8;
  return (
    <Stage bg={INK} fit={{ dy: 50 }} overlay={<>
      <Tag i={0} x={220} y={905} p={p(1, 0.05)} solid size={38} />
      <Tag i={1} x={220} y={965} p={p(1, 0.2)} size={34} />
      <Tag i={2} x={540} y={250} p={p(1, 0.5)} solid size={38} />
      <Tag i={3} x={540} y={310} p={p(1, 0.62)} size={34} />
      <Tag i={4} x={880} y={250} p={p(2, 0.05)} solid size={38} />
      <Tag i={5} x={880} y={310} p={p(2, 0.18)} size={34} />
      <Tag i={6} x={860} y={905} p={p(2, 0.5)} solid size={38} />
      <Tag i={7} x={860} y={965} p={p(2, 0.62)} size={34} />
      <Tag i={8} x={540} y={1010} p={p(3, 0.6)} solid color={RED} size={42} o={1 - scan} />
      <Tag i={9} x={540} y={1010} p={p(4, 0.4)} solid size={44} />
    </>}>
      <G x={540} y={760} s={lerp(0.2, 1, morph)} o={morph}>
        <G x={jit}>
          <Computer crack={lag * (1 - scan)}>
            {/* Phần mềm: dòng mã kết thành bộ não. */}
            <G o={sw}>
              {Array.from({ length: 6 }, (_, k) => (
                <rect key={k} x={-190} y={-110 + k * 36} width={lerp(60, 140, (k * 37) % 100 / 100)} height={10} rx={5} fill={HOV} />
              ))}
              <G x={30} y={0} s={sw * 0.9}><Brain color={GOLDL} /></G>
            </G>
            {/* Ứng dụng kiếm tiền: biểu tượng cặp công tác, thanh nâng cấp. */}
            <G x={165} y={-70} s={app}>
              <Box cx={0} cy={0} w={96} h={96} rx={22} fill={GOLD} />
              <G s={0.45}><Briefcase color={INK} /></G>
              <Box cx={0} cy={72} w={110} h={16} rx={8} fill={HOV} />
              <rect x={-55} y={64} width={110 * up} height={16} rx={8} fill={GOLDL} />
            </G>
            {lag > 0.01 && <G x={165} y={60} o={lag * (1 - scan)} r={f * 9}><circle r={26} fill="none" stroke={TXT} strokeWidth={7} strokeDasharray="30 14" /></G>}
          </Computer>
          {/* Phần cứng: vỏ máy mở, bo mạch hình cơ thể. */}
          <G x={-330} y={-40} s={hw}>
            <Box cx={0} cy={0} w={170} h={300} rx={18} fill={EL} stroke={GOLD} strokeWidth={6} />
            <Box cx={0} cy={0} w={130} h={260} rx={10} fill="#1B2A1F" />
            <G y={70} s={0.5}><Runner color={GOLDL} t={f} /></G>
            <circle cy={-80} r={34} fill="none" stroke={SEC} strokeWidth={6} />
            {Array.from({ length: 6 }, (_, k) => <line key={k} x1={0} y1={-80} x2={Math.cos(k + f / 6) * 30} y2={-80 + Math.sin(k + f / 6) * 30} stroke={SEC} strokeWidth={5} />)}
            {[-30, 0, 30].map((x) => <rect key={x} x={x - 6} y={-20} width={12} height={40} rx={3} fill={GOLD} opacity={0.7} />)}
          </G>
          {/* Kết nối mạng: cột sóng tới ba người. */}
          <G x={0} y={-330} o={net}>
            <rect x={-6} y={0} width={12} height={60} fill={SEC} />
            {[30, 56, 82].map((r, k) => <path key={r} d={`M${-r} ${-r * 0.4} Q0 ${-r * 1.1} ${r} ${-r * 0.4}`} fill="none" stroke={GOLD} strokeWidth={7} opacity={clamp01(net * 3 - k)} transform="translate(0 0)" />)}
          </G>
          {[-1, 1].map((d, k) => (
            <G key={d} x={d * 300} y={-360 + k * 0} s={net * 0.55}>
              <Mini color={TXT} />
              <line x1={-d * 40} y1={-20} x2={-d * 230} y2={0} stroke={GOLD} strokeWidth={4} strokeDasharray="8 8" />
            </G>
          ))}
          <G x={350} y={-120} s={app}>
            {[0, 1, 2].map((k) => <G key={k} x={k * 18} y={((f * 2 + k * 20) % 60)} o={0.9}><Coin s={0.6} /></G>)}
          </G>
        </G>
        {/* Khung quét cả máy. */}
        {scan > 0.01 && (
          <g>
            <rect x={-440} y={lerp(-460, 140, scan) - 10} width={880} height={20} rx={10} fill={GOLDL} opacity={0.65 * (1 - Math.max(0, scan - 0.9) * 10)} />
            <rect x={-440} y={-470} width={880} height={720} rx={30} fill="none" stroke={GOLD} strokeWidth={6} strokeDasharray="22 14" opacity={scan} />
          </g>
        )}
      </G>
      {/* Hình người lúc đầu, tan vào máy. */}
      <G x={540} y={820} s={1 - morph} o={1 - morph}><Guy /></G>
    </Stage>
  );
};

/** Cảnh 5 — Bản đồ dưới kính lúp; ba tảng móng; lời tác giả; không phải trắc nghiệm, là tấm gương. */
export const KhoaHoc: React.FC = () => {
  const { f, p, l } = useT();
  const mag = l(0, 0.05, 18);
  const b = [l(1, 0.25, 14), l(1, 0.5, 14), l(1, 0.75, 14)];
  const say = l(2, 0, 14);
  const out = l(3, 0, 14);
  const mirror = l(3, 0.45, 18);
  // Lúc tác giả nói: bản đồ thu xuống nhường chỗ hai bong bóng; lúc soi mình: bản đồ dạt trái, gương đứng cạnh, không đè.
  const room = say * (1 - out);
  return (
    <Stage bg={INK} fit={{ dy: 50 }} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid size={46} o={1 - say} />
      <Tag i={1} x={210} y={1090} p={p(1, 0.3)} size={30} />
      <Tag i={2} x={210} y={1030} p={p(1, 0.33)} solid size={34} />
      <Tag i={3} x={540} y={1030} p={p(1, 0.55)} solid size={34} />
      <Tag i={4} x={870} y={1030} p={p(1, 0.8)} solid size={34} />
      <Tag i={5} x={260} y={200} p={p(2, 0.25)} solid size={38} o={1 - out} />
      <Tag i={6} x={820} y={200} p={p(2, 0.7)} solid color={RED} size={38} o={1 - out} />
      <Tag i={7} x={540} y={215} p={p(3, 0.5)} solid size={46} />
      <Tag i={8} x={760} y={540} p={p(3, 0.25)} color={RED} size={34} o={1 - mirror} />
    </>}>
      {/* Tấm bản đồ đặt trên ba tảng móng. */}
      <G x={lerp(540, 370, mirror)} y={lerp(560, 600, room)} s={lerp(1.15, 0.9, Math.max(room, mirror))}>
        <Map4 w={720} h={470} open={1} lit={1} />
      </G>
      <G x={830} y={560} o={mirror} s={mirror}>
        <Mirror s={1.3} />
        <G y={30} s={0.65}><Person fill={SEC} /></G>
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={210 + k * 330} y={lerp(1250, 930, b[k])} o={b[k]}>
          <Box cx={0} cy={0} w={300} h={170} rx={24} fill={EL} stroke={GOLD} strokeWidth={6} />
          <G y={-10}>{k === 0 ? <Quadrants s={1} /> : k === 1 ? <Spiral s={1.05} /> : <Ladder s={0.7} />}</G>
        </G>
      ))}
      <Box cx={540} cy={840} w={980} h={10} rx={5} fill={HOV} opacity={b[0]} />
      {/* Kính lúp với dấu hỏi. */}
      <G x={lerp(900, 640, mag)} y={lerp(200, 500, mag)} o={mag * (1 - say)}>
        <Mag s={1.5} />
        <G y={-150} s={0.6}><Question color={GOLDL} /></G>
      </G>
      {/* Lời tác giả: hai bong bóng. */}
      <G x={260} y={310} s={room}>
        <Box cx={0} cy={0} w={220} h={150} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
        <path d="M-40 70 L-70 110 L-10 74 Z" fill={GOLD} />
        <Tube s={1} />
      </G>
      <G x={820} y={310} s={room}>
        <Box cx={0} cy={0} w={220} h={150} rx={30} fill={EL} stroke={RED} strokeWidth={6} />
        <path d="M40 70 L70 110 L10 74 Z" fill={RED} />
        <Cross r={42} />
      </G>
      {/* Phiếu trắc nghiệm và ống nghe bị gạch, trượt ra. */}
      <G x={lerp(760, 1250, mirror)} y={460} s={out * 0.9} o={1 - mirror}>
        <Paper w={170} h={220} n={0} fill={TXT} />
        {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={-40 + (k % 4) * 26} cy={-60 + Math.floor(k / 4) * 50} r={9} fill={k % 3 ? HOV : INK} />)}
        <Ban r={110} />
      </G>
    </Stage>
  );
};

/** Cảnh 6 — Khung 2×2 vẽ dần; mỗi góc sáng lên với các biểu tượng thành phần. */
export const BonGoc: React.FC = () => {
  const { f, p, l } = useT();
  const grid = l(0, 0, 24);
  const lit = [l(1, 0, 12), l(2, 0, 12), l(3, 0, 12), l(4, 0, 12)];
  const C: [number, number][] = [[290, 450], [790, 450], [290, 860], [790, 860]];
  const subs: React.ReactNode[][] = [
    [<Talk key="a" w={90} h={56} n={1} />, <path key="b" d="M0 26 C-40 -4 -32 -36 -12 -34 Q-4 -34 0 -24 Q4 -34 12 -34 C32 -36 40 -4 0 26 Z" fill={RED} />, <G key="c" s={0.5}><rect x={-14} y={-40} width={28} height={70} rx={6} fill={TXT} /><path d="M0 -70 Q16 -50 0 -42 Q-16 -50 0 -70 Z" fill={GOLD} /></G>, <G key="d" s={0.35}><Mirror /></G>, <G key="e"><path d="M-46 -30 Q-24 -40 0 -30 V30 Q-24 20 -46 30 Z" fill={TXT} /><path d="M46 -30 Q24 -40 0 -30 V30 Q24 20 46 30 Z" fill={SEC} /></G>],
    [<path key="a" d="M0 26 C-40 -4 -32 -36 -12 -34 Q-4 -34 0 -24 Q4 -34 12 -34 C32 -36 40 -4 0 26 Z" fill={RED} />, <Battery key="b" level={1} s={0.55} />, <Moon key="c" r={28} />, <G key="d"><path d="M-40 -6 Q0 50 40 -6 Z" fill={SEC} /><rect x={-46} y={-12} width={92} height={10} rx={5} fill={TXT} /></G>, <G key="e" s={0.32}><Person fill={TXT} /></G>],
    [<G key="a"><circle cx={-18} cy={0} r={22} fill={TXT} /><circle cx={18} cy={0} r={22} fill={GOLDL} /></G>, <Crowd key="b" n={3} gap={30} s={0.6} color={TXT} />, <G key="c" s={0.4}><circle r={60} fill={EL} stroke={GOLD} strokeWidth={8} /><path d="M0 -44 L10 0 L0 44 L-10 0 Z" fill={GOLD} /></G>, <G key="d" s={0.6}><path d="M-50 -20 L-26 -46 H26 L50 -20 L0 46 Z" fill={GOLDL} /></G>],
    [<G key="a" s={0.4}><Briefcase color={TXT} /></G>, <G key="b"><rect x={-8} y={-36} width={16} height={60} rx={6} fill={SEC} transform="rotate(35)" /><circle cx={-16} cy={-26} r={16} fill="none" stroke={SEC} strokeWidth={8} /></G>, <G key="c">{[0, 1, 2].map((k) => <ellipse key={k} cx={0} cy={18 - k * 14} rx={30} ry={10} fill={GOLD} stroke={INK} strokeWidth={2} />)}</G>, <G key="d" s={0.3}><Network p={1} /></G>, <G key="e"><path d="M-30 -14 H-6 L20 -34 V34 L-6 14 H-30 Z" fill={TXT} />{[18, 34].map((r) => <path key={r} d={`M${r + 10} -${r * 0.7} Q${r + 30} 0 ${r + 10} ${r * 0.7}`} fill="none" stroke={GOLD} strokeWidth={5} />)}</G>],
  ];
  return (
    <Stage bg={INK} overlay={<>
      {[0, 1, 2, 3].map((k) => <Tag key={k} i={k * 2} x={C[k][0]} y={C[k][1] - 175} p={p(k + 1, 0.02)} solid size={40} />)}
      {[0, 1, 2, 3].map((k) => <Tag key={k + 10} i={k * 2 + 1} x={C[k][0]} y={C[k][1] - 120} p={p(k + 1, 0.12)} size={30} />)}
      {[0, 1, 2, 3].map((k) => <Tag key={k + 20} i={8 + k} x={C[k][0]} y={C[k][1] + 165} p={p(k + 1, 0.3)} size={32} />)}
    </>}>
      {[0, 1, 2, 3].map((k) => {
        const [x, y] = C[k];
        return (
          <G key={k} x={x} y={y} s={lerp(0.5, 1, grid)} o={grid}>
            <Box cx={0} cy={0} w={460} h={380} rx={34} fill={lit[k] > 0.5 ? "#1F1C14" : SURF} stroke={lit[k] > 0.5 ? GOLD : HOV} strokeWidth={6} />
            <G y={10} s={lerp(0.6, 0.85, lit[k])}><Corner k={k} color={lit[k] > 0.5 ? GOLDL : DIM} t={f} /></G>
            <G y={10} o={1 - lit[k]}><G x={150} y={-130} s={0.25}><Question color={SEC} /></G></G>
            {subs[k].map((node, j) => {
              const n = subs[k].length;
              const a = -Math.PI * 0.95 + (j / (n - 1)) * Math.PI * 0.9 + Math.PI;
              const sj = clamp01(lit[k] * 1.6 - j * 0.12);
              return <G key={j} x={Math.cos(a) * 160} y={30 + Math.sin(a) * 105} s={sj * 0.9}>{node}</G>;
            })}
          </G>
        );
      })}
    </Stage>
  );
};

/** Cảnh 7 — Bảng 4 góc × 3 level điền từng hàng bằng hình. */
export const BangLevel: React.FC = () => {
  const { f, p, l } = useT();
  const open = l(0, 0.1, 20);
  const cell = (r: number, c: number) => l(r + 1, 0.05 + c * 0.33, 12);
  const X = [380, 620, 860];
  const Y = [340, 530, 720, 910];
  const art: React.ReactNode[][] = [
    [<G key="0"><Crowd n={5} gap={34} s={0.8} color={HOV} /><G y={-4}><Mini s={0.8} color={GOLDL} /></G></G>, <G key="1"><Mini s={0.9} color={GOLDL} /><G x={46} y={-10}><Box cx={0} cy={0} w={40} h={52} rx={6} fill={TXT} /></G></G>, <G key="2"><Mini s={0.8} color={GOLDL} />{[0, 1, 2, 3, 4].map((k) => <Arrow key={k} x1={0} y1={-30} x2={Math.cos(k * 1.26) * 80} y2={-30 + Math.sin(k * 1.26) * 50} color={GOLD} w={5} />)}</G>],
    [<G key="0"><Box cx={-20} cy={10} w={90} h={34} rx={10} fill={SEC} /><Box cx={-50} cy={-6} w={30} h={20} rx={6} fill={TXT} /><Box cx={50} cy={6} w={36} h={44} rx={6} fill={RED} opacity={0.8} /></G>, <G key="1"><rect x={-60} y={-8} width={50} height={16} rx={6} fill={GOLD} /><rect x={-70} y={-20} width={12} height={40} rx={4} fill={TXT} /><rect x={-14} y={-20} width={12} height={40} rx={4} fill={TXT} />{[0, 1, 2].map((k) => <rect key={k} x={20 + k * 16} y={14 - k * 14} width={10} height={16 + k * 14} rx={3} fill={GOLDL} />)}</G>, <G key="2"><Box cx={0} cy={30} w={120} h={20} rx={8} fill={GOLD} /><G y={22} s={0.8}><Mini color={GOLDL} /></G></G>],
    [<G key="0" s={0.6}><path d="M-80 -30 Q0 -60 80 -30 Q86 30 30 40 Q0 10 -30 40 Q-86 30 -80 -30 Z" fill={SEC} /><ellipse cx={-36} cy={-6} rx={18} ry={11} fill={INK} /><ellipse cx={36} cy={-6} rx={18} ry={11} fill={INK} /></G>, <G key="1" s={0.55}><circle r={70} fill={EL} stroke={GOLD} strokeWidth={8} /><path d="M0 -54 L14 0 L0 54 L-14 0 Z" fill={SEC} /><path d="M0 -54 L14 0 H-14 Z" fill={GOLD} /></G>, <G key="2"><circle r={56} fill="none" stroke={GOLD} strokeWidth={5} />{Array.from({ length: 7 }, (_, k) => <G key={k} x={Math.cos(k * 0.9) * 56} y={Math.sin(k * 0.9) * 56 + 10} s={0.35}><Mini color={TXT} /></G>)}<G y={14} s={0.55}><Mini color={GOLDL} /></G></G>],
    [<G key="0"><circle cx={-30} cy={0} r={30} fill={TXT} stroke={GOLD} strokeWidth={4} /><line x1={-30} y1={0} x2={-30} y2={-20} stroke={INK} strokeWidth={5} /><Arrow x1={6} y1={0} x2={40} y2={0} color={GOLD} w={5} /><G x={62}><Coin s={0.6} /></G></G>, <G key="1"><Stairs n={3} step={32} rise={18} lit={[1, 1, 1]} /><G x={80} y={-30} s={0.35}><circle r={60} fill={GOLD} /><circle r={36} fill={INK} /><circle r={14} fill={GOLD} /></G></G>, <G key="2"><G x={-26} s={0.4}><Gear r={60} rot={f * 3} /></G><G x={30} y={-18} s={0.26}><Gear r={60} rot={-f * 3} fill={GOLDL} /></G>{[0, 1, 2].map((k) => <G key={k} x={60 + k * 22} y={24} s={0.3}><Mini color={TXT} /></G>)}</G>],
  ];
  return (
    <Stage bg={INK} overlay={<>
      {[0, 1, 2].map((c) => <Tag key={c} i={c} x={X[c]} y={232} p={p(0, 0.3 + c * 0.1)} solid size={40} />)}
      {[0, 1, 2, 3].map((r) => <Tag key={r + 3} i={3 + r} x={140} y={Y[r] + 50} p={p(0, 0.5 + r * 0.08)} size={30} />)}
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <Tag key={`${r}${c}`} i={7 + r * 3 + c} x={X[c]} y={Y[r] + 66} p={cell(r, c)} size={28} color={GOLDL} />))}
    </>}>
      {/* Cột trái: biểu tượng góc. */}
      {[0, 1, 2, 3].map((r) => (
        <G key={r} x={140} y={Y[r] - 16} s={p(0, 0.5 + r * 0.08) * 0.48}>
          <Corner k={r} color={l(r + 1, 0, 8) > 0.5 ? GOLDL : SEC} t={f} />
        </G>
      ))}
      {/* Lưới ô. */}
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => (
        <G key={`${r}-${c}`} x={X[c]} y={Y[r]} s={open}>
          <Box cx={0} cy={0} w={220} h={176} rx={20} fill={cell(r, c) > 0.5 ? "#1F1C14" : SURF} stroke={cell(r, c) > 0.5 ? GOLD : HOV} strokeWidth={4} />
          <G y={-16} s={cell(r, c)}>{art[r][c]}</G>
        </G>
      )))}
      {/* Mũi tên tiến từ level 1 sang 3. */}
      <Arrow x1={300} y1={1040} x2={960} y2={1040} p={open} color={GOLD} w={8} />
    </Stage>
  );
};

/** Cảnh 8 — Đồng hồ chia đều bị gạch; bốn bánh răng khớp nhau; bánh Sự nghiệp phình to; chùm sáng giai đoạn dồn lực. */
export const TichHop: React.FC = () => {
  const { f, p, l } = useT();
  const pie = l(0, 0, 14);
  const ban = l(0, 0.55, 8);
  const gears = l(1, 0, 20);
  const big = l(2, 0.05, 24);
  const ok = l(2, 0.6, 12);
  const beam = l(3, 0.05, 16);
  const R = [lerp(100, 82, big), lerp(100, 82, big), lerp(100, 82, big), lerp(100, 170, big)];
  const P: [number, number][] = [[lerp(400, 270, big), lerp(560, 520, big)], [lerp(660, 300, big), lerp(560, 820, big)], [lerp(400, 500, big), lerp(820, 330, big)], [lerp(660, 620, big), lerp(820, 640, big)]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={220} p={p(0, 0.2)} solid size={44} o={1 - gears} />
      <Tag i={1} x={300} y={220} p={p(1, 0.1)} solid size={44} />
      <Tag i={2} x={760} y={220} p={p(1, 0.15)} size={40} color={SEC} />
      <Tag i={3} x={540} y={1010} p={p(1, 0.5)} size={38} o={1 - big} />
      <Tag i={4} x={820} y={330} p={p(2, 0.2)} solid size={38} o={1 - beam} />
      <Tag i={5} x={260} y={1010} p={p(2, 0.65)} size={36} />
      <Tag i={6} x={820} y={1010} p={p(3, 0.3)} solid size={40} />
    </>}>
      {/* Đồng hồ chia đều bốn múi. */}
      <G x={540} y={620} s={pie * (1 - gears)} o={1 - gears}>
        <circle r={260} fill={EL} stroke={GOLD} strokeWidth={8} />
        {[0, 1, 2, 3].map((k) => <line key={k} x1={0} y1={0} x2={Math.cos((k * Math.PI) / 2) * 260} y2={Math.sin((k * Math.PI) / 2) * 260} stroke={GOLD} strokeWidth={6} />)}
        {[0, 1, 2, 3].map((k) => <G key={k} x={Math.cos((k * Math.PI) / 2 + Math.PI / 4) * 140} y={Math.sin((k * Math.PI) / 2 + Math.PI / 4) * 140} s={0.6}><Corner k={k} color={SEC} /></G>)}
        <G s={ban}><Ban r={300} /></G>
      </G>
      {/* Chùm sáng dồn lực. */}
      {beam > 0.01 && (
        <g opacity={beam}>
          <path d={`M${P[3][0] - 60} 120 L${P[3][0] + 60} 120 L${P[3][0] + R[3] * 1.5} ${P[3][1]} L${P[3][0] - R[3] * 1.5} ${P[3][1]} Z`} fill={GOLDL} opacity={0.18} />
          <line x1={140} x2={940} y1={1110} y2={1110} stroke={SEC} strokeWidth={5} />
          <rect x={lerp(540, 300, beam)} y={1098} width={lerp(0, 480, beam)} height={24} rx={12} fill={GOLD} />
          {[300, 780].map((x) => <circle key={x} cx={x} cy={1110} r={16} fill={GOLDL} opacity={beam} />)}
        </g>
      )}
      {/* Bốn bánh răng khớp nhau. */}
      {[0, 1, 2, 3].map((k) => {
        const dir = k === 3 || k === 0 ? 1 : -1;
        const speed = (100 / R[k]) * 2.2;
        return (
          <G key={k} x={P[k][0]} y={P[k][1]} s={gears} o={gears}>
            <Gear r={R[k]} n={k === 3 ? 16 : 10} rot={f * speed * dir + k * 10} fill={k === 3 ? GOLD : SEC}>
              <G s={R[k] / 150}><Corner k={k} color={GOLDL} t={f} /></G>
            </Gear>
            {(k === 1 || k === 2) && <G x={R[k] * 0.8} y={-R[k] * 0.8} s={ok * 0.5}><Stamp r={50} color={GOLDL} /></G>}
          </G>
        );
      })}
    </Stage>
  );
};

/** Cảnh 9 — Ba bậc thang; dòng người đi qua; bậc một: người trong khuôn nhận bài tập từ nhà, trường, công ty, xã hội; băng chuyền đẩy đi. */
export const Level1: React.FC = () => {
  const { f, p, l } = useT();
  const st = l(0, 0, 22);
  const flow = l(1, 0, 70);
  const zoom = l(2, 0, 22);
  const sheets = [l(2, 0.15, 14), l(2, 0.35, 14), l(2, 0.55, 14), l(2, 0.75, 14)];
  const ticks = l(3, 0.1, 40);
  const safe = l(4, 0, 14);
  const S = lerp(1, 1.7, zoom);
  const src: [number, number][] = [[150, 500], [150, 780], [930, 500], [930, 780]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(1, 0.2)} size={40} o={1 - zoom} />
      <Tag i={1} x={540} y={215} p={p(2, 0.02)} solid size={44} />
      <Tag i={2} x={540} y={285} p={p(2, 0.06)} solid size={42} />
      <Tag i={3} x={540} y={350} p={p(2, 0.1)} size={32} color={SEC} />
      {[0, 1, 2, 3].map((k) => <Tag key={k} i={4 + k} x={src[k][0]} y={src[k][1] + 110} p={sheets[k]} size={30} o={1 - safe * 0.6} />)}
      <Tag i={8} x={300} y={1190} p={p(4, 0.1)} solid size={36} />
      <Tag i={9} x={780} y={1190} p={p(4, 0.5)} solid color={RED} size={36} />
    </>}>
      <g transform={`translate(${lerp(0, -260, zoom)} ${lerp(0, -760, zoom)}) scale(${S})`} opacity={1 - zoom}>
        <G x={100} y={1120} o={st}><Stairs n={3} step={300} rise={230} p={st} /></G>
        {[0, 1, 2].map((k) => (
          <text key={k} x={245 + k * 300} y={1120 - (k + 1) * 230 + 140} textAnchor="middle" fontSize={96} fontWeight={800} fill={GOLD} opacity={st} fontFamily="Inter, sans-serif">{k + 1}</text>
        ))}
        {/* Dòng người bước lên. */}
        {[0, 1, 2, 3, 4].map((k) => {
          const t = clamp01(flow * 1.6 - k * 0.18);
          const step = Math.min(2, Math.floor(t * 3));
          return <G key={k} x={180 + t * 760} y={1120 - (step + 1) * 230 - 24} s={0.8} o={t > 0 && t < 1 ? 1 : 0}><Mini color={k % 2 ? TXT : GOLDL} /></G>;
        })}
      </g>
      {/* Phóng vào bậc 1. */}
      <G o={zoom}>
        <G x={540} y={1100} s={zoom}>
          <Box cx={0} cy={0} w={900} h={80} rx={18} fill={EL} stroke={GOLD} strokeWidth={6} />
        </G>
        <G x={540} y={1020} s={zoom}>
          <Belt w={760} t={f} speed={4 * safe} hot={safe} />
        </G>
        <G x={lerp(540, 600, safe) + Math.sin(f / 10) * 6 * safe} y={760}>
          <G y={0} s={zoom}>
            <Mold w={300} h={480} color={GOLD} />
            <G y={190}><Guy pose={ticks > 0.02 && ticks < 0.98 ? "walk" : "stand"} t={f * 0.3} /></G>
            {/* Bong bóng suy nghĩ trống trơn. */}
            <G x={150} y={-130} s={ticks}>
              <ellipse cx={0} cy={0} rx={80} ry={56} fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="12 10" />
              <circle cx={-60} cy={66} r={12} fill="none" stroke={SEC} strokeWidth={5} />
            </G>
            {/* Chồng bài tập trên tay. */}
            {sheets.map((v, k) => {
              const [sx, sy] = src[k];
              const tx = 150 + k * 6;
              const ty = 120 - k * 22;
              const done = clamp01(ticks * 4 - k);
              return (
                <G key={k} x={lerp(sx - 540, tx, v)} y={lerp(sy - 760, ty, v)} s={lerp(0.6, 0.5, v)} o={v} r={(k - 1.5) * 6}>
                  <Paper w={170} h={120} n={3} fill={PAPER} />
                  <G x={60} y={-30} s={done * 0.5}><Stamp r={40} color={GOLD} /></G>
                </G>
              );
            })}
            {/* Khiên an toàn. */}
            <G x={-210} y={40} s={safe * 0.9}><Shield color={GOLD} /></G>
          </G>
        </G>
        {/* Nguồn bài tập: nhà, trường, văn phòng, đám đông. */}
        {src.map(([x, y], k) => (
          <G key={k} x={x} y={y} s={zoom * 0.9}>
            {k === 0 ? <House s={1} color={SEC} /> : k === 1 ? <School s={0.9} color={SEC} /> : k === 2 ? <Office s={0.75} color={SEC} /> : <Crowd n={3} gap={36} s={0.9} color={SEC} />}
          </G>
        ))}
      </G>
    </Stage>
  );
};

/** Cảnh 10 — Bậc hai: tự đặt mục tiêu, lý trí, thành tích, trách nhiệm; hàng người công sở. Bậc ba: nhiều góc nhìn, nghịch lý, mạng lưới; cúp toả sáng thành vòng cộng đồng. */
export const Level23: React.FC = () => {
  const { f, p, l } = useT();
  const two = l(0, 0, 16);
  const tear = l(0, 0.35, 12);
  const props = [l(1, 0.05, 12), l(1, 0.4, 12), l(1, 0.7, 12)];
  const row = l(2, 0, 20);
  const three = l(3, 0, 20);
  const net = l(3, 0.55, 30);
  const glow = l(4, 0.05, 24);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={270} y={215} p={p(0, 0.02)} solid size={44} />
      <Tag i={1} x={270} y={285} p={p(0, 0.08)} solid size={40} />
      <Tag i={2} x={270} y={345} p={p(0, 0.12)} size={30} color={SEC} />
      <Tag i={3} x={270} y={760} p={p(1, 0.42)} size={32} />
      <Tag i={4} x={455} y={950} p={p(1, 0.72)} size={32} />
      <Tag i={5} x={810} y={215} p={p(3, 0.02)} solid size={44} />
      <Tag i={6} x={810} y={285} p={p(3, 0.08)} solid size={40} />
      <Tag i={7} x={810} y={345} p={p(3, 0.12)} size={30} color={SEC} />
      <Tag i={8} x={930} y={500} p={p(3, 0.35)} size={30} />
      <Tag i={9} x={810} y={1190} p={p(4, 0.2)} solid size={40} />
    </>}>
      <line x1={540} x2={540} y1={160} y2={1180} stroke={HOV} strokeWidth={4} strokeDasharray="12 14" opacity={three} />
      {/* Bậc hai. */}
      <G x={270} y={0} o={two}>
        <Box cx={0} cy={1110} w={430} h={60} rx={16} fill="#3A3322" stroke={GOLD} strokeWidth={6} />
        <G y={540}>
          <G x={-110} y={0} s={0.85} r={tear * -20} o={1 - tear}><Paper w={130} h={170} n={4} /></G>
          {tear > 0.05 && tear < 0.95 && [0, 1].map((k) => <G key={k} x={-140 + k * 60} y={tear * 120} r={(k ? 30 : -30) * tear} o={(1 - tear) * 0.9 + 0.1 * (1 - l(1, 0, 10))}><Box cx={0} cy={0} w={60} h={160} rx={8} fill={PAPER} /></G>)}
          <G x={110} y={0} s={p(0, 0.4) * 0.8}>
            <circle r={70} fill={GOLD} /><circle r={46} fill={INK} /><circle r={22} fill={GOLD} />
            <rect x={-3} y={-150} width={6} height={150} fill={TXT} />
            <path d="M3 -150 L60 -134 L3 -118 Z" fill={GOLDL} />
          </G>
        </G>
        <G x={-140} y={850} s={props[0] * 0.5}><Gear r={80} rot={f * 2} fill={SEC}><G s={0.5}><Brain color={GOLDL} /></G></Gear></G>
        <G x={0} y={860} s={props[1] * 0.75}><Trophy /></G>
        <G x={140} y={860} s={props[2]}>
          <Box cx={0} cy={0} w={90} h={70} rx={10} fill={GOLDL} />
          <path d="M-45 -10 H45" stroke={INK} strokeWidth={4} />
        </G>
        <G x={0} y={1060} s={0.75}><Guy pose={props[2] > 0.5 ? "carry" : "stand"} /></G>
        {/* Hàng người công sở, mỗi người một góc sáng. */}
        {[0, 1, 2, 3].map((k) => (
          <G key={k} x={-180 + k * 120} y={1180} s={row * 0.45} o={row}>
            <Mini color={SEC} />
            <G y={-6} s={0.28}><Corner k={k} color={GOLDL} /></G>
          </G>
        ))}
      </G>
      {/* Bậc ba. */}
      <G x={810} y={0} o={three}>
        <Box cx={0} cy={1110} w={430} h={60} rx={16} fill="#3A3322" stroke={GOLD} strokeWidth={6} />
        {glow > 0.01 && <circle cx={0} cy={700} r={lerp(80, 200, glow)} fill={GOLD} opacity={0.12 * glow} />}
        {glow > 0.01 && <circle cx={0} cy={700} r={lerp(80, 200, glow)} fill="none" stroke={GOLD} strokeWidth={6} opacity={glow} />}
        <G y={690} s={net * 0.9}><Network p={net} /></G>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <Arrow key={k} x1={0} y1={600} x2={Math.cos(k * 1.05) * 170} y2={600 + Math.sin(k * 1.05) * 120} p={three} color={GOLD} w={6} />
        ))}
        <G x={110} y={420} s={p(3, 0.35) * 0.6}><YinYang rot={f * 1.5} /></G>
        <G x={-150} y={420} s={glow * 0.6}><Trophy /></G>
        {[0, 1, 2].map((k) => <G key={k} x={-120 + k * 120} y={940} s={net * 0.4}><Mini color={TXT} /></G>)}
        <G x={0} y={1060} s={0.75}><Guy pose={glow > 0.3 ? "cheer" : "stand"} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 11 — Con đường ba trạm; biển 2.1; trạm bất an: áo chật, giày nứt; áo bung, đèn vàng bật. */
export const GiaiDoan1: React.FC = () => {
  const { f, p, l } = useT();
  const road = l(0, 0, 30);
  const sign = l(1, 0.05, 12);
  const fly = l(1, 0.5, 18);
  const st1 = l(2, 0, 14);
  const burst = l(3, 0.05, 12);
  const light = l(3, 0.4, 12);
  const stations: [number, number][] = [[230, 1010], [560, 790], [860, 560]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(1, 0.05)} solid size={60} o={1 - st1} />
      <Tag i={1} x={330} y={330} p={p(1, 0.55)} size={36} o={1 - st1} />
      <Tag i={2} x={750} y={330} p={p(1, 0.7)} size={36} o={1 - st1} />
      <Tag i={3} x={540} y={215} p={p(2, 0.02)} solid size={50} />
      <Tag i={4} x={540} y={285} p={p(2, 0.06)} size={30} color={SEC} />
      <Tag i={5} x={400} y={560} p={p(2, 0.6)} solid color={RED} size={38} />
      <Tag i={6} x={900} y={790} p={p(3, 0.4)} solid size={40} />
    </>}>
      {/* Hai bậc thang ở hai đầu đường. */}
      <G x={60} y={1200}><Stairs n={1} step={130} rise={120} lit={[1]} /></G>
      <G x={870} y={700}><Stairs n={1} step={150} rise={170} /></G>
      <path d="M130 1060 Q560 1060 560 790 T900 540" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - road} opacity={0.9} />
      {stations.map(([x, y], k) => (
        <G key={k} x={x} y={y} s={l(0, 0.3 + k * 0.2, 10)}>
          <circle r={46} fill={k === 0 && st1 > 0.5 ? GOLD : INK} stroke={GOLD} strokeWidth={7} />
          <text y={14} textAnchor="middle" fontSize={38} fontWeight={800} fill={k === 0 && st1 > 0.5 ? INK : GOLDL} fontFamily="Inter, sans-serif">{`.${k + 1}`}</text>
        </G>
      ))}
      {/* Biển 2.1: số tách về bậc và trạm. */}
      <G x={540} y={520} s={sign * (1 - st1) * 1.3}>
        <G o={1 - fly}><Box cx={0} cy={0} w={320} h={180} rx={24} fill={GOLD} /></G>
        {/* "2" rơi lên bậc, ".1" rơi vào trạm .1 rồi tan vào số của trạm. */}
        <G x={lerp(-60, -319, fly)} y={lerp(0, 450, fly)}><text y={36} textAnchor="middle" fontSize={110} fontWeight={800} fill={fly > 0.5 ? GOLDL : INK} fontFamily="Inter, sans-serif">2</text></G>
        <G x={lerp(70, -238, fly)} y={lerp(0, 377, fly)} o={1 - fly}><text y={36} textAnchor="middle" fontSize={110} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">.1</text></G>
      </G>
      {/* Người ở trạm .1: áo chật, giày nứt, vạch mốc đứng yên. */}
      <G x={400} y={880} s={st1 * 1.35}>
        <G x={Math.sin(f / 4) * 3 * (1 - burst)}><Guy fill={SEC} tie={false} /></G>
        {/* Áo chật: dải bó và đường may. */}
        <G o={1 - burst}>
          <path d="M-40 -60 H40" stroke={RED} strokeWidth={6} strokeDasharray="6 6" />
          <path d="M-36 -20 H36" stroke={RED} strokeWidth={6} strokeDasharray="6 6" />
        </G>
        {burst > 0.01 && [0, 1, 2, 3].map((k) => (
          <G key={k} x={(k % 2 ? 1 : -1) * (30 + burst * 80)} y={-60 + Math.floor(k / 2) * 50 + burst * 30} r={(k % 2 ? 1 : -1) * burst * 50} o={1 - burst * 0.7}>
            <Box cx={0} cy={0} w={50} h={40} rx={8} fill={SEC} />
          </G>
        ))}
        {burst > 0.01 && <G y={-40} s={burst}><Mold w={180} h={330} color={GOLD} broken={burst} /></G>}
        <path d="M-50 100 l10 -8 l8 8" stroke={RED} strokeWidth={4} fill="none" />
        <path d="M30 100 l10 -8 l8 8" stroke={RED} strokeWidth={4} fill="none" />
      </G>
      <G x={150} y={1010} s={st1}><rect x={-4} y={-60} width={8} height={60} fill={SEC} /><path d="M4 -60 L40 -50 L4 -40 Z" fill={SEC} /></G>
      {/* Đèn tín hiệu vàng. */}
      <G x={900} y={980} s={light}>
        <rect x={-8} y={0} width={16} height={180} fill={HOV} />
        <Box cx={0} cy={-60} w={110} h={150} rx={30} fill={EL} stroke={HOV} strokeWidth={5} />
        <circle cy={-60} r={40} fill={GOLD} />
        <circle cy={-60} r={lerp(40, 80, (f % 30) / 30)} fill="none" stroke={GOLDL} strokeWidth={4} opacity={1 - (f % 30) / 30} />
      </G>
    </Stage>
  );
};

/** Cảnh 12 — Trạm .2: người cũ tan, người mới nét đứt, sương; ngã ba: tiến lên hay quay lại. Trạm .3: sương tan, người mới đứng vững, đường lên bậc tiếp. */
export const GiaiDoan23: React.FC = () => {
  const { f, p, l } = useT();
  const two = l(0, 0, 18);
  const fork = l(1, 0.05, 18);
  const three = l(2, 0, 20);
  const fog = two * (1 - three);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={215} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={300} y={280} p={p(0, 0.1)} size={30} color={SEC} />
      <Tag i={2} x={660} y={285} p={p(1, 0.3)} solid size={36} o={1 - three} />
      <Tag i={3} x={190} y={1170} p={p(1, 0.6)} solid color={RED} size={36} />
      <Tag i={4} x={780} y={215} p={p(2, 0.05)} solid size={46} />
      <Tag i={5} x={780} y={280} p={p(2, 0.1)} size={30} color={SEC} />
      <Tag i={6} x={760} y={1190} p={p(2, 0.55)} solid size={38} />
    </>}>
      <path d="M100 1000 Q300 960 420 880" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
      {/* Ngã ba. */}
      <path d="M420 880 Q560 780 660 560" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - fork} />
      <path d="M420 880 Q300 920 180 1100" fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeDasharray="20 14" opacity={fork * (1 - three * 0.6)} />
      <G x={150} y={1060} s={fork * (1 - three * 0.5)} r={0}>
        <rect x={-6} y={-90} width={12} height={90} fill={HOV} />
        <path d="M-70 -150 H50 L80 -120 L50 -90 H-70 Z" fill={RED} transform="scale(-1 1)" />
      </G>
      <G x={660} y={560} s={fork * (1 - three)}>
        <G y={-20}><BigArrow h={220} w={110} fill={GOLD} /></G>
      </G>
      {/* Trạm .2: người cũ tan thành hạt, người mới nét đứt. */}
      <G x={300} y={760} o={two * (1 - three)}>
        {Array.from({ length: 16 }, (_, k) => {
          const a = k * 2.4;
          const d = two * (40 + (k % 5) * 30);
          return <circle key={k} cx={-60 + Math.cos(a) * d} cy={-80 + Math.sin(a) * d - two * 40} r={10 - (k % 3) * 2} fill={SEC} opacity={1 - two * 0.6} />;
        })}
        <G x={-60} o={1 - two}><Guy fill={SEC} tie={false} /></G>
        <G x={90} y={0}>
          <circle cy={-150} r={34} fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="10 8" />
          <path d="M-40 10 Q-46 -110 0 -116 Q46 -110 40 10 Z" fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="10 8" />
        </G>
      </G>
      {/* Sương mù. */}
      {fog > 0.01 && [0, 1, 2, 3].map((k) => (
        <ellipse key={k} cx={200 + k * 220 + Math.sin(f / 30 + k) * 30} cy={760 + (k % 2) * 80} rx={220} ry={60} fill={SEC} opacity={0.16 * fog} />
      ))}
      {/* Trạm .3: người mới đứng vững, đường lên bậc tiếp. */}
      <G x={780} y={760} s={three}>
        <Guy fill={GOLDL} />
        <G y={-260} s={0.6}><Star r={40} fill={GOLD} /></G>
      </G>
      <G x={900} y={1100} o={three}>
        <path d="M-200 0 Q-60 -10 0 -180" fill="none" stroke={GOLD} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(2, 0.4, 20)} />
        <G x={-80} y={-200}><Stairs n={2} step={90} rise={90} lit={[1, 1]} /></G>
      </G>
      {([[300, 900, 2], [780, 960, 3]] as const).map(([x, y, n], k) => (
        <G key={n} x={x} y={y} s={k === 0 ? two : three}>
          <circle r={40} fill={GOLD} />
          <text y={13} textAnchor="middle" fontSize={34} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">{`.${n}`}</text>
        </G>
      ))}
    </Stage>
  );
};

/** Cảnh 13 — Gọi lại hình mở đầu dưới kính lúp; thẻ .1 bất an trên một góc; đạp nhanh mà đứng yên; AI tìm đúng chỗ ống nghẽn. */
export const ChungLai: React.FC = () => {
  const { f, p, l } = useT();
  const mag = l(0, 0.1, 18);
  const tag = l(1, 0.2, 12);
  const fast = l(2, 0, 10) * (1 - l(3, 0, 10));
  const ai = l(3, 0.05, 18);
  const pipe = l(3, 0.35, 24);
  const knot = l(3, 0.7, 10);
  const stop = l(3, 0, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={830} y={560} p={p(1, 0.25)} solid color={RED} size={38} o={1 - ai} />
      <Tag i={2} x={300} y={1110} p={p(2, 0.15)} size={38} o={1 - ai} />
      <Tag i={3} x={760} y={1130} p={p(3, 0.72)} solid color={RED} size={38} />
      <Tag i={4} x={300} y={1130} p={p(3, 0.15)} solid size={38} />
    </>}>
      <G x={540} y={lerp(760, 660, ai)} s={lerp(1, 0.6, ai)} o={1 - ai}>
        <G x={0} y={240}><Belt w={720} t={f} speed={-(6 + fast * 18) * (1 - stop)} hot={fast} /></G>
        <G x={-240} y={216}><rect x={-5} y={-80} width={10} height={80} fill={SEC} /><path d="M5 -80 L50 -66 L5 -52 Z" fill={SEC} /></G>
        <G x={120} y={40}><Quad size={300} t={f} red={tag > 0.5 ? 1 : -1} /></G>
        <G x={-110} y={130}><Guy pose="push" t={f * (0.4 + fast * 2) * (1 - stop)} /></G>
        <G x={290} y={-110} s={tag}>
          <Box cx={0} cy={0} w={120} h={60} rx={30} fill={RED} />
          <text y={18} textAnchor="middle" fontSize={44} fontWeight={800} fill={TXT} fontFamily="Inter, sans-serif">.1</text>
        </G>
        {fast > 0.05 && [0, 1, 2].map((k) => <path key={k} d={`M${-300 - k * 30} ${210 + k * 10} h-60`} stroke={SEC} strokeWidth={5} strokeLinecap="round" opacity={fast} />)}
      </G>
      {/* Kính lúp từ cảnh trước. */}
      <G x={lerp(950, 900, mag)} y={lerp(180, 450, mag)} o={mag * (1 - ai)}>
        <Mag s={1.5} />
      </G>
      {/* Khung chat AI; ống nối bốn góc, kính lúp chỉ chỗ thắt. */}
      <G x={540} y={560} o={ai}>
        <G x={0} y={-120} s={ai}><ChatWin w={600} h={320}><G x={-80} y={10}><Talk w={300} h={64} n={1} /></G></ChatWin></G>
        <path d="M-370 250 H370" stroke={SEC} strokeWidth={34} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - pipe} />
        <path d="M-370 250 H370" stroke={INK} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - pipe} />
        {[-360, -120, 120, 360].map((x, k) => (
          <G key={k} x={x} y={230} s={clamp01(pipe * 4 - k)}>
            <CornerTile k={k} w={200} h={200} lit={k === 2 ? 0 : 1} red={k === 2 && knot > 0.5 ? 1 : 0} t={f} />
          </G>
        ))}
        <G x={240} y={250} s={knot * 1.3}>
          <circle r={28} fill={RED} />
          <path d="M-20 -10 Q0 18 20 -10 M-20 10 Q0 -18 20 10" stroke={TXT} strokeWidth={5} fill="none" />
        </G>
        <G x={240} y={420} s={knot * 1.2} r={-90}><Mag s={1} /></G>
      </G>
    </Stage>
  );
};
