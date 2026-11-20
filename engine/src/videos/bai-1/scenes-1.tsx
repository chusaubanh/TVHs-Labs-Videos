import React from "react";
import { AI, Box, Browser, Chat, Clock, Cross, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, Mag, PAPER, Person, Question, RED, SEC, Spark, Stage, Sun, SURF, Table, Tag, TXT, lerp, useT } from "../shared/art";
import { Calendar, clamp01, Cursor, Intern, Loop, NumChip, Sheet, Strip } from "./art";

/** Cảnh 1 — Hook: tờ prompt dài đổ xuống, số bịa bị đóng dấu đỏ, rồi co lại còn một dòng. */
export const PromptDaiBiaSo: React.FC = () => {
  const { f, p, l } = useT();
  const grow = l(0, 0, 18);
  const shrink = l(1, 0.12, 22);
  const h = lerp(lerp(140, 760, grow), 110, shrink);
  const flip = l(2, 0, 14);
  const fall = l(1, 0.35, 22);
  const chips = [
    [190, 1010],
    [360, 1080],
    [540, 1020],
    [720, 1085],
    [890, 1010],
  ];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={560} p={p(0, 0.08)} solid color={RED} size={68} o={1 - shrink} />
      <Tag i={1} x={540} y={380} p={p(1, 0.55)} solid size={46} />
      <Tag i={2} x={540} y={1000} p={p(2, 0.2)} size={44} />
    </>}>
      {/* Tờ prompt: dài ra rồi co về một dải vàng. */}
      <g transform={`translate(540 ${170 + (shrink > 0.98 ? 55 : 0)})`}>
        {shrink < 0.98 ? <Sheet w={800} h={h} fill={shrink > 0.5 ? GOLD : PAPER} ink={shrink > 0.5 ? INK : SEC} /> : <G r={flip * 180}><Strip glow={1} /></G>}
      </g>
      {/* Số bật ra ở đáy tờ giấy, bị đóng dấu sai, rồi rơi xuống sàn. */}
      {chips.map(([x, y], k) => {
        const s = p(0, 0.2 + k * 0.1);
        const fy = lerp(y, 1170 + (k % 2) * 20, fall);
        return (
          <G key={k} x={x} y={fy} s={s} r={fall * (k % 2 ? 24 : -20)} o={Math.min(1, s)}>
            <NumChip fill={fall > 0.5 ? HOV : TXT} />
            <G s={p(0, 0.35 + k * 0.1, 9)}>
              <Cross r={30} />
            </G>
          </G>
        );
      })}
      {/* Dấu hỏi và hai mũi tên ngược chiều: nghe ngược đời. */}
      <G x={540} y={700} s={p(2, 0.05)}>
        <G r={f * 1.5}>
          <Loop r={210} p={1} color={GOLD} />
        </G>
        <G r={180 - f * 1.5}>
          <Loop r={210} p={1} color={HOV} />
        </G>
        <Question s={2} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Leo thang: dặn kỹ hơn, trang dài ra, vẫn sai, mất buổi chiều, lặp lại. */
