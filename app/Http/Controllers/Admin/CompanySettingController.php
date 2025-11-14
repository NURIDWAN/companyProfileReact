<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CompanySettingController extends Controller
{
    public function index(): Response
    {
        $settings = $this->loadSettings();

        $logoImage = data_get($settings, 'company.logo_image');
        $company = [
            'name' => data_get($settings, 'company.name', ''),
            'tagline' => data_get($settings, 'company.tagline', ''),
            'logo_icon' => data_get($settings, 'company.logo_icon', ''),
            'logo_image' => $logoImage ?? '',
            'logo_url' => $this->resolveImageUrl($logoImage),
        ];

        $address = array_merge(
            [
                'line1' => '',
                'city' => '',
                'province' => '',
                'postal_code' => '',
            ],
            data_get($settings, 'company.address', []) ?? [],
        );

        $contacts = array_merge(
            [
                'phone' => '',
                'email' => '',
                'whatsapp' => '',
                'map_label' => 'Lokasi',
                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.123456789!2d106.700!3d-6.200',
            ],
            data_get($settings, 'company.contacts', []) ?? [],
        );

        $socials = array_merge(
            [
                'linkedin' => '',
                'instagram' => '',
                'youtube' => '',
                'website' => '',
            ],
            data_get($settings, 'company.socials', []) ?? [],
        );

        $footerStored = data_get($settings, 'footer.content', []) ?? [];
        $footerCta = [
            'label' => data_get($footerStored, 'cta.label', ''),
            'href' => data_get($footerStored, 'cta.href', ''),
        ];

        $footerLegal = [
            'privacy' => data_get($footerStored, 'legal.privacy', ''),
            'terms' => data_get($footerStored, 'legal.terms', ''),
        ];

        $aboutOverview = array_replace_recursive([
            'badge' => 'Tentang Perusahaan',
            'title' => 'Tentang Harmony Strategic Group',
            'heading' => 'Kami mendampingi organisasi di berbagai industri untuk meningkatkan kinerja dan menyiapkan pertumbuhan jangka panjang.',
            'paragraphs' => [
                'Sejak 2010 kami dipercaya perusahaan publik dan swasta di sektor manufaktur, jasa, kesehatan, energi, hingga retail untuk menghadirkan solusi bisnis terintegrasi.',
                'Pendekatan kami menggabungkan analisis berbasis data, kolaborasi erat dengan tim klien, serta transfer kapabilitas agar manfaat program dapat dirasakan secara berkelanjutan.',
            ],
            'stats' => [
                ['value' => '150+', 'label' => 'Kemitraan Aktif'],
                ['value' => '12', 'label' => 'Negara & Provinsi Operasi'],
            ],
            'image' => 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop',
            'highlights' => [
                ['icon' => 'briefcase', 'title' => 'Lintas Industri', 'description' => 'Pengalaman proyek di sektor publik, jasa, manufaktur, kesehatan, dan energi.'],
                ['icon' => 'zap', 'title' => 'Berbasis Data', 'description' => 'Rekomendasi dan keputusan didukung analisis data dan wawasan lapangan.'],
                ['icon' => 'users', 'title' => 'Kemitraan Dekat', 'description' => 'Tim gabungan bersama klien memastikan inisiatif berjalan mulus.'],
                ['icon' => 'award', 'title' => 'Fokus Impact', 'description' => 'Setiap program dikaitkan dengan indikator keberhasilan yang terukur.'],
            ],
        ], (array) ($settings['about.overview'] ?? []));

        $aboutVision = array_replace_recursive([
            'badge' => 'Visi & Misi',
            'title' => 'Panduan Langkah Kami',
            'vision_title' => 'Visi Kami',
            'vision_text' => 'Menjadi mitra strategis yang dipercaya perusahaan lintas industri untuk mencapai pertumbuhan berkelanjutan.',
            'mission_title' => 'Misi Kami',
            'mission_text' => 'Mewujudkan inisiatif bisnis yang berdampak melalui kombinasi strategi, implementasi lapangan, dan pengembangan kapabilitas tim klien.',
        ], (array) ($settings['about.vision'] ?? []));

        $aboutValues = (array) ($settings['about.values'] ?? [
            ['icon' => 'zap', 'title' => 'Berbasis Bukti', 'description' => 'Setiap rekomendasi dibangun dari data, riset lapangan, dan pengalaman praktis.'],
            ['icon' => 'award', 'title' => 'Keunggulan Operasional', 'description' => 'Mengutamakan kualitas eksekusi dan hasil yang dapat diukur.'],
            ['icon' => 'handshake', 'title' => 'Kemitraan', 'description' => 'Membangun hubungan jangka panjang dengan kepercayaan dan transparansi.'],
            ['icon' => 'users', 'title' => 'Pemberdayaan Tim', 'description' => 'Menguatkan kapabilitas internal klien agar siap melanjutkan perubahan.'],
        ]);

        $aboutStatistics = array_replace_recursive([
            'badge' => 'Pencapaian Kami',
            'title' => 'Angka Berbicara',
            'description' => 'Indikator keberhasilan kemitraan kami bersama perusahaan di berbagai sektor.',
            'primary' => [
                ['value' => '350+', 'label' => 'Inisiatif Bisnis Terselesaikan'],
                ['value' => '150+', 'label' => 'Klien & Mitra Aktif'],
                ['value' => '15+', 'label' => 'Sektor Industri'],
                ['value' => '92%', 'label' => 'Rasio Proyek Berulang'],
            ],
            'secondary' => [
                ['value' => '24', 'label' => 'Provinsi & Negara Operasi'],
                ['value' => '4.7/5', 'label' => 'Rating Kemitraan'],
                ['value' => '120+', 'label' => 'Konsultan & Praktisi'],
            ],
        ], (array) ($settings['about.statistics'] ?? []));

        $aboutTeam = array_replace_recursive([
            'badge' => 'Tim Kami',
            'title' => 'Tim Manajemen',
            'description' => 'Dipimpin oleh profesional dengan pengalaman lintas industri dan fungsi bisnis.',
            'members' => [
                ['name' => 'Andi Wijaya', 'role' => 'Chief Executive Officer', 'image' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop', 'description' => 'Memimpin arah strategis dan kemitraan utama perusahaan.'],
                ['name' => 'Sari Indrawati', 'role' => 'Chief Strategy Officer', 'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', 'description' => 'Mengawal pengembangan solusi dan orkestrasi program lintas industri.'],
            ],
        ], (array) ($settings['about.team'] ?? []));

        $aboutCta = array_replace_recursive([
            'badge' => 'Mari Berdiskusi',
            'heading' => 'Siap Bekerja Sama Dengan Kami?',
            'description' => 'Diskusikan bagaimana kami dapat membantu mewujudkan tujuan bisnis Anda.',
            'primary_label' => 'Hubungi Kami Sekarang',
            'primary_link' => '/contact',
            'secondary_label' => 'Lihat Layanan Kami',
            'secondary_link' => '/service',
            'contacts' => [
                ['icon' => 'phone', 'title' => 'Telepon', 'detail' => '+62 811 7788 990'],
                ['icon' => 'mail', 'title' => 'Email', 'detail' => 'hello@harmonygroup.id'],
                ['icon' => 'clock', 'title' => 'Jam Kerja', 'detail' => 'Senin - Jumat, 09:00 - 18:00'],
            ],
        ], (array) ($settings['about.cta'] ?? []));

        $serviceHero = array_replace_recursive([
            'badge' => 'Solusi Digital',
            'heading' => 'Solusi Digital Inovatif',
            'highlight' => 'Untuk Masa Depan Bisnis Anda',
            'subheading' => 'Kami membantu bisnis bertransformasi secara digital dengan layanan pengembangan web, aplikasi mobile, dan desain UI/UX kelas dunia.',
            'primary_label' => 'Lihat Layanan Kami',
            'primary_link' => '/service',
            'secondary_label' => 'Hubungi Kami',
            'secondary_link' => '/contact',
            'background_image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
        ], (array) ($settings['service.hero'] ?? []));

        $serviceSummary = array_replace_recursive([
            'badge' => 'Portofolio Layanan',
            'heading' => 'Solusi yang Kami Tawarkan',
            'description' => 'Pendekatan menyeluruh yang menggabungkan konsultasi bisnis, optimalisasi proses, dan program perubahan di lapangan.',
        ], (array) ($settings['service.summary'] ?? []));

        $serviceOfferings = array_replace_recursive([
            'badge' => 'Layanan Kami',
            'heading' => 'Apa yang Kami Tawarkan',
            'description' => 'Rangkaian layanan fleksibel untuk organisasi jasa, manufaktur, kesehatan, pendidikan, energi, dan sektor publik.',
            'items' => [
                ['icon' => 'Layers', 'title' => 'Optimalisasi Operasional', 'description' => 'Penataan proses bisnis, supply chain, dan manajemen kualitas.'],
                ['icon' => 'Smartphone', 'title' => 'Pengalaman Pelanggan', 'description' => 'Perbaikan layanan dan kanal interaksi untuk meningkatkan loyalitas.'],
                ['icon' => 'Paintbrush', 'title' => 'Pengembangan Talenta', 'description' => 'Program pelatihan, coaching, dan manajemen perubahan organisasi.'],
                ['icon' => 'Cloud', 'title' => 'Enablement Digital', 'description' => 'Memanfaatkan data dan teknologi untuk mendukung keputusan bisnis.'],
            ],
        ], (array) ($settings['service.offerings'] ?? []));

        $serviceTechStack = array_replace_recursive([
            'heading' => 'Kompetensi Utama Kami',
            'description' => 'Tim lintas disiplin dengan keahlian strategi, operasional, pemasaran, perubahan organisasi, dan digital enablement.',
            'items' => [
                ['name' => 'Operational Excellence', 'logo' => null],
                ['name' => 'Customer Experience Design', 'logo' => null],
                ['name' => 'Supply Chain Optimisation', 'logo' => null],
                ['name' => 'People & Change Management', 'logo' => null],
            ],
        ], (array) ($settings['service.tech_stack'] ?? []));

        $serviceProcess = array_replace_recursive([
            'badge' => 'Metodologi Kami',
            'heading' => 'Proses Kerja Kami',
            'items' => [
                ['step' => '01', 'title' => 'Diagnosa Bisnis', 'description' => 'Menggali tantangan dan prioritas strategis bersama pemangku kepentingan.', 'icon' => 'Search'],
                ['step' => '02', 'title' => 'Perancangan Solusi', 'description' => 'Menyusun inisiatif, indikator keberhasilan, dan rencana implementasi bertahap.', 'icon' => 'LayoutTemplate'],
                ['step' => '03', 'title' => 'Eksekusi & Pilot', 'description' => 'Mengawal implementasi, melakukan uji coba terkontrol, dan menyesuaikan di lapangan.', 'icon' => 'Code'],
                ['step' => '04', 'title' => 'Adopsi & Optimasi', 'description' => 'Mengukur hasil serta memperkuat kapabilitas tim internal untuk keberlanjutan.', 'icon' => 'Rocket'],
            ],
        ], (array) ($settings['service.process'] ?? []));

        $serviceAdvantages = array_replace_recursive([
            'badge' => 'Keunggulan Kami',
            'heading' => 'Mengapa Memilih Kami?',
            'description' => null,
            'items' => [
                ['title' => 'Tim Lintas Industri', 'description' => 'Konsultan dengan pengalaman memimpin proyek di berbagai sektor.', 'icon' => 'Users'],
                ['title' => 'Pendekatan Berbasis Hasil', 'description' => 'Setiap inisiatif dikaitkan dengan indikator kinerja yang terukur.', 'icon' => 'Layers'],
                ['title' => 'Kemitraan Berkelanjutan', 'description' => 'Pendampingan implementasi, pelatihan, dan monitoring berkala.', 'icon' => 'LifeBuoy'],
                ['title' => 'Governance & Compliance', 'description' => 'Memastikan program berjalan selaras dengan kebijakan dan regulasi industri.', 'icon' => 'Shield'],
            ],
        ], (array) ($settings['service.advantages'] ?? []));

        $serviceFaqs = array_replace_recursive([
            'badge' => 'FAQ',
            'heading' => 'Pertanyaan yang Sering Diajukan',
            'items' => [
                ['question' => 'Berapa lama waktu rata-rata sebuah program berjalan?', 'answer' => 'Durasi bergantung pada ruang lingkup. Program penguatan proses biasanya berlangsung 6-12 minggu, sedangkan transformasi berskala besar memiliki beberapa fase lanjutan.'],
                ['question' => 'Apakah ada laporan perkembangan rutin?', 'answer' => 'Kami menyediakan jalur komunikasi dan dashboard monitoring agar setiap pemangku kepentingan dapat memantau status dan hasil.'],
                ['question' => 'Bagaimana pendampingan setelah program selesai?', 'answer' => 'Kami menyediakan paket sustainment berupa coaching, audit berkala, dan dukungan pengelolaan perubahan.'],
                ['question' => 'Bagaimana struktur investasi layanan?', 'answer' => 'Nilai investasi disesuaikan dengan kompleksitas, lokasi, dan target hasil. Proposal lengkap akan diberikan setelah asesmen awal.'],
            ],
        ], (array) ($settings['service.faqs'] ?? []));

        return Inertia::render('admin/settings/Index', [
            'company' => $company,
            'address' => $address,
            'contacts' => $contacts,
            'socials' => $socials,
            'footerCta' => $footerCta,
            'footerLegal' => $footerLegal,
            'aboutOverview' => $aboutOverview,
            'aboutVision' => $aboutVision,
            'aboutValues' => $aboutValues,
            'aboutStatistics' => $aboutStatistics,
            'aboutTeam' => $aboutTeam,
            'aboutCta' => $aboutCta,
            'serviceHero' => $serviceHero,
            'serviceSummary' => $serviceSummary,
            'serviceOfferings' => $serviceOfferings,
            'serviceTechStack' => $serviceTechStack,
            'serviceProcess' => $serviceProcess,
            'serviceAdvantages' => $serviceAdvantages,
            'serviceFaqs' => $serviceFaqs,
        ]);
    }

    public function downloadBackup(): StreamedResponse
    {
        $rows = DB::table('company_settings')->orderBy('id')->get();
        $generatedAt = now();
        $filename = 'company_settings_backup_' . $generatedAt->format('Y_m_d_His') . '.sql';

        $quote = static function ($value): string {
            if ($value === null) {
                return 'NULL';
            }

            return "'" . str_replace("'", "''", (string) $value) . "'";
        };

        return response()->streamDownload(function () use ($rows, $generatedAt, $quote): void {
            echo '-- Backup of company_settings generated at ' . $generatedAt->toDateTimeString() . PHP_EOL;
            echo 'SET FOREIGN_KEY_CHECKS=0;' . PHP_EOL . PHP_EOL;
            echo 'TRUNCATE TABLE `company_settings`;' . PHP_EOL . PHP_EOL;

            foreach ($rows as $row) {
                $id = (int) $row->id;
                $key = $quote($row->key);
                $value = $quote($row->value);
                $group = $quote($row->group);
                $createdAt = $quote($row->created_at);
                $updatedAt = $quote($row->updated_at);

                $insert = sprintf(
                    'INSERT INTO `company_settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES (%d, %s, %s, %s, %s, %s);',
                    $id,
                    $key,
                    $value,
                    $group,
                    $createdAt,
                    $updatedAt
                );

                echo $insert . PHP_EOL;
            }

            echo PHP_EOL . 'SET FOREIGN_KEY_CHECKS=1;' . PHP_EOL;
        }, $filename, [
            'Content-Type' => 'application/sql; charset=UTF-8',
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('admin/settings/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                CompanySetting::create($data);
            });

            return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat setting', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan setting.'])->withInput();
        }
    }

    public function edit(CompanySetting $setting): Response
    {
        return Inertia::render('admin/settings/Form', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request, CompanySetting $setting): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $setting) {
                $data = $this->validatedData($request, $setting);
                $setting->update($data);
            });

            return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui setting', [
                'setting_id' => $setting->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui setting.'])->withInput();
        }
    }

    public function updateCompany(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'logo_icon' => ['nullable', 'string', 'max:60'],
            'logo_image' => ['nullable', 'string', 'max:500'],
            'logo_image_file' => ['nullable', 'image', 'max:4096'],
        ]);

        $logoPath = CompanySetting::query()->where('key', 'company.logo_image')->value('value');

        if ($file = $request->file('logo_image_file')) {
            if ($logoPath && Str::startsWith($logoPath, 'branding/')) {
                Storage::disk('public')->delete($logoPath);
            }

            $logoPath = $file->store('branding', 'public');
        } elseif (($data['logo_image'] ?? null) === '') {
            if ($logoPath && Str::startsWith($logoPath, 'branding/')) {
                Storage::disk('public')->delete($logoPath);
            }

            $logoPath = null;
        } else {
            $logoPath = $data['logo_image'] ?? $logoPath;
        }

        DB::transaction(function () use ($data, $logoPath) {
            $this->saveSetting('company.name', $data['name'], 'company');
            $this->saveSetting('company.tagline', $data['tagline'], 'company');
            $this->saveSetting('company.logo_icon', $data['logo_icon'] ?? null, 'company');
            $this->saveSetting('company.logo_image', $logoPath, 'company');

            $this->updateFooterContent(function (array $footer) use ($data) {
                $footer['company'] = [
                    'name' => $data['name'],
                    'description' => $data['tagline'] ?? null,
                ];

                return $footer;
            });
        });

        return redirect()->route('admin.settings.index')->with('success', 'Profil perusahaan berhasil diperbarui.');
    }

    public function updateAddress(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'line1' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:120'],
            'province' => ['required', 'string', 'max:120'],
            'postal_code' => ['nullable', 'string', 'max:30'],
        ]);

        DB::transaction(function () use ($data) {
            $this->saveSetting('company.address', $data, 'contact');
        });

        return redirect()->route('admin.settings.index')->with('success', 'Alamat perusahaan berhasil diperbarui.');
    }

    public function updateContacts(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'phone' => ['nullable', 'string', 'max:60'],
            'email' => ['nullable', 'email', 'max:120'],
            'whatsapp' => ['nullable', 'string', 'max:60'],
            'map_label' => ['nullable', 'string', 'max:120'],
            'map_embed_url' => ['nullable', 'string', 'max:2048'],
        ]);

        DB::transaction(function () use ($data) {
            $this->saveSetting('company.contacts', $data, 'contact');

            $this->updateFooterContent(function (array $footer) use ($data) {
                $existingAddress = data_get($footer, 'contacts.address');

                $footer['contacts'] = array_filter([
                    'phone' => $data['phone'] ?? null,
                    'email' => $data['email'] ?? null,
                    'whatsapp' => $data['whatsapp'] ?? null,
                    'address' => $existingAddress,
                ], fn ($value) => $value !== null && $value !== '');

                return $footer;
            });
        });

        return redirect()->route('admin.settings.index')->with('success', 'Kontak perusahaan berhasil diperbarui.');
    }

    public function updateSocials(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'linkedin' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'youtube' => ['nullable', 'url', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
        ]);

        DB::transaction(function () use ($data) {
            $this->saveSetting('company.socials', array_filter($data), 'contact');
        });

        return redirect()->route('admin.settings.index')->with('success', 'Sosial media perusahaan berhasil diperbarui.');
    }

    public function updateFooterCta(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'label' => ['required', 'string', 'max:120'],
            'href' => ['required', 'string', 'max:255'],
        ]);

        $this->updateFooterContent(function (array $footer) use ($data) {
            $footer['cta'] = $data;
            return $footer;
        });

        return redirect()->route('admin.settings.index')->with('success', 'CTA footer berhasil diperbarui.');
    }

    public function updateFooterLegal(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'privacy' => ['nullable', 'string', 'max:255'],
            'terms' => ['nullable', 'string', 'max:255'],
        ]);

        $this->updateFooterContent(function (array $footer) use ($data) {
            $footer['legal'] = array_filter($data, fn ($value) => $value !== null && $value !== '');
            return $footer;
        });

        return redirect()->route('admin.settings.index')->with('success', 'Tautan legal footer berhasil diperbarui.');
    }

    public function updateAboutOverview(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:255'],
            'heading' => ['required', 'string'],
            'paragraphs' => ['required', 'array', 'min:1'],
            'paragraphs.*' => ['required', 'string'],
            'stats' => ['nullable', 'array'],
            'stats.*.value' => ['required', 'string'],
            'stats.*.label' => ['required', 'string'],
            'image' => ['nullable', 'string', 'max:500'],
            'highlights' => ['nullable', 'array'],
            'highlights.*.icon' => ['required', 'string', 'max:60'],
            'highlights.*.title' => ['required', 'string', 'max:120'],
            'highlights.*.description' => ['nullable', 'string'],
        ]);

        $this->saveSetting('about.overview', $data, 'about');

        return redirect()->route('admin.settings.index')->with('success', 'Seksyen profil tentang kami berhasil diperbarui.');
    }

    public function updateAboutVision(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:255'],
            'vision_title' => ['required', 'string', 'max:255'],
            'vision_text' => ['required', 'string'],
            'mission_title' => ['required', 'string', 'max:255'],
            'mission_text' => ['required', 'string'],
        ]);

        $this->saveSetting('about.vision', $data, 'about');

        return redirect()->route('admin.settings.index')->with('success', 'Visi & misi berhasil diperbarui.');
    }

    public function updateAboutValues(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'values' => ['required', 'array', 'min:1'],
            'values.*.icon' => ['required', 'string', 'max:60'],
            'values.*.title' => ['required', 'string', 'max:120'],
            'values.*.description' => ['required', 'string'],
        ]);

        $this->saveSetting('about.values', $data['values'], 'about');

        return redirect()->route('admin.settings.index')->with('success', 'Nilai perusahaan berhasil diperbarui.');
    }

    public function updateAboutStatistics(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'primary' => ['required', 'array', 'min:1'],
            'primary.*.value' => ['required', 'string'],
            'primary.*.label' => ['required', 'string'],
            'secondary' => ['nullable', 'array'],
            'secondary.*.value' => ['required', 'string'],
            'secondary.*.label' => ['required', 'string'],
        ]);

        $this->saveSetting('about.statistics', $data, 'about');

        return redirect()->route('admin.settings.index')->with('success', 'Statistik perusahaan berhasil diperbarui.');
    }

    public function updateAboutTeam(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'members' => ['required', 'array', 'min:1'],
            'members.*.name' => ['required', 'string', 'max:120'],
            'members.*.role' => ['required', 'string', 'max:120'],
            'members.*.image' => ['nullable', 'string', 'max:500'],
            'members.*.description' => ['nullable', 'string'],
        ]);

        $this->saveSetting('about.team', $data, 'about');

        return redirect()->route('admin.settings.index')->with('success', 'Tim manajemen berhasil diperbarui.');
    }

    public function updateAboutCta(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['required', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'primary_label' => ['required', 'string', 'max:120'],
            'primary_link' => ['required', 'string', 'max:255'],
            'secondary_label' => ['nullable', 'string', 'max:120'],
            'secondary_link' => ['nullable', 'string', 'max:255'],
            'contacts' => ['nullable', 'array'],
            'contacts.*.icon' => ['required', 'string', 'max:40'],
            'contacts.*.title' => ['required', 'string', 'max:120'],
            'contacts.*.detail' => ['required', 'string'],
        ]);

        $this->saveSetting('about.cta', $data, 'about');

        return redirect()->route('admin.settings.index')->with('success', 'CTA halaman tentang berhasil diperbarui.');
    }

    public function updateServiceHero(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['nullable', 'string', 'max:120'],
            'heading' => ['required', 'string'],
            'highlight' => ['nullable', 'string', 'max:255'],
            'subheading' => ['nullable', 'string'],
            'primary_label' => ['required', 'string', 'max:120'],
            'primary_link' => ['required', 'string', 'max:255'],
            'secondary_label' => ['nullable', 'string', 'max:120'],
            'secondary_link' => ['nullable', 'string', 'max:255'],
            'background_image' => ['nullable', 'string', 'max:500'],
        ]);

        $this->saveSetting('service.hero', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'Hero layanan berhasil diperbarui.');
    }

    public function updateServiceSummary(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['nullable', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $this->saveSetting('service.summary', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'Ringkasan layanan berhasil diperbarui.');
    }

    public function updateServiceOfferings(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['nullable', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.icon' => ['required', 'string', 'max:60'],
            'items.*.title' => ['required', 'string', 'max:255'],
            'items.*.description' => ['nullable', 'string'],
        ]);

        $this->saveSetting('service.offerings', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'Layanan unggulan berhasil diperbarui.');
    }

    public function updateServiceTechStack(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'heading' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.name' => ['required', 'string', 'max:120'],
            'items.*.logo' => ['nullable', 'string', 'max:500'],
        ]);

        $this->saveSetting('service.tech_stack', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'Teknologi layanan berhasil diperbarui.');
    }

    public function updateServiceProcess(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['nullable', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.step' => ['nullable', 'string', 'max:10'],
            'items.*.title' => ['required', 'string', 'max:255'],
            'items.*.description' => ['nullable', 'string'],
            'items.*.icon' => ['nullable', 'string', 'max:60'],
        ]);

        $this->saveSetting('service.process', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'Proses layanan berhasil diperbarui.');
    }

    public function updateServiceAdvantages(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['nullable', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.title' => ['required', 'string', 'max:255'],
            'items.*.description' => ['nullable', 'string'],
            'items.*.icon' => ['nullable', 'string', 'max:60'],
        ]);

        $this->saveSetting('service.advantages', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'Keunggulan layanan berhasil diperbarui.');
    }

    public function updateServiceFaqs(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'badge' => ['nullable', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.question' => ['required', 'string'],
            'items.*.answer' => ['required', 'string'],
        ]);

        $this->saveSetting('service.faqs', $data, 'service');

        return redirect()->route('admin.settings.index')->with('success', 'FAQ layanan berhasil diperbarui.');
    }

    public function destroy(CompanySetting $setting): RedirectResponse
    {
        $setting->delete();

        return redirect()->route('admin.settings.index')->with('success', 'Setting berhasil dihapus.');
    }

    protected function saveSetting(string $key, $value, string $group): void
    {
        CompanySetting::updateOrCreate(
            ['key' => $key],
            [
                'group' => $group,
                'value' => $value,
            ],
        );
    }

    protected function updateFooterContent(callable $callback): void
    {
        $stored = CompanySetting::query()->where('key', 'footer.content')->value('value') ?? [];
        $updated = $callback($stored);

        $this->saveSetting('footer.content', $updated, 'landing');
    }

    private function loadSettings(): array
    {
        $settings = [];

        CompanySetting::query()
            ->get(['key', 'value'])
            ->each(function (CompanySetting $setting) use (&$settings) {
                $raw = $setting->getRawOriginal('value');

                if ($raw === null) {
                    Arr::set($settings, $setting->key, null);

                    return;
                }

                $decoded = json_decode($raw, true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    Arr::set($settings, $setting->key, $decoded);

                    return;
                }

                Arr::set($settings, $setting->key, $raw);
            });

        return $settings;
    }

    protected function resolveImageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }

        return $path;
    }

    private function validatedData(Request $request, ?CompanySetting $setting = null): array
    {
        return $request->validate([
            'key' => [
                'required',
                'string',
                'max:255',
                Rule::unique('company_settings', 'key')->ignore($setting?->id),
            ],
            'value' => ['nullable'],
            'group' => ['nullable', 'string', 'max:255'],
        ]);
    }
}
