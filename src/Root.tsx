import { Composition, Still } from "remotion";
import { CANVAS } from "./reel/theme";
import { TOTAL_FRAMES } from "./reel/timeline";
import { Reel } from "./reel/Reel";
import { CutReport } from "./reel/CutReport";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SaadiyatReel"
        component={Reel}
        width={CANVAS.width}
        height={CANVAS.height}
        fps={CANVAS.fps}
        durationInFrames={TOTAL_FRAMES}
      />
      <Still id="CutReport" component={CutReport} width={1400} height={1500} />
    </>
  );
};
