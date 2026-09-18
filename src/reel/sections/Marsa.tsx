import React from "react";
import { useCurrentFrame } from "remotion";
import { CANVAS, COLOR, LAYOUT, TYPE } from "../theme";
import {
  MARSA_AL_SAADIYAT,
  MARSA_AMENITIES,
  MARSA_MARINA,
  MARSA_PARCELS,
  RAIL_LINE,
} from "../geo";
import { beat } from "../timeline";
import { ASSETS } from "../assets";
import { MapRing, inOut, ramp, useMap } from "../components/MapStage";
import { AmenityMark } from "../components/Marker";
import { AssetInsert } from "../components/AssetInsert";
import { Statistic } from "../components/Statistic";
import { useIsTextOnly } from "../renderMode";

/**
 * MARSA AL SAADIYAT — 1035-1692.
 *
 * The biggest section, and it has to feel bigger than the Cultural District.
 * The spine is a transformation the viewer watches happen on one piece of land:
 *
 *   empty ground -> development boundary -> masterplan -> render
 *
 * which is why the section opens on nothing at all. Showing the render first
 * would throw away the only moment where "this is what will occupy this land"
 * can actually land.
 */
export const Marsa: React.FC = () => {
  const frame = useCurrentFrame();
  const { line } = useMap();
  const textOnly = useIsTextOnly();

  const empty = beat("empty-stretch");
  const announced = beat("announced");
  const billion = beat("hundred-billion");
  const area = beat("area");
  const residents = beat("residents");
  const marina = beat("marina");
  const amenities = beat("amenities");
  const firstHomes = beat("first-homes");

  // The masterplan fill builds across the whole section and never resets.
  const plan = ramp(frame, announced.start, 120);

  // The verdict asks for everything to strip away, so Marsa retires its own
  // detail on the way in. The soft boundary the verdict wants is redrawn there.
  const detail = 1 - ramp(frame, beat("should-you-buy").start - 14, 40);

  return (
    <>
      {/* "This empty stretch is Marsa Al Saadiyat." Boundary draws around empty land. */}
      <MapRing
        ring={MARSA_AL_SAADIYAT}
        progress={ramp(frame, empty.start + 22, 52)}
        color={COLOR.plan}
        strokeWidth={2.6}
        dashed
        fade={detail}
      />
      <MapRing
        ring={MARSA_AL_SAADIYAT}
        progress={ramp(frame, announced.start, 44)}
        color={COLOR.plan}
        fillOpacity={0.07}
        strokeWidth={2.8}
        fade={detail}
      />

      <MarsaTitle
        opacity={
          inOut(frame, empty.start + 34, 16, billion.frames + 60, 22) * detail
        }
      />

      {/* Masterplan parcels ghost in behind everything from "Announced in July". */}
      {MARSA_PARCELS.map((p, i) => (
        <MapRing
          key={`plan-${i}`}
          ring={p}
          progress={ramp(frame, announced.start + 10 + i * 5, 34) * plan}
          color={COLOR.plan}
          fillOpacity={0.08}
          strokeWidth={1.2}
          fade={detail}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: LAYOUT.copy.left,
          top: LAYOUT.copy.top + 40,
          fontFamily: "Inter",
          ...TYPE.kicker,
          color: COLOR.plan,
          opacity: inOut(
            frame,
            announced.start + 4,
            12,
            announced.frames - 4,
            14,
          ),
          pointerEvents: "none",
        }}
      >
        Announced July 2025
      </div>

      {/* "One hundred billion dirhams." */}
      <Statistic
        kicker="Development value"
        value="AED 100B"
        start={billion.start + 5}
        duration={billion.frames - 4}
      />
      <AssetInsert
        at={[54.4552, 24.5592]}
        slot={ASSETS.marsaMasterplan}
        start={billion.start + 12}
        duration={Math.round(ASSETS.marsaMasterplan.seconds * 30)}
        width={496}
        height={330}
        dy={-206}
      />

      {/* "Six point four million square metres." Measured on the map, not just typed. */}
      <MapRing
        ring={MARSA_AL_SAADIYAT}
        progress={ramp(frame, area.start, 40)}
        color={COLOR.goldBright}
        strokeWidth={3.4}
        fade={detail}
      />
      <Statistic
        kicker="Total area"
        value="6.4M m²"
        start={area.start + 6}
        duration={area.frames - 4}
        small
      />

      {/* "Fifty-eight thousand residents." Parcels light one by one — no people icons. */}
      {MARSA_PARCELS.map((p, i) => (
        <MapRing
          key={`res-${i}`}
          ring={p}
          progress={ramp(frame, residents.start + i * 7, 22)}
          color={COLOR.goldBright}
          fillOpacity={0.22}
          strokeWidth={1.4}
          fade={detail}
        />
      ))}
      <Statistic
        kicker="Planned population"
        value="58,000"
        sub="residents"
        start={residents.start + 4}
        duration={residents.frames + 14}
        small
      />

      {/* "A 350 berth marina, the biggest in Abu Dhabi." */}
      <MapRing
        ring={MARSA_MARINA}
        progress={ramp(frame, marina.start + 8, 44)}
        color={COLOR.goldBright}
        fillOpacity={0.18}
        strokeWidth={3}
        fade={detail}
      />
      <AssetInsert
        at={[54.4621, 24.5566]}
        slot={ASSETS.marsaMarina}
        start={marina.start + 26}
        duration={Math.round(ASSETS.marsaMarina.seconds * 30)}
        width={520}
        height={340}
        dy={-214}
      />
      <Statistic
        kicker="Marina"
        value="350 berths"
        start={marina.start + 10}
        duration={68}
        small
      />
      <Statistic
        value="Largest in Abu Dhabi"
        start={marina.start + 80}
        duration={marina.frames - 74}
        small
        color={COLOR.gold}
      />

      {/* "Two hotels, three schools, an Etihad Rail station." Map symbols only. */}
      {textOnly ? null : (
        <svg
          width={CANVAS.width}
          height={CANVAS.height}
          viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <path
            d={line(RAIL_LINE)}
            fill="none"
            stroke={COLOR.gold}
            strokeWidth={2.4}
            strokeDasharray={3000}
            strokeDashoffset={
              3000 * (1 - ramp(frame, amenities.start + 40, 44))
            }
            opacity={
              inOut(
                frame,
                amenities.start + 40,
                14,
                amenities.frames + 30,
                20,
              ) *
              0.75 *
              detail
            }
            strokeLinecap="round"
          />
        </svg>
      )}

      {MARSA_AMENITIES.map((a, i) => (
        <AmenityMark
          key={a.id}
          at={a.at}
          kind={a.kind}
          progress={
            ramp(frame, amenities.start + 6 + i * 9, 18) *
            inOut(frame, amenities.start, 1, amenities.frames + 70, 24) *
            detail
          }
        />
      ))}

      <AmenityLegend
        opacity={
          inOut(frame, amenities.start + 10, 16, amenities.frames - 16, 20) *
          detail
        }
      />

      {/* "First homes go on sale before the end of the year." */}
      <AssetInsert
        at={[54.4476, 24.5586]}
        slot={ASSETS.marsaResidential}
        start={firstHomes.start + 4}
        duration={Math.round(ASSETS.marsaResidential.seconds * 30)}
        width={486}
        height={316}
        dy={-200}
      />
      <Statistic
        kicker="First homes"
        value="On sale 2025"
        start={firstHomes.start + 8}
        duration={firstHomes.frames - 10}
        small
      />
    </>
  );
};

const MarsaTitle: React.FC<{ opacity: number }> = ({ opacity }) => {
  const { project } = useMap();
  const [x, y] = project([54.4552, 24.5592]);

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
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          fontFamily: "Inter",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "0.26em",
          color: COLOR.white,
          textShadow: "0 3px 22px rgba(0,0,0,0.92)",
        }}
      >
        MARSA AL SAADIYAT
      </div>
    </div>
  );
};

