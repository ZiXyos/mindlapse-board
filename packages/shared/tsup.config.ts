import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable for now - we'll handle types separately
  clean: true,
  sourcemap: true,
  external: ['@vinejs/vine']
})