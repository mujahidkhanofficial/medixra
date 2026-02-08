
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/undraw_medicine_hqqg.svg';

const HomeHero = () => {
    return (
        <section className="relative w-full bg-[#0096D6] py-16 md:py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="container-base relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                                Equip Your <br className="hidden lg:block" /> Medical Facility
                            </h1>
                            <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0">
                                Pakistan's largest B2B marketplace for new & refurbished medical equipment.
                            </p>
                        </div>
                    </div>

                    {/* Right Image (Hidden on mobile) */}
                    <div className="hidden lg:flex flex-col items-center justify-end relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-3xl transform scale-110"></div>

                        {/* Image */}
                        <img
                            src={heroImage}
                            alt="Medical Professionals"
                            className="relative z-10 w-full max-w-md h-auto drop-shadow-xl"
                        />

                        {/* Realistic Contact Shadow */}
                        <div className="w-[80%] h-8 bg-black/20 blur-xl rounded-[100%] -mt-6 relative z-0"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeHero;
