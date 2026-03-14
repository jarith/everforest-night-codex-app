# 🌲 Everforest Night for Codex App

A green-based theme for Codex App, designed to stay warm and readable during long coding sessions

### Everforest Night Dark

![Everforest Night Dark](screenshots/everforest-night-dark.jpeg)

### Everforest Night Light

![Everforest Night Light](screenshots/everforest-night-light.jpeg)

## Installation

### Dark theme

1. Open **Settings** → **Appearance**.
2. Switch the toggler to **Dark**.
3. Pick **Everforest**.
4. Click **Import** and paste the following string:

```
codex-theme-v1:{"codeThemeId":"everforest","variant":"dark","theme":{"accent":"#a7c080","surface":"#323d43","ink":"#d8caac","contrast":42,"opaqueWindows":true,"semanticColors":{"diffAdded":"#7eb18c","diffRemoved":"#d09a8e","skill":"#86bfb7"},"fonts":{"ui":null,"code":null}}}
```

### Light theme

1. Open **Settings** → **Appearance**.
2. Switch the toggler to **Light**.
3. Pick **Everforest**.
4. Click **Import** and paste the following string:

```
codex-theme-v1:{"codeThemeId":"everforest","variant":"light","theme":{"accent":"#47661b","surface":"#f3ebd2","ink":"#4f5b62","contrast":38,"opaqueWindows":true,"semanticColors":{"diffAdded":"#46725d","diffRemoved":"#9c5656","skill":"#2e7099"},"fonts":{"ui":null,"code":null}}}
```

## Color Palette

### Dark

| Token        | Hex       | Preview                                                       |
| ------------ | --------- | ------------------------------------------------------------- |
| Accent       | `#a7c080` | ![](https://img.shields.io/badge/-_-a7c080?style=flat-square) |
| Surface      | `#323d43` | ![](https://img.shields.io/badge/-_-323d43?style=flat-square) |
| Ink          | `#d8caac` | ![](https://img.shields.io/badge/-_-d8caac?style=flat-square) |
| Diff Added   | `#7eb18c` | ![](https://img.shields.io/badge/-_-7eb18c?style=flat-square) |
| Diff Removed | `#d09a8e` | ![](https://img.shields.io/badge/-_-d09a8e?style=flat-square) |
| Skill        | `#86bfb7` | ![](https://img.shields.io/badge/-_-86bfb7?style=flat-square) |

### Light

| Token        | Hex       | Preview                                                       |
| ------------ | --------- | ------------------------------------------------------------- |
| Accent       | `#47661b` | ![](https://img.shields.io/badge/-_-47661b?style=flat-square) |
| Surface      | `#f3ebd2` | ![](https://img.shields.io/badge/-_-f3ebd2?style=flat-square) |
| Ink          | `#4f5b62` | ![](https://img.shields.io/badge/-_-4f5b62?style=flat-square) |
| Diff Added   | `#46725d` | ![](https://img.shields.io/badge/-_-46725d?style=flat-square) |
| Diff Removed | `#9c5656` | ![](https://img.shields.io/badge/-_-9c5656?style=flat-square) |
| Skill        | `#2e7099` | ![](https://img.shields.io/badge/-_-2e7099?style=flat-square) |

## Build locally

### Requirements

- Node `24.9.0`
- Yarn `4.10.3`

### Install

```sh
yarn install
```

### Compile

```sh
yarn build
```

It writes the artifacts to `dist/`:

- `dist/everforest-night-dark.txt`
- `dist/everforest-night-light.txt`
- `dist/manifest.json`

## Acknowledgments

Inspired by [Forest Night](https://github.com/jef/forest-night-jetbrains) by [@jef](https://github.com/jef) and [Everforest](https://github.com/sainnhe/everforest-vscode) by [@sainnhe](https://github.com/sainnhe)

## License

[MIT](LICENSE)
