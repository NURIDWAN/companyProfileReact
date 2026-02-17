import { RichTextEditor } from '@/components/RichTextEditor';
import { IconPicker } from '@/components/ui/IconPicker';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, ChevronUp, GripVertical, PlusCircle, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

// ==================== VALIDATION SYSTEM ====================

// Validation rules per section type
type ValidationRule = {
    required?: string[];
    arrayRequired?: { field: string; minLength: number; itemFields?: string[] }[];
};

const SECTION_VALIDATION_RULES: Record<string, ValidationRule> = {
    // Home sections
    hero_home: { required: ['heading'] },
    about_intro: { required: ['heading'] },
    service_overview: { required: ['heading'] },
    why_us: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    testimonials_home: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['quote', 'author'] }] },
    metrics_home: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['value', 'label'] }] },
    cta_home: { required: ['heading', 'button_label'] },
    blog_preview: { required: ['heading'] },

    // About sections
    about_overview: { required: ['heading'] },
    about_vision: { required: ['vision_title', 'mission_title'] },
    about_values: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    about_statistics: { required: ['title'] },
    about_team: { arrayRequired: [{ field: 'members', minLength: 1, itemFields: ['name'] }] },
    about_cta: { required: ['heading', 'button_label'] },

    // Service sections
    service_hero: { required: ['heading'] },
    service_summary: { required: ['heading'] },
    service_offerings: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    service_tech_stack: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['name'] }] },
    service_process: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    service_advantages: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    service_faqs: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['question', 'answer'] }] },

    // Product sections
    product_hero: { required: ['heading'] },
    product_features: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    product_gallery: { required: ['heading'], arrayRequired: [{ field: 'images', minLength: 1, itemFields: ['url'] }] },

    // Career sections
    career_hero: { required: ['heading'] },
    career_benefits: { required: ['heading'], arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    career_positions: { arrayRequired: [{ field: 'positions', minLength: 1, itemFields: ['title'] }] },

    // Contact sections
    contact_info: { required: ['heading'] },
    contact_map: { required: ['heading', 'embed_url'] },

    // General/UI sections
    slider: { arrayRequired: [{ field: 'slides', minLength: 1, itemFields: ['image'] }] },
    video_embed: { required: ['video_url'] },
    pricing_table: { arrayRequired: [{ field: 'plans', minLength: 1, itemFields: ['name', 'price'] }] },
    partners: { arrayRequired: [{ field: 'logos', minLength: 1, itemFields: ['image'] }] },
    counter: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['value', 'label'] }] },
    feature_cards: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
    banner: { required: ['title'] },
    gallery: { arrayRequired: [{ field: 'images', minLength: 1, itemFields: ['url'] }] },
    accordion: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title', 'content'] }] },
    tabs: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title', 'content'] }] },
    timeline: { arrayRequired: [{ field: 'items', minLength: 1, itemFields: ['title'] }] },
};

// Format field name for display
function formatFieldName(field: string): string {
    const translations: Record<string, string> = {
        heading: 'Judul',
        title: 'Judul',
        description: 'Deskripsi',
        button_label: 'Label Tombol',
        button_link: 'Link Tombol',
        embed_url: 'URL Embed',
        quote: 'Kutipan',
        author: 'Penulis',
        value: 'Nilai',
        label: 'Label',
        name: 'Nama',
        image: 'Gambar',
        url: 'URL',
        question: 'Pertanyaan',
        answer: 'Jawaban',
        content: 'Konten',
        price: 'Harga',
        vision_title: 'Judul Visi',
        mission_title: 'Judul Misi',
    };
    return translations[field] || field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Validate section data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateSection(type: string, data: Record<string, any>): Record<string, string> {
    const errors: Record<string, string> = {};
    const rules = SECTION_VALIDATION_RULES[type];

    if (!rules) return errors;

    // Check required fields
    if (rules.required) {
        for (const field of rules.required) {
            const value = data[field];
            if (!value || (typeof value === 'string' && !value.trim())) {
                errors[field] = `${formatFieldName(field)} wajib diisi`;
            }
        }
    }

    // Check array required fields
    if (rules.arrayRequired) {
        for (const { field, minLength, itemFields } of rules.arrayRequired) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const arr = data[field] as any[];
            if (!arr || arr.length < minLength) {
                errors[field] = `Minimal ${minLength} ${formatFieldName(field)} harus ditambahkan`;
            } else if (itemFields) {
                // Check required fields within array items
                arr.forEach((item, idx) => {
                    for (const itemField of itemFields) {
                        const value = item[itemField];
                        if (!value || (typeof value === 'string' && !value.trim())) {
                            errors[`${field}.${idx}.${itemField}`] = `${formatFieldName(itemField)} wajib diisi`;
                        }
                    }
                });
            }
        }
    }

    return errors;
}

// Get error for a specific field path
function _getFieldError(errors: Record<string, string>, ...keys: string[]): string | undefined {
    for (const key of keys) {
        if (errors[key]) return errors[key];
    }
    return undefined;
}

// Check if a field has error
function _hasFieldError(errors: Record<string, string>, field: string): boolean {
    return Object.keys(errors).some((key) => key === field || key.startsWith(`${field}.`));
}

// Inline error component
function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

// Required field indicator
function RequiredMark() {
    return <span className="ml-0.5 text-red-500">*</span>;
}

// ==================== END VALIDATION SYSTEM ====================

export type SectionFormData = {
    id?: number;
    title: string;
    slug?: string;
    content: string;
    display_order: number;
    is_active: boolean;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
};

