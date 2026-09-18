import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR, EASE, LAYOUT } from "../theme";
import { CULTURAL_DISTRICT, MARSA_AL_SAADIYAT } from "../geo";
import { beat } from "../timeline";
import { MapRing, inOut, ramp } from "../components/MapStage";
import { Statistic, TrendLine } from "../components/Statistic";

/**
 * VERDICT — 1692-2214.
 *
 * This is where the reel calms down. Marsa threw a lot at the viewer; the job
 * here is to stop adding and let two numbers and one judgement land.
 *
 * No external imagery at all. The camera pulls back for the whole section, the
 * map stops being a subject and becomes a stage, and "Be honest about the
 * numbers" plays over a deliberately empty frame.
 */
export const Verdict: React.FC = () => {
  const frame = useCurrentFrame();

  const buy = beat("should-you-buy");
  const yields = beat("yield");
  const growth = beat("growth");
  const trophy = beat("trophy");

  return (
    <>
      {/* "So should you buy?" — the only line in the section with a question mark,
          and the only thing on screen. */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.copy.left,
          right: LAYOUT.copy.right,
          top: LAYOUT.copy.top + 20,
          fontFamily: "Inter",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: COLOR.white,
          textShadow: "0 6px 40px rgba(0,0,0,0.6)",
          opacity: inOut(frame, buy.start + 4, 16, buy.frames + 8, 22),
          translate: `0px ${interpolate(
            frame,
            [buy.start + 4, buy.start + 22],
            [16, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.out },
          )}px`,
          pointerEvents: "none",
        }}
      >
        So should you buy?
      </div>

      {/* "Yields ... around three and a half percent." Neutral, never a warning. */}
      <Statistic
        kicker="Rental yield"
        value="~3.5%"
        sub="Lowest of the five islands"
        start={yields.start + 14}
        duration={yields.frames - 10}
        color={COLOR.neutral}
      />

      {/* "But prices rose twenty-one percent last year." Replaces cleanly. */}
      <Statistic
        kicker="Price growth · last year"
        value="+21%"
        start={growth.start + 6}
        duration={growth.frames - 2}
      />
      <TrendLine
        start={growth.start + 14}
        duration={growth.frames - 10}
        top={LAYOUT.copy.top - 116}
        width={286}
        height={78}
      />

      {/* "This is a trophy asset, not a rental play." Both districts soft, nothing else. */}
      <MapRing
        ring={CULTURAL_DISTRICT}
        progress={ramp(frame, trophy.start - 20, 44)}
        color={COLOR.gold}
        fillOpacity={0.07}
        strokeWidth={1.8}
      />
      <MapRing
        ring={MARSA_AL_SAADIYAT}
        progress={ramp(frame, trophy.start - 8, 44)}
        color={COLOR.plan}
        fillOpacity={0.07}
        strokeWidth={1.8}
      />

      <div
        style={{
          position: "absolute",
          left: LAYOUT.copy.left,
          right: LAYOUT.copy.right,
          top: LAYOUT.copy.top,
          opacity: inOut(frame, trophy.start + 18, 20, trophy.frames - 30, 26),
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 0.94,
            color: COLOR.white,
            textShadow: "0 6px 44px rgba(0,0,0,0.65)",
            translate: `0px ${interpolate(
              frame,
              [trophy.start + 18, trophy.start + 40],
              [18, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.out },
            )}px`,
          }}
        >
          TROPHY
          <br />
          ASSET
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: COLOR.muted,
            marginTop: 26,
            opacity: inOut(frame, trophy.start + 34, 18, trophy.frames - 52, 22),
          }}
        >
          NOT A RENTAL PLAY
        </div>
      </div>
    </>
  );
};
