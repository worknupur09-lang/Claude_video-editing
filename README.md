# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Video 4 — Saadiyat Island

An 80-second (2400 frame) 1080×1920 map-led reel, built line by line from the
script. Render it with:

```console
npx remotion render SaadiyatReel out/saadiyat-reel.mp4
```

Or open it in the Studio with `npm run dev`.

### Where things live

| File | What it controls |
| --- | --- |
| `src/reel/timeline.ts` | **The single source of truth.** Every line of the script with its duration and the one visual action it triggers, plus the whole camera track. Re-time a line here and the camera, graphics and inserts all follow. |
| `src/reel/geo.ts` | Real `[lng, lat]` geography — island outlines, districts, museum pins, the Marsa footprint. Plain arrays, so real GeoJSON drops straight in. |
| `src/reel/dialogue.ts` | The dialogue edit. One in/out point per line of the raw take; the reel assembles them at the timeline's beat timings. |
| `src/reel/assets.ts` | Filenames for the presenter footage and the twelve image slots. |
| `src/reel/sound.ts` | The three-level cue list. Seven level-3 story beats, and no cue on every text entrance. |
| `src/reel/theme.ts` | Colours, type scale, easings, layout zones. One visual system. |
| `public/README.md` | How to drop your footage and imagery in. |

### How the map works

There are no map tiles. The map is drawn from the coordinates in `geo.ts` and
projected live against a camera of `{lng, lat, widthKm, bearing}`, so the camera
can fly through it and every marker, boundary and image insert is positioned by
real geography rather than by hand.

The map is rotated about 50° (`bearing`). Saadiyat runs WSW–ENE, so with north
up it lands in a 9:16 frame as a thin strip with dead space above and below;
rotated, it runs corner to corner and fills the frame. A compass rose keeps the
viewer oriented.

One camera track covers all 2400 frames and is always interpolating between two
keyframes, plus a permanent sub-perceptual drift — so the map is never frozen.

### Before publishing

The geography in `geo.ts` is hand-authored and approximate. Replace the
**Marsa Al Saadiyat boundary** (currently a placeholder positioned north per the
script) and the **Cultural District boundary** with the official outlines, and
spot-check the five museum pins.

## Commands

**Install Dependencies**

```console
npm install
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Agent Skills

All 12 official [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) are installed in this
repository, so Claude Code (and other agents) know the Remotion conventions:

| Skill | Purpose |
| --- | --- |
| `/remotion-best-practices` | Router skill — use it when unsure which skill applies |
| `/remotion-create` | Create a new Remotion project or composition |
| `/remotion-markup` | Writing Remotion React markup: compositions, animations, layout, typography, media, audio, fonts, timing |
| `/remotion-studio` | Launch the Studio to preview a video |
| `/remotion-render` | Render a video or a still |
| `/remotion-maps` | Map animations: static maps, routes, markers, Mapbox/MapLibre/MapTiler, GeoJSON, CesiumJS |
| `/remotion-captions` | Captions and subtitles |
| `/remotion-saas` | Architecture for Remotion-powered apps and product integrations |
| `/remotion-interactivity` | Making code editable in the Studio |
| `/remotion-docs` | Search the Remotion docs and fetch pages as Markdown |
| `/remotion-upgrade` | Upgrade Remotion, related packages and the installed skills |
| `/remotion-multimedia` | Browser-based multimedia handling with Mediabunny |

They are installed in two places, both committed:

- `.claude/skills/` — read by Claude Code
- `.agents/skills/` — the canonical location, read by other agents and by
  `npx remotion skills update` / the Studio's outdated-skill check

`skills-lock.json` records the installed versions.

**Update the skills**

```console
npx remotion skills update
```

**Reinstall / add the skills for another agent**

```console
npx skills add remotion-dev/skills --skill '*' --agent <agent> -y
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
