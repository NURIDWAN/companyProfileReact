import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/RichTextEditor";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, GripVertical, Trash2, Plus, ArrowLeft, Save, Eye, EyeOff, FileText, Hash, Settings2 } from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
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

// Extended Section type with unique key for drag and drop
type Section = {
    id?: number;
    _key?: string; // Internal unique key for new sections
    title: string;
    slug?: string | null;
    content?: string | null;
    display_order?: number | null;
    is_active?: boolean;
};

type Page = {
    id: number;
    title: string;
    slug: string;
    sections: Section[];
};

interface Props {
    page: Page;
}

// Helper to get unique ID for sortable
function getSectionUniqueId(section: Section): string {
    if (section.id) return `section-${section.id}`;
    if (section._key) return section._key;
    return `temp-${Math.random().toString(36).substr(2, 9)}`;
}

// Sortable Section Card Component - Similar to Landing Page cards
function SortableSectionCard({
    section,
    index,
    uniqueId,
    onUpdate,
    onRemove,
}: {
    section: Section;
    index: number;
    uniqueId: string;
    onUpdate: (field: keyof Section, value: string | boolean | number | null) => void;
    onRemove: () => void;
}) {
    const [expanded, setExpanded] = useState(true);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: uniqueId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const isActive = section.is_active ?? true;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn(
                "transition-all duration-200",
                isDragging && "ring-2 ring-cyan-500 shadow-lg",
                !isActive && "opacity-60 bg-gray-50"
            )}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    {/* Drag Handle */}
                    <button
                        type="button"
                        className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing p-1 rounded hover:bg-gray-100 transition-colors"
                        {...attributes}
                        {...listeners}
                    >
                        <GripVertical className="h-5 w-5" />
                    </button>

                    {/* Expand/Collapse */}
                    <button
                        type="button"
                        onClick={() => setExpanded((prev) => !prev)}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        {expanded ? (
                            <ChevronDown className="h-5 w-5" />
                        ) : (
                            <ChevronRight className="h-5 w-5" />
                        )}
                    </button>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                        <CardTitle className={cn(
                            "text-base truncate",
                            !isActive && "text-gray-500 line-through"
                        )}>
                            {section.title || `Section ${index + 1}`}
                        </CardTitle>
                        {section.slug && (
                            <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                                <Hash className="h-3 w-3" />
                                {section.slug}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onUpdate("is_active", !isActive)}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                                isActive
                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            )}
                        >
                            {isActive ? (
                                <>
                                    <Eye className="h-3.5 w-3.5" />
                                    Aktif
                                </>
                            ) : (
                                <>
                                    <EyeOff className="h-3.5 w-3.5" />
                                    Nonaktif
                                </>
                            )}
                        </button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                            onClick={onRemove}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {/* Section Form Content */}
            {expanded && (
                <CardContent className="pt-0 space-y-6">
                    {/* Title & Slug */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-400" />
                                Judul Section
                            </Label>
                            <Input
                                value={section.title}
                                onChange={(e) => onUpdate("title", e.target.value)}
                                placeholder="Masukkan judul section"
                                className="h-10"
                            />
                            <p className="text-xs text-gray-400">
                                Judul yang akan ditampilkan pada halaman
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Hash className="h-4 w-4 text-gray-400" />
                                Slug / Anchor ID
                            </Label>
                            <Input
                                value={section.slug ?? ""}
                                onChange={(e) => onUpdate("slug", e.target.value)}
                                placeholder="contoh-slug"
                                className="h-10"
                            />
                            <p className="text-xs text-gray-400">
                                Digunakan untuk direct link: <code className="bg-gray-100 px-1 rounded">#{section.slug || "slug"}</code>
                            </p>
                        </div>
                    </div>

                    {/* Rich Text Content */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Settings2 className="h-4 w-4 text-gray-400" />
                            Konten Section
                        </Label>
                        <div className="border rounded-lg overflow-hidden bg-white">
                            <RichTextEditor
                                value={section.content ?? ""}
                                onChange={(html) => onUpdate("content", html)}
                                placeholder="Tulis konten section di sini..."
                            />
                        </div>
                        <p className="text-xs text-gray-400">
                            Gunakan editor untuk memformat teks, menambahkan gambar, link, dan lainnya
                        </p>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

// Section Overlay for Drag
function SectionOverlay({ section, index }: { section: Section; index: number }) {
    return (
        <Card className="shadow-xl opacity-95 border-2 border-cyan-500">
            <CardHeader className="py-3">
                <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <CardTitle className="text-base">
                        {section.title || `Section ${index + 1}`}
                    </CardTitle>
                </div>
            </CardHeader>
        </Card>
    );
}

// Counter for generating stable unique keys for new sections
let sectionKeyCounter = 0;
function generateSectionKey(): string {
    sectionKeyCounter += 1;
    return `new-section-${Date.now()}-${sectionKeyCounter}`;
}

export default function SectionsPage({ page }: Props) {
    // Initialize sections with stable unique keys
    const initializeSections = useCallback((pageSections: Section[]): Section[] => {
        return (pageSections ?? []).map((s) => ({
            ...s,
            _key: s.id ? undefined : generateSectionKey(),
        }));
    }, []);

    const [sections, setSections] = useState<Section[]>(() => initializeSections(page.sections ?? []));
    const [saving, setSaving] = useState(false);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    // Create stable IDs map for drag and drop
    const sectionIds = useMemo(() => {
        return sections.map((s) => getSectionUniqueId(s));
    }, [sections]);

    // Track changes (exclude _key from comparison)
    useEffect(() => {
        const stripKeys = (items: Section[]) =>
            items.map(({ _key, ...rest }) => rest);
        const original = JSON.stringify(stripKeys(page.sections ?? []));
        const current = JSON.stringify(stripKeys(sections));
        setHasChanges(original !== current);
    }, [sections, page.sections]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over || active.id === over.id) return;

        const activeIdStr = String(active.id);
        const overIdStr = String(over.id);

        const oldIndex = sectionIds.findIndex((id) => id === activeIdStr);
        const newIndex = sectionIds.findIndex((id) => id === overIdStr);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            setSections((prevSections) => {
                const newSections = arrayMove(prevSections, oldIndex, newIndex).map((s, idx) => ({
                    ...s,
                    display_order: idx,
                }));
                return newSections;
            });
        }
    };

    const addSection = () => {
        const newSection: Section = {
            _key: generateSectionKey(),
            title: "",
            slug: "",
            content: "",
            display_order: sections.length,
            is_active: true,
        };
        setSections([...sections, newSection]);
    };

    const updateSection = (index: number, field: keyof Section, value: string | boolean | number | null) => {
        setSections((prevSections) => {
            const newSections = [...prevSections];
            newSections[index] = { ...newSections[index], [field]: value };
            return newSections;
        });
    };

    const removeSection = (index: number) => {
        setSections((prevSections) => prevSections.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        setSaving(true);
        // Remove _key before sending to server
        const sectionsToSave = sections.map(({ _key, ...rest }) => rest);
        router.put(
            route("admin.menus.page-sections", page.id),
            { sections: sectionsToSave },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSaving(false);
                    setHasChanges(false);
                },
                onError: () => {
                    setSaving(false);
                },
            }
        );
    };

    const activeIndex = activeId
        ? sectionIds.findIndex((id) => id === String(activeId))
        : -1;
    const activeSection = activeIndex >= 0 ? sections[activeIndex] : null;

    return (
        <AppLayout>
            <Head title={`Kelola Konten - ${page.title}`} />

            <div className="min-h-screen bg-gray-50">
                {/* Sticky Header */}
                <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("admin.menus.index")}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                    <span className="hidden sm:inline">Kembali ke Menu</span>
                                </Link>
                                <div className="h-6 w-px bg-gray-200 hidden sm:block" />
                                <div>
                                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                                        Kelola Konten: {page.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        Atur section dan konten halaman
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {hasChanges && (
                                    <span className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full font-medium">
                                        ● Perubahan belum disimpan
                                    </span>
                                )}
                                <Button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving || !hasChanges}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-sm"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {saving ? "Menyimpan..." : "Simpan Semua"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    {sections.length === 0 ? (
                        /* Empty State */
                        <Card className="p-12">
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="rounded-full bg-gray-100 p-6 mb-4">
                                    <Plus className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Belum Ada Section
                                </h3>
                                <p className="text-sm text-gray-500 max-w-md mb-6">
                                    Section adalah bagian-bagian konten dari halaman Anda.
                                    Mulai tambahkan section untuk membangun konten halaman.
                                </p>
                                <Button
                                    type="button"
                                    onClick={addSection}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tambah Section Pertama
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        /* Section List */
                        <div className="space-y-6">
                            {/* Info Bar */}
                            <div className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                    <span>Drag untuk mengatur urutan section</span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {sections.length} section
                                </span>
                            </div>

                            {/* Sortable Sections */}
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragStart={(event) => setActiveId(event.active.id)}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={sectionIds}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-4">
                                        {sections.map((section, index) => (
                                            <SortableSectionCard
                                                key={sectionIds[index]}
                                                section={section}
                                                index={index}
                                                uniqueId={sectionIds[index]}
                                                onUpdate={(field, value) => updateSection(index, field, value)}
                                                onRemove={() => removeSection(index)}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                                <DragOverlay>
                                    {activeSection && (
                                        <SectionOverlay section={activeSection} index={activeIndex} />
                                    )}
                                </DragOverlay>
                            </DndContext>

                            {/* Add Section Button */}
                            <button
                                type="button"
                                onClick={addSection}
                                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200"
                            >
                                <Plus className="h-5 w-5" />
                                <span className="font-medium">Tambah Section Baru</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Save Bar (Mobile) */}
                {hasChanges && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 sm:hidden z-30">
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
