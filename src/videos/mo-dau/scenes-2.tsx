import React from "react";
import { AI, Arrow, Box, Browser, Clock, Cross, Desk, Excel, Floor, Folder, G, GOLD, GOLDL, HOV, Hand, INK, Lines, Mag, Person, Question, RED, SEC, SURF, Spark, Stage, Table, Tag, TXT, XL, EL, lerp, useT } from "../shared/art";

const c01 = (v: number): number => Math.max(0, Math.min(1, v));
const sw = (f: number, per: number, ph = 0): number => Math.sin(f / per + ph);

/** Cảnh 6 — Cách thứ nhất: Excel cắt thành mẩu dán vào khung chat; bóng tối chỉ chừa vòng sáng; ô trống bị lấp số lạ; người còng lưng dò số. */
export const Cach1KhungChatWeb: React.FC = () => {
  const { f, p, l } = useT();
  const spot = l(1, 0, 12) * (1 - l(2, 0, 10));
  const sx = 330 + 14 * sw(f, 20);
  const sy = 560 + 10 * Math.cos(f / 17);
  const pasted = l(0, 0.78, 14);
  const hole = l(2, 0, 10);
  const tick = (f % 90) / 90;
  const bend = l(3, 0.05, 40);
  const shrink = l(3, 0, 16);
  const bs = lerp(1, 0.62, shrink);
  const by = lerp(520, 360, shrink);
  const layers = Math.floor(l(3, 0.2, 60) * 4);
  const gone = 1 - l(3, 0, 8);
  const FX = [200, 540, 880];
  const hunch = 0.25 + 0.75 * bend;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540 + (212 - 540) * bs} y={by + (272 - 520) * bs} p={p(0, 0.05)} size={28} solid o={gone} />
      <Tag i={1} x={540 + (422 - 540) * bs} y={by + (272 - 520) * bs} p={p(0, 0.12)} size={28} solid color={XL} o={gone} />
      <Tag i={2} x={330} y={880} p={p(1, 0.2)} solid size={36} o={1 - l(2, 0, 8)} />
      <Tag i={3} x={720} y={880} p={p(2, 0.15)} solid color={RED} size={34} o={gone} />
      <Tag i={4} x={300} y={770} p={p(3, 0.1)} size={34} />
    </>}>
      <defs>
        <mask id="c1spot">
          <rect x={0} y={0} width={1080} height={1350} fill="#fff" />
          <circle cx={sx} cy={sy} r={190} fill="#000" />
        </mask>
      </defs>
      {/* Cửa sổ trình duyệt; sang câu 3 thu nhỏ và đẩy lên. */}
      <G x={540} y={by} s={p(0, 0) * bs}>
        <g transform="translate(-540 -520)">
          <G x={540} y={520}>
            <Browser w={900} h={560}>
              <Box cx={-210} cy={50} w={360} h={330} rx={20} fill={SURF} stroke={HOV} strokeWidth={4} />
              <Box cx={180} cy={50} w={360} h={330} rx={20} fill={SURF} stroke={HOV} strokeWidth={4} />
              <Box cx={0} cy={225} w={800} h={50} rx={25} fill={HOV} />
              <circle cx={365} cy={225} r={16} fill={GOLD} />
            </Browser>
          </G>
          {/* Từng bảng nhấc lên khỏi tệp, bay theo quỹ đạo vào ô chat, khung chat đầy dần. */}
          {[0, 1, 2, 3].map((k) => {
            const t = l(0, 0.14 + k * 0.17, 18);
            const x0 = FX[k % 3];
            const ty = 440 + k * 85;
            return (
              <g key={k}>
                <line x1={x0} y1={1000} x2={330} y2={ty} stroke={GOLDL} strokeWidth={5} strokeDasharray="6 14" strokeLinecap="round" opacity={Math.sin(t * Math.PI) * 0.8} />
                <G x={lerp(x0, 330, t)} y={lerp(1000, ty, t) - 60 * Math.sin(t * Math.PI)} s={c01(t * 4) * lerp(0.9, 1, t)} r={(1 - t) * 14}>
                  <Box cx={0} cy={0} w={270} h={62} rx={12} fill={TXT} stroke={k === 2 ? GOLD : HOV} strokeWidth={4} />
                  <Lines x={-110} y={-12} w={220} n={2} gap={20} t={8} />
                </G>
              </g>
            );
          })}
          {/* Khung trả lời bên phải: bảng dán dở có một ô trống. */}
          <G x={720} y={600} s={c01(pasted * 2)}>
            <Box cx={0} cy={0} w={320} h={240} rx={14} fill={EL} stroke={HOV} strokeWidth={4} />
            {Array.from({ length: 12 }, (_, i) => {
              const cx = -110 + (i % 3) * 110;
              const cy = -80 + Math.floor(i / 3) * 54;
              return i === 5 ? (
                <rect key={i} x={cx - 44} y={cy - 20} width={88} height={40} rx={8} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
              ) : (
                <Box key={i} cx={cx} cy={cy} w={88} h={40} rx={8} fill={GOLD} opacity={0.85} />
              );
            })}
          </G>
          {/* Ô lạ chớp đỏ lấp vào ô trống, con dấu cảnh báo đóng lên ô. */}
          <G x={830} y={574} s={hole}>
            <Box cx={0} cy={0} w={88} h={40} rx={8} fill={RED} opacity={Math.floor(f / 5) % 2 === 0 ? 0.95 : 0.6} />
          </G>
          <G x={830} y={574} s={lerp(1.8, 1, p(2, 0.3)) * c01(p(2, 0.3) * 3)}>
            <circle r={40} fill="none" stroke={RED} strokeWidth={7} />
            <Cross r={14} />
          </G>
        </g>
      </G>
      {/* Ba tệp Excel lớn: mở ra từng tệp, nhấc từng bảng. */}
      {FX.map((x, k) => {
        const op = l(0, 0.02 + k * 0.17, 10);
        return (
          <G key={k} x={x} y={1010 + 4 * sw(f, 18, k)} s={p(0, 0.0 + k * 0.05)} o={gone}>
            <G o={1 - op}><Excel /></G>
            <G s={op} o={op}>
              <Box cx={0} cy={0} w={230} h={170} rx={14} fill={TXT} />
              <Box cx={0} cy={-68} w={230} h={34} rx={14} fill={XL} />
              <Table cols={3} rows={3} w={200} h={100} lit={0} base={SEC} />
              <Box cx={-66 + (k % 3) * 0} cy={-10 + 0} w={60} h={28} rx={6} fill={GOLD} opacity={1 - l(0, 0.14 + k * 0.17, 8)} />
            </G>
          </G>
        );
      })}
      {/* AI chỉ nhìn qua vòng sáng. */}
      <G x={900} y={880 + 6 * sw(f, 22)} s={p(1, 0) * 0.9 * gone}><AI size={110} dim /></G>
      <path d={`M845 870 L${sx + 160} ${sy + 70}`} stroke={GOLDL} strokeWidth={6} strokeDasharray="6 16" strokeLinecap="round" opacity={spot} />
      {/* Bóng tối phủ lên, chừa vòng sáng. */}
      <rect x={0} y={0} width={1080} height={1350} fill={INK} opacity={0.86 * spot} mask="url(#c1spot)" />
      <circle cx={sx} cy={sy} r={190} fill="none" stroke={GOLDL} strokeWidth={6} opacity={spot} />
      {/* Cuối chuỗi: người ngồi trước bàn, lưng cong dần, ngón dò từng dòng; đồng hồ quay, chồng bảng cao thêm. */}
      <G x={540} y={1050} s={p(3, 0)}>
        <g transform="translate(-540 -1100)">
          {/* Bàn: mặt bàn, hai chân, tờ bảng nằm trên mặt bàn có ô đang được dò. */}
          <Box cx={570} cy={1090} w={560} h={30} rx={10} fill={GOLD} />
          <Box cx={360} cy={1160} w={22} h={130} fill={GOLD} />
          <Box cx={780} cy={1160} w={22} h={130} fill={GOLD} />
          <path d="M440 1075 L720 1075 L750 1048 L470 1048 Z" fill={TXT} />
          {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={478 + k * 54} y={1054} width={44} height={16} rx={4} fill={k === Math.floor((f / 14) % 5) ? GOLD : SEC} />)}
          {/* Người ngồi nghiêng, lưng cong cúi xuống tờ bảng. */}
          <Box cx={250} cy={1135} w={140} h={18} rx={8} fill={HOV} />
          <Box cx={250} cy={1190} w={16} h={110} fill={HOV} />
          <path d={`M300 1115 L400 1115 L420 1190`} fill="none" stroke={SEC} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M240 1110 Q${lerp(215, 195, hunch)} ${lerp(1020, 1000, hunch)} ${lerp(280, 345, hunch)} ${lerp(905, 960, hunch)}`} fill="none" stroke={SEC} strokeWidth={74} strokeLinecap="round" />
          <circle cx={lerp(295, 395, hunch)} cy={lerp(850, 925, hunch)} r={42} fill={SEC} />
          <path d={`M${lerp(280, 345, hunch)} ${lerp(930, 985, hunch)} L440 1040`} fill="none" stroke={SEC} strokeWidth={26} strokeLinecap="round" />
          <G x={470 + 90 * sw(f, 14)} y={1010 + 6 * sw(f, 7)} s={0.7}><Mag /></G>
        </g>
      </G>
      <G x={880} y={745} s={p(3, 0.1)}>
        <Clock r={60} hour={tick * 12} minute={tick * 60 * 4} />
      </G>
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={905} y={1155 - k * 40} o={k < layers ? 1 : 0} s={0.6}>
          <Box cx={0} cy={0} w={290} h={52} rx={8} fill={k % 2 ? TXT : GOLDL} stroke={INK} strokeWidth={3} />
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Cách thứ hai: trình duyệt thu nhỏ rồi tắt, máy để bàn hiện đầy khung với trợ lý trong máy; ứng dụng Project và Codex, thư mục ba tệp trượt lên bàn. */
export const Cach2TrenMay: React.FC = () => {
  const { f, p, l } = useT();
  const away = l(0, 0.05, 28);
  const mon = p(0, 0.35);
  const app = p(1, 0);
  const slide = l(1, 0.3, 30);
  const ring = 0.5 + 0.5 * sw(f, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.45)} solid size={40} />
      <Tag i={1} x={560} y={330} p={p(1, 0.05)} size={32} />
      <Tag i={2} x={400} y={715} p={p(1, 0.2)} solid size={32} />
      <Tag i={3} x={680} y={715} p={p(1, 0.3)} solid color={XL} size={32} />
      <Tag i={4} x={900} y={1050} p={p(1, 0.5)} solid size={36} />
    </>}>
      {/* Trình duyệt thu nhỏ lùi vào góc rồi tắt. */}
      <G x={lerp(540, 930, away)} y={lerp(640, 330, away)} s={lerp(0.9, 0.22, away)} o={1 - c01((away - 0.7) / 0.3)}>
        <Browser w={900} h={560} />
      </G>
      {/* Máy tính để bàn: màn hình sáng, trợ lý ngồi sẵn trong máy, cạnh bàn phím. */}
      <G x={540} y={640} s={mon}>
        <Box cx={0} cy={0} w={680} h={420} rx={26} fill={INK} stroke={GOLD} strokeWidth={8} />
        <Box cx={0} cy={0} w={640} h={380} rx={16} fill={SURF} />
        <Box cx={0} cy={235} w={90} h={60} fill={HOV} />
        <Box cx={0} cy={272} w={260} h={20} rx={10} fill={HOV} />
      </G>
      <G x={540} y={905} s={mon}>
        <Box cx={0} cy={0} w={560} h={42} rx={14} fill={GOLD} />
        {[0, 1, 2, 3, 4, 5].map((k) => <Box key={k} cx={-220 + k * 88} cy={0} w={62} h={16} rx={5} fill={GOLDL} opacity={0.6} />)}
      </G>
      <G x={lerp(540, 285, app)} y={lerp(640 + 8 * sw(f, 18), 490, app)} s={lerp(1.35, 0.55, app)}><AI size={130} /></G>
      <G x={900} y={925 + 5 * sw(f, 16)} s={mon * 0.5}><AI size={110} /></G>
      <G x={900} y={925} s={mon * 0.5}>
        <circle r={78 + 6 * ring} fill="none" stroke={GOLDL} strokeWidth={4} opacity={0.5} />
      </G>
      {/* Thẻ trả phí bên góc màn hình. */}
      <G x={780} y={490} s={p(1, 0.1) * 0.8} r={-6}>
        <Box cx={0} cy={0} w={130} h={84} rx={12} fill={GOLD} />
        <rect x={-55} y={-8} width={110} height={12} fill={INK} opacity={0.5} />
        <Box cx={-38} cy={-24} w={30} h={22} rx={4} fill={GOLDL} />
        <rect x={-55} y={22} width={50} height={9} rx={4} fill={INK} opacity={0.6} />
      </G>
      {/* Ứng dụng hiện hai biểu tượng Project và Codex sáng cạnh nhau. */}
      <G x={400} y={600} s={app}>
        <Box cx={0} cy={0} w={140} h={140} rx={34} fill={INK} stroke={GOLDL} strokeWidth={6 + 3 * ring} />
        <rect x={-40} y={-40} width={36} height={36} rx={7} fill={GOLD} /><rect x={4} y={-40} width={36} height={36} rx={7} fill={GOLDL} /><rect x={-40} y={4} width={36} height={36} rx={7} fill={GOLDL} /><rect x={4} y={4} width={36} height={36} rx={7} fill={GOLD} />
      </G>
      <G x={680} y={600} s={p(1, 0.1)}>
        <Box cx={0} cy={0} w={140} h={140} rx={34} fill={INK} stroke={XL} strokeWidth={6 + 3 * (1 - ring)} />
        <path d="M-18 -34 L-48 0 L-18 34 M18 -34 L48 0 L18 34" fill="none" stroke={XL} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 -40 L-6 40" stroke={GOLDL} strokeWidth={9} strokeLinecap="round" />
      </G>
      {/* Bạn chỉ vào thư mục, ba tệp Excel trượt lên bàn, vòng sáng ôm cả ba. */}
      <G x={170} y={1140} s={0.8 * p(1, 0.2)}><Person /></G>
      <Arrow x1={260} y1={1120} x2={500} y2={1120} p={l(1, 0.3, 24)} />
      <G x={650} y={lerp(1260, 1130, slide)} s={1.15} o={c01(slide * 4)}><Folder open={slide} /></G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={590 + k * 60} y={lerp(1260, 1060 + 4 * sw(f, 14, k), slide)} s={0.5 * slide}><Excel /></G>
      ))}
      <ellipse cx={650} cy={1100} rx={165 + 8 * ring} ry={110 + 5 * ring} fill="none" stroke={GOLDL} strokeWidth={6} strokeDasharray="14 12" opacity={slide} transform={`rotate(${f * 0.6} 650 1100)`} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Gõ một câu: thanh lệnh gõ chữ rồi gửi đi; ba tệp bung thành ba tờ, số chảy vào bộ máy gom thành bảng, mỗi số có ghim chỉ về nguồn. */
export const GoMotCau: React.FC = () => {
  const { f, p, l } = useT();
  const type = l(0, 0.1, 50);
  const send = l(0, 0.82, 14);
  const open = l(1, 0, 16);
  const gear = f * 4;
  const cursorOn = Math.floor(f / 15) % 2 === 0;
  const SX = [220, 540, 860];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={240} p={p(0, 0.05)} solid size={42} />
      <Tag i={1} x={230} y={860} p={p(1, 0.55)} solid size={34} />
      <Tag i={2} x={540} y={860} p={p(1, 0.65)} solid size={34} />
      <Tag i={3} x={850} y={860} p={p(1, 0.75)} solid size={34} />
    </>}>
      {/* Thanh nhập lệnh: dòng chạy ra dưới dạng thanh xám, dấu gửi bay đi. */}
      <G x={540} y={p(0, 0) * 340 + 0 * 1} s={1}>
        <Box cx={0} cy={0} w={860} h={110} rx={55} fill={EL} stroke={GOLD} strokeWidth={6} />
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const w = [110, 150, 80, 130, 100, 100][k];
          const x = -380 + [0, 130, 300, 400, 550, 670][k];
          return <rect key={k} x={x} y={-9} width={w * c01(type * 6 - k)} height={18} rx={9} fill={SEC} />;
        })}
        <rect x={-380 + 770 * type} y={-30} width={5} height={60} rx={2} fill={GOLDL} opacity={cursorOn ? 1 : 0.5} />
      </G>
      <G x={lerp(925, 540, send)} y={lerp(340, 700, send) - 60 * Math.sin(send * Math.PI)} s={0.9 * c01(type * 5) * (1 - 0.7 * send)} o={1 - l(1, 0, 10)} r={send * 30}>
        <circle r={36} fill={GOLD} />
        <path d="M-14 -16 L20 0 L-14 16 L-8 0 Z" fill={INK} />
      </G>
      {/* Câu 0: ba tệp, thư mục và người chờ sẵn. */}
      {SX.map((x, k) => (
        <G key={k} x={x} y={520 + 5 * sw(f, 16, k)} s={p(0, 0.25 + k * 0.1) * 0.95} o={1 - open}><Excel /></G>
      ))}
      <G x={540} y={960} s={p(0, 0.4) * 1.5} o={1 - open}><Folder /></G>
      {/* Ba tệp bung thành ba tờ. */}
      {SX.map((x, k) => (
        <G key={k} x={x} y={520} s={p(1, 0.05 + k * 0.06)}>
          <Box cx={0} cy={0} w={200 * open + 150 * (1 - open)} h={190} rx={14} fill={TXT} />
          <Box cx={0} cy={-68} w={200 * open + 150 * (1 - open)} h={54} rx={14} fill={XL} />
          <Table cols={3} rows={3} w={160} h={90} lit={3 + k * 2} fill={GOLD} base={SEC} />
        </G>
      ))}
      {/* Số chảy xuống bộ máy gom. */}
      {SX.map((x, k) =>
        [0, 1, 2].map((j) => {
          const t = ((f / 40 + k * 0.31 + j * 0.33) % 1);
          return <circle key={`${k}${j}`} cx={lerp(x, 540, t)} cy={lerp(630, 700, t)} r={9} fill={GOLDL} opacity={open * Math.sin(t * Math.PI)} />;
        })
      )}
      <G x={540} y={750} s={open}>
        <Box cx={0} cy={0} w={380} h={130} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
        <G x={-110} y={0} r={gear}>{[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-5} y={-44} width={10} height={88} rx={5} fill={GOLD} transform={`rotate(${k * 30})`} />)}<circle r={26} fill={GOLDL} /></G>
        <G x={110} y={0} r={-gear}>{[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-5} y={-36} width={10} height={72} rx={5} fill={GOLDL} transform={`rotate(${k * 30})`} />)}<circle r={20} fill={GOLD} /></G>
        <rect x={-50} y={-10} width={100} height={20} rx={10} fill={XL} opacity={0.5 + 0.5 * sw(f, 6)} />
      </G>
      {/* Bảng chung; mỗi số mọc một ghim bật lên chỉ về nguồn. */}
      <G x={540} y={1040} s={p(1, 0.35)}>
        <Box cx={0} cy={0} w={640} h={200} rx={20} fill={EL} stroke={GOLD} strokeWidth={5} />
        <Table cols={4} rows={3} w={600} h={160} lit={12} />
      </G>
      <Arrow x1={378} y1={820} x2={378} y2={925} p={l(1, 0.4, 20)} />
      <Arrow x1={702} y1={820} x2={702} y2={925} p={l(1, 0.45, 20)} />
      {SX.map((x, k) => {
        const pin = p(1, 0.55 + k * 0.1);
        return (
          <g key={k}>
            <G x={x} y={915 - 4 * sw(f, 9, k)} s={pin}>
              <circle r={22} fill={TXT} />
              <path d="M-12 14 L0 44 L12 14 Z" fill={TXT} />
              <circle r={8} fill={INK} />
            </G>
          </g>
        );
      })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Chiếc cân: nghiêng theo tilt, hai đĩa mang hai quả cầu AI giống hệt nhau. */
const Scales: React.FC<{ tilt: number; dim?: boolean }> = ({ tilt }) => (
  <g>
    <path d="M-14 -190 H14 L26 200 H-26 Z" fill={GOLD} />
    <Box cx={0} cy={210} w={300} h={30} rx={12} fill={GOLD} />
    <G y={-190} r={tilt}>
      <Box cx={0} cy={0} w={600} h={14} rx={7} fill={GOLDL} />
      {[-1, 1].map((s) => (
        <G key={s} x={s * 290} y={0} r={-tilt}>
          <line x1={0} y1={0} x2={-100} y2={170} stroke={GOLDL} strokeWidth={5} />
          <line x1={0} y1={0} x2={100} y2={170} stroke={GOLDL} strokeWidth={5} />
          <path d="M-120 170 H120 Q100 220 0 220 Q-100 220 -120 170 Z" fill={HOV} stroke={GOLD} strokeWidth={5} />
          <G y={95}><AI size={110} /></G>
        </G>
      ))}
    </G>
    <circle cx={0} cy={-190} r={18} fill={GOLD} />
  </g>
);

/** Cảnh 9 — Khác nhau duy nhất: hai ảnh chụp và dấu hỏi; cân thăng bằng với hai AI giống nhau; mớm từng mẩu so với tự mở tủ; nút gạt Hỏi sang Giao việc. */
export const KhacNhauDuyNhat: React.FC = () => {
  const { f, p, l } = useT();
  const snaps = p(0, 0) * (1 - l(1, 0, 12));
  const fall = l(0, 0.3, 14);
  const s1 = l(1, 0, 12);
  const mid = p(2, 0);
  const back = l(3, 0, 14);
  const scaleS = lerp(lerp(1.1, 0.62, l(2, 0, 14)), 1.1, back);
  const scaleY = lerp(lerp(730, 440, l(2, 0, 14)), 640, back);
  const tilt = 0;
  const knob = l(3, 0.25, 20);
  const feed = (f % 24) / 24;
  const drawer = l(2, 0.3, 18);
  const old = 1 - back;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.05)} solid size={42} />
      <Tag i={1} x={221} y={scaleY + 85 * scaleS} p={p(1, 0.35)} solid size={32} o={1 - l(2, 0, 8) + back} />
      <Tag i={2} x={859} y={scaleY + 85 * scaleS} p={p(1, 0.5)} solid color={XL} size={32} o={1 - l(2, 0, 8) + back} />
      <Tag i={3} x={270} y={1160} p={p(2, 0.1)} solid size={34} o={old} />
      <Tag i={4} x={790} y={810} p={p(2, 0.5)} solid color={XL} size={34} o={old} />
      <Tag i={5} x={885} y={1040} p={p(3, 0.4)} solid size={38} />
    </>}>
      {/* Hai ảnh chụp hai cách làm cạnh nhau. */}
      <G x={290} y={640} s={0.48 * snaps} o={snaps}>
        <Browser w={900} h={560}>
          {[0, 1, 2].map((k) => <Box key={k} cx={-200} cy={-10 + k * 90} w={340} h={64} rx={12} fill={TXT} />)}
          <Box cx={190} cy={50} w={340} h={300} rx={16} fill={SURF} />
        </Browser>
      </G>
      <G x={790} y={640} s={0.48 * snaps} o={snaps}>
        <Box cx={0} cy={0} w={800} h={520} rx={26} fill={INK} stroke={GOLD} strokeWidth={10} />
        <Box cx={0} cy={0} w={740} h={460} rx={16} fill={SURF} />
        <G x={-150} y={0} s={2.1}><Folder /></G>
        <G x={230} y={0} s={2.2}><AI size={120} /></G>
        <Arrow x1={-30} y1={0} x2={110} y2={0} />
      </G>
      {[0, 1, 2].map((k) => <G key={k} x={150 + k * 130} y={1020} s={0.6 * snaps}><Excel /></G>)}
      <G x={790} y={1020} s={1.3 * snaps}><Folder /></G>
      <G x={540} y={lerp(300, 640, fall)} s={0.75 * snaps * c01(fall * 3)}><Question /></G>
      <G x={lerp(300, 780, 0.5 + 0.5 * sw(f, 22))} y={780 - 20 * Math.abs(sw(f, 22))} s={1.1 * snaps} r={-15}><Mag /></G>
      {/* Chiếc cân: hai quả cầu giống hệt nhau, thăng bằng. */}
      <G x={540} y={scaleY} s={scaleS * s1}><Scales tilt={tilt} /></G>
      {/* Bên trái mớm từng mẩu, bên phải AI tự mở tủ dữ liệu. */}
      <G y={-50} o={mid * old}>
        <G x={270} y={1070 + 4 * sw(f, 12)}><AI size={140} /></G>
        <G x={270} y={760} s={0.55} r={180}><Hand /></G>
        {[0, 1, 2].map((k) => {
          const t = (feed + k / 3) % 1;
          return <rect key={k} x={238} y={lerp(800, 990, t)} width={64} height={40} rx={6} fill={TXT} opacity={Math.sin(t * Math.PI)} />;
        })}
        <G x={690} y={1070 + 4 * sw(f, 14)}><AI size={130} /></G>
        <G x={910} y={1060}>
          <Box cx={0} cy={0} w={150} h={290} rx={14} fill={EL} stroke={GOLD} strokeWidth={6} />
          <Box cx={0} cy={-80 - 0} w={120} h={70} rx={8} fill={HOV} />
          <Box cx={-18 * drawer} cy={20} w={120} h={70} rx={8} fill={GOLD} />
          <Box cx={-18 * drawer} cy={100} w={120} h={70} rx={8} fill={HOV} />
          <Box cx={-60 * drawer - 8} cy={20} w={40} h={50} rx={6} fill={XL} opacity={drawer} />
        </G>
        <Arrow x1={760} y1={1070} x2={810} y2={1070} p={drawer} />
      </G>
      {/* Nút gạt chuyển từ Hỏi sang Giao việc; quả cầu AI giữ nguyên màu. */}
      <G x={540} y={1040} s={back}>
        <Box cx={0} cy={0} w={380} h={96} rx={48} fill={EL} stroke={GOLD} strokeWidth={6} />
        <G x={-130} y={0}><Question s={0.38} color={knob < 0.5 ? GOLDL : HOV} /></G>
        <G x={130} y={0}><Folder s={0.4} /></G>
        <circle cx={lerp(-96, 96, knob)} cy={0} r={34} fill={GOLDL} stroke={INK} strokeWidth={5} />
      </G>
      <G x={lerp(-96, 96, knob) + 536} y={1118} s={0.4 * back}><Hand /></G>
      <Floor y={1240} />
    </Stage>
  );
};
