import React from "react";
import { useCurrentFrame } from "remotion";
import { COLOR } from "../theme";
import { AL_REEM, CULTURAL_DISTRICT, SAADIYAT } from "../geo";
import { beat } from "../timeline";
import { MapRing, inOut, ramp, useMap } from "../components/MapStage";
import { Statistic } from "../components/Statistic";

/**
 * WHERE — 393-585.
 *
 * Orientation. No external imagery at all: the map comparison is stronger than
 * any building could be, and the camera move into the corner is the transition.
 */
export const Where: React.FC = () => {
  const frame = useCurrentFrame();
  const { project } = useMap();

  const thisIs = beat("this-is");
  const reem = beat("double-reem");
  const corner = beat("this-corner");

  // Al Reem is only needed for the comparison; the district highlight hands off
  // to the Culture section, which draws its own.
  const reemFade = 1 - ramp(frame, beat("cultural-district").start - 12, 30);
  const cornerFade = 1 - ramp(frame, beat("look-north").start - 12, 34);

  const [reemX, reemY] = project([54.4092, 24.5062]);

  return (
    <>
      {/* "This is Saadiyat. Twenty-seven square kilometres." */}
      <MapRing
        ring={SAADIYAT}
        progress={ramp(frame, thisIs.start, 52)}
        color={COLOR.gold}
        fillOpacity={0}
        strokeWidth={2.4}
        fade={reemFade}
      />

      <Statistic
        kicker="Saadiyat Island"
        value="27 km²"
        start={thisIs.start + 10}
        duration={thisIs.frames - 6}
      />

      {/* "Why does it cost double Reem?" — Al Reem enters, geographically. */}
      <MapRing
        ring={AL_REEM}
        progress={ramp(frame, reem.start + 6, 40)}
        color={COLOR.muted}
        fillOpacity={0.05}
        strokeWidth={2}
        fade={reemFade}
      />

      <div
        style={{
          position: "absolute",
          left: reemX,
          top: reemY,
          translate: "-50% -50%",
          fontFamily: "Inter",
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: "0.24em",
          color: COLOR.muted,
          textShadow: "0 2px 16px rgba(0,0,0,0.9)",
          opacity: inOut(frame, reem.start + 10, 16, reem.frames - 6, 20) * reemFade,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        AL REEM
      </div>

      <Statistic
        kicker="Saadiyat vs Al Reem"
        value="2×"
        sub="price per square foot"
        start={reem.start + 12}
        duration={reem.frames - 8}
        small
      />

      {/* "Because of this corner." The camera does the work; the district just lights. */}
      <MapRing
        ring={CULTURAL_DISTRICT}
        progress={ramp(frame, corner.start + 8, 40)}
        color={COLOR.goldBright}
        fillOpacity={0.06}
        strokeWidth={2.6}
        fade={cornerFade}
      />
    </>
  );
};
