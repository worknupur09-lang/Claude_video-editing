import React from "react";
import { AbsoluteFill } from "remotion";
import { COLOR } from "./theme";
import { BEATS } from "./timeline";
import { resolveCuts } from "./dialogue";
import { PRESENTER } from "./assets";

/**
 * A working still, not part of the reel.
 *
 * Open it in Studio after filling in CUTS in dialogue.ts. It lists every line
 * of the script with the slot it has in the timeline and how far your actual
 * source cut drifts from it, so you can see at a glance which lines need
 * trimming harder and which need the beat lengthened.
 */
export const CutReport: React.FC = () => {
  const cuts = resolveCuts();
  const byBeat = new Map(cuts.map((c) => [c.beat, c]));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080C12",
        fontFamily: "Inter",
        padding: 56,
        color: COLOR.white,
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.01em" }}>
        Dialogue edit — cut report
      </div>
      <div style={{ fontSize: 18, color: COLOR.muted, marginTop: 10, marginBottom: 26 }}>
        {PRESENTER.video
          ? `Source: ${PRESENTER.video} · ${cuts.length}/${BEATS.length} lines cut`
          : "No presenter footage set. Fill PRESENTER.video in assets.ts and CUTS in dialogue.ts."}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {BEATS.filter((b) => b.text).map((b) => {
          const cut = byBeat.get(b.id);
          const drift = cut?.drift ?? null;
          const bad = drift !== null && Math.abs(drift) > 6;

          return (
            <div
              key={b.id}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "baseline",
                fontSize: 15,
                paddingBlock: 5,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ width: 54, color: COLOR.mutedDim, fontVariantNumeric: "tabular-nums" }}>
                {b.start}
              </div>
              <div style={{ width: 128, color: COLOR.gold, fontWeight: 600 }}>{b.id}</div>
              <div style={{ flex: 1, color: COLOR.muted, lineHeight: 1.35 }}>{b.text}</div>
              <div style={{ width: 62, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {b.frames}f
              </div>
              <div
                style={{
                  width: 92,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  color: cut ? (bad ? "#E8A87C" : COLOR.neutral) : COLOR.mutedDim,
                }}
              >
                {cut ? `${drift! > 0 ? "+" : ""}${drift}f` : "—"}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
