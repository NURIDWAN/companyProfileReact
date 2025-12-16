import sanitizeHtml from 'sanitize-html';

const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: [
        'p',
        'span',
        'h1',
        'h2',
        'h3',
        'h4',
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
        'hr',
        'a',
        'img',
        'figure',
        'figcaption',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
    ],
    allowedAttributes: {
        '*': ['style', 'class'],
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
        code: ['class'],
        th: ['colspan', 'rowspan'],
        td: ['colspan', 'rowspan'],
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