interface SectionBlockProps {
    section: SectionFormData;
    index: number;
    totalSections: number;
    sectionTypes: Array<{ value: string; label: string }>;
    sectionTypeGroups?: Record<string, { label: string; items: Array<{ value: string; label: string }> }>;
    onUpdate: (section: SectionFormData) => void;
    onDelete: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
    isDragging?: boolean;
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function SectionBlock({
    section,
    index,
    totalSections,
    sectionTypes,
    sectionTypeGroups,
    onUpdate,
    onDelete,
    onMoveUp,
    onMoveDown,
    dragHandleProps,
    isDragging,
}: SectionBlockProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const type = section.type ?? 'plain';
    const dataSection = useMemo(() => section.data ?? {}, [section.data]);

    // Validate when data changes (for touched fields only)
    useEffect(() => {
        if (touched.size > 0) {
            const errors = validateSection(type, dataSection);
            // Only show errors for touched fields
            const filteredErrors: Record<string, string> = {};
            for (const key of Object.keys(errors)) {
                const baseField = key.split('.')[0];
                if (touched.has(key) || touched.has(baseField)) {
                    filteredErrors[key] = errors[key];
                }
            }
            setValidationErrors(filteredErrors);
        }
    }, [dataSection, type, touched]);

    // Reset validation when type changes
    useEffect(() => {
        setTouched(new Set());
        setValidationErrors({});
    }, [type]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData = (payload: Record<string, any>) => {
        onUpdate({ ...section, data: { ...section.data, ...payload } });
    };

    const markTouched = useCallback((field: string) => {
        setTouched((prev) => {
            const next = new Set(prev);
            next.add(field);
            return next;
        });
    }, []);

    // Auto-slug logic: update slug when title changes, unless user has manually edited slug
    const handleTitleChange = (newTitle: string) => {
        const currentSlug = section.slug ?? '';
        const currentTitleSlug = slugify(section.title);

        // Auto-update slug jika:
        // 1. Slug kosong, ATAU
        // 2. Slug sama dengan slugified current title (belum diedit manual)
        const shouldAutoSlug = !currentSlug || currentSlug === currentTitleSlug;

        onUpdate({
            ...section,
            title: newTitle,
            slug: shouldAutoSlug ? slugify(newTitle) : currentSlug,
        });
    };

    // Handle manual slug editing
    const handleSlugChange = (newSlug: string) => {
        onUpdate({ ...section, slug: slugify(newSlug) });
    };

    const getTypeLabel = (typeValue: string) => {
        return sectionTypes.find((t) => t.value === typeValue)?.label || typeValue;
    };

    // Check if section has any validation errors
    const hasErrors = Object.keys(validationErrors).length > 0;

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div
                className={cn(
                    'rounded-lg border transition-all duration-200',
                    isOpen ? 'border-primary/30 bg-card shadow-sm' : 'border-border bg-muted/20',
                    !section.is_active && 'opacity-60',
                    isDragging && 'opacity-90 shadow-lg ring-2 ring-primary',
                )}
            >
                {/* Header - Always visible */}
                <div className="flex items-center gap-2 p-3">
                    <div
                        className={cn(
                            'flex cursor-grab items-center gap-2 text-muted-foreground hover:text-foreground active:cursor-grabbing',
                            isDragging && 'cursor-grabbing',
                        )}
                        {...dragHandleProps}
                    >
                        <GripVertical className="h-4 w-4" />
                    </div>

                    <Checkbox
                        checked={section.is_active}
                        onCheckedChange={(checked) => onUpdate({ ...section, is_active: !!checked })}
                        className="shrink-0"
                    />

                    <CollapsibleTrigger asChild>
                        <button
                            type="button"
                            className="-mx-2 flex flex-1 items-center gap-3 rounded-md px-2 py-1 text-left transition-colors hover:bg-muted/50"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className={cn('truncate font-medium', !section.title && 'text-muted-foreground italic')}>
                                        {section.title || `Section ${index + 1}`}
                                    </span>
                                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{getTypeLabel(type)}</span>
                                    {hasErrors && (
                                        <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                            Ada field yang belum lengkap
                                        </span>
                                    )}
                                </div>
                                {section.slug && <span className="text-xs text-muted-foreground">#{section.slug}</span>}
                            </div>
                            {isOpen ? (
                                <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                        </button>
                    </CollapsibleTrigger>

                    <div className="flex shrink-0 items-center gap-1">
                        {(onMoveUp || onMoveDown) && (
                            <div className="flex rounded-md border border-input bg-background">
                                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0} onClick={onMoveUp}>
                                    <ChevronUp className="h-3 w-3" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    disabled={index === totalSections - 1}
                                    onClick={onMoveDown}
                                >
                                    <ChevronDown className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={onDelete}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content - Collapsible */}
                <CollapsibleContent>
                    <div className="space-y-4 border-t px-4 py-4">
                        {/* Basic Fields */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium">Judul Section</Label>
                                <Input value={section.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Judul section" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium">Slug (Anchor)</Label>
                                <Input value={section.slug ?? ''} onChange={(e) => handleSlugChange(e.target.value)} placeholder="anchor-section" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium">Tipe Section</Label>
                                <select
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                    value={type}
                                    onChange={(e) => onUpdate({ ...section, type: e.target.value, data: {} })}
                                >
                                    {sectionTypeGroups
                                        ? Object.entries(sectionTypeGroups).map(([key, group]) => (
                                              <optgroup key={key} label={group.label}>
                                                  {group.items.map((opt) => (
                                                      <option key={opt.value} value={opt.value}>
                                                          {opt.label}
                                                      </option>
                                                  ))}
                                              </optgroup>
                                          ))
                                        : sectionTypes.map((opt) => (
                                              <option key={opt.value} value={opt.value}>
                                                  {opt.label}
                                              </option>
                                          ))}
                                </select>
                            </div>
                        </div>

                        {/* Type-specific Fields */}
                        <div className="pt-2">
                            <SectionTypeFields
                                type={type}
                                data={dataSection}
                                onUpdate={updateData}
                                section={section}
                                onSectionUpdate={onUpdate}
                                errors={validationErrors}
                                onBlur={markTouched}
                            />
                        </div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}

interface SectionTypeFieldsProps {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (payload: Record<string, any>) => void;
    section: SectionFormData;
    onSectionUpdate: (section: SectionFormData) => void;
    errors: Record<string, string>;
    onBlur: (field: string) => void;
}

function SectionTypeFields({ type, data, onUpdate, section, onSectionUpdate, errors, onBlur }: SectionTypeFieldsProps) {
    // Plain HTML content
    if (type === 'plain') {
        return (
            <div className="space-y-2">
                <Label className="text-xs font-medium">Konten HTML</Label>
                <RichTextEditor value={section.content} onChange={(value) => onSectionUpdate({ ...section, content: value })} />
            </div>
        );
    }

    // Hero Home
    if (type === 'hero_home') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Judul
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Deskripsi</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Label Tombol Utama</Label>
                        <Input value={data.primary_label ?? ''} onChange={(e) => onUpdate({ primary_label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Link Tombol Utama</Label>
                        <Input value={data.primary_link ?? ''} onChange={(e) => onUpdate({ primary_link: e.target.value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Label Tombol Sekunder</Label>
                        <Input value={data.secondary_label ?? ''} onChange={(e) => onUpdate({ secondary_label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Link Tombol Sekunder</Label>
                        <Input value={data.secondary_link ?? ''} onChange={(e) => onUpdate({ secondary_link: e.target.value })} />
                    </div>
                </div>
                <ImageUpload value={data.hero_image ?? null} onChange={(url) => onUpdate({ hero_image: url })} label="Gambar Hero" />
            </div>
        );
    }

    // About Intro / Service Overview
    if (type === 'about_intro' || type === 'service_overview') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Judul
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Deskripsi</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <HighlightsField highlights={data.highlights ?? []} onUpdate={(highlights) => onUpdate({ highlights })} />
                {type === 'about_intro' && <ImageUpload value={data.image ?? null} onChange={(url) => onUpdate({ image: url })} label="Gambar" />}
            </div>
        );
    }

    // CTA Home
    if (type === 'cta_home' || type === 'about_cta') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Judul
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Deskripsi</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Label Tombol
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.button_label ?? ''}
                            onChange={(e) => onUpdate({ button_label: e.target.value })}
                            onBlur={() => onBlur('button_label')}
                            className={errors.button_label ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.button_label} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Link Tombol</Label>
                        <Input value={data.button_link ?? ''} onChange={(e) => onUpdate({ button_link: e.target.value })} placeholder="/contact" />
                    </div>
                </div>
            </div>
        );
    }

    // Why Us
    if (type === 'why_us') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <Input value={data.description ?? ''} onChange={(e) => onUpdate({ description: e.target.value })} />
                    </div>
                </div>
                <ItemsWithIconField
                    items={data.items ?? []}
                    onUpdate={(items) => onUpdate({ items })}
                    itemLabel="Feature"
                    errors={errors}
                    onBlur={onBlur}
                />
            </div>
        );
    }

    // Testimonials Home
    if (type === 'testimonials_home') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <Input value={data.description ?? ''} onChange={(e) => onUpdate({ description: e.target.value })} />
                    </div>
                </div>
                <TestimonialsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Metrics Home
    if (type === 'metrics_home') {
        return (
            <div className="space-y-4">
                <MetricsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Blog Preview
    if (type === 'blog_preview') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <Input value={data.description ?? ''} onChange={(e) => onUpdate({ description: e.target.value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Link Text</Label>
                        <Input value={data.link_text ?? ''} onChange={(e) => onUpdate({ link_text: e.target.value })} placeholder="Lihat Semua" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Link URL</Label>
                        <Input value={data.link_url ?? ''} onChange={(e) => onUpdate({ link_url: e.target.value })} placeholder="/blog" />
                    </div>
                </div>
            </div>
        );
    }

    // About Overview
    if (type === 'about_overview') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Badge</Label>
                        <Input value={data.badge ?? ''} onChange={(e) => onUpdate({ badge: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Title (Kecil)</Label>
                        <Input value={data.title ?? ''} onChange={(e) => onUpdate({ title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading (Besar)
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Paragraf (satu per baris)</Label>
                    <Textarea
                        value={(data.paragraphs ?? []).join('\n')}
                        onChange={(e) => onUpdate({ paragraphs: e.target.value.split('\n') })}
                        rows={4}
                    />
                </div>
                <StatsField stats={data.stats ?? []} onUpdate={(stats) => onUpdate({ stats })} />
                <ItemsWithIconField items={data.highlights ?? []} onUpdate={(highlights) => onUpdate({ highlights })} itemLabel="Highlight" />
                <ImageUpload value={data.image ?? null} onChange={(url) => onUpdate({ image: url })} label="Gambar Overview" />
            </div>
        );
    }

    // About Vision
    if (type === 'about_vision') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Badge</Label>
                        <Input value={data.badge ?? ''} onChange={(e) => onUpdate({ badge: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Title</Label>
                        <Input value={data.title ?? ''} onChange={(e) => onUpdate({ title: e.target.value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Judul Visi
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.vision_title ?? ''}
                            onChange={(e) => onUpdate({ vision_title: e.target.value })}
                            onBlur={() => onBlur('vision_title')}
                            className={errors.vision_title ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.vision_title} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Teks Visi</Label>
                        <RichTextEditor value={data.vision_text ?? ''} onChange={(value) => onUpdate({ vision_text: value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Judul Misi
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.mission_title ?? ''}
                            onChange={(e) => onUpdate({ mission_title: e.target.value })}
                            onBlur={() => onBlur('mission_title')}
                            className={errors.mission_title ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.mission_title} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Teks Misi</Label>
                        <RichTextEditor value={data.mission_text ?? ''} onChange={(value) => onUpdate({ mission_text: value })} />
                    </div>
                </div>
                <ImageUpload value={data.image ?? null} onChange={(url) => onUpdate({ image: url })} label="Gambar Vision/Mission" />
            </div>
        );
    }

    // About Values
    if (type === 'about_values') {
        return (
            <ItemsWithIconField
                items={data.items ?? []}
                onUpdate={(items) => onUpdate({ items })}
                itemLabel="Value"
                errors={errors}
                onBlur={onBlur}
            />
        );
    }

    // About Statistics
    if (type === 'about_statistics') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Badge</Label>
                        <Input value={data.badge ?? ''} onChange={(e) => onUpdate({ badge: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Title
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.title ?? ''}
                            onChange={(e) => onUpdate({ title: e.target.value })}
                            onBlur={() => onBlur('title')}
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.title} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <StatsField stats={data.primary ?? []} onUpdate={(primary) => onUpdate({ primary })} label="Primary Stats" />
                <StatsField stats={data.secondary ?? []} onUpdate={(secondary) => onUpdate({ secondary })} label="Secondary Stats" />
            </div>
        );
    }

    // About Team
    if (type === 'about_team') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Badge</Label>
                        <Input value={data.badge ?? ''} onChange={(e) => onUpdate({ badge: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Title</Label>
                        <Input value={data.title ?? ''} onChange={(e) => onUpdate({ title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <TeamMembersField members={data.members ?? []} onUpdate={(members) => onUpdate({ members })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Service Hero
    if (type === 'service_hero') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <ImageUpload value={data.image ?? null} onChange={(url) => onUpdate({ image: url })} label="Background Image" />
            </div>
        );
    }

    // Service Summary
    if (type === 'service_summary') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
            </div>
        );
    }

    // Service Offerings / Process / Advantages
    if (type === 'service_offerings' || type === 'service_process' || type === 'service_advantages') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Heading
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.heading ?? ''}
                            onChange={(e) => onUpdate({ heading: e.target.value })}
                            onBlur={() => onBlur('heading')}
                            className={errors.heading ? 'border-red-500' : ''}
                        />
                        <FieldError message={errors.heading} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                    </div>
                </div>
                <ItemsWithIconField
                    items={data.items ?? []}
                    onUpdate={(items) => onUpdate({ items })}
                    itemLabel={type === 'service_offerings' ? 'Offering' : type === 'service_process' ? 'Step' : 'Advantage'}
                    errors={errors}
                    onBlur={onBlur}
                />
            </div>
        );
    }

    // Service Tech Stack
    if (type === 'service_tech_stack') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <TechStackField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Service FAQs
    if (type === 'service_faqs') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <FaqsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // ==================== PRODUCT SECTIONS ====================

    // Product Hero
    if (type === 'product_hero') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Primary Button Label</Label>
                        <Input value={data.primary_label ?? ''} onChange={(e) => onUpdate({ primary_label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Primary Button Link</Label>
                        <Input value={data.primary_link ?? ''} onChange={(e) => onUpdate({ primary_link: e.target.value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Secondary Button Label</Label>
                        <Input value={data.secondary_label ?? ''} onChange={(e) => onUpdate({ secondary_label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Secondary Button Link</Label>
                        <Input value={data.secondary_link ?? ''} onChange={(e) => onUpdate({ secondary_link: e.target.value })} />
                    </div>
                </div>
                <ImageUpload value={data.image ?? null} onChange={(url) => onUpdate({ image: url })} label="Hero Image" />
            </div>
        );
    }

    // Product Features
    if (type === 'product_features') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <ItemsWithIconField
                    items={data.items ?? []}
                    onUpdate={(items) => onUpdate({ items })}
                    itemLabel="Feature"
                    errors={errors}
                    onBlur={onBlur}
                />
            </div>
        );
    }

    // Product Gallery
    if (type === 'product_gallery') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Columns</Label>
                    <Input type="number" min={2} max={4} value={data.columns ?? 3} onChange={(e) => onUpdate({ columns: Number(e.target.value) })} />
                </div>
                <ImagesField images={data.images ?? []} onUpdate={(images) => onUpdate({ images })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // ==================== CAREER SECTIONS ====================

    // Career Hero
    if (type === 'career_hero') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Button Label</Label>
                        <Input value={data.primary_label ?? ''} onChange={(e) => onUpdate({ primary_label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Button Link</Label>
                        <Input value={data.primary_link ?? ''} onChange={(e) => onUpdate({ primary_link: e.target.value })} />
                    </div>
                </div>
                <ImageUpload value={data.image ?? null} onChange={(url) => onUpdate({ image: url })} label="Hero Image" />
            </div>
        );
    }

    // Career Benefits
    if (type === 'career_benefits') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <ItemsWithIconField
                    items={data.items ?? []}
                    onUpdate={(items) => onUpdate({ items })}
                    itemLabel="Benefit"
                    errors={errors}
                    onBlur={onBlur}
                />
            </div>
        );
    }

    // Career Positions
    if (type === 'career_positions') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <PositionsField positions={data.positions ?? []} onUpdate={(positions) => onUpdate({ positions })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // ==================== CONTACT SECTIONS ====================

    // Contact Info
    if (type === 'contact_info') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Alamat</Label>
                        <Textarea value={data.address ?? ''} onChange={(e) => onUpdate({ address: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Telepon</Label>
                        <Input value={data.phone ?? ''} onChange={(e) => onUpdate({ phone: e.target.value })} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Email</Label>
                        <Input value={data.email ?? ''} onChange={(e) => onUpdate({ email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Jam Operasional</Label>
                        <Input
                            value={data.hours ?? ''}
                            onChange={(e) => onUpdate({ hours: e.target.value })}
                            placeholder="Senin - Jumat, 09:00 - 17:00"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Google Maps Embed URL</Label>
                    <Input
                        value={data.map_embed ?? ''}
                        onChange={(e) => onUpdate({ map_embed: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?..."
                    />
                </div>
            </div>
        );
    }

    // Contact Map
    if (type === 'contact_map') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Heading
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.heading ?? ''}
                        onChange={(e) => onUpdate({ heading: e.target.value })}
                        onBlur={() => onBlur('heading')}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.heading} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Google Maps Embed URL
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.embed_url ?? ''}
                        onChange={(e) => onUpdate({ embed_url: e.target.value })}
                        onBlur={() => onBlur('embed_url')}
                        className={errors.embed_url ? 'border-red-500' : ''}
                        placeholder="https://www.google.com/maps/embed?..."
                    />
                    <FieldError message={errors.embed_url} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Height (px)</Label>
                    <Input type="number" min={200} value={data.height ?? 400} onChange={(e) => onUpdate({ height: Number(e.target.value) })} />
                </div>
            </div>
        );
    }

    // ==================== GENERAL UI SECTIONS ====================

    // Gallery
    if (type === 'gallery') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Layout</Label>
                        <select
                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                            value={data.layout ?? 'grid'}
                            onChange={(e) => onUpdate({ layout: e.target.value })}
                        >
                            <option value="grid">Grid</option>
                            <option value="masonry">Masonry</option>
                            <option value="carousel">Carousel</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Columns</Label>
                        <Input
                            type="number"
                            min={2}
                            max={4}
                            value={data.columns ?? 3}
                            onChange={(e) => onUpdate({ columns: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <ImagesField images={data.images ?? []} onUpdate={(images) => onUpdate({ images })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Accordion
    if (type === 'accordion') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <AccordionItemsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Tabs
    if (type === 'tabs') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <TabItemsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Timeline
    if (type === 'timeline') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <TimelineItemsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // ==================== NEW BLOCKS ====================

    // Slider/Carousel
    if (type === 'slider') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading (Opsional)</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description (Opsional)</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="autoplay" checked={data.autoplay ?? true} onCheckedChange={(checked) => onUpdate({ autoplay: !!checked })} />
                        <Label htmlFor="autoplay" className="text-xs">
                            Autoplay
                        </Label>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Interval (ms)</Label>
                        <Input
                            type="number"
                            min={1000}
                            step={500}
                            value={data.interval ?? 5000}
                            onChange={(e) => onUpdate({ interval: Number(e.target.value) })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="showDots" checked={data.showDots ?? true} onCheckedChange={(checked) => onUpdate({ showDots: !!checked })} />
                        <Label htmlFor="showDots" className="text-xs">
                            Show Dots
                        </Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="showArrows"
                            checked={data.showArrows ?? true}
                            onCheckedChange={(checked) => onUpdate({ showArrows: !!checked })}
                        />
                        <Label htmlFor="showArrows" className="text-xs">
                            Show Arrows
                        </Label>
                    </div>
                </div>
                <SliderSlidesField slides={data.slides ?? []} onUpdate={(slides) => onUpdate({ slides })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Video Embed
    if (type === 'video_embed') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading (Opsional)</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description (Opsional)</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">
                            Video URL (YouTube/Vimeo)
                            <RequiredMark />
                        </Label>
                        <Input
                            value={data.video_url ?? ''}
                            onChange={(e) => onUpdate({ video_url: e.target.value })}
                            onBlur={() => onBlur('video_url')}
                            className={errors.video_url ? 'border-red-500' : ''}
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                        <FieldError message={errors.video_url} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Aspect Ratio</Label>
                        <select
                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                            value={data.aspect_ratio ?? '16:9'}
                            onChange={(e) => onUpdate({ aspect_ratio: e.target.value })}
                        >
                            <option value="16:9">16:9 (Widescreen)</option>
                            <option value="4:3">4:3 (Standard)</option>
                            <option value="1:1">1:1 (Square)</option>
                            <option value="21:9">21:9 (Ultrawide)</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    // Pricing Table
    if (type === 'pricing_table') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <PricingPlansField plans={data.plans ?? []} onUpdate={(plans) => onUpdate({ plans })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Partners/Clients Logo
    if (type === 'partners') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Columns</Label>
                    <Input type="number" min={3} max={6} value={data.columns ?? 5} onChange={(e) => onUpdate({ columns: Number(e.target.value) })} />
                </div>
                <PartnersLogosField logos={data.logos ?? []} onUpdate={(logos) => onUpdate({ logos })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Counter/Number
    if (type === 'counter') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading (Opsional)</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description (Opsional)</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <CounterItemsField items={data.items ?? []} onUpdate={(items) => onUpdate({ items })} errors={errors} onBlur={onBlur} />
            </div>
        );
    }

    // Feature Cards
    if (type === 'feature_cards') {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Heading</Label>
                    <Input value={data.heading ?? ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Description</Label>
                    <RichTextEditor value={data.description ?? ''} onChange={(value) => onUpdate({ description: value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Columns</Label>
                    <Input type="number" min={2} max={4} value={data.columns ?? 3} onChange={(e) => onUpdate({ columns: Number(e.target.value) })} />
                </div>
                <ItemsWithIconField
                    items={data.items ?? []}
                    onUpdate={(items) => onUpdate({ items })}
                    itemLabel="Feature Card"
                    errors={errors}
                    onBlur={onBlur}
                />
            </div>
        );
    }

    // Banner/Alert
    if (type === 'banner') {
        return (
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Tipe Banner</Label>
                        <select
                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                            value={data.banner_type ?? 'info'}
                            onChange={(e) => onUpdate({ banner_type: e.target.value })}
                        >
                            <option value="info">Info (Blue)</option>
                            <option value="success">Success (Green)</option>
                            <option value="warning">Warning (Yellow)</option>
                            <option value="error">Error (Red)</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                        <Checkbox id="closable" checked={data.closable ?? false} onCheckedChange={(checked) => onUpdate({ closable: !!checked })} />
                        <Label htmlFor="closable" className="text-xs">
                            Bisa Ditutup
                        </Label>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">
                        Judul
                        <RequiredMark />
                    </Label>
                    <Input
                        value={data.title ?? ''}
                        onChange={(e) => onUpdate({ title: e.target.value })}
                        onBlur={() => onBlur('title')}
                        className={errors.title ? 'border-red-500' : ''}
                    />
                    <FieldError message={errors.title} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Konten</Label>
                    <RichTextEditor value={data.content ?? ''} onChange={(value) => onUpdate({ content: value })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">CTA Label (Opsional)</Label>
                        <Input value={data.cta_label ?? ''} onChange={(e) => onUpdate({ cta_label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">CTA Link (Opsional)</Label>
                        <Input value={data.cta_link ?? ''} onChange={(e) => onUpdate({ cta_link: e.target.value })} />
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

// Helper Components

function HighlightsField({ highlights, onUpdate }: { highlights: string[]; onUpdate: (h: string[]) => void }) {
    return (
        <div className="space-y-2">
            <Label className="text-xs font-medium">Highlights</Label>
            <div className="space-y-2">
                {highlights.map((h, idx) => (
                    <div key={idx} className="flex gap-2">
                        <Input
                            value={h}
                            onChange={(e) => {
                                const updated = [...highlights];
                                updated[idx] = e.target.value;
                                onUpdate(updated);
                            }}
                            placeholder={`Highlight ${idx + 1}`}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() => onUpdate(highlights.filter((_, i) => i !== idx))}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...highlights, ''])}>
                <PlusCircle className="mr-2 h-3 w-3" /> Tambah Highlight
            </Button>
        </div>
    );
}

function ItemsWithIconField({
    items,
    onUpdate,
    itemLabel,
    fieldName = 'items',
    errors,
    onBlur,
}: {
    items: Array<{ icon?: string; title?: string; description?: string }>;
    onUpdate: (items: Array<{ icon?: string; title?: string; description?: string }>) => void;
    itemLabel: string;
    fieldName?: string;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-xs font-medium">{itemLabel}s</Label>
            {errors?.[fieldName] && <FieldError message={errors[fieldName]} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="space-y-3 rounded-lg border bg-muted/20 p-3">
                        <div className="flex items-start gap-3">
                            <div className="w-48 shrink-0">
                                <Label className="mb-1 block text-[10px] text-muted-foreground">Icon</Label>
                                <IconPicker
                                    value={item.icon ?? ''}
                                    onChange={(val) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, icon: val } : it)));
                                    }}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div>
                                    <Label className="mb-1 block text-[10px] text-muted-foreground">
                                        Judul
                                        <RequiredMark />
                                    </Label>
                                    <Input
                                        value={item.title ?? ''}
                                        onChange={(e) => {
                                            onUpdate(items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)));
                                        }}
                                        onBlur={() => onBlur?.(`${fieldName}.${idx}.title`)}
                                        className={errors?.[`${fieldName}.${idx}.title`] ? 'border-red-500' : ''}
                                        placeholder="Judul"
                                    />
                                    <FieldError message={errors?.[`${fieldName}.${idx}.title`]} />
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="mt-5 shrink-0"
                                onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div>
                            <Label className="mb-1 block text-[10px] text-muted-foreground">Deskripsi</Label>
                            <Input
                                value={item.description ?? ''}
                                onChange={(e) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, description: e.target.value } : it)));
                                }}
                                placeholder="Deskripsi"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { icon: '', title: '', description: '' }])}>
                <PlusCircle className="mr-2 h-3 w-3" /> Tambah {itemLabel}
            </Button>
        </div>
    );
}

function StatsField({
    stats,
    onUpdate,
    label = 'Stats',
}: {
    stats: Array<{ value?: string; label?: string }>;
    onUpdate: (stats: Array<{ value?: string; label?: string }>) => void;
    label?: string;
}) {
    return (
        <div className="space-y-3 rounded-lg border bg-muted/10 p-3">
            <Label className="text-sm font-semibold">{label}</Label>
            <div className="space-y-2">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-end gap-2">
                        <div className="flex-1 space-y-1">
                            <Label className="text-xs text-muted-foreground">Value</Label>
                            <Input
                                value={stat.value ?? ''}
                                onChange={(e) => {
                                    const updated = [...stats];
                                    updated[idx] = { ...stat, value: e.target.value };
                                    onUpdate(updated);
                                }}
                                placeholder="100+"
                            />
                        </div>
                        <div className="flex-[2] space-y-1">
                            <Label className="text-xs text-muted-foreground">Label</Label>
                            <Input
                                value={stat.label ?? ''}
                                onChange={(e) => {
                                    const updated = [...stats];
                                    updated[idx] = { ...stat, label: e.target.value };
                                    onUpdate(updated);
                                }}
                                placeholder="Proyek Selesai"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            onClick={() => onUpdate(stats.filter((_, i) => i !== idx))}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...stats, { value: '', label: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Stat
            </Button>
        </div>
    );
}

function TestimonialsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ name?: string; position?: string; testimonial?: string }>;
    onUpdate: (items: Array<{ name?: string; position?: string; testimonial?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Testimonials</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="space-y-3 rounded-lg border bg-background p-4">
                        <div className="flex items-start justify-between">
                            <div className="grid flex-1 gap-4 pr-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Nama
                                        <RequiredMark />
                                    </Label>
                                    <Input
                                        value={item.name ?? ''}
                                        onChange={(e) => {
                                            onUpdate(items.map((it, i) => (i === idx ? { ...it, name: e.target.value } : it)));
                                        }}
                                        onBlur={() => onBlur?.(`items.${idx}.author`)}
                                        className={errors?.[`items.${idx}.author`] ? 'border-red-500' : ''}
                                        placeholder="Nama Lengkap"
                                    />
                                    <FieldError message={errors?.[`items.${idx}.author`]} />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Posisi</Label>
                                    <Input
                                        value={item.position ?? ''}
                                        onChange={(e) => {
                                            onUpdate(items.map((it, i) => (i === idx ? { ...it, position: e.target.value } : it)));
                                        }}
                                        placeholder="CEO PT Maju Jaya"
                                    />
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Testimonial
                                <RequiredMark />
                            </Label>
                            <RichTextEditor
                                value={item.testimonial ?? ''}
                                onChange={(value) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, testimonial: value } : it)));
                                }}
                            />
                            <FieldError message={errors?.[`items.${idx}.quote`]} />
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { name: '', position: '', testimonial: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Testimonial
            </Button>
        </div>
    );
}

function MetricsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ value?: string; label?: string }>;
    onUpdate: (items: Array<{ value?: string; label?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Metrics</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-2">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-end gap-2">
                        <div className="flex-1 space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Value
                                <RequiredMark />
                            </Label>
                            <Input
                                value={item.value ?? ''}
                                onChange={(e) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, value: e.target.value } : it)));
                                }}
                                onBlur={() => onBlur?.(`items.${idx}.value`)}
                                className={errors?.[`items.${idx}.value`] ? 'border-red-500' : ''}
                                placeholder="100+"
                            />
                            <FieldError message={errors?.[`items.${idx}.value`]} />
                        </div>
                        <div className="flex-[2] space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Label
                                <RequiredMark />
                            </Label>
                            <Input
                                value={item.label ?? ''}
                                onChange={(e) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, label: e.target.value } : it)));
                                }}
                                onBlur={() => onBlur?.(`items.${idx}.label`)}
                                className={errors?.[`items.${idx}.label`] ? 'border-red-500' : ''}
                                placeholder="Klien Puas"
                            />
                            <FieldError message={errors?.[`items.${idx}.label`]} />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { value: '', label: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Metric
            </Button>
        </div>
    );
}

function TeamMembersField({
    members,
    onUpdate,
    errors,
    onBlur,
}: {
    members: Array<{ name?: string; position?: string; image?: string | File; socials?: Record<string, string> }>;
    onUpdate: (members: Array<{ name?: string; position?: string; image?: string | File; socials?: Record<string, string> }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Team Members</Label>
            {errors?.['members'] && <FieldError message={errors['members']} />}
            <div className="grid gap-4 md:grid-cols-2">
                {members.map((member, idx) => (
                    <div key={idx} className="space-y-3 rounded-lg border bg-background p-4">
                        <div className="flex justify-between">
                            <ImageUpload
                                value={member.image ?? null}
                                onChange={(url) => {
                                    onUpdate(members.map((m, i) => (i === idx ? { ...m, image: url ?? undefined } : m)));
                                }}
                                label="Foto"
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => onUpdate(members.filter((_, i) => i !== idx))}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Nama
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={member.name ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onUpdate(members.map((m, i) => (i === idx ? { ...m, name: value } : m)));
                                    }}
                                    onBlur={() => onBlur?.(`members.${idx}.name`)}
                                    className={errors?.[`members.${idx}.name`] ? 'border-red-500' : ''}
                                />
                                <FieldError message={errors?.[`members.${idx}.name`]} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Posisi</Label>
                                <Input
                                    value={member.position ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onUpdate(members.map((m, i) => (i === idx ? { ...m, position: value } : m)));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...members, { name: '', position: '', image: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Member
            </Button>
        </div>
    );
}

function TechStackField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ name?: string; category?: string }>;
    onUpdate: (items: Array<{ name?: string; category?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Tech Stack</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-2">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-end gap-2">
                        <div className="flex-1 space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Name
                                <RequiredMark />
                            </Label>
                            <Input
                                value={item.name ?? ''}
                                onChange={(e) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, name: e.target.value } : it)));
                                }}
                                onBlur={() => onBlur?.(`items.${idx}.name`)}
                                className={errors?.[`items.${idx}.name`] ? 'border-red-500' : ''}
                                placeholder="React"
                            />
                            <FieldError message={errors?.[`items.${idx}.name`]} />
                        </div>
                        <div className="flex-1 space-y-1">
                            <Label className="text-xs text-muted-foreground">Category</Label>
                            <Input
                                value={item.category ?? ''}
                                onChange={(e) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, category: e.target.value } : it)));
                                }}
                                placeholder="Frontend"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { name: '', category: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Tech
            </Button>
        </div>
    );
}

function FaqsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ question?: string; answer?: string }>;
    onUpdate: (items: Array<{ question?: string; answer?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">FAQs</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="space-y-2 rounded-lg border bg-muted/20 p-3">
                        <div className="flex items-start gap-2">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Question
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={item.question ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, question: e.target.value } : it)));
                                    }}
                                    onBlur={() => onBlur?.(`items.${idx}.question`)}
                                    className={errors?.[`items.${idx}.question`] ? 'border-red-500' : ''}
                                    placeholder="Pertanyaan"
                                />
                                <FieldError message={errors?.[`items.${idx}.question`]} />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="mt-5 shrink-0"
                                onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Answer
                                <RequiredMark />
                            </Label>
                            <RichTextEditor
                                value={item.answer ?? ''}
                                onChange={(value) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, answer: value } : it)));
                                }}
                            />
                            <FieldError message={errors?.[`items.${idx}.answer`]} />
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { question: '', answer: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah FAQ
            </Button>
        </div>
    );
}

