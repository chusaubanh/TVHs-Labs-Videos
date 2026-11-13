import React from "react";
import { AI, Arrow, Box, Chat, Desk, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Bot, Head } from "../bai-2/art";
import { Article, BotBadge, Brief, Ceiling, Chip, clamp01, Column, DataStack, Measure, Polygraph, RedPen, SegNum, Siren, Star, Thumb, Tick, TopDesk } from "./art";

/** Cái dấu xanh cầm tay: cán vàng, đế xanh. */
const Stamper: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = XL }) => (
  <G s={s}>
    <rect x={-14} y={-90} width={28} height={60} rx={10} fill={GOLD} />
    <circle cx={0} cy={-96} r={20} fill={GOLD} />
    <rect x={-46} y={-34} width={92} height={34} rx={8} fill={color} />
  </G>
);

/** Cảnh 1 — Hook: robot đóng dấu đạt lên chồng bài đang vọt qua vạch trần; lùi ra là lịch tháng Tám và người kể. */
export const VuotTran: React.FC = () => {
  const { f, p, l } = useT();
  const grow = l(0, 0.08, 42);
  const hot = l(0, 0.55, 6);
  const back = l(1, 0, 16);
  const h = lerp(320, 765, grow);
  const flash = hot * (0.5 + 0.5 * Math.sin(f * 0.8));
  const hitT = (f % 16) / 16;
  const press = 1 - Math.abs(hitT * 2 - 1);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid color={RED} size={56} />
      <Tag i={1} x={860} y={575} p={p(0, 0.6)} solid color={RED} size={40} />
      <Tag i={2} x={220} y={545} p={p(1, 0.15)} solid size={38} />
    </>}>
      <Ceiling x1={140} x2={940} y={630} p={l(0, 0, 10)} hot={flash} />
      {/* Chồng bài vọt cao; phần trên vạch trần đổ đỏ khi báo động. */}
      <G x={560} y={1180} s={p(0, 0)}>
        <Column w={260} h={h} ceil={550} hot={hot > 0.5 && flash > 0.3 ? 1 : 0} />
        {[0, 1, 2].map((k) => (
          <G key={k} x={lerp(-60, 60, k / 2)} y={-140 - k * 170} s={clamp01(grow * 3 - k) * 0.55}>
            <Tick r={40} />
          </G>
        ))}
      </G>
      <G x={560} y={1180 - h - 40} s={hot * 0.9}>
        <Arrow x1={0} y1={60} x2={0} y2={-30} p={1} color={RED} w={12} />
      </G>
      {/* Robot đóng dấu liên tục, đầy tự tin. */}
      <G x={290} y={930} s={p(0, 0.05) * 0.85}>
        <G x={157} y={lerp(215, 250, press * (1 - back * 0.7))}>
          <Stamper s={0.9} />
        </G>
        <Bot arm={1.4} />
      </G>
      <G x={850} y={420} s={p(0, 0.5) * 0.8}>
        <Siren t={f} on={hot} />
      </G>
      {/* Lùi ra: lịch tháng Tám và người kể nhìn chồng bài. */}
      <G x={220} y={420} s={p(1, 0.05) * 0.85}>
        <Calendar flip={l(1, 0.2, 14)} />
      </G>
      <G x={910} y={1060} s={back * 0.5}>
        <g transform="scale(-1 1)">
          <Head fill={SURF} frown={0.6} blush={0.4} />
        </g>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Giao AI viết mấy bài đào tạo; quy tắc trần một nghìn hai trăm từ; AI báo đã hoàn thành. */
