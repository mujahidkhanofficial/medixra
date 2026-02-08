import React from 'react';
import {
    Stethoscope,
    Microscope,
    Activity,
    Scissors,
    Armchair,
    Pipette,
    Bed,
    Monitor
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
    { name: 'Imaging & Radiology', icon: Activity },
    { name: 'Surgical Instruments', icon: Scissors },
    { name: 'Laboratory Equip.', icon: Microscope },
    { name: 'Dental Equipment', icon: Armchair },
    { name: 'Patient Monitors', icon: Monitor },
    { name: 'Hospital Furniture', icon: Bed },
    { name: 'Consumables & PPE', icon: Pipette },
    { name: 'General Practice', icon: Stethoscope },
];

const CategoryGrid = () => {
    return (
        <section className="py-12 bg-gray-50/50">
            <div className="container-base">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#0096D6] rounded-full"></span>
                    Browse by Category
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <Card
                                key={idx}
                                className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 bg-white group"
                            >
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full space-y-3">
                                    <div className="p-3 rounded-full bg-blue-50 text-[#0096D6] group-hover:bg-[#0096D6] group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-[#0096D6] transition-colors">
                                        {cat.name}
                                    </span>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