// Images Field for Gallery
function ImagesField({
    images,
    onUpdate,
    fieldName = 'images',
    errors,
    onBlur: _onBlur,
}: {
    images: Array<{ url?: string | File; caption?: string }>;
    onUpdate: (images: Array<{ url?: string | File; caption?: string }>) => void;
    fieldName?: string;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Images</Label>
            {errors?.[fieldName] && <FieldError message={errors[fieldName]} />}
            <div className="grid gap-4 md:grid-cols-2">
                {images.map((image, idx) => (
                    <div key={idx} className="space-y-2 rounded-lg border bg-background p-4">
                        <div className="flex justify-between">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Image
                                    <RequiredMark />
                                </Label>
                                <ImageUpload
                                    value={image.url ?? null}
                                    onChange={(url) => {
                                        onUpdate(images.map((img, i) => (i === idx ? { ...img, url: url ?? undefined } : img)));
                                    }}
                                    label="Image"
                                />
                                <FieldError message={errors?.[`${fieldName}.${idx}.url`]} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => onUpdate(images.filter((_, i) => i !== idx))}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Caption</Label>
                            <Input
                                value={image.caption ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onUpdate(images.map((img, i) => (i === idx ? { ...img, caption: value } : img)));
                                }}
                                placeholder="Caption (opsional)"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...images, { url: '', caption: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Image
            </Button>
        </div>
    );
}

// Positions Field for Career
function PositionsField({
    positions,
    onUpdate,
    errors,
    onBlur,
}: {
    positions: Array<{ title?: string; department?: string; location?: string; type?: string; link?: string }>;
    onUpdate: (positions: Array<{ title?: string; department?: string; location?: string; type?: string; link?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Positions</Label>
            {errors?.['positions'] && <FieldError message={errors['positions']} />}
            <div className="space-y-3">
                {positions.map((position, idx) => (
                    <div key={idx} className="space-y-3 rounded-lg border bg-muted/20 p-4">
                        <div className="flex justify-between">
                            <h4 className="font-medium">Posisi #{idx + 1}</h4>
                            <Button type="button" variant="ghost" size="icon" onClick={() => onUpdate(positions.filter((_, i) => i !== idx))}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Judul Posisi
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={position.title ?? ''}
                                    onChange={(e) => {
                                        onUpdate(positions.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p)));
                                    }}
                                    onBlur={() => onBlur?.(`positions.${idx}.title`)}
                                    className={errors?.[`positions.${idx}.title`] ? 'border-red-500' : ''}
                                    placeholder="Frontend Developer"
                                />
                                <FieldError message={errors?.[`positions.${idx}.title`]} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Department</Label>
                                <Input
                                    value={position.department ?? ''}
                                    onChange={(e) => {
                                        onUpdate(positions.map((p, i) => (i === idx ? { ...p, department: e.target.value } : p)));
                                    }}
                                    placeholder="Engineering"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Lokasi</Label>
                                <Input
                                    value={position.location ?? ''}
                                    onChange={(e) => {
                                        onUpdate(positions.map((p, i) => (i === idx ? { ...p, location: e.target.value } : p)));
                                    }}
                                    placeholder="Jakarta, Indonesia"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Tipe</Label>
                                <Input
                                    value={position.type ?? ''}
                                    onChange={(e) => {
                                        onUpdate(positions.map((p, i) => (i === idx ? { ...p, type: e.target.value } : p)));
                                    }}
                                    placeholder="Full-time"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Link Detail</Label>
                            <Input
                                value={position.link ?? ''}
                                onChange={(e) => {
                                    onUpdate(positions.map((p, i) => (i === idx ? { ...p, link: e.target.value } : p)));
                                }}
                                placeholder="/career/frontend-developer"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onUpdate([...positions, { title: '', department: '', location: '', type: '', link: '' }])}
            >
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Position
            </Button>
        </div>
    );
}

// Accordion Items Field
function AccordionItemsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ title?: string; content?: string }>;
    onUpdate: (items: Array<{ title?: string; content?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Accordion Items</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="space-y-2 rounded-lg border bg-muted/20 p-3">
                        <div className="flex items-start gap-2">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Title
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={item.title ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)));
                                    }}
                                    onBlur={() => onBlur?.(`items.${idx}.title`)}
                                    className={errors?.[`items.${idx}.title`] ? 'border-red-500' : ''}
                                    placeholder="Judul accordion"
                                />
                                <FieldError message={errors?.[`items.${idx}.title`]} />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="mt-5 shrink-0"
                                onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Content
                                <RequiredMark />
                            </Label>
                            <RichTextEditor
                                value={item.content ?? ''}
                                onChange={(value) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, content: value } : it)));
                                }}
                            />
                            <FieldError message={errors?.[`items.${idx}.content`]} />
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { title: '', content: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Item
            </Button>
        </div>
    );
}

