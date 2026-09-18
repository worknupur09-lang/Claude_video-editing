import React from "react";
import { Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { COLOR, EASE, LAYOUT } from "../theme";
import { PRESENTER } from "../assets";
import { resolveCuts, reframeFor } from "../dialogue";

/**
 * The presenter window.
 *
 * Fixed in the upper-left for the whole reel at ~26% of canvas width, so the
 * geography stays the subject and the presenter stays the guide. No glass card,
 * no glow, no decorative UI — a 1px edge and a soft shadow, nothing more.
 *
 * Jump cuts are hidden by the map, not by the presenter: the only thing that
 * happens here is an occasional 3–5% reframe on a cut, per the brief.
 */

const { x, y, width, height, radius } = LAYOUT.presenter;

export const Presenter: React.FC = () => {
  const frame = useCurrentFrame();
  const cuts = resolveCuts();

  // Settles in over the first 18 frames, then never moves again.
  const entrance = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.out,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        opacity: entrance,
        translate: `0px ${(1 - entrance) * 14}px`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        backgroundColor: "#0A1119",
      }}
    >
      {PRESENTER.video && cuts.length > 0 ? (
        cuts.map((cut) => (
          <Sequence
            key={`${cut.beat}-${cut.index}`}
            from={cut.start}
            durationInFrames={cut.frames}
            layout="none"
            name={`Presenter / ${cut.beat}`}
          >
            <Video
              src={staticFile(PRESENTER.video as string)}
              trimBefore={Math.round(cut.in * 30)}
              objectFit="cover"
              style={{
                width: "100%",
                height: "100%",
                // Micro-reframe to break the match on a cut. Never a podcast punch.
                scale: reframeFor(cut.index),
              }}
            />
          </Sequence>
        ))
      ) : (
        <PresenterPlaceholder />
      )}

      {/* 1px low-opacity edge. The only chrome on the frame. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          border: "1px solid rgba(255,255,255,0.10)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/**
 * Stands in until the take is cut. Keeps the composition honest — same size,
 * same position, same weight in frame as the real footage will have.
 */
const PresenterPlaceholder: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(160deg, #16212C 0%, #0A1119 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          border: `1.5px solid ${COLOR.goldDim}`,
          opacity: interpolate(Math.sin(frame * 0.05), [-1, 1], [0.35, 0.7]),
        }}
      />
      <div
        style={{
          fontFamily: "Inter",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.24em",
          color: COLOR.mutedDim,
        }}
      >
        PRESENTER
      </div>
      <div
        style={{
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: COLOR.mutedDim,
          opacity: 0.7,
          textAlign: "center",
          paddingInline: 22,
          lineHeight: 1.5,
        }}
      >
        Set PRESENTER.video in assets.ts and fill CUTS in dialogue.ts
      </div>
    </div>
  );
};
