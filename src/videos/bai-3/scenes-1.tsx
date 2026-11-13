import React from "react";
import { AI, Arrow, Box, Browser, Cross, Desk, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, Stamp, Sun, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { FileIcon, MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Bars, Boss, clamp01, CodeWall, Eye, Grid, Phone, Report, WordStack } from "./art";

/** Cảnh 1 — Hook: điện thoại chi chít số rung lên, rồi lùi về buổi chiều làm Excel mười lăm cột và Word mười trang. */
export const LamKyCaBuoiChieu: React.FC = () => {
  const { f, p, l } = useT();
  const back = l(1, 0, 16);
  const shake = (1 - back) * Math.sin(f * 2.3) * 9;
  const cols = lerp(3, 15, l(2, 0, 45));
  const dusk = l(1, 0.2, 90);
  const pages = lerp(1, 10, l(3, 0.05, 40));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.05)} solid color={RED} size={60} o={1 - back} />
      <Tag i={1} x={300} y={300} p={p(1, 0.35)} solid size={42} />
      <Tag i={2} x={540} y={620} p={p(2, 0.2)} size={40} />
      <Tag i={3} x={800} y={510} p={p(3, 0.3)} size={36} />
    </>}>
      {/* Cửa sổ có mặt trời ngả dần về chiều. */}
      <G x={810} y={330} s={back * 0.85}>
        <Box cx={0} cy={0} w={300} h={240} rx={14} fill={lerp(0, 1, dusk) > 0.5 ? "#5B3416" : "#2A3A52"} stroke={HOV} strokeWidth={8} />
        <G x={lerp(-60, 60, dusk)} y={lerp(-40, 70, dusk)} s={0.45}>
          <Sun r={70} fill={dusk > 0.5 ? "#F59E0B" : GOLDL} />
        </G>
        <line x1={0} y1={-120} x2={0} y2={120} stroke={HOV} strokeWidth={8} />
        <line x1={-150} y1={0} x2={150} y2={0} stroke={HOV} strokeWidth={8} />
      </G>
      <rect x={0} y={0} width={1080} height={1350} fill="#7A3E12" opacity={0.18 * dusk} />
      {/* Bàn làm việc: bảng tính mọc cột. */}
      <G x={540} y={1000} s={back * 0.92} o={Math.min(1, back * 1.5)}>
        <Desk>
          <G x={0} y={-150}>
            <Grid cols={15} rows={9} w={470} h={280} n={cols} />
            {[0, 1, 2].map((k) => (
              <G key={k} x={-200 + k * 30} y={lerp(-40, 0, l(1, 0.2 + k * 0.12, 10))} o={l(1, 0.2 + k * 0.12, 10) * (1 - l(2, 0, 10))}>
                <Box cx={0} cy={0} w={26} h={260} rx={6} fill={[GOLD, XL, "#60A5FA"][k]} opacity={0.5} />
              </G>
            ))}
          </G>
        </Desk>
      </G>
      {/* Máy tính cầm tay và dấu tích cạnh dòng tổng. */}
      <G x={160} y={930} s={p(2, 0.3) * 0.8}>
        <Box cx={0} cy={0} w={130} h={180} rx={16} fill={EL} stroke={GOLD} strokeWidth={4} />
        <Box cx={0} cy={-52} w={96} h={40} rx={6} fill={XL} />
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={-32 + (i % 3) * 32} cy={6 + Math.floor(i / 3) * 30} r={11} fill={i === Math.floor(f / 6) % 9 ? GOLD : HOV} />
        ))}
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={760} y={880 + k * 40} s={p(2, 0.5 + k * 0.12, 9)}>
          <Stamp r={16} color={XL} />
        </G>
      ))}
      {/* Chồng Word dày dần tới trang thứ mười. */}
      <G x={850} y={1010} s={p(3, 0) * 0.7}>
        <WordStack n={pages} />
      </G>
      {/* Hook: màn hình điện thoại chi chít số rung lên, dấu hỏi đỏ đập xuống. */}
      {back < 0.99 && (
        <G x={540 + shake} y={720} s={lerp(1, 0.3, back)} o={1 - back} r={shake * 0.4}>
          <Phone w={440} h={780}>
            <G y={10}>
              <Grid cols={15} rows={26} w={400} h={700} />
            </G>
          </Phone>
          <G y={lerp(-500, 0, p(0, 0.25, 9))} s={1.6}>
            <Question color={RED} />
          </G>
        </G>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Tưởng được khen; sếp hoa mắt trên điện thoại, vẫn gọi vào hỏi; Word không ai đọc quá trang hai. */
export const SepHoaMat: React.FC = () => {
  const { f, p, l } = useT();
  const send = l(0, 0.1, 20);
  const pop = l(1, 0, 6);
  const dark = l(1, 0, 12);
  const pinch = l(1, 0.5, 30);
  const ask = l(2, 0, 14);
  const pages = l(3, 0, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={300} p={p(0, 0.35)} size={38} o={1 - pop} />
      <Tag i={1} x={540} y={230} p={p(1, 0.02)} solid size={44} o={1 - ask} />
      <Tag i={2} x={790} y={330} p={p(1, 0.6)} solid color={RED} size={38} o={1 - ask} />
      <Tag i={3} x={540} y={230} p={p(2, 0.25)} solid size={44} />
      <Tag i={4} x={830} y={330} p={p(2, 0.6)} solid color={RED} size={34} />
      <Tag i={5} x={430} y={870} p={p(3, 0.45)} solid color={RED} size={34} />
      <Tag i={6} x={300} y={460} p={p(3, 0.25)} size={30} />
    </>}>
      <rect x={0} y={0} width={1080} height={1350} fill="#000" opacity={0.25 * dark} />
      {/* Người gửi file, bong bóng tưởng tượng được khen. */}
      <G x={220} y={1090}>
        <Person fill={SEC} s={1.05} />
      </G>
      {[0, 1].map((k) => (
        <G key={k} x={lerp(240, 1200, send) + k * 40} y={lerp(960, 600, send) + k * 30} s={0.5} o={1 - send}>
          {k === 0 ? <Grid cols={4} rows={5} w={150} h={180} /> : <WordStack n={2} />}
        </G>
      ))}
      {pop < 1 && (
        <G x={260} y={560} s={p(0, 0.3) * (1 + pop * 0.4)} o={1 - pop}>
          <ellipse cx={0} cy={0} rx={190} ry={130} fill={TXT} />
          {[0, 1].map((k) => (
            <circle key={k} cx={-60 + k * 40} cy={150 + k * 50} r={22 - k * 8} fill={TXT} />
          ))}
          <path d="M-40 40 V-10 Q-40 -30 -20 -30 L-6 -70 Q8 -80 14 -60 L8 -30 H40 Q56 -30 52 -12 L44 34 Q40 48 26 48 H-24 Z" fill={GOLD} />
          {[-120, 110, 90].map((x, k) => (
            <G key={k} x={x} y={[-50, -60, 50][k]}>
              <Spark r={20} fill={GOLD} />
            </G>
          ))}
        </G>
      )}
      {/* Sếp cầm điện thoại, bảng mười lăm cột bị ép vào màn hình nhỏ, chóng mặt. */}
      <G x={800} y={1090} s={p(1, 0.15)}>
        <Boss fill={TXT} s={1.1} />
      </G>
      <G x={800} y={680} s={p(1, 0.3) * (1 - ask * 0.4)} o={1 - ask}>
        <Phone w={260} h={460}>
          <G x={Math.sin(pinch * 12) * 4}>
            <Grid cols={15} rows={16} w={230} h={400} />
          </G>
          <circle cx={lerp(-30, -90, pinch)} cy={lerp(30, 90, pinch)} r={20} fill={GOLDL} opacity={0.8} />
          <circle cx={lerp(30, 90, pinch)} cy={lerp(-30, -90, pinch)} r={20} fill={GOLDL} opacity={0.8} />
        </Phone>
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={800} y={970} r={f * 6 + k * 120} o={p(1, 0.55) * (1 - ask)}>
          <path d="M70 0 A70 30 0 0 1 0 30" fill="none" stroke={GOLDL} strokeWidth={6} strokeLinecap="round" transform={`translate(0 ${-k * 4})`} />
          <circle cx={70} cy={0} r={8} fill={GOLD} />
        </G>
      ))}
      {/* Sếp hỏi: ba nhà cung cấp, cột B cao hơn có dấu hỏi. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={700 + k * 110} y={760} s={p(2, 0.15 + k * 0.08)}>
          <rect x={-40} y={-[150, 250, 180][k]} width={80} height={[150, 250, 180][k]} rx={10} fill={k === 1 ? GOLD : HOV} />
          {Array.from({ length: k + 1 }, (_, d) => (
            <circle key={d} cx={-16 + d * 16} cy={26} r={7} fill={GOLDL} />
          ))}
        </G>
      ))}
      <G x={810} y={450} s={p(2, 0.4) * 0.8}>
        <Question color={RED} />
      </G>
      <Arrow x1={720} y1={1000} x2={360} y2={1000} p={l(2, 0.55, 14)} color={RED} />
      <G x={220} y={880} s={p(2, 0.05)} r={Math.sin(f * 1.4) * 14 * (1 - l(2, 0.4, 8))}>
        <Phone w={70} h={120} screen={GOLD} />
      </G>
      {/* Word mười trang: hai trang được lật, phần còn lại phủ bụi. */}
      {Array.from({ length: 10 }, (_, k) => {
        const read = k < 2;
        return (
          <G key={k} x={110 + (k % 5) * 92} y={560 + Math.floor(k / 5) * 150} s={p(3, k * 0.03) * 0.42}>
            <WordStack n={1} />
            {!read && <rect x={-85} y={-110} width={170} height={220} rx={10} fill="#5A5A5A" opacity={0.55} />}
            {!read && <path d="M-85 -110 L-20 -40 M-85 -110 L-85 -20 M-85 -110 L-10 -110 M-60 -84 Q-40 -70 -62 -50" stroke={TXT} strokeWidth={4} fill="none" opacity={0.7} />}
          </G>
        );
      })}
      <G x={202} y={560 + 10} s={pages * 0.9}>
        <ellipse cx={-10} cy={0} rx={14} ry={22} fill={GOLD} />
        <circle cx={-14} cy={-32} r={6} fill={GOLD} />
        <circle cx={0} cy={-34} r={5} fill={GOLD} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Nội dung vẫn tốt, cái khung tĩnh chặn mắt; số liệu thoát ra một file HTML trên trình duyệt. */
