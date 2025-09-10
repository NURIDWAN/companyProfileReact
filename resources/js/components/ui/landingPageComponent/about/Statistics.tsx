import React from 'react';

type StatItemProps = {
    value: string;
    label: string;
};

const StatItem = ({ value, label }: StatItemProps) => (
    <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg">
        <h3 className="text-4xl font-bold">{value}</h3>
        <p className="opacity-80 mt-1">{label}</p>
    </div>
);

const StatItemSmall = ({ value, label }: StatItemProps) => (
    <div className="text-center">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="opacity-80 text-sm mt-1">{label}</p>
    </div>
);

const StatisticsSection = () => (
    <section className="py-20 bg-gray-800 text-white" style={{ background: 'linear-gradient(to right, #4f46e5, #818cf8)'}}>
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <span className="text-white font-semibold bg-white/20 px-3 py-1 rounded-full text-sm">Pencapaian Kami</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4">Angka Berbicara</h2>
                <p className="mt-2 max-w-3xl mx-auto opacity-80">
                    Bukti nyata dedikasi dan kepercayaan klien yang telah memilih kami sebagai partner teknologi.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem value="500+" label="Proyek Selesai" />
                <StatItem value="200+" label="Klien Puas" />
                <StatItem value="8+" label="Tahun Pengalaman" />
                <StatItem value="50+" label="Tim Profesional" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/20">
                <StatItemSmall value="99.9%" label="Uptime Server" />
                <StatItemSmall value="24/7" label="Support System" />
                <StatItemSmall value="100%" label="Garansi Uang Kembali" />
            </div>
        </div>
    </section>
);

export default StatisticsSection;