import React from 'react';

export default function TrustLogoBar() {
  const clientLogos = [
    { name: 'PT Pertamina (Persero)', src: '/media/clients/78a55-pertamina.png' },
    { name: 'PT PLN (Persero)', src: '/media/clients/58303-pln-persero.png' },
    { name: 'Telkomsel', src: '/media/clients/b5c3d-telkomsel-logo-capi.png' },
    { name: 'PT Wijaya Karya (WIKA)', src: '/media/clients/1bbc3-wika.png' },
    { name: 'PT Waskita Karya', src: '/media/clients/5147b-waskita.png' },
    { name: 'PT Unilever Indonesia', src: '/media/clients/83141-unilever.png' },
    { name: 'PT Antam Tbk', src: '/media/clients/78168-pt-antam.png' },
    { name: 'PT Petrokimia Gresik', src: '/media/clients/46e2f-petrokimia.png' },
    { name: 'PT Adaro Energy', src: '/media/clients/c306e-adaro.png' },
  ];

  return (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-8">
          DIPERCAYA OLEH 500+ PERUSAHAAN BUMN, MULTINASIONAL &amp; KONTRAKTOR K3
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {clientLogos.map((client, idx) => (
            <div key={idx} className="flex items-center justify-center h-10 w-28 sm:w-32 opacity-70 hover:opacity-100 transition-opacity">
              <img
                src={client.src}
                alt={client.name}
                className="max-h-8 sm:max-h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}