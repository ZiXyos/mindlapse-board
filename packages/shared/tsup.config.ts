import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
      declaration: true,
      skipLibCheck: true
    }
  }, // Enable TypeScript declarations with fixed config
  clean: true,
  sourcemap: true,
  external: ['@vinejs/vine']
})