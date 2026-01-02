import { SelectItem } from "@/components/ui/select";
import React, { useMemo } from "react";

type PageOption = {
    id: number;
    title: string;
    parent_id?: number | null;
    has_content?: boolean;
};

interface Props {
    pages: PageOption[];
    includeNone?: boolean;
    noneValue?: string;
    noneLabel?: string;
}

type TreeNode = PageOption & { children: TreeNode[]; depth: number };

function buildPageTree(pages: PageOption[]): TreeNode[] {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    // Create all nodes first
    pages.forEach((page) => {
        map.set(page.id, { ...page, children: [], depth: 0 });
    });

    // Build tree
    pages.forEach((page) => {
        const node = map.get(page.id)!;
        if (page.parent_id && map.has(page.parent_id)) {
            const parent = map.get(page.parent_id)!;
            node.depth = parent.depth + 1;
            parent.children.push(node);
        } else {
            roots.push(node);
        }
    });

    // Flatten tree for display
    const flattened: TreeNode[] = [];
    const flatten = (nodes: TreeNode[], depth: number) => {
        nodes.forEach((node) => {
            node.depth = depth;
            flattened.push(node);
            flatten(node.children, depth + 1);
        });
    };
    flatten(roots, 0);
    return flattened;
}

export function PageOptionsPlain({ pages, includeNone = false, noneValue = "none", noneLabel = "(Tidak ada)" }: Props) {
    const flatPages = useMemo(() => buildPageTree(pages), [pages]);

    return (
        <>
            {includeNone && <SelectItem value={noneValue}>{noneLabel}</SelectItem>}
            {flatPages.map((page) => {
                const indent = "— ".repeat(page.depth);
                const suffix = !page.has_content ? " (konten kosong)" : "";
                return (
                    <SelectItem key={page.id} value={String(page.id)}>
                        {indent}{page.title}{suffix}
                    </SelectItem>
                );
            })}
        </>
    );
}
