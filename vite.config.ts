import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import type { UserConfig as VitestUserConfig } from "vitest/config"

export default defineConfig({
	plugins: [react()],
	// @ts-ignore
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
	},
} as VitestUserConfig)
