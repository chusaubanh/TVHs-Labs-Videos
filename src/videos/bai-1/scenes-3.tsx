import React from "react";
import { AI, BrandEnd, Arrow, Box, Cross, EL, Floor, Folder, G, GOLD, GOLDL, HOV, INK, Lines, Mag, PAPER, RED, SEC, Spark, Stage, Stamp, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { clamp01, Cursor, FileIcon, Laptop, MarkClaude, MarkGpt, Strip, Win } from "./art";

/** Cảnh 11 — Cài app trên máy, link tải dưới video, Codex và Claude Desktop, bấm Open Folder. */
export const CaiAppMoThuMuc: React.FC = () => {
  const { p, l } = useT();
  const bar = l(0, 0.1, 40);
  const drop = l(0, 0.6, 14);
  const card = l(1, 0.15, 16);
  const two = l(2, 0, 16);
  const away = l(3, 0, 12);
  const login = l(3, 0.05, 20);
  const click = l(3, 0.4, 6);
  const tree = l(3, 0.5, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.1)} solid size={40} />
      <Tag i={1} x={540} y={1000} p={p(1, 0.35)} size={34} o={1 - away} />
      <Tag i={2} x={320} y={300} p={p(2, 0.1)} solid size={34} />
      <Tag i={3} x={760} y={300} p={p(2, 0.5)} solid size={34} />
      <Tag i={4} x={760} y={640} p={p(3, 0.3)} size={32} />
      <Tag i={5} x={880} y={1000} p={p(3, 0.85)} solid size={40} />
    </>}>
      {/* Màn hình máy tính, thanh cài đặt chạy đầy, biểu tượng app hạ xuống thanh tác vụ. */}
      <Box cx={540} cy={470} w={900} h={460} rx={26} fill={EL} stroke={GOLD} strokeWidth={6} />
      <rect x={100} y={650} width={880} height={56} rx={14} fill={SURF} />
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={140 + k * 70} y={662} width={42} height={32} rx={8} fill={HOV} />
      ))}
      <G x={lerp(540, 450, drop)} y={lerp(420, 678, drop)} s={p(0, 0.2) * lerp(1, 0.4, drop)} o={1 - two}>
        <Box cx={0} cy={0} w={110} h={110} rx={26} fill={GOLD} />
        <path d="M0 -26 V22 M-20 4 L0 24 L20 4" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
      </G>
      <g opacity={1 - two}>
        <rect x={240} y={530} width={600} height={30} rx={15} fill={HOV} />
        <rect x={240} y={530} width={600 * bar} height={30} rx={15} fill={GOLD} />
      </g>
      {/* Hai cửa sổ app song song. */}
      <G x={320} y={470} s={p(2, 0)} o={clamp01(p(2, 0))}>
        <Win w={380} h={300} stroke={HOV}>
          <G x={0} y={-30}>
            <MarkGpt r={40} />
          </G>
          <rect x={-130} y={40} width={260} height={40} rx={10} fill={SURF} />
          <rect x={-110} y={54} width={220 * login} height={12} rx={6} fill={SEC} />
        </Win>
      </G>
      <G x={760} y={470} s={p(2, 0.4)} o={clamp01(p(2, 0.4))}>
        <Win w={380} h={300} stroke={GOLD}>
          <G x={0} y={-50}>
            <MarkClaude r={40} />
          </G>
          <rect x={-130} y={10} width={260} height={36} rx={10} fill={SURF} />
          <rect x={-110} y={22} width={220 * login} height={12} rx={6} fill={SEC} />
          <G x={0} y={90} s={1 - 0.12 * (click - l(3, 0.5, 6))}>
            <Box cx={0} cy={0} w={240} h={50} rx={25} fill={click > 0.5 ? GOLDL : GOLD} />
            <G x={-80} y={0} s={0.3}>
              <Folder />
            </G>
          </G>
        </Win>
      </G>
      {login > 0 && login < 1 && (
        <G x={lerp(700, 790, login)} y={lerp(800, 560, login)}>
          <Cursor s={1.1} />
        </G>
      )}
      {/* Mũi tên chỉ xuống dưới video, thẻ link tải chính thức trượt lên. */}
      <g opacity={1 - away}>
        <G x={540} y={780} s={p(1, 0)}>
          <Arrow x1={0} y1={-40} x2={0} y2={90} p={1} w={16} />
        </G>
        <G x={540} y={lerp(1300, 1110, card)} o={card > 0 ? 1 : 0}>
          <Box cx={0} cy={0} w={560} h={130} rx={26} fill={TXT} />
          <G x={-210} y={0}>
            <Stamp r={40} color={XL} />
          </G>
          <Lines x={-140} y={-26} w={340} n={2} gap={34} color={SEC} t={14} />
        </G>
      </g>
      {/* Cây thư mục mở ra, chọn đúng thư mục có file quy tắc. */}
      <G x={420} y={950} s={tree} o={tree}>
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <rect x={-260 + (k ? 60 : 0)} y={-120 + k * 80} width={440} height={64} rx={14} fill={k === 2 ? GOLD : SURF} />
            <G x={-220 + (k ? 60 : 0)} y={-88 + k * 80} s={0.26}>
              <Folder />
            </G>
            <rect x={-170 + (k ? 60 : 0)} y={-96 + k * 80} width={200} height={16} rx={8} fill={k === 2 ? INK : SEC} />
            {k === 2 && (
              <G x={120} y={-88 + k * 80} s={0.35}>
                <FileIcon fill={TXT} ink={INK} />
              </G>
            )}
          </g>
        ))}
        {[1, 2, 3].map((k) => (
          <path key={k} d={`M-240 ${-56 + (k - 1) * 80} V${-88 + k * 80} H-200`} fill="none" stroke={HOV} strokeWidth={5} />
        ))}
      </G>
      <G x={880} y={1110} s={p(3, 0.85, 9)}>
        <Stamp r={70} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Một câu giao việc ra bảng đối soát có nguồn; vòng lại dải prompt của cảnh đầu. */
