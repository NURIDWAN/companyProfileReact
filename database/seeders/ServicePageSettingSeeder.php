<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class ServicePageSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'service.hero' => [
                'heading' => 'Solusi Bisnis Terintegrasi untuk',
                'subheading' => 'Kami mendampingi perusahaan dari berbagai sektor untuk meningkatkan efisiensi operasional, kualitas layanan, dan kesiapan pertumbuhan berkelanjutan.',
                'highlight' => 'Pertumbuhan Berkelanjutan',
                'primary_label' => 'Lihat Layanan',
                'primary_link' => '/service',
                'secondary_label' => 'Diskusikan Kebutuhan',
                'secondary_link' => '/contact',
                'background_image' => 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop',
            ],
            'service.summary' => [
                'badge' => 'Portofolio Layanan',
                'heading' => 'Solusi yang Kami Tawarkan',
                'description' => 'Pendekatan menyeluruh yang menggabungkan konsultasi bisnis, optimalisasi proses, dan implementasi program perubahan di lapangan.',
            ],
            'service.offerings' => [
                'badge' => 'Layanan Kami',
                'heading' => 'Apa yang Kami Tawarkan',
                'description' => 'Rangkaian layanan fleksibel yang dapat disesuaikan untuk perusahaan jasa, manufaktur, pendidikan, kesehatan, energi, dan sektor publik.',
                'items' => [
                    [
                        'title' => 'Konsultasi Transformasi Digital',
                        'description' => 'Menyusun peta jalan digital, tata kelola data, hingga penguatan kapabilitas teknologi internal.',
                        'icon' => 'Layers',
                    ],
                    [
                        'title' => 'Pengembangan Solusi Kustom',
                        'description' => 'Mendesain dan membangun solusi aplikasi yang terintegrasi dengan proses bisnis inti.',
                        'icon' => 'Code',
                    ],
                    [
                        'title' => 'Operasional & Managed Service',
                        'description' => 'Mendampingi pengoperasian harian, command center, dan monitoring kinerja multi lokasi.',
                        'icon' => 'Workflow',
                    ],
                    [
                        'title' => 'Program Perubahan Organisasi',
                        'description' => 'Mengelola change management, coaching pimpinan, dan pelatihan adopsi teknologi.',
                        'icon' => 'Users',
                    ],
                ],
            ],
            'service.tech_stack' => [
                'heading' => 'Kompetensi Utama Kami',
                'description' => 'Tim lintas disiplin dengan keahlian strategi bisnis, operasional, pemasaran, pengelolaan perubahan, hingga digital enablement.',
                'items' => [
                    [
                        'name' => 'Operational Excellence',
                        'logo' => null,
                        'icon' => 'Workflow',
                    ],
                    [
                        'name' => 'Customer Experience Design',
                        'logo' => null,
                        'icon' => 'LayoutTemplate',
                    ],
                    [
                        'name' => 'Supply Chain Optimisation',
                        'logo' => null,
                        'icon' => 'Package',
                    ],
                    [
                        'name' => 'People & Change Management',
                        'logo' => null,
                        'icon' => 'Users',
                    ],
                    [
                        'name' => 'Business Intelligence & Reporting',
                        'logo' => null,
                        'icon' => 'Activity',
                    ],
                    [
                        'name' => 'Service Quality Improvement',
                        'logo' => null,
                        'icon' => 'LineChart',
                    ],
                    [
                        'name' => 'Digital Enablement',
                        'logo' => null,
                        'icon' => 'CircuitBoard',
                    ],
                    [
                        'name' => 'Sustainability Programme Advisory',
                        'logo' => null,
                        'icon' => 'Leaf',
                    ],
                ],
            ],
            'service.process' => [
                'badge' => 'Metodologi Kami',
                'heading' => 'Proses Kerja Kami',
                'description' => null,
                'items' => [
                    [
                        'step' => '01',
                        'title' => 'Diagnosa Bisnis',
                        'description' => 'Menggali tantangan utama dan prioritas strategis bersama pemangku kepentingan lintas fungsi.',
                        'icon' => 'Search',
                    ],
                    [
                        'step' => '02',
                        'title' => 'Perancangan Solusi',
                        'description' => 'Menyusun inisiatif, indikator keberhasilan, dan rencana implementasi bertahap.',
                        'icon' => 'LayoutTemplate',
                    ],
                    [
                        'step' => '03',
                        'title' => 'Eksekusi & Pilot',
                        'description' => 'Mengawal implementasi, melakukan uji coba terkontrol, dan menyesuaikan dengan kondisi lapangan.',
                        'icon' => 'Code',
                    ],
                    [
                        'step' => '04',
                        'title' => 'Adopsi & Optimasi',
                        'description' => 'Mengukur hasil, memperkuat kapabilitas tim internal, dan memastikan keberlanjutan program.',
                        'icon' => 'Rocket',
                    ],
                ],
            ],
            'service.advantages' => [
                'badge' => 'Keunggulan Kami',
                'heading' => 'Mengapa Memilih Kami?',
                'description' => null,
                'items' => [
                    [
                        'title' => 'Tim Lintas Industri',
                        'description' => 'Konsultan dengan pengalaman memimpin proyek di sektor manufaktur, jasa, energi, kesehatan, dan publik.',
                        'icon' => 'Users',
                    ],
                    [
                        'title' => 'Pendekatan Berbasis Hasil',
                        'description' => 'Setiap inisiatif dikaitkan dengan indikator kinerja dan penghematan biaya yang jelas.',
                        'icon' => 'Layers',
                    ],
                    [
                        'title' => 'Kemitraan Berkelanjutan',
                        'description' => 'Pendampingan implementasi, pelatihan, dan program monitoring berkala.',
                        'icon' => 'LifeBuoy',
                    ],
                    [
                        'title' => 'Governance & Compliance',
                        'description' => 'Memastikan prakarsa bisnis mematuhi kebijakan perusahaan serta regulasi industri.',
                        'icon' => 'Shield',
                    ],
                ],
            ],
            'service.faqs' => [
                'badge' => 'Butuh Bantuan?',
                'heading' => 'Pertanyaan Umum',
                'description' => 'Temukan jawaban atas pertanyaan yang paling sering diajukan oleh klien kami.',
                'items' => [
                    [
                        'question' => 'Berapa lama waktu rata-rata sebuah program berjalan?',
                        'answer' => 'Durasi bergantung pada ruang lingkup. Program penguatan proses operasional umumnya berlangsung 6-12 minggu, sedangkan transformasi skala perusahaan dapat berjalan lebih panjang dengan beberapa fase.',
                    ],
                    [
                        'question' => 'Apakah kami mendapatkan laporan perkembangan secara rutin?',
                        'answer' => 'Ya. Kami menyiapkan jalur komunikasi dan dashboard monitoring agar setiap pemangku kepentingan dapat memantau status, capaian, dan rekomendasi berikutnya.',
                    ],
                    [
                        'question' => 'Bagaimana pendampingan setelah program selesai?',
                        'answer' => 'Kami menawarkan paket sustainment yang mencakup coaching, audit berkala, dan dukungan pengelolaan perubahan untuk memastikan manfaat program terus dirasakan.',
                    ],
                    [
                        'question' => 'Bagaimana struktur investasi layanan?',
                        'answer' => 'Nilai investasi disesuaikan dengan kompleksitas, lokasi, dan target hasil. Setelah asesmen awal, kami menyusun proposal lengkap beserta tahapan pembayaran yang transparan.',
                    ],
                ],
            ],
        ];

        foreach ($settings as $key => $value) {
            CompanySetting::updateOrCreate(
                ['key' => $key],
                ['group' => 'service', 'value' => $value]
            );
        }
    }
}
