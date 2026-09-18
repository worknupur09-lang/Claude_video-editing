import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR, EASE } from "../theme";
import { MARSA_AL_SAADIYAT, SAADIYAT } from "../geo";
import { beat } from "../timeline";
import { ASSETS } from "../assets";
import { MapRing, inOut, ramp, useMap } from "../components/MapStage";
import { Statistic } from "../components/Statistic";
import { AssetInsert } from "../components/AssetInsert";

/**
 * HOOK — 0-393.
 *
 * Opens geographically, never on stock footage. The price lands first, the
 * island claims it, one beachfront insert proves it, then the camera starts
 * drifting north and the Marsa boundary ghosts in as a tease only.
 */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { project } = useMap();

  const price = beat("price");
  const thatIs = beat("that-is");
  const expensive = beat("most-expensive");
  const tease = beat("marina-tease");

  const [labelX, labelY] = project([54.428, 24.5495]);

  return (
    <>
      {/* "3,893 dirhams a square foot." */}
      <Statistic
        kicker="Saadiyat · average"
        value="AED 3,893"
        sub="per square foot"
        start={price.start + 6}
        duration={price.frames + thatIs.frames - 14}
      />

      {/* "That is Saadiyat." — the highlight completes and the island is named. */}
      <MapRing
        ring={SAADIYAT}
        progress={ramp(frame, thatIs.start - 26, 54)}
        color={COLOR.gold}
        fillOpacity={0.05}
        strokeWidth={2.6}
      />

      <div
        style={{
          position: "absolute",
          left: labelX,
          top: labelY,
          translate: "-50% -50%",
          fontFamily: "Inter",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: COLOR.white,
          textShadow: "0 3px 22px rgba(0,0,0,0.9)",
          opacity: inOut(frame, thatIs.start, 16, tease.frames + expensive.frames + 40, 26),
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        SAADIYAT
      </div>

      {/* "The most expensive address in the capital." */}
      <AssetInsert
        at={[54.4251, 24.566]}
        slot={ASSETS.beachfront}
        start={expensive.start + 6}
        duration={Math.round(ASSETS.beachfront.seconds * 30)}
        width={470}
        height={300}
        dy={210}
      />

      {/* "...a one hundred billion dirham marina." Tease only — boundary + name. */}
      <MapRing
        ring={MARSA_AL_SAADIYAT}
        progress={ramp(frame, tease.start + 34, 46)}
        color={COLOR.plan}
        strokeWidth={2}
        dashed
        fade={1 - ramp(frame, beat("this-is").start - 10, 28)}
      />

      <MarsaTeaseLabel
        opacity={inOut(frame, tease.start + 52, 18, tease.frames - 84, 22)}
      />

      <AssetInsert
        at={[54.4552, 24.5592]}
        slot={ASSETS.marsaTease}
        start={tease.start + 74}
        duration={Math.round(ASSETS.marsaTease.seconds * 30)}
        width={452}
        height={286}
        dy={188}
      />
    </>
  );
};

const MarsaTeaseLabel: React.FC<{ opacity: number }> = ({ opacity }) => {
  const { project } = useMap();
  const [x, y] = project([54.4552, 24.5592]);
  const frame = useCurrentFrame();

  if (opacity <= 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: "-50% -50%",
        textAlign: "center",
        opacity,
        pointerEvents: "none",
        scale: interpolate(opacity, [0, 1], [0.96, 1], { easing: EASE.out }),
      }}
    >
      <div
        style={{
          fontFamily: "Inter",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "0.24em",
          color: COLOR.plan,
          textShadow: "0 2px 16px rgba(0,0,0,0.9)",
        }}
      >
        MARSA AL SAADIYAT
      </div>
      <div
        style={{
          fontFamily: "Inter",
          fontSize: 17,
          fontWeight: 500,
          letterSpacing: "0.2em",
          color: COLOR.planDim,
          marginTop: 6,
          opacity: interpolate(Math.sin(frame * 0.06), [-1, 1], [0.7, 1]),
        }}
      >
        ANNOUNCED
      </div>
    </div>
  );
};