export const MotCauGiaoViec: React.FC = () => {
  const { f, p, l } = useT();
  const enter = l(0, 0.55, 6);
  const glow = l(1, 0, 20);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={330} y={375} p={p(0, 0.1)} size={38} />
      <Tag i={1} x={540} y={905} p={p(0, 0.75)} solid size={38} />
      <Tag i={2} x={500} y={1010} p={p(1, 0.6)} solid size={40} />
    </>}>
      {/* Dải prompt một dòng: cùng hình với cảnh đầu. */}
      <G x={540} y={260} s={p(0, 0)}>
        <Strip glow={glow * (0.6 + 0.4 * Math.sin(f / 5))} caret={enter < 0.5} />
      </G>
      <G x={880} y={380} s={p(0, 0.4)}>
        <g transform={`translate(0 ${enter * 8 - l(0, 0.65, 6) * 8})`}>
          <Box cx={0} cy={0} w={150} h={90} rx={16} fill={TXT} />
          <path d="M40 -20 V12 H-40 M-26 -2 L-42 12 L-26 26" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </G>
      {/* Bảng đối soát chi phí tự dựng từng dòng, mỗi số có dây nối về file nguồn. */}
      <G x={540} y={660}>
        {[0, 1, 2, 3, 4].map((r) => {
          const t = l(0, 0.6 + r * 0.07, 10);
          return (
            <g key={r} opacity={t} transform={`translate(${(1 - t) * 40} 0)`}>
              {[0, 1, 2, 3].map((c) => (
                <rect key={c} x={-380 + c * 190 + 4} y={-200 + r * 80 + 4} width={182} height={72} rx={10} fill={r === 0 ? GOLD : c === 3 ? TXT : HOV} />
              ))}
              {r > 0 && <rect x={-370 + 3 * 190 + 20} y={-200 + r * 80 + 30} width={110} height={18} rx={9} fill={INK} />}
              {r > 0 && (
                <G x={340} y={-160 + r * 80} s={p(1, 0.1 + r * 0.08, 9) * 0.32}>
                  <Stamp r={70} color={XL} />
                </G>
              )}
            </g>
          );
        })}
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={260 + k * 280} y={1150} s={p(0, 0.7 + k * 0.06)}>
          <FileIcon s={0.9} />
        </G>
      ))}
      {[1, 2, 3, 4].map((r) => {
        const t = l(0, 0.8 + r * 0.04, 10);
        return t > 0 ? <Arrow key={r} x1={260 + ((r - 1) % 3) * 280} y1={1085} x2={420 + ((r * 97) % 260)} y2={540 + r * 80 + 20} p={t} color={GOLDL} w={5} dash /> : null;
      })}
      {/* Con dấu chuẩn xác đóng lên. */}
      <G x={800} y={1010} s={p(1, 0.75, 9)} r={-12}>
        <Stamp r={46} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 13 — Mười lăm phút, hướng dẫn năm bước dưới video, gõ thử một câu và thành công. */
