import React from "react";
import { CanvasImage, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLOR, EASE, CANVAS } from "../theme";
import type { AssetSlot } from "../assets";
import { useMap } from "./MapStage";
import type { LngLat } from "../geo";

/**
 * External imagery, attached to the map.
 *
 * Never a hard cut to a full-screen photo. The card opens out of the location it
 * describes, a leader line keeps it tied to that point, the map carries on
 * moving behind it, and it masks away again — so the imagery reads as part of
 * the geography rather than a slideshow interrupting it.
 */

export const AssetInsert: React.FC<{
  at: LngLat;
  slot: AssetSlot;
  start: number;
  duration: number;
  /** Card size. Keep inside 30–55% of frame width. */
  width?: number;
  height?: number;
  /** Offset from the anchor point, in pixels. */
  dx?: number;
  dy?: number;
}> = ({ at, slot, start, duration, width = 486, height = 324, dx = 96, dy = 120 }) => {
  const frame = useCurrentFrame();
  const { project } = useMap();
  const [ax, ay] = project(at);

  const enter = 13;
  const exit = 11;

  const open = interpolate(frame, [start, start + enter], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.wipe,
  });
  const close = interpolate(frame, [start + duration - exit, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.inOut,
  });
  const live = open * (1 - close);

  if (live <= 0.001) {
    return null;
  }

  // Flip to the other side of the anchor when the card would leave the frame,
  // then clamp so it still respects the side margin after flipping.
  const flipX = ax + dx + width > CANVAS.width - 48;
  const left = Math.min(
    Math.max(flipX ? ax - dx - width : ax + dx, 48),
    CANVAS.width - width - 48,
  );
  // Clamped clear of the presenter window above and the copy block below.
  const top = Math.min(Math.max(ay + dy - height / 2, 486), CANVAS.height - height - 620);

  // Masks open from the anchor edge, not from the centre.
  const revealed = open * (1 - close);
  const inset = flipX
    ? `0% 0% 0% ${(1 - revealed) * 100}%`
    : `0% ${(1 - revealed) * 100}% 0% 0%`;

  return (
    <>
      {/* Leader line — the thing that makes the card feel geographic. */}
      <svg
        width={CANVAS.width}
        height={CANVAS.height}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <line
          x1={ax}
          y1={ay}
          x2={flipX ? left + width : left}
          y2={top + height / 2}
          stroke={COLOR.gold}
          strokeWidth={1.2}
          strokeOpacity={live * 0.45}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left,
          top,
          width,
          height,
          borderRadius: 10,
          overflow: "hidden",
          clipPath: `inset(${inset} round 10px)`,
          // Depth of field on the insert only — never enough to matter, and
          // never applied to the map itself.
          filter: `blur(${(1 - open) * 6}px)`,
          boxShadow: "0 26px 70px rgba(0,0,0,0.6)",
          scale: interpolate(open, [0, 1], [0.94, 1], { easing: EASE.out }),
        }}
      >
        {slot.file ? (
          <CanvasImage
            src={staticFile(slot.file)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <SlotPlaceholder slot={slot} />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 10,
            border: `1px solid ${COLOR.goldDim}`,
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

/** Shown until the real image is supplied. Named, so the edit stays readable. */
const SlotPlaceholder: React.FC<{ slot: AssetSlot }> = ({ slot }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(150deg, #16202B 0%, #0B1119 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      padding: 30,
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "0.26em",
        color: COLOR.goldDim,
      }}
    >
      ASSET
    </div>
    <div
      style={{
        fontFamily: "Inter",
        fontSize: 23,
        fontWeight: 500,
        lineHeight: 1.4,
        color: COLOR.muted,
      }}
    >
      {slot.brief}
    </div>
    <div
      style={{
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.1em",
        color: COLOR.mutedDim,
      }}
    >
      {slot.seconds.toFixed(1)}s · assets.ts → {slot.id}
    </div>
  </div>
);
