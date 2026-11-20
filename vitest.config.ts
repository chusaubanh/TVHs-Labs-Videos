import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/integrations/runtime-environment.ts"],
    exclude: [...configDefaults.exclude, ".research/**", "output/**", ".cache/**", "scripts/editor/test/**"],
  },
});