export const DinhDangTinh: React.FC = () => {
  const { f, p, l } = useT();
  const glow = l(0, 0.1, 14);
  const cage = l(1, 0, 14);
  const free = l(2, 0.2, 20);
  const build = l(2, 0.45, 30);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.2)} solid size={44} o={1 - cage} />
      <Tag i={1} x={540} y={230} p={p(1, 0.15)} solid color={"#9FB4C7"} size={44} o={1 - free} />
      <Tag i={2} x={540} y={1010} p={p(1, 0.5)} size={38} o={1 - free} />
      <Tag i={3} x={540} y={230} p={p(2, 0.35)} solid size={46} />
      <Tag i={4} x={540} y={1010} p={p(2, 0.7)} size={38} />
    </>}>
      {/* Bảng Excel và trang Word: phần ruột sáng vàng. */}
      <G x={290} y={560} s={p(0, 0) * lerp(1, 0.5, free)} o={1 - free * 0.9}>
        <Box cx={0} cy={0} w={380} h={420} rx={16} fill={EL} stroke={HOV} strokeWidth={4} />
        <Grid cols={5} rows={8} w={340} h={380} fill={glow > 0.5 ? GOLDL : TXT} ink={INK} />
        <Bars w={380} h={420} drop={free} />
      </G>
      <G x={790} y={560} s={p(0, 0.15) * lerp(1, 0.5, free)} o={1 - free * 0.9}>
        <Box cx={0} cy={0} w={340} h={420} rx={12} fill={TXT} />
        <rect x={-170} y={-210} width={340} height={36} rx={12} fill="#2B579A" />
        <Lines x={-140} y={-140} w={280} n={10} gap={34} color={glow > 0.5 ? GOLD : SEC} t={13} />
        <Bars w={340} h={420} drop={free} />
      </G>
      {[290, 790].map((x, k) => (
        <G key={x} x={x + 140} y={380} s={p(0, 0.4 + k * 0.1, 9) * (1 - cage)}>
          <circle r={40} fill={INK} />
          <Stamp r={36} color={XL} />
        </G>
      ))}
      {/* Con mắt nhìn vào, ánh nhìn bị song sắt chặn lại thành mảnh vụn. */}
      <G x={540} y={930} s={p(1, 0.3) * (1 - free)}>
        <Eye look={Math.sin(f / 8)} />
      </G>
      {[-1, 1].map((d) =>
        Array.from({ length: 3 }, (_, k) => {
          const t = clamp01(l(1, 0.4, 16) - k * 0.15);
          return (
            <g key={`${d}-${k}`} opacity={1 - free}>
              <line x1={540 + d * 70} y1={870} x2={lerp(540 + d * 70, 540 + d * 240, t)} y2={lerp(870, 790 - k * 20, t)} stroke={GOLDL} strokeWidth={6} strokeDasharray="10 12" />
              {t > 0.95 && (
                <G x={540 + d * 240} y={790 - k * 20} r={f * 4 * d}>
                  <path d="M-14 -6 L0 -16 L12 4 L-4 14 Z" fill="#9FB4C7" />
                </G>
              )}
            </g>
          );
        }),
      )}
      {/* Số liệu bay vào trình duyệt, dựng thành một trang báo cáo; một file duy nhất cạnh đó. */}
      {Array.from({ length: 8 }, (_, k) => {
        const t = clamp01(free * 1.3 - k * 0.04);
        return (
          <G key={k} x={lerp(k < 4 ? 290 : 790, 540, t)} y={lerp(560, 640, t)} o={(1 - build) * Math.min(1, free * 3)}>
            <Box cx={0} cy={0} w={60} h={30} rx={8} fill={k % 2 ? GOLD : TXT} />
          </G>
        );
      })}
      <G x={540} y={640} s={p(2, 0.3)}>
        <Browser w={780} h={560}>
          <G y={50}>
            <Report w={720} h={420} v={build} toc={build} c={build} />
          </G>
        </Browser>
      </G>
      <G x={930} y={1080} s={p(2, 0.6)}>
        <FileIcon fill={GOLDL} ink={INK} s={1.1} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — Không biết lập trình? Bức tường mã tan; đưa số liệu thô, ra lệnh tiếng Việt, AI tự dựng giao diện. */
