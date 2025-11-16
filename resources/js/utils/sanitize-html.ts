import sanitizeHtml from 'sanitize-html';

const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: [
        'p',
        'span',
        'strong',
        'b',
        'em',
        'i',
        'u',
        'ul',
        'ol',
        'li',
        'br',
        'blockquote',
        'code',
        'pre',
        'a',
        'img',
        'figure',
        'figcaption',
    ],
    allowedAttributes: {
        '*': ['style', 'class'],
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
        code: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
        img: ['http', 'https', 'data'],
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }, true),
    },
};

export const sanitizeRichText = (value?: string | null): string => {
    if (!value) {
        return '';
    }

    return sanitizeHtml(value, sanitizeOptions);
};
