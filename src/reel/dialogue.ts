import { CANVAS } from "./theme";
import { BEATS } from "./timeline";

/**
 * The dialogue edit — Phase 01 of the brief.
 *
 * The raw take is never used as-is. This file is the cut list: for each beat of
 * the script you give the in/out point of the clean take from the raw footage,
 * and the reel assembles them back-to-back at the beat timings in `timeline.ts`.
 * Everything between your out-point and the next in-point — dead air, settling,
 * false starts, repeated takes, off-script talk — simply never makes it in.
 *
 * ---------------------------------------------------------------------------
 * FILLING THIS IN
 * ---------------------------------------------------------------------------
 * 1. Put the raw take in `public/` and set `PRESENTER.video` in assets.ts.
 * 2. Scrub the take. For each line below, set `in` / `out` in SECONDS of source
 *    time — tight: start on the first consonant, end on the last, leaving only
 *    the breath you actually want to keep.
 * 3. Run `npx remotion studio` and check the CutReport composition. It flags any
 *    line whose source length differs from its slot in the timeline, so you can
 *    either trim harder or let the beat duration follow the real read.
 *
 * Target gaps once cut (the brief's spec, already baked into `timeline.ts`):
 *   3–8 frames between connected phrases
 *   8–14 frames between major ideas
 * Longer only where a pause is doing deliberate work.
 * ---------------------------------------------------------------------------
 */

export type Cut = {
  /** Beat id from timeline.ts. */
  beat: string;
  /** In-point in the raw take, in seconds. */
  in: number;
  /** Out-point in the raw take, in seconds. */
  out: number;
};

/**
 * Empty until the raw take is available. With no cuts the presenter frame
 * renders as a placeholder and the rest of the reel is unaffected.
 */
export const CUTS: readonly Cut[] = [];

export type ResolvedCut = Cut & {
  /** Where this cut sits on the reel timeline. */
  start: number;
  frames: number;
  /** Source length vs. slot length, in frames. Positive = source is longer. */
  drift: number;
  index: number;
};

export const resolveCuts = (): readonly ResolvedCut[] =>
  CUTS.map((cut, index) => {
    const b = BEATS.find((x) => x.id === cut.beat);
    if (!b) {
      throw new Error(
        `Cut references unknown beat "${cut.beat}". Valid ids: ${BEATS.map((x) => x.id).join(", ")}`,
      );
    }
    const sourceFrames = Math.round((cut.out - cut.in) * CANVAS.fps);
    return {
      ...cut,
      index,
      start: b.start,
      frames: Math.min(b.frames, sourceFrames),
      drift: sourceFrames - b.frames,
    };
  });

/**
 * Micro-reframe used to hide a jump cut, per the brief: 100% -> 103–106%,
 * and only enough variation between neighbouring cuts to break the match.
 * Deterministic, so renders are reproducible.
 */
export const reframeFor = (index: number): number => {
  const steps = [1.0, 1.035, 1.0, 1.05, 1.02, 1.0, 1.045];
  return steps[index % steps.length];
};
