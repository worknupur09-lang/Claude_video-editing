import { Composition, Still } from "remotion";
import { CANVAS } from "./reel/theme";
import { TOTAL_FRAMES } from "./reel/timeline";
import { Reel } from "./reel/Reel";
import { CutReport } from "./reel/CutReport";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* The finished reel. */}
      <Composition
        id="SaadiyatReel"
        component={Reel}
        width={CANVAS.width}
        height={CANVAS.height}
        fps={CANVAS.fps}
        durationInFrames={TOTAL_FRAMES}
        defaultProps={{ mode: "full" as const }}
      />

      {/*
        The same composition with the picture layers off: typography only, over
        chroma green, for keying over other footage. Identical timing and
        positions, so it drops straight onto the full render if needed.
      */}
      <Composition
        id="SaadiyatTextGreenScreen"
        component={Reel}
        width={CANVAS.width}
        height={CANVAS.height}
        fps={CANVAS.fps}
        durationInFrames={TOTAL_FRAMES}
        defaultProps={{ mode: "text-only" as const }}
      />

      <Still id="CutReport" component={CutReport} width={1400} height={1500} />
    </>
  );
};
