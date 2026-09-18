import { Easing } from "remotion";

/**
 * Single visual system for the Saadiyat reel.
 *
 * Everything (map, type, markers, inserts) reads from here so the whole piece
 * looks like one motion designer built it, not several.
 */

export const CANVAS = {
  width: 1080,
  height: 1920,
  fps: 30,
  /** 2400 frames = 80.0s, inside the 75-82s target. */
  durationInFrames: 2400,
} as const;

export const COLOR = {
  /** Sea / base. Deep, desaturated navy so gold reads as the only accent. */
  seaDeep: "#03070D",
  seaMid: "#071320",
  seaEdge: "#0C2135",

  /** Land. */
  land: "#151C24",
  landHigh: "#1D2733",
  landEdge: "#33424F",

  /** The one accent: Saadiyat sand / gold. */
  gold: "#D9B36C",
  goldBright: "#F2D9A6",
  goldDim: "#8A7448",

  /** Secondary, used only for the Marsa masterplan (reads as "blueprint / future"). */
  plan: "#7FB4C9",
  planDim: "#3E5F70",

  /** Type. */
  white: "#F6F3EC",
  muted: "#8D9CAB",
  mutedDim: "#5A6875",

  /** Neutral analytical tone for the verdict numbers - deliberately not red/green. */
  neutral: "#C3CDD6",
} as const;

export const FONT = {
  family: "Inter",
} as const;

/**
 * Layout zones. The presenter owns the top-left, the map owns the middle,
 * type owns the lower third. Nothing overlaps.
 */
export const LAYOUT = {
  margin: 72,

  presenter: {
    x: 52,
    y: 64,
    width: 286,
    height: 381,
    radius: 22,
  },

  /** Where the map should put the thing it wants you to look at. */
  focus: {
    x: 0.55,
    y: 0.46,
  },

  /** Lower-third type block. */
  copy: {
    top: 1268,
    left: 72,
    right: 72,
  },
} as const;

/**
 * Easings. No overshoot anywhere - the brief explicitly rules it out.
 * Long deceleration is what makes motion read as expensive.
 */
export const EASE = {
  /** Default entrance: fast out of the gate, very long settle. */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** For exits - slightly quicker so nothing lingers. */
  in: Easing.bezier(0.7, 0, 0.84, 0),
  /** Symmetric, for cross-fades and replacements. */
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  /** Camera: gentle accelerate, very long decelerate, never overshoots. */
  camera: Easing.bezier(0.42, 0, 0.16, 1),
  /** Mask / wipe progression. */
  wipe: Easing.bezier(0.33, 1, 0.68, 1),
} as const;

export const TYPE = {
  /** Huge headline figure (AED 3,893 / AED 100B). */
  stat: {
    fontSize: 148,
    fontWeight: 800,
    letterSpacing: "-0.035em",
    lineHeight: 0.92,
  },
  statSmall: {
    fontSize: 104,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 0.96,
  },
  /** Small gold label above a figure. Enters 3 frames before the figure. */
  kicker: {
    fontSize: 25,
    fontWeight: 600,
    letterSpacing: "0.26em",
    textTransform: "uppercase" as const,
  },
  /** Under-figure qualifier. */
  sub: {
    fontSize: 31,
    fontWeight: 500,
    letterSpacing: "0.01em",
  },
  /** Map marker labels. */
  marker: {
    fontSize: 27,
    fontWeight: 600,
    letterSpacing: "0.03em",
  },
  markerMeta: {
    fontSize: 21,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  },
} as const;

/** The kicker leads the figure by 3 frames. Small, but it is what sells it. */
export const KICKER_LEAD = 3;
