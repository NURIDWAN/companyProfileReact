import 'jodit/es2021/jodit.min.css';
import { useEffect, useMemo, useRef, useState } from 'react';

type JoditEditorType = typeof import('jodit-react')['default'];

type RichTextEditorProps = {
    value?: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export function RichTextEditor({ value = '', onChange, placeholder, className }: RichTextEditorProps) {
    const [JoditEditor, setJoditEditor] = useState<JoditEditorType | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (JoditEditor || typeof window === 'undefined') {
            return;
        }

        import('jodit-react')
            .then((mod) => setJoditEditor(() => mod.default))
            .catch((error) => {
                console.error('Gagal memuat Jodit Editor', error);
                setUploadError('Editor tidak dapat dimuat. Muat ulang halaman.');
            });
    }, [JoditEditor]);

    const csrfToken = useMemo(() => {
        if (typeof window === 'undefined') {
            return '';
        }

        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
    }, []);

    const config = useMemo(
        () => ({
            readonly: false,
            height: 420,
            toolbarAdaptive: false,
            toolbarSticky: false,
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            placeholder: placeholder ?? 'Tulis konten di sini...',
            buttons: [
                'source',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'ul',
                'ol',
                'indent',
                'outdent',
                '|',
                'font',
                'fontsize',
                'paragraph',
                'align',
                '|',
                'table',
                'link',
                'image',
                'hr',
                'blockquote',
                'eraser',
                'fullsize',
                'undo',
                'redo',
            ],
            uploader: {
                url: route('admin.blog-posts.upload-image'),
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
                withCredentials: false,
                process: (resp: any) => {
                    if (resp?.url) {
                        return { files: [resp.url] };
                    }
                    return resp;
                },
                isSuccess: (resp: any) => Boolean(resp?.url),
                defaultHandlerSuccess: (data: any) => {
                    if (data?.url && editorRef.current) {
                        editorRef.current?.s?.insertImage?.(data.url);
                        setUploadError(null);
                    }
                },
                defaultHandlerError: (error: any) => {
                    setUploadError(error?.message ?? 'Gagal mengunggah gambar.');
                },
            },
        }),
        [csrfToken, placeholder],
    );

    if (!JoditEditor || typeof window === 'undefined') {
        return (
            <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                Memuat editor…
            </div>
        );
    }

    return (
        <div className={`space-y-2 ${className ?? ''}`}>
            {uploadError ? <p className="text-xs text-rose-500">{uploadError}</p> : null}
            <div className="rounded-md border border-input bg-background">
                {placeholder ? <div className="px-3 pt-2 text-xs text-muted-foreground">{placeholder}</div> : null}
                <JoditEditor
                    ref={editorRef}
                    value={value || ''}
                    config={config}
                    onBlur={(content) => onChange(content)}
                    onChange={() => {}}
                />
            </div>
        </div>
    );
}
