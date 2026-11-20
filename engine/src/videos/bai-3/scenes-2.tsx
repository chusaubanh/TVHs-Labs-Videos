import React from "react";
import { Box, Chat, Clock, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, SEC, Spark, Stage, Stamp, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Boss, clamp01, Grid, KCard, ORANGE, Phone, Report } from "./art";

/** Hai thẻ đánh số bằng chấm: một chấm, hai chấm. */
const NumCard: React.FC<{ n: number; lit?: boolean }> = ({ n, lit = false }) => (
  <g>
    <Box cx={0} cy={0} w={280} h={340} rx={22} fill={lit ? GOLD : EL} stroke={GOLD} strokeWidth={5} />
    {Array.from({ length: n }, (_, d) => (
      <circle key={d} cx={(d - (n - 1) / 2) * 60} cy={-80} r={24} fill={lit ? INK : GOLD} />
    ))}
    <Lines x={-100} y={10} w={200} n={4} gap={34} color={lit ? INK : SEC} t={12} />
  </g>
);

/** Cảnh 6 — Ô kết luận đầu trang, ba mươi giây là ký duyệt; hai việc áp dụng; việc một cho Thu mua, Hành chính, Kế toán. */
export const OKetLuan: React.FC = () => {
  const { f, p, l } = useT();
  const v = l(0, 0.05, 16);
  const watch = l(0, 0.35, 50);
  const sign = l(0, 0.75, 16);
  const split = l(1, 0, 16);
  const zoom = l(2, 0, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.1)} solid size={46} o={1 - split} />
      <Tag i={1} x={860} y={880} p={p(0, 0.4)} size={34} o={1 - split} />
      <Tag i={2} x={500} y={1010} p={p(0, 0.8)} solid size={38} o={1 - split} />
      <Tag i={3} x={540} y={230} p={p(1, 0.2)} solid size={46} o={1 - zoom} />
      <Tag i={4} x={540} y={230} p={p(2, 0.15)} solid size={46} />
      <Tag i={5} x={540} y={1010} p={p(2, 0.5)} size={34} />
    </>}>
      {/* Trang HTML với ô kết luận trượt xuống phát sáng; sếp nhìn, đồng hồ ba mươi giây, ký duyệt. */}
      <G x={540} y={560} s={lerp(1, 0.4, split)} o={1 - split}>
        <Report w={660} h={540} v={v} c={1} />
        <path d={`M-200 -150 Q${-120} ${-190} ${-60} -150 T${80} -150`} fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sign} transform="translate(0 80)" />
        {v > 0.9 && <rect x={-330} y={-260} width={660} height={130} rx={18} fill="none" stroke={GOLDL} strokeWidth={6} opacity={0.4 + 0.3 * Math.sin(f / 6)} />}
      </G>
      <G x={170} y={1100} s={p(0, 0.2)} o={1 - split}>
        <Boss s={1.1} />
      </G>
      <G x={860} y={1030} s={p(0, 0.35) * 0.85} o={1 - split}>
        <Clock r={90} hour={0} minute={watch * 30} />
        <path d={`M0 0 L0 -90 A90 90 0 ${watch > 0.5 ? 1 : 0} 1 ${Math.sin(watch * Math.PI) * 90} ${-Math.cos(watch * Math.PI) * 90} Z`} fill={GOLD} opacity={0.3} />
      </G>
      <G x={lerp(300, 380, sign)} y={lerp(720, 700, sign)} s={p(0, 0.72) * (1 - split)}>
        <rect x={-10} y={-90} width={20} height={110} rx={8} fill={GOLDL} transform="rotate(30)" />
        <path d="M-10 20 L0 44 L10 20 Z" fill={INK} transform="rotate(30)" />
      </G>
      {/* Hai tấm thẻ, việc một phóng to. */}
      {[1, 2].map((n) => (
        <G key={n} x={lerp(540, n === 1 ? 340 : 740, split) + (n === 1 ? lerp(0, 200, zoom) : lerp(0, 400, zoom))} y={lerp(600, 620, split)} s={split * (n === 1 ? lerp(1, 1.35, zoom) : 1)} o={n === 2 ? 1 - zoom : 1}>
          <NumCard n={n} lit={n === 1 && zoom > 0.5} />
        </G>
      ))}
      {/* Ba phòng ban, mỗi người cầm một tờ báo giá. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={260 + k * 280} y={1170} s={p(2, 0.3 + k * 0.1) * 0.85}>
          <Person fill={[TXT, GOLDL, SEC][k]} s={1} />
          <G x={60} y={-20} r={10}>
            <Doc w={70} h={90} n={3} fill={PAPER} />
          </G>
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Câu lệnh so sánh ba nhà cung cấp, năm tiêu chí; tô xanh, tô cam, ô kết luận; sếp gật đầu duyệt. */
export const SoSanhBaoGia: React.FC = () => {
  const { f, p, l } = useT();
  const away = l(0, 0, 14);
  const type = l(0, 0.25, 50);
  const build = l(0, 0.5, 40);
  const tint = l(1, 0, 14);
  const verdict = l(1, 0.55, 14);
  const out = l(2, 0, 20);
  const nod = l(2, 0.3, 4) > 0 ? Math.sin(f / 3) * 5 * (1 - l(2, 0.7, 8)) : 0;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={760} y={230} p={p(0, 0.5)} size={38} o={1 - verdict} />
      <Tag i={1} x={760} y={1010} p={p(0, 0.8)} size={36} o={1 - out} />
      <Tag i={2} x={300} y={1010} p={p(1, 0.35)} solid color={ORANGE} size={36} o={1 - out} />
      <Tag i={3} x={760} y={230} p={p(1, 0.6)} solid size={40} />
      <Tag i={4} x={640} y={1010} p={p(2, 0.4)} solid size={40} />
    </>}>
      {/* Bảng tính chằng chịt bị gạt sang một bên. */}
      <G x={lerp(540, -300, away)} y={640} r={-away * 20} o={1 - away}>
        <Grid cols={14} rows={18} w={700} h={720} />
      </G>
      <G x={540 * (1 - lerp(1, 0.85, out))} y={640 * (1 - lerp(1, 0.85, out))} s={lerp(1, 0.85, out)}>
        {/* Ô chat: ba tờ báo giá thả vào, câu lệnh gõ dần. */}
        <G x={290} y={640} s={p(0, 0.1)}>
          <Chat w={420} h={620}>
            {[0, 1, 2].map((k) => (
              <G key={k} x={-20 + k * 70} y={lerp(-400, -120, p(0, 0.15 + k * 0.08))} r={(k - 1) * 8}>
                <Doc w={90} h={120} n={4} fill={PAPER} />
              </G>
            ))}
            <Box cx={40} cy={120} w={300} h={170} rx={20} fill={GOLD} />
            <Lines x={-90} y={60} w={260 * type} n={4} gap={30} color={INK} t={12} />
            <Box cx={40} cy={250} w={320} h={56} rx={18} fill={SURF} stroke={HOV} strokeWidth={3} />
          </Chat>
        </G>
        {/* Bảng so sánh ba cột nhà cung cấp, năm dòng tiêu chí. */}
        <G x={760} y={640} s={p(0, 0.45)}>
          <Box cx={0} cy={0} w={420} h={620} rx={20} fill={"#FBF8F1"} stroke={GOLD} strokeWidth={5} />
          <rect x={-210} y={-310} width={420} height={44} rx={20} fill={GOLD} />
          {verdict > 0.02 && (
            <G y={lerp(-400, -200, verdict)} o={verdict}>
              <Box cx={0} cy={0} w={380} h={100} rx={14} fill={INK} stroke={GOLD} strokeWidth={5} />
              <rect x={-160} y={-22} width={200} height={16} rx={8} fill={GOLD} />
              <rect x={-160} y={8} width={290} height={10} rx={5} fill={SEC} />
              <G x={150} y={-4}>
                <Spark r={20} fill={GOLDL} />
              </G>
            </G>
          )}
          {Array.from({ length: 18 }, (_, i) => {
            const r = Math.floor(i / 3);
            const k = i % 3;
            const head = r === 0;
            const t = clamp01(build * 2.2 - r * 0.2);
            const fill = head ? INK : tint > 0.5 && r === 2 && k === 1 ? XL : tint > 0.5 && r === 4 && k === 2 ? ORANGE : r % 2 ? PAPER : "#E8E2D4";
            const y0 = lerp(-120, -60, verdict) + r * 64;
            return (
              <G key={i} x={-130 + k * 130} y={y0} s={t} o={t}>
                <Box cx={0} cy={0} w={120} h={56} rx={8} fill={fill} />
                {head ? (
                  Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={-16 * k + d * 32} cy={0} r={8} fill={GOLD} />)
                ) : (
                  <rect x={-40} y={-6} width={60 + ((i * 7) % 3) * 10} height={12} rx={6} fill={INK} opacity={0.6} />
                )}
              </G>
            );
          })}
        </G>
      </G>
      {/* Sếp xem trên điện thoại, gật đầu, đóng dấu duyệt. */}
      <G x={200} y={lerp(1180, 1110, out)} o={out}>
        <G y={nod}>
          <Boss s={1.1} />
        </G>
        <G x={130} y={-60} r={12}>
          <Phone w={120} h={210} screen={"#FBF8F1"}>
            <Box cx={0} cy={-50} w={90} h={30} rx={6} fill={INK} />
            <Grid cols={3} rows={5} w={90} h={110} head={GOLD} fill={PAPER} />
          </Phone>
        </G>
      </G>
      <G x={930} y={1030} s={p(2, 0.6, 9) * 0.8}>
        <Stamp r={70} color={XL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Bảng theo dõi tiến độ: mười lăm đầu việc thành thẻ ba cột, tích là sang Đã xong, như ứng dụng mini. */
export const TheoDoiTienDo: React.FC = () => {
  const { f, p, l } = useT();
  const drop = l(1, 0, 16);
  const fly = l(1, 0.35, 40);
  const tick = l(2, 0.1, 50);
  const mini = l(3, 0.1, 20);
  // Mười lăm thẻ: cột ban đầu, rồi bốn thẻ lần lượt được tích sang cột Đã xong.
  const startCol = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
  const moved = [6, 10, 5, 9];
  const colX = [540, 720, 900];
  const slots = [0, 0, 0];
  const cards = startCol.map((c, i) => {
    const m = moved.indexOf(i);
    const t = m < 0 ? 0 : clamp01(tick * 4 - m);
    return { c, i, t };
  });
  const placed = cards.map(({ c, i, t }) => {
    const done = t > 0.5;
    const col = done ? 2 : c;
    const row = slots[col]++;
    return { i, t, col, row, from: c };
  });
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.05)} solid size={46} o={1 - mini} />
      <Tag i={1} x={230} y={1010} p={p(0, 0.4)} size={34} o={1 - mini} />
      <Tag i={2} x={230} y={330} p={p(1, 0.1)} size={34} o={1 - mini} />
      <Tag i={3} x={540} y={330} p={p(1, 0.55)} size={28} o={1 - mini} />
      <Tag i={4} x={720} y={330} p={p(1, 0.62)} size={28} o={1 - mini} />
      <Tag i={5} x={900} y={330} p={p(1, 0.7)} solid color={XL} size={28} o={1 - mini} />
      <Tag i={6} x={540} y={1010} p={p(3, 0.4)} solid size={42} />
    </>}>
      {/* Danh sách dài mười lăm dòng bên trái, hai nhân vật Nhân sự và Pháp chế. */}
      <G x={230} y={lerp(620, 600, drop)} s={p(0, 0.2)} o={1 - mini}>
        <Box cx={0} cy={0} w={300} h={520} rx={16} fill={PAPER} />
        {Array.from({ length: 15 }, (_, k) => (
          <g key={k} opacity={1 - clamp01(fly * 1.4 - k * 0.04)}>
            <circle cx={-110} cy={-230 + k * 32} r={8} fill={GOLD} />
            <rect x={-90} y={-236 + k * 32} width={180 + ((k * 5) % 3) * 20} height={12} rx={6} fill={SEC} />
          </g>
        ))}
      </G>
      {[0, 1].map((k) => (
        <G key={k} x={150 + k * 160} y={1170} s={p(0, 0.3 + k * 0.1) * 0.85} o={1 - mini}>
          <Person fill={k ? GOLDL : TXT} s={0.95} />
          <G x={0} y={10} s={0.5}>
            <Box cx={0} cy={0} w={50} h={40} rx={8} fill={k ? INK : GOLD} />
          </G>
        </G>
      ))}
      {/* Bảng ba cột, thu gọn thành ứng dụng mini trong điện thoại. */}
      <G x={lerp(0, -180, mini)} y={lerp(0, 0, mini)}>
        <G x={720} y={640} s={lerp(1, 1, mini)}>
          {mini > 0.02 && (
            <G s={lerp(1.6, 1.15, mini)} o={mini}>
              <Phone w={620} h={860} screen={SURF} />
            </G>
          )}
          {colX.map((x, k) => (
            <G key={k} x={x - 720} y={0} s={p(1, 0.4 + k * 0.08)}>
              <Box cx={0} cy={0} w={170} h={600} rx={16} fill={EL} stroke={k === 2 ? XL : HOV} strokeWidth={4} />
              <Box cx={0} cy={-275} w={150} h={26} rx={8} fill={k === 2 ? XL : k === 1 ? GOLD : HOV} />
            </G>
          ))}
          {mini > 0.5 && <Box cx={0} cy={-360} w={540} h={40} rx={12} fill={GOLD} opacity={mini} />}
        </G>
        {placed.map(({ i, t, col, row, from }) => {
          const fl = clamp01(fly * 1.8 - i * 0.05);
          const tx = lerp(colX[from], colX[col], t);
          const ty = 400 + row * 72;
          return (
            <G key={i} x={lerp(230, tx, fl)} y={lerp(-230 + i * 32 + 620, ty, fl)} s={lerp(0.5, 0.92, fl)} o={Math.min(1, fl * 3)}>
              <KCard w={160} h={58} done={col === 2 ? 1 : t} />
            </G>
          );
        })}
      </G>
      {/* Ngón tay tích vào thẻ. */}
      {tick > 0 && tick < 1 && (
        <G x={lerp(560, 740, tick)} y={lerp(890, 760, tick)} s={0.8}>
          <path d="M0 0 V-60 Q0 -76 14 -76 Q28 -76 28 -60 V-20 H50 Q64 -20 64 -6 V30 Q64 50 44 50 H10 Q0 50 0 40 Z" fill={GOLDL} stroke={INK} strokeWidth={4} />
        </G>
      )}
      <G x={880} y={1110} s={p(3, 0.5)}>
        <Spark r={30} fill={GOLD} />
      </G>
      <G x={940} y={1050} s={p(3, 0.6) * (0.9 + 0.1 * Math.sin(f / 5))}>
        <Spark r={16} fill={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
