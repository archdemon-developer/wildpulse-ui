// vitest.config.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { mergeConfig, defineConfig as defineConfig2, configDefaults } from "file:///I:/Projects/frontend/wildpulse-ui/node_modules/vitest/dist/config.js";

// vite.config.ts
import { fileURLToPath, URL as URL2 } from "node:url";
import { defineConfig } from "file:///I:/Projects/frontend/wildpulse-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///I:/Projects/frontend/wildpulse-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///I:/Projects/frontend/wildpulse-ui/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///I:/Projects/frontend/wildpulse-ui/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL2("./src", __vite_injected_original_import_meta_url))
    }
  }
});

// vitest.config.ts
var __vite_injected_original_import_meta_url2 = "file:///I:/Projects/frontend/wildpulse-ui/vitest.config.ts";
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath2(new URL("./", __vite_injected_original_import_meta_url2)),
      coverage: {
        provider: "istanbul",
        exclude: [
          ...configDefaults.exclude,
          "e2e/**",
          "src/App.vue",
          "src/main.ts",
          "src/router/**",
          "**/*.eslintrc.cjs**",
          "**/*.spec.ts"
        ],
        reporter: ["json", "lcov", "text"]
      }
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkk6XFxcXFByb2plY3RzXFxcXGZyb250ZW5kXFxcXHdpbGRwdWxzZS11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSTpcXFxcUHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcd2lsZHB1bHNlLXVpXFxcXHZpdGVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0k6L1Byb2plY3RzL2Zyb250ZW5kL3dpbGRwdWxzZS11aS92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgeyBtZXJnZUNvbmZpZywgZGVmaW5lQ29uZmlnLCBjb25maWdEZWZhdWx0cyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnXHJcbmltcG9ydCB2aXRlQ29uZmlnIGZyb20gJy4vdml0ZS5jb25maWcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcclxuICB2aXRlQ29uZmlnLFxyXG4gIGRlZmluZUNvbmZpZyh7XHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ2UyZS8qKiddLFxyXG4gICAgICByb290OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsXHJcbiAgICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICAgLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSxcclxuICAgICAgICAgICdlMmUvKionLFxyXG4gICAgICAgICAgJ3NyYy9BcHAudnVlJyxcclxuICAgICAgICAgICdzcmMvbWFpbi50cycsXHJcbiAgICAgICAgICAnc3JjL3JvdXRlci8qKicsXHJcbiAgICAgICAgICAnKiovKi5lc2xpbnRyYy5janMqKicsXHJcbiAgICAgICAgICAnKiovKi5zcGVjLnRzJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcmVwb3J0ZXI6IFsnanNvbicsICdsY292JywgJ3RleHQnXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuKVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkk6XFxcXFByb2plY3RzXFxcXGZyb250ZW5kXFxcXHdpbGRwdWxzZS11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSTpcXFxcUHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcd2lsZHB1bHNlLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9JOi9Qcm9qZWN0cy9mcm9udGVuZC93aWxkcHVsc2UtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBWdWVEZXZUb29scygpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFTLGlCQUFBQSxzQkFBcUI7QUFDL1QsU0FBUyxhQUFhLGdCQUFBQyxlQUFjLHNCQUFzQjs7O0FDRG1PLFNBQVMsZUFBZSxPQUFBQyxZQUFXO0FBRWhVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUp5SixJQUFNLDJDQUEyQztBQU9sTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUlDLEtBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FEakJrTCxJQUFNQyw0Q0FBMkM7QUFJcE8sSUFBTyx3QkFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBQyxjQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsTUFDYixTQUFTLENBQUMsR0FBRyxlQUFlLFNBQVMsUUFBUTtBQUFBLE1BQzdDLE1BQU1DLGVBQWMsSUFBSSxJQUFJLE1BQU1GLHlDQUFlLENBQUM7QUFBQSxNQUNsRCxVQUFVO0FBQUEsUUFDUixVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsVUFDUCxHQUFHLGVBQWU7QUFBQSxVQUNsQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBVSxDQUFDLFFBQVEsUUFBUSxNQUFNO0FBQUEsTUFDbkM7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbImZpbGVVUkxUb1BhdGgiLCAiZGVmaW5lQ29uZmlnIiwgIlVSTCIsICJVUkwiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJkZWZpbmVDb25maWciLCAiZmlsZVVSTFRvUGF0aCJdCn0K
