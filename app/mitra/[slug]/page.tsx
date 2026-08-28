import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Users, 
  BookOpen, 
  Sparkles, 
  Quote, 
  Layers, 
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import mitraData from '@/content/global/mitra.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const mitraList = mitraData as any[];
  return mitraList.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = (mitraData as any[]).find((item) => item.slug === slug);
  if (!m) return {};
  
  const pageTitle = `Pelatihan K3 & Portofolio Corporate Training ${m.name} | PENA Consultant`;
  const pageDesc = m.cooperation_summary || `Program pembinaan keselamatan kerja, sertifikasi Kemnaker RI & BNSP, dan in-house training untuk karyawan ${m.name}.`;
  const pageUrl = `https://penaconsultant.com/mitra/${slug}`;
  
  return {
    alternates: { canonical: pageUrl },
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: 'PENA Consultant',
      locale: 'id_ID',
      type: 'website',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
  };
}

export default async function MitraSlugPage({ params }: Props) {
  const { slug } = await params;
  const m = (mitraData as any[]).find((item) => item.slug === slug);
  if (!m) notFound();

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Mitra & Klien', url: 'https://penaconsultant.com/mitra' },
    { name: m.name, url: `https://penaconsultant.com/mitra/${m.slug}` },
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Portofolio Pelatihan K3 & Kemitraan Strategis: ${m.name}`,
    description: m.cooperation_summary,
    author: {
      '@type': 'Organization',
      name: 'PENA Consultant',
      url: 'https://penaconsultant.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PENA Consultant',
      url: 'https://penaconsultant.com'
    }
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/mitra" className="hover:text-blue-600 transition-colors">Mitra &amp; Klien</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{m.name}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-50 text-blue-800 font-bold text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" /> {m.sector || 'Korporasi Nasional'}
            </span>
            {m.cooperation_period && (
              <span className="bg-emerald-50 text-emerald-800 font-semibold text-xs px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {m.cooperation_period}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
            Rekam Jejak Kemitraan K3: {m.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            {m.cooperation_summary || `PT PENA Consultant bangga telah dipercaya oleh ${m.name} dalam penyelenggaraan program pembinaan K3, sertifikasi kompetensi tenaga kerja, dan audit kepatuhan keselamatan industri.`}
          </p>

          {/* Quick Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Metode Pelaksanaan:</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" /> {m.delivery_method || 'In-House Onsite & Hybrid Training'}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status Kemitraan:</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Mitra Resmi Terverifikasi Kemnaker &amp; BNSP
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/6281296870884?text=Halo%20PENA%20Consultant,%20saya%20tertarik%20konsultasi%20In-House%20Training%20K3%20seperti%20program%20di%20${encodeURIComponent(m.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> Konsultasi Sesi In-House Serupa (WhatsApp)
            </a>
          </div>
        </div>

        {/* Company Profile Context */}
        {m.profile?.blocks && m.profile.blocks.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> Profil Operasional &amp; Kebutuhan Industri
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {m.profile.blocks.map((block: any, bIdx: number) => {
                if (block.type === 'paragraph') {
                  return <p key={bIdx}>{block.data?.text}</p>;
                }
                if (block.type === 'citation') {
                  return (
                    <div key={bIdx} className="p-3 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-lg text-blue-900 text-xs italic">
                      &ldquo;{block.data?.text}&rdquo; <span className="font-bold not-italic block mt-1 text-slate-500">— {block.data?.source}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Training Programs Delivered */}
        {m.training_delivered && m.training_delivered.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> Program Pembinaan &amp; Sertifikasi yang Dilaksanakan
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {m.training_delivered.map((t: any, idx: number) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {t.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {t.year && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {t.year}
                        </span>
                      )}
                      {t.participants && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                          <Users className="w-3 h-3" /> {t.participants}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience & Challenges */}
        {m.experience_and_challenges && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Dinamika Lapangan &amp; Pengalaman Pelatihan
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {m.experience_and_challenges}
            </p>
          </div>
        )}

        {/* Key Achievements */}
        {m.key_achievements && m.key_achievements.length > 0 && (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-black text-emerald-950 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> Dampak Nyata &amp; Pencapaian Keselamatan
            </h2>
            <ul className="space-y-2.5">
              {m.key_achievements.map((ach: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonial */}
        {m.testimonial && (
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
            <Quote className="w-16 h-16 text-white/10 absolute right-4 bottom-4 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-sm sm:text-base font-medium leading-relaxed italic mb-4">
                &ldquo;{m.testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-white/15 pt-3">
                <span className="text-xs sm:text-sm font-bold text-white block">{m.testimonial.author}</span>
                <span className="text-xs text-blue-300 block">{m.testimonial.position}</span>
              </div>
            </div>
          </div>
        )}

        {/* Relevant Offerings */}
        {m.relevant_offering_slugs && m.relevant_offering_slugs.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3">
              Program Sertifikasi Terkait yang Digunakan:
            </h3>
            <div className="flex flex-wrap gap-2">
              {m.relevant_offering_slugs.map((progSlug: string, idx: number) => (
                <Link
                  key={idx}
                  href={['jembatan-skpi-sertifikasi-profesi-bnsp', 'budaya-kerja-industri-5s-dan-k3-siswa-smk'].includes(progSlug) ? `/edukasi/${progSlug}` : `/pelatihan/${progSlug}`}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-xs font-bold text-slate-800 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span className="capitalize">{progSlug.replace(/-/g, ' ')}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Corporate Quote Form */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
              LAYANAN IN-HOUSE TRAINING
            </span>
            <h2 className="text-2xl font-black text-slate-900">Ingin Mengadakan Pelatihan Serupa di Perusahaan Anda?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Dapatkan proposal silabus kustom, jadwal fleksibel, dan penawaran investasi khusus korporasi.
            </p>
          </div>
          <CorporateQuoteForm defaultProgram={`In-House Training K3 (Ref: ${m.name})`} />
        </div>
      </div>
    </>
  );
}