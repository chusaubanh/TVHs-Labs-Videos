import React from "react";
import { Arrow, Box, Bubble, Cross, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT, Clock } from "../shared/art";
import { Calendar, Cursor, Loop, Win } from "../bai-1/art";
import { Bot, Loupe, MoneyBag } from "../bai-2/art";
import { Contract, SegNum, Star, Thumb, Tick } from "../bai-4/art";
import { SopBook } from "../bai-5/art";
import { clamp01, Clipboard, LoadBar, Page, Scales, Scissors, Shredder, ShutBook, Strip, UTurn } from "./art";

const STRIP_Y = [470, 590, 710];

/** Cảnh 1 — Hook: kéo cắt hợp đồng thành dải đưa vào chat, kết quả sai; hợp đồng bốn mươi trang, quy chế; copy từng đoạn. */
export const CatVun: React.FC = () => {
  const { f, p, l } = useT();
  const count = l(1, 0.05, 30);
  const copy = l(2, 0, 10);
  const cut = (f % 12) / 12;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid color={RED} size={52} />
      <Tag i={1} x={290} y={860} p={p(1, 0.1)} solid size={36} />
      <Tag i={2} x={330} y={965} p={p(1, 0.45)} size={32} />
      <Tag i={3} x={790} y={330} p={p(2, 0.05)} solid size={34} />
      <Tag i={4} x={790} y={890} p={p(2, 0.5)} size={32} />
    </>}>
      {/* Hợp đồng dày bên trái, kéo cắt liên tục. */}
      <G x={290} y={640} s={p(0, 0) * 1.05}><Contract n={14} /></G>
      <G x={300} y={400} s={count * 0.6}><SegNum value={Math.round(count * 40)} n={2} /></G>
      <G x={440} y={lerp(520, 760, (Math.floor(f / 12) % 3) / 2)} s={p(0, 0.05) * 0.7} r={180}><Scissors open={Math.abs(Math.sin(cut * Math.PI))} /></G>
      <rect x={160} y={lerp(500, 740, (Math.floor(f / 12) % 3) / 2)} width={260} height={6} fill={GOLDL} opacity={0.8 * copy} />
      {copy > 0 && <G x={400} y={lerp(520, 760, (Math.floor(f / 12) % 3) / 2) + 20} s={0.6}><Cursor /></G>}
      {/* Khung chat nhận từng dải. */}
      <G x={790} y={590}>
        <Win w={420} h={460} stroke={GOLD}>
          <></>
        </Win>
      </G>
      {STRIP_Y.map((y, k) => {
        const t = l(0, 0.05 + k * 0.12, 10);
        const glow = copy > 0 && Math.floor(f / 15) % 3 === k ? 1 : 0;
        return (
          <G key={k} x={lerp(420, 790, t)} y={lerp(640, y, t)} s={t * 0.95} r={(1 - t) * 20}>
            <Strip w={340} lit={glow} />
          </G>
        );
      })}
      {/* Tờ kết quả cuối cùng bị gạch. */}
      <G x={790} y={1060} s={p(0, 0.55)}>
        <Box cx={0} cy={0} w={260} h={160} rx={14} fill={EL} stroke={RED} strokeWidth={5} />
        <Lines x={-100} y={-40} w={200} n={3} gap={34} color={SEC} t={10} />
        <Cross r={70} />
      </G>
      {/* Bộ quy chế nội bộ dài dằng dặc. */}
      <G x={170} y={1080} s={p(1, 0.4) * 0.48}><SopBook /></G>
      <G x={330} y={1080} s={p(1, 0.45) * 0.48}><SopBook /></G>
      <G x={lerp(150, 380, 0.5 + 0.5 * Math.sin(f / 14))} y={1060} s={p(1, 0.5) * 0.45} r={-20}><Loupe /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Trả lời trôi chảy nhưng sai lệch; tại sao: cả cuốn sách mà chỉ cho xem một trang. */