export const KhongBietLapTrinh: React.FC = () => {
  const { f, p, l } = useT();
  const near = l(0, 0, 40);
  const melt = l(1, 0, 24);
  const app = l(2, 0, 14);
  const type = l(2, 0.3, 40);
  const ui = l(3, 0.15, 50);
  const people = 1 - app;
  const parts: [number, number, number, number, string][] = [
    [0, -140, 300, 36, GOLD],
    [-80, -60, 140, 90, "#60A5FA"],
    [80, -60, 140, 90, XL],
    [0, 60, 300, 110, TXT],
    [-90, 150, 100, 36, GOLD],
    [60, 150, 160, 36, HOV],
  ];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={1010} p={p(0, 0.3)} size={38} o={people} />
      <Tag i={1} x={540} y={230} p={p(0, 0.6)} solid color={RED} size={44} o={1 - melt} />
      <Tag i={2} x={540} y={230} p={p(1, 0.3)} solid size={46} o={1 - app} />
      <Tag i={3} x={300} y={230} p={p(2, 0.15)} solid size={38} />
      <Tag i={4} x={760} y={230} p={p(2, 0.5)} size={38} />
      <Tag i={5} x={200} y={1010} p={p(3, 0.1)} size={34} />
      <Tag i={6} x={860} y={1010} p={p(3, 0.25)} size={34} />
      <Tag i={7} x={540} y={900} p={p(3, 0.6)} solid size={38} />
    </>}>
      {/* Bức tường mã ập tới rồi tan thành bụi. */}
      <G x={540} y={520} s={lerp(0.6, 1, near)} o={1 - app}>
        <CodeWall w={900} h={480} fade={melt} />
        <G y={-40} s={p(1, 0.35, 9)}>
          <Cross r={90} />
        </G>
      </G>
      {/* Hai nhân viên văn phòng: kế toán cầm máy tính, nhân sự ôm hồ sơ. */}
      {[0, 1].map((k) => {
        const lean = (1 - melt) * near * (k ? 10 : -10);
        return (
          <G key={k} x={k ? 830 : 250} y={1100 + Math.sin(f / 10 + k) * 4 * melt} r={lean} o={people}>
            <Person fill={k ? GOLDL : TXT} s={1.1} />
            {k === 0 ? (
              <G x={70} y={-10} s={0.4}>
                <Box cx={0} cy={0} w={130} h={180} rx={16} fill={EL} stroke={GOLD} strokeWidth={6} />
                <Box cx={0} cy={-52} w={96} h={40} rx={6} fill={XL} />
              </G>
            ) : (
              <G x={-70} y={-6} s={0.5}>
                <Doc w={120} h={150} n={4} fill={PAPER} />
              </G>
            )}
          </G>
        );
      })}
      {/* Khung ứng dụng: số liệu thô thả vào, ô chat gõ tiếng Việt. */}
      <G x={540} y={560} s={app}>
        <Win w={880} h={600}>
          <G x={-220} y={lerp(-400, -30, p(2, 0.1))}>
            <Grid cols={4} rows={7} w={260} h={260} fill={PAPER} />
          </G>
          <Box cx={-150} cy={200} w={440} h={70} rx={20} fill={SURF} stroke={GOLD} strokeWidth={3} />
          <rect x={-350} y={192} width={360 * type} height={16} rx={8} fill={TXT} />
          <rect x={-345 + 360 * type} y={180} width={6} height={40} rx={3} fill={GOLD} opacity={Math.floor(f / 12) % 2} />
          {/* Giao diện tự lắp ghép ở nửa phải. */}
          <G x={210}>
            <Box cx={0} cy={0} w={340} h={420} rx={14} fill={INK} stroke={HOV} strokeWidth={3} />
            {parts.map(([x, y, w, h, c], k) => {
              const t = clamp01(ui * 1.6 - k * 0.12);
              return (
                <G key={k} x={lerp(x + (k % 2 ? 300 : -300), x, t)} y={lerp(y - 300, y, t)} o={Math.min(1, t * 2)}>
                  <Box cx={0} cy={0} w={w} h={h} rx={10} fill={c} />
                </G>
              );
            })}
          </G>
        </Win>
      </G>
      <G x={200} y={940} s={p(3, 0)}>
        <MarkGpt r={50} />
      </G>
      <G x={860} y={940} s={p(3, 0.15)}>
        <MarkClaude r={50} />
      </G>
      <G x={540} y={1090} s={p(3, 0.5) * 0.75}>
        <AI size={150} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 5 — Trang HTML vượt file tĩnh: mục lục bấm nhảy, tô màu xanh giá tốt, cam điều khoản bất lợi. */