export const GiaoVietBai: React.FC = () => {
  const { f, p, l } = useT();
  const rule = l(1, 0.1, 20);
  const done = l(2, 0.05, 14);
  const rows = Math.round(lerp(0, 6, l(2, 0, 40)));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.3)} solid size={44} o={1 - rule} />
      <Tag i={2} x={540} y={300} p={p(1, 0.45)} solid color={RED} size={38} />
      <Tag i={1} x={540} y={730} p={p(1, 0.1)} size={40} o={1 - done} />
      <Tag i={3} x={540} y={730} p={p(2, 0.1)} solid color={XL} size={44} />
    </>}>
      {/* Bàn làm việc: màn hình là khung chat với AI. */}
      <G x={540} y={1070} s={0.7 * p(0, 0)}>
        <Desk nod={Math.sin(f / 6) * 3}>
          <G x={0} y={-150}>
            <Chat w={480} h={300} lit>
              <G x={40} y={-10} s={0.5}><AI size={120} /></G>
              <Lines x={-50} y={60} w={180} n={2} gap={22} color={GOLDL} t={8} />
              <G x={170} y={60} s={done * 0.9}><Tick r={44} /></G>
            </Chat>
          </G>
        </Desk>
      </G>
      {/* Mấy tờ bài đào tạo bay ra từ màn hình, xếp hàng chờ viết. */}
      {[0, 1, 2].map((k) => {
        const t = l(0, 0.04 + k * 0.12, 16);
        return (
          <G key={k} x={lerp(540, 300 + k * 240, t)} y={lerp(960, 520, t)} s={lerp(0.2, 1, t)} o={clamp01(t * 3)} r={(k - 1) * 3 * (1 - done)}>
            <Article w={180} h={240} rows={rows} />
            <G x={60} y={90} s={l(2, 0.3 + k * 0.12, 8) * 0.5}><Tick r={40} /></G>
          </G>
        );
      })}
      {/* Vạch trần đỏ ngang trên đầu các tờ, cây thước dựng bên phải đánh dấu đúng mức trần. */}
      <Ceiling x1={150} x2={900} y={370} p={rule} />
      <G x={965} y={520} s={clamp01(rule * 2)}>
        <g transform="rotate(90)">
          <rect x={-150} y={-24} width={300} height={48} rx={8} fill={GOLD} />
          {Array.from({ length: 14 }, (_, k) => <rect key={k} x={-140 + k * 20} y={-24} width={4} height={k % 5 === 0 ? 22 : 12} fill={INK} />)}
        </g>
        <circle cx={0} cy={-150} r={14} fill={RED} />
      </G>
      {/* Robot giơ ngón cái tự tin cạnh màn hình. */}
      <G x={845} y={860} s={done * 0.62}>
        <Bot arm={1.6} />
        <G x={158} y={96}><Thumb s={1.1} /></G>
      </G>
      <G x={180} y={880} s={done * (0.7 + 0.15 * Math.sin(f / 4))}>
        <Spark r={30} fill={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Đọc lướt thấy mượt; đem đếm từ thực tế: hai cột bài, màn số dừng ở 1555 và 1668, cả hai nhô quá vạch trần 1200. */
export const DemTuThucTe: React.FC = () => {
  const { f, p, l } = useT();
  const feed = l(1, 0, 24);
  const cols = l(2, 0, 10);
  const c1 = l(2, 0.05, 40);
  const c2 = l(2, 0.5, 40);
  const hot = l(3, 0, 6);
  const flash = hot * (0.5 + 0.5 * Math.sin(f * 0.8));
  const skim = (f % 45) / 45;
  const PX = 0.4; // điểm ảnh cho mỗi từ: trần 1200 từ cao 480
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={240} p={p(0, 0.25)} solid size={44} o={1 - feed} />
      <Tag i={1} x={540} y={240} p={p(1, 0.05)} solid size={44} o={1 - cols} />
      <Tag i={2} x={360} y={268} p={p(2, 0.15)} size={36} />
      <Tag i={3} x={720} y={268} p={p(2, 0.6)} size={36} />
      <Tag i={4} x={540} y={212} p={p(3, 0.1)} solid color={RED} size={38} />
    </>}>
      {/* Phần 1: tờ bài mượt mà, mắt lướt nhanh; phần 2: tờ bài trượt vào máy đếm. */}
      <G o={1 - cols}>
        <G x={540} y={lerp(600, 790, feed)} s={lerp(1, 0.55, feed) * p(0, 0)}>
          <Article w={420} h={540} rows={20} />
          <G x={170} y={-200} s={0.8 + 0.2 * Math.sin(f / 4)}><Star r={34} fill={GOLDL} /></G>
          <G y={lerp(-150, 230, skim)} o={1 - feed}>
            {[0, 1].map((k) => <ellipse key={k} cx={-34 + k * 68} cy={0} rx={26} ry={16} fill={TXT} stroke={INK} strokeWidth={4} />)}
            {[0, 1].map((k) => <circle key={k} cx={-34 + k * 68 + (skim * 2 - 1) * 10} cy={2} r={8} fill={INK} />)}
          </G>
        </G>
        <G x={540} y={1060} s={p(1, 0) * 1}>
          <Box cx={0} cy={0} w={560} h={220} rx={26} fill={EL} stroke={GOLD} strokeWidth={6} />
          <rect x={-130} y={-120} width={260} height={26} rx={10} fill={INK} stroke={HOV} strokeWidth={4} />
          <G x={-60} y={10} s={0.85}><SegNum value={1555 * l(1, 0.3, 50)} /></G>
          {[0, 1].map((k) => <circle key={k} cx={180} cy={-40 + k * 70} r={22} fill={k ? HOV : GOLD} />)}
        </G>
      </G>
      {/* Phần 3: hai cột bài so với vạch trần; màn số trên đầu mỗi cột. */}
      <G o={cols}>
        <Ceiling x1={250} x2={930} y={600} p={cols} hot={flash} />
        <G x={160} y={600} s={0.42}><SegNum value={1200} color={RED} /></G>
        {[[360, 1555, c1], [720, 1668, c2]].map(([x, n, t], k) => {
          const hh = n * PX * t;
          return (
            <g key={k}>
              <G x={x} y={1080}>
                <Column w={220} h={Math.max(4, hh)} ceil={480} hot={flash > 0.3 ? 1 : 0} />
              </G>
              <G x={x} y={1080 - hh - 56} s={0.55}><SegNum value={n * t} color={t > 0.99 && hot > 0 ? RED : GOLDL} /></G>
            </g>
          );
        })}
        <G x={540} y={540} s={hot * 0.55}><Siren t={f} on={hot} /></G>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — AI không nói dối (máy đo kim phẳng); không viết dở; tự chấm bài mình luôn đạt; y hệt trên Codex và Claude Desktop. */
export const TuChamBai: React.FC = () => {
  const { f, p, l } = useT();
  const art = l(1, 0, 14);
  const poly = l(0, 0, 14) * (1 - art);
  const self = l(2, 0, 16);
  const apps = l(3, 0, 16);
  const push = l(1, 0.5, 12);
  const mark = (k: number) => l(2, 0.3 + k * 0.18, 8);
  const loop = l(2, 0.15, 24);
  const arc = (top: boolean) => (top ? "M380 560 Q460 430 530 500" : "M530 860 Q450 960 370 860");
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={740} y={400} p={p(0, 0.3)} solid color={XL} size={40} o={1 - art} />
      <Tag i={1} x={270} y={440} p={p(0, 0.6)} size={38} o={1 - self} />
      <Tag i={2} x={270} y={985} p={p(1, 0.25)} size={36} o={1 - self} />
      <Tag i={3} x={540} y={212} p={p(2, 0.05)} solid color={RED} size={42} />
      <Tag i={4} x={270} y={985} p={p(2, 0.4)} solid size={38} o={1 - apps} />
      <Tag i={5} x={305} y={292} p={p(3, 0.2)} size={38} />
      <Tag i={6} x={775} y={292} p={p(3, 0.45)} size={38} />
    </>}>
      <G o={1 - clamp01(apps * 2)}>
        {/* Robot đặt tay lên ngực; về sau cầm bút đỏ tự chấm. */}
        <G x={270} y={650} s={p(0, 0) * 1.05}>
          <Bot arm={lerp(0.2, 1.3, self)} />
          <G x={0} y={135} s={(1 - self) * (0.8 + 0.1 * Math.sin(f / 5))}><path d="M0 26 C-34 2 -28 -28 -10 -28 Q-2 -28 0 -18 Q2 -28 10 -28 C28 -28 34 2 0 26 Z" fill={RED} /></G>
          <G x={150} y={60} s={self} r={-30}><RedPen /></G>
        </G>
        {/* Máy đo nói dối: kim vẽ đường xanh phẳng lặng. */}
        <G x={740} y={640} s={poly * 1.1} o={poly}>
          <Polygraph t={f} />
          <path d="M-190 60 Q-280 140 -380 150" fill="none" stroke={HOV} strokeWidth={6} />
        </G>
        {/* Tờ bài viết tốt: ba ngôi sao còn nguyên, bút đỏ định gạch bị đẩy ra. */}
        <G x={660} y={700} s={art}>
          <Article w={280} h={380} rows={10} />
          {[0, 1, 2].map((k) => <G key={k} x={-70 + k * 70} y={-235} s={l(1, 0.1 + k * 0.1, 8)}><Star r={30} /></G>)}
          <G x={104} y={150} s={0.9}><BotBadge /></G>
          <G x={lerp(170, 120, push)} y={lerp(-40, -300, push)} r={lerp(-40, 60, push)} s={(1 - self) * clamp01(art * 2)} o={1 - push * 0.6}><RedPen s={0.8} /></G>
          {[0, 1, 2].map((k) => <G key={k} x={-60 + k * 40} y={-80 + k * 90} s={mark(k) * 0.55}><Tick r={40} /></G>)}
        </G>
        {/* Cột bài thò quá vạch trần cũng nhận dấu tích. */}
        <G x={890} y={900} s={self}>
          <Column w={110} h={330} ceil={240} />
          <line x1={-80} x2={80} y1={-240} y2={-240} stroke={RED} strokeWidth={6} strokeDasharray="14 8" />
          <G y={-130} s={mark(2) * 0.45}><Tick r={40} /></G>
        </G>
        {/* Vòng khép kín giữa robot và bài của nó. */}
        {[true, false].map((top) => (
          <path key={String(top)} d={arc(top)} fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loop} />
        ))}
        <G x={530} y={500} s={loop > 0.9 ? 1 : 0} r={30}><path d="M-18 -18 L18 0 L-18 18 Z" fill={GOLD} /></G>
        <G x={370} y={860} s={loop > 0.9 ? 1 : 0} r={-150}><path d="M-18 -18 L18 0 L-18 18 Z" fill={GOLD} /></G>
      </G>
      {/* Hai cửa sổ app: cùng một cảnh robot tự đóng dấu bài mình. */}
      {[0, 1].map((k) => (
        <G key={k} x={k ? 775 : 305} y={700} s={p(3, 0.05 + k * 0.2)} o={apps}>
          <Win w={410} h={740} stroke={GOLD}>
            <G x={150} y={-342} s={0.36}>{k ? <MarkClaude r={60} /> : <MarkGpt r={60} />}</G>
            <G x={-95} y={-90} s={0.85}><Bot arm={1.3} /></G>
            <G x={95} y={-50} s={0.66}><Article w={220} h={330} rows={8} /></G>
            <G x={130} y={40} s={l(3, 0.3 + k * 0.2, 8) * 0.6}><Tick r={44} /></G>
            <G x={0} y={220}>
              <Box cx={0} cy={0} w={330} h={90} rx={24} fill={HOV} />
              <rect x={-130} y={-12} width={170} height={24} rx={12} fill={TXT} opacity={0.6} />
              <G x={110} s={l(3, 0.4 + k * 0.2, 8) * 0.7}><Tick r={34} /></G>
            </G>
          </Win>
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 5 — Cái bàn diện tích cố định; đề bài, dữ liệu, trao đổi đặt lên; việc ngắn thì bàn rộng. */
export const CaiBan: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(0, 0.25, 20);
  const land = (k: number) => p(1, 0.08 + k * 0.28, 12);
  const small = l(2, 0, 18);
  const pos = (x: number, y: number, k: number) => ({ x: lerp(x, 260 + k * 70, small), y: lerp(y, 560 + (k % 2) * 30, small) });
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={995} p={p(0, 0.4)} solid size={40} />
      <Tag i={1} x={300} y={800} p={p(1, 0.15)} size={34} o={1 - small} />
      <Tag i={2} x={520} y={862} p={p(1, 0.45)} size={34} o={1 - small} />
      <Tag i={3} x={780} y={800} p={p(1, 0.75)} size={34} o={1 - small} />
      <Tag i={4} x={640} y={735} p={p(2, 0.2)} solid color={XL} size={42} />
    </>}>
      {/* Robot đứng sau mặt bàn. */}
      <G x={540} y={380} s={0.75 * p(0, 0)}>
        <Bot arm={lerp(0.3, 0.9, small)} />
      </G>
      <G x={540} y={680} s={p(0, 0, 16)}>
        <TopDesk w={780} h={480} glow={small} />
      </G>
      {/* Hai thước đo khoá cạnh bàn. */}
      <G x={540} y={955}><Measure len={780} p={m} /></G>
      <G x={975} y={680}><Measure len={480} p={m} vertical /></G>
      {/* Đồ đặt lên bàn: đề bài, dữ liệu, bong bóng trao đổi. */}
      <G {...pos(300, 640, 0)} s={land(0) * lerp(0.9, 0.5, small)} r={lerp(-4, 0, small)}><Brief /></G>
      <G {...pos(530, 660, 1)} s={land(1) * lerp(0.8, 0.45, small)}><DataStack /></G>
      {[0, 1, 2].map((k) => (
        <G key={k} {...pos(780, 570 + k * 90, 2 + k * 0.4)} s={p(1, 0.75 + k * 0.06, 12) * lerp(0.85, 0.45, small)}>
          <Chip me={k % 2 === 0} />
        </G>
      ))}
      {/* Việc ngắn: phần bàn còn trống sáng lên, lấp lánh. */}
      {[[560, 600], [820, 860], [460, 840], [840, 520]].map(([x, y], k) => (
        <G key={k} x={x} y={y} s={small * (0.5 + 0.3 * Math.sin(f / 5 + k))}><Spark r={24} fill={XL} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};
