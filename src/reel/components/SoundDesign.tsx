import React from "react";
import { Sequence, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { CUES, MAP_TEXTURE } from "../sound";
import { MUSIC, PRESENTER } from "../assets";
import { TOTAL_FRAMES } from "../timeline";

/** Head and tail of the fade applied to both beds. */
const BED_FADE = [0, 30, TOTAL_FRAMES - 60, TOTAL_FRAMES];

/**
 * Audio assembly.
 *
 * Voice sits on top, music well under it, level-1 map texture under that, and
 * the cue layer fires only where sound.ts says it may. Every source is optional
 * so the reel renders silent until real audio is supplied.
 *
 * The presenter's own audio comes from the <Video> in Presenter.tsx unless a
 * separately cleaned voice track is set, in which case that wins.
 */
export const SoundDesign: React.FC = () => (
  <>
    {PRESENTER.audio ? (
      <Audio src={staticFile(PRESENTER.audio)} volume={1} />
    ) : null}

    {MAP_TEXTURE.file ? (
      <Sequence
        durationInFrames={TOTAL_FRAMES}
        layout="none"
        name="Sound / map texture"
      >
        <Audio
          src={staticFile(MAP_TEXTURE.file)}
          volume={(f) =>
            interpolate(
              f,
              BED_FADE,
              [0, MAP_TEXTURE.volume, MAP_TEXTURE.volume, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )
          }
          loop
        />
      </Sequence>
    ) : null}

    {MUSIC.file ? (
      <Sequence
        durationInFrames={TOTAL_FRAMES}
        layout="none"
        name="Sound / music bed"
      >
        <Audio
          src={staticFile(MUSIC.file)}
          volume={(f) =>
            interpolate(f, BED_FADE, [0, MUSIC.volume, MUSIC.volume, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
          loop
        />
      </Sequence>
    ) : null}

    {CUES.filter((c) => c.file).map((c) => (
      <Sequence
        key={c.id}
        from={Math.max(0, c.frame)}
        layout="none"
        name={`Sfx L${c.level} / ${c.id}`}
      >
        <Audio src={staticFile(c.file as string)} volume={() => c.volume} />
      </Sequence>
    ))}
  </>
);
