import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Briefcase, Building, Clock, DollarSign, MapPin } from 'lucide-react';
import React from 'react';

// TYPE DEFINITION: Mendefinisikan struktur objek untuk lowongan pekerjaan
type Job = {
    id: number;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract'; // Menggunakan union type untuk nilai spesifik
    salary: string;
    posted: string;
    description: string;
    requirements: string[];
    experience: string;
};

// DATA: Sample job listings data dengan tipe yang jelas
const jobListings: Job[] = [
    {
        id: 1,
        title: 'Frontend Developer',
        department: 'Technology',
        location: 'Jakarta, Indonesia',
        type: 'Full-time',
        salary: 'Rp 8-12 juta',
        posted: '2 hari yang lalu',
        description:
            'Kami mencari Frontend Developer yang berpengalaman dengan React.js dan TypeScript untuk bergabung dengan tim pengembangan kami.',
        requirements: ['React.js', 'TypeScript', 'Tailwind CSS', 'Git'],
        experience: '2-4 tahun',
    },
    {
        id: 2,
        title: 'Digital Marketing Specialist',
        department: 'Marketing',
        location: 'Remote',
        type: 'Full-time',
        salary: 'Rp 6-10 juta',
        posted: '5 hari yang lalu',
        description: 'Bergabunglah dengan tim marketing digital kami untuk mengembangkan strategi pemasaran online yang inovatif.',
        requirements: ['Google Ads', 'Facebook Ads', 'SEO/SEM', 'Analytics'],
        experience: '1-3 tahun',
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Bandung, Indonesia',
        type: 'Contract',
        salary: 'Rp 7-11 juta',
        posted: '1 minggu yang lalu',
        description: 'Mencari desainer UI/UX kreatif untuk merancang pengalaman pengguna yang luar biasa.',
        requirements: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        experience: '2-5 tahun',
    },
    {
        id: 4,
        title: 'Backend Developer',
        department: 'Technology',
        location: 'Jakarta, Indonesia',
        type: 'Full-time',
        salary: 'Rp 10-15 juta',
        posted: '3 hari yang lalu',
        description: 'Bergabung dengan tim backend untuk membangun sistem yang scalable dan reliable.',
        requirements: ['Node.js', 'Python', 'Database', 'API Development'],
        experience: '3-6 tahun',
    },
    {
        id: 5,
        title: 'Project Manager',
        department: 'Management',
        location: 'Jakarta, Indonesia',
        type: 'Full-time',
        salary: 'Rp 12-18 juta',
        posted: '1 hari yang lalu',
        description: 'Memimpin dan mengelola proyek-proyek teknologi dari tahap planning hingga deployment.',
        requirements: ['Agile/Scrum', 'Leadership', 'Communication', 'Planning'],
        experience: '4-7 tahun',
    },
    {
        id: 6,
        title: 'Content Writer',
        department: 'Marketing',
        location: 'Remote',
        type: 'Part-time',
        salary: 'Rp 3-6 juta',
        posted: '4 hari yang lalu',
        description: 'Membuat konten berkualitas untuk website, blog, dan social media perusahaan.',
        requirements: ['SEO Writing', 'Content Strategy', 'Social Media', 'Research'],
        experience: '1-3 tahun',
    },
];

// SUB-KOMPONEN 1: Page Header
function PageHeader() {
    return (
        <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Bergabung Bersama Kami</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Temukan peluang karir yang menarik dan kembangkan potensi Anda bersama tim profesional kami. Kami mencari talenta terbaik untuk
                bergabung dalam perjalanan inovasi teknologi.
            </p>
        </div>
    );
}

// SUB-KOMPONEN 2: Benefits Section
function BenefitsSection() {
    return (
        <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Building className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold">Lingkungan Kerja Modern</h3>
                <p className="text-sm text-gray-600">Workspace yang nyaman dengan teknologi terdepan</p>
            </Card>
            <Card className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold">Kompensasi Kompetitif</h3>
                <p className="text-sm text-gray-600">Gaji menarik dengan benefit lengkap</p>
            </Card>
            <Card className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold">Pengembangan Karir</h3>
                <p className="text-sm text-gray-600">Program training dan jenjang karir yang jelas</p>
            </Card>
        </div>
    );
}

// PROPS TYPE untuk JobCard
type JobCardProps = {
    job: Job;
};

// SUB-KOMPONEN 3: Job Card (Item Lowongan) dengan props yang di-type
function JobCard({ job }: JobCardProps) {
    return (
        <Card className="transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
                        <CardDescription className="mt-2 flex flex-wrap items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.posted}
                            </span>
                            <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.experience}
                            </span>
                        </CardDescription>
                    </div>
                    <div className="ml-4 text-right">
                        <Badge variant="secondary" className="mb-2">
                            {job.type}
                        </Badge>
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4 leading-relaxed text-gray-600">{job.description}</p>
                <div className="mb-4">
                    <h4 className="mb-2 font-medium text-gray-900">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req) => (
                            <Badge key={req} variant="outline" className="text-xs">
                                {req}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Lamar Sekarang
                    </Button>
                    <Button variant="outline">Lihat Detail</Button>
                </div>
            </CardContent>
        </Card>
    );
}

// PROPS TYPE untuk JobList
type JobListProps = {
    jobs: Job[];
};

// SUB-KOMPONEN 4: Job List (Daftar Lowongan) dengan props yang di-type
function JobList({ jobs }: JobListProps) {
    return (
        <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Posisi yang Tersedia</h2>
            <div className="grid gap-6">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
}

// SUB-KOMPONEN 5: Call to Action
function CallToAction() {
    return (
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-center my-4 text-white">
            <CardContent className="space-y-4">
                <h2 className="text-2xl font-bold">Tidak Menemukan Posisi yang Cocok?</h2>
                <p className="text-blue-100">
                    Kirimkan CV Anda kepada kami. Kami akan menghubungi ketika ada posisi yang sesuai dengan keahlian Anda.
                </p>
                <Button variant="secondary" size="lg">
                    Kirim CV Spontan
                </Button>
            </CardContent>
        </Card>
    );
}

// KOMPONEN UTAMA (Default Export)
export default function CareerPage(): React.ReactElement {
    return (
        <LandingPageLayout>
                <div className="mt-10 mb-20 container mx-auto px-4 md:px-6 lg:px-8">
                <BenefitsSection />

                <JobList jobs={jobListings} />

                <CallToAction />
        </div>
            </LandingPageLayout>
    );
}
