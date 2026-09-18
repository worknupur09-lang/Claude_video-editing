import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Inter, bundled locally rather than pulled from the Google Fonts CDN.
 *
 * Renders then need no network at all, which means they are reproducible, they
 * work on a locked-down render machine, and a CDN hiccup can never silently
 * ship a frame in a fallback typeface.
 *
 * These are the variable Inter subsets (latin + latin-ext), so one file covers
 * every weight the reel uses.
 */

export const FONT_FAMILY = "Inter";

await Promise.all([
  loadFont({
    family: FONT_FAMILY,
    url: staticFile("fonts/Inter-Variable-latin.woff2"),
    weight: "100 900",
    display: "block",
  }),
  loadFont({
    family: FONT_FAMILY,
    url: staticFile("fonts/Inter-Variable-latin-ext.woff2"),
    weight: "100 900",
    display: "block",
  }),
]);
