# PENA Consultant — Official Web Platform (Next.js 16 SSG)

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://penaconsultant.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Pages Generated](https://img.shields.io/badge/SSG%20Pages-509%20Pages-blue?style=for-the-badge)](https://penaconsultant.com)

Official high-performance static website for **PENA Consultant** (PJK3 Resmi Kemnaker RI & Tempat Uji Kompetensi BNSP).

---

## 📁 Architecture Overview
* `app/`: Next.js App Router (Pages, Layouts, Server Components).
* `components/`: Modular React components (Navbar, Footer, JsonLd, OfferingCard, StructuredContent, CorporateQuoteForm).
* `content/`: 1-File-Per-Slug Flat-File JSON database:
  * `programs/`: 73 Official K3 Certification Programs.
  * `articles/`: 328 Knowledge & SEO Pillar Guides.
  * `locations/`: 23 City Branch & TUK Location Hubs.
  * `industries/`: 15 Specialized Sector K3 Hubs.
  * `batches/`: 60 Batch Schedule Offerings.
  * `global/`: Testimonials, FAQs, Mitra & Case Studies.
* `lib/`: Server data loaders (`lib/data.ts`) & Client Types (`lib/types.ts`).
* `public/`: Brand assets, Kemnaker/BNSP badges, client logos, and WebP media.

---

## 🔒 Deployment & Production
* Production Domain: `penaconsultant.com`
* Backup/Fallback Repository: `C:\Users\ASUS\Pictures\pena_platform` (Intact Laravel project)