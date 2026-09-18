import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { CANVAS } from "../theme";

/**
 * The finish pass: vignette and grain.
 *
 * Both are deliberately almost-invisible. They exist so the map does not look
 * like a flat web graphic, not so anyone notices an effect.
 */

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse 78% 62% at 55% 46%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.42) 78%, rgba(0,0,0,0.72) 100%)",
      pointerEvents: "none",
    }}
  />
);

/**
 * Controlled film grain. Rendered as a small tiled SVG turbulence rather than
 * per-pixel noise so it costs nothing per frame; the tile shifts each frame so
 * it never reads as a static texture.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  const shiftX = noise2D("grain-x", frame * 0.9, 0) * 40;
  const shiftY = noise2D("grain-y", frame * 0.9, 0) * 40;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity, mixBlendMode: "overlay" }}>
      <svg
        width={CANVAS.width}
        height={CANVAS.height}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={Math.floor(frame % 12)}
          />
        </filter>
        <rect
          x={shiftX - 40}
          y={shiftY - 40}
          width={CANVAS.width + 80}
          height={CANVAS.height + 80}
          filter="url(#grain)"
        />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * A very slight cool-to-warm lift across the frame. Ties the gold accent and
 * the navy sea together so the palette reads as one graded image.
 */
export const Grade: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(168deg, rgba(120,150,190,0.05) 0%, rgba(0,0,0,0) 45%, rgba(217,179,108,0.045) 100%)",
      pointerEvents: "none",
    }}
  />
);
