/**
 * Sound design, as data.
 *
 * Three levels, per the brief:
 *   1  almost inaudible map movement texture — continuous, under everything
 *   2  soft UI cues on marker / boundary activation
 *   3  major story beats only
 *
 * The rule that matters: there is NO whoosh on every text entrance. Level 3
 * fires seven times in eighty seconds. If it fired more often it would stop
 * meaning anything.
 *
 * Drop your sfx into public/sfx/ and fill in `file` to arm a cue.
 */

import { beat } from "./timeline";

export type Level = 1 | 2 | 3;

export type Cue = {
  id: string;
  level: Level;
  /** Frame the cue fires on. */
  frame: number;
  /** File in public/, or null. */
  file: string | null;
  volume: number;
  note: string;
};

const at = (beatId: string, offset = 0) => beat(beatId).start + offset;

export const CUES: readonly Cue[] = [
  // ---- Level 3: the seven moments that are allowed a real sound. ----------
  {
    id: "price",
    level: 3,
    frame: at("price", 6),
    file: null,
    volume: 0.5,
    note: "AED 3,893 lands — the hook impact",
  },
  {
    id: "corner-arrival",
    level: 3,
    frame: at("cultural-district", -18),
    file: null,
    volume: 0.45,
    note: "Camera arrives in the Cultural District",
  },
  {
    id: "hundred-billion",
    level: 3,
    frame: at("hundred-billion", 5),
    file: null,
    volume: 0.5,
    note: "AED 100B",
  },
  {
    id: "marina",
    level: 3,
    frame: at("marina", 8),
    file: null,
    volume: 0.45,
    note: "Marina basin reveal",
  },
  {
    id: "growth",
    level: 3,
    frame: at("growth", 6),
    file: null,
    volume: 0.4,
    note: "+21%",
  },
  {
    id: "trophy",
    level: 3,
    frame: at("trophy", 18),
    file: null,
    volume: 0.5,
    note: "TROPHY ASSET — the editorial conclusion",
  },
  {
    id: "cta",
    level: 3,
    frame: at("cta"),
    file: null,
    volume: 0.4,
    note: "CTA card settles",
  },

  // ---- Level 2: soft activation cues. Quiet enough to be felt, not heard. --
  { id: "ui-louvre", level: 2, frame: at("louvre", -8), file: null, volume: 0.2, note: "Marker" },
  { id: "ui-teamlab", level: 2, frame: at("teamlab", -8), file: null, volume: 0.2, note: "Marker" },
  { id: "ui-nhm", level: 2, frame: at("nhm", -8), file: null, volume: 0.2, note: "Marker" },
  { id: "ui-zayed", level: 2, frame: at("zayed", -8), file: null, volume: 0.2, note: "Marker" },
  {
    id: "ui-guggenheim",
    level: 2,
    frame: at("guggenheim", -8),
    file: null,
    volume: 0.24,
    note: "Marker — final museum, slightly more weight",
  },
  {
    id: "ui-boundary",
    level: 2,
    frame: at("empty-stretch", 22),
    file: null,
    volume: 0.22,
    note: "Marsa boundary begins drawing",
  },
  {
    id: "ui-parcels",
    level: 2,
    frame: at("residents"),
    file: null,
    volume: 0.2,
    note: "Residential parcels illuminate",
  },
  {
    id: "ui-amenities",
    level: 2,
    frame: at("amenities", 6),
    file: null,
    volume: 0.18,
    note: "Amenity marks sequence",
  },
];

/** Level 1 runs for the whole reel underneath everything else. */
export const MAP_TEXTURE = {
  file: null as string | null,
  volume: 0.06,
};
