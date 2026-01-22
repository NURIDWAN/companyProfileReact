export type PartnersSectionContent = {
    heading?: string;
    description?: string;
    columns?: number;
    logos?: Array<{
        image?: string;
        name?: string;
        link?: string;
    }>;
};

interface PartnersSectionProps {
    content: PartnersSectionContent;
}

export function PartnersSection({ content }: PartnersSectionProps) {
    const { heading, description, columns = 5, logos = [] } = content;

    if (logos.length === 0) {
        return (
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30">
                    <p className="text-muted-foreground">Belum ada logo partner</p>
                </div>
            </section>
        );
    }

    const gridCols = {
        3: 'grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-4',
        5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
        6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
    }[columns] ?? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5';

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-900/30">
            <div className="mx-auto max-w-6xl px-4">
                {(heading || description) && (
                    <div className="mb-10 text-center">
                        {heading && <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{heading}</h2>}
                        {description && <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>}
                    </div>
                )}

                <div className={`grid ${gridCols} items-center justify-items-center gap-8`}>
                    {logos.map((logo, idx) => {
                        const LogoImage = (
                            <div className="flex h-16 w-full items-center justify-center grayscale transition-all hover:grayscale-0">
                                {logo.image ? (
                                    <img
                                        src={logo.image}
                                        alt={logo.name || `Partner ${idx + 1}`}
                                        className="max-h-12 max-w-[140px] object-contain"
                                    />
                                ) : (
                                    <div className="flex h-12 w-24 items-center justify-center rounded bg-slate-200 text-xs text-slate-500">
                                        {logo.name || 'Logo'}
                                    </div>
                                )}
                            </div>
                        );

                        return logo.link ? (
                            <a
                                key={idx}
                                href={logo.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={logo.name}
                                className="block"
                            >
                                {LogoImage}
                            </a>
                        ) : (
                            <div key={idx} title={logo.name}>
                                {LogoImage}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
