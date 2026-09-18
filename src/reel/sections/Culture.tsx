import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR, EASE, LAYOUT, TYPE } from "../theme";
import { CULTURAL_DISTRICT, MUSEUMS, SAADIYAT_BEACH } from "../geo";
import { beat } from "../timeline";
import { ASSETS } from "../assets";
import { MapRing, inOut, ramp, useMap } from "../components/MapStage";
import { Marker } from "../components/Marker";
import { AssetInsert } from "../components/AssetInsert";
import { CANVAS } from "../theme";
import { useIsTextOnly } from "../renderMode";

/**
 * CULTURAL DISTRICT — 585-1035.
 *
 * Each landmark is introduced geographically first, then a short insert
 * confirms what it is. Markers stay lit once activated and dim to resting, so
 * by the payoff line all five are already on the map and "five museums" is
 * something the viewer can count rather than be told.
 */

const museum = (id: string) => {
  const m = MUSEUMS.find((x) => x.id === id);
  if (!m) {
    throw new Error(`Unknown museum "${id}"`);
  }
  return m;
};

/** Script order, with the asset slot and insert geometry for each. */
const ORDER = [
  { id: "louvre", beatId: "louvre", slot: "louvre", dy: 190 },
  { id: "teamlab", beatId: "teamlab", slot: "teamlab", dy: -180 },
  { id: "nhm", beatId: "nhm", slot: "nhm", dy: 196 },
  { id: "zayed", beatId: "zayed", slot: "zayed", dy: -186 },
  { id: "guggenheim", beatId: "guggenheim", slot: "guggenheim", dy: 200 },
] as const;

export const Culture: React.FC = () => {
  const frame = useCurrentFrame();
  const { line } = useMap();
  const textOnly = useIsTextOnly();

  const district = beat("cultural-district");
  const payoff = beat("five-museums");

  // Everything this section drew has to be gone before Marsa starts. `ramp`
  // only counts up, so without an explicit retire the five museum labels would
  // still be stacked on screen under TROPHY ASSET at the end of the reel.
  const detail = 1 - ramp(frame, beat("look-north").start - 12, 34);

  return (
    <>
      {/* "The Cultural District." */}
      <MapRing
        ring={CULTURAL_DISTRICT}
        progress={ramp(frame, district.start - 30, 48)}
        color={COLOR.gold}
        fillOpacity={0.05}
        strokeWidth={2.6}
        fade={detail}
      />

      <div
        style={{
          position: "absolute",
          left: LAYOUT.copy.left,
          top: LAYOUT.copy.top + 40,
          fontFamily: "Inter",
          ...TYPE.kicker,
          color: COLOR.gold,
          opacity: inOut(
            frame,
            district.start + 4,
            14,
            district.frames + 10,
            18,
          ),
          pointerEvents: "none",
        }}
      >
        The Cultural District
      </div>

      {/* Five museums, west to east, each geographic first then confirmed. */}
      {ORDER.map(({ id, beatId, slot, dy }) => {
        const b = beat(beatId);
        const m = museum(id);
        const isSubject = frame >= b.start - 10 && frame < b.end;

        return (
          <React.Fragment key={id}>
            <Marker
              at={m.at}
              label={m.label}
              meta={m.meta}
              progress={ramp(frame, b.start - 8, 16)}
              resting={
                (isSubject
                  ? 1
                  : Math.min(
                      1,
                      interpolate(frame, [b.end, b.end + 20], [1, 0.5], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }) +
                        // All five come back up together for the payoff.
                        interpolate(
                          frame,
                          [payoff.start - 16, payoff.start],
                          [0, 0.5],
                          {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                          },
                        ),
                    )) * detail
              }
            />
            <AssetInsert
              at={m.at}
              slot={ASSETS[slot]}
              start={b.start + 9}
              duration={Math.round(ASSETS[slot].seconds * 30)}
              width={id === "guggenheim" ? 512 : 452}
              height={id === "guggenheim" ? 336 : 292}
              dy={dy}
            />
          </React.Fragment>
        );
      })}

      {/* "Five museums, one beach." Back to the map. No collage. */}
      {textOnly ? null : (
        <svg
          width={CANVAS.width}
          height={CANVAS.height}
          viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <path
            d={line(SAADIYAT_BEACH)}
            fill="none"
            stroke={COLOR.goldBright}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={4000}
            strokeDashoffset={4000 * (1 - ramp(frame, payoff.start - 18, 40))}
            opacity={
              inOut(frame, payoff.start - 18, 14, payoff.frames + 26, 20) *
              0.9 *
              detail
            }
          />
        </svg>
      )}

      <div
        style={{
          position: "absolute",
          left: LAYOUT.copy.left,
          top: LAYOUT.copy.top,
          opacity: inOut(frame, payoff.start - 6, 14, payoff.frames + 4, 18),
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 112,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 0.98,
            color: COLOR.white,
            textShadow: "0 6px 40px rgba(0,0,0,0.6)",
            translate: `0px ${interpolate(
              frame,
              [payoff.start - 6, payoff.start + 10],
              [14, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE.out,
              },
            )}px`,
          }}
        >
          5 MUSEUMS
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: COLOR.gold,
            marginTop: 16,
          }}
        >
          ONE BEACH
        </div>
      </div>
    </>
  );
};
