import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InputError from "@/components/input-error";
import { DeleteButton } from "@/components/DeleteButton";
import { PageOptionsPlain } from "@/components/PageOptionsPlain";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, GripVertical, RotateCcw, Plus } from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type MenuItem = {
    id: number;
    title: string;
    position: string;
    type: string;
    page_id?: number | null;
    target?: string | null;
    parent_id?: number | null;
    display_order?: number | null;
    is_active: boolean;
    page?: PageWithSections | null;
};

type SectionPayload = {
    id?: number;
    title: string;
    slug?: string | null;
    content?: string | null;
    display_order?: number | null;
    is_active?: boolean;
    type?: string | null;
    data?: Record<string, any>;
};

type PageWithSections = { id: number; title: string; slug: string; sections?: SectionPayload[] | null };

interface Props {
    menus: Record<string, MenuItem[]>;
    pages: PageWithSections[];
}

type TreeNode = MenuItem & { children: TreeNode[] };

const positions = [
    { key: "main", label: "Menu Utama" },
    { key: "header", label: "Header" },
    { key: "footer", label: "Footer" },
];

const internalOptions = [
    { value: "/", label: "Beranda" },
    { value: "/about", label: "Tentang Kami" },
    { value: "/service", label: "Layanan" },
    { value: "/product", label: "Produk" },
    { value: "/project", label: "Proyek" },
    { value: "/career", label: "Karier" },
    { value: "/blog", label: "Blog" },
    { value: "/contact", label: "Kontak" },
];

const categoryOptions = [
    { value: "/blog/kategori/berita", label: "Kategori Berita" },
    { value: "/blog/kategori/pengumuman", label: "Kategori Pengumuman" },
    { value: "/blog/kategori/artikel", label: "Kategori Artikel" },
];

function buildTree(items: MenuItem[]): TreeNode[] {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    items.forEach((item) => {
        map.set(item.id, { ...item, children: [] });
    });

    items.forEach((item) => {
        const node = map.get(item.id)!;
        if (item.parent_id && map.has(item.parent_id)) {
            map.get(item.parent_id)!.children.push(node);
        } else {
            roots.push(node);
        }
    });

    // Sort children by display_order
    const sortByOrder = (nodes: TreeNode[]) => {
        nodes.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
        nodes.forEach((node) => sortByOrder(node.children));
    };
    sortByOrder(roots);

    return roots;
}

function flattenOptions(nodes: TreeNode[], depth = 0): { id: number; label: string }[] {
    return nodes.flatMap((node) => [
        { id: node.id, label: `${"— ".repeat(depth)}${node.title}` },
        ...flattenOptions(node.children, depth + 1),
    ]);
}

// Flatten tree to array for drag and drop
function flattenTree(nodes: TreeNode[]): MenuItem[] {
    const result: MenuItem[] = [];
    const traverse = (items: TreeNode[]) => {
        items.forEach((item) => {
            result.push(item);
            if (item.children.length > 0) {
                traverse(item.children);
            }
        });
    };
    traverse(nodes);
    return result;
}

