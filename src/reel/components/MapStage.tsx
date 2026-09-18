import React, { createContext, useContext } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CANVAS, COLOR, EASE } from "../theme";
import {
  ABU_DHABI_MAIN,
  AL_REEM,
  ISLETS,
  LABELS,
  SAADIYAT,
  SAADIYAT_BEACH,
  YAS,
} from "../geo";
import { CAMERA_TRACK } from "../timeline";
import { cameraAt, makeProjector, type Projector } from "../projection";
import { CHROMA_GREEN, useIsTextOnly } from "../renderMode";

/**
 * The map layer. Present for all 2400 frames, always moving, never restarting.
 * Everything else in the reel is drawn on top of it and positioned through the
 * projector on this context.
 */

const MapContext = createContext<Projector | null>(null);

export const useMap = (): Projector => {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error("useMap must be used inside <MapStage>");
  }
  return ctx;
};

/**
 * Context labels fade in only once the camera is pulled back far enough that
 * they are actually useful. Close in, they are noise competing with the subject.
 */
const labelOpacity = (widthKm: number) =>
  interpolate(widthKm, [10.5, 13.5, 30, 42], [0, 0.5, 0.5, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/**
 * Keeps context labels out of the two zones that are already spoken for: the
 * presenter window top-left and the lower-third copy block. A label that
 * collides with a headline figure is worse than no label.
 */
const labelIsClear = (x: number, y: number) => {
  const inPresenter = x < 400 && y < 510;
  const inCopy = y > 1180;
  const offCanvas = x < -60 || x > CANVAS.width + 60 || y < -40 || y > CANVAS.height + 40;
  return !inPresenter && !inCopy && !offCanvas;
};

export const MapStage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const camera = cameraAt(frame, CAMERA_TRACK);
  const projector = makeProjector(camera);
  const { ring, line, project } = projector;
  const textOnly = useIsTextOnly();

  const ctxOpacity = labelOpacity(camera.widthKm);

  /**
   * In text-only mode the camera still runs and the projector is still handed
   * down, so map-anchored labels sit exactly where they do in the full render -
   * only the drawn map itself is switched off.
   */
  if (textOnly) {
    return (
      <MapContext.Provider value={projector}>
        <AbsoluteFill style={{ backgroundColor: CHROMA_GREEN }}>{children}</AbsoluteFill>
      </MapContext.Provider>
    );
  }

  return (
    <MapContext.Provider value={projector}>
      <AbsoluteFill style={{ backgroundColor: COLOR.seaDeep }}>
        <svg
          width={CANVAS.width}
          height={CANVAS.height}
          viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <radialGradient id="sea" cx="55%" cy="46%" r="78%">
              <stop offset="0%" stopColor={COLOR.seaMid} />
              <stop offset="58%" stopColor={COLOR.seaDeep} />
              <stop offset="100%" stopColor="#01040A" />
            </radialGradient>

            <linearGradient id="land" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor={COLOR.landHigh} />
              <stop offset="100%" stopColor={COLOR.land} />
            </linearGradient>

            <linearGradient id="landContext" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#111821" />
              <stop offset="100%" stopColor="#0C131B" />
            </linearGradient>

            {/* Soft halo where land meets water - reads as depth, not as a glow effect. */}
            <filter id="coastGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={CANVAS.width} height={CANVAS.height} fill="url(#sea)" />

          {/* --- Context landmasses. Deliberately dimmer than Saadiyat. --- */}
          {[ABU_DHABI_MAIN, AL_REEM, YAS, ...ISLETS].map((r, i) => (
            <path
              key={i}
              d={ring(r)}
              fill="url(#landContext)"
              stroke={COLOR.landEdge}
              strokeWidth={1.4}
              strokeOpacity={0.5}
            />
          ))}

          {/* --- Saadiyat. The subject: brighter fill, gold-tinted coast. --- */}
          <path
            d={ring(SAADIYAT)}
            fill="url(#land)"
            stroke={COLOR.goldDim}
            strokeWidth={2}
            strokeOpacity={0.62}
            filter="url(#coastGlow)"
          />

          {/* The northern shoreline, kept live so "one beach" has something to land on. */}
          <path
            d={line(SAADIYAT_BEACH)}
            fill="none"
            stroke={COLOR.gold}
            strokeWidth={2.4}
            strokeOpacity={interpolate(
              Math.sin(frame * 0.035),
              [-1, 1],
              [0.16, 0.3],
            )}
            strokeLinecap="round"
          />
        </svg>

        {/* --- Context labels. HTML rather than SVG so tracking renders properly. --- */}
        {LABELS.filter((l) => l.id !== "saadiyat").map((l) => {
          const [x, y] = project(l.at);
          if (!labelIsClear(x, y)) {
            return null;
          }
          return (
            <div
              key={l.id}
              style={{
                position: "absolute",
                left: x,
                top: y,
                translate: "-50% -50%",
                color: COLOR.mutedDim,
                fontFamily: "Inter",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.22em",
                opacity: ctxOpacity,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {l.label}
            </div>
          );
        })}

        <Compass bearing={camera.bearing} />

        {children}
      </AbsoluteFill>
    </MapContext.Provider>
  );
};

/**
 * Compass rose. The map is rotated for the vertical frame, so this is not
 * decoration - it is the only thing telling the viewer which way north is when
 * the script says "now look north".
 */
const Compass: React.FC<{ bearing: number }> = ({ bearing }) => (
  <div
    style={{
      position: "absolute",
      right: 58,
      top: 96,
      width: 44,
      height: 44,
      rotate: `${bearing}deg`,
      opacity: 0.4,
      pointerEvents: "none",
    }}
  >
    <svg width={44} height={44} viewBox="0 0 44 44">
      <circle cx={22} cy={22} r={20} fill="none" stroke={COLOR.mutedDim} strokeWidth={1} />
      <path d="M22,6 L26,22 L22,19 L18,22 Z" fill={COLOR.gold} />
      <path d="M22,38 L18,22 L22,25 L26,22 Z" fill={COLOR.mutedDim} opacity={0.7} />
    </svg>
  </div>
);

/**
 * Draws a ring on the map with a stroke that animates on.
 * Used for district boundaries and the Marsa masterplan outline.
 */
export const MapRing: React.FC<{
  ring: readonly (readonly [number, number])[];
  /** 0 -> 1, how much of the outline is drawn. */
  progress: number;
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
  dashed?: boolean;
  /**
   * Retires the ring. `progress` only ever counts up, so without this every
   * overlay a section draws would still be on screen at the end of the reel.
   */
  fade?: number;
}> = ({
  ring: r,
  progress,
  color = COLOR.gold,
  fillOpacity = 0,
  strokeWidth = 3,
  dashed,
  fade = 1,
}) => {
  const { ring: toPath } = useMap();
  const textOnly = useIsTextOnly();
  const d = toPath(r);

  // Generous length estimate; the dash offset only needs to outrun the path.
  const LEN = 6000;

  if (fade <= 0 || progress <= 0 || textOnly) {
    return null;
  }

  return (
    <svg
      width={CANVAS.width}
      height={CANVAS.height}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {fillOpacity > 0 ? (
        <path d={d} fill={color} fillOpacity={fillOpacity * progress * fade} />
      ) : null}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={dashed ? "14 10" : `${LEN}`}
        strokeDashoffset={dashed ? 0 : LEN * (1 - progress)}
        opacity={(dashed ? progress : 1) * fade}
      />
    </svg>
  );
};

/** Eased 0 -> 1 ramp, the workhorse for every entrance in the reel. */
export const ramp = (frame: number, from: number, length: number) =>
  interpolate(frame, [from, from + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.out,
  });

/** Enter, hold, leave. Nothing in this reel pops off - everything eases out. */
export const inOut = (
  frame: number,
  start: number,
  enter: number,
  hold: number,
  exit: number,
) =>
  interpolate(
    frame,
    [start, start + enter, start + enter + hold, start + enter + hold + exit],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE.inOut,
    },
  );
