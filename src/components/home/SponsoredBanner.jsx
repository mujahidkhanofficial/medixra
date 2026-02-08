import React from 'react';

const SponsoredBanner = () => {
    return (
        <section className="py-8 bg-gray-50">
            <div className="container-base">
                <div className="w-full h-32 md:h-40 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden">
                    <span className="text-slate-400 font-semibold tracking-widest text-sm uppercase z-10">Sponsored Advertisement Space</span>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
                </div>
            </div>
        </section>
    );
};

export default SponsoredBanner;
