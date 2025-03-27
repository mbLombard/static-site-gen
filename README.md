# static-site-gen

static-site-gen is a drop‑in Jekyll alternative built with TypeScript & Node — no Ruby required.

## Install

```bash
npm install static-site-gen
```

Running this command will:
- Install the `static-site-gen` CLI
- Add default scripts to your `package.json`
- Generate a GitHub Actions workflow for automatic deployment

## Scripts

The following scripts are automatically added to your `package.json`:

```json
"scripts": {
  "dev": "static-site-gen -dev",
  "build": "static-site-gen -build",
  "start": "static-site-gen -start",
  "deploy": "static-site-gen -deploy"
}
```

### Run in development mode

```bash
npm run dev
```

Serves your site locally with hot reload on file changes.

### Run in production mode

```bash
npm run start
```

Builds a static copy of your site into the `build/` directory and serves it locally.

### Build

```bash
npm run build
```

Generates a static copy of your site into the `build/` directory.

### Deploy

```bash
npm run deploy
```

Builds the site, pushes the contents of `build/` to the `gh-pages` branch, and deploys to GitHub Pages.

## About

static-site-gen was created to give JavaScript developers a fast, zero‑dependency static site generator—eliminating Ruby install hassles while providing an easy migration path from Jekyll.


