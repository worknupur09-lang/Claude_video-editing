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
