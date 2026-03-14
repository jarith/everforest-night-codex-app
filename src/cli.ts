import { resolve } from 'node:path'
import { themeConfigs } from './themes'
import { writeCompiledThemes } from './compiler'

const outputDir = resolve(process.cwd(), process.argv[2] ?? 'dist')

writeCompiledThemes(outputDir, themeConfigs).catch((error: unknown) => {
  console.error('Failed to compile Codex themes.')
  console.error(error)
  process.exitCode = 1
})