// Accordion Item Component for Jenis Menu
function AccordionItem({
    title,
    isOpen,
    onClick,
    children,
}: {
    title: string;
    isOpen: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="border border-gray-200 rounded-md bg-white">
            <button
                type="button"
                onClick={onClick}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                {title}
                {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
            </button>
            {isOpen && <div className="border-t border-gray-200 px-3 py-3 bg-gray-50">{children}</div>}
        </div>
    );
}

// Sortable Menu Item Component
function SortableMenuItem({
    node,
    depth = 0,
    expandAll,
    expandSignal,
}: {
    node: TreeNode;
    depth?: number;
    expandAll: boolean;
    expandSignal: number;
}) {
    const [expanded, setExpanded] = useState(true);
    const [isActive, setIsActive] = useState(node.is_active);

    // Only enable drag for top-level items (depth === 0)
    const isDraggable = depth === 0;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: node.id, disabled: !isDraggable });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    useEffect(() => {
        setExpanded(expandAll);
    }, [expandAll, expandSignal]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "rounded-lg border border-gray-200 bg-white p-3 shadow-sm",
                depth > 0 ? "ml-6" : "",
                isDragging && "ring-2 ring-cyan-500"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-1 items-start gap-2">
                    {/* Drag Handle - Only show for top level items */}
                    {isDraggable ? (
                        <button
                            type="button"
                            className="mt-1 cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
                            {...attributes}
                            {...listeners}
                        >
                            <GripVertical className="h-4 w-4" />
                        </button>
                    ) : (
                        <span className="mt-1 h-4 w-4" />
                    )}

                    {node.children.length ? (
                        <button
                            type="button"
                            onClick={() => setExpanded((prev) => !prev)}
                            className="mt-1 text-gray-500 hover:text-gray-700"
                            aria-label="Toggle children"
                        >
                            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                    ) : (
                        <span className="mt-1 h-4 w-4" />
                    )}
                    <div className="flex flex-col">
                        <span className={cn("text-sm font-medium", !node.is_active ? "line-through text-gray-400" : "text-gray-800")}>
                            {node.title}
                        </span>
                        <span className="text-xs text-gray-500">
                            {node.type.toUpperCase()} {node.target ? `· ${node.target}` : ""}
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    {node.type === "page" && (node.page_id ?? node.page?.id) && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-xs"
                            asChild
                        >
                            <Link href={route("admin.pages.edit", node.page_id ?? node.page?.id ?? 0)}>Edit Halaman</Link>
                        </Button>
                    )}
                    <label className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setIsActive(checked);
                                router.patch(
                                    route("admin.menus.status", node.id),
                                    { is_active: checked },
                                    {
                                        preserveScroll: true,
                                        onError: () => setIsActive(!checked),
                                    }
                                );
                            }}
                            className="h-4 w-4"
                        />
                        Aktif
                    </label>
                    <DeleteButton
                        url={route("admin.menus.destroy", node.id)}
                        confirmMessage={`Hapus menu "${node.title}"?`}
                        size="sm"
                        className="px-3 py-1 text-xs font-semibold"
                    />
                </div>
            </div>

            {/* Children - Static list (no drag and drop) */}
            {expanded && node.children.length > 0 && (
                <div className="mt-3 space-y-2 border-l-2 border-gray-200 pl-3">
                    {node.children.map((child) => (
                        <ChildMenuItem
                            key={child.id}
                            node={child}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Static Child Menu Item Component (no drag and drop)
function ChildMenuItem({ node }: { node: TreeNode }) {
    const [isActive, setIsActive] = useState(node.is_active);

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-1 items-start gap-2">
                    <span className="mt-1 h-4 w-4" />
                    <div className="flex flex-col">
                        <span className={cn("text-sm font-medium", !node.is_active ? "line-through text-gray-400" : "text-gray-800")}>
                            {node.title}
                        </span>
                        <span className="text-xs text-gray-500">
                            {node.type.toUpperCase()} {node.target ? `· ${node.target}` : ""}
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    <label className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setIsActive(checked);
                                router.patch(
                                    route("admin.menus.status", node.id),
                                    { is_active: checked },
                                    {
                                        preserveScroll: true,
                                        onError: () => setIsActive(!checked),
                                    }
                                );
                            }}
                            className="h-4 w-4"
                        />
                        Aktif
                    </label>
                    <DeleteButton
                        url={route("admin.menus.destroy", node.id)}
                        confirmMessage={`Hapus menu "${node.title}"?`}
                        size="sm"
                        className="px-3 py-1 text-xs font-semibold"
                    />
                </div>
            </div>
        </div>
    );
}

// Drag Overlay Component
function MenuItemOverlay({ node }: { node: TreeNode }) {
    return (
        <div className="rounded-lg border-2 border-cyan-500 bg-white p-3 shadow-lg opacity-90">
            <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-800">{node.title}</span>
            </div>
        </div>
    );
}

// Menu Tree Component with Drag and Drop
function MenuTree({
    nodes,
    position,
}: {
    nodes: TreeNode[];
    position: string;
}) {
    const [expandAll, setExpandAll] = useState(true);
    const [expandSignal, setExpandSignal] = useState(0);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [localNodes, setLocalNodes] = useState(nodes);

    // Sync local nodes with props
    useEffect(() => {
        setLocalNodes(nodes);
    }, [nodes]);

    const handleToggleAll = (value: boolean) => {
        setExpandAll(value);
        setExpandSignal((prev) => prev + 1);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findNodeById = useCallback((id: UniqueIdentifier, items: TreeNode[]): TreeNode | null => {
        for (const item of items) {
            if (item.id === id) return item;
            const found = findNodeById(id, item.children);
            if (found) return found;
        }
        return null;
    }, []);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over || active.id === over.id) return;

        const oldIndex = localNodes.findIndex((n) => n.id === active.id);
        const newIndex = localNodes.findIndex((n) => n.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const newNodes = arrayMove(localNodes, oldIndex, newIndex);
            setLocalNodes(newNodes);

            // Send reorder request to backend
            const items = newNodes.map((node, index) => ({
                id: node.id,
                parent_id: node.parent_id ?? null,
                display_order: index,
            }));

            router.post(route("admin.menus.reorder"), { items }, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const activeNode = activeId ? findNodeById(activeId, localNodes) : null;

    if (localNodes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <GripVertical className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Belum ada menu pada posisi ini.</p>
                <p className="text-xs text-gray-400 mt-1">Tambahkan menu baru menggunakan form di sebelah kiri.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-2 mb-4">
                <p className="text-xs text-gray-500">
                    <GripVertical className="h-3 w-3 inline mr-1" />
                    Drag untuk mengatur urutan
                </p>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleAll(true)}
                        className="h-8 px-3 text-xs"
                    >
                        Expand Semua
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleAll(false)}
                        className="h-8 px-3 text-xs"
                    >
                        Collapse Semua
                    </Button>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={localNodes.map((n) => n.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {localNodes.map((node) => (
                            <SortableMenuItem
                                key={node.id}
                                node={node}
                                depth={0}
                                expandAll={expandAll}
                                expandSignal={expandSignal}
                            />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {activeNode && <MenuItemOverlay node={activeNode} />}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

export default function MenuIndex({ menus, pages }: Props) {
    const [activeTab, setActiveTab] = useState<string>("main");
    const [openAccordion, setOpenAccordion] = useState<string>("page");
    const [resetDialogOpen, setResetDialogOpen] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const positionItems = useMemo(() => menus[activeTab] ?? [], [menus, activeTab]);
    const tree = useMemo(() => buildTree(positionItems), [positionItems]);
    const parentOptions = useMemo(() => flattenOptions(tree), [tree]);

    const form = useForm({
        title: "",
        position: activeTab,
        parent_id: null as number | null,
        type: "page",
        page_id: null as number | null,
        target: "",
        internal_choice: internalOptions[0]?.value ?? "/",
        category_choice: categoryOptions[0]?.value ?? "",
        display_order: 0,
        is_active: true,
    });

    const { data, setData, processing, errors } = form;

    const handleAccordionClick = (type: string) => {
        setOpenAccordion(openAccordion === type ? "" : type);
        if (openAccordion !== type) {
            setData("type", type);
            setData("page_id", null);
            setData("target", "");
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        form.post(route("admin.menus.store"), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset("title", "parent_id", "page_id", "target", "display_order");
                setCreateDialogOpen(false);
                router.reload({ only: ["menus"] });
            },
        });
    };

    const handleReset = () => {
        setResetting(true);
        router.post(route("admin.menus.reset"), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setResetDialogOpen(false);
                setResetting(false);
            },
            onError: () => {
                setResetting(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Menu Website" />
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">Menu Website</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            onClick={() => setCreateDialogOpen(true)}
                            className="bg-cyan-500 text-white hover:bg-cyan-600"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Menu
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setResetDialogOpen(true)}
                            className="text-orange-600 border-orange-300 hover:bg-orange-50"
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset Menu
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={(val) => {
                        setActiveTab(val);
                        setData("position", val);
                    }}
                >
                    <TabsList className="mb-6 h-auto gap-0 rounded-none border-b border-gray-200 bg-transparent p-0">
                        {positions.map((pos) => (
                            <TabsTrigger
                                key={pos.key}
                                value={pos.key}
                                className={cn(
                                    "rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-gray-500",
                                    "data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent data-[state=active]:text-cyan-600 data-[state=active]:shadow-none"
                                )}
                            >
                                {pos.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {positions.map((pos) => (
                        <TabsContent key={pos.key} value={pos.key} className="mt-0">
                            {/* Full Width - Menu Tree with Drag & Drop */}
                            <div className="rounded-md border border-gray-200 bg-white">
                                <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
                                    <h3 className="text-sm font-medium text-gray-700">Struktur Menu</h3>
                                </div>
                                <MenuTree nodes={tree} position={activeTab} />
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Create Menu Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Tambah Menu Baru</DialogTitle>
                        <DialogDescription>
                            Buat menu baru untuk posisi <strong className="text-cyan-600">{positions.find(p => p.key === activeTab)?.label}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nama Menu */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Nama Menu</Label>
                            <Input
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Contoh: Tentang Kami"
                                className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                            />
                            <InputError message={errors.title} />
                        </div>

                        {/* Parent (opsional) */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Parent (opsional)</Label>
                            <Select
                                value={data.parent_id !== null ? String(data.parent_id) : "none"}
                                onValueChange={(val) => setData("parent_id", val === "none" ? null : Number(val))}
                            >
                                <SelectTrigger className="border-gray-300">
                                    <SelectValue placeholder="Pilih parent" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">(Tidak ada parent)</SelectItem>
                                    {parentOptions.map((opt) => (
                                        <SelectItem key={opt.id} value={String(opt.id)}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.parent_id} />
                        </div>

                        {/* Jenis Menu */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Jenis Menu</Label>
                            <div className="space-y-2">
                                {/* Halaman */}
                                <AccordionItem
                                    title="Halaman"
                                    isOpen={openAccordion === "page"}
                                    onClick={() => handleAccordionClick("page")}
                                >
                                    <div className="px-1">
                                        <Select
                                            value={data.page_id !== null ? String(data.page_id) : "none"}
                                            onValueChange={(val) => setData("page_id", val === "none" ? null : Number(val))}
                                        >
                                            <SelectTrigger className="border-gray-300">
                                                <SelectValue placeholder="Pilih halaman" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <PageOptionsPlain pages={pages} includeNone noneValue="none" noneLabel="(Tidak ada)" />
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.page_id} />
                                    </div>
                                </AccordionItem>

                                {/* Kategori */}
                                <AccordionItem
                                    title="Kategori"
                                    isOpen={openAccordion === "category"}
                                    onClick={() => handleAccordionClick("category")}
                                >
                                    <div className="px-1">
                                        <Select
                                            value={data.category_choice}
                                            onValueChange={(val) => {
                                                setData("category_choice", val);
                                                setData("target", val === "/custom" ? "" : val);
                                            }}
                                        >
                                            <SelectTrigger className="border-gray-300">
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="/custom">Custom...</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {data.category_choice === "/custom" && (
                                            <Input
                                                className="mt-2 border-gray-300"
                                                value={data.target}
                                                onChange={(e) => setData("target", e.target.value)}
                                                placeholder="/blog/kategori/slug-kategori"
                                            />
                                        )}
                                        <InputError message={errors.target} />
                                    </div>
                                </AccordionItem>

                                {/* Link Internal */}
                                <AccordionItem
                                    title="Link Internal"
                                    isOpen={openAccordion === "internal"}
                                    onClick={() => handleAccordionClick("internal")}
                                >
                                    <div className="px-1">
                                        <Select
                                            value={data.internal_choice}
                                            onValueChange={(val) => {
                                                setData("internal_choice", val);
                                                setData("target", val);
                                            }}
                                        >
                                            <SelectTrigger className="border-gray-300">
                                                <SelectValue placeholder="Pilih link internal" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {internalOptions.map((opt) => (
                                                    <SelectItem key={opt.value} value={opt.value}>
                                                        {opt.label} ({opt.value})
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="/custom">Custom...</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {data.internal_choice === "/custom" && (
                                            <Input
                                                className="mt-2 border-gray-300"
                                                value={data.target}
                                                onChange={(e) => setData("target", e.target.value)}
                                                placeholder="/path-kustom"
                                            />
                                        )}
                                        <InputError message={errors.target} />
                                    </div>
                                </AccordionItem>

                                {/* Link External */}
                                <AccordionItem
                                    title="Link External"
                                    isOpen={openAccordion === "external"}
                                    onClick={() => handleAccordionClick("external")}
                                >
                                    <div className="px-1">
                                        <Input
                                            value={data.target}
                                            onChange={(e) => setData("target", e.target.value)}
                                            placeholder="https://example.com"
                                            className="border-gray-300"
                                        />
                                        <InputError message={errors.target} />
                                    </div>
                                </AccordionItem>
                            </div>
                        </div>

                        <InputError message={(errors as typeof errors & { general?: string }).general} />

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCreateDialogOpen(false)}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-cyan-500 text-white hover:bg-cyan-600"
                            >
                                {processing ? "Menyimpan..." : "Tambahkan Menu"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reset Confirmation Dialog */}
            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reset Menu ke Pengaturan Awal?</DialogTitle>
                        <DialogDescription>
                            Tindakan ini akan menghapus semua menu yang sudah dibuat dan mengembalikan menu ke pengaturan awal dari seeder.
                            <br /><br />
                            <strong className="text-red-600">Peringatan:</strong> Semua perubahan menu yang sudah Anda buat akan hilang dan tidak dapat dikembalikan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setResetDialogOpen(false)}
                            disabled={resetting}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleReset}
                            disabled={resetting}
                        >
                            {resetting ? "Mereset..." : "Ya, Reset Menu"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

