import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Backup konten',
        href: '/settings/backup',
    },
];

export default function BackupSettings() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Backup konten" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Backup konten" description="Unduh salinan data pengaturan perusahaan untuk disimpan secara mandiri." />

                    <Card>
                        <CardHeader>
                            <CardTitle>Backup manual</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                Simpan file SQL yang berisi seluruh isi tabel <code>company_settings</code>. Anda dapat menggunakannya untuk
                                memulihkan konfigurasi jika terjadi perubahan yang tidak diinginkan atau migrasi server.
                            </p>
                            <Separator />
                            <ul className="list-disc space-y-1 pl-4">
                                <li>Lakukan backup sebelum mengubah banyak konten sekaligus.</li>
                                <li>Simpan file di lokasi aman (misal storage terenkripsi atau repository internal).</li>
                                <li>Gunakan perintah SQL standar untuk mengembalikan data apabila diperlukan.</li>
                            </ul>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button asChild>
                                <a href={route('settings.backup.download')} download>
                                    Unduh backup SQL
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pemulihan data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                Fitur impor otomatis tidak lagi tersedia. Untuk memulihkan data dari file SQL, hubungi tim teknis dan jalankan
                                perintah melalui database (misalnya <code>mysql</code> CLI atau tool administrasi lainnya).
                            </p>
                            <Separator />
                            <p>
                                Pastikan selalu menyimpan file hasil backup di lokasi aman dan lakukan uji restore secara berkala agar prosedur
                                pemulihan tetap terdokumentasi.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
