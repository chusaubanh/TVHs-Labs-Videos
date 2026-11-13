import React from "react";
import { AI, Arrow, Box, Browser, Clock, Cross, Doc, EL, Floor, Folder, G, GOLD, GOLDL, HOV, INK, Lines, Lock, PAPER, Person, Question, RED, SEC, Stage, Stamp, Sun, SURF, Table, Tag, TXT, lerp, useT } from "../shared/art";
import { Cursor, Disk, FileIcon, Intern, MarkClaude, MarkGpt, Wall, Win } from "./art";

/** Cảnh 6 — Không dặn lại mỗi sáng: dán thẳng tờ nội quy lên bàn, hết đoán mò. */
export const DanToNoiQuy: React.FC = () => {
  const { f, p, l } = useT();
  const spin = l(1, 0, 40);
  const stack = l(1, 0.1, 30);
  const slap = p(2, 0, 9);
  const sun = l(2, 0.3, 24);
  const scan = l(2, 0.55, 40);
  const drop = l(3, 0.05, 20);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={600} y={215} p={p(1, 0.2)} size={38} />
      <Tag i={1} x={540} y={985} p={p(2, 0.2)} solid size={40} />
      <Tag i={2} x={830} y={560} p={p(2, 0.65)} size={34} />
      <Tag i={3} x={240} y={560} p={p(3, 0)} solid color={RED} size={32} />
      <Tag i={4} x={500} y={610} p={p(3, 0.55)} solid size={34} />
    </>}>
      {/* Mặt trời buổi sáng. */}
      <G x={870} y={lerp(420, 320, sun)} o={sun} s={0.8}>
        <Sun r={44} />
      </G>
      {/* Bàn làm việc: bạn thực tập sinh ngồi, bạn đứng cạnh. */}
      <Box cx={540} cy={870} w={860} h={26} rx={13} fill={GOLD} />
      <rect x={160} y={883} width={18} height={130} fill={HOV} />
      <rect x={902} y={883} width={18} height={130} fill={HOV} />
      <G x={440} y={800}>
        <Intern s={1.15} />
      </G>
      <G x={800} y={790}>
        <Person fill={SEC} s={1.35} />
      </G>
      {/* Dấu hỏi giữa hai người, rồi rơi rụng khi đã có nội quy. */}
      <G x={620} y={lerp(470, 1300, drop)} s={p(0, 0.1)} r={drop * 40} o={1 - drop}>
        <Question s={1.4} />
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={380 + k * 60} y={lerp(640, 1250, l(3, 0.1 + k * 0.08, 18))} s={p(0, 0.4 + k * 0.1) * 0.45} o={1 - l(3, 0.1 + k * 0.08, 18)}>
          <Question color={GOLD} />
        </G>
      ))}
      {/* Đồng hồ quay đủ một vòng, chồng giấy dặn dò mọc cao rồi bị gạch. */}
      <G x={190} y={330} s={p(1, 0)}>
        <Clock r={80} hour={spin * 12} minute={spin * 720} />
      </G>
      <g>
        {Array.from({ length: 7 }, (_, k) => (
          <G key={k} x={205 + (k % 2) * 8} y={850 - k * 40 * stack} o={stack > k / 7 ? 1 : 0}>
            <Box cx={0} cy={0} w={170} h={34} rx={6} fill={k % 2 ? PAPER : TXT} />
            <Lines x={-66} y={-5} w={132} n={1} color={SEC} t={9} />
          </G>
        ))}
        <G x={210} y={720} s={p(1, 0.75, 9)}>
          <Cross r={90} />
        </G>
      </g>
      {/* Tờ nội quy dán bộp lên bàn, mắt quét từng dòng, ghim bốn chốt. */}
      <G x={540} y={1110} s={lerp(1.5, 1, Math.min(1, slap))} o={Math.min(1, slap)}>
        <Box cx={0} cy={0} w={460} h={240} rx={18} fill={PAPER} />
        <Box cx={0} cy={-88} w={460} h={64} rx={18} fill={GOLD} />
        <Lines x={-190} y={-30} w={380} n={4} gap={36} color={SEC} t={14} />
        {scan > 0 && scan < 1 && <rect x={-200} y={-40 + scan * 140} width={400} height={26} rx={8} fill={GOLDL} opacity={0.6} />}
        {[
          [-210, -100],
          [210, -100],
          [-210, 100],
          [210, 100],
        ].map(([x, y], k) => (
          <G key={k} x={x} y={y} s={p(3, 0.3 + k * 0.08, 9)}>
            <circle r={14} fill={GOLDL} stroke={INK} strokeWidth={4} />
          </G>
        ))}
      </G>
      <G x={860} y={1110} s={p(3, 0.7, 9)}>
        <Stamp r={62} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Tờ nội quy là một file quy tắc trong thư mục làm việc: CLAUDE.md và AGENTS.md. */
