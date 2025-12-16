<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            'home' => [
                [
                    'title' => 'Hero',
                    'slug' => 'hero',
                    'content' => '<div class="hero-section">
                        <h1>Kemitraan Strategis untuk Pertumbuhan Bisnis Anda</h1>
                        <p>Kami membantu organisasi di berbagai industri mengoptimalkan operasional, meningkatkan nilai layanan, dan mewujudkan inisiatif transformasi bisnis yang berdampak.</p>
                        <div class="hero-buttons">
                            <a href="/contact" class="btn btn-primary">Diskusikan Kebutuhan</a>
                            <a href="/service" class="btn btn-secondary">Lihat Solusi</a>
                        </div>
                    </div>',
                ],
                [
                    'title' => 'Tentang Ringkas',
                    'slug' => 'about-summary',
                    'content' => '<div class="about-intro">
                        <h2>Tentang Kami</h2>
                        <p>Sejak 2010 kami bermitra dengan perusahaan publik dan swasta di sektor manufaktur, jasa, kesehatan, energi, dan retail untuk menghadirkan solusi bisnis terintegrasi.</p>
                        <ul>
                            <li>Jejak proyek di lebih dari 15 sektor industri</li>
                            <li>Pendekatan berbasis data dan kebutuhan lapangan</li>
                            <li>Program implementasi dan pendampingan end-to-end</li>
                            <li>Fokus pada hasil bisnis dan keberlanjutan</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Layanan Highlight',
                    'slug' => 'service-highlight',
                    'content' => '<div class="service-overview">
                        <h2>Layanan Unggulan</h2>
                        <p>Temukan layanan yang kami siapkan untuk mendukung pertumbuhan perusahaan, meningkatkan efisiensi, dan menghadirkan pengalaman pelanggan yang unggul.</p>
                        <ul>
                            <li>Konsultasi Transformasi Digital</li>
                            <li>Pengembangan Aplikasi Kustom</li>
                            <li>Implementasi Data & AI</li>
                            <li>Operasional dan Managed Services</li>
                        </ul>
                    </div>',
                ],
            ],
            'about' => [
                [
                    'title' => 'Profil',
                    'slug' => 'profil',
                    'content' => '<div class="profil-section">
                        <h2>Profil Organisasi</h2>
                        <p>Kami adalah lembaga yang berkomitmen untuk memberikan layanan terbaik dalam bidang penjaminan mutu pendidikan. Dengan pengalaman lebih dari 10 tahun, kami telah membantu ratusan institusi mencapai standar mutu terbaik.</p>
                        <p>Tim kami terdiri dari profesional berpengalaman yang siap memberikan pendampingan dan konsultasi untuk meningkatkan kualitas institusi Anda.</p>
                    </div>',
                ],
                [
                    'title' => 'Sambutan',
                    'slug' => 'sambutan',
                    'content' => '<div class="sambutan-section">
                        <h2>Sambutan Ketua</h2>
                        <p><strong>Assalamu\'alaikum Warahmatullahi Wabarakatuh,</strong></p>
                        <p>Selamat datang di website Lembaga Penjaminan Mutu. Kami berkomitmen untuk terus meningkatkan kualitas pendidikan melalui sistem penjaminan mutu yang terstandar dan berkelanjutan.</p>
                        <p>Mari kita bersama-sama membangun pendidikan yang berkualitas untuk masa depan yang lebih baik.</p>
                        <p><strong>Wassalamu\'alaikum Warahmatullahi Wabarakatuh</strong></p>
                        <p><em>- Ketua Lembaga Penjaminan Mutu</em></p>
                    </div>',
                ],
                [
                    'title' => 'Struktur Organisasi',
                    'slug' => 'struktur-organisasi',
                    'content' => '<div class="struktur-section">
                        <h2>Struktur Organisasi</h2>
                        <p>Lembaga kami memiliki struktur organisasi yang solid dan profesional untuk memastikan pelaksanaan tugas yang optimal.</p>
                        <ul>
                            <li><strong>Ketua:</strong> [Nama Ketua]</li>
                            <li><strong>Wakil Ketua:</strong> [Nama Wakil]</li>
                            <li><strong>Sekretaris:</strong> [Nama Sekretaris]</li>
                            <li><strong>Bendahara:</strong> [Nama Bendahara]</li>
                            <li><strong>Divisi PPEPP:</strong> [Nama Koordinator]</li>
                            <li><strong>Divisi MONEV:</strong> [Nama Koordinator]</li>
                            <li><strong>Divisi AMI:</strong> [Nama Koordinator]</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Visi & Misi',
                    'slug' => 'visi-misi',
                    'content' => '<div class="visi-misi-section">
                        <h2>Visi dan Misi</h2>
                        <h3>Visi</h3>
                        <p>Menjadi lembaga penjaminan mutu yang terdepan dalam mendukung peningkatan kualitas pendidikan tinggi yang berkelanjutan.</p>
                        <h3>Misi</h3>
                        <ul>
                            <li>Mengembangkan sistem penjaminan mutu internal yang efektif dan berkelanjutan</li>
                            <li>Melaksanakan monitoring dan evaluasi secara berkala untuk peningkatan mutu</li>
                            <li>Memfasilitasi proses akreditasi institusi dan program studi</li>
                            <li>Memberikan pendampingan dan konsultasi dalam peningkatan mutu pendidikan</li>
                            <li>Membangun budaya mutu di seluruh civitas akademika</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Akreditasi Institusi',
                    'slug' => 'akreditasi-institusi',
                    'content' => '<div class="akreditasi-section">
                        <h2>Akreditasi Institusi</h2>
                        <p>Institusi kami telah terakreditasi dengan peringkat yang baik, menunjukkan komitmen kami terhadap kualitas pendidikan.</p>
                        <p><strong>Status Akreditasi:</strong> [Status dan Peringkat]</p>
                        <p><strong>Masa Berlaku:</strong> [Tanggal - Tanggal]</p>
                        <p>Kami terus berupaya meningkatkan kualitas untuk mencapai standar akreditasi yang lebih tinggi.</p>
                    </div>',
                ],
            ],
            'service' => [
                [
                    'title' => 'Pendampingan Akreditasi',
                    'slug' => 'pendampingan-akreditasi',
                    'content' => '<div class="service-detail">
                        <h2>Layanan Pendampingan Akreditasi</h2>
                        <p>Kami menyediakan layanan pendampingan komprehensif untuk proses akreditasi institusi dan program studi Anda.</p>
                        <h3>Layanan Meliputi:</h3>
                        <ul>
                            <li>Konsultasi persiapan dokumen akreditasi</li>
                            <li>Pendampingan penyusunan borang dan dokumen pendukung</li>
                            <li>Simulasi visitasi akreditasi</li>
                            <li>Pelatihan tim akreditasi</li>
                            <li>Monitoring dan evaluasi berkelanjutan</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Permohonan Data',
                    'slug' => 'permohonan-data',
                    'content' => '<div class="service-detail">
                        <h2>Permohonan Data</h2>
                        <p>Untuk mendukung transparansi dan akuntabilitas, kami menyediakan layanan permohonan data akademik dan institusional.</p>
                        <h3>Prosedur:</h3>
                        <ol>
                            <li>Ajukan permohonan melalui formulir yang tersedia</li>
                            <li>Sertakan identitas dan tujuan penggunaan data</li>
                            <li>Tim kami akan memverifikasi permohonan Anda</li>
                            <li>Data akan dikirimkan maksimal 7 hari kerja</li>
                        </ol>
                    </div>',
                ],
                [
                    'title' => 'Konsultasi Mutu',
                    'slug' => 'konsultasi-mutu',
                    'content' => '<div class="service-detail">
                        <h2>Konsultasi Mutu</h2>
                        <p>Dapatkan konsultasi profesional untuk meningkatkan sistem penjaminan mutu di institusi Anda.</p>
                        <h3>Topik Konsultasi:</h3>
                        <ul>
                            <li>Pengembangan dokumen SPMI</li>
                            <li>Implementasi siklus PPEPP</li>
                            <li>Strategi peningkatan mutu berkelanjutan</li>
                            <li>Audit mutu internal</li>
                            <li>Best practices dalam penjaminan mutu</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Pengaduan',
                    'slug' => 'pengaduan',
                    'content' => '<div class="service-detail">
                        <h2>Layanan Pengaduan</h2>
                        <p>Kami menyediakan saluran pengaduan untuk menampung masukan, keluhan, dan saran dari civitas akademika.</p>
                        <p>Pengaduan Anda akan ditangani dengan:</p>
                        <ul>
                            <li>Konfidensialitas terjamin</li>
                            <li>Respon maksimal 3 hari kerja</li>
                            <li>Penanganan yang profesional</li>
                            <li>Tindak lanjut yang terukur</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Kritik & Saran',
                    'slug' => 'kritik-saran',
                    'content' => '<div class="service-detail">
                        <h2>Kritik & Saran</h2>
                        <p>Masukan Anda sangat berharga bagi peningkatan layanan kami. Silakan sampaikan kritik dan saran konstruktif untuk membantu kami berkembang lebih baik.</p>
                        <p>Setiap masukan akan kami evaluasi dan ditindaklanjuti untuk perbaikan berkelanjutan.</p>
                    </div>',
                ],
            ],
            'product' => [
                [
                    'title' => 'Produk Unggulan',
                    'slug' => 'unggulan',
                    'content' => '<div class="product-section">
                        <h2>Produk Unggulan</h2>
                        <p>Temukan berbagai produk dan layanan unggulan yang kami tawarkan untuk mendukung kebutuhan Anda.</p>
                        <p>Produk kami dirancang dengan standar kualitas terbaik dan telah dipercaya oleh banyak institusi.</p>
                    </div>',
                ],
                [
                    'title' => 'Kategori Produk',
                    'slug' => 'kategori',
                    'content' => '<div class="product-section">
                        <h2>Kategori Produk</h2>
                        <p>Produk kami tersedia dalam berbagai kategori untuk memenuhi kebutuhan yang beragam:</p>
                        <ul>
                            <li>Dokumen SPMI</li>
                            <li>Panduan dan Manual</li>
                            <li>Template dan Form</li>
                            <li>Software dan Aplikasi</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Demo / Trial',
                    'slug' => 'demo',
                    'content' => '<div class="product-section">
                        <h2>Demo & Trial</h2>
                        <p>Kami menyediakan layanan demo dan trial untuk produk tertentu. Hubungi kami untuk informasi lebih lanjut dan jadwalkan demo produk yang Anda minati.</p>
                    </div>',
                ],
            ],
            'project' => [
                [
                    'title' => 'Proyek Berjalan',
                    'slug' => 'berjalan',
                    'content' => '<div class="project-section">
                        <h2>Proyek Berjalan</h2>
                        <p>Saat ini kami sedang menjalankan berbagai proyek peningkatan mutu di berbagai institusi. Proyek-proyek ini mencakup pendampingan akreditasi, implementasi SPMI, dan audit mutu internal.</p>
                    </div>',
                ],
                [
                    'title' => 'Proyek Selesai',
                    'slug' => 'selesai',
                    'content' => '<div class="project-section">
                        <h2>Proyek yang Telah Selesai</h2>
                        <p>Kami telah menyelesaikan berbagai proyek dengan hasil yang memuaskan. Berikut adalah beberapa pencapaian kami:</p>
                        <ul>
                            <li>Pendampingan akreditasi 50+ program studi</li>
                            <li>Implementasi SPMI di 20+ institusi</li>
                            <li>Audit mutu internal untuk 100+ unit</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Klien & Mitra',
                    'slug' => 'klien',
                    'content' => '<div class="project-section">
                        <h2>Klien & Mitra</h2>
                        <p>Kami bangga telah bermitra dengan berbagai institusi pendidikan terkemuka. Kepercayaan mereka adalah motivasi kami untuk terus memberikan layanan terbaik.</p>
                    </div>',
                ],
            ],
            'career' => [
                [
                    'title' => 'Lowongan Aktif',
                    'slug' => 'lowongan',
                    'content' => '<div class="career-section">
                        <h2>Lowongan Pekerjaan</h2>
                        <p>Bergabunglah dengan tim kami! Saat ini kami membuka lowongan untuk berbagai posisi. Kunjungi halaman karier kami secara berkala untuk informasi lowongan terbaru.</p>
                    </div>',
                ],
                [
                    'title' => 'Budaya & Nilai',
                    'slug' => 'budaya',
                    'content' => '<div class="career-section">
                        <h2>Budaya & Nilai Organisasi</h2>
                        <p>Kami membangun budaya kerja yang positif, kolaboratif, dan inovatif. Nilai-nilai kami:</p>
                        <ul>
                            <li><strong>Integritas:</strong> Menjunjung tinggi kejujuran dan etika</li>
                            <li><strong>Profesionalisme:</strong> Komitmen pada kualitas terbaik</li>
                            <li><strong>Kolaborasi:</strong> Bekerja sama untuk hasil optimal</li>
                            <li><strong>Inovasi:</strong> Terus berinovasi dan berkembang</li>
                        </ul>
                    </div>',
                ],
                [
                    'title' => 'Proses Rekrutmen',
                    'slug' => 'proses',
                    'content' => '<div class="career-section">
                        <h2>Proses Rekrutmen</h2>
                        <p>Proses rekrutmen kami dirancang untuk menemukan kandidat terbaik:</p>
                        <ol>
                            <li>Pengajuan lamaran dan CV</li>
                            <li>Seleksi administrasi</li>
                            <li>Tes tertulis/online</li>
                            <li>Wawancara HR</li>
                            <li>Wawancara user/manajemen</li>
                            <li>Offering dan onboarding</li>
                        </ol>
                    </div>',
                ],
                [
                    'title' => 'FAQ Karier',
                    'slug' => 'faq-karier',
                    'content' => '<div class="career-section">
                        <h2>FAQ Karier</h2>
                        <p><strong>Q: Berapa lama proses rekrutmen?</strong><br>
                        A: Proses rekrutmen biasanya memakan waktu 2-4 minggu.</p>
                        <p><strong>Q: Apakah ada program magang?</strong><br>
                        A: Ya, kami membuka program magang untuk mahasiswa dan fresh graduate.</p>
                        <p><strong>Q: Bagaimana cara melamar?</strong><br>
                        A: Kirimkan CV dan surat lamaran ke email recruitment@example.com</p>
                    </div>',
                ],
            ],
            'blog' => [
                [
                    'title' => 'Artikel Terbaru',
                    'slug' => 'terbaru',
                    'content' => '<div class="blog-section">
                        <h2>Artikel Terbaru</h2>
                        <p>Baca artikel dan insight terbaru dari kami seputar penjaminan mutu, akreditasi, dan pengembangan pendidikan tinggi.</p>
                    </div>',
                ],
                [
                    'title' => 'Kategori Berita',
                    'slug' => 'berita',
                    'content' => '<div class="blog-section">
                        <h2>Berita & Informasi</h2>
                        <p>Dapatkan informasi terkini seputar kegiatan, event, dan pencapaian lembaga kami.</p>
                    </div>',
                ],
                [
                    'title' => 'Pengumuman',
                    'slug' => 'pengumuman',
                    'content' => '<div class="blog-section">
                        <h2>Pengumuman</h2>
                        <p>Pengumuman resmi dan informasi penting dari lembaga kami.</p>
                    </div>',
                ],
            ],
            'contact' => [
                [
                    'title' => 'Formulir Kontak',
                    'slug' => 'form',
                    'content' => '<div class="contact-section">
                        <h2>Hubungi Kami</h2>
                        <p>Silakan isi formulir di bawah ini untuk menghubungi kami. Tim kami akan merespons pesan Anda sesegera mungkin.</p>
                    </div>',
                ],
                [
                    'title' => 'Lokasi & Peta',
                    'slug' => 'lokasi',
                    'content' => '<div class="contact-section">
                        <h2>Lokasi Kantor</h2>
                        <p><strong>Alamat:</strong><br>
                        Jl. Contoh No. 123<br>
                        Kota, Provinsi 12345</p>
                        <p><strong>Email:</strong> info@example.com<br>
                        <strong>Telepon:</strong> (021) 1234-5678<br>
                        <strong>Fax:</strong> (021) 1234-5679</p>
                    </div>',
                ],
                [
                    'title' => 'Kontak Darurat',
                    'slug' => 'darurat',
                    'content' => '<div class="contact-section">
                        <h2>Kontak Darurat</h2>
                        <p>Untuk keperluan mendesak di luar jam kerja, hubungi:</p>
                        <p><strong>Hotline 24/7:</strong> 0800-123-4567</p>
                    </div>',
                ],
            ],
        ];

        foreach ($sections as $slug => $sectionList) {
            $page = Page::where('slug', $slug)->first();
            if (!$page) {
                continue;
            }

            foreach ($sectionList as $order => $section) {
                PageSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'slug' => $section['slug'],
                    ],
                    [
                        'title' => $section['title'],
                        'content' => $section['content'],
                        'display_order' => $order,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
