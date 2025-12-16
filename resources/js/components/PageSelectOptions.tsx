import { SelectItem } from "@/components/ui/select";
import React from "react";

type PageOption = { id: number; title: string; slug: string };

const pageOptionGroups = [
    {
        label: "Profil & Identitas",
        slugs: ["home", "profil-lpm", "sambutan-ketua", "visi-misi", "struktur-organisasi", "tugas-fungsi", "sejarah-lembaga"],
    },
    {
        label: "Mutu & Penjaminan",
        slugs: ["akreditasi-institusi", "pedoman-mutu", "standar-mutu", "manual-mutu", "dokumen-spmi", "siklus-ppepp"],
    },
    {
        label: "MONEV & AMI",
        slugs: ["pedoman-monev", "laporan-monev", "audit-mutu-internal", "hasil-ami", "survey-kepuasan"],
    },
    {
        label: "Akreditasi",
        slugs: ["profil-institusi", "lkpt", "kriteria-akreditasi", "analisis-program-pengembangan", "dokumen-pendukung"],
    },
    {
        label: "Layanan",
        slugs: [
            "layanan-pendampingan-akreditasi",
            "permohonan-data",
            "konsultasi-mutu",
            "pengaduan",
            "kritik-saran",
        ],
    },
    {
        label: "Informasi Umum",
        slugs: ["faq", "kontak", "download-dokumen", "panduan-pengguna"],
    },
    {
        label: "Footer",
        slugs: ["tentang-website", "kebijakan-privasi", "syarat-ketentuan", "peta-situs"],
    },
];

interface PageSelectOptionsProps {
    pages: PageOption[];
    includeNone?: boolean;
    noneValue?: string;
    noneLabel?: string;
}

export function PageSelectOptions({
    pages,
    includeNone = false,
    noneValue = "none",
    noneLabel = "(Tidak ada)",
}: PageSelectOptionsProps) {
    const remaining = [...pages];
    const groups = pageOptionGroups.map((group) => {
        const items = remaining.filter((p) => group.slugs.includes(p.slug));

        group.slugs.forEach((slug) => {
            const idx = remaining.findIndex((p) => p.slug === slug);
            if (idx >= 0) {
                remaining.splice(idx, 1);
            }
        });

        return { label: group.label, items };
    });

    if (remaining.length) {
        groups.push({ label: "Halaman Lainnya", items: remaining });
    }

    return (
        <>
            {includeNone && <SelectItem value={noneValue}>{noneLabel}</SelectItem>}
            {groups
                .filter((g) => g.items.length)
                .map((group) => (
                    <div key={group.label}>
                        <div className="px-3 py-1 text-xs font-semibold text-gray-500">{group.label}</div>
                        {group.items.map((page) => (
                            <SelectItem key={page.id} value={String(page.id)}>
                                {page.title}
                            </SelectItem>
                        ))}
                    </div>
                ))}
        </>
    );
}
