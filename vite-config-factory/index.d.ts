import type { UserConfigExport } from 'vite'

export interface ViteConfigFactoryOptions {
  outDir?: string
  manifestFile?: string
}

/**
 * Create a reusable Vite config with a given entry object and options.
 *
 * @param entries An object mapping entry names to file paths
 * @param options Optional build options
 * @returns A Vite config export
 */
export declare function createViteConfig(
  entries: Record<string, string>,
  options?: ViteConfigFactoryOptions
): UserConfigExport