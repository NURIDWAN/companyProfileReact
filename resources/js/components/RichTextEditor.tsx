import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

type RichTextEditorProps = {
    value?: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export function RichTextEditor({ value = '', onChange, placeholder, className }: RichTextEditorProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'my-4 rounded-xl shadow-sm',
                },
            }),
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class:
                    'tiptap prose prose-sm dark:prose-invert focus:outline-none min-h-[180px] text-sm text-foreground',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!editor) return;

        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
            const response = await fetch(route('admin.blog-posts.upload-image'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message ?? 'Gagal mengunggah gambar');
            }

            editor.chain().focus().setImage({ src: data.url }).run();
        } catch (error) {
            console.error(error);
            setUploadError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengunggah gambar.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    useEffect(() => {
        if (!editor) return;
        const current = editor.getHTML();
        if (!value && current !== '<p></p>') {
            editor.commands.setContent('');
        } else if (value && current !== value) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">Memuat editor…</div>;
    }

    return (
        <div className={`space-y-2 ${className ?? ''}`}>
            <div className="flex flex-wrap gap-2 rounded-md border border-input bg-muted/40 px-3 py-2">
                <button
                    type="button"
                    className={`rte-btn ${editor.isActive('bold') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </button>
                <button
                    type="button"
                    className={`rte-btn ${editor.isActive('italic') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </button>
                <button
                    type="button"
                    className={`rte-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    Bullet
                </button>
                <button
                    type="button"
                    className={`rte-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    Numbered
                </button>
                <button type="button" className="rte-btn" onClick={() => editor.chain().focus().clearContent().run()}>
                    Clear
                </button>
                <button
                    type="button"
                    className="rte-btn"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? 'Mengunggah…' : 'Tambah Gambar'}
                </button>
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            {uploadError ? <p className="text-xs text-rose-500">{uploadError}</p> : null}
            <div className="rounded-md border border-input bg-background">
                {placeholder ? <div className="px-3 pt-2 text-xs text-muted-foreground">{placeholder}</div> : null}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