export const MotTrang: React.FC = () => {
  const { f, p, l } = useT();
  const flow = l(0, 0.05, 40);
  const wrong = l(1, 0.1, 14);
  const book = l(2, 0.25, 14);
  const old = 1 - book;
  const ask = p(2, 0);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={770} p={p(0, 0.2)} solid color={XL} size={38} o={old} />
      <Tag i={1} x={540} y={850} p={p(1, 0.1)} solid color={RED} size={40} o={old} />
      <Tag i={2} x={lerp(540, 200, book)} y={lerp(520, 260, book)} p={ask} solid size={lerp(70, 40, book)} />
      <Tag i={3} x={420} y={990} p={p(2, 0.4)} size={36} />
      <Tag i={4} x={560} y={300} p={p(2, 0.55)} solid size={38} />
    </>}>
      <G o={old}>
        {/* Khung chat: dải giấy vừa dán và câu trả lời chảy ra trơn tru. */}
        <G x={540} y={480}>
          <Win w={820} h={440} stroke={GOLD} />
        </G>
        <G x={540} y={360}><Strip w={420} /></G>
        <G x={480} y={540}>
          <Box cx={0} cy={0} w={560} h={190} rx={26} fill={HOV} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-250} y={-66 + k * 38} width={480 * clamp01(flow * 4 - k) * (k === 3 ? 0.6 : 1)} height={14} rx={7} fill={TXT} opacity={0.75} />)}
        </G>
        <G x={830} y={560} s={l(0, 0.6, 10)}><Tick r={46} /></G>
        {/* Đặt kết quả chồng lên toàn bộ văn bản: các dòng lệch nhau. */}
        {[0, 1, 2, 3, 4].map((k) => (
          <G key={k} x={180 + k * 180} y={1040} s={wrong * 0.9}>
            <Page w={150} h={200} />
            <G x={wrong * (k % 2 ? 14 : -12)} y={wrong * 10}>
              <Box cx={0} cy={0} w={150} h={200} rx={10} fill={RED} opacity={0.18 + 0.12 * (k % 2)} stroke={RED} strokeWidth={4} />
            </G>
          </G>
        ))}
      </G>
      <G x={540} y={600} s={old * ask * 1.4}><Question /></G>
      {/* Cuốn sách dày chỉ lộ một trang qua khe; robot nhìn qua khe và bình luận. */}
      <G x={480} y={640} s={book}><ShutBook w={620} h={460} slit={l(2, 0.45, 10)} /></G>
      <path d="M840 900 L540 640 L540 760 Z" fill={GOLDL} opacity={0.12 * book} />
      <G x={860} y={1000} s={book * 0.7}><Bot arm={0.8 + 0.3 * Math.sin(f / 5)} /></G>
      <G x={830} y={800} s={book * 0.65}><Bubble w={220} h={90} fill={HOV} ink={TXT} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Khảo sát: bạn Pháp Chế phải nhắc đi nhắc lại; không phải AI dở; tài liệu bị cắt vụn từ đầu. */
