import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Label, useSceneText } from "../../kit/scene-context";
import { EL, G, GOLD, GOLDL, HOV, INK, RED, SEC, Stage, Tag, TXT, XL, lerp, useT } from "../tro-ly-phap-che/art";
import { Captions } from "./kit";
import {
  Arrow, Ask, Bub, Calc, ChatWin, Cross, Cursor, Folder, Hand, Hourglass, InputBar, Invoice, LOGO_DIR, Logo, MoneyCard, ORANGE, Pen, Person, Robot, Sheet, Stamp, Tick, Wire, Zip, clamp01,
} from "./parts";

/** Đoạn chữ lấy từ lời đọc câu `sentence`: cắt trước `stop` (hoặc sau `after`), ẩn ở bản tắt chữ. */
function usePart(sentence: number, opts: { stop?: string; after?: string }): string {
  const { voiceSegments, hideText } = useSceneText();
  let t = voiceSegments[sentence] ?? "";
  if (opts.after && t.includes(opts.after)) t = t.slice(t.indexOf(opts.after) + opts.after.length);
  if (opts.stop && t.includes(opts.stop)) t = t.slice(0, t.indexOf(opts.stop));
  return hideText ? "" : t.replace(/[.;]$/, "").trim();
}

/** Chữ đang gõ: phần sau dấu hai chấm của lời đọc câu `sentence`, hiện dần theo frac (ẩn ở bản tắt chữ). */
function useTyped(sentence: number, frac: number): string {
  const { voiceSegments, hideText } = useSceneText();
  const full = voiceSegments[sentence] ?? "";
  const at = full.indexOf(": ");
  const cmd = (at >= 0 ? full.slice(at + 2) : full).replace(/[.]$/, "");
  return hideText ? "" : cmd.slice(0, Math.floor(cmd.length * Math.min(1, Math.max(0, frac))));
}

/** Nhóm hình hiện từ câu `from` và rời đi khi tới câu `until` (nếu có). */
function usePhase() {
  const t = useT();
  const phase = (from: number, until?: number) => (until === undefined ? t.p(from) : t.p(from) * (1 - t.l(until, 0, 10)));
  return { ...t, phase };
}

/** Nền cảnh b-roll: lưới thương hiệu, phụ đề dưới. */
export const BrollStage: React.FC<{ overlay?: React.ReactNode; under?: React.ReactNode; children?: React.ReactNode }> = ({ overlay, under, children }) => (
  <Stage
    still
    overlay={
      <>
        {under}
        {overlay}
        <Captions />
      </>
    }
  >
    {children}
  </Stage>
);

/** Tách một phần của cảnh ra khỏi svg: nhãn là HTML nên đi qua overlay. */

/* ---------- Mở đầu ---------- */
export const MoDau: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 1);
  const b = phase(1, 2);
  const c = phase(2, 3);
  const d = phase(3, 4);
  const e = p(4);
  const strike = [l(0, 0.2, 14), l(0, 0.4, 14), l(0, 0.6, 14), l(0, 0.8, 14)];
  const sand = (f % 90) / 90;
  const slide = l(1, 0.05, 20);
  const stamp = p(1, 0.5);
  const sum = l(2, 0.1, 30);
  const words = l(2, 0.55, 20);
  const wires = Array.from({ length: 12 }, (_, i) => l(3, 0.1 + i * 0.065, 10));
  const grid = l(4, 0.1, 26);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={620} y={190} p={a} solid />
          <Tag i={1} x={1060} y={190} p={a} solid color={GOLD} />
          <Tag i={2} x={640} y={170} p={c} solid />
          <Tag i={3} x={1260} y={170} p={words * c} solid color={XL} />
          <Tag i={4} x={960} y={150} p={d} solid color={XL} />
          <Tag i={5} x={960} y={790} p={e} size={42} solid />
        </>
      }
    >
      {/* Câu 1: bàn kế toán, hai tờ văn bản bị gạch đỏ từng dòng, máy tính, đồng hồ cát. */}
      <G o={Math.min(1, a)}>
        <rect x={160} y={620} width={1600} height={26} rx={13} fill={HOV} />
        <Sheet x={620} y={440} w={330} h={400} n={7} />
        <Sheet x={1060} y={440} w={330} h={400} n={7} stroke={GOLDL} head={GOLD} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={470} y={410 + i * 34} width={300 * strike[i]!} height={7} rx={3} fill={RED} opacity={0.9} />
            <rect x={910} y={410 + i * 34} width={300 * strike[i]!} height={7} rx={3} fill={RED} opacity={0.9} />
          </g>
        ))}
        <Calc x={1420} y={470} s={1.35} />
        <Hourglass x={300} y={470} s={1.4} t={sand} />
      </G>
      {/* Câu 2: hai tờ trượt vào khung Word sạch, con dấu đóng xuống. */}
      <G o={Math.min(1, b)}>
        <rect x={560} y={210} width={800} height={560} rx={30} fill="#15171B" stroke={GOLD} strokeWidth={5} />
        <rect x={560} y={210} width={800} height={60} rx={30} fill={EL} />
        <rect x={560} y={246} width={800} height={24} fill={EL} />
        <Sheet x={lerp(250, 800, slide)} y={500} w={290} h={400} n={6} />
        <Sheet x={lerp(1670, 1120, slide)} y={500} w={290} h={400} n={6} stroke={GOLDL} head={GOLD} />
        <Stamp x={960} y={560} p={stamp} color={XL} ok w={230} h={130} r={-6} />
      </G>
      {/* Câu 3: cột số tiền cộng thành tổng, tổng đổi thành chữ. */}
      <G o={Math.min(1, c)}>
        <rect x={480} y={260} width={960} height={520} rx={30} fill={EL} stroke={GOLD} strokeWidth={4} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={560} y={310 + i * 62} width={420 + (i % 2) * 120} height={26} rx={13} fill={HOV} />
            <rect x={1130} y={308 + i * 62} width={160} height={30} rx={15} fill={GOLDL} opacity={0.75} />
          </g>
        ))}
        <line x1={560} y1={570} x2={1290} y2={570} stroke={GOLD} strokeWidth={6} />
        <G x={1210} y={630} s={0.6 + 0.4 * sum} o={sum}>
          <rect x={-120} y={-30} width={240} height={60} rx={16} fill={GOLD} />
        </G>
        <path d="M560 690 L1290 690" stroke={GOLD} strokeWidth={0} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={560} y={650 + i * 30} width={(520 - i * 120) * words} height={14} rx={7} fill={XL} />
        ))}
      </G>
      {/* Câu 4: hai văn bản đặt cạnh nhau, mười hai sợi dây lần lượt sáng xanh. */}
      <G o={Math.min(1, d)}>
        <Sheet x={420} y={500} w={340} h={560} n={10} />
        <Sheet x={1500} y={500} w={340} h={560} n={10} stroke={GOLDL} head={GOLD} />
        {wires.map((t, i) => {
          const y = 300 + i * 40;
          return <Wire key={i} x1={600} y1={y} x2={1320} y2={y + ((i % 3) - 1) * 14} t={Math.min(1, t * 1.5)} color={t > 0.9 ? XL : GOLD} sw={5} />;
        })}
      </G>
      {/* Câu 5 dùng lớp HTML bên dưới (logo). */}
      <G o={Math.min(1, e)}>
        {Array.from({ length: 36 }, (_, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          const dd = Math.hypot(col - 2.5, row - 2.5) / 3.6;
          const k = clamp01(grid * 1.6 - dd * 0.6);
          return <rect key={i} x={960 - 330 + col * 110} y={400 - 330 + row * 110 + (1 - k) * 30} width={96} height={96} rx={16} fill={HOV} stroke={GOLD} strokeWidth={2} opacity={0.5 * k} />;
        })}
        <circle cx={960} cy={400} r={170 * Math.min(1, e)} fill={INK} stroke={GOLDL} strokeWidth={4} />
      </G>
    </BrollStage>
  );
};

export const MoDauWithLogo: React.FC = () => {
  const { p } = useT();
  const e = p(4);
  return (
    <AbsoluteFill>
      <MoDau />
      <Logo name="claude" x={960} y={400} size={220} p={e} />
    </AbsoluteFill>
  );
};

