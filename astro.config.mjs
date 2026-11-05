import { defineConfig } from 'astro/config';
const target = process.env.KARI_DEV_PROXY_TARGET;
if (target) {
  const url = new URL(target);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid KARI_DEV_PROXY_TARGET.');
}
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'http://localhost:8080',
  vite: target ? { server: { proxy: { '/kari': { target, changeOrigin: false } } } } : {},
});
