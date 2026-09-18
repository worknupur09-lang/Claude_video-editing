# Assets for the Saadiyat reel

Everything the reel needs goes in this folder. Every slot is **optional** — until
you supply a file the reel renders a designed placeholder in its place, correctly
timed, so the edit is always viewable.

Wire each file up by putting its filename into `src/reel/assets.ts`.

---

## 1. Presenter footage

Put the raw take here, e.g. `presenter/saadiyat-take-01.mp4`, then:

```ts
// src/reel/assets.ts
export const PRESENTER = {
  video: "presenter/saadiyat-take-01.mp4",
  audio: null, // set if you have a separately cleaned voice track
};
```

Then cut it in `src/reel/dialogue.ts` — one in/out point per line of the script.
See that file's header for the method. Open the **CutReport** composition in
Studio to see which lines drift from their slot in the timeline.

Until `CUTS` is filled the presenter window shows a placeholder.

## 2. Imagery

Twelve slots, matching the brief's asset plan. Filenames are up to you — just
point `assets.ts` at them.

| Slot in `assets.ts` | What it needs | On screen |
| --- | --- | --- |
| `beachfront` | Saadiyat beachfront / premium residential aerial | 1.0s |
| `marsaTease` | Marsa Al Saadiyat masterplan render — tease only | 1.2s |
| `louvre` | Louvre Abu Dhabi — dome architecture | 0.9s |
| `teamlab` | teamLab Phenomena — building or installation | 0.8s |
| `nhm` | Natural History Museum — exterior render | 1.0s |
| `zayed` | Zayed National Museum — tower architecture | 0.9s |
| `guggenheim` | Guggenheim Abu Dhabi — architectural render | 1.3s |
| `marsaMasterplan` | Marsa Al Saadiyat masterplan | 1.8s |
| `marsaMarina` | 350-berth marina render | 2.0s |
| `marsaResidential` | Residential architecture render | 1.6s |
| `marsaPublicRealm` | Waterfront / public realm render | 1.4s |

Priority order, per the brief: real project imagery → official masterplan
imagery → real landmark imagery → architectural renders → aerials → contextual
b-roll. No generic Dubai/Abu Dhabi luxury stock, and no unrelated skyscrapers.

Supply images at 1000px wide or better; inserts render up to 520×340.

## 3. Sound

Optional. Fill in `src/reel/sound.ts` and the `MUSIC` block in `assets.ts`.

- **Level 1** — `MAP_TEXTURE`: a near-inaudible movement bed, looped under everything.
- **Level 2** — soft UI cues on marker and boundary activation (8 armed).
- **Level 3** — the seven story beats that are allowed a real sound: `AED 3,893`,
  Cultural District arrival, `AED 100B`, marina reveal, `+21%`, `TROPHY ASSET`, CTA.

There is deliberately **no cue on every text entrance**.

## 4. Fonts (already here)

`fonts/Inter-Variable-*.woff2` are committed so renders need no network and can
never silently fall back to a different typeface.

---

## Not in this folder

The map is not an image — it is drawn from real coordinates in
`src/reel/geo.ts` and projected live, so the camera can move through it. If you
want satellite imagery underneath it, drop a georeferenced export here and
composite it in `MapStage.tsx` beneath the vector layer.