// Tab Items Field
function TabItemsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ title?: string; content?: string }>;
    onUpdate: (items: Array<{ title?: string; content?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Tab Items</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="space-y-2 rounded-lg border bg-muted/20 p-3">
                        <div className="flex items-start gap-2">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Tab Title
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={item.title ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)));
                                    }}
                                    onBlur={() => onBlur?.(`items.${idx}.title`)}
                                    className={errors?.[`items.${idx}.title`] ? 'border-red-500' : ''}
                                    placeholder="Judul tab"
                                />
                                <FieldError message={errors?.[`items.${idx}.title`]} />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="mt-5 shrink-0"
                                onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Content (HTML)
                                <RequiredMark />
                            </Label>
                            <RichTextEditor
                                value={item.content ?? ''}
                                onChange={(value) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, content: value } : it)));
                                }}
                            />
                            <FieldError message={errors?.[`items.${idx}.content`]} />
                        </div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { title: '', content: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Tab
            </Button>
        </div>
    );
}

// Timeline Items Field
function TimelineItemsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ date?: string; title?: string; description?: string; icon?: string }>;
    onUpdate: (items: Array<{ date?: string; title?: string; description?: string; icon?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Timeline Items</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="space-y-3 rounded-lg border bg-muted/20 p-3">
                        <div className="flex justify-between">
                            <h4 className="text-sm font-medium">Item #{idx + 1}</h4>
                            <Button type="button" variant="ghost" size="icon" onClick={() => onUpdate(items.filter((_, i) => i !== idx))}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Date</Label>
                                <Input
                                    value={item.date ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, date: e.target.value } : it)));
                                    }}
                                    placeholder="2024 atau Januari 2024"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Icon (opsional)</Label>
                                <IconPicker
                                    value={item.icon ?? ''}
                                    onChange={(val) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, icon: val } : it)));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Title
                                <RequiredMark />
                            </Label>
                            <Input
                                value={item.title ?? ''}
                                onChange={(e) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)));
                                }}
                                onBlur={() => onBlur?.(`items.${idx}.title`)}
                                className={errors?.[`items.${idx}.title`] ? 'border-red-500' : ''}
                                placeholder="Judul milestone"
                            />
                            <FieldError message={errors?.[`items.${idx}.title`]} />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Description</Label>
                            <RichTextEditor
                                value={item.description ?? ''}
                                onChange={(value) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, description: value } : it)));
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onUpdate([...items, { date: '', title: '', description: '', icon: '' }])}
            >
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Timeline Item
            </Button>
        </div>
    );
}

