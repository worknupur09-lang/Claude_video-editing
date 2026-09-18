import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR, EASE, KICKER_LEAD, LAYOUT, TYPE } from "../theme";

/**
 * The typographic system: a gold kicker, a figure, and an optional qualifier.
 *
 * The kicker enters KICKER_LEAD frames before the figure. It is a 3-frame
 * offset that nobody consciously notices and everybody feels.
 */

export const Statistic: React.FC<{
  kicker?: string;
  value: string;
  sub?: string;
  start: number;
  duration: number;
  enter?: number;
  exit?: number;
  small?: boolean;
  color?: string;
  /** Nudges the whole block vertically. Used to stack or replace figures. */
  offsetY?: number;
}> = ({
  kicker,
  value,
  sub,
  start,
  duration,
  enter = 16,
  exit = 14,
  small = false,
  color = COLOR.white,
  offsetY = 0,
}) => {
  const frame = useCurrentFrame();

  const show = interpolate(
    frame,
    [start, start + enter, start + duration - exit, start + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOut },
  );

  if (show <= 0) {
    return null;
  }

  const kick = interpolate(
    frame,
    [start - KICKER_LEAD, start - KICKER_LEAD + enter, start + duration - exit, start + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOut },
  );

  // Rises a few pixels as it settles. Never slides in from off-screen.
  const rise = interpolate(frame, [start, start + enter], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.out,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.copy.left,
        right: LAYOUT.copy.right,
        top: LAYOUT.copy.top + offsetY,
        pointerEvents: "none",
      }}
    >
      {kicker ? (
        <div
          style={{
            fontFamily: "Inter",
            ...TYPE.kicker,
            color: COLOR.gold,
            opacity: kick,
            marginBottom: 18,
            translate: `0px ${rise * 0.4}px`,
          }}
        >
          {kicker}
        </div>
      ) : null}

      <div
        style={{
          fontFamily: "Inter",
          ...(small ? TYPE.statSmall : TYPE.stat),
          color,
          opacity: show,
          translate: `0px ${rise}px`,
          textShadow: "0 6px 40px rgba(0,0,0,0.6)",
        }}
      >
        {value}
      </div>

      {sub ? (
        <div
          style={{
            fontFamily: "Inter",
            ...TYPE.sub,
            color: COLOR.muted,
            opacity: show,
            marginTop: 20,
            translate: `0px ${rise * 0.6}px`,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

/**
 * A restrained upward trace for "+21%". Not a stock-market chart — just a line
 * that goes up, drawn once, while the figure holds.
 */
export const TrendLine: React.FC<{
  start: number;
  duration: number;
  width?: number;
  height?: number;
  top: number;
}> = ({ start, duration, width = 300, height = 84, top }) => {
  const frame = useCurrentFrame();

  const draw = interpolate(frame, [start, start + Math.min(46, duration * 0.6)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.out,
  });
  const fade = interpolate(
    frame,
    [start, start + 12, start + duration - 12, start + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOut },
  );

  if (fade <= 0) {
    return null;
  }

  const d = `M0,${height} C${width * 0.3},${height * 0.92} ${width * 0.5},${height * 0.62} ${width},0`;
  const LEN = 700;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        left: LAYOUT.copy.left,
        top,
        opacity: fade,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <path
        d={d}
        fill="none"
        stroke={COLOR.gold}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={LEN}
        strokeDashoffset={LEN * (1 - draw)}
      />
      <circle
        cx={width}
        cy={0}
        r={5}
        fill={COLOR.goldBright}
        opacity={interpolate(draw, [0.85, 1], [0, 1], { extrapolateLeft: "clamp" })}
      />
    </svg>
  );
};
