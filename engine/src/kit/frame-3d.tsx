import React, { Suspense, useEffect, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useCurrentFrame, delayRender, continueRender } from "remotion";
import { bakedPose, type BakedPhysics } from "./baked-physics";

/** Đạo cụ Drei không dùng đồng hồ, random hoặc controls. */
export const RoundedProp: React.FC<{ size?: [number, number, number]; color?: string; rotation?: [number, number, number] }> = ({ size = [2, 2, 2], color = "#C5A059", rotation }) => (
  <RoundedBox args={size} radius={0.12} smoothness={4} rotation={rotation}>
    <meshStandardMaterial color={color} roughness={0.35} />
  </RoundedBox>
);

const PhysicsReady: React.FC<{ handle: number }> = ({ handle }) => {
  useEffect(() => { continueRender(handle); }, [handle]);
  return null;
};

/** R3F Rapier quản lý rigid body; quỹ đạo đã nướng, không mô phỏng theo đồng hồ render. */
export const BakedRigidBodies: React.FC<{ baked: BakedPhysics; halfExtents?: [number, number, number]; color?: string }> = ({ baked, halfExtents = [0.5, 0.5, 0.5], color = "#C5A059" }) => {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender("Nạp Rapier WASM"));
  useEffect(() => () => continueRender(handle), [handle]);
  // Mesh lấy pose trực tiếp: vòng đồng bộ transform của Physics không được ghi đè hình theo delta.
  return <>
    <Suspense fallback={null}><Physics paused interpolate={false} colliders={false}>
      {baked.bodies.map((name, index) => {
        const pose = bakedPose(baked, frame, index);
        return <RigidBody key={name} type="fixed" colliders={false} position={pose.position} quaternion={pose.quaternion}>
          <CuboidCollider args={halfExtents} />
        </RigidBody>;
      })}
      <PhysicsReady handle={handle} />
    </Physics></Suspense>
    {baked.bodies.map((name, index) => {
      const pose = bakedPose(baked, frame, index);
      return <mesh key={name} position={pose.position} quaternion={pose.quaternion}>
        <boxGeometry args={halfExtents.map((v) => v * 2) as [number, number, number]} /><meshStandardMaterial color={color} />
      </mesh>;
    })}
  </>;
};