// ==================== NEW HELPER COMPONENTS ====================

// Slider Slides Field
function SliderSlidesField({
    slides,
    onUpdate,
    errors,
    onBlur: _onBlur,
}: {
    slides: Array<{ image?: string | File; title?: string; description?: string; link?: string }>;
    onUpdate: (slides: Array<{ image?: string | File; title?: string; description?: string; link?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Slides</Label>
            {errors?.['slides'] && <FieldError message={errors['slides']} />}
            <div className="space-y-3">
                {slides.map((slide, idx) => (
                    <div key={idx} className="space-y-3 rounded-lg border bg-background p-4">
                        <div className="flex items-start justify-between">
                            <span className="text-sm font-medium">Slide {idx + 1}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onUpdate(slides.filter((_, i) => i !== idx))}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">
                                Gambar Slide
                                <RequiredMark />
                            </Label>
                            <ImageUpload
                                value={slide.image ?? null}
                                onChange={(url) => {
                                    onUpdate(slides.map((s, i) => (i === idx ? { ...s, image: url ?? undefined } : s)));
                                }}
                                label="Gambar Slide"
                            />
                            <FieldError message={errors?.[`slides.${idx}.image`]} />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Title (Opsional)</Label>
                                <Input
                                    value={slide.title ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onUpdate(slides.map((s, i) => (i === idx ? { ...s, title: value } : s)));
                                    }}
                                    placeholder="Judul slide"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Link (Opsional)</Label>
                                <Input
                                    value={slide.link ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onUpdate(slides.map((s, i) => (i === idx ? { ...s, link: value } : s)));
                                    }}
                                    placeholder="/products"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Description (Opsional)</Label>
                            <RichTextEditor
                                value={slide.description ?? ''}
                                onChange={(value) => {
                                    onUpdate(slides.map((s, i) => (i === idx ? { ...s, description: value } : s)));
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onUpdate([...slides, { image: '', title: '', description: '', link: '' }])}
            >
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Slide
            </Button>
        </div>
    );
}

// Pricing Plans Field
function PricingPlansField({
    plans,
    onUpdate,
    errors,
    onBlur: _onBlur,
}: {
    plans: Array<{
        name?: string;
        price?: string;
        period?: string;
        features?: string[];
        cta_label?: string;
        cta_link?: string;
        is_popular?: boolean;
        description?: string;
    }>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (plans: Array<any>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    const addFeature = (planIdx: number) => {
        onUpdate(plans.map((p, i) => (i === planIdx ? { ...p, features: [...(p.features ?? []), ''] } : p)));
    };

    const updateFeature = (planIdx: number, featureIdx: number, value: string) => {
        onUpdate(
            plans.map((p, i) => {
                if (i !== planIdx) return p;
                const currentFeatures = [...(p.features ?? [])];
                currentFeatures[featureIdx] = value;
                return { ...p, features: currentFeatures };
            }),
        );
    };

    const removeFeature = (planIdx: number, featureIdx: number) => {
        onUpdate(
            plans.map((p, i) => {
                if (i !== planIdx) return p;
                return { ...p, features: (p.features ?? []).filter((_, fi) => fi !== featureIdx) };
            }),
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Pricing Plans</Label>
                <span className="text-xs text-muted-foreground">{plans.length} plan(s)</span>
            </div>
            {errors?.['plans'] && <FieldError message={errors['plans']} />}
            <div className="space-y-4">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`relative space-y-4 rounded-xl border-2 p-5 transition-all ${
                            plan.is_popular ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-background hover:border-muted-foreground/30'
                        }`}
                    >
                        {/* Popular Badge */}
                        {plan.is_popular && (
                            <div className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                Popular
                            </div>
                        )}

                        {/* Header */}
                        <div className="flex items-start justify-between pt-1">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg font-bold">{idx + 1}</div>
                                <div>
                                    <span className="text-sm font-semibold">{plan.name || `Plan ${idx + 1}`}</span>
                                    <p className="text-xs text-muted-foreground">
                                        {plan.price || 'Set harga'} {plan.period || ''}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1">
                                    <Checkbox
                                        id={`popular-${idx}`}
                                        checked={plan.is_popular ?? false}
                                        onCheckedChange={(checked) => {
                                            onUpdate(plans.map((p, i) => (i === idx ? { ...p, is_popular: !!checked } : p)));
                                        }}
                                    />
                                    <Label htmlFor={`popular-${idx}`} className="cursor-pointer text-xs font-medium">
                                        Tandai Popular
                                    </Label>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                    onClick={() => onUpdate(plans.filter((_, i) => i !== idx))}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">
                                    Nama Plan
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={plan.name ?? ''}
                                    onChange={(e) => {
                                        onUpdate(plans.map((p, i) => (i === idx ? { ...p, name: e.target.value } : p)));
                                    }}
                                    onBlur={() => _onBlur?.(`plans.${idx}.name`)}
                                    className={cn('font-medium', errors?.[`plans.${idx}.name`] ? 'border-red-500' : '')}
                                    placeholder="Basic / Pro / Enterprise"
                                />
                                <FieldError message={errors?.[`plans.${idx}.name`]} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">
                                    Harga
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={plan.price ?? ''}
                                    onChange={(e) => {
                                        onUpdate(plans.map((p, i) => (i === idx ? { ...p, price: e.target.value } : p)));
                                    }}
                                    onBlur={() => _onBlur?.(`plans.${idx}.price`)}
                                    className={errors?.[`plans.${idx}.price`] ? 'border-red-500' : ''}
                                    placeholder="Rp 99.000"
                                />
                                <FieldError message={errors?.[`plans.${idx}.price`]} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Periode</Label>
                                <select
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                                    value={plan.period ?? '/bulan'}
                                    onChange={(e) => {
                                        onUpdate(plans.map((p, i) => (i === idx ? { ...p, period: e.target.value } : p)));
                                    }}
                                >
                                    <option value="/bulan">/bulan</option>
                                    <option value="/tahun">/tahun</option>
                                    <option value="/minggu">/minggu</option>
                                    <option value="/hari">/hari</option>
                                    <option value="">Sekali Bayar</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Deskripsi Singkat (Opsional)</Label>
                            <Input
                                value={plan.description ?? ''}
                                onChange={(e) => {
                                    onUpdate(plans.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p)));
                                }}
                                placeholder="Cocok untuk bisnis kecil yang baru memulai"
                            />
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-medium">Fitur ({(plan.features ?? []).length})</Label>
                                <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => addFeature(idx)}>
                                    <PlusCircle className="mr-1 h-3 w-3" /> Tambah Fitur
                                </Button>
                            </div>
                            <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                                {(plan.features ?? []).length === 0 ? (
                                    <p className="py-4 text-center text-xs text-muted-foreground">
                                        Belum ada fitur. Klik "Tambah Fitur" untuk menambahkan.
                                    </p>
                                ) : (
                                    (plan.features ?? []).map((feature, featureIdx) => (
                                        <div key={featureIdx} className="flex items-center gap-2">
                                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <Input
                                                value={feature}
                                                onChange={(e) => updateFeature(idx, featureIdx, e.target.value)}
                                                placeholder={`Fitur ${featureIdx + 1}`}
                                                className="h-8 flex-1 text-sm"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 shrink-0"
                                                onClick={() => removeFeature(idx, featureIdx)}
                                            >
                                                <X className="h-3 w-3 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Teks Tombol</Label>
                                <Input
                                    value={plan.cta_label ?? ''}
                                    onChange={(e) => {
                                        onUpdate(plans.map((p, i) => (i === idx ? { ...p, cta_label: e.target.value } : p)));
                                    }}
                                    placeholder="Pilih Plan / Mulai Sekarang"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Link Tombol</Label>
                                <Input
                                    value={plan.cta_link ?? ''}
                                    onChange={(e) => {
                                        onUpdate(plans.map((p, i) => (i === idx ? { ...p, cta_link: e.target.value } : p)));
                                    }}
                                    placeholder="/checkout?plan=basic"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Plan Button */}
            <Button
                type="button"
                variant="outline"
                className="w-full border-dashed"
                onClick={() =>
                    onUpdate([
                        ...plans,
                        {
                            name: '',
                            price: '',
                            period: '/bulan',
                            description: '',
                            features: [],
                            cta_label: 'Pilih Plan',
                            cta_link: '',
                            is_popular: false,
                        },
                    ])
                }
            >
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Plan Baru
            </Button>
        </div>
    );
}

// Partners Logos Field
function PartnersLogosField({
    logos,
    onUpdate,
    errors,
    onBlur: _onBlur,
}: {
    logos: Array<{ image?: string | File; name?: string; link?: string }>;
    onUpdate: (logos: Array<{ image?: string | File; name?: string; link?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Logos</Label>
            {errors?.['logos'] && <FieldError message={errors['logos']} />}
            <div className="grid gap-3 md:grid-cols-2">
                {logos.map((logo, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-lg border bg-background p-3">
                        <div className="flex-1 space-y-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Logo
                                    <RequiredMark />
                                </Label>
                                <ImageUpload
                                    value={logo.image ?? null}
                                    onChange={(url) => {
                                        onUpdate(logos.map((l, i) => (i === idx ? { ...l, image: url ?? '' } : l)));
                                    }}
                                    label="Logo"
                                />
                                <FieldError message={errors?.[`logos.${idx}.image`]} />
                            </div>
                            <Input
                                value={logo.name ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onUpdate(logos.map((l, i) => (i === idx ? { ...l, name: value } : l)));
                                }}
                                placeholder="Nama Partner"
                            />
                            <Input
                                value={logo.link ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onUpdate(logos.map((l, i) => (i === idx ? { ...l, link: value } : l)));
                                }}
                                placeholder="https://partner.com"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => onUpdate(logos.filter((_, i) => i !== idx))}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...logos, { image: '', name: '', link: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Logo
            </Button>
        </div>
    );
}

// Counter Items Field
function CounterItemsField({
    items,
    onUpdate,
    errors,
    onBlur,
}: {
    items: Array<{ value?: string; suffix?: string; label?: string; icon?: string }>;
    onUpdate: (items: Array<{ value?: string; suffix?: string; label?: string; icon?: string }>) => void;
    errors?: Record<string, string>;
    onBlur?: (field: string) => void;
}) {
    return (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">Counter Items</Label>
            {errors?.['items'] && <FieldError message={errors['items']} />}
            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-lg border bg-background p-3">
                        <div className="w-40 shrink-0">
                            <Label className="mb-1 block text-[10px] text-muted-foreground">Icon</Label>
                            <IconPicker
                                value={item.icon ?? ''}
                                onChange={(val) => {
                                    onUpdate(items.map((it, i) => (i === idx ? { ...it, icon: val } : it)));
                                }}
                            />
                        </div>
                        <div className="grid flex-1 gap-2 md:grid-cols-3">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Nilai
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={item.value ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, value: e.target.value } : it)));
                                    }}
                                    onBlur={() => onBlur?.(`items.${idx}.value`)}
                                    className={errors?.[`items.${idx}.value`] ? 'border-red-500' : ''}
                                    placeholder="100"
                                />
                                <FieldError message={errors?.[`items.${idx}.value`]} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Suffix</Label>
                                <Input
                                    value={item.suffix ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, suffix: e.target.value } : it)));
                                    }}
                                    placeholder="+ / % / K"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Label
                                    <RequiredMark />
                                </Label>
                                <Input
                                    value={item.label ?? ''}
                                    onChange={(e) => {
                                        onUpdate(items.map((it, i) => (i === idx ? { ...it, label: e.target.value } : it)));
                                    }}
                                    onBlur={() => onBlur?.(`items.${idx}.label`)}
                                    className={errors?.[`items.${idx}.label`] ? 'border-red-500' : ''}
                                    placeholder="Happy Clients"
                                />
                                <FieldError message={errors?.[`items.${idx}.label`]} />
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mt-5 h-8 w-8 shrink-0"
                            onClick={() => onUpdate(items.filter((_, i) => i !== idx))}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => onUpdate([...items, { value: '', suffix: '+', label: '', icon: '' }])}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Counter
            </Button>
        </div>
    );
}
