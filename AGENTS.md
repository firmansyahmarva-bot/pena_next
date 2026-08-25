# 🔒 CRITICAL SYSTEM INSTRUCTIONS FOR ALL AI AGENTS & DEVELOPERS

## 🌐 PRODUCTION STATUS: LIVE
- **Domain**: `penaconsultant.com` (and `pena-next-bice.vercel.app`)
- **Framework**: Next.js 16 (Turbopack, Static Site Generation - SSG)
- **Deployment Remote**: `https://github.com/firmansyahmarva-bot/pena_next.git` (Branch: `main`)
- **Hosting**: Vercel Global Edge CDN

---

## ⚠️ STRICT RULES FOR AI AGENTS:

1. **LIVE PRODUCTION LOCK**:
   - Every push to branch `main` triggers an automatic production build and deployment to `penaconsultant.com`.
   - **MANDATORY**: Before running `git push`, you MUST run `npm run build` locally and ensure all 509+ static pages build with **zero errors (Exit Code 0)**.

2. **PRESERVED CONTENT INTEGRITY**:
   - Do NOT delete, truncate, or overwrite files in `content/` without explicit instructions.
   - All 73 programs, 328 articles, 23 locations, 15 industries, and 60 batches must maintain their structured schema.

3. **STANDALONE LARAVEL BACKUP**:
   - The directory `C:\Users\ASUS\Pictures\pena_platform` is the intact, preserved Laravel system.
   - **DO NOT TOUCH, MODIFY, OR OVERWRITE** anything inside `pena_platform`. It serves as the fallback/backup in case of any Next.js rollback needs.

4. **ENVIRONMENT & TAILWIND RULES**:
   - Styling uses Tailwind CSS v4 `@theme` tokens in `app/globals.css`.
   - Server-only loaders (`fs`, `path`) must stay in `lib/data.ts`. Client components must only import types from `lib/types.ts`.