export const PhapChe: React.FC = () => {
  const { f, p, l } = useT();
  const loops = l(0, 0.35, 60);
  const shred = p(2, 0);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={280} y={290} p={p(0, 0.02)} solid size={40} />
      <Tag i={1} x={790} y={760} p={p(0, 0.15)} solid size={38} />
      <Tag i={2} x={770} y={340} p={p(0, 0.35)} size={32} />
      <Tag i={3} x={260} y={880} p={p(1, 0.05)} solid color={XL} size={34} />
      <Tag i={4} x={760} y={880} p={p(2, 0.15)} solid color={RED} size={34} />
    </>}>
      <G x={280} y={570} s={p(0, 0)}><Clipboard ticks={Math.floor(l(0, 0.05, 30) * 4)} /></G>
      {/* Bạn pháp chế có huy hiệu cán cân, nói qua bong bóng. */}
      <G x={790} y={640} s={p(0, 0.1) * 1.2}><Person fill={SEC} /></G>
      <G x={790} y={664} s={p(0, 0.15) * 0.3}><Scales color={GOLD} /></G>
      <G x={770} y={460} s={p(0, 0.3)}>
        <Box cx={0} cy={0} w={400} h={120} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M20 58 L60 110 L80 58 Z" fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={16} y={54} width={70} height={8} fill={EL} />
        {[0, 1, 2].map((k) => (
          <G key={k} x={-110 + k * 90} y={20} s={0.42}><Loop r={60} p={clamp01(loops * 3 - k)} /></G>
        ))}
        <G x={160} y={20} s={l(0, 0.85, 8) * 0.6}><Tick r={40} /></G>
      </G>
      <line x1={110} x2={970} y1={820} y2={820} stroke={HOV} strokeWidth={4} strokeDasharray="16 14" opacity={p(1, 0)} />
      {/* Không phải AI dở: robot có ba ngôi sao. */}
      <G x={260} y={1040} s={p(1, 0) * 0.62}><Bot arm={0.4} /></G>
      {[0, 1, 2].map((k) => <G key={k} x={200 + k * 60} y={960} s={p(1, 0.1 + k * 0.1) * 0.5}><Star r={30} /></G>)}
      {/* Thủ phạm: tài liệu bị cắt vụn; đèn soi rọi xuống. */}
      <path d="M760 830 L620 1150 L900 1150 Z" fill={GOLDL} opacity={0.14 * shred} />
      <G x={760} y={1060} s={shred * 0.9}><Shredder t={f} /></G>
      <G x={900} y={980} s={l(2, 0.4, 10) * 0.55} r={-30}><Loupe /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — Các phần tham chiếu chéo; điều bảy phạt chậm thanh toán, mức phạt ở phụ lục B. */
export const ThamChieu: React.FC = () => {
  const { f, p, l } = useT();
  const net = l(0, 0.3, 30);
  const zoom = l(1, 0, 14);
  const red = l(1, 0.4, 20);
  const xs = [170, 355, 540, 725, 910];
  const links: [number, number][] = [[0, 2], [1, 4], [2, 3], [0, 3], [3, 4], [1, 2]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.05)} solid size={44} />
      <Tag i={1} x={300} y={710} p={p(1, 0.05)} solid size={36} />
      <Tag i={2} x={300} y={990} p={p(1, 0.2)} size={30} />
      <Tag i={3} x={790} y={710} p={p(1, 0.45)} solid color={RED} size={36} />
      <Tag i={4} x={790} y={990} p={p(1, 0.7)} solid size={30} />
    </>}>
      {/* Hàng trang hợp đồng và mạng chỉ tham chiếu chéo. */}
      {xs.map((x, k) => (
        <G key={k} x={x} y={470} s={p(0, k * 0.04) * 0.82}>
          <Page w={150} h={200} head={k === 4 ? RED : INK} />
        </G>
      ))}
      {links.map(([a, b], k) => {
        const up = k % 2 === 0;
        const mx = (xs[a] + xs[b]) / 2;
        const dy = up ? -180 - Math.abs(b - a) * 30 : 180 + Math.abs(b - a) * 30;
        return <path key={k} d={`M${xs[a]} ${up ? 390 : 550} Q${mx} ${470 + dy} ${xs[b]} ${up ? 390 : 550}`} fill="none" stroke={GOLD} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01(net * 6 - k)} opacity={0.8 * (1 - red * 0.6)} />;
      })}
      {/* Điều bảy phóng to, chỉ đỏ chạy về phụ lục B. */}
      <G x={300} y={900} s={zoom * 1.25}>
        <Page w={230} h={240} />
        <G x={-50} y={30} s={0.5}><Clock r={70} hour={(f / 20) % 12} minute={(f * 4) % 60} /></G>
        <G x={50} y={30} s={0.55}><MoneyBag /></G>
      </G>
      <path d="M445 900 C540 780 560 1020 645 900" fill="none" stroke={RED} strokeWidth={9} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - red} />
      <path d={`M${xs[1]} 570 Q${xs[1]} 680 300 740`} fill="none" stroke={GOLD} strokeWidth={4} strokeDasharray="10 8" opacity={zoom} />
      <path d={`M${xs[4]} 570 Q${xs[4]} 680 790 740`} fill="none" stroke={RED} strokeWidth={4} strokeDasharray="10 8" opacity={zoom} />
      <G x={790} y={900} s={zoom * 1.25}><Page w={230} h={240} head={RED} mark={l(1, 0.65, 10)} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 5 — Quy chế: duyệt chi trước ba ngày, trừ điều mười hai; không đọc thì hiểu ngược. */
