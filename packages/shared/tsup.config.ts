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
  },
  clean: true,
  sourcemap: true,
  external: ['@vinejs/vine']
})
