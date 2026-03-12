# 🚀 Hrisa Bourse - Production Deployment

## Live URLs

### Frontend (Vercel)
**Production URL:** https://hrisa-bourse-client.vercel.app

### Backend (Render)
**API URL:** https://hrisa-bourse-api.onrender.com
**Health Check:** https://hrisa-bourse-api.onrender.com/api/health

## Deployment Status

✅ **Frontend:** Successfully deployed on Vercel
✅ **Backend:** Successfully deployed on Render
✅ **Database:** PostgreSQL provisioned on Render
✅ **CORS:** Configured and working
✅ **Environment Variables:** Set up correctly

## Features Live

- ✅ Market Indices (TUNINDEX, TUNINDEX20)
- ✅ 41 Tunisian Companies across 6 sectors
- ✅ Real-time stock prices (demo data with realistic variations)
- ✅ Multi-language support (French, Arabic, English)
- ✅ Auto-refresh every 5 minutes
- ✅ Responsive design
- ✅ Professional BVMT-inspired dashboard

## Tech Stack

### Frontend
- **Platform:** Vercel
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Custom CSS with gradients
- **Deployment:** Auto-deploy from `main` branch

### Backend
- **Platform:** Render
- **Runtime:** Node.js 22.x
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 15
- **Region:** Frankfurt (closest to Tunisia)

## Environment Configuration

### Vercel (Frontend)
```
VITE_API_URL=https://hrisa-bourse-api.onrender.com/api
```

### Render (Backend)
```
NODE_ENV=production
PORT=10000
DATABASE_URL=(auto-configured by Render)
FRONTEND_URL=https://hrisa-bourse-client.vercel.app
```

## Deployment Date

**First Deployment:** March 12, 2026
**Latest Update:** March 12, 2026

## Continuous Deployment

Both platforms have automatic deployment enabled:
- **Push to `main` branch** → Auto-deploy to production
- **Vercel:** ~1-2 minutes build time
- **Render:** ~2-3 minutes build time

## Performance

### Render Free Tier Notes
⚠️ **Cold Start Warning:**
The backend spins down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds. Subsequent requests are fast.

**Recommendation for Production:**
Upgrade to Render Starter plan ($7/month) to eliminate cold starts.

## Monitoring

### Frontend (Vercel)
- Analytics: Available in Vercel dashboard
- Deployment logs: https://vercel.com/bahtas-projects/hrisa-bourse-client/deployments

### Backend (Render)
- Logs: https://dashboard.render.com/ → hrisa-bourse-api → Logs
- Metrics: Available in Render dashboard
- Health check: Monitored at `/api/health`

## Known Limitations

1. **Ollama AI:** Not available on Render free tier
   - Document analysis features disabled in production
   - Solution: Use cloud AI API (OpenAI, Anthropic) or upgrade Render plan

2. **Database Storage:** 256MB on free tier
   - Sufficient for demo and initial use
   - Upgrade if storing large amounts of financial data

3. **Cold Starts:** Backend spins down after 15 minutes
   - First request takes 30-60 seconds
   - Upgrade to paid plan to eliminate

## Maintenance

### Update Frontend
```bash
# Make changes in client/
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys in ~2 minutes
```

### Update Backend
```bash
# Make changes in server/
git add .
git commit -m "Update backend"
git push
# Render auto-deploys in ~3 minutes
```

### Update Environment Variables

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Update values
3. Redeploy

**Render:**
1. Go to Service → Environment
2. Update values
3. Auto-redeploys

## Support

- **Issues:** https://github.com/Mahdisellami/Hrisa-Bourse/issues
- **Documentation:** See DEPLOYMENT.md for detailed setup guide
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs

## Success Metrics

✅ Zero downtime deployment
✅ CORS properly configured
✅ All API endpoints responding
✅ Frontend-backend integration working
✅ Multi-language support active
✅ Professional dashboard UI live

---

**Deployed with ❤️ using Claude Code**
