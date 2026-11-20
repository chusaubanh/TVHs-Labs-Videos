import { BakedImageSequence } from "../kit/BakedImageSequence";
import { RoundedProp, BakedRigidBodies } from "../kit/frame-3d";
import { useGsapTimeline } from "@remotion/gsap";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { AbsoluteFill, Audio, Freeze, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { bakedPose, type BakedPhysics } from "../kit/baked-physics";
import { DotLottieFrame } from "../kit/DotLottieFrame";
import { useAnimeTimeline } from "../kit/use-anime-timeline";
import bakedStack from "./baked-stack.json";
import { MINIMAL_LOTTIE } from "./minimal-lottie";

const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: "#0C0C0C", alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>
);

const GsapFixture: React.FC = () => {
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    timeline.fromTo(selector(".box"), { x: -200, rotation: -45 }, { x: 200, rotation: 90, duration: 2, ease: "power3.out", stagger: 0.2 });
  });
  return (
    <Stage>
      <div ref={scope}>
        <div className="box" style={{ width: 120, height: 120, background: "#C5A059", marginBottom: 20 }} />
        <div className="box" style={{ width: 120, height: 120, background: "#E0C286" }} />
      </div>
    </Stage>
  );
};

const AnimeFixture: React.FC = () => {
  const scope = useAnimeTimeline<SVGSVGElement>(({ timeline, scope: root, drawable }) => {
    const path = root.querySelector("path");
    if (!path) throw new Error("Thiếu nét.");
    timeline.add(drawable(path), { draw: ["0 0", "0 1"], duration: 2000 }, 0);
  });
  return (
    <Stage>
      <svg ref={scope} width={500} height={500} viewBox="0 0 500 500" fill="none">
        <path d="M50 450 C 150 50, 350 50, 450 450" stroke="#C5A059" strokeWidth={12} />
      </svg>
    </Stage>
  );
};

const SpringFixture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12 } });
  return (
    <Stage>
      <div style={{ width: 300, height: 300, background: "#C5A059", transform: `scale(${scale})`, opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }) }} />
    </Stage>
  );
};

const LottieFixture: React.FC = () => (
  <Stage>
    <DotLottieFrame data={MINIMAL_LOTTIE} width={500} height={500} />
  </Stage>
);

const BloomFixture: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ThreeCanvas width={720} height={720} camera={{ position: [0, 0, 6] }}>
      <color attach="background" args={["#0C0C0C"]} />
      <ambientLight intensity={1} />
      <mesh rotation={[frame * 0.02, frame * 0.03, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.2} luminanceThreshold={0.4} />
      </EffectComposer>
    </ThreeCanvas>
  );
};

const RapierFixture: React.FC = () => {
  const frame = useCurrentFrame();
  const baked = bakedStack as BakedPhysics;
  return (
    <ThreeCanvas width={720} height={720} camera={{ position: [0, 3, 12] }}>
      <color attach="background" args={["#0C0C0C"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      {baked.bodies.map((name, body) => {
        const pose = bakedPose(baked, frame, body);
        return (
          <mesh key={name} position={pose.position} quaternion={pose.quaternion}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#C5A059" />
          </mesh>
        );
      })}
    </ThreeCanvas>
  );
};

/** Phát clip quay màn hình qua Freeze: tua nhanh rồi dừng khung cuối, như cảnh huong-dan-tro-ly. */
const OffthreadClipFixture: React.FC = () => {
  const frame = useCurrentFrame();
  const local = Math.min(59, Math.floor(frame * 1.5));
  return (
    <Stage>
      <Freeze frame={local}>
        <OffthreadVideo src={staticFile("fixtures/testsrc-60fps.mp4")} trimBefore={15} muted style={{ width: 640, height: 360 }} />
      </Freeze>
    </Stage>
  );
};

/** Cố ý sai: chạy theo đồng hồ thật. Bài thử tất định phải bắt được cảnh này. */
const BadClockFixture: React.FC = () => (
  <Stage>
    <div style={{ width: 200, height: 200, background: "#C5A059", transform: `rotate(${Date.now() % 360}deg)` }} />
  </Stage>
);

const DreiFixture: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return <ThreeCanvas width={width} height={height} camera={{ position: [0, 1, 6] }}>
    <color attach="background" args={["#0C0C0C"]} /><ambientLight intensity={0.8} /><directionalLight position={[3, 5, 5]} intensity={2} />
    <RoundedProp rotation={[frame * 0.01, frame * 0.025, 0]} />
  </ThreeCanvas>;
};
const ReactRapierFixture: React.FC = () => {
  const { width, height } = useVideoConfig();
  return <ThreeCanvas width={width} height={height} camera={{ position: [0, 3, 12] }}>
    <color attach="background" args={["#0C0C0C"]} /><ambientLight intensity={0.8} /><directionalLight position={[3, 5, 5]} intensity={2} />
    <BakedRigidBodies baked={bakedStack as BakedPhysics} />
  </ThreeCanvas>;
};
/** Chỉ kiểm đường xuất hình + tiếng, không dùng nội dung đào tạo. */
const AvFixture: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return <Stage><Audio src={staticFile("fixtures/smoke-tone.wav")} />
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={`M${width * 0.15} ${height * 0.65} L${width * 0.85} ${height * 0.35}`} stroke="#474D53" strokeWidth={6} />
      <circle cx={width * (0.15 + 0.7 * frame / 89)} cy={height * (0.65 - 0.3 * frame / 89)} r={width * 0.09} fill="#C5A059" />
    </svg>
  </Stage>;
};
const MotionCanvasSequenceFixture: React.FC = () => <Stage><BakedImageSequence base="fixtures/motion-canvas" frames={90} fps={30} /></Stage>;

export const FIXTURES = [
  { id: "fixture-motion-canvas", component: MotionCanvasSequenceFixture },
  { id: "fixture-av", component: AvFixture },
  { id: "fixture-drei", component: DreiFixture },
  { id: "fixture-react-rapier", component: ReactRapierFixture },
  { id: "fixture-bad-clock", component: BadClockFixture },
  { id: "fixture-gsap", component: GsapFixture },
  { id: "fixture-anime", component: AnimeFixture },
  { id: "fixture-spring", component: SpringFixture },
  { id: "fixture-dotlottie", component: LottieFixture },
  { id: "fixture-bloom", component: BloomFixture },
  { id: "fixture-rapier", component: RapierFixture },
  { id: "fixture-offthread-clip", component: OffthreadClipFixture },
];