export const HieuNguoc: React.FC = () => {
  const { f, p, l } = useT();
  const star = l(0, 0.6, 12);
  const turn = l(1, 0.2, 20);
  const tilt = lerp(-10, 60, l(1, 0.35, 16));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.05)} solid size={42} />
      <Tag i={1} x={800} y={655} p={p(0, 0.6)} solid color={RED} size={32} />
      <Tag i={2} x={800} y={990} p={p(1, 0.05)} size={32} />
      <Tag i={3} x={330} y={990} p={p(1, 0.3)} solid color={RED} size={40} />
    </>}>
      {/* Thẻ quy chế: túi tiền, lịch ba ngày, dấu duyệt, dấu sao. */}
      <G x={540} y={450} s={p(0, 0)}>
        <Box cx={0} cy={0} w={860} h={240} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G x={-320} y={0} s={0.9}><MoneyBag /></G>
        <Arrow x1={-250} y1={0} x2={-170} y2={0} p={1} w={7} />
        <G x={-60} y={10} s={0.7}><Calendar /></G>
        <G x={-60} y={-90} s={0.45}><SegNum value={3} n={1} /></G>
        <Arrow x1={40} y1={0} x2={110} y2={0} p={1} w={7} />
        <G x={190} y={0}><circle r={60} fill="none" stroke={XL} strokeWidth={9} /><path d="M-26 0 L-6 22 L30 -24" fill="none" stroke={XL} strokeWidth={11} strokeLinecap="round" /></G>
        <G x={340} y={-70} s={star}>
          <path d="M0 -30 L8 -8 L30 -8 L12 6 L18 28 L0 14 L-18 28 L-12 6 L-30 -8 L-8 -8 Z" fill={RED} />
        </G>
      </G>
      <path d="M880 400 Q960 520 820 760" fill="none" stroke={RED} strokeWidth={6} strokeDasharray="12 10" opacity={star} />
      {/* Trang điều mười hai vẫn gập kín. */}
      <G x={800} y={830} s={star * 1.05}><Page w={220} h={260} fold={1} /></G>
      <G x={800} y={830} s={l(1, 0, 8) * 0.9}><Cross r={130} color={RED} /></G>
      {/* Hiểu ngược: biển quay đầu và kim đo lật sang phía sai. */}
      <G x={330} y={820} s={turn * 1.1}><UTurn p={turn} /></G>
      <G x={330} y={1120} s={l(1, 0.3, 10)}>
        <path d="M-150 0 A150 150 0 0 1 150 0" fill="none" stroke={HOV} strokeWidth={22} />
        <path d="M-150 0 A150 150 0 0 1 0 -150" fill="none" stroke={XL} strokeWidth={22} opacity={0.6} />
        <path d="M0 -150 A150 150 0 0 1 150 0" fill="none" stroke={RED} strokeWidth={22} opacity={0.6} />
        <line x1={0} y1={0} x2={0} y2={-130} stroke={TXT} strokeWidth={10} strokeLinecap="round" transform={`rotate(${tilt + Math.sin(f / 3) * 2})`} />
        <circle r={16} fill={TXT} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 6 — Chỉ dán điều bảy: AI tự tin; phụ lục B phủ định; nguyên tắc vàng: nạp trọn bộ trước rồi mới trích xuất. */
