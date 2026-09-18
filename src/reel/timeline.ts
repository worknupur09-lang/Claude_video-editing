import type { CameraKey } from "./projection";

/**
 * The script, as data. This is the single source of truth for the whole reel -
 * every section, camera move and graphic reads its timing from here.
 *
 * Durations were derived from word count at a per-section delivery rate, then
 * hand-tuned for the pacing curve the brief asks for:
 *   HOOK fast -> WHERE orient -> CULTURE rhythmic -> MARSA dense ->
 *   VERDICT slower -> CTA clean hold.
 *
 * Total: 199 words / 2400 frames / 80.0s at 30fps.
 *
 * When the real voice track is cut, replace `frames` with the measured length
 * of each line and everything downstream re-times itself.
 */

export type SectionId = "hook" | "where" | "culture" | "marsa" | "verdict" | "cta";

export type Beat = {
  id: string;
  section: SectionId;
  /** The spoken line, verbatim from the script. */
  text: string;
  /** The one visual action this line triggers. */
  action: string;
  frames: number;
};

const RAW: readonly Beat[] = [
  // ---------------------------------------------------------------- HOOK (393)
  {
    id: "price",
    section: "hook",
    text: "Three thousand eight hundred and ninety-three dirhams a square foot.",
    action: "AED 3,893 lands over a drifting Saadiyat.",
    frames: 120,
  },
  {
    id: "that-is",
    section: "hook",
    text: "That is Saadiyat.",
    action: "Island highlight completes, name sets.",
    frames: 45,
  },
  {
    id: "most-expensive",
    section: "hook",
    text: "The most expensive address in the capital.",
    action: "Beachfront insert emerges from the coastline.",
    frames: 78,
  },
  {
    id: "marina-tease",
    section: "hook",
    text: "And Aldar just said the last piece of it is a one hundred billion dirham marina.",
    action: "Camera drifts north, Marsa boundary ghosts in.",
    frames: 150,
  },

  // --------------------------------------------------------------- WHERE (192)
  {
    id: "this-is",
    section: "where",
    text: "This is Saadiyat. Twenty-seven square kilometres.",
    action: "Coastline traces, 27 KM² sets on the island.",
    frames: 75,
  },
  {
    id: "double-reem",
    section: "where",
    text: "Why does it cost double Reem?",
    action: "Camera pulls back, Al Reem enters frame below.",
    frames: 66,
  },
  {
    id: "this-corner",
    section: "where",
    text: "Because of this corner.",
    action: "Camera accelerates into the southwest corner.",
    frames: 51,
  },

  // ------------------------------------------------------------- CULTURE (450)
  {
    id: "cultural-district",
    section: "culture",
    text: "The Cultural District.",
    action: "District boundary draws, camera arrives.",
    frames: 48,
  },
  {
    id: "louvre",
    section: "culture",
    text: "Louvre Abu Dhabi, 2017.",
    action: "Marker blooms, insert confirms the dome.",
    frames: 60,
  },
  {
    id: "teamlab",
    section: "culture",
    text: "teamLab, April 2025.",
    action: "Marker, label, short insert.",
    frames: 51,
  },
  {
    id: "nhm",
    section: "culture",
    text: "The Natural History Museum, November 2025.",
    action: "Marker, architectural insert.",
    frames: 72,
  },
  {
    id: "zayed",
    section: "culture",
    text: "Zayed National Museum, December 2025.",
    action: "Marker, tower architecture insert.",
    frames: 66,
  },
  {
    id: "guggenheim",
    section: "culture",
    text: "And the Guggenheim opens on the eleventh of December this year.",
    action: "Final museum - longest insert, most emphasis.",
    frames: 111,
  },
  {
    id: "five-museums",
    section: "culture",
    text: "Five museums, one beach.",
    action: "Pull back. Five markers lit, beach traced. Payoff.",
    frames: 42,
  },

  // --------------------------------------------------------------- MARSA (657)
  {
    id: "look-north",
    section: "marsa",
    text: "Now look north.",
    action: "Camera swings north across the island.",
    frames: 39,
  },
  {
    id: "empty-stretch",
    section: "marsa",
    text: "This empty stretch is Marsa Al Saadiyat.",
    action: "Empty land first, then the boundary draws around it.",
    frames: 81,
  },
  {
    id: "announced",
    section: "marsa",
    text: "Announced in July.",
    action: "Boundary completes, masterplan begins to fill.",
    frames: 42,
  },
  {
    id: "hundred-billion",
    section: "marsa",
    text: "One hundred billion dirhams.",
    action: "AED 100B over the filling masterplan.",
    frames: 69,
  },
  {
    id: "area",
    section: "marsa",
    text: "Six point four million square metres.",
    action: "Footprint outlined and measured geographically.",
    frames: 72,
  },
  {
    id: "residents",
    section: "marsa",
    text: "Fifty-eight thousand residents.",
    action: "Residential parcels illuminate one by one.",
    frames: 54,
  },
  {
    id: "marina",
    section: "marsa",
    text: "A three hundred and fifty berth marina, the biggest in Abu Dhabi.",
    action: "Camera to the basin. Berths, then LARGEST IN ABU DHABI.",
    frames: 129,
  },
  {
    id: "amenities",
    section: "marsa",
    text: "Two hotels, three schools, an Etihad Rail station.",
    action: "Six minimal map symbols, sequential. Rail line draws.",
    frames: 90,
  },
  {
    id: "first-homes",
    section: "marsa",
    text: "First homes go on sale before the end of the year.",
    action: "Residential render insert, then straight back to geography.",
    frames: 81,
  },

  // ------------------------------------------------------------- VERDICT (522)
  {
    id: "should-you-buy",
    section: "verdict",
    text: "So should you buy?",
    action: "Everything strips away. Camera begins a long pull back.",
    frames: 54,
  },
  {
    id: "be-honest",
    section: "verdict",
    text: "Be honest about the numbers.",
    action: "Empty frame. Deliberate breathing room.",
    frames: 63,
  },
  {
    id: "yield",
    section: "verdict",
    text: "Yields here are the lowest of the five islands, around three and a half percent.",
    action: "~3.5% YIELD. Neutral, analytical, no alarm colour.",
    frames: 168,
  },
  {
    id: "growth",
    section: "verdict",
    text: "But prices rose twenty-one percent last year.",
    action: "Replaces cleanly with +21%. Restrained line trace.",
    frames: 90,
  },
  {
    id: "trophy",
    section: "verdict",
    text: "This is a trophy asset, not a rental play.",
    action: "Full island. Both districts soft. TROPHY ASSET.",
    frames: 147,
  },

  // ----------------------------------------------------------------- CTA (186)
  {
    id: "cta",
    section: "cta",
    text: "Comment SAADIYAT and I'll send you the Marsa launch details the day they drop.",
    action: "Clean Saadiyat composition. COMMENT SAADIYAT.",
    frames: 129,
  },
  {
    id: "hold",
    section: "cta",
    text: "",
    action: "Held end card. No bounce, no arrows.",
    frames: 57,
  },
];

