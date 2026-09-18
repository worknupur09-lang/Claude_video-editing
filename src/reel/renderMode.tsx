import React, { createContext, useContext } from "react";

/**
 * Render modes for the reel.
 *
 *   "full"       the finished piece - map, presenter, inserts, grade
 *   "text-only"  the typography alone over chroma green, for keying
 *
 * Both modes run the exact same section components off the exact same
 * timeline, so a keyed text layer lines up frame for frame with the full
 * render. Nothing is re-timed or re-positioned for the green screen version -
 * it is the same composition with the picture layers switched off.
 */
export type RenderMode = "full" | "text-only";

/** Standard chroma green. Nothing in the palette goes near it. */
export const CHROMA_GREEN = "#00FF00";

const RenderModeContext = createContext<RenderMode>("full");

export const RenderModeProvider: React.FC<{
  mode: RenderMode;
  children: React.ReactNode;
}> = ({ mode, children }) => (
  <RenderModeContext.Provider value={mode}>{children}</RenderModeContext.Provider>
);

export const useRenderMode = (): RenderMode => useContext(RenderModeContext);

export const useIsTextOnly = (): boolean => useRenderMode() === "text-only";
