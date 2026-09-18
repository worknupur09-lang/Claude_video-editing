import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT_FAMILY } from "./fonts";
import { COLOR } from "./theme";
import { CHROMA_GREEN, RenderModeProvider, type RenderMode } from "./renderMode";
import { MapStage } from "./components/MapStage";
import { Presenter } from "./components/Presenter";
import { Grade, Grain, Vignette } from "./components/Atmosphere";
import { SoundDesign } from "./components/SoundDesign";
import { Hook } from "./sections/Hook";
import { Where } from "./sections/Where";
import { Culture } from "./sections/Culture";
import { Marsa } from "./sections/Marsa";
import { Verdict } from "./sections/Verdict";
import { Cta } from "./sections/Cta";

export type ReelProps = {
  mode: RenderMode;
};

/**
 * Saadiyat Island — the full 80s reel, and its text layer.
 *
 * Structure note: every section is mounted for the whole runtime and gates
 * itself on the global frame, rather than being wrapped in <Sequence>. That is
 * deliberate. Sequences reset useCurrentFrame() to local time, which would mean
 * every beat lookup in timeline.ts needed an offset, and — more importantly —
 * it lets animations overlap across section boundaries. The camera move into
 * the Cultural District starts while the WHERE section is still on screen, and
 * the Marsa boundary ghosts in during the HOOK. That overlap is what makes the
 * piece read as one continuous animation instead of six scenes in a row.
 *
 * `mode` switches the picture layers off for the green-screen text pass. The
 * sections themselves are untouched between the two, so the keyed layer lines
 * up with the full render frame for frame.
 */
export const Reel: React.FC<ReelProps> = ({ mode = "full" }) => {
  const textOnly = mode === "text-only";

  return (
    <RenderModeProvider mode={mode}>
      <AbsoluteFill
        style={{
          backgroundColor: textOnly ? CHROMA_GREEN : COLOR.seaDeep,
          fontFamily: FONT_FAMILY,
        }}
      >
        {/*
          Every shadow and glow in the reel exists to hold type legible against
          the map. On green they would key out as dark fringing around each
          glyph, so the text pass drops them wholesale rather than one by one.
        */}
        {textOnly ? (
          <style>{`
            .saadiyat-text-layer, .saadiyat-text-layer * {
              text-shadow: none !important;
              box-shadow: none !important;
              filter: none !important;
            }
          `}</style>
        ) : null}

        <div className={textOnly ? "saadiyat-text-layer" : undefined}>
          <MapStage>
            <Hook />
            <Where />
            <Culture />
            <Marsa />
            <Verdict />
            <Cta />
          </MapStage>
        </div>

        {textOnly ? null : (
          <>
            <Presenter />
            <Grade />
            <Vignette />
            <Grain />
            <SoundDesign />
          </>
        )}
      </AbsoluteFill>
    </RenderModeProvider>
  );
};
