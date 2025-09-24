export function manifestPlugin(outputFile = 'manifest.json') {
  return {
    name: 'vite-plugin-simple-manifest',
    generateBundle(options, bundle) {
      const manifest = {}
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && fileName.endsWith('.css')) {
          let baseName = fileName.replace('.css', '')
          if (baseName.includes('.')) baseName = baseName.replace(/\.[a-zA-Z0-9_-]+$/, '')
          manifest[baseName + '.css'] = fileName
        } else if (chunk.type === 'chunk' && fileName.endsWith('.js') && chunk.facadeModuleId && !/\.(css|scss|sass)$/.test(chunk.facadeModuleId)) {
          let baseName = fileName.replace('.js', '')
          if (baseName.includes('.')) baseName = baseName.replace(/\.[a-zA-Z0-9_-]+$/, '')
          const entryKey = baseName + '.js'
          if (entryKey.startsWith('js/')) { manifest[entryKey] = fileName } else {
            this.warn(`Skipping JS entry that does not start with "js/": ${chunk.fileName}`)
          }
        }
      }
      this.emitFile({
        type: 'asset',
        fileName: outputFile,
        source: JSON.stringify(manifest, null, 2)
      })
    }
  }
}