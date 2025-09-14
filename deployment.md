# Deployment Guide

## Step-by-Step Vercel Deployment

### 1. Prepare Your GitHub Repository

```bash
# Create a new repository on GitHub (e.g., monte-carlo-sensitivity-analysis)
# Clone it locally
git clone https://github.com/thelucenguyen/monte-carlo-sensitivity-analysis.git
cd monte-carlo-sensitivity-analysis

# Copy all the project files into this directory
# (package.json, app/, next.config.js, etc.)

# Initialize and push
git add .
git commit -m "Initial commit: Monte Carlo Sensitivity Analysis app"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# ? Set up and deploy "~/monte-carlo-sensitivity-analysis"? Y
# ? Which scope do you want to deploy to? [Your Username]
# ? Link to existing project? N
# ? What's your project's name? monte-carlo-sensitivity-analysis
# ? In which directory is your code located? ./
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### 3. Custom Domain (Optional)

```bash
# Add custom domain via CLI
vercel domains add yourdomain.com

# Or via dashboard:
# 1. Go to your project dashboard
# 2. Click "Settings" → "Domains"
# 3. Add your domain
# 4. Configure DNS records as shown
```

### 4. Environment Variables (If Needed)

```bash
# Add environment variables
vercel env add VARIABLE_NAME

# Or via dashboard:
# Project Settings → Environment Variables
```

## File Structure Checklist

Ensure you have all these files in your repository:

```
monte-carlo-sensitivity-analysis/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── .gitignore
├── README.md
└── DEPLOYMENT.md
```

## Verification Steps

1. **Local Development**: Run `npm run dev` and verify app works at `http://localhost:3000`
2. **Build Test**: Run `npm run build` to ensure production build succeeds
3. **Deployment**: Check your Vercel deployment URL
4. **Functionality**: Test the Monte Carlo simulation on the deployed version

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Next.js version compatibility

### Common Issues
1. **TypeScript errors**: Check `tsconfig.json` configuration
2. **Missing dependencies**: Verify all imports are properly installed
3. **Static export issues**: Ensure `next.config.js` has correct export configuration

## Performance Optimization

### For Production
```javascript
// next.config.js additions
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add these for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    optimizeCss: true
  }
}
```

### Bundle Analysis
```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to package.json scripts
"analyze": "cross-env ANALYZE=true next build"

# Run analysis
npm run analyze
```

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix automatically if possible
npm audit fix
```

### Monitoring
- Set up Vercel Analytics in dashboard
- Monitor Core Web Vitals
- Track simulation performance metrics
