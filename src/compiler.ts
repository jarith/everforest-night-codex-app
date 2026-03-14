import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { themeConfigs } from './themes'
import type { CodeThemeId, ThemeConfig, ThemeVariant } from './themes'

const shareStringPrefix = 'codex-theme-v1:'
const hexColorPattern = /^#[0-9a-f]{6}$/i
const supportedCodeThemeId = 'everforest'
const minimumContrastRatio = 4.5

export interface CompiledTheme {
  id: string
  label: string
  outputFile: string
  variant: ThemeVariant
  codeThemeId: CodeThemeId
  shareString: string
}

export interface CompiledManifest {
  themes: CompiledTheme[]
}

const assertHexColor = (value: string, field: string) => {
  if (!hexColorPattern.test(value))
    throw new Error(`Invalid ${field}: expected a 6-digit hex color.`)
}

const assertFont = (value: string | null, field: string) => {
  if (value !== null && typeof value !== 'string')
    throw new Error(`Invalid ${field}: expected a string or null.`)
}

const hexToRgbChannels = (hex: string) => {
  return [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
}

const toLinearChannel = (channel: number) => {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

const getRelativeLuminance = (hex: string) => {
  const [red = 0, green = 0, blue = 0] = hexToRgbChannels(hex).map(toLinearChannel)

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

const getContrastRatio = (foreground: string, background: string) => {
  const foregroundLuminance = getRelativeLuminance(foreground)
  const backgroundLuminance = getRelativeLuminance(background)
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

const assertMinimumContrast = (foreground: string, background: string, field: string) => {
  const ratio = getContrastRatio(foreground, background)

  if (ratio < minimumContrastRatio)
    throw new Error(`Invalid ${field}: expected at least ${minimumContrastRatio}:1 contrast against theme.surface, received ${ratio.toFixed(2)}:1.`)
}

export const validateThemeConfig = (config: ThemeConfig) => {
  if (config.codeThemeId !== supportedCodeThemeId)
    throw new Error(`Unsupported codeThemeId: ${config.codeThemeId}.`)

  assertHexColor(config.theme.accent, 'theme.accent')
  assertHexColor(config.theme.surface, 'theme.surface')
  assertHexColor(config.theme.ink, 'theme.ink')

  if (!Number.isInteger(config.theme.contrast) || config.theme.contrast < 0 || config.theme.contrast > 100)
    throw new Error('Invalid contrast: expected an integer from 0 to 100.')

  if (typeof config.theme.opaqueWindows !== 'boolean')
    throw new Error('Invalid opaqueWindows: expected a boolean.')

  if (!config.theme.semanticColors)
    throw new Error('theme.semanticColors is required.')

  assertHexColor(config.theme.semanticColors.diffAdded, 'theme.semanticColors.diffAdded')
  assertHexColor(config.theme.semanticColors.diffRemoved, 'theme.semanticColors.diffRemoved')
  assertHexColor(config.theme.semanticColors.skill, 'theme.semanticColors.skill')

  assertFont(config.theme.fonts.ui, 'theme.fonts.ui')
  assertFont(config.theme.fonts.code, 'theme.fonts.code')

  assertMinimumContrast(config.theme.ink, config.theme.surface, 'theme.ink')
  assertMinimumContrast(config.theme.accent, config.theme.surface, 'theme.accent')
  assertMinimumContrast(config.theme.semanticColors.skill, config.theme.surface, 'theme.semanticColors.skill')
  assertMinimumContrast(config.theme.semanticColors.diffAdded, config.theme.surface, 'theme.semanticColors.diffAdded')
  assertMinimumContrast(config.theme.semanticColors.diffRemoved, config.theme.surface, 'theme.semanticColors.diffRemoved')
}

export const compileTheme = (config: ThemeConfig): CompiledTheme => {
  validateThemeConfig(config)

  const payload = {
    codeThemeId: config.codeThemeId,
    variant: config.variant,
    theme: {
      accent: config.theme.accent,
      surface: config.theme.surface,
      ink: config.theme.ink,
      contrast: config.theme.contrast,
      opaqueWindows: config.theme.opaqueWindows,
      semanticColors: {
        diffAdded: config.theme.semanticColors.diffAdded,
        diffRemoved: config.theme.semanticColors.diffRemoved,
        skill: config.theme.semanticColors.skill,
      },
      fonts: {
        ui: config.theme.fonts.ui,
        code: config.theme.fonts.code,
      },
    },
  }

  return {
    id: config.id,
    label: config.label,
    outputFile: config.outputFile,
    variant: config.variant,
    codeThemeId: config.codeThemeId,
    shareString: `${shareStringPrefix}${JSON.stringify(payload)}`,
  }
}

export const compileAllThemes = (configs: readonly ThemeConfig[] = themeConfigs): CompiledTheme[] => {
  return configs.map((config) => compileTheme(config))
}

export const writeCompiledThemes = async (
  outputDir: string,
  configs: readonly ThemeConfig[] = themeConfigs,
): Promise<CompiledManifest> => {
  const manifest: CompiledManifest = {
    themes: compileAllThemes(configs),
  }

  await rm(outputDir, { recursive: true, force: true })
  await mkdir(outputDir, { recursive: true })

  await Promise.all([
    ...manifest.themes.map((theme) => writeFile(join(outputDir, theme.outputFile), theme.shareString)),
    writeFile(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`),
  ])

  return manifest
}
