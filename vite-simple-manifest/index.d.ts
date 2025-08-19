declare module 'vite-plugin-simple-manifest' {
  import { Plugin } from 'vite'

  /**
   * manifestPlugin generates a flat JS/CSS manifest for Vite builds.
   * @param outputFile - optional output file path (default: 'manifest.json')
   */
  export function manifestPlugin(outputFile?: string): Plugin
}