/**
 * Asset manifest.
 *
 * ---------------------------------------------------------------------------
 * HOW TO WIRE YOUR FOOTAGE IN
 * ---------------------------------------------------------------------------
 * Drop your files into `public/` (subfolders are fine) and put the filename in
 * the matching `file` field below. Every slot is optional: while `file` is
 * null the reel renders a designed placeholder in its place, so the edit is
 * always viewable and correctly timed.
 *
 * Slots are ordered the way the brief's asset plan lists them.
 * `seconds` is the on-screen duration the brief specifies for each insert.
 * ---------------------------------------------------------------------------
 */

export type AssetSlot = {
  id: string;
  /** Filename inside public/, or null until supplied. */
  file: string | null;
  /** What belongs here - shown on the placeholder so the edit stays readable. */
  brief: string;
  /** Intended on-screen duration in seconds, per the asset plan. */
  seconds: number;
};

const slot = (id: string, brief: string, seconds: number, file: string | null = null): AssetSlot => ({
  id,
  file,
  brief,
  seconds,
});

export const ASSETS: Record<string, AssetSlot> = {
  // ---- HOOK -------------------------------------------------------------
  beachfront: slot(
    "beachfront",
    "Saadiyat beachfront / premium residential aerial",
    1.0,
  ),
  marsaTease: slot("marsaTease", "Marsa Al Saadiyat masterplan render — tease only", 1.2),

  // ---- CULTURAL DISTRICT ------------------------------------------------
  louvre: slot("louvre", "Louvre Abu Dhabi — dome architecture", 0.9),
  teamlab: slot("teamlab", "teamLab Phenomena — building or installation", 0.8),
  nhm: slot("nhm", "Natural History Museum — exterior render", 1.0),
  zayed: slot("zayed", "Zayed National Museum — tower architecture", 0.9),
  guggenheim: slot("guggenheim", "Guggenheim Abu Dhabi — architectural render", 1.3),

  // ---- MARSA AL SAADIYAT ------------------------------------------------
  marsaMasterplan: slot("marsaMasterplan", "Marsa Al Saadiyat masterplan", 1.8),
  marsaMarina: slot("marsaMarina", "350-berth marina render", 2.0),
  marsaResidential: slot("marsaResidential", "Residential architecture render", 1.6),
  marsaPublicRealm: slot("marsaPublicRealm", "Waterfront / public realm render", 1.4),
};

/**
 * Presenter footage.
 *
 * `video` is the raw take. Leave it null and the reel renders the presenter
 * frame as a placeholder so you can still judge the layout and timing.
 */
export const PRESENTER = {
  /** e.g. "presenter/saadiyat-take-01.mp4" */
  video: null as string | null,
  /** Set if the cleaned voice track is a separate file. */
  audio: null as string | null,
} as const;

/** Optional music bed. Kept well under the voice. */
export const MUSIC = {
  file: null as string | null,
  volume: 0.12,
} as const;