export const MucLucToMau: React.FC = () => {
  const { f, p, l } = useT();
  const swap = l(0, 0.2, 22);
  const toc = l(1, 0, 14);
  const jump = l(1, 0.55, 8);
  const color = l(2, 0.25, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={190} y={330} p={p(0, 0.05)} size={34} />
      <Tag i={1} x={690} y={230} p={p(0, 0.4)} solid size={42} />
      <Tag i={2} x={400} y={1010} p={p(1, 0.3)} solid size={38} o={1 - color} />
      <Tag i={3} x={300} y={1010} p={p(2, 0.35)} solid color={XL} size={36} />
      <Tag i={4} x={760} y={1010} p={p(2, 0.6)} solid color={"#F59E0B"} size={36} />
    </>}>
      {/* Trang giấy tĩnh xám lùi lại bên trái. */}
      <G x={lerp(400, 190, swap)} y={640} s={lerp(1, 0.55, swap)} o={lerp(1, 0.6, swap)}>
        <Box cx={0} cy={0} w={380} h={540} rx={12} fill={HOV} />
        <Lines x={-150} y={-230} w={300} n={14} gap={34} color={SEC} t={12} />
        <G y={180 + Math.sin(f / 5) * 20 * (1 - l(1, 0.6, 6))} x={120} s={0.8}>
          <path d="M0 0 V-60 Q0 -76 14 -76 Q28 -76 28 -60 V-20 H50 Q64 -20 64 -6 V30 Q64 50 44 50 H10 Q0 50 0 40 Z" fill={TXT} />
        </G>
        <G y={180} x={130} s={p(1, 0.6, 9)}>
          <Cross r={50} />
        </G>
      </G>
      {/* Trang HTML sáng phóng to bên phải. */}
      <G x={lerp(800, 650, swap)} y={640} s={lerp(0.4, 1, swap)}>
        <Report w={660} h={640} v={1} toc={toc} c={color} hl={jump * (1 - color)} />
      </G>
      {/* Ngón tay bấm một mục trong mục lục. */}
      <G x={lerp(560, 410, l(1, 0.3, 12))} y={lerp(980, 700, l(1, 0.3, 12))} s={p(1, 0.25) * 0.8} o={1 - color}>
        <path d="M0 0 V-60 Q0 -76 14 -76 Q28 -76 28 -60 V-20 H50 Q64 -20 64 -6 V30 Q64 50 44 50 H10 Q0 50 0 40 Z" fill={GOLDL} stroke={INK} strokeWidth={4} />
      </G>
      {jump > 0 && jump < 1 && <circle cx={420} cy={630} r={20 + jump * 40} fill="none" stroke={GOLD} strokeWidth={6} opacity={1 - jump} />}
      {/* Đường sáng nối ô màu với nhãn. */}
      <Floor y={1240} />
    </Stage>
  );
};
