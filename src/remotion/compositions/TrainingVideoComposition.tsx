import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { SceneProvider } from "../../kit/scene-context";
import {
  ASPECTS,
  FPS,
  secToFrames,
  TimelineSchema,
  TrainingScriptSchema,
  type Timeline,
  type TrainingScript,
} from "../../training/training-contract";
import { SCENES } from "../../videos/registry";
import { GlobalFonts } from "../GlobalFonts";

export interface TrainingVideoProps extends Record<string, unknown> {
  script: TrainingScript | null;
  timeline: Timeline | null;
  hideText: boolean;
}

export const calculateTrainingMetadata: CalculateMetadataFunction<TrainingVideoProps> = ({ props }) => {
  if (!props.script || !props.timeline) {
    throw new Error("Thiếu kịch bản. Render bằng props.json do `npm run voice` tạo.");
  }
  const script = TrainingScriptSchema.parse(props.script);
  const timeline = TimelineSchema.parse(props.timeline);
  return {
    ...ASPECTS[script.aspect],
    fps: FPS,
    durationInFrames: secToFrames(timeline.totalSec),
  };
};

export const TrainingVideoComposition: React.FC<TrainingVideoProps> = ({ script, timeline, hideText }) => {
  const { fps } = useVideoConfig();
  if (!script || !timeline) throw new Error("Thiếu kịch bản.");

  return (
    <AbsoluteFill style={{ backgroundColor: "#0C0C0C", color: "#EDEDED", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <GlobalFonts />
      {script.scenes.map((scene) => {
        const timing = timeline.scenes.find((item) => item.id === scene.id);
        if (!timing) throw new Error(`Timeline thiếu cảnh ${scene.id}. Chạy lại npm run voice.`);
        const Scene = SCENES[scene.component];
        if (!Scene) throw new Error(`Chưa dựng cảnh "${scene.component}" trong src/videos/registry.ts.`);
        return (
          <Sequence key={scene.id} name={scene.id} from={secToFrames(timing.startSec)} durationInFrames={secToFrames(timing.durationSec)}>
            <SceneProvider value={{ scene, timing, hideText }}>
              <Scene />
            </SceneProvider>
            {timing.sentences.map((sentence) => (
              <Sequence key={sentence.audio} from={Math.round(sentence.startSec * fps)} layout="none">
                <Audio src={staticFile(sentence.audio)} />
              </Sequence>
            ))}
            {scene.sfx.map((cue, i) => {
              const sentence = timing.sentences[cue.sentence];
              if (!sentence) throw new Error(`SFX của cảnh ${scene.id} trỏ sai câu.`);
              const from = Math.round((sentence.startSec + sentence.durationSec * cue.fraction) * fps);
              return (
                <Sequence key={`${cue.src}-${i}`} from={from} layout="none">
                  <Audio src={staticFile(cue.src)} volume={cue.volume} />
                </Sequence>
              );
            })}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
