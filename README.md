# My Data Guest Website

<div align="center">
  <img src="public/logo.png" alt="My Data Guest Logo" width="200">
</div>

![Content: CC BY-NC-ND 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--ND%204.0-orange)
![Code: Non-Commercial](https://img.shields.io/badge/Code-Non--Commercial-red)

My Data Guest Webpage - AI Without the Hype

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The website automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Automatic Deployment (Recommended)

1. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Your changes"
   ```

2. Push to the main branch:
   ```bash
   git push origin main
   ```

3. The GitHub Action will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages
   - The site will be available at your GitHub Pages URL

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

This publishes the `dist` folder to the `gh-pages` branch.

### Setup Requirements

- Repository name should be `my-data-guest` with `main` as the default branch
- GitHub Pages must be enabled in repository settings
- The site is configured with Vite `base: '/my-data-guest/'` for proper routing

## Licensing

This project uses dual licensing:

- **Content** (markdown, images, media): Licensed under CC BY-NC-ND 4.0
- **Code** (HTML, CSS, JS, build scripts): Licensed under Non-Commercial proprietary license

Commercial licensing is available upon request.
