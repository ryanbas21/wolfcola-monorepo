/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  test: {
    typecheck: {
      tsconfig: './tsconfig.spec.json',
    },
  },
});
