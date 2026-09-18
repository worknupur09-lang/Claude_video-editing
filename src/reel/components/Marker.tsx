import React from "react";
import { interpolate } from "remotion";
import { COLOR, EASE, TYPE } from "../theme";
import { CANVAS } from "../theme";
import { useMap } from "./MapStage";
import type { LngLat } from "../geo";

/**
 * A location marker: dot, one expanding bloom ring, label.
 *
 * Deliberately minimal — these are map symbols, not icons. The bloom fires once
 * on activation and is never looped, so five markers in a row do not turn into
 * a pulsing christmas tree.
 */

export const Marker: React.FC<{
  at: LngLat;
  label?: string;
  meta?: string;
  /** 0 -> 1 activation. */
  progress: number;
  /** Dims to this once the marker is no longer the subject. */
  resting?: number;
  color?: string;
  side?: "auto" | "left" | "right";
  size?: number;
  /**
   * Above this camera width the label is dropped and only the dot survives.
   * Five museums sit within a kilometre of each other, so pulled back their
   * labels would stack on top of one another and read as a mess.
   */
  labelMaxKm?: number;
}> = ({
  at,
  label,
  meta,
  progress,
  resting = 1,
  color = COLOR.gold,
  side = "auto",
  size = 9,
  labelMaxKm = 7,
}) => {
  const { project, camera } = useMap();
  const [x, y] = project(at);

  if (progress <= 0) {
    return null;
  }

  const appear = interpolate(progress, [0, 1], [0, 1], { easing: EASE.out });
  // Single bloom, front-loaded, gone by the time the label has settled.
  const bloom = interpolate(progress, [0, 0.45, 1], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Keep the label inside frame and clear of the presenter box top-left.
  const onLeft = side === "auto" ? x > CANVAS.width * 0.58 : side === "left";

  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none", opacity: resting }}>
      {/* Bloom ring */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: size * 2,
          height: size * 2,
          marginLeft: -size,
          marginTop: -size,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          opacity: bloom * 0.6,
          scale: 1 + bloom * 3.4,
        }}
      />
      {/* Dot */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 ${12 * appear}px ${color}`,
          scale: appear,
        }}
      />

      {label && camera.widthKm <= labelMaxKm ? (
        <div
          style={{
            position: "absolute",
            left: onLeft ? undefined : size + 14,
            right: onLeft ? size + 14 : undefined,
            top: -13,
            textAlign: onLeft ? "right" : "left",
            whiteSpace: "nowrap",
            opacity: interpolate(progress, [0.18, 0.65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE.out,
            }),
            translate: `${(onLeft ? 1 : -1) * (1 - appear) * 10}px 0px`,
          }}
        >
          <div
            style={{
              fontFamily: "Inter",
              ...TYPE.marker,
              color: COLOR.white,
              textShadow: "0 2px 12px rgba(0,0,0,0.85)",
            }}
          >
            {label}
          </div>
          {meta ? (
            <div
              style={{
                fontFamily: "Inter",
                ...TYPE.markerMeta,
                color,
                marginTop: 3,
                textShadow: "0 2px 10px rgba(0,0,0,0.85)",
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

/**
 * Minimal amenity symbol for the Marsa hotels / schools / rail station.
 * A square, a triangle and a bar — professional map notation, no cheesy icons.
 */
export const AmenityMark: React.FC<{
  at: LngLat;
  kind: "hotel" | "school" | "rail";
  progress: number;
}> = ({ at, kind, progress }) => {
  const { project } = useMap();
  const [x, y] = project(at);

  if (progress <= 0) {
    return null;
  }

  const s = 13;
  const common: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    translate: "-50% -50%",
    scale: interpolate(progress, [0, 1], [0.4, 1], { easing: EASE.out }),
    opacity: progress,
    pointerEvents: "none",
  };

  if (kind === "hotel") {
    return (
      <div
        style={{
          ...common,
          width: s,
          height: s,
          border: `2px solid ${COLOR.gold}`,
          backgroundColor: "rgba(217,179,108,0.18)",
        }}
      />
    );
  }

  if (kind === "school") {
    return (
      <div
        style={{
          ...common,
          width: 0,
          height: 0,
          borderLeft: `${s * 0.6}px solid transparent`,
          borderRight: `${s * 0.6}px solid transparent`,
          borderBottom: `${s}px solid ${COLOR.gold}`,
        }}
      />
    );
  }

  return (
    <div
      style={{
        ...common,
        width: s * 1.9,
        height: 5,
        backgroundColor: COLOR.gold,
        borderRadius: 1,
      }}
    />
  );
};