export const DanKyVanBia: React.FC = () => {
  const { f, p, l } = useT();
  const paper = l(1, 0, 40);
  const sweep = l(2, 0.2, 30);
  const dusk = l(3, 0, 30);
  const cal = l(3, 0.55, 14);
  const nod = l(0, 0, 4) > 0 && l(1, 0, 4) < 1 ? Math.sin(f / 2.5) * 6 : 0;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={430} y={205} p={p(0, 0.1)} size={38} />
      <Tag i={1} x={830} y={330} p={p(1, 0.15)} size={32} />
      <Tag i={2} x={830} y={520} p={p(1, 0.55)} size={32} />
      <Tag i={3} x={430} y={560} p={p(2, 0.6)} solid color={RED} size={36} />
      <Tag i={4} x={430} y={880} p={p(3, 0.25)} size={34} />
      <Tag i={5} x={430} y={1000} p={p(3, 0.7)} size={34} />
    </>}>
      {/* Ánh chiều tà phủ lên phòng khi thời gian trôi. */}
      <rect x={0} y={0} width={1080} height={1350} fill="#7A3E12" opacity={0.22 * dusk} />
      {/* Màn hình chat: ô trả lời sai, rồi bảng số bóng bẩy. */}
      <G x={430} y={420}>
        <Chat w={600} h={360}>
          {sweep < 0.01 ? (
            <g>
              <G x={60} y={-30} s={p(0, 0)}>
                <Box cx={0} cy={0} w={300} h={70} rx={18} fill={RED} />
                <Lines x={-120} y={-8} w={200} n={1} color={INK} t={14} />
              </G>
              <G x={110} y={70} s={p(0, 0.3)}>
                <Box cx={0} cy={0} w={240} h={60} rx={18} fill={GOLD} />
                <Lines x={-90} y={-7} w={160} n={1} color={INK} t={14} />
              </G>
            </g>
          ) : null}
          <G x={95} y={40} s={p(2, 0)} o={Math.min(1, p(2, 0))}>
            <Table cols={4} rows={3} w={360} h={190} lit={12} fill={TXT} />
            {[1, 6, 10].map((c, k) => (
              <G key={c} x={-135 + (c % 4) * 90} y={-63 + Math.floor(c / 4) * 63} s={p(2, 0.5 + k * 0.1, 9)}>
                <rect x={-41} y={-27} width={82} height={54} rx={8} fill={RED} />
                <Cross r={14} color={INK} />
              </G>
            ))}
            <G x={-150} y={-120} s={p(2, 0.1)}>
              <Spark r={22} fill={GOLDL} />
            </G>
          </G>
          {sweep > 0 && sweep < 1 && (
            <G x={lerp(-80, 260, sweep)} y={30}>
              <Mag s={0.8} />
            </G>
          )}
        </Chat>
      </G>
      <Box cx={430} cy={630} w={70} h={40} fill={HOV} />
      <Box cx={430} cy={656} w={640} h={22} rx={11} fill={GOLD} />
      <G x={430} y={750 + nod}>
        <Person fill={SEC} s={1.05} />
      </G>
      {/* Trang prompt dài ra mãi, dán thêm bối cảnh và yêu cầu. */}
      <g transform="translate(830 250)">
        <rect x={-110} y={0} width={220} height={lerp(20, 960, paper)} rx={16} fill={PAPER} />
        <Lines x={-84} y={30} w={168} n={Math.max(1, Math.floor((lerp(20, 960, paper) - 40) / 34))} gap={34} color={SEC} t={12} />
        {[0, 1, 2, 3].map((k) => (
          <G key={k} x={k % 2 ? 60 : -60} y={150 + k * 190} r={k % 2 ? 8 : -8} s={p(1, 0.15 + k * 0.18)}>
            <Box cx={0} cy={0} w={120} h={90} rx={10} fill={k % 2 ? GOLD : GOLDL} />
            <Lines x={-44} y={-20} w={88} n={3} gap={18} color={INK} t={8} />
          </G>
        ))}
      </g>
      {/* Đồng hồ trưa sang chiều. */}
      <G x={165} y={880} s={p(3, 0)}>
        <Clock r={68} hour={lerp(12, 17, dusk)} minute={lerp(0, 300, dusk)} />
      </G>
      {/* Lịch lật sang hôm sau, mũi tên vòng tròn: lặp lại. */}
      <G x={430} y={1140} s={p(3, 0.5)}>
        <Calendar flip={cal} />
      </G>
      <G x={690} y={1140} s={p(3, 0.7)}>
        <Loop r={62} p={l(3, 0.7, 20)} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Ẩn dụ: thực tập sinh giỏi nhưng quên sạch mỗi sáng, tự đoán mò. */
