import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const assetsRoot = path.join(projectRoot, 'public', 'assets')

const allowedExtensions = new Set(['.png', '.jpg', '.jpeg'])
const skipBasenames = new Set(['logo.png', 'logoIOS.png'])

const bytesToMb = (value) => (value / (1024 * 1024)).toFixed(2)

const normalizePath = (value) => value.replaceAll('\\', '/')

const getPreset = (absoluteFilepath) => {
  const normalized = normalizePath(absoluteFilepath)
  const basename = path.basename(absoluteFilepath).toLowerCase()

  if (normalized.includes('/assets/banners/')) {
    return { width: 1600, height: 800, fit: 'cover', quality: 76 }
  }

  if (basename === 'productoampliado.png') {
    return { width: 1600, height: 1000, fit: 'inside', quality: 80 }
  }

  if (basename === 'producto.png') {
    return { width: 1200, height: 900, fit: 'inside', quality: 78 }
  }

  if (basename === 'brand-board.jpeg') {
    return { width: 1200, height: 900, fit: 'inside', quality: 74 }
  }

  return { width: 1400, height: 1400, fit: 'inside', quality: 76 }
}

const collectImageFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name)
      if (entry.isDirectory()) return collectImageFiles(absolutePath)
      if (!entry.isFile()) return []
      const extension = path.extname(entry.name).toLowerCase()
      if (!allowedExtensions.has(extension)) return []
      if (skipBasenames.has(entry.name)) return []
      if (entry.name.toLowerCase().endsWith('.webp')) return []
      return [absolutePath]
    }),
  )
  return files.flat()
}

const optimizeImageFile = async (sourcePath) => {
  const outputPath = sourcePath.replace(/\.(png|jpe?g)$/i, '.webp')
  const preset = getPreset(sourcePath)
  const sourceStats = await fs.stat(sourcePath)

  let pipeline = sharp(sourcePath).rotate()

  if (preset.fit === 'cover') {
    pipeline = pipeline.resize(preset.width, preset.height, {
      fit: 'cover',
      position: 'attention',
      withoutEnlargement: true,
    })
  } else {
    pipeline = pipeline.resize(preset.width, preset.height, {
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  await pipeline
    .webp({
      quality: preset.quality,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(outputPath)

  const outputStats = await fs.stat(outputPath)
  return {
    sourcePath,
    outputPath,
    sourceBytes: sourceStats.size,
    outputBytes: outputStats.size,
  }
}

const run = async () => {
  const sourceFiles = await collectImageFiles(assetsRoot)
  if (sourceFiles.length === 0) {
    console.log('No image files found to optimize.')
    return
  }

  let totalSourceBytes = 0
  let totalOutputBytes = 0
  const results = []

  for (const sourceFile of sourceFiles) {
    const result = await optimizeImageFile(sourceFile)
    totalSourceBytes += result.sourceBytes
    totalOutputBytes += result.outputBytes
    results.push(result)
    const relativeIn = normalizePath(path.relative(projectRoot, result.sourcePath))
    const relativeOut = normalizePath(path.relative(projectRoot, result.outputPath))
    console.log(
      `${relativeIn} -> ${relativeOut} (${bytesToMb(result.sourceBytes)} MB -> ${bytesToMb(
        result.outputBytes,
      )} MB)`,
    )
  }

  const savedBytes = totalSourceBytes - totalOutputBytes
  const savedPercent =
    totalSourceBytes > 0 ? ((savedBytes / totalSourceBytes) * 100).toFixed(2) : '0.00'

  console.log('\nOptimization summary:')
  console.log(`Processed files: ${results.length}`)
  console.log(`Original size: ${bytesToMb(totalSourceBytes)} MB`)
  console.log(`Optimized size: ${bytesToMb(totalOutputBytes)} MB`)
  console.log(`Saved: ${bytesToMb(savedBytes)} MB (${savedPercent}%)`)
}

run().catch((error) => {
  console.error('Image optimization failed:', error)
  process.exitCode = 1
})