export const ClaudeMdAgentsMd: React.FC = () => {
  const { p, l } = useT();
  const fold = l(0, 0, 16);
  const fly = l(0, 0.35, 22);
  const split = l(1, 0, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.3)} solid size={40} />
      <Tag i={1} x={540} y={790} p={p(0, 0.7)} size={34} o={1 - split} />
      <Tag i={2} x={300} y={330} p={p(1, 0.05)} size={34} />
      <Tag i={3} x={300} y={760} p={p(1, 0.45)} solid size={40} />
      <Tag i={4} x={780} y={330} p={p(2, 0.05)} size={34} />
      <Tag i={5} x={780} y={760} p={p(2, 0.45)} solid size={40} />
    </>}>
      {/* Màn hình máy tính trên bàn. */}
      <Box cx={540} cy={560} w={860} h={560} rx={26} fill={EL} stroke={GOLD} strokeWidth={6} />
      <Box cx={540} cy={866} w={90} h={52} fill={HOV} />
      <Box cx={540} cy={902} w={300} h={20} rx={10} fill={HOV} />
      <Box cx={540} cy={935} w={880} h={26} rx={13} fill={GOLD} />
      {/* Một thư mục giữa màn hình, rồi tách thành hai nửa: Claude và ChatGPT. */}
      <G x={lerp(540, 300, split)} y={560} s={p(0, 0.1)}>
        <Folder s={1.3} open={fly} />
        <G x={0} y={-20} s={p(1, 0.25)}>
          <FileIcon s={0.9} fill={GOLDL} ink={INK} />
        </G>
      </G>
      <G x={300} y={430} s={p(1, 0)}>
        <MarkClaude r={42} />
      </G>
      {[0, 1].map((k) => (
        <G key={k} x={170 + k * 260} y={680} s={p(1, 0.6 + k * 0.1)}>
          <FileIcon s={0.55} />
        </G>
      ))}
      <rect x={538} y={300} width={4} height={520} fill={HOV} opacity={split} />
      <G x={780} y={560} s={p(2, 0)}>
        <Folder s={1.3} open={1} />
        <G x={0} y={-20} s={p(2, 0.25)}>
          <FileIcon s={0.9} fill={TXT} ink={INK} />
        </G>
      </G>
      <G x={780} y={430} s={p(2, 0.1)}>
        <MarkGpt r={42} />
      </G>
      {[0, 1].map((k) => (
        <G key={k} x={650 + k * 260} y={680} s={p(2, 0.6 + k * 0.1)}>
          <FileIcon s={0.55} />
        </G>
      ))}
      {/* Tờ nội quy gập lại thành file, bay vào thư mục. */}
      {fly < 1 && (
        <G x={540} y={lerp(1110, 560, fly)} s={lerp(1, 0.4, fly)} o={1 - fly}>
          <g transform={`scale(1 ${1 - fold * 0.5})`}>
            <Box cx={0} cy={0} w={460} h={240} rx={18} fill={PAPER} />
            <Box cx={0} cy={-88} w={460} h={64} rx={18} fill={GOLD} />
            <Lines x={-190} y={-30} w={380} n={4} gap={36} color={SEC} t={14} />
          </g>
        </G>
      )}
      {/* Các file làm việc nằm sẵn dưới bàn. */}
      {[0, 1, 2, 3, 4].map((k) => (
        <G key={k} x={180 + k * 180} y={1100} s={p(0, 0.5 + k * 0.06) * 0.8}>
          <Doc w={120} h={150} n={3} />
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Hai dòng quy tắc: khóa chân số liệu, trích nguồn bắt buộc. */
export const HaiDongQuyTac: React.FC = () => {
  const { f, p, l } = useT();
  const line1 = l(1, 0, 16);
  const line2 = l(2, 0, 16);
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  const rows = [0, 1, 2, 3];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid size={40} />
      <Tag i={1} x={590} y={390} p={p(1, 0.15)} size={34} />
      <Tag i={2} x={330} y={1030} p={p(1, 0.6)} solid color={RED} size={32} />
      <Tag i={3} x={590} y={510} p={p(2, 0.15)} size={34} />
      <Tag i={4} x={800} y={985} p={p(2, 0.6)} solid size={32} />
    </>}>
      {/* File quy tắc mở to, hai dòng trống chờ điền. */}
      <G x={540} y={430} s={p(0, 0)}>
        <Box cx={0} cy={0} w={860} h={330} rx={26} fill={PAPER} />
        <Box cx={0} cy={-125} w={860} h={80} rx={26} fill={GOLD} />
        {[0, 1].map((k) => (
          <g key={k}>
            <rect x={-390} y={-40 + k * 120} width={780} height={84} rx={18} fill={(k ? line2 : line1) > 0.5 ? TXT : EL} stroke={GOLDL} strokeWidth={5} opacity={(k ? line2 : line1) > 0.5 ? 1 : 0.4 + 0.5 * glow} />
            <G x={-330} y={2 + k * 120} s={(k ? line2 : line1) * 0.6}>
              {k ? <path d="M-30 10 Q-30 -30 0 -30 Q30 -30 30 10 M0 -30 V30" fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" /> : <Lock />}
            </G>
          </g>
        ))}
      </G>
      {/* Bảng số bị khoá cột, AI dừng lại hỏi. */}
      <G x={330} y={830} s={p(1, 0.1)}>
        <Table cols={3} rows={4} w={440} h={280} lit={11} fill={TXT} />
        <rect x={-220 + 2 * 146.7 + 4} y={-140 + 3 * 70 + 4} width={138} height={62} rx={8} fill={INK} stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
        <G x={-73} y={-170} s={p(1, 0.3)}>
          <Lock s={0.9} />
        </G>
      </G>
      <G x={820} y={760} s={p(1, 0.35)}>
        <AI size={150} />
        <G x={0} y={-150} s={p(1, 0.6) * 0.6}>
          <Question />
        </G>
        <G x={-120} y={50} s={p(1, 0.5) * 0.9}>
          <rect x={-14} y={-50} width={28} height={100} rx={14} fill={GOLD} />
        </G>
      </G>
      {/* Tài liệu nguồn: mỗi con số kéo dây về đúng dòng, đúng trang. */}
      <G x={820} y={1120} s={p(2, 0.2)}>
        <Box cx={-60} cy={0} w={200} h={180} rx={12} fill={TXT} />
        <Box cx={70} cy={-10} w={200} h={180} rx={12} fill={PAPER} />
        <Lines x={-30} y={-80} w={160} n={5} gap={30} color={SEC} t={10} />
      </G>
      {rows.map((k) => {
        const t = l(2, 0.35 + k * 0.1, 14);
        return t > 0 ? <Arrow key={k} x1={500} y1={720 + k * 70} x2={760} y2={1048 + k * 30} p={t} color={GOLDL} w={6} /> : null;
      })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 9 — Dặn cụ thể: không dặn chung chung, chỉ tính trên cột Thực thu, để AI phỏng vấn ngược. */
export const DanCuThe: React.FC = () => {
  const { p, l } = useT();
  const drift = l(0, 0.1, 30);
  const spot = l(1, 0.15, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={440} p={p(0, 0.1)} size={34} o={1 - drift * 0.5} />
      <Tag i={1} x={590} y={860} p={p(1, 0.5)} solid size={36} />
      <Tag i={2} x={300} y={940} p={p(2, 0.05)} solid size={34} />
      <Tag i={3} x={540} y={1010} p={p(2, 0.35)} size={32} />
      <Tag i={4} x={840} y={940} p={p(2, 0.7)} size={30} />
    </>}>
      {/* Bong bóng dặn chung chung nhoè đi trước khi tới AI. */}
      <G x={lerp(260, 560, drift)} y={320} s={p(0, 0) * lerp(1, 1.3, drift)} o={lerp(1, 0.15, drift)}>
        <Box cx={0} cy={0} w={280} h={120} rx={30} fill={SEC} />
        <Lines x={-100} y={-24} w={200} n={2} gap={34} color={EL} t={14} />
      </G>
      <G x={830} y={320} r={-12 * l(0, 0.5, 10)} s={p(0, 0)}>
        <AI size={150} />
      </G>
      <G x={830} y={170} s={p(0, 0.6) * 0.5}>
        <Question color={SEC} />
      </G>
      {/* Bảng Excel: đèn rọi đúng một cột Thực thu. */}
      <G x={540} y={680} s={p(1, 0)}>
        <rect x={-430} y={-150} width={860} height={300} rx={18} fill={SURF} />
        {Array.from({ length: 24 }, (_, i) => {
          const c = i % 6;
          const r = Math.floor(i / 6);
          const lit = c === 3 && spot > 0.5;
          return <rect key={i} x={-420 + c * 140 + 4} y={-140 + r * 70 + 4} width={132} height={62} rx={8} fill={r === 0 ? (lit ? GOLD : HOV) : lit ? GOLDL : spot > 0.3 ? EL : HOV} />;
        })}
      </G>
      {spot > 0 && <path d={`M${540 + 30} 560 L${540 + 90} 400 L${540 + 30 + 120} 400 L${540 + 30 + 180} 530 Z`} fill={GOLDL} opacity={0.18 * spot} />}
      {/* AI hỏi năm câu, người dùng trả lời, file quy tắc tự viết. */}
      <G x={130} y={1120} s={p(2, 0)}>
        <Person fill={SEC} s={0.9} />
      </G>
      {[0, 1, 2, 3, 4].map((k) => (
        <G key={k} x={260 + k * 95} y={1100 - (k % 2) * 40} s={p(2, 0.15 + k * 0.1) * 0.5}>
          <Box cx={0} cy={0} w={150} h={110} rx={26} fill={k % 2 ? GOLD : TXT} />
          <G s={0.5}>
            <Question color={INK} />
          </G>
        </G>
      ))}
      <G x={860} y={1110} s={p(2, 0.5)}>
        <Box cx={0} cy={0} w={240} h={220} rx={14} fill={PAPER} />
        <Box cx={0} cy={-84} w={240} h={52} rx={14} fill={GOLD} />
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={-96} y={-40 + k * 34} width={192 * l(2, 0.55 + k * 0.1, 12) * (k === 3 ? 0.6 : 1)} height={14} rx={7} fill={SEC} />
        ))}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Tải lên đâu? Không có nút: bản web không đọc được ổ đĩa máy tính. */
export const TaiLenDau: React.FC = () => {
  const { f, p, l } = useT();
  const hunt = l(0, 0.05, 80);
  const gone = l(1, 0.3, 14);
  const back = l(1, 0.45, 22);
  const split = l(2, 0, 20);
  const shot = l(2, 0.45, 14);
  const pts = [
    [300, 400],
    [800, 380],
    [760, 640],
    [320, 660],
    [540, 520],
  ];
  const seg = Math.min(pts.length - 2, Math.floor(hunt * (pts.length - 1)));
  const tt = hunt * (pts.length - 1) - seg;
  const cx = lerp(pts[seg]![0]!, pts[seg + 1]![0]!, tt);
  const cy = lerp(pts[seg]![1]!, pts[seg + 1]![1]!, tt);
  const bx = lerp(540, 290, split);
  const bs = lerp(1, 0.52, split);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.1)} solid size={42} />
      <Tag i={1} x={540} y={840} p={p(1, 0.2)} solid color={RED} size={40} o={1 - split} />
      <Tag i={2} x={290} y={760} p={p(2, 0.3)} size={34} />
      <Tag i={3} x={830} y={760} p={p(2, 0.4)} size={34} />
    </>}>
      {/* Trang web chat. */}
      <G x={bx} y={530} s={bs}>
        <Browser w={880} h={520}>
          <rect x={-420} y={-150} width={200} height={380} rx={16} fill={SURF} />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={-400} y={-120 + k * 60} width={150} height={18} rx={9} fill={HOV} />
          ))}
          <G x={140} y={-40}>
            <Box cx={0} cy={0} w={380} h={80} rx={24} fill={HOV} />
            <Lines x={-150} y={-10} w={260} n={1} color={SEC} t={16} />
          </G>
          <rect x={-180} y={170} width={560} height={60} rx={30} fill={SURF} stroke={HOV} strokeWidth={4} />
          {/* Nút tải lên mờ nhạt, bị gạch chéo rồi biến mất. */}
          <G x={0} y={70} s={p(1, 0)} o={1 - gone}>
            <rect x={-110} y={-36} width={220} height={72} rx={36} fill="none" stroke={SEC} strokeWidth={5} strokeDasharray="12 10" />
            <path d="M0 18 V-18 M-16 -2 L0 -18 L16 -2" fill="none" stroke={SEC} strokeWidth={7} strokeLinecap="round" />
            <G s={p(1, 0.1, 9)}>
              <Cross r={50} />
            </G>
          </G>
        </Browser>
      </G>
      {/* Con trỏ lùng sục tìm nút, kẹp file quy tắc. */}
      {back < 1 && (
        <G x={lerp(cx, 810, back)} y={lerp(cy, 960, back)}>
          <G x={-40} y={60} s={0.7}>
            <FileIcon fill={GOLDL} ink={INK} />
          </G>
          <Cursor s={1.2} />
        </G>
      )}
      <G x={540} y={300} s={p(0, 0.2) * (0.8 + 0.2 * Math.sin(f / 5))} o={1 - split}>
        <Question s={0.6} />
      </G>
      {/* File quy tắc quay về nằm yên trong thư mục. */}
      <G x={810} y={1000} s={p(1, 0.45)}>
        <Folder s={0.9} open={back} />
      </G>
      {/* Bức tường giữa trình duyệt và ổ đĩa, mũi tên đọc đâm vào tường và gãy. */}
      <G x={590} y={530} s={p(2, 0.1)}>
        <Wall w={110} h={520} rows={10} />
      </G>
      <G x={830} y={530} s={p(2, 0.2)}>
        <Disk />
      </G>
      {shot > 0 && <Arrow x1={420} y1={530} x2={lerp(420, 525, shot)} y2={530} p={1} color={GOLDL} w={10} />}
      {shot > 0.95 && (
        <g>
          <line x1={505} y1={515} x2={535} y2={470} stroke={RED} strokeWidth={10} strokeLinecap="round" />
          <line x1={505} y1={545} x2={535} y2={590} stroke={RED} strokeWidth={10} strokeLinecap="round" />
        </g>
      )}
      <G x={850} y={960} s={p(1, 0.6) * 0.6}>
        <FileIcon fill={GOLDL} ink={INK} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