export const ThucTapSinhQuenSach: React.FC = () => {
  const { p, l } = useT();
  const walk = l(0, 0.05, 30);
  const sun = l(1, 0, 24);
  const burst = l(1, 0.45, 10);
  const blur = l(2, 0.2, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={560} y={215} p={p(0, 0.5)} solid size={44} />
      <Tag i={1} x={560} y={470} p={p(1, 0.55)} solid color={RED} size={40} />
      <Tag i={2} x={300} y={420} p={p(2, 0.2)} size={30} />
      <Tag i={3} x={800} y={420} p={p(2, 0.6)} size={30} />
      <Tag i={4} x={820} y={1000} p={p(3, 0.5)} size={36} />
    </>}>
      {/* Cửa văn phòng. */}
      <g>
        <rect x={80} y={560} width={170} height={360} rx={10} fill={SURF} stroke={HOV} strokeWidth={6} />
        <rect x={92} y={572} width={146} height={336} fill={EL} transform={`skewY(${-walk * 8})`} />
        <circle cx={220} cy={750} r={9} fill={GOLD} />
      </g>
      {/* Cửa sổ có mặt trời mọc. */}
      <g>
        <rect x={790} y={560} width={210} height={170} rx={12} fill={SURF} stroke={HOV} strokeWidth={6} />
        <clipPath id="b1-window">
          <rect x={796} y={566} width={198} height={158} />
        </clipPath>
        <g clipPath="url(#b1-window)">
          <G x={895} y={lerp(760, 650, sun)}>
            <Sun r={34} />
          </G>
        </g>
        <line x1={895} x2={895} y1={560} y2={730} stroke={HOV} strokeWidth={5} />
      </g>
      {/* Công ty và lời dặn hôm qua, bị dấu hỏi che. */}
      <G x={300} y={300} s={p(2, 0)} o={lerp(1, 0.45, blur)}>
        <rect x={-80} y={-70} width={160} height={150} rx={8} fill={SEC} />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={-58 + (i % 3) * 44} y={-50 + Math.floor(i / 3) * 50} width={28} height={30} rx={4} fill={GOLDL} />
        ))}
        <rect x={-18} y={42} width={36} height={38} fill={INK} />
      </G>
      <G x={300} y={300} s={p(2, 0.25, 9)}>
        <Question s={0.9} color={GOLD} />
      </G>
      <G x={800} y={300} s={p(2, 0.45)} o={lerp(1, 0.45, l(2, 0.6, 18))}>
        <Doc w={150} h={170} n={4} />
      </G>
      <G x={800} y={300} s={p(2, 0.7, 9)}>
        <Question s={0.9} color={GOLD} />
      </G>
      {/* Bàn làm việc và bạn thực tập sinh bước vào. */}
      <Box cx={560} cy={910} w={760} h={26} rx={13} fill={GOLD} />
      <rect x={250} y={923} width={18} height={140} fill={HOV} />
      <rect x={852} y={923} width={18} height={140} fill={HOV} />
      <G x={lerp(170, 560, walk)} y={860} o={Math.min(1, p(0, 0))}>
        <Intern s={1.25} />
      </G>
      {/* Bong bóng ký ức hôm qua vỡ tan. */}
      {burst < 1 && (
        <G x={560} y={630} s={p(0, 0.6) * (1 + burst * 0.4)} o={1 - burst}>
          <circle r={74} fill={EL} stroke={GOLDL} strokeWidth={5} />
          <Doc w={70} h={86} n={3} />
          <circle cx={-40} cy={90} r={12} fill={EL} stroke={GOLDL} strokeWidth={4} />
        </G>
      )}
      {burst > 0 &&
        Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          const d = 70 + burst * 90;
          return <circle key={i} cx={560 + Math.cos(a) * d} cy={630 + Math.sin(a) * d * 0.6} r={8 * (1 - burst * 0.5)} fill={SEC} />;
        })}
      {/* Tờ việc: ô trống bị điền bằng dấu hỏi xiêu vẹo. */}
      <G x={480} y={1110} s={p(3, 0)}>
        <Box cx={0} cy={0} w={420} h={200} rx={16} fill={PAPER} />
        <Lines x={-180} y={-74} w={160} n={3} gap={50} color={SEC} t={12} />
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={20} y={-84 + k * 56} width={170} height={42} rx={8} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
            <G x={105} y={-63 + k * 56} s={p(3, 0.25 + k * 0.2, 9) * 0.32} r={k % 2 ? 14 : -12}>
              <Question color={RED} />
            </G>
          </g>
        ))}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — AI trong khung chat chính là bạn thực tập sinh: chat mới thì quên sạch, số bịa ở chỗ đoán. */