export const MuoiLamPhut: React.FC = () => {
  const { f, p, l } = useT();
  const q = l(0, 0.05, 30);
  const a = (q * Math.PI) / 2;
  const typed = l(2, 0.15, 40);
  const confetti = l(3, 0.75, 30);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={240} y={560} p={p(0, 0.3)} solid size={40} />
      <Tag i={1} x={300} y={680} p={p(1, 0.15)} size={30} />
      <Tag i={2} x={300} y={830} p={p(1, 0.4)} size={30} />
      <Tag i={3} x={300} y={980} p={p(1, 0.65)} size={30} />
      <Tag i={4} x={780} y={600} p={p(2, 0.05)} size={32} />
      <Tag i={5} x={780} y={1020} p={p(3, 0.8)} solid size={40} />
    </>}>
      {/* Đồng hồ quét đúng một phần tư vòng. */}
      <G x={240} y={360} s={p(0, 0)}>
        <circle r={130} fill={TXT} stroke={GOLD} strokeWidth={10} />
        {q > 0.01 && <path d={`M0 0 L0 -120 A120 120 0 0 1 ${Math.sin(a) * 120} ${-Math.cos(a) * 120} Z`} fill={GOLD} />}
        <line y2={-110} stroke={INK} strokeWidth={9} strokeLinecap="round" transform={`rotate(${q * 90})`} />
        <circle r={10} fill={INK} />
      </G>
      {/* Nút tua lại bị gạch nhẹ. */}
      <G x={560} y={360} s={p(0, 0.5)}>
        <circle r={70} fill={EL} stroke={HOV} strokeWidth={5} />
        <path d="M18 -26 L-18 0 L18 26 Z M-24 -26 V26" fill={SEC} stroke={SEC} strokeWidth={6} strokeLinejoin="round" />
        <G s={p(0, 0.7, 9) * 0.6}>
          <Cross r={60} color={HOV} />
        </G>
      </G>
      {/* Ba thẻ dưới video: hướng dẫn năm bậc, link tải app, mẫu câu lệnh có nút copy. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={300} y={lerp(1300, 740 + k * 150, l(1, 0.1 + k * 0.25, 14))} o={l(1, 0.1 + k * 0.25, 14) > 0 ? 1 : 0}>
          <Box cx={0} cy={0} w={440} h={120} rx={22} fill={SURF} stroke={k === 0 ? GOLD : HOV} strokeWidth={4} />
          {k === 0 &&
            [0, 1, 2, 3, 4].map((s) => <rect key={s} x={-180 + s * 40} y={40 - (s + 1) * 12} width={34} height={(s + 1) * 12} rx={4} fill={GOLD} />)}
          {k === 1 && (
            <G x={-140} y={18} s={0.45}>
              <Box cx={0} cy={0} w={110} h={110} rx={26} fill={GOLD} />
              <path d="M0 -26 V22 M-20 4 L0 24 L20 4" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
            </G>
          )}
          {k === 2 && (
            <g>
              <rect x={-190} y={8} width={260} height={16} rx={8} fill={SEC} />
              <rect x={110} y={-2} width={44} height={44} rx={8} fill="none" stroke={GOLDL} strokeWidth={5} />
              <rect x={124} y={10} width={44} height={44} rx={8} fill={GOLDL} />
            </g>
          )}
        </G>
      ))}
      {/* App trên máy: gõ câu thử, AI đọc file quy tắc và trả lời ba dòng khớp tờ nội quy. */}
      <G x={770} y={800} s={p(2, 0)} o={clamp01(p(2, 0))}>
        <Win w={420} h={500} stroke={GOLD}>
          <rect x={-180} y={170} width={360} height={50} rx={25} fill={SURF} />
          <rect x={-180} y={188} width={300 * typed} height={14} rx={7} fill={TXT} />
          {typed < 1 && f % 30 < 15 && <rect x={-176 + 300 * typed} y={180} width={6} height={30} fill={GOLDL} />}
          {[0, 1, 2].map((k) => (
            <G key={k} x={0} y={-130 + k * 80} s={p(3, 0.15 + k * 0.12)} o={clamp01(p(3, 0.15 + k * 0.12))}>
              <Box cx={0} cy={0} w={360} h={60} rx={16} fill={TXT} />
              <rect x={-160} y={-7} width={240} height={14} rx={7} fill={INK} />
              <G x={150} y={0} s={0.28}>
                <Stamp r={70} color={XL} />
              </G>
            </G>
          ))}
          <G x={-170} y={-200} s={p(3, 0)}>
            <AI size={56} />
          </G>
        </Win>
      </G>
      <G x={890} y={380} s={p(3, 0.05) * 0.85}>
        <Box cx={0} cy={0} w={170} h={200} rx={14} fill={PAPER} />
        <Box cx={0} cy={-74} w={170} h={44} rx={14} fill={GOLD} />
        <Lines x={-60} y={-30} w={120} n={3} gap={34} color={SEC} t={12} />
      </G>
      {confetti > 0 &&
        Array.from({ length: 14 }, (_, i) => {
          const ang = (i / 14) * Math.PI * 2;
          const d = 40 + confetti * 150;
          return <rect key={i} x={790 + Math.cos(ang) * d} y={700 + Math.sin(ang) * d * 0.7 + confetti * 60} width={16} height={10} rx={3} fill={i % 2 ? GOLD : GOLDL} transform={`rotate(${i * 40} ${790 + Math.cos(ang) * d} ${700 + Math.sin(ang) * d * 0.7})`} opacity={1 - confetti * 0.4} />;
        })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 14 — Mở máy làm luôn, kẹt bước nào thì bình luận, bài tiếp theo: chuyên viên phản biện khó tính. */
export const HenBaiSau: React.FC = () => {
  const { f, p, l } = useT();
  const end = l(3, 0, 12);
  const open = l(0, 0, 18);
  const scan = l(2, 0.3, 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.3)} solid size={44} />
      <Tag i={1} x={300} y={700} p={p(1, 0.3)} size={34} />
      <Tag i={2} x={800} y={640} p={p(2, 0.05)} solid size={36} />
      <Tag i={3} x={760} y={1020} p={p(2, 0.5)} size={32} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Máy tính xách tay bật mở: thư mục làm việc và file quy tắc. */}
      <G x={540} y={560} s={0.9}>
        <Laptop open={open}>
          <G x={-120} y={-180} s={1.1}>
            <Folder open={1} />
          </G>
          <G x={140} y={-190} s={1.2}>
            <FileIcon fill={GOLDL} ink={INK} />
          </G>
        </Laptop>
      </G>
      {/* Bậc thang năm bước, một bậc kẹt có dấu chấm than, bong bóng bình luận bay lên. */}
      {[0, 1, 2, 3, 4].map((s) => (
        <G key={s} x={110 + s * 80} y={1200} s={p(1, s * 0.06)}>
          <rect x={-36} y={-(s + 1) * 50} width={72} height={(s + 1) * 50} rx={8} fill={s === 2 ? RED : GOLD} />
          {s === 2 && (
            <g>
              <rect x={-6} y={-140} width={12} height={34} rx={6} fill={INK} />
              <circle cy={-92} r={7} fill={INK} />
            </g>
          )}
        </G>
      ))}
      <G x={270} y={lerp(1060, 860, l(1, 0.35, 20))} s={p(1, 0.35)}>
        <Box cx={0} cy={0} w={160} h={90} rx={24} fill={TXT} />
        <path d="M-50 42 L-66 76 L-20 42 Z" fill={TXT} />
        <Lines x={-54} y={-18} w={108} n={2} gap={28} color={SEC} t={10} />
      </G>
      {/* Bài sau: AI cầm kính lúp soi văn bản, gạch đỏ vài chỗ, rồi gửi sếp. */}
      <G x={800} y={850} s={p(2, 0)}>
        <Box cx={0} cy={0} w={300} h={300} rx={14} fill={PAPER} />
        <Lines x={-120} y={-110} w={240} n={7} gap={32} color={SEC} t={12} />
        {[1, 4].map((k) => (
          <rect key={k} x={-124} y={-114 + k * 32} width={200 * clamp01(scan * 2 - (k === 4 ? 0.8 : 0))} height={8} rx={4} fill={RED} />
        ))}
        <G x={lerp(-80, 90, scan)} y={lerp(-80, 60, scan)}>
          <Mag s={0.9} />
        </G>
      </G>
      <G x={940} y={700} s={p(2, 0.15) * 0.45}>
        <AI size={120} />
      </G>
      <G x={800} y={1140} s={p(2, 0.65)}>
        <Box cx={0} cy={0} w={170} h={110} rx={12} fill={TXT} />
        <path d="M-85 -55 L0 10 L85 -55" fill="none" stroke={GOLD} strokeWidth={8} strokeLinejoin="round" />
      </G>
      <Arrow x1={800} y1={1005} x2={800} y2={1075} p={l(2, 0.6, 10)} />
      <G x={540} y={760} s={p(0, 0.5) * (0.9 + 0.1 * Math.sin(f / 6))}>
        <Spark r={16} fill={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

