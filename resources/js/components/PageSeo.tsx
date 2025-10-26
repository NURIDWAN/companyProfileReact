import { Head, usePage } from '@inertiajs/react';
import type { SeoMeta, SharedData } from '@/types';

export function PageSeo() {
    const { seo, name } = usePage<SharedData>().props;

    if (!seo) {
        return null;
    }

    const title = seo.title ?? name ?? 'Nusantara Digital Solution';
    const description = seo.description ?? '';
    const keywords = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords ?? '';
    const image = seo.image ?? null;

    return (
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={image} />}
        </Head>
    );
}
