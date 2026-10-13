import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages path, set by the deploy workflow (actions/configure-pages):
// "" on a custom domain, "/<repo-name>" on the default username.github.io address.
const basePath = process.env.BASE_PATH ?? "";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss()
  ],
  base: `${basePath}/`,
})
