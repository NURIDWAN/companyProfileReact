import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type RichTextEditorProps = {
    value?: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export function RichTextEditor({ value = '', onChange, placeholder, className }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
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
            </div>
            <div className="rounded-md border border-input bg-background">
                {placeholder ? <div className="px-3 pt-2 text-xs text-muted-foreground">{placeholder}</div> : null}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
