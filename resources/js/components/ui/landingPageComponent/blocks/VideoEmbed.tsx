import { useMemo } from 'react';

export type VideoEmbedContent = {
    heading?: string;
    description?: string;
    video_url?: string;
    aspect_ratio?: '16:9' | '4:3' | '1:1' | '21:9';
};

interface VideoEmbedProps {
    content: VideoEmbedContent;
}

function getEmbedUrl(url: string): string | null {
    if (!url) return null;

    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // Already an embed URL
    if (url.includes('embed') || url.includes('player')) {
        return url;
    }

    return null;
}

function getAspectRatioClass(ratio: string): string {
    switch (ratio) {
        case '4:3':
            return 'aspect-[4/3]';
        case '1:1':
            return 'aspect-square';
        case '21:9':
            return 'aspect-[21/9]';
        default:
            return 'aspect-video';
    }
}

export function VideoEmbed({ content }: VideoEmbedProps) {
    const { heading, description, video_url, aspect_ratio = '16:9' } = content;

    const embedUrl = useMemo(() => getEmbedUrl(video_url ?? ''), [video_url]);
    const aspectClass = getAspectRatioClass(aspect_ratio);

    return (
        <section className="py-12">
            <div className="mx-auto max-w-5xl px-4">
                {(heading || description) && (
                    <div className="mb-8 text-center">
                        {heading && <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{heading}</h2>}
                        {description && <div className="prose prose-lg prose-slate mt-2 dark:prose-invert" dangerouslySetInnerHTML={{ __html: description }} />}
                    </div>
                )}

                <div className={`relative w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg ${aspectClass}`}>
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={heading ?? 'Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <p className="text-slate-500">Video URL tidak valid atau belum diisi</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
