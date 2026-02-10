-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 04 Feb 2026 pada 13.41
-- Versi server: 10.6.24-MariaDB-cll-lve
-- Versi PHP: 8.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nuridwnw_honda-ciledug`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `log_name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) UNSIGNED DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `causer_type` varchar(255) DEFAULT NULL,
  `causer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `batch_uuid` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `activity_log`
--

INSERT INTO `activity_log` (`id`, `log_name`, `description`, `subject_type`, `subject_id`, `event`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `created_at`, `updated_at`) VALUES
(1, 'default', 'User profile created', 'App\\Models\\User', 1, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Administrator\",\"email\":\"admin@example.id\"}}', NULL, '2026-01-21 04:45:46', '2026-01-21 04:45:46'),
(2, 'default', 'Service \'Konsultasi Transformasi Digital\' created', 'App\\Models\\Service', 1, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Konsultasi Transformasi Digital\",\"slug\":\"konsultasi-transformasi-digital\",\"is_active\":true}}', NULL, '2026-01-21 04:45:46', '2026-01-21 04:45:46'),
(3, 'default', 'Service \'Pengembangan Aplikasi Kustom\' created', 'App\\Models\\Service', 2, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Pengembangan Aplikasi Kustom\",\"slug\":\"pengembangan-aplikasi-kustom\",\"is_active\":true}}', NULL, '2026-01-21 04:45:46', '2026-01-21 04:45:46'),
(4, 'default', 'Service \'Implementasi Data & AI\' created', 'App\\Models\\Service', 3, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Implementasi Data & AI\",\"slug\":\"implementasi-data-ai\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(5, 'default', 'Service \'Operasional dan Managed Services\' created', 'App\\Models\\Service', 4, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Operasional dan Managed Services\",\"slug\":\"operasional-managed-services\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(6, 'default', 'Product \'Platform CRM Enterprise\' created', 'App\\Models\\Product', 1, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Platform CRM Enterprise\",\"slug\":\"platform-crm-enterprise\",\"is_active\":true,\"category\":\"Software\"}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(7, 'default', 'Product \'Learning Management System\' created', 'App\\Models\\Product', 2, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Learning Management System\",\"slug\":\"learning-management-system\",\"is_active\":true,\"category\":\"Education\"}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(8, 'default', 'Product \'Portal Layanan Publik\' created', 'App\\Models\\Product', 3, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Portal Layanan Publik\",\"slug\":\"portal-layanan-publik\",\"is_active\":true,\"category\":\"Government\"}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(9, 'default', 'Project \'Portal Investasi Daerah\' created', 'App\\Models\\Project', 1, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Portal Investasi Daerah\",\"slug\":\"portal-investasi-daerah\",\"client_name\":\"Pemprov Jawa Barat\",\"status\":\"completed\"}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(10, 'default', 'Project \'Platform Distribusi Farmasi\' created', 'App\\Models\\Project', 2, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Platform Distribusi Farmasi\",\"slug\":\"platform-distribusi-farmasi\",\"client_name\":\"PT Sehat Sentosa\",\"status\":\"in_progress\"}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(11, 'default', 'Project \'Renewable Energy Monitoring\' created', 'App\\Models\\Project', 3, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Renewable Energy Monitoring\",\"slug\":\"renewable-energy-monitoring\",\"client_name\":\"Energi Hijau Indonesia\",\"status\":\"planning\"}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(12, 'default', 'TeamMember \'Anisa Maulani\' created', 'App\\Models\\TeamMember', 1, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Anisa Maulani\",\"role\":\"Chief Executive Officer\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(13, 'default', 'TeamMember \'Rizky Pratama\' created', 'App\\Models\\TeamMember', 2, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Rizky Pratama\",\"role\":\"Chief Technology Officer\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(14, 'default', 'TeamMember \'Siti Rahmayanti\' created', 'App\\Models\\TeamMember', 3, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Siti Rahmayanti\",\"role\":\"Head of Delivery\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(15, 'default', 'TeamMember \'Agus Budi Santoso\' created', 'App\\Models\\TeamMember', 4, 'created', NULL, NULL, '{\"attributes\":{\"name\":\"Agus Budi Santoso\",\"role\":\"Head of Data & AI\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(16, 'default', 'Testimonial from \'Hendra Saputra\' created', 'App\\Models\\Testimonial', 1, 'created', NULL, NULL, '{\"attributes\":{\"author_name\":\"Hendra Saputra\",\"company\":\"Bumi Energi Nusantara\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(17, 'default', 'Testimonial from \'Rani Pratiwi\' created', 'App\\Models\\Testimonial', 2, 'created', NULL, NULL, '{\"attributes\":{\"author_name\":\"Rani Pratiwi\",\"company\":\"Sahabat Finansial\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(18, 'default', 'Testimonial from \'Yusuf Ardiansyah\' created', 'App\\Models\\Testimonial', 3, 'created', NULL, NULL, '{\"attributes\":{\"author_name\":\"Yusuf Ardiansyah\",\"company\":\"Pemkot Samarinda\",\"is_active\":true}}', NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(19, 'default', 'Setting \'company.name\' created', 'App\\Models\\CompanySetting', 1, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"company.name\",\"value\":\"Harmony Strategic Group\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(20, 'default', 'Setting \'company.tagline\' created', 'App\\Models\\CompanySetting', 2, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"company.tagline\",\"value\":\"Mitra strategis untuk pertumbuhan bisnis lintas industri.\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(21, 'default', 'Setting \'company.address\' created', 'App\\Models\\CompanySetting', 3, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"company.address\",\"value\":{\"line1\":\"Jl. Merdeka No. 123\",\"city\":\"Jakarta Pusat\",\"province\":\"DKI Jakarta\",\"postal_code\":\"10110\"}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(22, 'default', 'Setting \'company.contacts\' created', 'App\\Models\\CompanySetting', 4, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"company.contacts\",\"value\":{\"phone\":\"+62 21 555 8890\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 811 7788 990\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m18!1m12!1m3!1d126915.123456789!2d106.700!3d-6.200\"}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(23, 'default', 'Setting \'company.socials\' created', 'App\\Models\\CompanySetting', 5, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"company.socials\",\"value\":{\"linkedin\":\"https:\\/\\/www.linkedin.com\\/company\\/harmony-strategic-group\",\"instagram\":\"https:\\/\\/www.instagram.com\\/harmonystrategic\"}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(24, 'default', 'Setting \'landing.hero\' created', 'App\\Models\\CompanySetting', 6, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"landing.hero\",\"value\":{\"heading\":{\"id\":\"Kemitraan Strategis untuk Pertumbuhan Bisnis Anda\",\"en\":\"Strategic Partnership for Your Business Growth\"},\"subheading\":{\"id\":\"Kami membantu organisasi di berbagai industri mengoptimalkan operasional, meningkatkan nilai layanan, dan mewujudkan inisiatif transformasi bisnis yang berdampak.\",\"en\":\"We support organisations across industries in optimising operations, elevating customer value, and realising impactful business transformation initiatives.\"},\"primary_label\":{\"id\":\"Diskusikan Kebutuhan\",\"en\":\"Discuss Your Needs\"},\"primary_link\":{\"id\":\"\\/contact\",\"en\":\"\\/contact\"},\"secondary_label\":{\"id\":\"Lihat Solusi\",\"en\":\"Explore Solutions\"},\"secondary_link\":{\"id\":\"\\/service\",\"en\":\"\\/service\"},\"image\":null}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(25, 'default', 'Setting \'landing.about\' created', 'App\\Models\\CompanySetting', 7, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"landing.about\",\"value\":{\"title\":{\"id\":\"Tentang Harmony Strategic Group\",\"en\":\"About Harmony Strategic Group\"},\"description\":{\"id\":\"Sejak 2010 kami bermitra dengan perusahaan publik dan swasta di sektor manufaktur, jasa, kesehatan, energi, dan retail untuk menghadirkan solusi bisnis terintegrasi. Tim kami menggabungkan keahlian strategi, operasional, dan perubahan organisasi untuk memberikan hasil yang terukur.\",\"en\":\"Since 2010 we have partnered with public and private enterprises across manufacturing, services, healthcare, energy, and retail to deliver integrated business solutions. Our team blends strategy, operations, and change management expertise to drive measurable impact.\"},\"highlights\":{\"id\":[\"Jejak proyek di lebih dari 15 sektor industri\",\"Pendekatan berbasis data dan kebutuhan lapangan\",\"Program implementasi dan pendampingan end-to-end\",\"Fokus pada hasil bisnis dan keberlanjutan kemitraan\"],\"en\":[\"Project footprint across 15+ industry sectors\",\"Data-driven and on-the-ground approach\",\"End-to-end implementation and enablement programs\",\"Commitment to business outcomes and lasting partnerships\"]},\"image\":null}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(26, 'default', 'Setting \'landing.final_cta\' created', 'App\\Models\\CompanySetting', 8, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"landing.final_cta\",\"value\":{\"heading\":{\"id\":\"Siap Mengambil Langkah Selanjutnya?\",\"en\":\"Ready for the Next Step?\"},\"description\":{\"id\":\"Mari diskusikan bagaimana kami dapat membantu mewujudkan tujuan bisnis Anda. Hubungi kami hari ini untuk sesi konsultasi tanpa biaya.\",\"en\":\"Let\\u2019s discuss how we can help you achieve your business goals. Contact us today for a complimentary consultation.\"},\"button_label\":{\"id\":\"Hubungi Kami\",\"en\":\"Contact Us\"},\"button_link\":{\"id\":\"\\/contact\",\"en\":\"\\/contact\"}}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(27, 'default', 'Setting \'landing.metrics\' created', 'App\\Models\\CompanySetting', 9, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"landing.metrics\",\"value\":[{\"value\":{\"id\":\"150+\",\"en\":\"150+\"},\"label\":{\"id\":\"Organisasi Terlayani\",\"en\":\"Organisations Served\"}},{\"value\":{\"id\":\"20\",\"en\":\"20\"},\"label\":{\"id\":\"Provinsi dan Negara Operasi\",\"en\":\"Regions of Operation\"}},{\"value\":{\"id\":\"92%\",\"en\":\"92%\"},\"label\":{\"id\":\"Rasio Proyek Berulang\",\"en\":\"Repeat Engagement Rate\"}}]}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(28, 'default', 'Setting \'product.cta\' created', 'App\\Models\\CompanySetting', 10, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"product.cta\",\"value\":{\"badge\":{\"id\":\"Butuh Solusi?\",\"en\":\"Need a tailored solution?\"},\"heading\":{\"id\":\"Butuh Solusi yang Disesuaikan?\",\"en\":\"Need a tailored solution?\"},\"description\":{\"id\":\"Jika kebutuhan Anda spesifik, tim kami siap merancang program dan layanan yang sesuai dengan karakteristik industri serta target bisnis perusahaan.\",\"en\":\"When requirements are unique, our team can design programmes and services that reflect your industry context and business goals.\"},\"primary_label\":{\"id\":\"Hubungi Kami\",\"en\":\"Contact Us\"},\"primary_link\":{\"id\":\"\\/contact\",\"en\":\"\\/contact\"},\"secondary_label\":{\"id\":\"Lihat Layanan\",\"en\":\"View Services\"},\"secondary_link\":{\"id\":\"\\/service\",\"en\":\"\\/service\"},\"contacts\":[{\"icon\":\"phone\",\"title\":{\"id\":\"Telepon\",\"en\":\"Phone\"},\"detail\":{\"id\":\"+62 877 1696 7890\",\"en\":\"+62 877 1696 7890\"}},{\"icon\":\"mail\",\"title\":{\"id\":\"Email\",\"en\":\"Email\"},\"detail\":{\"id\":\"info@example.com\",\"en\":\"info@example.com\"}},{\"icon\":\"clock\",\"title\":{\"id\":\"Jam Kerja\",\"en\":\"Working Hours\"},\"detail\":{\"id\":\"Senin - Jumat, 09:00 - 18:00\",\"en\":\"Monday - Friday, 09:00 - 18:00\"}}]}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(29, 'default', 'Setting \'product.stats\' created', 'App\\Models\\CompanySetting', 11, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"product.stats\",\"value\":{\"labels\":{\"products\":{\"id\":\"Program Unggulan\",\"en\":\"Flagship Programmes\"},\"clients\":{\"id\":\"Klien Puas\",\"en\":\"Satisfied Clients\"},\"rating\":{\"id\":\"Rating Kemitraan\",\"en\":\"Partnership Rating\"},\"awards\":{\"id\":\"Penghargaan\",\"en\":\"Awards\"}},\"awards\":18}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(30, 'default', 'Setting \'product.hero\' created', 'App\\Models\\CompanySetting', 12, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"product.hero\",\"value\":{\"badge\":{\"id\":\"Produk Strategis\",\"en\":\"Strategic Products\"},\"heading\":{\"id\":\"Solusi produk siap pakai untuk transformasi bisnis\",\"en\":\"Ready-to-ship product solutions for business transformation\"},\"description\":{\"id\":\"Temukan rangkaian produk digital yang membantu mempercepat efisiensi operasional dan pengalaman pelanggan di berbagai industri.\",\"en\":\"Explore modular digital products that accelerate operational efficiency and customer experience across industries.\"}}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(31, 'default', 'Setting \'project.hero\' created', 'App\\Models\\CompanySetting', 13, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"project.hero\",\"value\":{\"badge\":{\"id\":\"Portofolio Proyek\",\"en\":\"Project Portfolio\"},\"heading\":{\"id\":\"Studi kasus implementasi lintas sektor\",\"en\":\"Cross-industry implementation case studies\"},\"description\":{\"id\":\"Ikuti perjalanan transformasi yang kami lakukan bersama klien di sektor publik, swasta, dan BUMN mulai dari inisiasi hingga keberlanjutan.\",\"en\":\"See how we partner with public and private sector clients from discovery through sustained transformation.\"}}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(32, 'default', 'Setting \'career.hero\' created', 'App\\Models\\CompanySetting', 14, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"career.hero\",\"value\":{\"badge\":{\"id\":\"Life at Harmony\",\"en\":\"Life at Harmony\"},\"heading\":{\"id\":\"Bangun karier berdampak bersama tim lintas disiplin\",\"en\":\"Shape an impactful career with a multi-disciplinary team\"},\"description\":{\"id\":\"Kami membuka kesempatan bagi talenta yang siap memimpin perubahan dan berkembang melalui coaching, pembelajaran, dan lingkungan kerja hibrida.\",\"en\":\"We welcome talents ready to drive change with access to coaching, learning, and a flexible hybrid work environment.\"}}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(33, 'default', 'Setting \'blog.hero\' created', 'App\\Models\\CompanySetting', 15, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"blog.hero\",\"value\":{\"badge\":{\"id\":\"Insight\",\"en\":\"Insights\"},\"heading\":{\"id\":\"Insight Bisnis & Industri\",\"en\":\"Business & Industry Insights\"},\"description\":{\"id\":\"Artikel, studi kasus, dan tips praktis untuk mengelola perubahan dan mengembangkan bisnis.\",\"en\":\"Articles, case studies, and practical guidance to manage change and grow your organisation.\"}}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(34, 'default', 'Setting \'service.hero\' created', 'App\\Models\\CompanySetting', 16, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.hero\",\"value\":{\"heading\":\"Solusi Bisnis Terintegrasi untuk\",\"subheading\":\"Kami mendampingi perusahaan dari berbagai sektor untuk meningkatkan efisiensi operasional, kualitas layanan, dan kesiapan pertumbuhan berkelanjutan.\",\"highlight\":\"Pertumbuhan Berkelanjutan\",\"primary_label\":\"Lihat Layanan\",\"primary_link\":\"\\/service\",\"secondary_label\":\"Diskusikan Kebutuhan\",\"secondary_link\":\"\\/contact\",\"background_image\":\"https:\\/\\/images.unsplash.com\\/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop\"}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(35, 'default', 'Setting \'service.summary\' created', 'App\\Models\\CompanySetting', 17, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.summary\",\"value\":{\"badge\":\"Portofolio Layanan\",\"heading\":\"Solusi yang Kami Tawarkan\",\"description\":\"Pendekatan menyeluruh yang menggabungkan konsultasi bisnis, optimalisasi proses, dan implementasi program perubahan di lapangan.\"}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(36, 'default', 'Setting \'service.offerings\' created', 'App\\Models\\CompanySetting', 18, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.offerings\",\"value\":{\"badge\":\"Layanan Kami\",\"heading\":\"Apa yang Kami Tawarkan\",\"description\":\"Rangkaian layanan fleksibel yang dapat disesuaikan untuk perusahaan jasa, manufaktur, pendidikan, kesehatan, energi, dan sektor publik.\",\"items\":[{\"title\":\"Konsultasi Transformasi Digital\",\"description\":\"Menyusun peta jalan digital, tata kelola data, hingga penguatan kapabilitas teknologi internal.\",\"icon\":\"Layers\"},{\"title\":\"Pengembangan Solusi Kustom\",\"description\":\"Mendesain dan membangun solusi aplikasi yang terintegrasi dengan proses bisnis inti.\",\"icon\":\"Code\"},{\"title\":\"Operasional & Managed Service\",\"description\":\"Mendampingi pengoperasian harian, command center, dan monitoring kinerja multi lokasi.\",\"icon\":\"Workflow\"},{\"title\":\"Program Perubahan Organisasi\",\"description\":\"Mengelola change management, coaching pimpinan, dan pelatihan adopsi teknologi.\",\"icon\":\"Users\"}]}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(37, 'default', 'Setting \'service.tech_stack\' created', 'App\\Models\\CompanySetting', 19, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.tech_stack\",\"value\":{\"heading\":\"Kompetensi Utama Kami\",\"description\":\"Tim lintas disiplin dengan keahlian strategi bisnis, operasional, pemasaran, pengelolaan perubahan, hingga digital enablement.\",\"items\":[{\"name\":\"Operational Excellence\",\"logo\":null,\"icon\":\"Workflow\"},{\"name\":\"Customer Experience Design\",\"logo\":null,\"icon\":\"LayoutTemplate\"},{\"name\":\"Supply Chain Optimisation\",\"logo\":null,\"icon\":\"Package\"},{\"name\":\"People & Change Management\",\"logo\":null,\"icon\":\"Users\"},{\"name\":\"Business Intelligence & Reporting\",\"logo\":null,\"icon\":\"Activity\"},{\"name\":\"Service Quality Improvement\",\"logo\":null,\"icon\":\"LineChart\"},{\"name\":\"Digital Enablement\",\"logo\":null,\"icon\":\"CircuitBoard\"},{\"name\":\"Sustainability Programme Advisory\",\"logo\":null,\"icon\":\"Leaf\"}]}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(38, 'default', 'Setting \'service.process\' created', 'App\\Models\\CompanySetting', 20, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.process\",\"value\":{\"badge\":\"Metodologi Kami\",\"heading\":\"Proses Kerja Kami\",\"description\":null,\"items\":[{\"step\":\"01\",\"title\":\"Diagnosa Bisnis\",\"description\":\"Menggali tantangan utama dan prioritas strategis bersama pemangku kepentingan lintas fungsi.\",\"icon\":\"Search\"},{\"step\":\"02\",\"title\":\"Perancangan Solusi\",\"description\":\"Menyusun inisiatif, indikator keberhasilan, dan rencana implementasi bertahap.\",\"icon\":\"LayoutTemplate\"},{\"step\":\"03\",\"title\":\"Eksekusi & Pilot\",\"description\":\"Mengawal implementasi, melakukan uji coba terkontrol, dan menyesuaikan dengan kondisi lapangan.\",\"icon\":\"Code\"},{\"step\":\"04\",\"title\":\"Adopsi & Optimasi\",\"description\":\"Mengukur hasil, memperkuat kapabilitas tim internal, dan memastikan keberlanjutan program.\",\"icon\":\"Rocket\"}]}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(39, 'default', 'Setting \'service.advantages\' created', 'App\\Models\\CompanySetting', 21, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.advantages\",\"value\":{\"badge\":\"Keunggulan Kami\",\"heading\":\"Mengapa Memilih Kami?\",\"description\":null,\"items\":[{\"title\":\"Tim Lintas Industri\",\"description\":\"Konsultan dengan pengalaman memimpin proyek di sektor manufaktur, jasa, energi, kesehatan, dan publik.\",\"icon\":\"Users\"},{\"title\":\"Pendekatan Berbasis Hasil\",\"description\":\"Setiap inisiatif dikaitkan dengan indikator kinerja dan penghematan biaya yang jelas.\",\"icon\":\"Layers\"},{\"title\":\"Kemitraan Berkelanjutan\",\"description\":\"Pendampingan implementasi, pelatihan, dan program monitoring berkala.\",\"icon\":\"LifeBuoy\"},{\"title\":\"Governance & Compliance\",\"description\":\"Memastikan prakarsa bisnis mematuhi kebijakan perusahaan serta regulasi industri.\",\"icon\":\"Shield\"}]}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(40, 'default', 'Setting \'service.faqs\' created', 'App\\Models\\CompanySetting', 22, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"service.faqs\",\"value\":{\"badge\":\"Butuh Bantuan?\",\"heading\":\"Pertanyaan Umum\",\"description\":\"Temukan jawaban atas pertanyaan yang paling sering diajukan oleh klien kami.\",\"items\":[{\"question\":\"Berapa lama waktu rata-rata sebuah program berjalan?\",\"answer\":\"Durasi bergantung pada ruang lingkup. Program penguatan proses operasional umumnya berlangsung 6-12 minggu, sedangkan transformasi skala perusahaan dapat berjalan lebih panjang dengan beberapa fase.\"},{\"question\":\"Apakah kami mendapatkan laporan perkembangan secara rutin?\",\"answer\":\"Ya. Kami menyiapkan jalur komunikasi dan dashboard monitoring agar setiap pemangku kepentingan dapat memantau status, capaian, dan rekomendasi berikutnya.\"},{\"question\":\"Bagaimana pendampingan setelah program selesai?\",\"answer\":\"Kami menawarkan paket sustainment yang mencakup coaching, audit berkala, dan dukungan pengelolaan perubahan untuk memastikan manfaat program terus dirasakan.\"},{\"question\":\"Bagaimana struktur investasi layanan?\",\"answer\":\"Nilai investasi disesuaikan dengan kompleksitas, lokasi, dan target hasil. Setelah asesmen awal, kami menyusun proposal lengkap beserta tahapan pembayaran yang transparan.\"}]}}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(41, 'default', 'BlogPost \'Membangun Platform Pemerintahan Digital yang Andal\' created', 'App\\Models\\BlogPost', 1, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Membangun Platform Pemerintahan Digital yang Andal\",\"slug\":\"membangun-platform-pemerintahan-digital\",\"is_published\":true,\"published_at\":\"2026-01-16T11:45:48.000000Z\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(42, 'default', 'BlogPost \'Studi Kasus: Modernisasi Infrastruktur Data untuk Korporasi\' created', 'App\\Models\\BlogPost', 2, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Studi Kasus: Modernisasi Infrastruktur Data untuk Korporasi\",\"slug\":\"modernisasi-infrastruktur-data\",\"is_published\":true,\"published_at\":\"2026-01-09T11:45:48.000000Z\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(43, 'default', 'BlogPost \'Checklist Kesiapan Transformasi Digital untuk UMKM\' created', 'App\\Models\\BlogPost', 3, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Checklist Kesiapan Transformasi Digital untuk UMKM\",\"slug\":\"checklist-transformasi-digital-umkm\",\"is_published\":true,\"published_at\":\"2026-01-01T11:45:48.000000Z\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(44, 'default', 'Setting \'navigation.primary\' created', 'App\\Models\\CompanySetting', 23, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"navigation.primary\",\"value\":[]}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(45, 'default', 'Setting \'footer.content\' created', 'App\\Models\\CompanySetting', 24, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"footer.content\",\"value\":null}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(46, 'default', 'Setting \'seo.pages\' created', 'App\\Models\\CompanySetting', 25, 'created', NULL, NULL, '{\"attributes\":{\"key\":\"seo.pages\",\"value\":null}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(47, 'default', 'Page \'Beranda\' created', 'App\\Models\\Page', 1, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Beranda\",\"slug\":\"home\",\"status\":\"published\",\"meta_title\":\"Harmony Strategic Group | Mitra Bisnis Lintas Industri\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(48, 'default', 'Page \'Tentang Kami\' created', 'App\\Models\\Page', 2, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Tentang Kami\",\"slug\":\"about\",\"status\":\"published\",\"meta_title\":\"Tentang Harmony Strategic Group\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(49, 'default', 'Page \'Layanan\' created', 'App\\Models\\Page', 3, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Layanan\",\"slug\":\"service\",\"status\":\"published\",\"meta_title\":\"Layanan Konsultasi & Implementasi Bisnis\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(50, 'default', 'Page \'Produk\' created', 'App\\Models\\Page', 4, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Produk\",\"slug\":\"product\",\"status\":\"published\",\"meta_title\":\"Program & Solusi Harmony Strategic Group\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(51, 'default', 'Page \'Proyek\' created', 'App\\Models\\Page', 5, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Proyek\",\"slug\":\"project\",\"status\":\"published\",\"meta_title\":\"Portofolio Proyek Harmony Strategic Group\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(52, 'default', 'Page \'Karier\' created', 'App\\Models\\Page', 6, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Karier\",\"slug\":\"career\",\"status\":\"published\",\"meta_title\":\"Karier di Harmony Strategic Group\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(53, 'default', 'Page \'Blog\' created', 'App\\Models\\Page', 7, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Blog\",\"slug\":\"blog\",\"status\":\"published\",\"meta_title\":\"Insight Bisnis & Industri\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(54, 'default', 'Page \'Kontak\' created', 'App\\Models\\Page', 8, 'created', NULL, NULL, '{\"attributes\":{\"title\":\"Kontak\",\"slug\":\"contact\",\"status\":\"published\",\"meta_title\":\"Hubungi Harmony Strategic Group\"}}', NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(55, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 05:48:27', '2026-01-21 05:48:27'),
(56, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 05:48:27', '2026-01-21 05:48:27'),
(57, 'default', 'Setting \'company.name\' updated', 'App\\Models\\CompanySetting', 1, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Honda Ciledug Dealer Resmi\"},\"old\":{\"value\":\"Harmony Strategic Group\"}}', NULL, '2026-01-21 05:51:49', '2026-01-21 05:51:49'),
(58, 'default', 'Setting \'company.tagline\' updated', 'App\\Models\\CompanySetting', 2, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Dealer Resmi Honda Ciledug \\u2014 Promo, Kredit, & Service Terpercaya.\"},\"old\":{\"value\":\"Mitra strategis untuk pertumbuhan bisnis lintas industri.\"}}', NULL, '2026-01-21 05:51:49', '2026-01-21 05:51:49'),
(59, 'default', 'Setting \'company.logo_icon\' created', 'App\\Models\\CompanySetting', 26, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"key\":\"company.logo_icon\",\"value\":null}}', NULL, '2026-01-21 05:51:49', '2026-01-21 05:51:49'),
(60, 'default', 'Setting \'company.logo_image\' created', 'App\\Models\\CompanySetting', 27, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"key\":\"company.logo_image\",\"value\":\"branding\\/wKShftJrw0bXFztcL7JCAP7oCt8lyYK76YWFYOeG.webp\"}}', NULL, '2026-01-21 05:51:49', '2026-01-21 05:51:49'),
(61, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda Ciledug Dealer Resmi\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Promo, Kredit, & Service Terpercaya.\"}}},\"old\":{\"value\":null}}', NULL, '2026-01-21 05:51:49', '2026-01-21 05:51:49'),
(62, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:56:34', '2026-01-21 06:56:34'),
(63, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:56:34', '2026-01-21 06:56:34'),
(64, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example.com\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:56:45', '2026-01-21 06:56:45'),
(65, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example.com\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:56:45', '2026-01-21 06:56:45'),
(66, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:56:47', '2026-01-21 06:56:47'),
(67, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:56:47', '2026-01-21 06:56:47'),
(68, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example.com\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:57:01', '2026-01-21 06:57:01'),
(69, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example.com\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:57:01', '2026-01-21 06:57:01'),
(70, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example.com\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:57:28', '2026-01-21 06:57:28'),
(71, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@example.com\",\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:57:28', '2026-01-21 06:57:28'),
(72, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:58:24', '2026-01-21 06:58:24'),
(73, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 06:58:24', '2026-01-21 06:58:24'),
(74, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/qOwua0i9oYnKv9pUD3xaQDghqsSJWt9I9B49W57k.webp\"},\"old\":{\"value\":\"branding\\/wKShftJrw0bXFztcL7JCAP7oCt8lyYK76YWFYOeG.webp\"}}', NULL, '2026-01-21 07:20:23', '2026-01-21 07:20:23'),
(75, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/RCsoMRxwOot2BVuNWiaJPjc6w1UaE5AXsRsYTfvm.png\"},\"old\":{\"value\":\"branding\\/qOwua0i9oYnKv9pUD3xaQDghqsSJWt9I9B49W57k.webp\"}}', NULL, '2026-01-21 07:20:54', '2026-01-21 07:20:54'),
(76, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/Z6c9du6rpcvK4yG2fOLkOGuWG3mLXn2uzZWX9UrZ.png\"},\"old\":{\"value\":\"branding\\/RCsoMRxwOot2BVuNWiaJPjc6w1UaE5AXsRsYTfvm.png\"}}', NULL, '2026-01-21 07:40:19', '2026-01-21 07:40:19'),
(77, 'default', 'Setting \'company.address\' updated', 'App\\Models\\CompanySetting', 3, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"line1\":\"Jl. HOS. Cokroaminoto No.22\",\"city\":\"Kota Tangerang\",\"province\":\"Banten\",\"postal_code\":\"15154\"}},\"old\":{\"value\":{\"line1\":\"Jl. Merdeka No. 123\",\"city\":\"Jakarta Pusat\",\"province\":\"DKI Jakarta\",\"postal_code\":\"10110\"}}}', NULL, '2026-01-21 07:42:22', '2026-01-21 07:42:22'),
(78, 'default', 'Setting \'company.name\' updated', 'App\\Models\\CompanySetting', 1, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Honda IKM Ciledug\"},\"old\":{\"value\":\"Honda Ciledug Dealer Resmi\"}}', NULL, '2026-01-21 07:42:25', '2026-01-21 07:42:25'),
(79, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/ALSDVvPAc7szDjdegPMrKVa6Wy0MPHzVqr0hoMpN.png\"},\"old\":{\"value\":\"branding\\/Z6c9du6rpcvK4yG2fOLkOGuWG3mLXn2uzZWX9UrZ.png\"}}', NULL, '2026-01-21 07:42:25', '2026-01-21 07:42:25'),
(80, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Promo, Kredit, & Service Terpercaya.\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda Ciledug Dealer Resmi\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Promo, Kredit, & Service Terpercaya.\"}}}}', NULL, '2026-01-21 07:42:25', '2026-01-21 07:42:25'),
(81, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/mKlxk3o2ZYtBKRwklDqP8nA9piHPXALzn2B9slxY.png\"},\"old\":{\"value\":\"branding\\/ALSDVvPAc7szDjdegPMrKVa6Wy0MPHzVqr0hoMpN.png\"}}', NULL, '2026-01-21 08:00:08', '2026-01-21 08:00:08'),
(82, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"https:\\/\\/similarpng.com\\/honda-h-logo-on-transparent-background-png\\/\"},\"old\":{\"value\":\"branding\\/mKlxk3o2ZYtBKRwklDqP8nA9piHPXALzn2B9slxY.png\"}}', NULL, '2026-01-21 08:00:51', '2026-01-21 08:00:51'),
(83, 'default', 'Setting \'company.tagline\' updated', 'App\\Models\\CompanySetting', 2, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash&Credit, Trade In\"},\"old\":{\"value\":\"Dealer Resmi Honda Ciledug \\u2014 Promo, Kredit, & Service Terpercaya.\"}}', NULL, '2026-01-21 08:03:17', '2026-01-21 08:03:17'),
(84, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/mH6vMmlI51h55tl4Mh0xqHf19MpFZ7ugPLeiqJRJ.png\"},\"old\":{\"value\":\"https:\\/\\/similarpng.com\\/honda-h-logo-on-transparent-background-png\\/\"}}', NULL, '2026-01-21 08:03:17', '2026-01-21 08:03:17'),
(85, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash&Credit, Trade In\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Promo, Kredit, & Service Terpercaya.\"}}}}', NULL, '2026-01-21 08:03:17', '2026-01-21 08:03:17'),
(86, 'default', 'Setting \'company.tagline\' updated', 'App\\Models\\CompanySetting', 2, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash\\/Credit, Trade In\"},\"old\":{\"value\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash&Credit, Trade In\"}}', NULL, '2026-01-21 08:03:42', '2026-01-21 08:03:42'),
(87, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/2kQmz805fkXC7UJKDsbksB07evHU0mS6MC61EVeK.png\"},\"old\":{\"value\":\"branding\\/mH6vMmlI51h55tl4Mh0xqHf19MpFZ7ugPLeiqJRJ.png\"}}', NULL, '2026-01-21 08:03:42', '2026-01-21 08:03:42'),
(88, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash\\/Credit, Trade In\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash&Credit, Trade In\"}}}}', NULL, '2026-01-21 08:03:42', '2026-01-21 08:03:42'),
(89, 'default', 'Setting \'company.address\' updated', 'App\\Models\\CompanySetting', 3, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"line1\":\"Jl. HOS. Cokroaminoto No.22 Rt.002 Rw.001\",\"city\":\"Kota Tangerang\",\"province\":\"Banten\",\"postal_code\":\"15154\"}},\"old\":{\"value\":{\"line1\":\"Jl. HOS. Cokroaminoto No.22\",\"city\":\"Kota Tangerang\",\"province\":\"Banten\",\"postal_code\":\"15154\"}}}', NULL, '2026-01-21 08:14:14', '2026-01-21 08:14:14'),
(90, 'default', 'Setting \'company.contacts\' updated', 'App\\Models\\CompanySetting', 4, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/share.google\\/Bcbq6hElnpSZkefoP\"}},\"old\":{\"value\":{\"phone\":\"+62 21 555 8890\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 811 7788 990\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m18!1m12!1m3!1d126915.123456789!2d106.700!3d-6.200\"}}}', NULL, '2026-01-21 08:15:28', '2026-01-21 08:15:28'),
(91, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash\\/Credit, Trade In\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash\\/Credit, Trade In\"}}}}', NULL, '2026-01-21 08:15:28', '2026-01-21 08:15:28'),
(92, 'default', 'Setting \'company.tagline\' updated', 'App\\Models\\CompanySetting', 2, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Dealer Resmi Mobil Honda \\u2014 Authorized Honda Dealer\"},\"old\":{\"value\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash\\/Credit, Trade In\"}}', NULL, '2026-01-21 08:16:41', '2026-01-21 08:16:41'),
(93, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Mobil Honda \\u2014 Authorized Honda Dealer\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Honda Ciledug \\u2014 Test Drive, Cash\\/Credit, Trade In\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\"}}}}', NULL, '2026-01-21 08:16:41', '2026-01-21 08:16:41'),
(94, 'default', 'Page \'Mobil\' updated', 'App\\Models\\Page', 4, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Mobil\",\"slug\":\"mobil\"},\"old\":{\"title\":\"Produk\",\"slug\":\"product\"}}', NULL, '2026-01-21 08:33:22', '2026-01-21 08:33:22'),
(95, 'default', 'Page \'Honda BR-V\' created', 'App\\Models\\Page', 9, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Honda BR-V\",\"slug\":\"honda-br-v\",\"status\":\"draft\",\"meta_title\":null}}', NULL, '2026-01-21 09:28:46', '2026-01-21 09:28:46'),
(96, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 14:30:27', '2026-01-21 14:30:27'),
(97, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-21 14:30:27', '2026-01-21 14:30:27'),
(98, 'default', 'Setting \'company.socials\' updated', 'App\\Models\\CompanySetting', 5, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"instagram\":\"https:\\/\\/www.instagram.com\\/alpianhondaikmciledug\\/\"}},\"old\":{\"value\":{\"linkedin\":\"https:\\/\\/www.linkedin.com\\/company\\/harmony-strategic-group\",\"instagram\":\"https:\\/\\/www.instagram.com\\/harmonystrategic\"}}}', NULL, '2026-01-21 14:48:26', '2026-01-21 14:48:26'),
(99, 'default', 'Setting \'company.tagline\' updated', 'App\\Models\\CompanySetting', 2, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"Dealer Resmi Mobil Honda \\u2014 Trade In\\/Cash\\/Credit\\/Test Drive\"},\"old\":{\"value\":\"Dealer Resmi Mobil Honda \\u2014 Authorized Honda Dealer\"}}', NULL, '2026-01-21 15:03:55', '2026-01-21 15:03:55'),
(100, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Mobil Honda \\u2014 Trade In\\/Cash\\/Credit\\/Test Drive\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Mobil Honda \\u2014 Authorized Honda Dealer\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\"}}}}', NULL, '2026-01-21 15:03:55', '2026-01-21 15:03:55'),
(101, 'default', 'Setting \'company.contacts\' updated', 'App\\Models\\CompanySetting', 4, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/share.google\\/Bcbq6hElnpSZkefoP\"}},\"old\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/share.google\\/Bcbq6hElnpSZkefoP\"}}}', NULL, '2026-01-21 15:11:20', '2026-01-21 15:11:20'),
(102, 'default', 'Setting \'footer.content\' updated', 'App\\Models\\CompanySetting', 24, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Mobil Honda \\u2014 Trade In\\/Cash\\/Credit\\/Test Drive\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\"}}},\"old\":{\"value\":{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Mobil Honda \\u2014 Trade In\\/Cash\\/Credit\\/Test Drive\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"whatsapp\":\"+62 813 1770 0369\"}}}}', NULL, '2026-01-21 15:11:20', '2026-01-21 15:11:20'),
(103, 'default', 'Setting \'company.contacts\' updated', 'App\\Models\\CompanySetting', 4, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"<iframe src=\\\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d15864.95048649696!2d106.7335718!3d-6.2323744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0a51ec8383d%3A0x963f59c9330c8402!2sHonda%20IKM%20Ciledug!5e0!3m2!1sid!2sid!4v1769034825610!5m2!1sid!2sid\\\" width=\\\"600\\\" height=\\\"450\\\" style=\\\"border:0;\\\" allowfullscreen=\\\"\\\" loading=\\\"lazy\\\" referrerpolicy=\\\"no-referrer-when-downgrade\\\"><\\/iframe>\"}},\"old\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/share.google\\/Bcbq6hElnpSZkefoP\"}}}', NULL, '2026-01-21 15:36:35', '2026-01-21 15:36:35'),
(104, 'default', 'Setting \'company.contacts\' updated', 'App\\Models\\CompanySetting', 4, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d15864.95048649696!2d106.7335718!3d-6.2323744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0a51ec8383d%3A0x963f59c9330c8402!2sHonda%20IKM%20Ciledug!5e0!3m2!1sid!2sid!4v1769034825610!5m2!1sid!2sid\"}},\"old\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"<iframe src=\\\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d15864.95048649696!2d106.7335718!3d-6.2323744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0a51ec8383d%3A0x963f59c9330c8402!2sHonda%20IKM%20Ciledug!5e0!3m2!1sid!2sid!4v1769034825610!5m2!1sid!2sid\\\" width=\\\"600\\\" height=\\\"450\\\" style=\\\"border:0;\\\" allowfullscreen=\\\"\\\" loading=\\\"lazy\\\" referrerpolicy=\\\"no-referrer-when-downgrade\\\"><\\/iframe>\"}}}', NULL, '2026-01-21 15:38:57', '2026-01-21 15:38:57'),
(105, 'default', 'Setting \'company.contacts\' updated', 'App\\Models\\CompanySetting', 4, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Dealer Kami\",\"map_embed_url\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d15864.95048649696!2d106.7335718!3d-6.2323744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0a51ec8383d%3A0x963f59c9330c8402!2sHonda%20IKM%20Ciledug!5e0!3m2!1sid!2sid!4v1769034825610!5m2!1sid!2sid\"}},\"old\":{\"value\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Kantor\",\"map_embed_url\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d15864.95048649696!2d106.7335718!3d-6.2323744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0a51ec8383d%3A0x963f59c9330c8402!2sHonda%20IKM%20Ciledug!5e0!3m2!1sid!2sid!4v1769034825610!5m2!1sid!2sid\"}}}', NULL, '2026-01-21 15:40:03', '2026-01-21 15:40:03'),
(106, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"2404:c0:20b1:7a9b:b50e:7eeb:ec42:b292\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-21 17:49:40', '2026-01-21 17:49:40'),
(107, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"2404:c0:20b1:7a9b:b50e:7eeb:ec42:b292\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-21 17:49:40', '2026-01-21 17:49:40'),
(108, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"2404:c0:20b4:76f1:9841:eb0e:4a6:ed52\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-21 23:04:56', '2026-01-21 23:04:56'),
(109, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"2404:c0:20b4:76f1:9841:eb0e:4a6:ed52\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-21 23:04:56', '2026-01-21 23:04:56');
INSERT INTO `activity_log` (`id`, `log_name`, `description`, `subject_type`, `subject_id`, `event`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `created_at`, `updated_at`) VALUES
(110, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"2404:c0:2445:85d5:de6:ac7e:dbb4:dcdd\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-22 02:01:41', '2026-01-22 02:01:41'),
(111, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"2404:c0:2445:85d5:de6:ac7e:dbb4:dcdd\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-22 02:01:41', '2026-01-22 02:01:41'),
(112, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 03:18:18', '2026-01-22 03:18:18'),
(113, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 03:18:18', '2026-01-22 03:18:18'),
(114, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@admin.com\",\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 04:32:44', '2026-01-22 04:32:44'),
(115, 'default', 'Failed login attempt', NULL, NULL, NULL, NULL, NULL, '{\"email\":\"admin@admin.com\",\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 04:32:44', '2026-01-22 04:32:44'),
(116, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 04:32:54', '2026-01-22 04:32:54'),
(117, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/143.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 04:32:54', '2026-01-22 04:32:54'),
(118, 'default', 'Page \'tes\' created', 'App\\Models\\Page', 10, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"tes\",\"slug\":\"tes\",\"status\":\"published\",\"meta_title\":null}}', NULL, '2026-01-22 06:08:54', '2026-01-22 06:08:54'),
(119, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 06:09:52', '2026-01-22 06:09:52'),
(120, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-22 06:09:52', '2026-01-22 06:09:52'),
(121, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/ZgvZ2vScwTjgXI5IhtWhWya0FKrKWAQcDySDrQtg.jpg\"},\"old\":{\"value\":\"branding\\/2kQmz805fkXC7UJKDsbksB07evHU0mS6MC61EVeK.png\"}}', NULL, '2026-01-22 06:16:07', '2026-01-22 06:16:07'),
(122, 'default', 'Page \'Tentang Kami\' updated', 'App\\Models\\Page', 2, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"meta_title\":\"Tentang Honda IKM Group\"},\"old\":{\"meta_title\":\"Tentang Harmony Strategic Group\"}}', NULL, '2026-01-22 06:17:45', '2026-01-22 06:17:45'),
(123, 'default', 'Setting \'company.logo_image\' updated', 'App\\Models\\CompanySetting', 27, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"value\":\"branding\\/5CIew0zMEbw7Ql1be8w4vymLKb5ETj46G4q4TwfH.png\"},\"old\":{\"value\":\"branding\\/ZgvZ2vScwTjgXI5IhtWhWya0FKrKWAQcDySDrQtg.jpg\"}}', NULL, '2026-01-22 06:26:16', '2026-01-22 06:26:16'),
(124, 'default', 'Service \'Konsultasi Transformasi Digital\' deleted', 'App\\Models\\Service', 1, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Konsultasi Transformasi Digital\",\"slug\":\"konsultasi-transformasi-digital\",\"is_active\":true}}', NULL, '2026-01-22 06:35:19', '2026-01-22 06:35:19'),
(125, 'default', 'Service \'Pengembangan Aplikasi Kustom\' deleted', 'App\\Models\\Service', 2, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Pengembangan Aplikasi Kustom\",\"slug\":\"pengembangan-aplikasi-kustom\",\"is_active\":true}}', NULL, '2026-01-22 06:35:22', '2026-01-22 06:35:22'),
(126, 'default', 'Service \'Implementasi Data & AI\' deleted', 'App\\Models\\Service', 3, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Implementasi Data & AI\",\"slug\":\"implementasi-data-ai\",\"is_active\":true}}', NULL, '2026-01-22 06:35:25', '2026-01-22 06:35:25'),
(127, 'default', 'Service \'Operasional dan Managed Services\' deleted', 'App\\Models\\Service', 4, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Operasional dan Managed Services\",\"slug\":\"operasional-managed-services\",\"is_active\":true}}', NULL, '2026-01-22 06:35:28', '2026-01-22 06:35:28'),
(128, 'default', 'Service \'Pembelian Tunai (Cash)\' created', 'App\\Models\\Service', 5, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"name\":\"Pembelian Tunai (Cash)\",\"slug\":\"pembelian-tunai-cash\",\"is_active\":true}}', NULL, '2026-01-22 06:36:11', '2026-01-22 06:36:11'),
(129, 'default', 'Service \'Kredit & Cicilan (Credit)\' created', 'App\\Models\\Service', 6, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"name\":\"Kredit & Cicilan (Credit)\",\"slug\":\"kredit-cicilan-credit\",\"is_active\":true}}', NULL, '2026-01-22 06:36:38', '2026-01-22 06:36:38'),
(130, 'default', 'Service \'Tukar Tambah (Trade In)\' created', 'App\\Models\\Service', 7, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"name\":\"Tukar Tambah (Trade In)\",\"slug\":\"tukar-tambah-trade-in\",\"is_active\":true}}', NULL, '2026-01-22 06:37:04', '2026-01-22 06:37:04'),
(131, 'default', 'Service \'Test Drive\' created', 'App\\Models\\Service', 8, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"name\":\"Test Drive\",\"slug\":\"test-drive\",\"is_active\":true}}', NULL, '2026-01-22 06:37:25', '2026-01-22 06:37:25'),
(132, 'default', 'Page \'Mobil\' updated', 'App\\Models\\Page', 10, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Mobil\",\"slug\":\"mobill\"},\"old\":{\"title\":\"tes\",\"slug\":\"tes\"}}', NULL, '2026-01-22 06:56:07', '2026-01-22 06:56:07'),
(133, 'default', 'Page \'Mobil\' deleted', 'App\\Models\\Page', 4, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"title\":\"Mobil\",\"slug\":\"mobil\",\"status\":\"published\",\"meta_title\":\"Program & Solusi Harmony Strategic Group\"}}', NULL, '2026-01-22 06:56:41', '2026-01-22 06:56:41'),
(134, 'default', 'Page \'Honda Brv N7x\' updated', 'App\\Models\\Page', 10, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Honda Brv N7x\",\"slug\":\"honda-brv-n7x\"},\"old\":{\"title\":\"Mobil\",\"slug\":\"mobill\"}}', NULL, '2026-01-22 06:57:53', '2026-01-22 06:57:53'),
(135, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-22 07:04:42', '2026-01-22 07:04:42'),
(136, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"103.18.34.164\",\"user_agent\":\"Mozilla\\/5.0 (Linux; Android 10; K) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Mobile Safari\\/537.36\"}', NULL, '2026-01-22 07:04:43', '2026-01-22 07:04:43'),
(137, 'default', 'Setting \'branding.favicon_ico\' created', 'App\\Models\\CompanySetting', 28, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"key\":\"branding.favicon_ico\",\"value\":\"branding\\/favicon.ico\"}}', NULL, '2026-01-22 07:09:58', '2026-01-22 07:09:58'),
(138, 'default', 'Setting \'branding.favicon_svg\' created', 'App\\Models\\CompanySetting', 29, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"key\":\"branding.favicon_svg\",\"value\":\"branding\\/favicon.svg\"}}', NULL, '2026-01-22 07:09:58', '2026-01-22 07:09:58'),
(139, 'default', 'Setting \'branding.apple_touch_icon\' created', 'App\\Models\\CompanySetting', 30, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"key\":\"branding.apple_touch_icon\",\"value\":\"branding\\/apple-touch-icon.png\"}}', NULL, '2026-01-22 07:09:58', '2026-01-22 07:09:58'),
(140, 'default', 'Page \'Honda BR-V\' deleted', 'App\\Models\\Page', 9, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"title\":\"Honda BR-V\",\"slug\":\"honda-br-v\",\"status\":\"draft\",\"meta_title\":null}}', NULL, '2026-01-22 07:12:53', '2026-01-22 07:12:53'),
(141, 'default', 'Page \'Beranda\' updated', 'App\\Models\\Page', 1, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"meta_title\":\"Honda IKM Ciledug\"},\"old\":{\"meta_title\":\"Harmony Strategic Group | Mitra Bisnis Lintas Industri\"}}', NULL, '2026-01-22 07:32:05', '2026-01-22 07:32:05'),
(142, 'default', 'Page \'Proyek\' deleted', 'App\\Models\\Page', 5, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"title\":\"Proyek\",\"slug\":\"project\",\"status\":\"published\",\"meta_title\":\"Portofolio Proyek Harmony Strategic Group\"}}', NULL, '2026-01-22 07:56:16', '2026-01-22 07:56:16'),
(143, 'default', 'Page \'Profil\' updated', 'App\\Models\\Page', 10, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Profil\",\"slug\":\"profil\"},\"old\":{\"title\":\"Honda Brv N7x\",\"slug\":\"honda-brv-n7x\"}}', NULL, '2026-01-22 07:57:30', '2026-01-22 07:57:30'),
(144, 'default', 'Page \'Honda Brio\' created', 'App\\Models\\Page', 11, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Honda Brio\",\"slug\":\"honda-brio\",\"status\":\"draft\",\"meta_title\":null}}', NULL, '2026-01-22 07:59:53', '2026-01-22 07:59:53'),
(145, 'default', 'Service \'Kredit / Cicilan (Credit)\' updated', 'App\\Models\\Service', 6, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"name\":\"Kredit \\/ Cicilan (Credit)\"},\"old\":{\"name\":\"Kredit & Cicilan (Credit)\"}}', NULL, '2026-01-22 08:00:58', '2026-01-22 08:00:58'),
(146, 'default', 'Project \'Portal Investasi Daerah\' deleted', 'App\\Models\\Project', 1, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Portal Investasi Daerah\",\"slug\":\"portal-investasi-daerah\",\"client_name\":\"Pemprov Jawa Barat\",\"status\":\"completed\"}}', NULL, '2026-01-22 08:02:11', '2026-01-22 08:02:11'),
(147, 'default', 'Project \'Platform Distribusi Farmasi\' deleted', 'App\\Models\\Project', 2, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Platform Distribusi Farmasi\",\"slug\":\"platform-distribusi-farmasi\",\"client_name\":\"PT Sehat Sentosa\",\"status\":\"in_progress\"}}', NULL, '2026-01-22 08:02:13', '2026-01-22 08:02:13'),
(148, 'default', 'Project \'Renewable Energy Monitoring\' deleted', 'App\\Models\\Project', 3, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"name\":\"Renewable Energy Monitoring\",\"slug\":\"renewable-energy-monitoring\",\"client_name\":\"Energi Hijau Indonesia\",\"status\":\"planning\"}}', NULL, '2026-01-22 08:02:15', '2026-01-22 08:02:15'),
(153, 'default', 'Page \'Mobil\' updated', 'App\\Models\\Page', 10, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"Mobil\"},\"old\":{\"title\":\"Profil\"}}', NULL, '2026-01-22 08:04:25', '2026-01-22 08:04:25'),
(158, 'default', 'Page \'Honda Brio\' updated', 'App\\Models\\Page', 11, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"status\":\"published\"},\"old\":{\"status\":\"draft\"}}', NULL, '2026-01-22 08:06:45', '2026-01-22 08:06:45'),
(159, 'default', 'Page \'Honda Brio\' deleted', 'App\\Models\\Page', 11, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"title\":\"Honda Brio\",\"slug\":\"honda-brio\",\"status\":\"published\",\"meta_title\":null}}', NULL, '2026-01-22 08:11:24', '2026-01-22 08:11:24'),
(160, 'default', 'Page \'honda brio\' created', 'App\\Models\\Page', 12, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"honda brio\",\"slug\":\"honda-brio\",\"status\":\"published\",\"meta_title\":null}}', NULL, '2026-01-22 08:11:59', '2026-01-22 08:11:59'),
(161, 'default', 'Page \'honda brio\' deleted', 'App\\Models\\Page', 12, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"title\":\"honda brio\",\"slug\":\"honda-brio\",\"status\":\"published\",\"meta_title\":null}}', NULL, '2026-01-22 08:12:37', '2026-01-22 08:12:37'),
(173, 'default', 'Page \'tes\' created', 'App\\Models\\Page', 24, 'created', 'App\\Models\\User', 1, '{\"attributes\":{\"title\":\"tes\",\"slug\":\"tes\",\"status\":\"published\",\"meta_title\":null}}', NULL, '2026-01-22 08:40:53', '2026-01-22 08:40:53'),
(174, 'default', 'Page \'tes\' deleted', 'App\\Models\\Page', 24, 'deleted', 'App\\Models\\User', 1, '{\"old\":{\"title\":\"tes\",\"slug\":\"tes\",\"status\":\"published\",\"meta_title\":null}}', NULL, '2026-01-22 08:40:59', '2026-01-22 08:40:59'),
(175, 'default', 'Page \'Mobil\' updated', 'App\\Models\\Page', 10, 'updated', 'App\\Models\\User', 1, '{\"attributes\":{\"slug\":\"mobill\"},\"old\":{\"slug\":\"profil\"}}', NULL, '2026-01-22 08:42:03', '2026-01-22 08:42:03'),
(176, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-24 10:10:30', '2026-01-24 10:10:30'),
(177, 'default', 'User logged in', NULL, NULL, NULL, 'App\\Models\\User', 1, '{\"ip\":\"115.178.48.68\",\"user_agent\":\"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/144.0.0.0 Safari\\/537.36\"}', NULL, '2026-01-24 10:10:30', '2026-01-24 10:10:30');

-- --------------------------------------------------------

--
-- Struktur dari tabel `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `cta_variants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cta_variants`)),
  `body` longtext DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `author_id`, `category_id`, `title`, `slug`, `excerpt`, `meta_title`, `meta_description`, `og_title`, `cta_variants`, `body`, `cover_image`, `is_published`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Membangun Platform Pemerintahan Digital yang Andal', 'membangun-platform-pemerintahan-digital', 'Belajar dari implementasi portal layanan publik terpadu yang kami kembangkan bersama pemerintah daerah.', NULL, NULL, NULL, NULL, 'Transformasi digital di sektor publik membutuhkan pendekatan kolaboratif antara tim teknis, domain expert, dan warga. Artikel ini mengulas tahapan discovery, pengembangan, hingga change management.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 1, '2026-01-16 04:45:48', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(2, 1, 3, 'Studi Kasus: Modernisasi Infrastruktur Data untuk Korporasi', 'modernisasi-infrastruktur-data', 'Bagaimana kami membantu perusahaan energi melakukan konsolidasi data realtime untuk analisis operasional.', NULL, NULL, NULL, NULL, 'Modernisasi data bukan sekadar memindahkan data ke cloud. Dibutuhkan strategi governance, orkestrasi pipeline, dan enablement tim internal agar manfaatnya optimal.', 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d', 1, '2026-01-09 04:45:48', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(3, 1, 4, 'Checklist Kesiapan Transformasi Digital untuk UMKM', 'checklist-transformasi-digital-umkm', 'Panduan praktis langkah awal digitalisasi yang telah kami validasi bersama ratusan UMKM.', NULL, NULL, NULL, NULL, 'Artikel ini membahas aspek proses bisnis, people, teknologi, dan pendanaan yang perlu disiapkan sebelum mengadopsi solusi digital.', 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc', 1, '2026-01-01 04:45:48', '2026-01-21 04:45:48', '2026-01-21 04:45:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Berita', 'berita', 'Berita terbaru seputar perusahaan dan industri.', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(2, 'Pengumuman', 'pengumuman', 'Pengumuman penting dari perusahaan.', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(3, 'Artikel', 'artikel', 'Artikel informatif dan insight bisnis.', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(4, 'Tips & Tutorial', 'tips-tutorial', 'Tips dan tutorial praktis.', '2026-01-21 04:45:48', '2026-01-21 04:45:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `company_settings`
--

CREATE TABLE `company_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `company_settings`
--

INSERT INTO `company_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES
(1, 'company.name', '\"Honda IKM Ciledug\"', 'company', '2026-01-21 04:45:48', '2026-01-21 07:42:25'),
(2, 'company.tagline', '\"Dealer Resmi Mobil Honda \\u2014 Trade In\\/Cash\\/Credit\\/Test Drive\"', 'company', '2026-01-21 04:45:48', '2026-01-21 15:03:55'),
(3, 'company.address', '{\"line1\":\"Jl. HOS. Cokroaminoto No.22 Rt.002 Rw.001\",\"city\":\"Kota Tangerang\",\"province\":\"Banten\",\"postal_code\":\"15154\"}', 'contact', '2026-01-21 04:45:48', '2026-01-21 08:14:14'),
(4, 'company.contacts', '{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\",\"map_label\":\"Lokasi Dealer Kami\",\"map_embed_url\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d15864.95048649696!2d106.7335718!3d-6.2323744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0a51ec8383d%3A0x963f59c9330c8402!2sHonda%20IKM%20Ciledug!5e0!3m2!1sid!2sid!4v1769034825610!5m2!1sid!2sid\"}', 'contact', '2026-01-21 04:45:48', '2026-01-21 15:40:03'),
(5, 'company.socials', '{\"instagram\":\"https:\\/\\/www.instagram.com\\/alpianhondaikmciledug\\/\"}', 'contact', '2026-01-21 04:45:48', '2026-01-21 14:48:26'),
(6, 'landing.hero', '{\"heading\":{\"id\":\"Kemitraan Strategis untuk Pertumbuhan Bisnis Anda\",\"en\":\"Strategic Partnership for Your Business Growth\"},\"subheading\":{\"id\":\"Kami membantu organisasi di berbagai industri mengoptimalkan operasional, meningkatkan nilai layanan, dan mewujudkan inisiatif transformasi bisnis yang berdampak.\",\"en\":\"We support organisations across industries in optimising operations, elevating customer value, and realising impactful business transformation initiatives.\"},\"primary_label\":{\"id\":\"Diskusikan Kebutuhan\",\"en\":\"Discuss Your Needs\"},\"primary_link\":{\"id\":\"\\/contact\",\"en\":\"\\/contact\"},\"secondary_label\":{\"id\":\"Lihat Solusi\",\"en\":\"Explore Solutions\"},\"secondary_link\":{\"id\":\"\\/service\",\"en\":\"\\/service\"},\"image\":null}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(7, 'landing.about', '{\"title\":{\"id\":\"Tentang Harmony Strategic Group\",\"en\":\"About Harmony Strategic Group\"},\"description\":{\"id\":\"Sejak 2010 kami bermitra dengan perusahaan publik dan swasta di sektor manufaktur, jasa, kesehatan, energi, dan retail untuk menghadirkan solusi bisnis terintegrasi. Tim kami menggabungkan keahlian strategi, operasional, dan perubahan organisasi untuk memberikan hasil yang terukur.\",\"en\":\"Since 2010 we have partnered with public and private enterprises across manufacturing, services, healthcare, energy, and retail to deliver integrated business solutions. Our team blends strategy, operations, and change management expertise to drive measurable impact.\"},\"highlights\":{\"id\":[\"Jejak proyek di lebih dari 15 sektor industri\",\"Pendekatan berbasis data dan kebutuhan lapangan\",\"Program implementasi dan pendampingan end-to-end\",\"Fokus pada hasil bisnis dan keberlanjutan kemitraan\"],\"en\":[\"Project footprint across 15+ industry sectors\",\"Data-driven and on-the-ground approach\",\"End-to-end implementation and enablement programs\",\"Commitment to business outcomes and lasting partnerships\"]},\"image\":null}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(8, 'landing.final_cta', '{\"heading\":{\"id\":\"Siap Mengambil Langkah Selanjutnya?\",\"en\":\"Ready for the Next Step?\"},\"description\":{\"id\":\"Mari diskusikan bagaimana kami dapat membantu mewujudkan tujuan bisnis Anda. Hubungi kami hari ini untuk sesi konsultasi tanpa biaya.\",\"en\":\"Let\\u2019s discuss how we can help you achieve your business goals. Contact us today for a complimentary consultation.\"},\"button_label\":{\"id\":\"Hubungi Kami\",\"en\":\"Contact Us\"},\"button_link\":{\"id\":\"\\/contact\",\"en\":\"\\/contact\"}}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(9, 'landing.metrics', '[{\"value\":{\"id\":\"150+\",\"en\":\"150+\"},\"label\":{\"id\":\"Organisasi Terlayani\",\"en\":\"Organisations Served\"}},{\"value\":{\"id\":\"20\",\"en\":\"20\"},\"label\":{\"id\":\"Provinsi dan Negara Operasi\",\"en\":\"Regions of Operation\"}},{\"value\":{\"id\":\"92%\",\"en\":\"92%\"},\"label\":{\"id\":\"Rasio Proyek Berulang\",\"en\":\"Repeat Engagement Rate\"}}]', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(10, 'product.cta', '{\"badge\":{\"id\":\"Butuh Solusi?\",\"en\":\"Need a tailored solution?\"},\"heading\":{\"id\":\"Butuh Solusi yang Disesuaikan?\",\"en\":\"Need a tailored solution?\"},\"description\":{\"id\":\"Jika kebutuhan Anda spesifik, tim kami siap merancang program dan layanan yang sesuai dengan karakteristik industri serta target bisnis perusahaan.\",\"en\":\"When requirements are unique, our team can design programmes and services that reflect your industry context and business goals.\"},\"primary_label\":{\"id\":\"Hubungi Kami\",\"en\":\"Contact Us\"},\"primary_link\":{\"id\":\"\\/contact\",\"en\":\"\\/contact\"},\"secondary_label\":{\"id\":\"Lihat Layanan\",\"en\":\"View Services\"},\"secondary_link\":{\"id\":\"\\/service\",\"en\":\"\\/service\"},\"contacts\":[{\"icon\":\"phone\",\"title\":{\"id\":\"Telepon\",\"en\":\"Phone\"},\"detail\":{\"id\":\"+62 877 1696 7890\",\"en\":\"+62 877 1696 7890\"}},{\"icon\":\"mail\",\"title\":{\"id\":\"Email\",\"en\":\"Email\"},\"detail\":{\"id\":\"info@example.com\",\"en\":\"info@example.com\"}},{\"icon\":\"clock\",\"title\":{\"id\":\"Jam Kerja\",\"en\":\"Working Hours\"},\"detail\":{\"id\":\"Senin - Jumat, 09:00 - 18:00\",\"en\":\"Monday - Friday, 09:00 - 18:00\"}}]}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(11, 'product.stats', '{\"labels\":{\"products\":{\"id\":\"Program Unggulan\",\"en\":\"Flagship Programmes\"},\"clients\":{\"id\":\"Klien Puas\",\"en\":\"Satisfied Clients\"},\"rating\":{\"id\":\"Rating Kemitraan\",\"en\":\"Partnership Rating\"},\"awards\":{\"id\":\"Penghargaan\",\"en\":\"Awards\"}},\"awards\":18}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(12, 'product.hero', '{\"badge\":{\"id\":\"Produk Strategis\",\"en\":\"Strategic Products\"},\"heading\":{\"id\":\"Solusi produk siap pakai untuk transformasi bisnis\",\"en\":\"Ready-to-ship product solutions for business transformation\"},\"description\":{\"id\":\"Temukan rangkaian produk digital yang membantu mempercepat efisiensi operasional dan pengalaman pelanggan di berbagai industri.\",\"en\":\"Explore modular digital products that accelerate operational efficiency and customer experience across industries.\"}}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(13, 'project.hero', '{\"badge\":{\"id\":\"Portofolio Proyek\",\"en\":\"Project Portfolio\"},\"heading\":{\"id\":\"Studi kasus implementasi lintas sektor\",\"en\":\"Cross-industry implementation case studies\"},\"description\":{\"id\":\"Ikuti perjalanan transformasi yang kami lakukan bersama klien di sektor publik, swasta, dan BUMN mulai dari inisiasi hingga keberlanjutan.\",\"en\":\"See how we partner with public and private sector clients from discovery through sustained transformation.\"}}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(14, 'career.hero', '{\"badge\":{\"id\":\"Life at Harmony\",\"en\":\"Life at Harmony\"},\"heading\":{\"id\":\"Bangun karier berdampak bersama tim lintas disiplin\",\"en\":\"Shape an impactful career with a multi-disciplinary team\"},\"description\":{\"id\":\"Kami membuka kesempatan bagi talenta yang siap memimpin perubahan dan berkembang melalui coaching, pembelajaran, dan lingkungan kerja hibrida.\",\"en\":\"We welcome talents ready to drive change with access to coaching, learning, and a flexible hybrid work environment.\"}}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(15, 'blog.hero', '{\"badge\":{\"id\":\"Insight\",\"en\":\"Insights\"},\"heading\":{\"id\":\"Insight Bisnis & Industri\",\"en\":\"Business & Industry Insights\"},\"description\":{\"id\":\"Artikel, studi kasus, dan tips praktis untuk mengelola perubahan dan mengembangkan bisnis.\",\"en\":\"Articles, case studies, and practical guidance to manage change and grow your organisation.\"}}', 'landing', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(16, 'service.hero', '{\"heading\":\"Solusi Bisnis Terintegrasi untuk\",\"subheading\":\"Kami mendampingi perusahaan dari berbagai sektor untuk meningkatkan efisiensi operasional, kualitas layanan, dan kesiapan pertumbuhan berkelanjutan.\",\"highlight\":\"Pertumbuhan Berkelanjutan\",\"primary_label\":\"Lihat Layanan\",\"primary_link\":\"\\/service\",\"secondary_label\":\"Diskusikan Kebutuhan\",\"secondary_link\":\"\\/contact\",\"background_image\":\"https:\\/\\/images.unsplash.com\\/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop\"}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(17, 'service.summary', '{\"badge\":\"Portofolio Layanan\",\"heading\":\"Solusi yang Kami Tawarkan\",\"description\":\"Pendekatan menyeluruh yang menggabungkan konsultasi bisnis, optimalisasi proses, dan implementasi program perubahan di lapangan.\"}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(18, 'service.offerings', '{\"badge\":\"Layanan Kami\",\"heading\":\"Apa yang Kami Tawarkan\",\"description\":\"Rangkaian layanan fleksibel yang dapat disesuaikan untuk perusahaan jasa, manufaktur, pendidikan, kesehatan, energi, dan sektor publik.\",\"items\":[{\"title\":\"Konsultasi Transformasi Digital\",\"description\":\"Menyusun peta jalan digital, tata kelola data, hingga penguatan kapabilitas teknologi internal.\",\"icon\":\"Layers\"},{\"title\":\"Pengembangan Solusi Kustom\",\"description\":\"Mendesain dan membangun solusi aplikasi yang terintegrasi dengan proses bisnis inti.\",\"icon\":\"Code\"},{\"title\":\"Operasional & Managed Service\",\"description\":\"Mendampingi pengoperasian harian, command center, dan monitoring kinerja multi lokasi.\",\"icon\":\"Workflow\"},{\"title\":\"Program Perubahan Organisasi\",\"description\":\"Mengelola change management, coaching pimpinan, dan pelatihan adopsi teknologi.\",\"icon\":\"Users\"}]}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(19, 'service.tech_stack', '{\"heading\":\"Kompetensi Utama Kami\",\"description\":\"Tim lintas disiplin dengan keahlian strategi bisnis, operasional, pemasaran, pengelolaan perubahan, hingga digital enablement.\",\"items\":[{\"name\":\"Operational Excellence\",\"logo\":null,\"icon\":\"Workflow\"},{\"name\":\"Customer Experience Design\",\"logo\":null,\"icon\":\"LayoutTemplate\"},{\"name\":\"Supply Chain Optimisation\",\"logo\":null,\"icon\":\"Package\"},{\"name\":\"People & Change Management\",\"logo\":null,\"icon\":\"Users\"},{\"name\":\"Business Intelligence & Reporting\",\"logo\":null,\"icon\":\"Activity\"},{\"name\":\"Service Quality Improvement\",\"logo\":null,\"icon\":\"LineChart\"},{\"name\":\"Digital Enablement\",\"logo\":null,\"icon\":\"CircuitBoard\"},{\"name\":\"Sustainability Programme Advisory\",\"logo\":null,\"icon\":\"Leaf\"}]}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(20, 'service.process', '{\"badge\":\"Metodologi Kami\",\"heading\":\"Proses Kerja Kami\",\"description\":null,\"items\":[{\"step\":\"01\",\"title\":\"Diagnosa Bisnis\",\"description\":\"Menggali tantangan utama dan prioritas strategis bersama pemangku kepentingan lintas fungsi.\",\"icon\":\"Search\"},{\"step\":\"02\",\"title\":\"Perancangan Solusi\",\"description\":\"Menyusun inisiatif, indikator keberhasilan, dan rencana implementasi bertahap.\",\"icon\":\"LayoutTemplate\"},{\"step\":\"03\",\"title\":\"Eksekusi & Pilot\",\"description\":\"Mengawal implementasi, melakukan uji coba terkontrol, dan menyesuaikan dengan kondisi lapangan.\",\"icon\":\"Code\"},{\"step\":\"04\",\"title\":\"Adopsi & Optimasi\",\"description\":\"Mengukur hasil, memperkuat kapabilitas tim internal, dan memastikan keberlanjutan program.\",\"icon\":\"Rocket\"}]}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(21, 'service.advantages', '{\"badge\":\"Keunggulan Kami\",\"heading\":\"Mengapa Memilih Kami?\",\"description\":null,\"items\":[{\"title\":\"Tim Lintas Industri\",\"description\":\"Konsultan dengan pengalaman memimpin proyek di sektor manufaktur, jasa, energi, kesehatan, dan publik.\",\"icon\":\"Users\"},{\"title\":\"Pendekatan Berbasis Hasil\",\"description\":\"Setiap inisiatif dikaitkan dengan indikator kinerja dan penghematan biaya yang jelas.\",\"icon\":\"Layers\"},{\"title\":\"Kemitraan Berkelanjutan\",\"description\":\"Pendampingan implementasi, pelatihan, dan program monitoring berkala.\",\"icon\":\"LifeBuoy\"},{\"title\":\"Governance & Compliance\",\"description\":\"Memastikan prakarsa bisnis mematuhi kebijakan perusahaan serta regulasi industri.\",\"icon\":\"Shield\"}]}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(22, 'service.faqs', '{\"badge\":\"Butuh Bantuan?\",\"heading\":\"Pertanyaan Umum\",\"description\":\"Temukan jawaban atas pertanyaan yang paling sering diajukan oleh klien kami.\",\"items\":[{\"question\":\"Berapa lama waktu rata-rata sebuah program berjalan?\",\"answer\":\"Durasi bergantung pada ruang lingkup. Program penguatan proses operasional umumnya berlangsung 6-12 minggu, sedangkan transformasi skala perusahaan dapat berjalan lebih panjang dengan beberapa fase.\"},{\"question\":\"Apakah kami mendapatkan laporan perkembangan secara rutin?\",\"answer\":\"Ya. Kami menyiapkan jalur komunikasi dan dashboard monitoring agar setiap pemangku kepentingan dapat memantau status, capaian, dan rekomendasi berikutnya.\"},{\"question\":\"Bagaimana pendampingan setelah program selesai?\",\"answer\":\"Kami menawarkan paket sustainment yang mencakup coaching, audit berkala, dan dukungan pengelolaan perubahan untuk memastikan manfaat program terus dirasakan.\"},{\"question\":\"Bagaimana struktur investasi layanan?\",\"answer\":\"Nilai investasi disesuaikan dengan kompleksitas, lokasi, dan target hasil. Setelah asesmen awal, kami menyusun proposal lengkap beserta tahapan pembayaran yang transparan.\"}]}', 'service', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(23, 'navigation.primary', '[]', 'navigation', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(24, 'footer.content', '{\"company\":{\"name\":\"Honda IKM Ciledug\",\"description\":\"Dealer Resmi Mobil Honda \\u2014 Trade In\\/Cash\\/Credit\\/Test Drive\"},\"contacts\":{\"phone\":\"+62 21 22797 888\",\"email\":\"alpian@honda-ciledug.com\",\"whatsapp\":\"+62 813 1770 0369\"}}', 'landing', '2026-01-21 04:45:48', '2026-01-21 15:11:20'),
(25, 'seo.pages', NULL, 'seo', '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(26, 'company.logo_icon', NULL, 'company', '2026-01-21 05:51:49', '2026-01-21 05:51:49'),
(27, 'company.logo_image', '\"branding\\/5CIew0zMEbw7Ql1be8w4vymLKb5ETj46G4q4TwfH.png\"', 'company', '2026-01-21 05:51:49', '2026-01-22 06:26:16'),
(28, 'branding.favicon_ico', '\"branding\\/favicon.ico\"', 'branding', '2026-01-22 07:09:58', '2026-01-22 07:09:58'),
(29, 'branding.favicon_svg', '\"branding\\/favicon.svg\"', 'branding', '2026-01-22 07:09:58', '2026-01-22 07:09:58'),
(30, 'branding.apple_touch_icon', '\"branding\\/apple-touch-icon.png\"', 'branding', '2026-01-22 07:09:58', '2026-01-22 07:09:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  `handled_at` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `handled_at`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'Mr. Charley Effertz', 'anderson.liza@example.org', '1-919-614-5777', 'Laborum repudiandae quasi eaque.', 'Officia nobis sed a recusandae. Vitae voluptatem perspiciatis voluptatem quis ipsum. Itaque sint et voluptatem et et. Maiores officiis sed assumenda quos libero.', 'in_progress', NULL, NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(2, 'Dr. Quinn Casper DVM', 'rudy.hand@example.com', '312-474-8212', NULL, 'Maxime distinctio nobis vel. Deserunt blanditiis in nostrum aut harum aperiam. Doloribus earum fugit vel amet.', 'new', NULL, 'Hic excepturi qui totam consectetur.', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(3, 'Mrs. Providenci Torphy Jr.', 'yupton@example.com', NULL, NULL, 'Tenetur similique vero est sed non. Consectetur aperiam nostrum enim hic aut omnis. Eos voluptate ut est consequatur et.', 'in_progress', NULL, 'Provident exercitationem laboriosam voluptatem cumque.', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(4, 'Jean Purdy', 'ona08@example.net', '+1 (947) 359-0017', 'Quo consequuntur neque alias.', 'Velit deserunt voluptatem consequatur magni aliquid voluptatem. Sint optio tempora ratione in. Libero ipsum laborum sunt est eligendi eum quod.', 'in_progress', NULL, 'Neque et quia vitae aut soluta.', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(5, 'Josiane Howe', 'corwin.horace@example.org', '272.749.2074', 'Provident voluptatem ex magni repellat.', 'Incidunt aut ut dolorum consequatur libero autem optio. Voluptas illum numquam repellendus debitis et quisquam reiciendis cumque. Ab minima quam ut quidem repellat aut.', 'in_progress', NULL, NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(6, 'Golda Von III', 'white.lilly@example.net', NULL, 'Vel totam ut tenetur.', 'Quidem rerum a quaerat ullam. Rem asperiores quod iusto voluptate fugit. Error non non quis consectetur nostrum. Consequatur atque molestiae ut illo qui sequi.', 'resolved', NULL, NULL, '2026-01-21 04:45:47', '2026-01-21 04:45:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gemini_requests`
--

CREATE TABLE `gemini_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'queued',
  `summary` varchar(255) DEFAULT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`result`)),
  `error_message` text DEFAULT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `duration_ms` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_position_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_position_id`, `name`, `email`, `phone`, `linkedin_url`, `portfolio_url`, `resume_path`, `cover_letter`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 'Melissa O\'Reilly', 'chelsey36@example.com', '+62 82159426561', NULL, NULL, NULL, 'Odio dolores culpa praesentium consequatur qui incidunt et. Qui voluptatem numquam non tempore praesentium sunt qui. Nihil amet iure sint corrupti quibusdam sit. Earum ullam et et temporibus nemo hic qui.', 'reviewing', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(2, 5, 'Kane Baumbach I', 'schroeder.maci@example.com', '+62 85797080194', 'http://williamson.info/numquam-dolorem-ducimus-architecto-molestias-maiores', 'http://lemke.com/', NULL, 'Labore expedita deserunt et possimus fuga nesciunt doloremque. Corporis quos est quibusdam unde dolores qui sunt. Saepe similique laboriosam magnam tempore nihil optio perferendis.', 'shortlisted', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(3, 6, 'Simone Kuhlman', 'syble.hessel@example.com', '+62 88768919019', NULL, NULL, NULL, 'Pariatur qui fuga est qui exercitationem eum facere dolore. Dignissimos optio soluta consectetur aperiam soluta aut. Est quam consectetur dolorem inventore reprehenderit.', 'shortlisted', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(4, 7, 'Rosamond Goodwin', 'johnston.orion@example.com', '+62 81581254835', 'http://www.douglas.com/cumque-earum-est-eum.html', 'http://fahey.com/et-optio-cupiditate-voluptatibus-odit.html', NULL, 'Temporibus enim voluptatem doloribus totam ducimus asperiores. Quisquam voluptatem impedit ad doloremque in ut voluptatum. Itaque qui deserunt est aut culpa minima sequi. Ut excepturi consequuntur minima voluptatum incidunt voluptatem itaque.', 'reviewing', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(5, 8, 'Ila Vandervort', 'cartwright.rowena@example.org', '+62 80441049778', NULL, 'http://haag.com/', NULL, 'Tempora reprehenderit et consequatur. Id numquam ratione incidunt labore sunt quia et. Et ut placeat porro quaerat consequatur.', 'reviewing', '2026-01-21 04:45:47', '2026-01-21 04:45:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_positions`
--

CREATE TABLE `job_positions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `employment_type` varchar(255) NOT NULL DEFAULT 'full_time',
  `salary_range` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `posted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `job_positions`
--

INSERT INTO `job_positions` (`id`, `title`, `slug`, `department`, `location`, `employment_type`, `salary_range`, `description`, `requirements`, `is_active`, `posted_at`, `created_at`, `updated_at`) VALUES
(1, 'Senior Backend Engineer', 'senior-backend-engineer', 'Technology', 'Jakarta / Remote', 'full_time', 'Rp 18 - 25 juta', 'Bertanggung jawab atas perancangan dan implementasi microservice berskala nasional.', 'Berpengalaman pada Laravel atau Node.js minimal 4 tahun, memahami arsitektur event-driven, serta praktik CI/CD.', 1, '2026-01-19 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(2, 'Product Manager', 'product-manager', 'Product', 'Bandung / Hybrid', 'full_time', 'Rp 20 - 28 juta', 'Mengelola roadmap produk SaaS B2B dengan pendekatan discovery dan delivery yang seimbang.', 'Pengalaman memimpin produk digital minimal 3 tahun, mampu berkolaborasi lintas fungsi, dan data driven.', 1, '2026-01-14 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(3, 'UI/UX Researcher', 'ui-ux-researcher', 'Design', 'Surabaya / Remote', 'contract', 'Rp 12 - 16 juta', 'Melakukan studi pengguna, usability testing, dan menyusun insight yang actionable.', 'Mampu mengelola end-to-end riset pengguna dan menyajikan temuan dalam bentuk storytelling.', 1, '2026-01-11 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(4, 'Rolling Machine Setter', 'rolling-machine-setter-539', 'Design', 'Port Clemensside', 'contract', 'Rp 9 - 24 juta', 'Et facere eius nam quia voluptates eligendi illo. Consequatur tempora nulla dolores necessitatibus. Omnis qui velit eos saepe ad sit. Ut ipsum accusantium aspernatur.', 'Architecto repellat fugit occaecati earum doloremque. Voluptate doloribus excepturi officia tempore nihil. Omnis esse voluptatem exercitationem corrupti ut omnis. Ipsum autem nihil illum quisquam voluptatem. Dolorum quis placeat veritatis et esse.', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(5, 'Marine Architect', 'marine-architect-933', 'Design', 'Lake Vickieview', 'contract', 'Rp 8 - 30 juta', 'Suscipit beatae accusamus ut expedita sed perspiciatis. Et ut repudiandae placeat est quae nam.', 'Eum voluptatem ut molestiae laudantium velit voluptatibus. Rerum enim fuga commodi. Amet voluptatem laudantium fugit et eum sapiente. Aut maxime dicta eos officiis.', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(6, 'Drafter', 'drafter-760', 'Technology', 'Shanaville', 'full_time', 'Rp 19 - 24 juta', 'Vel dolorem voluptates inventore sit nihil adipisci. Ullam tenetur accusamus nihil id tempora ut. Nam vel non ipsam facilis.', 'Et provident atque maxime dolorem blanditiis incidunt. Ipsam ad temporibus sed. Excepturi magnam dicta aut reprehenderit et ut dolores.', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(7, 'Engineering Manager', 'engineering-manager-342', 'Design', 'Johnsonfort', 'full_time', 'Rp 9 - 30 juta', 'Perspiciatis sed et ut eos earum quo quos. Expedita tempora distinctio nulla optio eum. Voluptates quae dolor ea quod cupiditate fugit. Rem omnis fuga minima.', 'Accusantium eligendi mollitia similique ut. Dolores dignissimos magnam occaecati quisquam. Illum eum cupiditate iste. Molestias aut repellendus suscipit commodi.', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(8, 'Press Machine Setter, Operator', 'press-machine-setter-operator-650', 'Product', 'East Rocky', 'contract', 'Rp 10 - 28 juta', 'Porro assumenda quibusdam autem ex dicta. Tenetur quisquam dolorem ipsa dolor nihil similique vel molestias. Consequuntur sed numquam fuga debitis. Quae nobis non non sed.', 'Rerum ut non doloremque perspiciatis aut. Porro itaque vero facere. Et voluptas error dolorem id. Voluptate dolores officiis veritatis enim itaque.', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47', '2026-01-21 04:45:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu_items`
--

CREATE TABLE `menu_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `position` varchar(20) NOT NULL DEFAULT 'main',
  `type` varchar(20) NOT NULL,
  `page_id` bigint(20) UNSIGNED DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `menu_items`
--

INSERT INTO `menu_items` (`id`, `title`, `position`, `type`, `page_id`, `target`, `parent_id`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Beranda', 'main', 'page', 1, '/home', NULL, 0, 1, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(5, 'Tentang Kami', 'main', 'page', 2, '/about', NULL, 3, 1, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(6, 'Profil', 'main', 'internal', 2, '/about#profil', 5, 1, 1, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(8, 'Struktur Organisasi', 'main', 'internal', 2, '/about#struktur-organisasi', 5, 8, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(10, 'Akreditasi Institusi', 'main', 'internal', 2, '/about#akreditasi-institusi', 5, 17, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(11, 'Layanan', 'main', 'page', 3, '/service', NULL, 5, 1, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(15, 'Pengaduan', 'main', 'internal', 3, '/service#pengaduan', 11, 14, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(17, 'Mobil', 'main', 'page', NULL, '/mobil', NULL, 13, 0, '2026-01-21 04:45:49', '2026-01-22 06:56:41'),
(19, 'Kategori Produk', 'main', 'internal', NULL, '/product#kategori', 17, 4, 0, '2026-01-21 04:45:49', '2026-01-22 06:56:41'),
(20, 'Demo / Trial', 'main', 'internal', NULL, '/product#demo', 17, 9, 0, '2026-01-21 04:45:49', '2026-01-22 06:56:41'),
(21, 'Proyek', 'main', 'page', 5, '/project', NULL, 16, 0, '2026-01-21 04:45:49', '2026-01-22 07:56:16'),
(23, 'Proyek Selesai', 'main', 'internal', 5, '/project#selesai', 21, 6, 0, '2026-01-21 04:45:49', '2026-01-22 07:56:16'),
(25, 'Karier', 'main', 'page', 6, '/career', NULL, 18, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(28, 'Proses Rekrutmen', 'main', 'internal', 6, '/career#proses', 25, 10, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(29, 'FAQ Karier', 'main', 'internal', 6, '/career#faq-karier', 25, 15, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(33, 'Pengumuman', 'main', 'internal', 7, '/blog#pengumuman', NULL, 11, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(34, 'Kontak', 'main', 'page', 8, '/contact', NULL, 19, 1, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(35, 'Formulir Kontak', 'main', 'internal', 8, '/contact#form', 34, 2, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(36, 'Lokasi & Peta', 'main', 'internal', 8, '/contact#lokasi', 34, 7, 0, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(37, 'Kontak Darurat', 'main', 'internal', 8, '/contact#darurat', 34, 12, 1, '2026-01-21 04:45:49', '2026-01-21 09:00:29'),
(41, 'Mobil', 'main', 'dropdown', NULL, NULL, NULL, 0, 1, '2026-01-24 10:17:44', '2026-01-24 10:17:44'),
(42, 'Brio', 'main', 'page', 7, '/blog', 41, 0, 1, '2026-01-24 10:18:03', '2026-01-24 10:18:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_14_000100_create_services_table', 1),
(5, '2025_01_14_000200_create_products_table', 1),
(6, '2025_01_14_000300_create_projects_table', 1),
(7, '2025_01_14_000400_create_blog_posts_table', 1),
(8, '2025_01_14_000500_create_job_positions_table', 1),
(9, '2025_01_14_000600_create_testimonials_table', 1),
(10, '2025_01_14_000700_create_contact_messages_table', 1),
(11, '2025_01_14_000800_create_team_members_table', 1),
(12, '2025_01_14_000900_create_company_settings_table', 1),
(13, '2025_01_14_001000_update_products_table_add_marketing_fields', 1),
(14, '2025_01_14_001100_create_roles_and_permissions_tables', 1),
(15, '2025_01_14_001500_update_products_table_add_ecommerce_details', 1),
(16, '2025_01_14_001600_create_job_applications_table', 1),
(17, '2025_01_14_001700_add_whatsapp_number_to_products_table', 1),
(18, '2025_01_14_002500_add_marketing_enrichment_to_products_table', 1),
(19, '2025_02_01_000000_create_gemini_requests_table', 1),
(20, '2025_02_01_000100_add_gemini_metadata_columns', 1),
(21, '2025_02_01_010000_create_user_otps_table', 1),
(22, '2025_02_15_000000_create_pages_table', 1),
(23, '2025_02_15_010000_create_menu_items_table', 1),
(24, '2025_02_16_000000_create_page_sections_table', 1),
(25, '2025_12_15_222709_remove_body_from_pages_table', 1),
(26, '2025_12_24_020000_create_categories_table', 1),
(27, '2025_12_24_020001_add_category_id_to_blog_posts_table', 1),
(28, '2026_01_02_135144_create_activity_log_table', 1),
(29, '2026_01_19_000001_create_fakultas_table', 1),
(30, '2026_01_19_000002_create_prodis_table', 1),
(31, '2026_01_20_000001_create_quick_cards_table', 1),
(32, '2026_01_22_033036_drop_fakultas_prodis_quick_cards_tables', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(160) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'draft',
  `meta_title` varchar(180) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_keywords`)),
  `published_at` timestamp NULL DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pages`
--

INSERT INTO `pages` (`id`, `parent_id`, `title`, `slug`, `status`, `meta_title`, `meta_description`, `meta_keywords`, `published_at`, `display_order`, `created_by`, `updated_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, NULL, 'Beranda', 'home', 'published', 'Honda IKM Ciledug', 'Honda IKM Ciledug hadir sebagai dealer resmi Honda yang telah dipercaya oleh ribuan pelanggan di wilayah Tangerang. Dengan legalitas dan standar pelayanan resmi dari Honda Indonesia, kami memastikan setiap proses pembelian, servis, hingga konsultasi berjalan dengan aman, nyaman, dan transparan.', '[\"Honda\",\"IKM\",\"Ciledug\"]', '2026-01-21 04:45:00', 0, NULL, 1, '2026-01-21 04:45:48', '2026-01-22 07:32:05', NULL),
(2, NULL, 'Tentang Kami', 'about', 'published', 'Tentang Honda IKM Group', 'Kami berkomitmen untuk selalu memberikan pelanggan bukan hanya produk dan pelayanan yang berkualitas, tetapi juga memberikan keamanan, kenyamanan, Dan juga pengalaman yang tak terlupakan.', '[\"honda\",\"mobil\"]', '2026-01-21 04:45:48', 1, NULL, 1, '2026-01-21 04:45:48', '2026-01-22 08:10:10', NULL),
(3, NULL, 'Layanan', 'service', 'published', 'Layanan Konsultasi & Implementasi Bisnis', 'Jelajahi layanan strategi, optimalisasi proses, pengembangan talenta, dan inisiatif transformasi yang kami tawarkan.', NULL, '2026-01-21 04:45:48', 2, NULL, NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48', NULL),
(5, NULL, 'Proyek', 'project', 'published', 'Portofolio Proyek Harmony Strategic Group', 'Kisah keberhasilan dan hasil terukur yang kami capai bersama mitra di berbagai sektor.', NULL, '2026-01-21 04:45:48', 4, NULL, NULL, '2026-01-21 04:45:48', '2026-01-22 07:56:16', '2026-01-22 07:56:16'),
(6, NULL, 'Karier', 'career', 'published', 'Karier di Harmony Strategic Group', 'Temukan kesempatan berkarier dan berkembang bersama tim konsultan lintas industri.', NULL, '2026-01-21 04:45:48', 5, NULL, NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48', NULL),
(7, NULL, 'Blog', 'blog', 'published', 'Insight Bisnis & Industri', 'Artikel seputar tren industri, strategi operasional, dan pembaruan seputar transformasi bisnis.', NULL, '2026-01-21 04:45:48', 6, NULL, NULL, '2026-01-21 04:45:48', '2026-01-21 04:45:48', NULL),
(8, NULL, 'Kontak', 'contact', 'published', 'Hubungi Harmony Strategic Group', 'Diskusikan tantangan bisnis Anda dan temukan solusi yang relevan bersama tim kami.', '[]', '2026-01-21 04:45:00', 7, NULL, 1, '2026-01-21 04:45:48', '2026-01-21 08:37:21', NULL),
(9, NULL, 'Honda BR-V', 'honda-br-v', 'draft', NULL, NULL, '[]', NULL, 0, 1, 1, '2026-01-21 09:28:46', '2026-01-22 07:12:53', '2026-01-22 07:12:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `page_sections`
--

CREATE TABLE `page_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `page_sections`
--

INSERT INTO `page_sections` (`id`, `page_id`, `title`, `slug`, `content`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hero', 'hero', '{\"__type\":\"hero_home\",\"heading\":\"Honda IKM Ciledug\",\"description\":\"Honda IKM Ciledug hadir sebagai dealer resmi Honda yang telah dipercaya oleh ribuan pelanggan di wilayah Tangerang. Dengan legalitas dan standar pelayanan resmi dari Honda Indonesia, kami memastikan setiap proses pembelian, servis, hingga konsultasi berjalan dengan aman, nyaman, dan transparan.\",\"primary_label\":\"Diskusikan Kebutuhan\",\"primary_link\":\"/contact\",\"secondary_label\":\"Lihat Solusi\",\"secondary_link\":\"/service\",\"hero_image\":\"/storage/images/sections/1769011018_sQXnrbIbtE.jpeg\"}', 0, 1, '2026-01-21 04:45:48', '2026-01-22 07:32:05'),
(2, 1, 'Tentang Ringkas', 'about-summary', '{\"__type\":\"about_intro\",\"heading\":\"Tentang Kami\",\"description\":\"Kami memahami pentingnya kenyamanan dan kepercayaan dalam membeli mobil. Oleh karena itu, Honda IKM Ciledug mengutamakan pelayanan berkualitas, mulai dari penyambutan di showroom, test drive yang mudah, hingga layanan aftersales seperti servis berkala dan penyediaan suku cadang asli.\",\"highlights\":[],\"image\":\"/storage/images/sections/1769088207_rYrGdOKYM1.jpg\"}', 1, 1, '2026-01-21 04:45:48', '2026-01-22 06:28:22'),
(3, 1, 'Layanan Highlight', 'service-highlight', '{\"__type\":\"service_overview\",\"heading\":\"Layanan Unggulan\",\"description\":\"Layanan Penjualan & Purna Jual Terbaik Sub-judul: Kami hadirkan solusi kepemilikan kendaraan Honda yang mudah, transparan, dan menguntungkan bagi Anda.\",\"highlights\":[]}', 2, 1, '2026-01-21 04:45:48', '2026-01-22 06:34:40'),
(4, 1, 'Mengapa Kami', 'why-us', '{\"__type\":\"why_us\",\"heading\":\"Mengapa Perusahaan Kami\",\"description\":\"Kami hadir dengan komitmen memberikan nilai terbaik untuk setiap klien.\",\"items\":[{\"icon\":\"shield-check\",\"title\":\"Konsultasi Bisnis\",\"description\":\"Strategi bisnis yang tepat untuk pertumbuhan berkelanjutan.\"},{\"icon\":\"refresh-cw\",\"title\":\"Transformasi Digital\",\"description\":\"Implementasi teknologi untuk efisiensi operasional maksimal.\"},{\"icon\":\"trending-up\",\"title\":\"Peningkatan Produktivitas\",\"description\":\"Solusi untuk meningkatkan produktivitas tim dan proses bisnis.\"}]}', 3, 1, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(5, 1, 'Testimoni', 'testimonials', '{\"__type\":\"testimonials_home\",\"heading\":\"Kata Mereka\",\"description\":\"Apa kata klien kami tentang layanan yang kami berikan.\",\"items\":[{\"name\":\"Ahmad Hidayat\",\"position\":\"CEO PT Maju Jaya\",\"company\":\"PT Maju Jaya\",\"avatar\":\"https://ui-avatars.com/api/?name=Ahmad+Hidayat&background=0D8ABC&color=fff\",\"rating\":5,\"testimonial\":\"Pelayanan yang sangat profesional dan hasil yang memuaskan. Tim sangat responsif dan memahami kebutuhan bisnis kami.\"},{\"name\":\"Siti Nurhaliza\",\"position\":\"Director\",\"company\":\"CV Berkah Sejahtera\",\"avatar\":\"https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=10b981&color=fff\",\"rating\":5,\"testimonial\":\"Implementasi sistem berjalan lancar dan tepat waktu. Sangat puas dengan dedikasi tim dalam memberikan solusi terbaik.\"},{\"name\":\"Budi Santoso\",\"position\":\"Manager IT\",\"company\":\"PT Teknologi Nusantara\",\"avatar\":\"https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff\",\"rating\":5,\"testimonial\":\"Kualitas code dan arsitektur sistem yang dibangun sangat baik. Support after sales juga luar biasa responsif.\"}]}', 4, 0, '2026-01-21 04:45:48', '2026-01-22 06:29:18'),
(6, 1, 'Statistik', 'metrics', '{\"__type\":\"metrics_home\",\"items\":[{\"value\":\"100+\",\"label\":\"Klien Puas\"},{\"value\":\"90\",\"label\":\"Proyek Selesai\"},{\"value\":\"65%\",\"label\":\"Efisiensi Meningkat\"}]}', 5, 1, '2026-01-21 04:45:48', '2026-01-21 04:45:48'),
(7, 1, 'Artikel Terbaru', 'blog-preview', '{\"__type\":\"blog_preview\",\"heading\":\"Artikel Terbaru\",\"description\":\"Baca artikel dan insight terbaru dari tim kami.\",\"link_text\":\"Lihat Semua Artikel\",\"link_url\":\"/blog\"}', 6, 1, '2026-01-21 04:45:48', '2026-01-21 08:43:00'),
(8, 1, 'CTA - Home', 'cta-home', '{\"__type\":\"cta_home\",\"heading\":\"Siap untuk Memulai?\",\"description\":\"Hubungi tim kami untuk mendiskusikan kebutuhan bisnis Anda dan temukan solusi terbaik bersama kami.\",\"button_label\":\"Hubungi Kami\",\"button_link\":\"/contact\"}', 7, 1, '2026-01-21 04:45:49', '2026-01-21 08:43:00'),
(9, 2, 'Overview', 'overview', '{\"__type\":\"about_overview\",\"badge\":\"Tentang Perusahaan\",\"heading\":\"Mitra Terpercaya untuk Transformasi Bisnis\",\"title\":\"Tentang Kami\",\"paragraphs\":[\"Dealer Honda IKM melayani pemesanan, pembelian, serta service segala merk Honda terbaik dan juga terpercaya. Untuk layanan yang lebih lengkap, datang langsung ke dealer resmi kami dan nikmati penawaran menarik lainnya.\",\"\",\"Kami berkomitmen untuk selalu memberikan pelanggan bukan hanya produk dan pelayanan yang berkualitas, tetapi juga memberikan keamanan, kenyamanan, Dan juga pengalaman yang tak terlupakan.\"],\"stats\":[],\"highlights\":[{\"icon\":\"zap\",\"title\":\"Inovasi\",\"description\":\"Selalu mencari cara baru yang lebih baik.\"},{\"icon\":\"shield\",\"title\":\"Kepercayaan\",\"description\":\"Menjaga integritas dalam setiap kerjasama.\"}],\"image\":\"/storage/images/sections/1769088058_Pq6Ajtj311.webp\"}', 0, 1, '2026-01-21 04:45:49', '2026-01-22 08:10:10'),
(10, 2, 'Visi & Misi', 'visi-misi', '{\"__type\":\"about_vision\",\"badge\":\"Arah Kami\",\"title\":\"Visi & Misi\",\"vision_title\":\"Visi Kami\",\"vision_text\":\"Menjadi mitra transformasi digital terdepan di Asia Tenggara, memberdayakan bisnis untuk tumbuh berkelanjutan melalui teknologi.\",\"mission_title\":\"Misi Kami\",\"mission_text\":\"Menyediakan solusi teknologi inovatif yang praktis, membangun talenta digital terbaik, dan menciptakan dampak positif bagi ekosistem bisnis.\"}', 1, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(11, 2, 'Nilai Perusahaan', 'values', '{\"__type\":\"about_values\",\"items\":[{\"icon\":\"users\",\"title\":\"Kolaborasi\",\"description\":\"Bekerja bersama untuk hasil terbaik.\"},{\"icon\":\"star\",\"title\":\"Keunggulan\",\"description\":\"Selalu memberikan kualitas terbaik.\"},{\"icon\":\"heart\",\"title\":\"Kepedulian\",\"description\":\"Peduli pada klien, tim, dan masyarakat.\"}]}', 2, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(12, 2, 'Statistik', 'statistics', '{\"__type\":\"about_statistics\",\"badge\":\"Pencapaian\",\"title\":\"Dampak Kami\",\"description\":\"Angka yang mencerminkan dedikasi dan hasil kerja keras kami.\",\"primary\":[{\"value\":\"98%\",\"label\":\"Kepuasan Klien\"},{\"value\":\"200%\",\"label\":\"Rata-rata ROI Klien\"}],\"secondary\":[{\"value\":\"24/7\",\"label\":\"Dukungan Teknis\"},{\"value\":\"15\",\"label\":\"Penghargaan Industri\"}]}', 3, 1, '2026-01-21 04:45:49', '2026-01-22 06:17:45'),
(13, 2, 'Tim', 'team', '{\"__type\":\"about_team\",\"badge\":\"Tim Kami\",\"title\":\"Bertemu Para Ahli\",\"description\":\"Dipimpin oleh individu yang bersemangat dan berpengalaman di bidangnya.\",\"members\":[{\"name\":\"Budi Santoso\",\"role\":\"CEO\",\"image\":\"https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop\",\"description\":\"Visioner teknologi dengan 15 tahun pengalaman.\"},{\"name\":\"Siti Aminah\",\"role\":\"CTO\",\"image\":\"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop\",\"description\":\"Arsitek sistem yang ahli dalam skalabilitas.\"}]}', 4, 1, '2026-01-21 04:45:49', '2026-01-22 06:17:45'),
(14, 2, 'CTA About', 'cta', '{\"__type\":\"about_cta\",\"badge\":\"Karir\",\"heading\":\"Bergabung Bersama Kami\",\"description\":\"Jadilah bagian dari tim yang dinamis dan inovatif.\",\"primary_label\":\"Lihat Lowongan\",\"primary_link\":\"/career\",\"contacts\":[{\"icon\":\"mail\",\"title\":\"Email\",\"detail\":\"career@example.com\"}]}', 5, 1, '2026-01-21 04:45:49', '2026-01-22 06:17:45'),
(15, 3, 'Hero Service', 'hero-service', '{\"__type\":\"service_hero\",\"heading\":\"Solusi Digital Komprehensif\",\"highlight\":\"Keahlian Kami\",\"description\":\"Dari pengembangan web hingga AI, kami menyediakan layanan end-to-end untuk kebutuhan digital Anda.\",\"primary_label\":\"Minta Penawaran\",\"primary_link\":\"\\/contact\",\"secondary_label\":\"Portofolio\",\"secondary_link\":\"\\/project\",\"hero_image\":\"https:\\/\\/images.unsplash.com\\/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop\"}', 0, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(16, 3, 'Ringkasan Layanan', 'summary', '{\"__type\":\"service_summary\",\"badge\":\"Layanan Kami\",\"heading\":\"Apa yang Kami Tawarkan\",\"description\":\"Kami menawarkan berbagai layanan teknologi untuk mempercepat pertumbuhan bisnis Anda.\"}', 1, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(17, 3, 'Penawaran', 'offerings', '{\"__type\":\"service_offerings\",\"badge\":\"Keahlian\",\"heading\":\"Bidang Fokus\",\"description\":\"Spesialisasi kami mencakup berbagai domain teknologi.\",\"items\":[{\"title\":\"Web Development\",\"description\":\"Membangun website responsif dan modern.\",\"icon\":\"layout\"},{\"title\":\"Mobile Apps\",\"description\":\"Aplikasi native untuk iOS dan Android.\",\"icon\":\"smartphone\"},{\"title\":\"Cloud Infrastructure\",\"description\":\"Skalabilitas dan keamanan di cloud.\",\"icon\":\"cloud\"}]}', 2, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(18, 3, 'Tech Stack', 'tech-stack', '{\"__type\":\"service_tech_stack\",\"badge\":\"Teknologi\",\"heading\":\"Stack Modern\",\"description\":\"Kami menggunakan alat terbaik untuk hasil terbaik.\",\"categories\":[{\"name\":\"Frontend\",\"items\":[\"React\",\"Vue\",\"Tailwind\"]},{\"name\":\"Backend\",\"items\":[\"Laravel\",\"Node.js\",\"Go\"]}]}', 3, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(19, 3, 'Proses Kerja', 'process', '{\"__type\":\"service_process\",\"badge\":\"Alur Kerja\",\"heading\":\"Bagaimana Kami Bekerja\",\"description\":\"Metodologi agile untuk pengiriman cepat dan berkualitas.\",\"steps\":[{\"title\":\"Discovery\",\"description\":\"Memahami kebutuhan bisnis.\"},{\"title\":\"Design\",\"description\":\"Merancang solusi visual dan arsitektur.\"},{\"title\":\"Development\",\"description\":\"Menulis kode berkualitas tinggi.\"},{\"title\":\"Launch\",\"description\":\"Deployment dan monitoring.\"}]}', 4, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(20, 3, 'Keunggulan', 'advantages', '{\"__type\":\"service_advantages\",\"badge\":\"Mengapa Kami\",\"heading\":\"Nilai Tambah\",\"description\":\"Apa yang membedakan kami dari kompetitor.\",\"items\":[{\"title\":\"Tim Berpengalaman\",\"description\":\"Ahli di bidangnya masing-masing.\"},{\"title\":\"Komitmen pada Kualitas\",\"description\":\"Standar tinggi tanpa kompromi.\"}]}', 5, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(21, 3, 'FAQ', 'faq', '{\"__type\":\"service_faqs\",\"heading\":\"Pertanyaan Umum\",\"description\":\"Jawaban untuk pertanyaan yang sering diajukan.\",\"items\":[{\"question\":\"Berapa lama waktu pengerjaan?\",\"answer\":\"Tergantung kompleksitas proyek, biasanya 1-3 bulan.\"},{\"question\":\"Apakah ada garansi?\",\"answer\":\"Ya, kami memberikan garansi maintenance selama 3 bulan.\"}]}', 6, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(25, 5, 'Hero Project', 'hero-project', '{\"__type\":\"project_hero\",\"badge\":\"Portofolio\",\"heading\":\"Karya Terbaik Kami\",\"description\":\"Lihat bagaimana kami membantu klien mencapai tujuan mereka melalui teknologi.\"}', 0, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(26, 6, 'Hero Career', 'hero-career', '{\"__type\":\"career_hero\",\"badge\":\"Karir\",\"heading\":\"Berkembang Bersama Kami\",\"description\":\"Temukan peluang karir yang menantang dan lingkungan kerja yang mendukung.\"}', 0, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(27, 7, 'Hero Blog', 'hero-blog', '{\"__type\":\"blog_hero\",\"badge\":\"Wawasan\",\"heading\":\"Artikel & Berita Terbaru\",\"description\":\"Ikuti perkembangan teknologi dan tren bisnis terkini bersama kami.\"}', 0, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(28, 8, 'Hero Contact', 'hero-contact', '{\"__type\":\"contact_hero\",\"heading\":\"Kontak Kami\",\"description\":\"Mitra strategis untuk pertumbuhan bisnis lintas industri.\",\"background_image\":null}', 0, 1, '2026-01-21 04:45:49', '2026-01-21 04:45:49'),
(29, 8, 'Contact Info', 'contact-info', '{\"__type\":\"contact_info\",\"address\":\"Jl. HOS Cokroaminoto No.22, RT.002/RW.001, Larangan Indah, Kec. Larangan, Kota Tangerang, Banten 15154\",\"phone\":\"+62 21 22797 888\",\"email\":\"hello@harmonygroup.id\",\"operating_hours\":\"Senin - Jumat: 08:00 - 17:00\",\"map_embed\":null,\"hours\":\"Senin - Jumat, 08.30 -16.30\"}', 1, 1, '2026-01-21 04:45:49', '2026-01-21 08:37:21'),
(30, 9, 'Honda BR-V', 'honda-br-v', '{\"__type\":\"hero_home\",\"heading\":\"Honda BR-V\"}', 0, 1, '2026-01-21 09:28:46', '2026-01-21 09:28:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Manage Users', 'manage-users', NULL, '2026-01-21 04:45:46', '2026-01-21 04:45:46'),
(2, 'Manage Content', 'manage-content', NULL, '2026-01-21 04:45:46', '2026-01-21 04:45:46'),
(3, 'View Analytics', 'view-analytics', NULL, '2026-01-21 04:45:46', '2026-01-21 04:45:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery`)),
  `excerpt` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `marketing_summary` text DEFAULT NULL,
  `marketing_highlights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`marketing_highlights`)),
  `faqs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`faqs`)),
  `cta_variants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cta_variants`)),
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `clients` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `rating` decimal(3,1) NOT NULL DEFAULT 0.0,
  `popular` tinyint(1) NOT NULL DEFAULT 0,
  `demo` tinyint(1) NOT NULL DEFAULT 0,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `price` decimal(12,2) DEFAULT NULL,
  `price_variants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`price_variants`)),
  `purchase_url` varchar(255) DEFAULT NULL,
  `whatsapp_number` varchar(30) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `cover_image`, `thumbnail`, `gallery`, `excerpt`, `meta_title`, `meta_description`, `og_title`, `marketing_summary`, `marketing_highlights`, `faqs`, `cta_variants`, `description`, `category`, `clients`, `rating`, `popular`, `demo`, `features`, `price`, `price_variants`, `purchase_url`, `whatsapp_number`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Platform CRM Enterprise', 'platform-crm-enterprise', 'https://images.unsplash.com/photo-1521791055366-0d553872125f', 'https://images.unsplash.com/photo-1521791055366-0d553872125f', '[\"https:\\/\\/images.unsplash.com\\/photo-1519389950473-47ba0277781c\",\"https:\\/\\/images.unsplash.com\\/photo-1545239351-1141bd82e8a6\",\"https:\\/\\/images.unsplash.com\\/photo-1521737604893-d14cc237f11d\"]', 'Kelola funnel penjualan dan layanan pelanggan dalam satu platform terpadu.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mendukung pipeline B2B maupun B2C dengan otomatisasi tugas, integrasi multi-channel, dan dashboard real-time.', 'Software', 120, 4.8, 1, 1, '[\"Automasi marketing dan follow-up\",\"Integrasi WhatsApp dan email\",\"Laporan kinerja penjualan real-time\"]', 4500000.00, '[{\"name\":\"Starter 10 User\",\"price\":4500000,\"compare_at_price\":4950000,\"sku\":\"CRM-STARTER-10\",\"stock\":25},{\"name\":\"Professional 50 User\",\"price\":8500000,\"compare_at_price\":9200000,\"sku\":\"CRM-PRO-50\",\"stock\":12},{\"name\":\"Enterprise Unlimited\",\"price\":14500000,\"compare_at_price\":null,\"sku\":\"CRM-ENT-UNL\",\"stock\":null}]', 'https://shop.harmonygroup.id/products/platform-crm-enterprise', '628111223344', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(2, 'Learning Management System', 'learning-management-system', 'https://images.unsplash.com/photo-1513258496099-48168024aec0', 'https://images.unsplash.com/photo-1513258496099-48168024aec0', '[\"https:\\/\\/images.unsplash.com\\/photo-1523580846011-d3a5bc25702b\",\"https:\\/\\/images.unsplash.com\\/photo-1582719478250-c89cae4dc85b\"]', 'Solusi e-learning untuk pemerintahan dan korporasi dengan pelacakan kompetensi.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Menawarkan authoring modul, ujian online, gamifikasi, dan integrasi HRIS.', 'Education', 85, 4.6, 1, 1, '[\"Katalog pelatihan terpersonalisasi\",\"Assessment dan sertifikasi digital\",\"Laporan progres karyawan dan compliance\"]', 3200000.00, '[{\"name\":\"Starter\",\"price\":3200000,\"compare_at_price\":3600000,\"sku\":\"LMS-START\",\"stock\":50},{\"name\":\"Corporate\",\"price\":6800000,\"compare_at_price\":null,\"sku\":\"LMS-CORP\",\"stock\":30}]', 'https://shop.harmonygroup.id/products/learning-management-system', '628122334455', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(3, 'Portal Layanan Publik', 'portal-layanan-publik', 'https://images.unsplash.com/photo-1526378722484-cc2cdda0ca68', 'https://images.unsplash.com/photo-1526378722484-cc2cdda0ca68', '[\"https:\\/\\/images.unsplash.com\\/photo-1545239351-1141bd82e8a6\",\"https:\\/\\/images.unsplash.com\\/photo-1556740749-887f6717d7e4\",\"https:\\/\\/images.unsplash.com\\/photo-1521737604893-d14cc237f11d\"]', 'Digitalisasi layanan administrasi dengan workflow tanpa kertas.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mendukung pengajuan perizinan, tanda tangan elektronik, dan integrasi OSS berbasis standar keamanan nasional.', 'Government', 45, 4.7, 0, 0, '[\"Single Sign-On warga\",\"Pelacakan status permohonan\",\"Integrasi pembayaran non-tunai\"]', 5500000.00, '[{\"name\":\"Kota\\/Kabupaten\",\"price\":5500000,\"compare_at_price\":null,\"sku\":\"PORTAL-REG-01\",\"stock\":null},{\"name\":\"Provinsi\",\"price\":9500000,\"compare_at_price\":null,\"sku\":\"PORTAL-PROV-01\",\"stock\":null}]', 'https://shop.harmonygroup.id/products/portal-layanan-publik', '628133445566', 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `started_at` date DEFAULT NULL,
  `completed_at` date DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin', 'Full access to all features.', '2026-01-21 04:45:46', '2026-01-21 04:45:46'),
(2, 'Editor', 'editor', 'Manage content-related resources.', '2026-01-21 04:45:46', '2026-01-21 04:45:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_user`
--

CREATE TABLE `role_user` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `role_user`
--

INSERT INTO `role_user` (`role_id`, `user_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `excerpt` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `display_order` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `services`
--

INSERT INTO `services` (`id`, `name`, `slug`, `icon`, `excerpt`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'Pembelian Tunai (Cash)', 'pembelian-tunai-cash', 'Handshake', NULL, '<p>Nikmati penawaran harga <em data-path-to-node=\"8,0,1,0\" data-index-in-node=\"25\">On The Road&nbsp;</em>terbaik dengan proses administrasi yang cepat dan transparan. Unit Honda impian siap kami antar langsung ke garasi Anda.</p>', 0, 1, '2026-01-22 06:36:11', '2026-01-22 07:59:41'),
(6, 'Kredit / Cicilan (Credit)', 'kredit-cicilan-credit', 'Workflow', NULL, '<p>Miliki Honda lebih mudah dengan DP ringan dan angsuran fleksibel. Kami bekerjasama dengan berbagai perusahaan pembiayaan (leasing) terpercaya untuk menyesuaikan budget Anda.</p>', 0, 1, '2026-01-22 06:36:38', '2026-01-22 08:00:58'),
(7, 'Tukar Tambah (Trade In)', 'tukar-tambah-trade-in', NULL, NULL, '<p>Upgrade mobil lama Anda ke Honda terbaru dengan mudah. Kami melayani tukar tambah segala merk dengan penaksiran harga yang kompetitif dan proses instan.</p>', 0, 1, '2026-01-22 06:37:04', '2026-01-22 06:37:04'),
(8, 'Test Drive', 'test-drive', 'Activity', NULL, '<p>Jangan ragu sebelum membeli. Rasakan langsung performa mesin, kenyamanan kabin, dan fitur canggih Honda. Jadwalkan sesi <em data-path-to-node=\"8,3,1,0\" data-index-in-node=\"121\">test drive</em> Anda sekarang.</p>', 0, 1, '2026-01-22 06:37:25', '2026-01-22 08:00:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3cLyqYlWsmwW9dKwcsJwLIrDu3EPDyubFJvsLBvz', 1, '103.18.34.164', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUURaU0hVQlJUbmdiT28zRG5VT1VTeGNpOWdNbUEwbG9rRVdDU1phWSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0MDoiaHR0cHM6Ly9ob25kYS1jaWxlZHVnLmNvbS9hZG1pbi9zZXJ2aWNlcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769095385),
('5XzwiBnZgyZjelIWEd2Tn0lj1r3yjqnbDGi58tpi', 1, '103.18.34.164', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicHdpR2kxaVl2b0N1UzRoZFhVdzRnRHZYeVdzUzNwSGtlNjc2dzgzWCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozNzoiaHR0cHM6Ly93d3cuaG9uZGEtY2lsZWR1Zy5jb20vcHJvZHVjdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769093332),
('9jQfhrZCdoP7SfL9wH2bENGEXYZEOPoACOXAZWMT', NULL, '23.27.145.202', 'Mozilla/5.0 (X11; Linux i686; rv:109.0) Gecko/20100101 Firefox/120.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMHZ2cmpUQXNnQUlwWTMxUlJER0VmVUFhdTJSbFFoZlFycUNFRU5tMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vaG9uZGEtY2lsZWR1Zy5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1769095614),
('BVZ5qVnBiSPAXFneoB1Ye8kCTVH6HYvSsHLEW4ni', 1, '115.178.48.68', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOXcwU1d2S1BCa1JqbHlnNWlKeTZ3M2prbElNY1hVc2dpV2dITHlVaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHBzOi8vaG9uZGEtY2lsZWR1Zy5jb20vYWRtaW4vcGFnZXMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1769097173),
('DIkG68Itdzef7UtM5ewLywUon6UskPgBslLlry2J', NULL, '178.156.189.249', 'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaUQxRzFmWXhFYUNCcFZLeGxQQzhIbnRtbGpZc0oxUzFGajZncERBNyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769275521),
('F5dYEA1GtW3hy8aAVNVVvKOOVEmW8fF85uOKjK8S', NULL, '178.156.185.231', 'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUjRaaUs5YWFaZUdIQ1BLOVEzbE45ZlhFV3RTaDNRcWVXSHNua3N0RiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769275214),
('GDCa7NRvJW3PsRxTjhjQGMEoACF0vHapAyEAMSnk', 1, '115.178.48.68', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiU1hHdUtrVm5FQmlBQzhqc3h1UndsQzFjeHkyN0pqamJsb3Jhb01qNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vaG9uZGEtY2lsZWR1Zy5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1769275381),
('gXTtcDWOQFBH3hZg8olNNlEx5sXQmewGxGMAsZGX', NULL, '5.161.61.238', 'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidjh2RVVDdkdkUnVVWFdJMmFHeGdLWDRhUWJ3SVFVSEJFTWxSbWxoaCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769274908),
('IGRgEGYVm8j2msmh2YsxIZ6PLOtQd6xbJlGACk1I', NULL, '85.208.96.204', 'Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWlU3YjRwRXczR1NNbEttdXd4UHVnbHpqOUgyNzh5dVdQNTV3Z1MwaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzI6Imh0dHBzOi8vd3d3LmhvbmRhLWNpbGVkdWcuY29tL2ZlZWRzLzg5NzYyNzQ0OTU0NzExODk3MzcvY29tbWVudHMvZGVmYXVsdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769093122),
('itMlHt2Joh7Y8Z4b7Op1LEEV8eXKxlU5hEXhF834', NULL, '2001:df0:940:0:5054:ff:fec1:f01e', 'Mozilla/5.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTEM0NmE5cXUxUXZpRWd6OUI4M1ZXTGhpUFRwd0MxTjEzZWRJN2FmeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHA6Ly9ob25kYS1jaWxlZHVnLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769094274),
('j7IXWwT29fz3dkbIbR9FTjEC6HI2Mfcse1KnmpbH', NULL, '35.185.241.120', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWh4akxMaFBWaHc0RmpLeUt4Q3VLakNsbDFVenB2NUZyNEZEZnQ5cyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9tYWlsLmhvbmRhLWNpbGVkdWcuY29tIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769092745),
('kowWOv69dfO1HRCJkZ8YxjF6RMJn0zYLuTjaXntX', NULL, '185.191.171.13', 'Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidDNUbzV1NHlCYXpyOU9kREhZa1dUOXBvRWhFRXBNWXEzcjNhWEdpViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vd3d3LmhvbmRhLWNpbGVkdWcuY29tIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769088692),
('LJDzdohRSLkFA9rb26VqIYTdUfbWy9d4OmgZW5en', NULL, '51.89.23.223', 'Mozilla/5.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidkFZamF0cHNiT1dNTmFNTGxmM2VlMkV4RnNhd3NidlRyRTlocW03aiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vaG9uZGEtY2lsZWR1Zy5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1769095089),
('OZzdWArcPstpfrYfB1xtNeMYRnoTQNgWnWGFKW4Y', NULL, '3.20.63.178', 'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTGZlek9UN0tEUUE0SWdORWVGNUM0dlNIYlhLVHp4TTNCQ1hvWGE0MCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769274602),
('QnS6FWCaoZwbyeBpRA61siSuX0Al3lyFJzcYgJ4h', NULL, '52.33.203.86', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiblVwcUNVWVV5Mkl0U3FhNzJmWHFHOXZXa0g2SnF4Z0dTWGN1RlMxeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHA6Ly9ob25kYS1jaWxlZHVnLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769090891),
('sbKkC9ESj3srSEEBbAc4hAvjsCuPOCP7PPPKPZXF', NULL, '138.2.106.158', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWU43YktZamxuSzZaWThRRGllNFlSYjFQRHZMekhhbUtUMVFCaFVTSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHBzOi8vaG9uZGEtY2lsZWR1Zy5jb20vd3AtYWRtaW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1769088971),
('SspQHSYa5LEQvuhZWb5xlfnwEltDxHcu8mGNhqKp', NULL, '199.244.88.230', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZFc2bWJPSWV4OTFRYWJrM0lmN2M3Tm5RSXdqRmtjUjdRZkVtOGZpciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHA6Ly9ob25kYS1jaWxlZHVnLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1769090608),
('Xxe4qoIYfjkyKH9pabDfn9bYCNwqDyUMD9HXVHJL', NULL, '34.217.86.102', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.7559.96 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibExEd2JFdmgwZElXeDltdk1GTUNqME5iQWFHSVpVZVVQdWo5VEtoMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vaG9uZGEtY2lsZWR1Zy5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1769092038);

-- --------------------------------------------------------

--
-- Struktur dari tabel `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `display_order` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `role`, `photo`, `email`, `phone`, `linkedin`, `display_order`, `is_active`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'Anisa Maulani', 'Chief Executive Officer', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', NULL, NULL, 'https://www.linkedin.com/in/anisa-maulani', 1, 1, 'Memimpin arah strategi perusahaan dengan fokus pada inovasi produk dan pertumbuhan berkelanjutan.', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(2, 'Rizky Pratama', 'Chief Technology Officer', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39', NULL, NULL, 'https://www.linkedin.com/in/rizky-pratama', 2, 1, 'Mengarahkan arsitektur teknologi, praktik engineering, serta roadmap produk digital.', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(3, 'Siti Rahmayanti', 'Head of Delivery', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', NULL, NULL, 'https://www.linkedin.com/in/siti-rahmayanti', 3, 1, 'Mengelola eksekusi proyek lintas industri dengan pendekatan agile dan tujuan bisnis yang terukur.', '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(4, 'Agus Budi Santoso', 'Head of Data & AI', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', NULL, NULL, 'https://www.linkedin.com/in/agus-budi', 4, 1, 'Memimpin solusi data dan kecerdasan buatan untuk klien enterprise dan pemerintahan.', '2026-01-21 04:45:47', '2026-01-21 04:45:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `author_role` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `quote` text NOT NULL,
  `rating` tinyint(3) UNSIGNED DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `testimonials`
--

INSERT INTO `testimonials` (`id`, `author_name`, `author_role`, `company`, `avatar`, `quote`, `rating`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Hendra Saputra', 'Chief Digital Officer', 'Bumi Energi Nusantara', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', 'Implementasi platform data kami selesai lebih cepat dari estimasi dengan kualitas yang terukur. Tim sangat responsif terhadap perubahan kebutuhan.', 5, 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(2, 'Rani Pratiwi', 'Head of Customer Experience', 'Sahabat Finansial', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39', 'CRM yang dibangun memberikan insight pelanggan yang selama ini tidak kami miliki. Dampaknya terlihat pada peningkatan retensi dalam 3 bulan.', 5, 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47'),
(3, 'Yusuf Ardiansyah', 'Sekretaris Daerah', 'Pemkot Samarinda', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 'Portal layanan publik yang dikembangkan memudahkan warga sekaligus memangkas proses birokrasi internal.', 4, 1, '2026-01-21 04:45:47', '2026-01-21 04:45:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@example.id', NULL, '$2y$12$/iZiQszQkj3KwLqlPkJwgeyrEBw4Pr6qpYJDKgQKTaP7QLPDIapna', 'OocEHjo1pvcm3mvS5HXuJmbWMK7dkOhCQy43lZL20VSp99CQ5Qp321PaG6br', '2026-01-21 04:45:46', '2026-01-21 04:45:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_otps`
--

CREATE TABLE `user_otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `consumed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_type`,`subject_id`),
  ADD KEY `causer` (`causer_type`,`causer_id`),
  ADD KEY `activity_log_log_name_index` (`log_name`),
  ADD KEY `activity_log_batch_uuid_index` (`batch_uuid`);

--
-- Indeks untuk tabel `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_posts_slug_unique` (`slug`),
  ADD KEY `blog_posts_author_id_foreign` (`author_id`),
  ADD KEY `blog_posts_category_id_foreign` (`category_id`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indeks untuk tabel `company_settings`
--
ALTER TABLE `company_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_settings_key_unique` (`key`);

--
-- Indeks untuk tabel `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `gemini_requests`
--
ALTER TABLE `gemini_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gemini_requests_uuid_unique` (`uuid`),
  ADD KEY `gemini_requests_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_applications_job_position_id_foreign` (`job_position_id`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `job_positions`
--
ALTER TABLE `job_positions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_positions_slug_unique` (`slug`);

--
-- Indeks untuk tabel `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_items_page_id_foreign` (`page_id`),
  ADD KEY `menu_items_parent_id_foreign` (`parent_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_parent_id_slug_unique` (`parent_id`,`slug`),
  ADD KEY `pages_created_by_foreign` (`created_by`),
  ADD KEY `pages_updated_by_foreign` (`updated_by`),
  ADD KEY `pages_status_published_at_index` (`status`,`published_at`);

--
-- Indeks untuk tabel `page_sections`
--
ALTER TABLE `page_sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_sections_page_id_slug_unique` (`page_id`,`slug`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_slug_unique` (`slug`);

--
-- Indeks untuk tabel `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`);

--
-- Indeks untuk tabel `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_unique` (`slug`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_slug_unique` (`slug`);

--
-- Indeks untuk tabel `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`role_id`,`user_id`),
  ADD KEY `role_user_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `services_slug_unique` (`slug`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `user_otps`
--
ALTER TABLE `user_otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_otps_user_id_expires_at_index` (`user_id`,`expires_at`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT untuk tabel `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `company_settings`
--
ALTER TABLE `company_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `gemini_requests`
--
ALTER TABLE `gemini_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `job_positions`
--
ALTER TABLE `job_positions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `page_sections`
--
ALTER TABLE `page_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT untuk tabel `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `user_otps`
--
ALTER TABLE `user_otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `blog_posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `gemini_requests`
--
ALTER TABLE `gemini_requests`
  ADD CONSTRAINT `gemini_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_job_position_id_foreign` FOREIGN KEY (`job_position_id`) REFERENCES `job_positions` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `menu_items_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pages_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `pages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pages_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `page_sections`
--
ALTER TABLE `page_sections`
  ADD CONSTRAINT `page_sections_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_otps`
--
ALTER TABLE `user_otps`
  ADD CONSTRAINT `user_otps_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
