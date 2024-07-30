// vite.config.ts
import { defineConfig } from "file:///home/ryan/programming/wolfcola/node_modules/.pnpm/vite@5.3.5_@types+node@22.0.0/node_modules/vite/dist/node/index.js";
import dts from "file:///home/ryan/programming/wolfcola/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.0.0_rollup@4.19.1_typescript@5.5.4_vite@5.3.5_@types+node@22.0.0_/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  root: "./",
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es"]
    },
    outDir: "./dist"
  },
  test: {
    typecheck: {
      tsconfig: "./tsconfig.spec.json"
    }
  },
  plugins: [dts({ rollupTypes: true })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9yeWFuL3Byb2dyYW1taW5nL3dvbGZjb2xhL3BhY2thZ2VzL3JlcXVlc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3J5YW4vcHJvZ3JhbW1pbmcvd29sZmNvbGEvcGFja2FnZXMvcmVxdWVzdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9yeWFuL3Byb2dyYW1taW5nL3dvbGZjb2xhL3BhY2thZ2VzL3JlcXVlc3Qvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGUvY2xpZW50XCIgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6ICcuLycsXG4gIFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICcuL3NyYy9pbmRleC50cycsXG4gICAgICBmaWxlTmFtZTogJ2luZGV4JyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXVxuICAgIH0sXG4gICAgb3V0RGlyOiAnLi9kaXN0J1xuICB9LFxuICB0ZXN0OiB7XG4gICAgdHlwZWNoZWNrOiB7XG4gICAgICB0c2NvbmZpZzogJy4vdHNjb25maWcuc3BlYy5qc29uJyxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbZHRzKHsgcm9sbHVwVHlwZXM6IHRydWUgfSldLFxufSk7XG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFFaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
