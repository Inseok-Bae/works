import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const rootDir = resolve('.');
const artworksRootDir = join(rootDir, 'artworks');

function discoverArtworkSlugs() {
  if (!existsSync(artworksRootDir)) return [];
  return readdirSync(artworksRootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort();
}

function discoverPageInputs(slugs) {
  const input = {
    index: join(rootDir, 'index.html'),
  };

  for (const slug of slugs) {
    const pagePath = join(artworksRootDir, slug, 'index.html');
    if (existsSync(pagePath)) {
      input[`artworks/${slug}/index`] = pagePath;
    }
  }

  return input;
}

function discoverStaticCopyTargets(slugs) {
  const targets = [
    { src: 'shared/i18n/**/*', dest: 'i18n' },
    { src: 'README.md', dest: '.' },
  ];

  for (const slug of slugs) {
    const assetDir = join(artworksRootDir, slug, 'assets');
    if (existsSync(assetDir)) {
      targets.push({
        src: `artworks/${slug}/assets/**/*`,
        dest: `artworks/${slug}/assets`,
      });
    }
  }

  return targets;
}

function resolveBasePath() {
  const explicitBase = process.env.VITE_BASE_PATH?.trim();
  if (explicitBase) {
    let normalized = explicitBase;
    if (!normalized.startsWith('/')) normalized = `/${normalized}`;
    if (!normalized.endsWith('/')) normalized = `${normalized}/`;
    return normalized;
  }

  // Relative output keeps local preview and Pages subpaths consistent.
  return './';
}

const artworkSlugs = discoverArtworkSlugs();
const pageInputs = discoverPageInputs(artworkSlugs);
const staticCopyTargets = discoverStaticCopyTargets(artworkSlugs);
const outDir = process.env.VITE_OUT_DIR?.trim() || 'dist';

export default defineConfig({
  base: resolveBasePath(),
  build: {
    outDir,
    emptyOutDir: true,
    target: ['es2019'],
    sourcemap: false,
    rollupOptions: {
      input: pageInputs,
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('node_modules/chart.js')) return 'chart-stack';
          if (id.includes('node_modules/chartjs-adapter-date-fns')) return 'chart-stack';
          if (id.includes('node_modules/date-fns')) return 'chart-stack';
          if (id.includes('node_modules/mobx')) return 'mobx-stack';
          return undefined;
        },
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: staticCopyTargets,
    }),
  ],
});


