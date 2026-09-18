import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT_FAMILY } from "./fonts";
import { COLOR } from "./theme";
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

/**
 * Saadiyat Island — the full 80s reel.
 *
 * Structure note: every section is mounted for the whole runtime and gates
 * itself on the global frame, rather than being wrapped in <Sequence>. That is
 * deliberate. Sequences reset useCurrentFrame() to local time, which would mean
 * every beat lookup in timeline.ts needed an offset, and — more importantly —
 * it lets animations overlap across section boundaries. The camera move into
 * the Cultural District starts while the WHERE section is still on screen, and
 * the Marsa boundary ghosts in during the HOOK. That overlap is what makes the
 * piece read as one continuous animation instead of six scenes in a row.
 */
export const Reel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLOR.seaDeep, fontFamily: FONT_FAMILY }}>
    <MapStage>
      <Hook />
      <Where />
      <Culture />
      <Marsa />
      <Verdict />
      <Cta />
    </MapStage>

    <Presenter />

    <Grade />
    <Vignette />
    <Grain />

    <SoundDesign />
  </AbsoluteFill>
);
