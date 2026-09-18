import { interpolate } from "remotion";
import { noise2D } from "@remotion/noise";
import { CANVAS, EASE, LAYOUT } from "./theme";
import type { LngLat, Ring } from "./geo";

/**
 * Camera + projection.
 *
 * The whole reel shares ONE camera track. It is always interpolating between
 * two keyframes, so the map is never frozen - which is what makes the piece
 * read as a single continuous animation rather than a stack of scenes.
 */

export type Camera = {
  lng: number;
  lat: number;
  /** Viewport width in kilometres. Smaller = closer. */
  widthKm: number;
  /**
   * Map rotation in degrees. Negative turns the map anticlockwise.
   *
   * This matters more than it sounds. Saadiyat runs WSW-ENE, about 10 degrees
   * off horizontal, so with north up it lands in a 9:16 frame as a thin strip
   * across the middle with dead space above and below. At roughly -50 degrees
   * the island runs corner to corner instead and fills the frame. A compass
   * rose keeps the viewer oriented.
   */
  bearing: number;
};

export type CameraKey = Camera & { frame: number };

const M_PER_DEG_LAT = 110574;
const metersPerDegLng = (lat: number) => 111320 * Math.cos((lat * Math.PI) / 180);

/** Where on the canvas the camera centre lands. Biased clear of the presenter box. */
const FOCUS_X = LAYOUT.focus.x * CANVAS.width;
const FOCUS_Y = LAYOUT.focus.y * CANVAS.height;

/**
 * Resolve the camera at a given frame.
 *
 * Zoom is interpolated in log space: a move from 4km to 16km should feel like
 * the same amount of travel as 16km to 64km. Linear zoom lurches.
 */
export const cameraAt = (frame: number, track: readonly CameraKey[]): Camera => {
  if (track.length === 0) {
    throw new Error("Camera track is empty");
  }
  if (frame <= track[0].frame) {
    return withDrift(track[0], frame);
  }
  const last = track[track.length - 1];
  if (frame >= last.frame) {
    return withDrift(last, frame);
  }

  let i = 0;
  while (i < track.length - 1 && track[i + 1].frame <= frame) {
    i++;
  }
  const a = track[i];
  const b = track[i + 1];

  const t = interpolate(frame, [a.frame, b.frame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.camera,
  });

  return withDrift(
    {
      lng: a.lng + (b.lng - a.lng) * t,
      lat: a.lat + (b.lat - a.lat) * t,
      widthKm: Math.exp(Math.log(a.widthKm) + (Math.log(b.widthKm) - Math.log(a.widthKm)) * t),
      bearing: a.bearing + (b.bearing - a.bearing) * t,
    },
    frame,
  );
};

/**
 * A permanent, barely-perceptible drift so the map is alive even on a hold.
 * Amplitude scales with zoom, so it reads the same at every altitude.
 */
const withDrift = (cam: Camera, frame: number): Camera => {
  const amount = cam.widthKm * 0.0018;
  return {
    lng: cam.lng + noise2D("cam-lng", frame * 0.0042, 0) * amount * 0.01,
    lat: cam.lat + noise2D("cam-lat", frame * 0.0037, 0) * amount * 0.009,
    widthKm: cam.widthKm * (1 + noise2D("cam-z", frame * 0.0029, 0) * 0.004),
    bearing: cam.bearing + noise2D("cam-b", frame * 0.0024, 0) * 0.35,
  };
};

export type Projector = {
  /** [lng, lat] -> canvas pixels. */
  project: (p: LngLat) => readonly [number, number];
  /** SVG path `d` for a closed ring. */
  ring: (r: Ring) => string;
  /** SVG path `d` for an open line. */
  line: (r: Ring) => string;
  /** Metres -> pixels, for sizing things that should scale with the map. */
  scale: (metres: number) => number;
  camera: Camera;
};

export const makeProjector = (camera: Camera): Projector => {
  const pxPerMetre = CANVAS.width / (camera.widthKm * 1000);
  const mPerDegLng = metersPerDegLng(camera.lat);
  const theta = (camera.bearing * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);

  const project = (p: LngLat) => {
    // Offset from the camera centre, in metres, then rotated by the bearing.
    const dx = (p[0] - camera.lng) * mPerDegLng;
    const dy = (p[1] - camera.lat) * M_PER_DEG_LAT;
    const rx = dx * cos + dy * sin;
    const ry = -dx * sin + dy * cos;
    return [FOCUS_X + rx * pxPerMetre, FOCUS_Y - ry * pxPerMetre] as const;
  };

  const toPath = (r: Ring, close: boolean) => {
    if (r.length === 0) {
      return "";
    }
    const d = r
      .map((p, i) => {
        const [x, y] = project(p);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
    return close ? `${d} Z` : d;
  };

  return {
    project,
    ring: (r) => toPath(r, true),
    line: (r) => toPath(r, false),
    scale: (metres) => metres * pxPerMetre,
    camera,
  };
};

/** Approximate centroid of a ring, for anchoring labels and inserts. */
export const centroid = (r: Ring): LngLat => {
  const sum = r.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]] as [number, number], [0, 0]);
  return [sum[0] / r.length, sum[1] / r.length];
};