export const AiKhungChat: React.FC = () => {
  const { p, l } = useT();
  const fly = l(0, 0.05, 26);
  const morph = l(0, 0.5, 12);
  const wipe = l(1, 0.25, 22);
  const sun = l(1, 0.15, 24);
  const guess = l(2, 0.25, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={265} p={p(0, 0.6)} solid size={40} />
      <Tag i={1} x={700} y={420} p={p(1, 0.55)} size={36} />
      <Tag i={2} x={540} y={930} p={p(2, 0.6)} solid color={RED} size={38} />
    </>}>
      <G x={540} y={540}>
        <Browser w={880} h={580}>
          {/* Lịch sử chat bên trái bị xoá trắng. */}
          <rect x={-420} y={-176} width={210} height={440} rx={18} fill={SURF} />
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={-400} y={-90 + k * 60} width={170 * clamp01(1 - wipe * 1.6 + k * 0.15)} height={20} rx={10} fill={HOV} />
          ))}
          {/* Nút chat mới. */}
          <G x={-315} y={-140} s={1 - 0.15 * (l(1, 0.05, 4) - l(1, 0.2, 4))}>
            <Box cx={0} cy={0} w={170} h={50} rx={25} fill={GOLD} />
            <path d="M-12 0 H12 M0 -12 V12" stroke={INK} strokeWidth={6} strokeLinecap="round" />
          </G>
          {/* Mặt trời mọc ngay trong khung chat. */}
          <clipPath id="b1-chat">
            <rect x={-200} y={-176} width={610} height={440} />
          </clipPath>
          <g clipPath="url(#b1-chat)">
            <G x={210} y={lerp(330, 150, sun)}>
              <Sun r={50} fill={GOLDL} />
            </G>
          </g>
        </Browser>
      </G>
      {/* Bạn thực tập sinh bay vào, đầu hoá biểu tượng AI, thẻ sao vẫn đeo. */}
      <G x={lerp(540, 640, fly)} y={lerp(1120, 560, fly)} s={lerp(0.9, 1.15, fly)}>
        <g opacity={1 - morph}>
          <Intern s={1} />
        </g>
        <g opacity={morph}>
          <path d="M-62 44 Q-62 -28 0 -28 Q62 -28 62 44 Z" fill={TXT} />
          <Box cx={0} cy={16} w={42} h={32} rx={6} fill={GOLD} />
          <G y={16}>
            <Spark r={11} fill={INK} />
          </G>
          <G y={-82}>
            <AI size={84} />
          </G>
        </g>
      </G>
      {/* Bảng số: ô trống bị AI tự điền, ô đó đỏ. */}
      <G x={540} y={1100} s={p(2, 0)}>
        <Table cols={5} rows={2} w={760} h={170} lit={10} fill={TXT} />
        <rect x={-380 + 2 * 152 + 4} y={-85 + 4} width={144} height={77} rx={8} fill={guess > 0.5 ? RED : INK} stroke={guess > 0.5 ? RED : SEC} strokeWidth={4} strokeDasharray={guess > 0.5 ? undefined : "10 8"} />
        {guess > 0.5 && <Lines x={-48} y={-54} w={90} n={1} color={INK} t={16} />}
      </G>
      {guess > 0 && guess < 1 && (
        <G x={lerp(640, 540, guess)} y={lerp(500, 1050, guess)}>
          <Spark r={22} fill={GOLDL} />
        </G>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 5 — Bản chất: AI luôn trả lời, thiếu dữ kiện thì lấp chỗ trống, prompt dài thì nhiều nhánh hiểu sai. */
export const LapChoTrong: React.FC = () => {
  const { f, p, l } = useT();
  const fill = l(1, 0.3, 20);
  const branch = (k: number) => l(2, 0.1 + k * 0.12, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={600} p={p(0, 0.4)} solid size={40} />
      <Tag i={1} x={760} y={215} p={p(1, 0)} size={36} />
      <Tag i={2} x={760} y={600} p={p(1, 0.65)} solid size={36} />
      <Tag i={3} x={760} y={760} p={p(2, 0.5)} solid color={RED} size={36} />
    </>}>
      {/* AI giơ tay trả lời liên tục, bong bóng bật ra. */}
      <G x={300} y={380} s={p(0, 0)}>
        <AI size={170} />
        <G x={110} y={10} r={-40 + Math.sin(f / 4) * 14}>
          <rect x={-12} y={-120} width={24} height={120} rx={12} fill={GOLD} />
          <circle cy={-124} r={20} fill={GOLD} />
        </G>
      </G>
      {[0, 1, 2, 3, 4].map((k) => {
        const a = -Math.PI * 0.95 + k * 0.42;
        return (
          <G key={k} x={300 + Math.cos(a) * 190} y={380 + Math.sin(a) * 150} s={p(0, 0.1 + k * 0.12) * 0.55}>
            <Box cx={0} cy={0} w={110} h={70} rx={20} fill={k % 2 ? GOLDL : TXT} />
            <Lines x={-36} y={-12} w={72} n={2} gap={22} color={INK} t={9} />
          </G>
        );
      })}
      {/* Ghép hình còn lỗ hổng, AI nhét mảnh giả khác màu. */}
      <G x={760} y={400} s={p(1, 0)}>
        {Array.from({ length: 9 }, (_, i) =>
          i === 4 ? (
            <rect key={i} x={-165 + (i % 3) * 110 + 4} y={-165 + Math.floor(i / 3) * 110 + 4} width={102} height={102} rx={12} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
          ) : (
            <g key={i}>
              <rect x={-165 + (i % 3) * 110 + 4} y={-165 + Math.floor(i / 3) * 110 + 4} width={102} height={102} rx={12} fill={TXT} />
              <circle cx={-165 + (i % 3) * 110 + 55} cy={-165 + Math.floor(i / 3) * 110 + 55} r={16} fill={SEC} />
            </g>
          ),
        )}
        <G x={lerp(260, 0, fill)} y={lerp(-60, 0, fill)} r={lerp(30, 0, fill)} s={p(1, 0.2)}>
          <rect x={-51} y={-51} width={102} height={102} rx={12} fill={RED} />
          <circle r={16} fill={INK} />
        </G>
      </G>
      {/* Tờ prompt dài: mỗi dòng mọc nhánh rẽ dẫn tới chỗ hiểu sai. */}
      <G x={250} y={0} s={p(2, 0)}>
        <rect x={-150} y={760} width={300} height={440} rx={16} fill={PAPER} />
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const y = 810 + k * 66;
          const b = branch(k);
          return (
            <g key={k}>
              <rect x={-120} y={y - 8} width={240} height={16} rx={8} fill={SEC} />
              {b > 0 && <path d={`M120 ${y} C ${200 + b * 60} ${y}, ${260 + b * 60} ${y + (k % 2 ? 40 : -40) * b}, ${120 + b * 380} ${y + (k % 2 ? 40 : -40) * b}`} fill="none" stroke={b > 0.6 ? RED : GOLD} strokeWidth={7} strokeLinecap="round" />}
              {b > 0.9 && (
                <G x={120 + b * 380 + 30} y={y + (k % 2 ? 40 : -40)}>
                  <Cross r={18} />
                </G>
              )}
            </g>
          );
        })}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