export const TuTinSai: React.FC = () => {
  const { f, p, l } = useT();
  const deny = l(1, 0.3, 12);
  const gold = l(2, 0, 14);
  const old = 1 - gold;
  const feed = l(2, 0.25, 30);
  const out = l(2, 0.75, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={430} y={380} p={p(0, 0.02)} solid size={34} o={old} />
      <Tag i={1} x={860} y={420} p={p(0, 0.4)} solid color={XL} size={34} o={old} />
      <Tag i={2} x={860} y={850} p={p(1, 0.1)} solid color={RED} size={34} o={old} />
      <Tag i={3} x={430} y={880} p={p(1, 0.5)} solid color={RED} size={32} o={old} />
      <Tag i={4} x={540} y={250} p={p(2, 0.1)} solid size={46} />
      <Tag i={5} x={830} y={980} p={p(2, 0.75)} solid color={XL} size={32} />
    </>}>
      <G o={old}>
        <G x={430} y={600}><Win w={600} h={460} stroke={GOLD} /></G>
        <G x={430} y={460}><Strip w={420} lit={1} /></G>
        <G x={400} y={640}>
          <Box cx={0} cy={0} w={480} h={200} rx={26} fill={HOV} />
          <Lines x={-210} y={-60} w={420} n={4} gap={38} color={TXT} t={13} />
          <G x={0} y={0} s={deny * 1.1}><Cross r={110} /></G>
        </G>
        <G x={600} y={720} s={l(0, 0.4, 8) * 0.7 * (1 - deny)}><Tick r={40} /></G>
        <G x={860} y={620} s={p(0, 0.1) * 0.75}>
          <Bot arm={1.5} />
          <G x={158} y={96}><Thumb s={1.1} /></G>
        </G>
        {/* Phụ lục B nằm ngoài khung chat, bắn tia đỏ phủ định. */}
        <rect x={680} y={880} width={330} height={300} rx={20} fill="#000" opacity={0.5 * p(1, 0)} />
        <G x={860} y={1030} s={p(1, 0)}><Page w={200} h={240} head={RED} mark={1} /></G>
        <path d={`M780 960 L${lerp(780, 520, deny)} ${lerp(960, 690, deny)}`} stroke={RED} strokeWidth={10} strokeLinecap="round" opacity={deny} />
      </G>
      {/* Nguyên tắc vàng: nạp trọn bộ (cả phụ lục) vào robot, rồi mới trích ra kết quả. */}
      <G o={gold}>
        <rect x={100} y={400} width={340} height={600} rx={24} fill="none" stroke={GOLD} strokeWidth={5} strokeDasharray="18 12" opacity={gold} />
        {[[270, 560], [270, 840]].map(([x, y], k) => (
          <G key={k} x={x} y={y} s={0.85}>
            {k === 0 ? <Contract n={12} w={260} h={230} /> : <Page w={240} h={230} head={RED} mark={1} />}
          </G>
        ))}
        <Arrow x1={450} y1={700} x2={470} y2={700} p={feed} w={10} />
        <G x={590} y={680} s={1.05}><Bot arm={0.5} /></G>
        <G x={540} y={1090}><LoadBar w={760} v={feed} /></G>
        <Arrow x1={700} y1={760} x2={760} y2={760} p={out} w={9} />
        {[[110, 250], [970, 250]].map(([x, y], k) => <G key={k} x={x} y={y} s={gold * 0.6}><Star r={36} /></G>)}
        <G x={860} y={770} s={out * 1.2}>
          <Box cx={0} cy={0} w={170} h={210} rx={14} fill={PAPER} stroke={XL} strokeWidth={6} />
          <Lines x={-60} y={-60} w={120} n={5} gap={28} color={SEC} t={9} />
        </G>
        {[[150, 1000], [930, 560], [920, 1060]].map(([x, y], k) => <G key={k} x={x} y={y} s={out * (0.4 + 0.3 * Math.sin(f / 5 + k))}><Spark r={24} fill={GOLDL} /></G>)}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
