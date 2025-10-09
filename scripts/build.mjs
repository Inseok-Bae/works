import { build, context } from 'esbuild';
import {
  rmSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  statSync,
  existsSync,
  watch as fsWatch,
} from 'node:fs';
import { join, resolve } from 'node:path';
import fs from 'node:fs/promises';

const root = resolve('.');
const outDir = join(root, 'docs');

function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function copyIfExists(src, dest) {
  if (existsSync(src)) {
    mkdirSync(join(dest, '..'), { recursive: true });
    copyFileSync(src, dest);
  }
}

function copyDirectory(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const from = join(src, entry);
    const to = join(dest, entry);
    if (isDirectory(from)) {
      copyDirectory(from, to);
    } else {
      copyFileSync(from, to);
    }
  }
}

function discoverEntries() {
  const found = {};
  for (const entry of readdirSync(root)) {
    const abs = join(root, entry);
    if (!isDirectory(abs)) continue;
    if (entry === 'node_modules' || entry === 'docs' || entry.startsWith('.')) continue;
    const candidate = join(abs, 'index.js');
    if (existsSync(candidate)) {
      found[`${entry}/index`] = candidate;
    }
  }
  return found;
}

async function copyStatics(entries) {
  for (const key of Object.keys(entries)) {
    const folder = key.split('/')[0];
    const srcFolder = join(root, folder);
    const outFolder = join(outDir, folder);
    mkdirSync(outFolder, { recursive: true });
    copyIfExists(join(srcFolder, 'index.html'), join(outFolder, 'index.html'));
    copyIfExists(join(srcFolder, 'styles.css'), join(outFolder, 'styles.css'));
  }
  copyIfExists(join(root, 'index.html'), join(outDir, 'index.html'));
  copyDirectory(join(root, 'style'), join(outDir, 'style'));
}

const rawPlugin = {
  name: 'raw-import',
  setup(build) {
    // 1) ?raw import 경로 해석
    build.onResolve({ filter: /\?raw$/ }, (args) => {
      const noQuery = args.path.replace(/\?raw$/, '');
      return {
        path: join(args.resolveDir, noQuery),
        namespace: 'raw-file',
      };
    });

    // 2) 실제 파일 로드 → 문자열로
    build.onLoad({ filter: /.*/, namespace: 'raw-file' }, async (args) => {
      const contents = await fs.readFile(args.path, 'utf8');
      return { contents, loader: 'text' };
    });
  },
};

async function run({ watch }) {
  const entries = discoverEntries();

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const common = {
    entryPoints: entries,
    bundle: true,
    platform: 'browser',
    format: 'esm',
    outdir: outDir,
    splitting: true,
    sourcemap: true,
    minify: false,
    target: ['es2019'],
    treeShaking: true,
    chunkNames: 'chunks/[name]-[hash]',
    plugins: [rawPlugin],
  };

  if (watch) {
    const ctx = await context(common);
    await copyStatics(entries);
    await ctx.watch();
    console.log('Watching for changes...');

    // Watch static files per folder
    fsWatch(root, { recursive: true }, async (event, filename) => {
      if (!filename) return;
      if (
        filename.startsWith('node_modules') ||
        filename.startsWith('docs') ||
        filename.startsWith('.')
      )
        return;
      if (filename.startsWith('style')) {
        copyDirectory(join(root, 'style'), join(outDir, 'style'));
        console.log('Style updated:', filename);
        return;
      }
      if (filename.endsWith('index.html') || filename.endsWith('styles.css')) {
        await copyStatics(entries);
        console.log('Static updated:', filename);
        // Force browser refresh by touching a file that live-server watches
        const { writeFileSync, readFileSync } = await import('node:fs');
        const refreshFile = join(outDir, 'refresh.txt');
        try {
          const current = readFileSync(refreshFile, 'utf8');
          writeFileSync(refreshFile, (parseInt(current) || 0) + 1 + '');
        } catch {
          writeFileSync(refreshFile, '1');
        }
      }
    });
  } else {
    await build(common);
    await copyStatics(entries);
    console.log('Build complete →', outDir);
  }
}

const watch = process.argv.includes('--watch') || process.env.WATCH === '1';
run({ watch }).catch((err) => {
  console.error(err);
  process.exit(1);
});
