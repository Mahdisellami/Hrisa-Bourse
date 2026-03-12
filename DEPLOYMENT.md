# Hrisa Bourse - Deployment Guide

This guide covers deploying the Hrisa Bourse application to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier works)
- Render account (free tier works)

## Backend Deployment (Render)

### 1. Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Click "New +" → "Blueprint"**

3. **Connect your GitHub repository**
   - Authorize Render to access your GitHub account
   - Select the `Hrisa-Bourse` repository

4. **Render will automatically detect the `render.yaml` file**
   - Service name: `hrisa-bourse-api`
   - Database: `hrisa-bourse-db` (PostgreSQL)
   - Region: Frankfurt (or closest to Tunisia)
   - Plan: Free

5. **Add Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-app.vercel.app
   ```

   Note: DATABASE_URL is automatically set by Render from the database connection

6. **Click "Apply"** - Render will:
   - Create the PostgreSQL database
   - Deploy the backend service
   - Provide you with a URL like: `https://hrisa-bourse-api.onrender.com`

### 2. Note Your Backend URL

Copy the backend URL (e.g., `https://hrisa-bourse-api.onrender.com`) - you'll need this for the frontend deployment.

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**
   - Select the `Hrisa-Bourse` repository
   - Vercel will auto-detect it's a Vite project

4. **Configure Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   VITE_API_URL=https://hrisa-bourse-api.onrender.com/api
   ```
   Replace with your actual Render backend URL from step 1

6. **Click "Deploy"**

### 2. Update Backend CORS

Once you have your Vercel URL (e.g., `https://hrisa-bourse.vercel.app`):

1. Go back to Render dashboard
2. Navigate to your `hrisa-bourse-api` service
3. Go to "Environment" tab
4. Update the `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=https://hrisa-bourse.vercel.app
   ```
5. Save - this will trigger a redeploy

## Post-Deployment Configuration

### Custom Domain (Optional)

#### Vercel:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

#### Render:
1. Go to your service settings
2. Navigate to "Custom Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Environment Updates

If you need to update environment variables later:

**Vercel:**
- Go to Project Settings → Environment Variables
- Update and redeploy

**Render:**
- Go to Service → Environment
- Update (automatic redeploy)

## Important Notes

### Render Free Tier Limitations

⚠️ **The free tier on Render spins down after 15 minutes of inactivity**
- First request after inactivity may take 30-60 seconds
- Subsequent requests will be fast
- Consider upgrading to a paid plan for production use

### Ollama AI Service

⚠️ **Ollama is not available on Render free tier**
- The AI document analysis features will not work in production
- Options:
  1. Disable AI features in production
  2. Use a cloud-based AI API (OpenAI, Anthropic Claude)
  3. Deploy Ollama separately on a different service
  4. Use Render paid tier with Docker support

### Database

- PostgreSQL database is automatically provisioned
- Connection string is auto-configured
- Free tier includes 256MB storage
- Upgrade if you need more storage

## Troubleshooting

### Build Failures

**Frontend:**
- Check that all dependencies are in `package.json`
- Verify the build command works locally
- Check environment variables are set

**Backend:**
- Ensure TypeScript compiles without errors
- Verify all imports use `.js` extensions
- Check that `dist` folder is generated correctly

### CORS Errors

If you see CORS errors:
1. Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
2. Check that `VITE_API_URL` in Vercel is correct
3. Ensure no trailing slashes in URLs

### Database Connection

If database connection fails:
- Check `DATABASE_URL` is set in Render
- Verify the database service is running
- Check database logs in Render dashboard

## Monitoring

### Vercel
- View deployment logs in Vercel dashboard
- Analytics available on Pro plan

### Render
- View service logs in Render dashboard
- Set up health check alerts
- Monitor database metrics

## Continuous Deployment

Both Vercel and Render support automatic deployments:

- **Push to main branch** → Automatic deployment
- **Pull requests** → Preview deployments (Vercel only)

## Cost Estimates

### Free Tier (Development/Demo)
- Vercel: Free
- Render: Free (with spin-down)
- PostgreSQL: Free (256MB)
- **Total: $0/month**

### Production Tier (Recommended)
- Vercel Pro: $20/month (optional)
- Render Starter: $7/month (no spin-down)
- PostgreSQL Starter: $7/month (1GB)
- **Total: ~$14-34/month**

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- GitHub Issues: https://github.com/Mahdisellami/Hrisa-Bourse/issues
