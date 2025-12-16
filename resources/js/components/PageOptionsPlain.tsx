import { SelectItem } from "@/components/ui/select";
import React from "react";

type PageOption = { id: number; title: string; has_content?: boolean };

interface Props {
    pages: PageOption[];
    includeNone?: boolean;
    noneValue?: string;
    noneLabel?: string;
}

export function PageOptionsPlain({ pages, includeNone = false, noneValue = "none", noneLabel = "(Tidak ada)" }: Props) {
    return (
        <>
            {includeNone && <SelectItem value={noneValue}>{noneLabel}</SelectItem>}
            {pages.map((page) => (
                <SelectItem key={page.id} value={String(page.id)}>
                    {page.title} {!page.has_content ? " (konten kosong)" : ""}
                </SelectItem>
            ))}
        </>
    );
}
