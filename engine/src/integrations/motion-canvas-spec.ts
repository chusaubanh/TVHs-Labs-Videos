import { z } from "zod";
const Point = z.tuple([z.number().finite(), z.number().finite()]);
export const MotionCanvasSpec = z.object({
  width: z.number().int().min(64).max(4096), height: z.number().int().min(64).max(4096),
  fps: z.number().int().min(1).max(60), frames: z.number().int().min(2).max(18000), seed: z.number().int().default(0),
  background: z.string().regex(/^#[0-9a-f]{6}$/i).default("#0C0C0C"),
  shapes: z.array(z.object({ kind: z.enum(["circle", "rect"]), size: z.number().positive().max(4096), fill: z.string().regex(/^#[0-9a-f]{6}$/i), from: Point, to: Point })).min(1).max(200),
});
export type MotionCanvasSpecType = z.infer<typeof MotionCanvasSpec>;