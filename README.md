# Portfolio Website

Personal portfolio website built with React, Vite, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run serve
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm serve` | Preview on port 3000 |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm deploy` | Deploy to GitHub Pages |

## Deploying to GitHub Pages

### Option 1: Automated (GitHub Actions)

1. Push your code to the `master` branch
2. Go to your repository Settings > Pages
3. Under "Build and deployment", select **GitHub Actions**
4. The site will auto-deploy on every push to `master`

### Option 2: Manual

```bash
# Build and deploy to gh-pages branch
pnpm run deploy
```

Then in your repository Settings > Pages, set the source to the `gh-pages` branch.

### Custom Domain

If using a custom domain (e.g., `3zrv.com`):

1. Create a `public/CNAME` file with your domain:
   ```
   3zrv.com
   ```

2. Update `vite.config.ts` to use `/` as base:
   ```ts
   base: '/',
   ```

3. Configure DNS with your domain provider to point to GitHub Pages