export type TimedBeat = Beat & { start: number; end: number };

export const BEATS: readonly TimedBeat[] = (() => {
  let cursor = 0;
  return RAW.map((b) => {
    const timed = { ...b, start: cursor, end: cursor + b.frames };
    cursor += b.frames;
    return timed;
  });
})();

const INDEX = new Map(BEATS.map((b) => [b.id, b]));

/** Look up a beat. Throws loudly rather than silently animating at frame 0. */
export const beat = (id: string): TimedBeat => {
  const found = INDEX.get(id);
  if (!found) {
    throw new Error(`Unknown beat "${id}"`);
  }
  return found;
};

/** Frame the section starts on, and how long it runs. */
export const section = (id: SectionId) => {
  const inSection = BEATS.filter((b) => b.section === id);
  const start = inSection[0].start;
  const end = inSection[inSection.length - 1].end;
  return { start, end, frames: end - start };
};

export const TOTAL_FRAMES = BEATS[BEATS.length - 1].end;

/**
 * The single camera track for the whole reel.
 *
 * Every key is anchored to a beat, so re-timing the script automatically
 * re-times the camera. There is never a gap between keys, which is what keeps
 * the map permanently in motion.
 */
export const CAMERA_TRACK: readonly CameraKey[] = [
  // HOOK - start close and geographic, never on stock footage.
  { frame: 0, lng: 54.428, lat: 24.548, widthKm: 9.6, bearing: -50 },
  { frame: beat("that-is").start, lng: 54.4285, lat: 24.5492, widthKm: 9.1, bearing: -50.5 },
  { frame: beat("most-expensive").start, lng: 54.4262, lat: 24.5528, widthKm: 8.5, bearing: -51.5 },
  { frame: beat("marina-tease").start, lng: 54.4432, lat: 24.5562, widthKm: 9.2, bearing: -53 },

  // WHERE - orient, then compare, then commit to the corner.
  { frame: beat("this-is").start, lng: 54.4282, lat: 24.5492, widthKm: 9.7, bearing: -51 },
  { frame: beat("double-reem").start, lng: 54.4182, lat: 24.5318, widthKm: 14.5, bearing: -47 },
  { frame: beat("this-corner").start, lng: 54.3942, lat: 24.5372, widthKm: 5.2, bearing: -50 },

  // CULTURE - arrive, then walk the five museums. Never so close that the
  // coastline leaves frame: the moment it does, this stops being a map.
  { frame: beat("cultural-district").start, lng: 54.3935, lat: 24.5374, widthKm: 4.5, bearing: -50 },
  { frame: beat("louvre").start, lng: 54.3968, lat: 24.5344, widthKm: 4.4, bearing: -49 },
  { frame: beat("teamlab").start, lng: 54.3938, lat: 24.5368, widthKm: 4.1, bearing: -48 },
  { frame: beat("nhm").start, lng: 54.3912, lat: 24.539, widthKm: 4.1, bearing: -47 },
  { frame: beat("zayed").start, lng: 54.3948, lat: 24.5404, widthKm: 4.3, bearing: -46.5 },
  { frame: beat("guggenheim").start, lng: 54.3888, lat: 24.535, widthKm: 3.9, bearing: -46 },
  { frame: beat("five-museums").start, lng: 54.4042, lat: 24.5428, widthKm: 6.6, bearing: -48 },

  // MARSA - swing north, then work the site.
  { frame: beat("look-north").start, lng: 54.4348, lat: 24.5558, widthKm: 8.4, bearing: -51 },
  { frame: beat("empty-stretch").start, lng: 54.4512, lat: 24.5588, widthKm: 6.0, bearing: -53 },
  { frame: beat("hundred-billion").start, lng: 54.4518, lat: 24.5588, widthKm: 5.6, bearing: -54 },
  { frame: beat("area").start, lng: 54.4535, lat: 24.5594, widthKm: 6.7, bearing: -53 },
  { frame: beat("residents").start, lng: 54.4494, lat: 24.558, widthKm: 5.2, bearing: -52 },
  { frame: beat("marina").start, lng: 54.4618, lat: 24.5566, widthKm: 3.5, bearing: -50 },
  { frame: beat("amenities").start, lng: 54.4512, lat: 24.5574, widthKm: 6.5, bearing: -49 },
  { frame: beat("first-homes").start, lng: 54.4472, lat: 24.5582, widthKm: 5.4, bearing: -50 },

  // VERDICT - long, calm pull back. The map stops being a subject and becomes a stage.
  { frame: beat("should-you-buy").start, lng: 54.4312, lat: 24.5508, widthKm: 8.8, bearing: -52 },
  { frame: beat("yield").start, lng: 54.4285, lat: 24.5488, widthKm: 11, bearing: -50 },
  { frame: beat("growth").start, lng: 54.4285, lat: 24.5488, widthKm: 12, bearing: -49 },
  { frame: beat("trophy").start, lng: 54.4282, lat: 24.5492, widthKm: 13, bearing: -48 },

  // CTA - settle into the final composition, still drifting.
  { frame: beat("cta").start, lng: 54.4282, lat: 24.5492, widthKm: 11.4, bearing: -49 },
  { frame: TOTAL_FRAMES, lng: 54.4288, lat: 24.5495, widthKm: 11.1, bearing: -50 },
];