/* ---------- Cần chuẩn bị ---------- */
export const CanChuanBi: React.FC = () => {
  const { p, l } = usePhase();
  const claude = p(0);
  const gpt = p(0, 0.3);
  const apps = l(0, 0.6, 16);
  const up = l(1, 0, 16);
  const zip = p(1, 0.05);
  const trip = p(1, 0.3);
  const inv = p(1, 0.55);
  const top = lerp(400, 250, up);
  const sc = lerp(1, 0.72, up);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={560} y={top + 215 * sc} p={claude} solid />
          <Tag i={1} x={1360} y={top + 215 * sc} p={gpt} solid color={XL} />
          <Tag i={2} x={1360} y={top + 215 * sc + 62} p={gpt} />
          <Tag i={3} x={480} y={845} p={zip} />
          <Tag i={4} x={960} y={845} p={trip} solid />
          <Tag i={5} x={1440} y={845} p={inv} solid color={GOLD} />
          <Logo name="claude" x={560} y={top} size={250 * sc} p={claude} />
          {/* Logo OpenAI thật (trắng) trên nền tròn xanh, cùng cỡ logo Claude. */}
          <div
            style={{ position: "absolute", left: 1360 - 125 * sc, top: top - 125 * sc, width: 250 * sc, height: 250 * sc, borderRadius: "50%", background: "#10A37F", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${gpt})`, opacity: clamp01(gpt) }}
          >
            <Img src={staticFile(`${LOGO_DIR}/openai.svg`)} style={{ width: "62%", height: "62%", filter: "brightness(0) invert(1)" }} />
          </div>
        </>
      }
    >
      {/* Biểu tượng ứng dụng đã cài hiện bên dưới mỗi tài khoản. */}
      {[560, 1360].map((x, i) => (
        <G key={x} x={x - 60 + 120 * 0} y={top + 400 * sc * (1 - up) - 10 * up} o={apps * (1 - up)}>
          <rect x={-40} y={-36} width={80} height={72} rx={16} fill="#15171B" stroke={i ? XL : GOLDL} strokeWidth={4} />
          <rect x={-40} y={-36} width={80} height={20} rx={10} fill={HOV} />
          <Tick x={44} y={30} s={0.55} />
        </G>
      ))}
      <Zip x={480} y={lerp(300, 680, clamp01(zip))} s={zip * 1.0} o={clamp01(zip)} />
      <G x={960} y={680} s={trip * 0.85} o={clamp01(trip)}>
        <Sheet x={0} y={0} w={240} h={300} n={5} stroke={GOLDL} head={ORANGE} />
        <path d="M-60 -90 L-30 -60 L10 -60 L50 -100 L60 -90 L30 -50 L-10 -40 Z" fill={GOLDL} opacity={0.9} />
      </G>
      <G x={1440} y={690}>
        {[0, 1, 2].map((i) => (
          <Invoice key={i} x={lerp(300, i * 30 - 30, inv)} y={i * -14} s={0.62 * inv} o={clamp01(inv)} r={(i - 1) * 4} />
        ))}
      </G>
    </BrollStage>
  );
};

/* ---------- Tải file zip ---------- */
export const TaiFileZip: React.FC = () => {
  const { p, l, f } = usePhase();
  const zipIn = p(0);
  const open = l(0, 0.45, 14);
  const tag1 = p(0, 0.5);
  const pen = l(1, 0.05, 20);
  const ban = p(1, 0.45);
  const robot = p(2);
  const scan = l(2, 0.2, 40);
  const good = l(2, 0.6, 14);
  const wob = Math.sin(f / 5) * 4;
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={560} y={170} p={zipIn * (1 - l(2, 0, 10))} solid />
          <Tag i={1} x={1300} y={170} p={tag1 * (1 - l(2, 0, 10))} />
          <Tag i={2} x={960} y={190} p={ban * (1 - l(2, 0, 10))} solid color={RED} />
          <Tag i={3} x={960} y={170} p={good} solid color={XL} />
        </>
      }
    >
      {/* Câu 1-2: file zip rơi xuống rồi mở thành thư mục có bảng tên. */}
      <G o={1 - l(2, 0, 10)}>
        <Zip x={960} y={lerp(300, 520, clamp01(zipIn))} s={zipIn * 1.5 * (1 - open)} o={clamp01(zipIn) * (1 - open)} />
        <Folder x={960} y={520} s={open * 1.8} o={open} />
        {/* Cây bút định sửa tên, bị biển cấm chặn. */}
        <Pen x={lerp(1450, 1130, pen)} y={lerp(420, 560, pen) + wob * (pen > 0.95 ? 1 : 0)} s={1.3} r={35} o={clamp01(pen * 3) * (1 - 0)} />
        <G x={960} y={590} s={ban} o={clamp01(ban)}>
          <circle r={120} fill="rgba(12,12,12,0.55)" stroke={RED} strokeWidth={14} />
          <line x1={-85} y1={-85} x2={85} y2={85} stroke={RED} strokeWidth={14} strokeLinecap="round" />
        </G>
      </G>
      {/* Câu 3: AI đi tìm quy tắc, dừng ở thư mục đúng tên; thư mục sai tên mờ đi. */}
      <G o={clamp01(robot)}>
        <Robot x={lerp(260, 560, scan)} y={500} s={1.5} eye={scan} />
        <Folder x={1080} y={500} s={1.2} o={0.8} />
        <Folder x={1560} y={500} s={1.2} o={1 - 0.7 * good} stroke={SEC} />
        <G x={1080} y={720} s={good} o={good}>
          <Tick x={0} y={0} s={1.3} />
        </G>
        <Cross x={1560} y={720} s={good * 1.1} o={good} />
        <Arrow x1={700} y1={500} x2={900} y2={500} t={scan} />
      </G>
    </BrollStage>
  );
};

/* ---------- Tạo project: câu 5, 6 (b-roll) ---------- */
export const TaoProjectBroll: React.FC<{ sentenceStart: number; under?: React.ReactNode }> = ({ sentenceStart, under }) => {
  const { p, l } = usePhase();
  const s5 = sentenceStart;
  const win = p(s5);
  const btn = l(s5, 0.4, 12);
  const drag = l(s5, 0.55, 24);
  const out6 = l(s5 + 1, 0, 10);
  const two = p(s5 + 1);
  const ask = p(s5 + 1, 0.4);
  const ok = p(s5 + 1, 0.2);
  return (
    <BrollStage
      under={under}
      overlay={
        <>
          <Tag i={6} x={960} y={170} p={win * (1 - out6)} solid color={XL} />
          <Tag i={7} x={1360} y={190} p={ask} solid color={ORANGE} />
                  </>
      }
    >
      <G o={clamp01(win) * (1 - out6)}>
        <ChatWin x={960} y={520} w={900} h={560} s={win}>
          <rect x={-410} y={-200} width={210} height={400} rx={14} fill="#1B1D22" />
          <Bub x={110} y={-130} w={520} n={2} />
          <Bub x={-50} y={-10} w={420} n={1} side="l" />
          <G x={-300} y={190}>
            <rect x={-110} y={-30} width={220} height={60} rx={30} fill={lerp(0, 1, btn) > 0.5 ? GOLD : HOV} stroke={GOLDL} strokeWidth={4} />
            <rect x={-70} y={-6} width={140} height={12} rx={6} fill={INK} />
          </G>
        </ChatWin>
        <Folder x={lerp(1650, 640, drag)} y={lerp(260, 470, drag)} s={0.55} o={clamp01(drag * 4)} />
        <Cursor x={lerp(1720, 700, drag)} y={lerp(330, 520, drag)} o={clamp01(drag * 4)} />
      </G>
      {/* Câu 6: hai khung chat cạnh nhau, trong và ngoài thư mục. */}
      <G o={clamp01(two)}>
        <ChatWin x={520} y={500} w={640} h={480} s={two} stroke={XL}>
          <Bub x={80} y={-90} w={420} n={3} />
          <Bub x={-60} y={60} w={360} n={2} color="rgba(34,197,94,0.18)" line={XL} />
        </ChatWin>
        <Folder x={270} y={640} s={0.4} o={clamp01(two)} />
        <Tick x={850} y={290} s={clamp01(ok)} />
        <ChatWin x={1400} y={500} w={640} h={480} s={two} stroke={ORANGE}>
          <Bub x={80} y={-90} w={420} n={2} />
          <Bub x={-60} y={50} w={360} n={2} color="rgba(224,123,57,0.18)" line={ORANGE} />
          <Ask x={110} y={150} s={ask} />
        </ChatWin>
      </G>
    </BrollStage>
  );
};

/* ---------- Cài đặt lần đầu ---------- */
export const CaiDatLanDau: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 1);
  const type = l(0, 0.1, 70);
  const b = phase(1, 2);
  const press = l(1, 0.35, 8);
  const bar = l(1, 0.55, 40);
  const c = phase(2, 3);
  const name = l(2, 0.35, 30);
  const d = phase(3, 4);
  const rowsL = [l(3, 0.1, 10), l(3, 0.28, 10), l(3, 0.46, 10)];
  const rowsR = [l(3, 0.35, 10), l(3, 0.55, 10)];
  const e = p(4);
  const cards = [p(4, 0), p(4, 0.18), p(4, 0.36)];
  const stamp = p(4, 0.55);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={600} y={160} p={a + 0} solid />
          <Tag i={1} x={1020} y={190} p={b} solid color={XL} />
          <Tag i={2} x={1060} y={190} p={c} solid />
          <Tag i={3} x={640} y={190} p={d} solid color={XL} />
          <Tag i={4} x={1300} y={190} p={d * rowsR[0]!} solid color={ORANGE} />
          <Tag i={5} x={960} y={810} p={stamp} solid color={GOLD} />
        </>
      }
    >
      {/* Câu 1: khung chat, câu lệnh hiện dần trong ô gõ. */}
      <G o={clamp01(a)}>
        <ChatWin x={960} y={500} w={980} h={560} s={a}>
          <rect x={-440} y={-210} width={300} height={16} rx={8} fill={HOV} />
          <rect x={-440} y={-170} width={420} height={16} rx={8} fill={HOV} />
          <InputBar w={980} h={560} fill={type} frame={f} send={type > 0.98} />
        </ChatWin>
      </G>
      {/* Câu 2: hộp xin cài thêm, con trỏ bấm đồng ý, thanh cài chạy. */}
      <G o={clamp01(b)}>
        <rect x={560} y={260} width={800} height={500} rx={30} fill="#15171B" stroke={GOLD} strokeWidth={5} />
        <Robot x={720} y={420} s={0.9} />
        <rect x={840} y={360} width={420} height={16} rx={8} fill={SEC} />
        <rect x={840} y={396} width={330} height={16} rx={8} fill={SEC} />
        <rect x={640} y={620} width={640} height={26} rx={13} fill={HOV} />
        <rect x={640} y={620} width={640 * bar} height={26} rx={13} fill={XL} />
        <rect x={1040} y={680} width={220} height={60} rx={30} fill={press > 0.5 ? XL : GOLD} />
        <rect x={1090} y={706} width={120} height={10} rx={5} fill={INK} />
        <Cursor x={lerp(1350, 1180, l(1, 0.1, 18))} y={lerp(840, 700, l(1, 0.1, 18))} />
      </G>
      {/* Câu 3: AI hỏi tên Giám đốc ký, ô trả lời hiện một họ tên. */}
      <G o={clamp01(c)}>
        <ChatWin x={960} y={500} w={980} h={560} s={c}>
          <Robot x={-380} y={-100} s={0.6} />
          <Bub x={90} y={-150} w={560} n={2} />
          <Ask x={380} y={-150} s={c} />
          <Bub x={120} y={20} w={440} n={1} side="r" color="rgba(197,160,89,0.28)" line={GOLDL} />
          <InputBar w={980} h={560} fill={name} frame={f} color={GOLDL} />
        </ChatWin>
      </G>
      {/* Câu 4: bảng hai cột, đã cài có dấu tích, còn thiếu có dấu hỏi. */}
      <G o={clamp01(d)}>
        <rect x={260} y={260} width={680} height={520} rx={30} fill={EL} stroke={XL} strokeWidth={5} />
        <rect x={980} y={260} width={680} height={520} rx={30} fill={EL} stroke={ORANGE} strokeWidth={5} />
        {rowsL.map((t, i) => (
          <G key={i} x={340} y={360 + i * 120} s={t} o={t}>
            <Tick x={0} y={0} />
            <rect x={70} y={-10} width={420 - i * 60} height={20} rx={10} fill={SEC} />
          </G>
        ))}
        {rowsR.map((t, i) => (
          <G key={i} x={1060} y={360 + i * 120} s={t} o={t}>
            <Ask x={0} y={0} />
            <rect x={70} y={-10} width={360 - i * 80} height={20} rx={10} fill={SEC} />
          </G>
        ))}
      </G>
      {/* Câu 5: ba thẻ Bước 1-2-3 (ba chấm tăng dần), dấu mốc đóng lên cả hàng. */}
      <G o={clamp01(e)}>
        {[0, 1, 2].map((i) => (
          <G key={i} x={560 + i * 400} y={470} s={cards[i]} o={clamp01(cards[i]!)}>
            <rect x={-150} y={-130} width={300} height={260} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
            {Array.from({ length: i + 1 }, (_, k) => (
              <circle key={k} cx={(k - i / 2) * 56} cy={0} r={18} fill={GOLDL} />
            ))}
          </G>
        ))}
        <path d="M410 640 V670 H1510 V640" fill="none" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={clamp01(stamp)} />
        <Tick x={960} y={670} s={clamp01(stamp) * 1.3} />
      </G>
    </BrollStage>
  );
};

/* ---------- Kiểm tra hệ ---------- */
export const KiemTraHe: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 1);
  const type = l(0, 0.1, 50);
  const b = phase(1, 2);
  const tick = p(1, 0.55);
  const c = p(2);
  const stamp = p(2, 0.35);
  const loop = l(2, 0.5, 30);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={540} y={170} p={a} solid />
          <Tag i={1} x={1040} y={190} p={b} solid color={XL} />
          <Tag i={2} x={760} y={190} p={c} solid color={ORANGE} />
          <Tag i={3} x={1430} y={320} p={loop} solid />
        </>
      }
    >
      <G o={clamp01(a)}>
        <ChatWin x={960} y={500} w={980} h={560} s={a}>
          <rect x={-440} y={-200} width={260} height={16} rx={8} fill={HOV} />
          <InputBar w={980} h={560} fill={type} frame={f} send={type > 0.95} />
        </ChatWin>
      </G>
      <G o={clamp01(b)}>
        <ChatWin x={960} y={500} w={980} h={560} s={b} stroke={XL}>
          <Bub x={-200} y={-170} w={360} n={1} side="r" color="rgba(197,160,89,0.28)" line={GOLDL} />
          <Robot x={-400} y={-30} s={0.55} />
          <Bub x={90} y={-30} w={600} n={2} />
          <Tick x={350} y={-30} s={clamp01(tick)} />
        </ChatWin>
      </G>
      <G o={clamp01(c)}>
        <ChatWin x={720} y={520} w={760} h={480} s={c} stroke={ORANGE}>
          <Robot x={-290} y={-40} s={0.5} />
          <Bub x={90} y={-40} w={420} n={3} />
          <Ask x={250} y={-170} s={c} />
        </ChatWin>
        <Stamp x={720} y={440} p={stamp} color={RED} w={300} h={130} r={-10} />
        <G x={1430} y={540} s={loop} o={clamp01(loop)}>
          <rect x={-140} y={-110} width={280} height={220} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
          <circle cx={0} cy={-10} r={46} fill="none" stroke={GOLDL} strokeWidth={8} />
          <circle cx={0} cy={-10} r={10} fill={GOLDL} />
        </G>
        <path d={`M1000 640 C1000 800 1430 800 1430 ${660 - 40 * loop}`} fill="none" stroke={ORANGE} strokeWidth={9} strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - loop)} />
      </G>
    </BrollStage>
  );
};

/* ---------- Trước chuyến đi ---------- */
export const TruocChuyenDi: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const tl = p(0);
  const left = p(0, 0.35);
  const right = p(0, 0.65);
  const out0 = l(1, 0, 12);
  const win = p(1);
  const type = l(1, 0.1, 60);
  const list = p(2);
  const reply = l(3, 0.05, 18);
  const sum = p(3, 0.45);
  const scan = l(4, 0.05, 50);
  const conf = l(4, 0.5, 30);
  const doc = p(4, 0.8);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={500} y={250} p={left * (1 - out0)} solid />
          <Tag i={1} x={1420} y={250} p={right * (1 - out0)} solid color={GOLD} />
          <Tag i={2} x={500} y={780} p={left * (1 - out0)} />
          <Tag i={3} x={620} y={170} p={list} solid color={ORANGE} />
          <Tag i={4} x={1330} y={190} p={sum} solid />
          <Tag i={5} x={620} y={850} p={p(4, 0.3)} solid color={XL} />
        </>
      }
    >
      {/* Câu 1: đường thời gian, chuyến đi ở giữa, thẻ trái và phải. */}
      <G o={clamp01(tl) * (1 - out0)}>
        <line x1={200} y1={520} x2={200 + 1520 * tl} y2={520} stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
        <circle cx={960} cy={520} r={52} fill={INK} stroke={GOLDL} strokeWidth={8} />
        <path d="M930 535 L965 495 L1000 500 M965 495 L955 470" stroke={GOLDL} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Sheet x={500} y={520} s={left} o={clamp01(left)} w={280} h={340} n={6} />
        <Sheet x={1420} y={520} s={right} o={clamp01(right)} w={280} h={340} n={6} stroke={GOLDL} head={GOLD} />
      </G>
      {/* Câu 2-5: khung chat bên trái, bản tóm tắt bên phải. */}
      <G o={clamp01(win)}>
        <ChatWin x={720} y={500} w={1000} h={620} s={win}>
          <rect x={-450} y={-230} width={300} height={16} rx={8} fill={HOV} />
          {/* Câu 3: danh sách đánh số những thứ còn thiếu. */}
          <G o={list} s={1}>
            <Robot x={-420} y={-120} s={0.5} />
            {[0, 1, 2].map((i) => (
              <G key={i} x={-130} y={-150 + i * 70} s={p(2, 0.15 + i * 0.15)}>
                <circle cx={-60} cy={0} r={20} fill={GOLD} />
                {Array.from({ length: i + 1 }, (_, k) => (
                  <circle key={k} cx={-60 + (k - i / 2) * 9} cy={0} r={4} fill={INK} />
                ))}
                <rect x={-20} y={-8} width={320 - i * 40} height={16} rx={8} fill={SEC} />
              </G>
            ))}
          </G>
          {/* Câu 4: ô trả lời theo số bay vào. */}
          <G x={lerp(600, 90, reply)} y={90} o={clamp01(reply * 3)}>
            <rect x={-250} y={-30} width={500} height={60} rx={30} fill="rgba(197,160,89,0.28)" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={-210 + i * 80} cy={0} r={9} fill={GOLDL} />
            ))}
          </G>
          <InputBar w={1000} h={620} fill={type} frame={f} send={type > 0.95} />
        </ChatWin>
        {/* Câu 5: file Word hiện trong thư mục. */}
        <Folder x={1400} y={835} s={0.5} o={clamp01(doc)} />
        <Sheet x={1400} y={812} s={0.4 * doc} o={clamp01(doc)} w={160} h={210} n={3} stroke={GOLDL} />
      </G>
      <G o={clamp01(sum)}>
        <Sheet x={1400} y={500} s={sum} w={420} h={520} n={8} stroke={GOLDL} head={GOLD} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={1230} y={372 + i * 44} width={360} height={6} rx={3} fill={XL} opacity={clamp01(scan * 5 - i) * 0.9} />
        ))}
        <Cursor x={1250 + 310 * (scan % 0.2) * 0.0 + 60} y={370 + 176 * scan} o={clamp01(scan * 8) * (1 - clamp01(conf))} />
        <Tick x={1590} y={290} s={clamp01(conf)} />
      </G>
    </BrollStage>
  );
};

/* ---------- Quy tắc hoá đơn ---------- */
export const QuyTacHoaDon: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 1);
  const type = l(0, 0.1, 60);
  const b = phase(1, 2);
  const fly = [l(1, 0.1, 22), l(1, 0.35, 22), l(1, 0.6, 22)];
  const c = phase(2, 3);
  const cells = [p(2, 0.1), p(2, 0.25), p(2, 0.45), p(2, 0.65), p(2, 0.8)];
  const d = p(3);
  const cross = l(3, 0.15, 16);
  const hand = l(3, 0.45, 26);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={600} y={170} p={a} solid />
          <Tag i={1} x={1180} y={170} p={b} solid color={GOLD} />
          {[2, 3, 4, 5, 6].map((lab, i) => (
            <Tag key={lab} i={lab} x={310 + i * 325} y={440} p={cells[i]! * c} size={30} solid={i === 4} color={i === 4 ? XL : GOLDL} />
          ))}
          <Tag i={6} x={1330} y={800} p={d * hand} solid color={XL} />
        </>
      }
    >
      <G o={clamp01(a)}>
        <ChatWin x={960} y={500} w={980} h={560} s={a}>
          <rect x={-440} y={-200} width={300} height={16} rx={8} fill={HOV} />
          <InputBar w={980} h={560} fill={type} frame={f} send={type > 0.95} />
        </ChatWin>
      </G>
      <G o={clamp01(b)}>
        <ChatWin x={1180} y={520} w={700} h={540} s={b}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-300} y={-150 + i * 60} width={560 * fly[i]!} height={36} rx={18} fill={GOLD} opacity={0.6 + 0.1 * i} />
          ))}
          <InputBar w={700} h={540} fill={0.3} frame={f} />
        </ChatWin>
        {[0, 1, 2].map((i) => (
          <Invoice key={i} x={lerp(220 + i * 40, 900, fly[i]!)} y={lerp(380 + i * 70, 370 + i * 60, fly[i]!)} s={0.5 * (1 - fly[i]! * 0.5)} o={1 - clamp01((fly[i]! - 0.8) * 5)} r={(i - 1) * 6} />
        ))}
        <G x={300} y={640}>
          {[0, 1, 2, 3].map((i) => (
            <Invoice key={i} x={i * 14} y={-i * 12} s={0.5} r={i * 3 - 4} o={1 - fly[Math.min(2, i)]! * (i < 3 ? 1 : 0)} />
          ))}
        </G>
      </G>
      {/* Câu 3: một dòng hoá đơn tách thành năm ô, sáng từng ô. */}
      <G y={110} o={clamp01(c)}>
        <rect x={150} y={400} width={1620} height={190} rx={32} fill={EL} stroke={GOLD} strokeWidth={4} />
        {cells.map((t, i) => (
          <G key={i} x={310 + i * 325} y={495} s={0.9 + 0.1 * t} o={clamp01(t)}>
            <rect x={-130} y={-60} width={260} height={120} rx={20} fill={i === 4 ? "rgba(34,197,94,0.2)" : "rgba(197,160,89,0.16)"} stroke={i === 4 ? XL : GOLDL} strokeWidth={5} />
            <rect x={-80} y={-8} width={160 - i * 8} height={16} rx={8} fill={i === 4 ? XL : GOLDL} />
          </G>
        ))}
      </G>
      {/* Câu 4: ảnh hoá đơn bị gạch chéo trước mắt AI, người gõ số tiền. */}
      <G o={clamp01(d)}>
        <Robot x={420} y={470} s={1.6} />
        <Invoice x={900} y={470} s={1.4} />
        <line x1={800} y1={340} x2={1000} y2={600} stroke={RED} strokeWidth={0} />
        <path d="M790 330 L1010 610 M1010 330 L790 610" stroke={RED} strokeWidth={14} strokeLinecap="round" strokeDasharray="500" strokeDashoffset={500 * (1 - cross)} />
        <rect x={1180} y={640} width={300} height={100} rx={20} fill={EL} stroke={XL} strokeWidth={5} />
        <rect x={1210} y={682} width={240 * hand} height={16} rx={8} fill={XL} />
        <Hand x={lerp(1650, 1560, hand)} y={lerp(800, 700, hand)} s={1.1} r={-20} o={clamp01(hand * 3)} />
      </G>
    </BrollStage>
  );
};

/* ---------- Gửi thông tin vé: hai câu đầu (b-roll) ---------- */
export const GuiThongTinVeBroll: React.FC<{ under?: React.ReactNode }> = ({ under }) => {
  const { p, l, phase } = usePhase();
  const card = p(0);
  const docs = p(0, 0.3);
  const out = l(2, 0, 10);
  const inv = l(1, 0.05, 22);
  const swap = l(1, 0.5, 26);
  const main = phase(1);
  return (
    <BrollStage
      under={under}
      overlay={
        <>
          <Tag i={0} x={960} y={170} p={card * (1 - out)} solid />
          <Tag i={1} x={620} y={800} p={docs * (1 - out)} />
          <Tag i={2} x={1300} y={800} p={docs * (1 - out)} solid color={ORANGE} />
          <Tag i={3} x={960} y={170} p={main * (1 - out) * 0} solid />
        </>
      }
    >
      <G o={1 - out}>
        <rect x={360} y={240} width={1200} height={500} rx={36} fill={EL} stroke={GOLD} strokeWidth={5} transform={`scale(${card})`} style={{ transformOrigin: "960px 490px" }} />
        <Sheet x={700} y={500} s={docs} o={clamp01(docs)} w={300} h={380} n={7} pencil />
        <Sheet x={1220} y={500} s={docs} o={clamp01(docs)} w={300} h={380} n={7} pencil stroke={ORANGE} head={ORANGE} />
        {/* Câu 2: số tạm bị xoá, thay bằng số thật ở cả hai tờ. */}
        {[700, 1220].map((x) => (
          <g key={x} opacity={clamp01(swap)}>
            <rect x={x - 122} y={587} width={120} height={22} rx={8} fill={EL} />
            <rect x={x - 118} y={592} width={110 * swap} height={14} rx={7} fill={XL} />
          </g>
        ))}
        <Invoice x={lerp(960, 960, inv)} y={lerp(900, 480, inv)} s={0.9} o={clamp01(inv * 3) * (1 - clamp01((swap - 0.6) * 2.5))} />
      </G>
    </BrollStage>
  );
};

/* ---------- Máy bắt lệch: câu 2, 4 (b-roll) ---------- */
export const MayBatLechBroll: React.FC<{ under?: React.ReactNode }> = ({ under }) => {
  const { p, l } = usePhase();
  const g1 = p(1) * (1 - l(2, 0, 10));
  const slide = l(1, 0.05, 22);
  const tilt = l(1, 0.4, 24);
  const g3 = p(3);
  const slide3 = l(3, 0.05, 22);
  const mk = p(3, 0.6);
  const hand = l(3, 0.05, 24);
  return (
    <BrollStage
      under={under}
      overlay={
        <>
          <Tag i={1} x={560} y={300} p={p(1, 0.1) * (1 - l(2, 0, 10))} />
          <Tag i={2} x={1360} y={300} p={p(1, 0.25) * (1 - l(2, 0, 10))} solid />
          <Tag i={3} x={960} y={835} p={p(1, 0.5) * (1 - l(2, 0, 10))} solid color={GOLD} />
          <Tag i={4} x={560} y={790} p={p(3, 0.3)} solid color={GOLD} />
          <Tag i={5} x={1360} y={790} p={p(3, 0.5)} solid color={XL} />
        </>
      }
    >
      {/* Câu 2: hai thẻ số tiền trượt vào, cán cân nghiêng. */}
      <G o={clamp01(g1)}>
        <MoneyCard x={lerp(100, 560, slide)} y={440 + 40 * tilt} s={1.2} o={clamp01(slide * 2)} />
        <MoneyCard x={lerp(1820, 1360, slide)} y={440 - 40 * tilt} s={1.2} o={clamp01(slide * 2)} stroke={ORANGE} />
        <G x={960} y={690} r={-6 * tilt}>
          <path d="M-220 0 L220 0 M0 0 L0 90 M-110 90 L110 90" stroke={GOLDL} strokeWidth={10} strokeLinecap="round" />
        </G>
      </G>
      {/* Câu 4: người cầm hoá đơn đặt cạnh hai thẻ; tích trên thẻ đúng, dấu hỏi trên thẻ còn lại. */}
      <G o={clamp01(g3)}>
        <MoneyCard x={900} y={440} s={1.15} stroke={XL} mark="tick" o={clamp01(slide3 * 2)} />
        <MoneyCard x={1500} y={440} s={1.15} stroke={ORANGE} mark="ask" o={clamp01(slide3 * 2)} />
        <Invoice x={lerp(300, 330, hand)} y={500} s={1.1} r={-6} />
        <Hand x={lerp(160, 190, hand)} y={720} s={1.4} r={-10} o={clamp01(hand * 3)} />
        <Arrow x1={470} y1={470} x2={720} y2={440} t={hand} />
      </G>
      <G o={0}>
        <Ask x={0} y={0} s={mk} />
      </G>
    </BrollStage>
  );
};

/* ---------- Xác nhận chạy: câu 5 (b-roll) ---------- */
export const XacNhanChayBroll: React.FC<{ under?: React.ReactNode }> = ({ under }) => {
  const { p, l, f } = usePhase();
  const a = p(4);
  const fill = l(4, 0.15, 60);
  return (
    <BrollStage under={under} overlay={<Tag i={4} x={960} y={190} p={a} solid color={XL} />}>
      <G o={clamp01(a)}>
        <ChatWin x={960} y={520} w={1200} h={560} s={a}>
          <Bub x={-150} y={-150} w={520} n={2} />
          <Bub x={150} y={-10} w={420} n={2} side="r" color="rgba(197,160,89,0.28)" line={GOLDL} />
          <Hourglass x={420} y={-130} s={1.1} t={((f * 3) % 90) / 90} />
          <G x={0} y={170}>
            <rect x={-480} y={-20} width={960} height={40} rx={20} fill={HOV} />
            <rect x={-480} y={-20} width={960 * fill} height={40} rx={20} fill={XL} />
          </G>
        </ChatWin>
      </G>
    </BrollStage>
  );
};

/* ---------- Đọc kết quả kiểm ---------- */
export const DocKetQuaKiem: React.FC = () => {
  const { p, l, phase } = usePhase();
  const a = phase(0, 1);
  const green = l(0, 0.1, 14);
  const slide = l(0, 0.45, 24);
  const b = p(1);
  const warn = p(1, 0.1);
  const flip = l(1, 0.35, 30);
  const reply = l(1, 0.7, 24);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={620} y={260} p={a} solid color={XL} />
          <Tag i={1} x={1380} y={250} p={slide * a} solid />
          <Tag i={2} x={1340} y={800} p={b} solid color={ORANGE} />
        </>
      }
    >
      <G o={clamp01(a)}>
        <rect x={360} y={330} width={520} height={110} rx={30} fill={`rgba(34,197,94,${0.12 + 0.3 * green})`} stroke={XL} strokeWidth={6} />
        <Tick x={440} y={385} s={green} />
        <rect x={500} y={377} width={300} height={16} rx={8} fill={XL} />
        <Sheet x={lerp(560, 1380, slide)} y={620} w={300} h={380} n={7} stroke={GOLDL} head={GOLD} />
        <rect x={1180} y={340} width={400} height={230} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} opacity={slide} />
        <Arrow x1={800} y1={400} x2={lerp(800, 1180, slide)} y2={440} t={slide} />
      </G>
      <G o={clamp01(b)}>
        <rect x={300} y={260} width={760} height={110} rx={30} fill="rgba(224,123,57,0.18)" stroke={ORANGE} strokeWidth={6} />
        <Ask x={380} y={315} s={warn} />
        <rect x={450} y={307} width={460} height={16} rx={8} fill={ORANGE} />
        {[0, 1, 2, 3].map((i) => (
          <Invoice key={i} x={460 + i * 50 + flip * 0} y={600 - i * 10} s={0.8} r={(i - 1.5) * 5 + flip * 20 * (i === 3 ? 1 : 0)} />
        ))}
        <Hand x={lerp(250, 420, flip)} y={760} s={1.1} r={-10} o={clamp01(flip * 3)} />
        <ChatWin x={1300} y={540} w={640} h={440} s={b} >
          <Bub x={-40} y={-90} w={400} n={2} />
          <rect x={-250} y={90} width={480 * reply} height={14} rx={7} fill={GOLDL} />
          <InputBar w={640} h={440} fill={reply} frame={0} send={reply > 0.95} />
        </ChatWin>
      </G>
    </BrollStage>
  );
};

/* ---------- Gửi bản nháp ---------- */
export const GuiBanNhap: React.FC = () => {
  const { p, l, phase } = usePhase();
  const fly = l(0, 0.1, 40);
  const a = p(0);
  const b = phase(1, 2);
  const hl = [p(1, 0.1), p(1, 0.4), p(1, 0.7)];
  const c = phase(2, 3);
  const sign = l(2, 0.3, 30);
  const d = p(3);
  const wipe = l(3, 0.15, 24);
  const toDir = l(3, 0.5, 30);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={640} y={250} p={a * (1 - l(1, 0, 10))} solid color={ORANGE} />
          <Tag i={1} x={620} y={190} p={hl[0]! * b} solid />
          <Tag i={2} x={1000} y={190} p={hl[1]! * b} solid />
          <Tag i={3} x={1350} y={190} p={hl[2]! * b} solid color={GOLD} />
          <Tag i={4} x={960} y={800} p={c} solid />
          <Tag i={5} x={1500} y={800} p={d * toDir} solid color={GOLD} />
        </>
      }
    >
      {/* Câu 1: file bay từ máy kế toán sang máy người đi công tác. */}
      <G o={clamp01(a) * (1 - l(1, 0, 10))}>
        <rect x={180} y={480} width={400} height={260} rx={22} fill="#15171B" stroke={GOLD} strokeWidth={5} />
        <rect x={120} y={750} width={520} height={26} rx={13} fill={HOV} />
        <rect x={1340} y={480} width={400} height={260} rx={22} fill="#15171B" stroke={GOLDL} strokeWidth={5} />
        <rect x={1280} y={750} width={520} height={26} rx={13} fill={HOV} />
        <Person x={1540} y={420} s={0.8} />
        <Sheet x={lerp(380, 1540, fly)} y={lerp(560, 600, fly) - 280 * Math.sin(Math.PI * fly)} s={0.6} w={220} h={290} n={5} stroke={ORANGE} head={ORANGE} />
      </G>
      {/* Câu 2: trang Báo cáo, mục I, mục II, cột Mức độ hoàn thành được tô sáng. */}
      <G o={clamp01(b)}>
        <rect x={500} y={270} width={920} height={560} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={560} y={310} width={300} height={18} rx={9} fill={GOLDL} />
        <rect x={560} y={360} width={540} height={110} rx={16} fill={`rgba(197,160,89,${0.1 + 0.3 * hl[0]!})`} stroke={hl[0]! > 0.3 ? GOLDL : HOV} strokeWidth={4} />
        <rect x={560} y={500} width={540} height={110} rx={16} fill={`rgba(197,160,89,${0.1 + 0.3 * hl[1]!})`} stroke={hl[1]! > 0.3 ? GOLDL : HOV} strokeWidth={4} />
        <rect x={1140} y={360} width={230} height={250} rx={16} fill={`rgba(34,197,94,${0.08 + 0.3 * hl[2]!})`} stroke={hl[2]! > 0.3 ? XL : HOV} strokeWidth={4} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={580} y={390 + i * 24 + (i === 2 ? 0 : 0)} width={420 - i * 60} height={9} rx={4} fill={SEC} />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={580} y={530 + i * 24} width={420 - i * 60} height={9} rx={4} fill={SEC} />
        ))}
      </G>
      {/* Câu 3: ô chữ ký người báo cáo hiện tên người đi công tác, bút ký. */}
      <G o={clamp01(c)}>
        <Person x={560} y={470} s={1.5} />
        <rect x={780} y={440} width={620} height={170} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d={`M840 570 C900 470 960 640 1020 540 S1120 500 1180 560`} fill="none" stroke={GOLDL} strokeWidth={7} strokeLinecap="round" strokeDasharray="600" strokeDashoffset={600 * (1 - sign)} />
        <Pen x={lerp(840, 1180, sign)} y={lerp(560, 540, sign) - 50} s={0.8} r={30} color={GOLDL} />
      </G>
      {/* Câu 4: dòng BẢN NHÁP bị xoá, tờ Báo cáo trượt tới Giám đốc ký. */}
      <G o={clamp01(d)}>
        <Sheet x={lerp(560, 1100, toDir)} y={500} w={380} h={500} n={8} stroke={GOLDL} head={GOLD} />
        <rect x={lerp(560, 1100, toDir) - 150} y={316} width={300 * (1 - wipe)} height={30} rx={8} fill={GOLDL} />
        <Person x={1520} y={470} s={1.4} color={GOLD} />
      </G>
    </BrollStage>
  );
};

/* ---------- Nguyên tắc 3Đ ---------- */
const ThreeCard: React.FC<{ x: number; k: number; tick: number; n: number }> = ({ x, k, tick, n }) => (
  <G x={x} y={520} s={k} o={clamp01(k)}>
    <rect x={-250} y={-270} width={500} height={540} rx={34} fill={EL} stroke={GOLD} strokeWidth={5} />
    {Array.from({ length: n }, (_, i) => (
      <circle key={i} cx={(i - (n - 1) / 2) * 44} cy={-210} r={14} fill={GOLDL} />
    ))}
    <Tick x={190} y={-200} s={clamp01(tick)} />
  </G>
);

export const NguyenTac3D: React.FC = () => {
  const { p, l, phase } = usePhase();
  const a = phase(0, 1);
  const lock = l(0, 0.45, 20);
  const c1 = p(1);
  const scroll = l(1, 0.1, 40);
  const t1 = l(1, 0.7, 10);
  const c2 = p(2);
  const wire = l(2, 0.2, 22);
  const t2 = l(2, 0.7, 10);
  const c3 = p(3);
  const t3 = l(3, 0.6, 10);
  const open = l(3, 0.7, 14);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={960} y={170} p={a} solid color={GOLD} />
          <Tag i={4} x={960} y={820} p={p(0, 0.5) * (1 - l(1, 0, 10))} solid color={RED} />
          <Tag i={1} x={460} y={250} p={c1} solid />
          <Tag i={2} x={960} y={250} p={c2} solid />
          <Tag i={3} x={1460} y={250} p={c3} solid />
        </>
      }
    >
      {/* Câu 1: biển báo tam giác, nút trình ký bị khoá. */}
      <G o={clamp01(a) * (1 - l(1, 0, 10))}>
        <G x={960} y={460} s={a * 1.6}>
          <path d="M0 -150 L170 130 L-170 130 Z" fill={GOLD} stroke={GOLDL} strokeWidth={10} strokeLinejoin="round" />
          <path d="M0 -70 L0 40" stroke={INK} strokeWidth={22} strokeLinecap="round" />
          <circle cx={0} cy={86} r={13} fill={INK} />
        </G>
        <G x={960} y={740}>
          <rect x={-190} y={-50} width={380} height={100} rx={50} fill={HOV} />
          <rect x={-120} y={-8} width={150} height={16} rx={8} fill={SEC} />
          <G x={120} y={0} s={lock}>
            <rect x={-26} y={-6} width={52} height={40} rx={8} fill={RED} />
            <path d="M-16 -6 V-22 A16 16 0 0 1 16 -22 V-6" fill="none" stroke={RED} strokeWidth={7} />
          </G>
        </G>
      </G>
      {/* Thẻ Đ thứ nhất: trang Word cuộn từ đầu đến cuối, dấu tích bật. */}
      <ThreeCard x={460} k={c1} tick={t1} n={1} />
      <G x={460} y={520} o={clamp01(c1)}>
        <rect x={-150} y={-130} width={300} height={360} rx={14} fill="#15171B" stroke={SEC} strokeWidth={3} />
        <g transform={`translate(0 ${-120 * scroll})`} clipPath="inset(0)">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={-110} y={-100 + i * 36} width={220 - (i % 3) * 40} height={11} rx={5} fill={SEC} />
          ))}
        </g>
        <rect x={160} y={-120 + 300 * scroll} width={8} height={60} rx={4} fill={GOLDL} />
      </G>
      {/* Thẻ Đ thứ hai: số tiền Word đặt cạnh hoá đơn, hai số nối nhau. */}
      <ThreeCard x={960} k={c2} tick={t2} n={2} />
      <G x={960} y={520} o={clamp01(c2)}>
        <Sheet x={-100} y={20} s={0.7} w={200} h={300} n={4} />
        <Invoice x={110} y={20} s={0.8} />
        <Wire x1={-70} y1={60} x2={70} y2={60} t={wire} color={XL} sw={7} />
      </G>
      {/* Thẻ Đ thứ ba: ô chữ ký gắn tên người đi công tác, khoá mở. */}
      <ThreeCard x={1460} k={c3} tick={t3} n={3} />
      <G x={1460} y={520} o={clamp01(c3)}>
        <Person x={0} y={-10} s={1} />
        <rect x={-130} y={90} width={260} height={60} rx={16} fill={EL} stroke={GOLD} strokeWidth={4} />
        <path d="M-90 130 C-60 100 -30 150 0 120 S60 110 90 130" fill="none" stroke={GOLDL} strokeWidth={5} strokeLinecap="round" />
        <G x={110} y={190} s={1}>
          <rect x={-26} y={-6} width={52} height={40} rx={8} fill={XL} />
          <path d={`M-16 -6 V-22 A16 16 0 0 1 16 -22 V${-12 - 10 * open}`} fill="none" stroke={XL} strokeWidth={7} />
        </G>
      </G>
    </BrollStage>
  );
};

/* ---------- Khi gặp lỗi ---------- */
export const KhiGapLoi: React.FC = () => {
  const { p, l, f } = usePhase();
  const rows = [p(0), p(1), p(2), p(3)];
  const stamp = p(1, 0.3);
  const type = l(1, 0.4, 50);
  const fix = l(2, 0.35, 22);
  const files = l(3, 0.15, 24);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={420} y={150} p={rows[0]!} solid color={ORANGE} />
          <Tag i={1} x={1280} y={150} p={rows[0]!} solid />
          <Tag i={2} x={1500} y={240} p={p(0, 0.4)} size={28} />
          <Tag i={3} x={1580} y={580} p={p(2, 0.5)} size={28} solid color={XL} />
          <Tag i={4} x={1500} y={745} p={p(3, 0.5)} size={28} />
        </>
      }
    >
      {/* Bảng bốn dòng: Nếu bạn thấy / Thì làm; mỗi dòng nảy ra theo câu. */}
      {[0, 1, 2, 3].map((i) => {
        const y = 250 + i * 165;
        return (
          <G key={i} o={clamp01(rows[i]!)} x={0} y={0} s={1}>
            <rect x={140} y={y - 70} width={1640} height={140} rx={28} fill={EL} stroke={i === 0 ? ORANGE : GOLD} strokeWidth={4} />
            <line x1={880} y1={y - 50} x2={880} y2={y + 50} stroke={HOV} strokeWidth={4} />
          </G>
        );
      })}
      {/* Dòng 1: bong bóng chung chung, mũi tên về thẻ Bước 2. */}
      <G y={-10} o={clamp01(rows[0]!)}>
        <Bub x={420} y={260} w={420} n={2} color="#242730" />
        <Ask x={600} y={190} s={rows[0]} />
        <Arrow x1={680} y1={260} x2={lerp(680, 960, l(0, 0.4, 20))} y2={260} t={l(0, 0.4, 20)} />
        <G x={1120} y={260} s={clamp01(l(0, 0.5, 14))}>
          <rect x={-110} y={-50} width={220} height={100} rx={22} fill={GOLD} />
          <circle cx={-20} cy={0} r={12} fill={INK} />
          <circle cx={20} cy={0} r={12} fill={INK} />
        </G>
      </G>
      {/* Dòng 2: AI soạn vội bị đóng dấu dừng; câu lệnh được gõ vào ô. */}
      <G y={-40} o={clamp01(rows[1]!)}>
        <Robot x={300} y={455} s={0.5} />
        <Stamp x={470} y={455} p={stamp} color={RED} w={200} h={90} r={-8} />
        <rect x={940} y={425} width={780} height={60} rx={30} fill="#0F1114" stroke={HOV} strokeWidth={3} />
        <rect x={970} y={450} width={640 * type} height={12} rx={6} fill={GOLDL} />
        {type < 1 && Math.floor(f / 12) % 2 === 0 && <rect x={974 + 640 * type} y={440} width={4} height={30} fill={GOLDL} />}
      </G>
      {/* Dòng 3: dấu hỏi ở ô số tiền được thay bằng số nguyên đồng gõ lại. */}
      <G y={-70} o={clamp01(rows[2]!)}>
        <Robot x={300} y={650} s={0.5} />
        <rect x={410} y={620} width={300} height={64} rx={20} fill={EL} stroke={ORANGE} strokeWidth={4} />
        <Ask x={560} y={652} s={1 - fix} o={1 - fix} />
        <rect x={940} y={620} width={420} height={64} rx={22} fill={EL} stroke={XL} strokeWidth={4} />
        <rect x={970} y={646} width={300 * fix} height={14} rx={7} fill={XL} />
        <Arrow x1={720} y1={652} x2={920} y2={652} t={fix} />
      </G>
      {/* Dòng 4: hai file Word chồng nhau, file cũ mang nhãn thêm ngày giờ. */}
      <G y={-100} o={clamp01(rows[3]!)}>
        <Sheet x={340} y={845} s={0.5} w={220} h={290} n={4} stroke={SEC} head={SEC} o={0.9} />
        <Sheet x={lerp(340, 400, files)} y={lerp(845, 845, files)} s={0.5} w={220} h={290} n={4} stroke={GOLDL} />
        <G x={1100} y={850} s={clamp01(files)} o={clamp01(files)}>
          <circle r={36} fill="none" stroke={GOLDL} strokeWidth={7} />
          <path d="M0 -18 V0 L14 10" stroke={GOLDL} strokeWidth={7} fill="none" strokeLinecap="round" />
        </G>
        <Arrow x1={560} y1={850} x2={lerp(560, 1000, files)} y2={850} t={files} />
      </G>
    </BrollStage>
  );
};

/* ---------- Kết ---------- */
export const Ket: React.FC = () => {
  const { p, l, f } = usePhase();
  const a = p(0);
  const b = phase1();
  const cap = p(1, 0.1);
  const mail = l(1, 0.35, 22);
  const logo = p(2);
  function phase1() {
    return p(1) * (1 - 0);
  }
  const rep1 = p(0, 0.05);
  const rep2 = p(0, 0.45);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={960} y={180} p={a * (1 - l(1, 0, 10))} solid color={ORANGE} />
          <Tag i={1} x={620} y={220} p={cap * (1 - l(2, 0, 10))} solid />
          <Tag i={2} x={1400} y={760} p={mail * (1 - l(2, 0, 10))} solid color={GOLD} />
          <Img
            src={staticFile("brand/tvhs-logo-icon.png")}
            style={{ position: "absolute", left: 960 - 190, top: 400 - 190, width: 380, height: 380, objectFit: "contain", transform: `scale(${logo})`, opacity: clamp01(logo) }}
          />
        </>
      }
    >
      {/* Câu 1: cùng một thông báo lỗi hiện hai lần liên tiếp. */}
      <G o={clamp01(a) * (1 - l(1, 0, 10))}>
        <ChatWin x={960} y={520} w={1000} h={520} s={a} stroke={ORANGE}>
          <G x={-60} y={-110} s={rep1} o={clamp01(rep1)}>
            <rect x={-360} y={-44} width={720} height={88} rx={22} fill="rgba(224,123,57,0.18)" stroke={ORANGE} strokeWidth={4} />
            <Ask x={-310} y={0} s={0.8} />
            <rect x={-250} y={-8} width={440} height={16} rx={8} fill={ORANGE} />
          </G>
          <G x={-60} y={30} s={rep2} o={clamp01(rep2)}>
            <rect x={-360} y={-44} width={720} height={88} rx={22} fill="rgba(224,123,57,0.18)" stroke={ORANGE} strokeWidth={4} />
            <Ask x={-310} y={0} s={0.8} />
            <rect x={-250} y={-8} width={440} height={16} rx={8} fill={ORANGE} />
          </G>
          <G x={370} y={-70} s={rep2} o={clamp01(rep2)}>
            <circle r={44} fill={EL} stroke={GOLDL} strokeWidth={6} />
            <circle cx={-12} cy={0} r={7} fill={GOLDL} />
            <circle cx={12} cy={0} r={7} fill={GOLDL} />
          </G>
        </ChatWin>
      </G>
      {/* Câu 2: tay chụp màn hình, ảnh bay vào hộp thư. */}
      <G o={clamp01(b) * (1 - l(2, 0, 10))}>
        <rect x={280} y={380} width={460} height={300} rx={26} fill="#15171B" stroke={GOLD} strokeWidth={5} />
        <rect x={320} y={420} width={380} height={160} rx={14} fill={HOV} opacity={0.5} />
        <path d="M300 400 H360 M300 400 V460 M720 660 H660 M720 660 V600" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" opacity={cap} />
        <G x={lerp(510, 1400, mail)} y={lerp(530, 560, mail) - 160 * Math.sin(Math.PI * mail)} s={0.6 - 0.2 * mail} o={clamp01(cap)}>
          <rect x={-190} y={-110} width={380} height={220} rx={14} fill={HOV} stroke={GOLDL} strokeWidth={5} />
        </G>
        <G x={1400} y={560}>
          <rect x={-190} y={-110} width={380} height={220} rx={20} fill={EL} stroke={GOLD} strokeWidth={6} opacity={clamp01(mail * 2 + 0.3)} />
          <path d="M-190 -100 L0 20 L190 -100" fill="none" stroke={GOLDL} strokeWidth={7} />
        </G>
        <Hand x={310} y={780} s={1.3} r={20} o={clamp01(cap)} />
      </G>
      {/* Câu 3: biểu trưng vàng trên nền tối. */}
      <G o={clamp01(logo)}>
        <circle cx={960} cy={400} r={250 * Math.min(1, logo)} fill="none" stroke={GOLD} strokeWidth={4} opacity={0.5} />
      </G>
      <G o={0}>
        <Tick x={0} y={0} />
        <Cross x={0} y={0} />
      </G>
    </BrollStage>
  );
};

void Label;
void SEC;


/* ---------- Bản mới (17 cảnh) ---------- */

/** Cài đặt lần đầu và kiểm tra hệ: bốn câu b-roll; chữ gõ lấy từ lời đọc, nhãn đặt ngay trên hình. */
export const CaiDatLanDau2: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 1);
  const type = l(0, 0.1, 80);
  const t0 = useTyped(0, type);
  const dlg = p(1) * (1 - l(1, 0.5, 10));
  const press = l(1, 0.3, 8);
  const bar = l(1, 0.3, 24);
  const nm = p(1, 0.55) * (1 - l(2, 0, 10));
  const name = l(1, 0.62, 24);
  const c = phase(2, 3);
  const type2 = l(2, 0.15, 40);
  const t2 = useTyped(2, type2);
  const askInstall = usePart(1, { stop: " thì" });
  const nameText = usePart(1, { after: "gõ ", stop: ";" });
  const d = p(3);
  const ok = p(3, 0.25);
  const stamp = p(3, 0.5);
  const loop = l(3, 0.7, 24);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={420} y={190} p={a} solid />
          <Tag i={1} x={1150} y={718} p={dlg} solid color={XL} />
          <Tag i={2} x={940} y={350} p={nm} solid />
          <Tag i={3} x={420} y={190} p={c} solid />
          <Tag i={4} x={520} y={440} p={ok * d} solid color={XL} />
          <Tag i={5} x={1500} y={640} p={loop * d} solid color={ORANGE} />
        </>
      }
    >
      <G o={clamp01(a)}>
        <ChatWin x={960} y={520} w={1400} h={520} s={a}>
          <rect x={-640} y={-190} width={300} height={16} rx={8} fill={HOV} />
          <rect x={-640} y={-150} width={420} height={16} rx={8} fill={HOV} />
          <InputBar w={1400} h={520} fill={type} frame={f} send={type > 0.98} text={t0} size={32} />
        </ChatWin>
      </G>
      <G o={clamp01(dlg)}>
        <rect x={560} y={260} width={800} height={500} rx={30} fill="#15171B" stroke={GOLD} strokeWidth={5} />
        <Robot x={720} y={420} s={0.9} />
        <text x={840} y={388} fontSize={32} fontWeight={600} fill={TXT} style={{ fontFamily: "inherit" }}>
          {askInstall}
        </text>
        <rect x={640} y={560} width={640} height={26} rx={13} fill={HOV} />
        <rect x={640} y={560} width={640 * bar} height={26} rx={13} fill={XL} />
        <rect x={980} y={680} width={340} height={76} rx={38} fill={press > 0.5 ? XL : GOLD} />
        <Cursor x={lerp(1350, 1260, l(1, 0.05, 14))} y={lerp(840, 740, l(1, 0.05, 14))} />
      </G>
      <G o={clamp01(nm)}>
        <ChatWin x={960} y={520} w={1100} h={520} s={nm}>
          <Robot x={-440} y={-60} s={0.6} />
          <rect x={-340} y={-190} width={640} height={110} rx={26} fill="#242730" />
          <Ask x={340} y={-190} s={nm} />
          <rect x={-100} y={-35} width={520} height={80} rx={26} fill="rgba(197,160,89,0.28)" />
          <text x={-80} y={10} fontSize={32} fontWeight={600} fill={GOLDL} style={{ fontFamily: "inherit", whiteSpace: "pre" }}>
            {nameText.slice(0, Math.floor(nameText.length * name))}
          </text>
          <InputBar w={1100} h={520} fill={name} frame={f} color={GOLDL} />
        </ChatWin>
      </G>
      <G o={clamp01(c)}>
        <ChatWin x={960} y={520} w={1400} h={520} s={c}>
          <rect x={-640} y={-190} width={260} height={16} rx={8} fill={HOV} />
          <InputBar w={1400} h={520} fill={type2} frame={f} send={type2 > 0.95} text={t2} size={34} />
        </ChatWin>
      </G>
      <G o={clamp01(d)}>
        <ChatWin x={520} y={560} w={720} h={460} s={d} stroke={XL}>
          <Robot x={-290} y={-40} s={0.5} />
          <rect x={-230} y={-130} width={460} height={110} rx={24} fill="rgba(34,197,94,0.18)" />
        </ChatWin>
        <Tick x={850} y={370} s={clamp01(ok)} />
        <ChatWin x={1360} y={440} w={620} h={380} s={d} stroke={ORANGE}>
          <Robot x={-240} y={-30} s={0.45} />
          <Bub x={70} y={-30} w={330} n={3} />
          <Ask x={220} y={-130} s={d} />
        </ChatWin>
        <Stamp x={1360} y={400} p={stamp} color={RED} w={260} h={110} r={-10} />
        <path d={`M1360 650 C1360 740 1500 740 1500 ${700 - 30 * loop}`} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinecap="round" strokeDasharray="800" strokeDashoffset={800 * (1 - loop)} />
        <G x={1500} y={790} s={loop} o={clamp01(loop)}>
          <rect x={-120} y={-60} width={240} height={120} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
          <circle cx={-30} cy={0} r={12} fill={GOLDL} />
          <circle cx={30} cy={0} r={12} fill={GOLDL} />
        </G>
      </G>
    </BrollStage>
  );
};

/** Khi gặp lỗi: ba dòng b-roll. */
export const KhiGapLoi3: React.FC = () => {
  const { p, l, f } = usePhase();
  const rows = [p(0), p(1), p(2)];
  const stamp = p(1, 0.35);
  const type = l(1, 0.45, 50);
  const fix = l(2, 0.35, 22);
  const mv = l(0, 0.4, 20);
  const typed = useTyped(1, type);
  const t1 = usePart(0, { stop: " thì" });
  const t3 = usePart(2, { stop: " thì" });
  const Y = [300, 520, 740];
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={420} y={170} p={rows[0]!} solid color={ORANGE} />
          <Tag i={1} x={1280} y={170} p={rows[0]!} solid />
          <Tag i={2} x={1620} y={Y[0]!} p={p(0, 0.5)} size={30} />
          <Tag i={3} x={1640} y={Y[1]!} p={p(1, 0.5)} size={30} solid color={RED} />
          <Tag i={4} x={1560} y={Y[2]!} p={p(2, 0.5)} size={30} solid color={XL} />
        </>
      }
    >
      {Y.map((y, i) => (
        <G key={i} o={clamp01(rows[i]!)}>
          <rect x={140} y={y - 100} width={1640} height={200} rx={28} fill={EL} stroke={i === 0 ? ORANGE : GOLD} strokeWidth={4} />
          <line x1={880} y1={y - 80} x2={880} y2={y + 80} stroke={HOV} strokeWidth={4} />
        </G>
      ))}
      <G o={clamp01(rows[0]!)}>
        <rect x={190} y={Y[0]! - 45} width={460} height={90} rx={24} fill="#242730" />
        <text x={215} y={Y[0]! + 10} fontSize={30} fontWeight={600} fill={TXT} style={{ fontFamily: "inherit" }}>
          {t1}
        </text>
        <Ask x={650} y={Y[0]! - 60} s={rows[0]} />
        <Arrow x1={700} y1={Y[0]!} x2={lerp(700, 960, mv)} y2={Y[0]!} t={mv} />
        <G x={1120} y={Y[0]!} s={clamp01(l(0, 0.5, 14))}>
          <rect x={-110} y={-55} width={220} height={110} rx={22} fill={GOLD} />
          <circle cx={-20} cy={0} r={12} fill={INK} />
          <circle cx={20} cy={0} r={12} fill={INK} />
        </G>
      </G>
      <G o={clamp01(rows[1]!)}>
        <Robot x={300} y={Y[1]! + 10} s={0.6} />
        <Stamp x={500} y={Y[1]!} p={stamp} color={RED} w={220} h={100} r={-8} />
        <rect x={940} y={Y[1]! - 32} width={600} height={64} rx={32} fill="#0F1114" stroke={HOV} strokeWidth={3} />
        <rect x={970} y={Y[1]! - 6} width={0 * type} height={12} rx={6} fill={GOLDL} />
        <text x={968} y={Y[1]! + 9} fontSize={26} fontWeight={600} fill={GOLDL} style={{ fontFamily: "inherit", whiteSpace: "pre" }}>
          {typed}
        </text>
      </G>
      <G o={clamp01(rows[2]!)}>
        <Robot x={300} y={Y[2]! + 10} s={0.6} />
        <rect x={400} y={Y[2]! - 38} width={460} height={76} rx={22} fill={EL} stroke={ORANGE} strokeWidth={4} />
        <text x={420} y={Y[2]! + 10} fontSize={28} fontWeight={600} fill={TXT} style={{ fontFamily: "inherit" }}>
          {t3}
        </text>
        <rect x={940} y={Y[2]! - 32} width={420} height={64} rx={22} fill={EL} stroke={XL} strokeWidth={4} />
        <rect x={970} y={Y[2]! - 7} width={300 * fix} height={14} rx={7} fill={XL} />
        <Arrow x1={870} y1={Y[2]!} x2={925} y2={Y[2]!} t={fix} />
      </G>
    </BrollStage>
  );
};

/** Câu cuối cảnh ket: thẻ logo, nằm dưới lớp quay màn hình mờ dần. */
export const KetLogo: React.FC<{ under?: React.ReactNode }> = ({ under }) => {
  const { p } = usePhase();
  const logo = p(1);
  return (
    <BrollStage
      under={under}
      overlay={
        <Img
          src={staticFile("brand/tvhs-logo-icon.png")}
          style={{ position: "absolute", left: 960 - 270, top: 470 - 270, width: 540, height: 540, objectFit: "contain", transform: `scale(${logo})`, opacity: clamp01(logo) }}
        />
      }
    >
      <G o={clamp01(logo)}>
        <circle cx={960} cy={470} r={350 * Math.min(1, logo)} fill="none" stroke={GOLD} strokeWidth={5} opacity={0.5} />
        <circle cx={960} cy={470} r={400 * Math.min(1, logo)} fill="none" stroke={GOLD} strokeWidth={2} opacity={0.3} />
      </G>
    </BrollStage>
  );
};
