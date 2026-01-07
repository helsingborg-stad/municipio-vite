import { defineConfig } from 'vite'
import { resolve } from 'path'
import { manifestPlugin } from 'vite-plugin-simple-manifest'
import react from '@vitejs/plugin-react'

export function createViteConfig(entries, options = {}) {
  const { outDir = 'dist', manifestFile = 'manifest.json' } = options

  return defineConfig(({ mode }) => {
    const isProduction = mode === 'production'

    return {
      build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
          input: entries,
          output: {
            entryFileNames: isProduction ? '[name].[hash].js' : '[name].js',
            chunkFileNames: isProduction ? '[name].[hash].js' : '[name].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                return isProduction ? '[name].[hash].css' : '[name].css'
              }
              return 'assets/[name].[hash].[ext]'
            }
          }
        },
        minify: isProduction ? 'esbuild' : false,
        sourcemap: true
      },
      esbuild: {
        keepNames: true,
        minifyIdentifiers: false
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            includePaths: ['node_modules', 'source'],
            importers: [
              {
                findFileUrl(url) {
                  if (url.startsWith('~')) {
                    return new URL(
                      url.slice(1),
                      new URL('../node_modules/', import.meta.url)
                    )
                  }
                  return null
                }
              }
            ]
          }
        }
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
        alias: {
          '~': resolve(process.cwd(), 'node_modules')
        }
      },
      plugins: [manifestPlugin(manifestFile), react()]
    }
  })
}