const AmenityLegend: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  if (opacity <= 0) {
    return null;
  }

  const rows = [
    { kind: "hotel" as const, text: "Hotel ×2" },
    { kind: "school" as const, text: "School ×3" },
    { kind: "rail" as const, text: "Etihad Rail station" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.copy.left,
        top: LAYOUT.copy.top + 30,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        opacity,
        pointerEvents: "none",
      }}
    >
      {rows.map((r, i) => {
        const a = ramp(frame, beat("amenities").start + 14 + i * 16, 18);
        return (
          <div
            key={r.kind}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: a,
              translate: `${(1 - a) * -12}px 0px`,
            }}
          >
            <LegendGlyph kind={r.kind} />
            <div
              style={{
                fontFamily: "Inter",
                fontSize: 38,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: COLOR.white,
                textShadow: "0 3px 20px rgba(0,0,0,0.75)",
              }}
            >
              {r.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LegendGlyph: React.FC<{ kind: "hotel" | "school" | "rail" }> = ({
  kind,
}) => {
  const box: React.CSSProperties = {
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (kind === "hotel") {
    return (
      <div style={box}>
        <div
          style={{
            width: 15,
            height: 15,
            border: `2px solid ${COLOR.gold}`,
            backgroundColor: "rgba(217,179,108,0.18)",
          }}
        />
      </div>
    );
  }
  if (kind === "school") {
    return (
      <div style={box}>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderBottom: `15px solid ${COLOR.gold}`,
          }}
        />
      </div>
    );
  }
  return (
    <div style={box}>
      <div
        style={{
          width: 22,
          height: 5,
          backgroundColor: COLOR.gold,
          borderRadius: 1,
        }}
      />
    </div>
  );
};
