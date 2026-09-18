import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR, EASE, LAYOUT } from "../theme";
import { MARSA_AL_SAADIYAT, SAADIYAT } from "../geo";
import { beat } from "../timeline";
import { MapRing, ramp } from "../components/MapStage";

/**
 * CTA — 2214-2400.
 *
 * A beautiful, quiet Saadiyat composition. Markers gone, one Marsa hint left.
 * No comment bubble, no bounce, no arrows — the CTA is set in the same
 * editorial system as every other card in the reel, which is the only reason it
 * does not feel like an ad stapled to the end.
 */
export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const cta = beat("cta");

  const enter = interpolate(frame, [cta.start, cta.start + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.out,
  });

  return (
    <>
      <MapRing
        ring={SAADIYAT}
        progress={ramp(frame, cta.start - 30, 50)}
        color={COLOR.gold}
        fillOpacity={0.06}
        strokeWidth={2.2}
      />
      <MapRing
        ring={MARSA_AL_SAADIYAT}
        progress={ramp(frame, cta.start - 18, 44)}
        color={COLOR.plan}
        fillOpacity={0.06}
        strokeWidth={1.6}
        dashed
      />

      <div
        style={{
          position: "absolute",
          left: LAYOUT.copy.left,
          right: LAYOUT.copy.right,
          top: LAYOUT.copy.top - 10,
          opacity: enter,
          translate: `0px ${(1 - enter) * 18}px`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: COLOR.gold,
            marginBottom: 20,
          }}
        >
          Comment
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 138,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 0.96,
            color: COLOR.white,
            textShadow: "0 6px 44px rgba(0,0,0,0.65)",
          }}
        >
          SAADIYAT
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 31,
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: COLOR.muted,
            marginTop: 26,
            opacity: interpolate(frame, [cta.start + 16, cta.start + 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE.out,
            }),
          }}
        >
          MARSA LAUNCH DETAILS
        </div>
      </div>
    </>
  );
};
