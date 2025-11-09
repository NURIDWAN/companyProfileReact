import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import type { LanguageOption } from '@/types';

interface LocalizedField {
    [key: string]: string | null;
}

interface LocalizedList {
    [key: string]: string[];
}

interface HeroContent {
    heading?: LocalizedField;
    subheading?: LocalizedField;
    primary_label?: LocalizedField;
    primary_link?: LocalizedField;
    secondary_label?: LocalizedField;
    secondary_link?: LocalizedField;
    image?: string | null;
    image_url?: string | null;
}

interface AboutContent {
    title?: LocalizedField;
    description?: LocalizedField;
    highlights?: LocalizedList;
    image?: string | null;
    image_url?: string | null;
}

interface FinalCtaContent {
    heading?: LocalizedField;
    description?: LocalizedField;
    button_label?: LocalizedField;
    button_link?: LocalizedField;
}

interface MetricContent {
    value?: LocalizedField;
    label?: LocalizedField;
}

interface ProductCtaContact {
    icon?: string | null;
    title?: LocalizedField;
    detail?: LocalizedField;
}

interface ProductCtaContent {
    badge?: LocalizedField;
    heading?: LocalizedField;
    description?: LocalizedField;
    primary_label?: LocalizedField;
    primary_link?: LocalizedField;
    secondary_label?: LocalizedField;
    secondary_link?: LocalizedField;
    contacts?: ProductCtaContact[];
}

interface ProductStatsContent {
    labels?: {
        products?: LocalizedField;
        clients?: LocalizedField;
        rating?: LocalizedField;
        awards?: LocalizedField;
    };
    awards?: number | null;
}

interface NavigationOption {
    key: string;
    href: string;
    labels?: Record<string, string>;
    active?: boolean;
}

interface ServiceHeroContent {
    heading?: LocalizedField;
    subheading?: LocalizedField;
    highlight?: LocalizedField;
    primary_label?: LocalizedField;
    primary_link?: LocalizedField;
    secondary_label?: LocalizedField;
    secondary_link?: LocalizedField;
    background_image?: string | null;
    background_image_url?: string | null;
}

interface ServiceSectionCopy {
    badge?: LocalizedField;
    heading?: LocalizedField;
    description?: LocalizedField;
}

interface ServiceOfferingItem {
    title?: LocalizedField;
    description?: LocalizedField;
    icon?: string | null;
}

interface ServiceOfferingsContent extends ServiceSectionCopy {
    items?: ServiceOfferingItem[];
}

interface ServiceTechStackItem {
    name?: LocalizedField;
    logo?: string | null;
}

interface ServiceTechStackContent extends ServiceSectionCopy {
    items?: ServiceTechStackItem[];
}

interface ServiceProcessItem {
    step?: LocalizedField;
    title?: LocalizedField;
    description?: LocalizedField;
    icon?: string | null;
}

interface ServiceProcessContent extends ServiceSectionCopy {
    items?: ServiceProcessItem[];
}

interface ServiceAdvantageItem {
    title?: LocalizedField;
    description?: LocalizedField;
    icon?: string | null;
}

interface ServiceAdvantagesContent extends ServiceSectionCopy {
    items?: ServiceAdvantageItem[];
}

interface ServiceFaqItem {
    question?: LocalizedField;
    answer?: LocalizedField;
}

interface ServiceFaqContent extends ServiceSectionCopy {
    items?: ServiceFaqItem[];
}

interface LandingContentProps {
    hero: HeroContent;
    about: AboutContent;
    finalCta: FinalCtaContent;
    metrics: MetricContent[];
    productCta: ProductCtaContent;
    productStats: ProductStatsContent;
    productHero: ServiceSectionCopy;
    projectHero: ServiceSectionCopy;
    careerHero: ServiceSectionCopy;
    blogHero: ServiceSectionCopy;
    serviceHero: ServiceHeroContent;
    serviceSummary: ServiceSectionCopy;
    serviceOfferings: ServiceOfferingsContent;
    serviceTechStack: ServiceTechStackContent;
    serviceProcess: ServiceProcessContent;
    serviceAdvantages: ServiceAdvantagesContent;
    serviceFaqs: ServiceFaqContent;
    navigationOptions: NavigationOption[];
    languages: LanguageOption[];
    defaultLanguage: string;
    routes: {
        hero: string;
        about: string;
        finalCta: string;
        metrics: string;
        navigation: string;
        productCta: string;
        productStats: string;
        productHero: string;
        projectHero: string;
        careerHero: string;
        blogHero: string;
        serviceHero: string;
        serviceSummary: string;
        serviceOfferings: string;
        serviceTechStack: string;
        serviceProcess: string;
        serviceAdvantages: string;
        serviceFaqs: string;
    };
}

const FALLBACK_LANGUAGES: LanguageOption[] = [
    { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
    { code: 'en', label: 'EN', name: 'English' },
];

const normalizeLocalizedObject = (
    languages: LanguageOption[],
    value?: LocalizedField | string | null
): Record<string, string> => {
    return languages.reduce<Record<string, string>>((acc, lang) => {
        const raw = typeof value === 'string' ? value : value?.[lang.code];
        acc[lang.code] = raw ? String(raw) : '';
        return acc;
    }, {});
};

const normalizeLocalizedList = (
    languages: LanguageOption[],
    value?: LocalizedList | string[] | null
): Record<string, string> => {
    const isArray = Array.isArray(value);
    return languages.reduce<Record<string, string>>((acc, lang) => {
        const list = isArray
            ? (value as string[])
            : Array.isArray(value?.[lang.code])
                ? value?.[lang.code]
                : [];
        acc[lang.code] = (list ?? []).join('\n');
        return acc;
    }, {});
};

const normalizeMetricsTextarea = (
    languages: LanguageOption[],
    metrics: MetricContent[]
): Record<string, string> => {
    return languages.reduce<Record<string, string>>((acc, lang) => {
        const lines = metrics
            .map((metric) => {
                const value = metric.value?.[lang.code] ?? '';
                const label = metric.label?.[lang.code] ?? '';
                return `${value ?? ''}|${label ?? ''}`.trim();
            })
            .filter((line) => line !== '|');

        acc[lang.code] = lines.join('\n');
        return acc;
    }, {});
};

export default function LandingContentPage({
    hero,
    about,
    finalCta,
    metrics,
    productCta,
    productStats,
    productHero,
    projectHero,
    careerHero,
    blogHero,
    serviceHero,
    serviceSummary,
    serviceOfferings,
    serviceTechStack,
    serviceProcess,
    serviceAdvantages,
    serviceFaqs,
    navigationOptions,
    languages,
    defaultLanguage,
    routes,
}: LandingContentProps) {
    const languageOptions = languages.length ? languages : FALLBACK_LANGUAGES;
    const primaryLanguageOption =
        languageOptions.find((lang) => lang.code === defaultLanguage) ?? languageOptions[0] ?? FALLBACK_LANGUAGES[0];
    const displayLanguages = primaryLanguageOption ? [primaryLanguageOption] : [languageOptions[0] ?? FALLBACK_LANGUAGES[0]];
    const blankLocalizedObject = () => normalizeLocalizedObject(languageOptions, null);
    const contactIconOptions = [
        { value: 'phone', label: 'Telepon' },
        { value: 'mail', label: 'Email' },
        { value: 'clock', label: 'Jam Kerja' },
    ];
    const serviceIconOptions = [
        { value: 'Layers', label: 'Lapisan' },
        { value: 'Smartphone', label: 'Smartphone' },
        { value: 'Paintbrush', label: 'Desain' },
        { value: 'Cloud', label: 'Cloud' },
        { value: 'Code', label: 'Kode' },
        { value: 'LayoutTemplate', label: 'Templating' },
        { value: 'LifeBuoy', label: 'Bantuan' },
        { value: 'Rocket', label: 'Roket' },
        { value: 'Search', label: 'Analisis' },
        { value: 'Shield', label: 'Keamanan' },
        { value: 'Users', label: 'Kolaborasi' },
    ];

    const heroForm = useForm({
        heading: normalizeLocalizedObject(languageOptions, hero.heading),
        subheading: normalizeLocalizedObject(languageOptions, hero.subheading),
        primary_label: normalizeLocalizedObject(languageOptions, hero.primary_label),
        primary_link: normalizeLocalizedObject(languageOptions, hero.primary_link),
        secondary_label: normalizeLocalizedObject(languageOptions, hero.secondary_label),
        secondary_link: normalizeLocalizedObject(languageOptions, hero.secondary_link),
        image: null as File | null,
    });

    const aboutForm = useForm({
        title: normalizeLocalizedObject(languageOptions, about.title),
        description: normalizeLocalizedObject(languageOptions, about.description),
        highlights: normalizeLocalizedList(languageOptions, about.highlights),
        image: null as File | null,
    });

    const ctaForm = useForm({
        heading: normalizeLocalizedObject(languageOptions, finalCta.heading),
        description: normalizeLocalizedObject(languageOptions, finalCta.description),
        button_label: normalizeLocalizedObject(languageOptions, finalCta.button_label),
        button_link: normalizeLocalizedObject(languageOptions, finalCta.button_link),
    });

    const metricsForm = useForm({
        metrics: normalizeMetricsTextarea(languageOptions, metrics),
    });

    const productCtaForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, productCta.badge),
        heading: normalizeLocalizedObject(languageOptions, productCta.heading),
        description: normalizeLocalizedObject(languageOptions, productCta.description),
        primary_label: normalizeLocalizedObject(languageOptions, productCta.primary_label),
        primary_link: normalizeLocalizedObject(languageOptions, productCta.primary_link),
        secondary_label: normalizeLocalizedObject(languageOptions, productCta.secondary_label),
        secondary_link: normalizeLocalizedObject(languageOptions, productCta.secondary_link),
        contacts:
            productCta.contacts && productCta.contacts.length > 0
                ? productCta.contacts.map((contact) => ({
                      icon: contact.icon ?? 'phone',
                      title: normalizeLocalizedObject(languageOptions, contact.title),
                      detail: normalizeLocalizedObject(languageOptions, contact.detail),
                  }))
                : [
                      {
                          icon: 'phone',
                          title: blankLocalizedObject(),
                          detail: blankLocalizedObject(),
                      },
                  ],
    });

    const productStatsLabels = productStats.labels ?? {};
    const productStatsForm = useForm({
        labels: {
            products: normalizeLocalizedObject(languageOptions, productStatsLabels.products),
            clients: normalizeLocalizedObject(languageOptions, productStatsLabels.clients),
            rating: normalizeLocalizedObject(languageOptions, productStatsLabels.rating),
            awards: normalizeLocalizedObject(languageOptions, productStatsLabels.awards),
        },
        awards:
            productStats.awards === null || productStats.awards === undefined
                ? ''
                : String(productStats.awards),
    });

    const productHeroForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, productHero.badge),
        heading: normalizeLocalizedObject(languageOptions, productHero.heading),
        description: normalizeLocalizedObject(languageOptions, productHero.description),
    });

    const projectHeroForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, projectHero.badge),
        heading: normalizeLocalizedObject(languageOptions, projectHero.heading),
        description: normalizeLocalizedObject(languageOptions, projectHero.description),
    });

    const careerHeroForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, careerHero.badge),
        heading: normalizeLocalizedObject(languageOptions, careerHero.heading),
        description: normalizeLocalizedObject(languageOptions, careerHero.description),
    });

    const blogHeroForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, blogHero.badge),
        heading: normalizeLocalizedObject(languageOptions, blogHero.heading),
        description: normalizeLocalizedObject(languageOptions, blogHero.description),
    });

    const serviceHeroForm = useForm({
        heading: normalizeLocalizedObject(languageOptions, serviceHero.heading),
        subheading: normalizeLocalizedObject(languageOptions, serviceHero.subheading),
        highlight: normalizeLocalizedObject(languageOptions, serviceHero.highlight),
        primary_label: normalizeLocalizedObject(languageOptions, serviceHero.primary_label),
        primary_link: normalizeLocalizedObject(languageOptions, serviceHero.primary_link),
        secondary_label: normalizeLocalizedObject(languageOptions, serviceHero.secondary_label),
        secondary_link: normalizeLocalizedObject(languageOptions, serviceHero.secondary_link),
        background_image: null as File | null,
    });

    const serviceSummaryForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, serviceSummary.badge),
        heading: normalizeLocalizedObject(languageOptions, serviceSummary.heading),
        description: normalizeLocalizedObject(languageOptions, serviceSummary.description),
    });

    const serviceOfferingsForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, serviceOfferings.badge),
        heading: normalizeLocalizedObject(languageOptions, serviceOfferings.heading),
        description: normalizeLocalizedObject(languageOptions, serviceOfferings.description),
        items:
            serviceOfferings.items && serviceOfferings.items.length > 0
                ? serviceOfferings.items.map((item) => ({
                      title: normalizeLocalizedObject(languageOptions, item.title),
                      description: normalizeLocalizedObject(languageOptions, item.description),
                      icon: item.icon ?? '',
                  }))
                : [
                      {
                          title: blankLocalizedObject(),
                          description: blankLocalizedObject(),
                          icon: '',
                      },
                  ],
    });

    const serviceTechStackForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, serviceTechStack.badge),
        heading: normalizeLocalizedObject(languageOptions, serviceTechStack.heading),
        description: normalizeLocalizedObject(languageOptions, serviceTechStack.description),
        items:
            serviceTechStack.items && serviceTechStack.items.length > 0
                ? serviceTechStack.items.map((item) => ({
                      name: normalizeLocalizedObject(languageOptions, item.name),
                      logo: item.logo ?? '',
                  }))
                : [
                      {
                          name: blankLocalizedObject(),
                          logo: '',
                      },
                  ],
    });

    const serviceProcessForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, serviceProcess.badge),
        heading: normalizeLocalizedObject(languageOptions, serviceProcess.heading),
        description: normalizeLocalizedObject(languageOptions, serviceProcess.description),
        items:
            serviceProcess.items && serviceProcess.items.length > 0
                ? serviceProcess.items.map((item) => ({
                      step: normalizeLocalizedObject(languageOptions, item.step),
                      title: normalizeLocalizedObject(languageOptions, item.title),
                      description: normalizeLocalizedObject(languageOptions, item.description),
                      icon: item.icon ?? '',
                  }))
                : [
                      {
                          step: blankLocalizedObject(),
                          title: blankLocalizedObject(),
                          description: blankLocalizedObject(),
                          icon: '',
                      },
                  ],
    });

    const serviceAdvantagesForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, serviceAdvantages.badge),
        heading: normalizeLocalizedObject(languageOptions, serviceAdvantages.heading),
        description: normalizeLocalizedObject(languageOptions, serviceAdvantages.description),
        items:
            serviceAdvantages.items && serviceAdvantages.items.length > 0
                ? serviceAdvantages.items.map((item) => ({
                      title: normalizeLocalizedObject(languageOptions, item.title),
                      description: normalizeLocalizedObject(languageOptions, item.description),
                      icon: item.icon ?? '',
                  }))
                : [
                      {
                          title: blankLocalizedObject(),
                          description: blankLocalizedObject(),
                          icon: '',
                      },
                  ],
    });

    const serviceFaqForm = useForm({
        badge: normalizeLocalizedObject(languageOptions, serviceFaqs.badge),
        heading: normalizeLocalizedObject(languageOptions, serviceFaqs.heading),
        description: normalizeLocalizedObject(languageOptions, serviceFaqs.description),
        items:
            serviceFaqs.items && serviceFaqs.items.length > 0
                ? serviceFaqs.items.map((item) => ({
                      question: normalizeLocalizedObject(languageOptions, item.question),
                      answer: normalizeLocalizedObject(languageOptions, item.answer),
                  }))
                : [
                      {
                          question: blankLocalizedObject(),
                          answer: blankLocalizedObject(),
                      },
                  ],
    });

    const navigationForm = useForm({
        active_keys: navigationOptions.filter((option) => option.active !== false).map((option) => option.key),
    });

    const submitHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        heroForm.post(route(routes.hero), {
            forceFormData: true,
        });
    };

    const submitAbout: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        aboutForm.post(route(routes.about), {
            forceFormData: true,
        });
    };

    const submitCta: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        ctaForm.post(route(routes.finalCta));
    };

    const submitMetrics: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        metricsForm.post(route(routes.metrics));
    };

    const submitProductCta: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        productCtaForm.post(route(routes.productCta), {
            preserveScroll: true,
        });
    };

    const submitProductStats: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        productStatsForm.post(route(routes.productStats), {
            preserveScroll: true,
        });
    };

    const submitProductHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        productHeroForm.post(route(routes.productHero), {
            preserveScroll: true,
        });
    };

    const submitProjectHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        projectHeroForm.post(route(routes.projectHero), {
            preserveScroll: true,
        });
    };

    const submitCareerHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        careerHeroForm.post(route(routes.careerHero), {
            preserveScroll: true,
        });
    };

    const submitBlogHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        blogHeroForm.post(route(routes.blogHero), {
            preserveScroll: true,
        });
    };

    const submitServiceHero: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceHeroForm.post(route(routes.serviceHero), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const submitServiceSummary: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceSummaryForm.post(route(routes.serviceSummary), {
            preserveScroll: true,
        });
    };

    const submitServiceOfferings: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceOfferingsForm.post(route(routes.serviceOfferings), {
            preserveScroll: true,
        });
    };

    const submitServiceTechStack: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceTechStackForm.post(route(routes.serviceTechStack), {
            preserveScroll: true,
        });
    };

    const submitServiceProcess: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceProcessForm.post(route(routes.serviceProcess), {
            preserveScroll: true,
        });
    };

    const submitServiceAdvantages: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceAdvantagesForm.post(route(routes.serviceAdvantages), {
            preserveScroll: true,
        });
    };

    const submitServiceFaqs: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        serviceFaqForm.post(route(routes.serviceFaqs), {
            preserveScroll: true,
        });
    };

    const submitNavigation: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        navigationForm.post(route(routes.navigation), {
            preserveScroll: true,
        });
    };

    const toggleNavigationKey = (key: string, checked: boolean) => {
        if (checked) {
            navigationForm.setData('active_keys', Array.from(new Set([...navigationForm.data.active_keys, key])));
        } else {
            navigationForm.setData('active_keys', navigationForm.data.active_keys.filter((existingKey) => existingKey !== key));
        }
    };

    const updateProductCtaContact = (index: number, field: 'title' | 'detail', lang: string, value: string) => {
        const contacts = productCtaForm.data.contacts.map((contact, contactIndex) => {
            if (contactIndex !== index) {
                return contact;
            }

            const localized =
                typeof contact[field] === 'object' && contact[field] !== null
                    ? contact[field] ?? {}
                    : blankLocalizedObject();

            return {
                ...contact,
                [field]: {
                    ...localized,
                    [lang]: value,
                },
            };
        });

        productCtaForm.setData('contacts', contacts);
    };

    const updateProductCtaContactIcon = (index: number, icon: string) => {
        const contacts = productCtaForm.data.contacts.map((contact, contactIndex) =>
            contactIndex === index ? { ...contact, icon } : contact,
        );

        productCtaForm.setData('contacts', contacts);
    };

    const addProductCtaContact = () => {
        productCtaForm.setData('contacts', [
            ...productCtaForm.data.contacts,
            {
                icon: 'phone',
                title: blankLocalizedObject(),
                detail: blankLocalizedObject(),
            },
        ]);
    };

    const removeProductCtaContact = (index: number) => {
        if (productCtaForm.data.contacts.length <= 1) {
            return;
        }

        productCtaForm.setData(
            'contacts',
            productCtaForm.data.contacts.filter((_, contactIndex) => contactIndex !== index),
        );
    };

    type ProductStatsLabelKey = keyof typeof productStatsForm.data.labels;

    const updateProductStatsLabel = (key: ProductStatsLabelKey, lang: string, value: string) => {
        const existing =
            productStatsForm.data.labels[key] ??
            blankLocalizedObject();

        productStatsForm.setData('labels', {
            ...productStatsForm.data.labels,
            [key]: {
                ...existing,
                [lang]: value,
            },
        });
    };

    const updateServiceOfferingItem = (
        index: number,
        field: 'title' | 'description',
        lang: string,
        value: string
    ) => {
        const nextItems = serviceOfferingsForm.data.items.map((item, itemIndex) => {
            if (itemIndex !== index) {
                return item;
            }

            const localized = item[field] ?? blankLocalizedObject();

            return {
                ...item,
                [field]: {
                    ...localized,
                    [lang]: value,
                },
            };
        });

        serviceOfferingsForm.setData('items', nextItems);
    };

    const updateServiceOfferingIcon = (index: number, icon: string) => {
        const nextItems = serviceOfferingsForm.data.items.map((item, itemIndex) =>
            itemIndex === index ? { ...item, icon } : item,
        );

        serviceOfferingsForm.setData('items', nextItems);
    };

    const addServiceOfferingItem = () => {
        serviceOfferingsForm.setData('items', [
            ...serviceOfferingsForm.data.items,
            {
                title: blankLocalizedObject(),
                description: blankLocalizedObject(),
                icon: '',
            },
        ]);
    };

    const removeServiceOfferingItem = (index: number) => {
        if (serviceOfferingsForm.data.items.length <= 1) {
            return;
        }

        serviceOfferingsForm.setData(
            'items',
            serviceOfferingsForm.data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateServiceTechStackName = (index: number, lang: string, value: string) => {
        const nextItems = serviceTechStackForm.data.items.map((item, itemIndex) => {
            if (itemIndex !== index) {
                return item;
            }

            const localized = item.name ?? blankLocalizedObject();

            return {
                ...item,
                name: {
                    ...localized,
                    [lang]: value,
                },
            };
        });

        serviceTechStackForm.setData('items', nextItems);
    };

    const updateServiceTechStackLogo = (index: number, logo: string) => {
        const nextItems = serviceTechStackForm.data.items.map((item, itemIndex) =>
            itemIndex === index ? { ...item, logo } : item,
        );

        serviceTechStackForm.setData('items', nextItems);
    };

    const addServiceTechStackItem = () => {
        serviceTechStackForm.setData('items', [
            ...serviceTechStackForm.data.items,
            {
                name: blankLocalizedObject(),
                logo: '',
            },
        ]);
    };

    const removeServiceTechStackItem = (index: number) => {
        if (serviceTechStackForm.data.items.length <= 1) {
            return;
        }

        serviceTechStackForm.setData(
            'items',
            serviceTechStackForm.data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateServiceProcessItem = (
        index: number,
        field: 'step' | 'title' | 'description',
        lang: string,
        value: string
    ) => {
        const nextItems = serviceProcessForm.data.items.map((item, itemIndex) => {
            if (itemIndex !== index) {
                return item;
            }

            const localized = item[field] ?? blankLocalizedObject();

            return {
                ...item,
                [field]: {
                    ...localized,
                    [lang]: value,
                },
            };
        });

        serviceProcessForm.setData('items', nextItems);
    };

    const updateServiceProcessIcon = (index: number, icon: string) => {
        const nextItems = serviceProcessForm.data.items.map((item, itemIndex) =>
            itemIndex === index ? { ...item, icon } : item,
        );

        serviceProcessForm.setData('items', nextItems);
    };

    const addServiceProcessItem = () => {
        serviceProcessForm.setData('items', [
            ...serviceProcessForm.data.items,
            {
                step: blankLocalizedObject(),
                title: blankLocalizedObject(),
                description: blankLocalizedObject(),
                icon: '',
            },
        ]);
    };

    const removeServiceProcessItem = (index: number) => {
        if (serviceProcessForm.data.items.length <= 1) {
            return;
        }

        serviceProcessForm.setData(
            'items',
            serviceProcessForm.data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateServiceAdvantageItem = (
        index: number,
        field: 'title' | 'description',
        lang: string,
        value: string
    ) => {
        const nextItems = serviceAdvantagesForm.data.items.map((item, itemIndex) => {
            if (itemIndex !== index) {
                return item;
            }

            const localized = item[field] ?? blankLocalizedObject();

            return {
                ...item,
                [field]: {
                    ...localized,
                    [lang]: value,
                },
            };
        });

        serviceAdvantagesForm.setData('items', nextItems);
    };

    const updateServiceAdvantageIcon = (index: number, icon: string) => {
        const nextItems = serviceAdvantagesForm.data.items.map((item, itemIndex) =>
            itemIndex === index ? { ...item, icon } : item,
        );

        serviceAdvantagesForm.setData('items', nextItems);
    };

    const addServiceAdvantageItem = () => {
        serviceAdvantagesForm.setData('items', [
            ...serviceAdvantagesForm.data.items,
            {
                title: blankLocalizedObject(),
                description: blankLocalizedObject(),
                icon: '',
            },
        ]);
    };

    const removeServiceAdvantageItem = (index: number) => {
        if (serviceAdvantagesForm.data.items.length <= 1) {
            return;
        }

        serviceAdvantagesForm.setData(
            'items',
            serviceAdvantagesForm.data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateServiceFaqItem = (
        index: number,
        field: 'question' | 'answer',
        lang: string,
        value: string
    ) => {
        const nextItems = serviceFaqForm.data.items.map((item, itemIndex) => {
            if (itemIndex !== index) {
                return item;
            }

            const localized = item[field] ?? blankLocalizedObject();

            return {
                ...item,
                [field]: {
                    ...localized,
                    [lang]: value,
                },
            };
        });

        serviceFaqForm.setData('items', nextItems);
    };

    const addServiceFaqItem = () => {
        serviceFaqForm.setData('items', [
            ...serviceFaqForm.data.items,
            {
                question: blankLocalizedObject(),
                answer: blankLocalizedObject(),
            },
        ]);
    };

    const removeServiceFaqItem = (index: number) => {
        if (serviceFaqForm.data.items.length <= 1) {
            return;
        }

        serviceFaqForm.setData(
            'items',
            serviceFaqForm.data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    return (
        <AppLayout>
            <div className="space-y-8 p-4">
                <form onSubmit={submitNavigation}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pilih Halaman Aktif</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Centang halaman yang ingin ditampilkan pada navigasi publik.
                            </p>
                            <div className="space-y-3">
                                {navigationOptions.map((option) => {
                                    const checked = navigationForm.data.active_keys.includes(option.key);
                                    const label = option.labels?.id ?? option.labels?.en ?? option.key;

                                    return (
                                        <div key={option.key} className="flex items-start space-x-3 rounded-lg border p-3">
                                            <Checkbox
                                                id={`nav-${option.key}`}
                                                checked={checked}
                                                onCheckedChange={(value) => toggleNavigationKey(option.key, value === true)}
                                            />
                                            <div className="space-y-1">
                                                <Label htmlFor={`nav-${option.key}`}>{label}</Label>
                                                <p className="text-xs text-muted-foreground">{option.href}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {navigationForm.errors.active_keys && (
                                <p className="text-xs text-rose-500">{navigationForm.errors.active_keys}</p>
                            )}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={navigationForm.processing}>
                                Simpan Navigasi
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitProductHero}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Halaman Produk</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Ubah badge, judul, dan deskripsi pengantar yang tampil di halaman produk.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`product-hero-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`product-hero-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`product-hero-badge-${lang.code}`}
                                            value={productHeroForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                productHeroForm.setData('badge', {
                                                    ...productHeroForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {productHeroForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {productHeroForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`product-hero-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`product-hero-heading-${lang.code}`}
                                            value={productHeroForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                productHeroForm.setData('heading', {
                                                    ...productHeroForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {productHeroForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {productHeroForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`product-hero-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`product-hero-description-${lang.code}`}
                                            value={productHeroForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                productHeroForm.setData('description', {
                                                    ...productHeroForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {productHeroForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {productHeroForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={productHeroForm.processing}>
                                Simpan Hero Produk
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitProjectHero}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Halaman Proyek</CardTitle>
                            <p className="text-sm text-muted-foreground">Kustomisasi hero section pada halaman portofolio proyek.</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`project-hero-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`project-hero-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`project-hero-badge-${lang.code}`}
                                            value={projectHeroForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                projectHeroForm.setData('badge', {
                                                    ...projectHeroForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {projectHeroForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {projectHeroForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`project-hero-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`project-hero-heading-${lang.code}`}
                                            value={projectHeroForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                projectHeroForm.setData('heading', {
                                                    ...projectHeroForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {projectHeroForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {projectHeroForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`project-hero-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`project-hero-description-${lang.code}`}
                                            value={projectHeroForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                projectHeroForm.setData('description', {
                                                    ...projectHeroForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {projectHeroForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {projectHeroForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={projectHeroForm.processing}>
                                Simpan Hero Proyek
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitCareerHero}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Halaman Karier</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Sesuaikan copy di bagian hero halaman karier/lamaran.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`career-hero-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`career-hero-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`career-hero-badge-${lang.code}`}
                                            value={careerHeroForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                careerHeroForm.setData('badge', {
                                                    ...careerHeroForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {careerHeroForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {careerHeroForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`career-hero-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`career-hero-heading-${lang.code}`}
                                            value={careerHeroForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                careerHeroForm.setData('heading', {
                                                    ...careerHeroForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {careerHeroForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {careerHeroForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`career-hero-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`career-hero-description-${lang.code}`}
                                            value={careerHeroForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                careerHeroForm.setData('description', {
                                                    ...careerHeroForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {careerHeroForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {careerHeroForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={careerHeroForm.processing}>
                                Simpan Hero Karier
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitBlogHero}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Halaman Blog</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Ubah badge, judul, dan deskripsi pengantar yang tampil di halaman blog/insight.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`blog-hero-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`blog-hero-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`blog-hero-badge-${lang.code}`}
                                            value={blogHeroForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                blogHeroForm.setData('badge', {
                                                    ...blogHeroForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {blogHeroForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{blogHeroForm.errors[`badge.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`blog-hero-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`blog-hero-heading-${lang.code}`}
                                            value={blogHeroForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                blogHeroForm.setData('heading', {
                                                    ...blogHeroForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {blogHeroForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{blogHeroForm.errors[`heading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`blog-hero-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`blog-hero-description-${lang.code}`}
                                            value={blogHeroForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                blogHeroForm.setData('description', {
                                                    ...blogHeroForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {blogHeroForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {blogHeroForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={blogHeroForm.processing}>
                                Simpan Hero Blog
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitHero} encType="multipart/form-data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {displayLanguages.map((lang) => (
                                <div key={`hero-heading-${lang.code}`} className="grid gap-4 border p-4 rounded-lg">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`hero-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`hero-heading-${lang.code}`}
                                            value={heroForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                heroForm.setData('heading', {
                                                    ...heroForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {heroForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{heroForm.errors[`heading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`hero-subheading-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`hero-subheading-${lang.code}`}
                                            value={heroForm.data.subheading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                heroForm.setData('subheading', {
                                                    ...heroForm.data.subheading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {heroForm.errors[`subheading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{heroForm.errors[`subheading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`hero-primary-label-${lang.code}`}>Label Tombol Utama</Label>
                                            <Input
                                                id={`hero-primary-label-${lang.code}`}
                                                value={heroForm.data.primary_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    heroForm.setData('primary_label', {
                                                        ...heroForm.data.primary_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {heroForm.errors[`primary_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">{heroForm.errors[`primary_label.${lang.code}`]}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`hero-primary-link-${lang.code}`}>Link Tombol Utama</Label>
                                            <Input
                                                id={`hero-primary-link-${lang.code}`}
                                                value={heroForm.data.primary_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    heroForm.setData('primary_link', {
                                                        ...heroForm.data.primary_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {heroForm.errors[`primary_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">{heroForm.errors[`primary_link.${lang.code}`]}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`hero-secondary-label-${lang.code}`}>Label Tombol Sekunder</Label>
                                            <Input
                                                id={`hero-secondary-label-${lang.code}`}
                                                value={heroForm.data.secondary_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    heroForm.setData('secondary_label', {
                                                        ...heroForm.data.secondary_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {heroForm.errors[`secondary_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">{heroForm.errors[`secondary_label.${lang.code}`]}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`hero-secondary-link-${lang.code}`}>Link Tombol Sekunder</Label>
                                            <Input
                                                id={`hero-secondary-link-${lang.code}`}
                                                value={heroForm.data.secondary_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    heroForm.setData('secondary_link', {
                                                        ...heroForm.data.secondary_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {heroForm.errors[`secondary_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">{heroForm.errors[`secondary_link.${lang.code}`]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="grid gap-2">
                                <Label htmlFor="hero-image">Gambar Hero</Label>
                                <Input
                                    id="hero-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => heroForm.setData('image', event.target.files?.[0] ?? null)}
                                />
                                {heroForm.errors.image && <p className="text-xs text-rose-500">{heroForm.errors.image}</p>}
                                {hero.image_url && (
                                    <img src={hero.image_url} alt="Hero" className="mt-2 h-32 w-auto rounded-md object-cover" />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={heroForm.processing}>
                                Simpan Hero
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitAbout} encType="multipart/form-data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Section Tentang Kami</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`about-${lang.code}`} className="rounded-lg border p-4 space-y-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`about-title-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`about-title-${lang.code}`}
                                            value={aboutForm.data.title[lang.code] ?? ''}
                                            onChange={(event) =>
                                                aboutForm.setData('title', {
                                                    ...aboutForm.data.title,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {aboutForm.errors[`title.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{aboutForm.errors[`title.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`about-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`about-description-${lang.code}`}
                                            value={aboutForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                aboutForm.setData('description', {
                                                    ...aboutForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {aboutForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{aboutForm.errors[`description.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`about-highlights-${lang.code}`}>
                                            Highlight ({lang.label}) - satu per baris
                                        </Label>
                                        <Textarea
                                            id={`about-highlights-${lang.code}`}
                                            value={aboutForm.data.highlights[lang.code] ?? ''}
                                            onChange={(event) =>
                                                aboutForm.setData('highlights', {
                                                    ...aboutForm.data.highlights,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {aboutForm.errors[`highlights.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{aboutForm.errors[`highlights.${lang.code}`]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="grid gap-2">
                                <Label htmlFor="about-image">Gambar</Label>
                                <Input
                                    id="about-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => aboutForm.setData('image', event.target.files?.[0] ?? null)}
                                />
                                {aboutForm.errors.image && <p className="text-xs text-rose-500">{aboutForm.errors.image}</p>}
                                {about.image_url && (
                                    <img src={about.image_url} alt="About" className="mt-2 h-32 w-auto rounded-md object-cover" />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={aboutForm.processing}>
                                Simpan Tentang Kami
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceHero} encType="multipart/form-data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Halaman Layanan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Sesuaikan headline, highlight, dan tombol pada halaman layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-hero-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-hero-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-hero-heading-${lang.code}`}
                                            value={serviceHeroForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceHeroForm.setData('heading', {
                                                    ...serviceHeroForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceHeroForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceHeroForm.errors[`heading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-hero-highlight-${lang.code}`}>Highlight</Label>
                                        <Input
                                            id={`service-hero-highlight-${lang.code}`}
                                            value={serviceHeroForm.data.highlight[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceHeroForm.setData('highlight', {
                                                    ...serviceHeroForm.data.highlight,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceHeroForm.errors[`highlight.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceHeroForm.errors[`highlight.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-hero-subheading-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-hero-subheading-${lang.code}`}
                                            value={serviceHeroForm.data.subheading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceHeroForm.setData('subheading', {
                                                    ...serviceHeroForm.data.subheading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceHeroForm.errors[`subheading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceHeroForm.errors[`subheading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`service-hero-primary-label-${lang.code}`}>Label Tombol Utama</Label>
                                            <Input
                                                id={`service-hero-primary-label-${lang.code}`}
                                                value={serviceHeroForm.data.primary_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    serviceHeroForm.setData('primary_label', {
                                                        ...serviceHeroForm.data.primary_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {serviceHeroForm.errors[`primary_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceHeroForm.errors[`primary_label.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`service-hero-primary-link-${lang.code}`}>Link Tombol Utama</Label>
                                            <Input
                                                id={`service-hero-primary-link-${lang.code}`}
                                                value={serviceHeroForm.data.primary_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    serviceHeroForm.setData('primary_link', {
                                                        ...serviceHeroForm.data.primary_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {serviceHeroForm.errors[`primary_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceHeroForm.errors[`primary_link.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`service-hero-secondary-label-${lang.code}`}>Label Tombol Sekunder</Label>
                                            <Input
                                                id={`service-hero-secondary-label-${lang.code}`}
                                                value={serviceHeroForm.data.secondary_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    serviceHeroForm.setData('secondary_label', {
                                                        ...serviceHeroForm.data.secondary_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {serviceHeroForm.errors[`secondary_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceHeroForm.errors[`secondary_label.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`service-hero-secondary-link-${lang.code}`}>Link Tombol Sekunder</Label>
                                            <Input
                                                id={`service-hero-secondary-link-${lang.code}`}
                                                value={serviceHeroForm.data.secondary_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    serviceHeroForm.setData('secondary_link', {
                                                        ...serviceHeroForm.data.secondary_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {serviceHeroForm.errors[`secondary_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceHeroForm.errors[`secondary_link.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="grid gap-2">
                                <Label htmlFor="service-hero-background">Gambar Latar Hero</Label>
                                <Input
                                    id="service-hero-background"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => serviceHeroForm.setData('background_image', event.target.files?.[0] ?? null)}
                                />
                                {serviceHeroForm.errors.background_image && (
                                    <p className="text-xs text-rose-500">{serviceHeroForm.errors.background_image}</p>
                                )}
                                {serviceHero.background_image_url && (
                                    <img
                                        src={serviceHero.background_image_url}
                                        alt="Hero Layanan"
                                        className="mt-2 h-32 w-full max-w-xl rounded-md object-cover"
                                    />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceHeroForm.processing}>
                                Simpan Hero Layanan
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceSummary}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan Halaman Layanan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Teks pengantar yang muncul di bagian awal daftar layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-summary-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-summary-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`service-summary-badge-${lang.code}`}
                                            value={serviceSummaryForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceSummaryForm.setData('badge', {
                                                    ...serviceSummaryForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceSummaryForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceSummaryForm.errors[`badge.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-summary-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-summary-heading-${lang.code}`}
                                            value={serviceSummaryForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceSummaryForm.setData('heading', {
                                                    ...serviceSummaryForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceSummaryForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceSummaryForm.errors[`heading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-summary-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-summary-description-${lang.code}`}
                                            value={serviceSummaryForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceSummaryForm.setData('description', {
                                                    ...serviceSummaryForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceSummaryForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceSummaryForm.errors[`description.${lang.code}`]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceSummaryForm.processing}>
                                Simpan Ringkasan Layanan
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceOfferings}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Highlight Layanan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Atur konten section &quot;Apa yang Kami Tawarkan&quot; beserta daftar highlight layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-offerings-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-offerings-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`service-offerings-badge-${lang.code}`}
                                            value={serviceOfferingsForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceOfferingsForm.setData('badge', {
                                                    ...serviceOfferingsForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceOfferingsForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceOfferingsForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-offerings-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-offerings-heading-${lang.code}`}
                                            value={serviceOfferingsForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceOfferingsForm.setData('heading', {
                                                    ...serviceOfferingsForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceOfferingsForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceOfferingsForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-offerings-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-offerings-description-${lang.code}`}
                                            value={serviceOfferingsForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceOfferingsForm.setData('description', {
                                                    ...serviceOfferingsForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceOfferingsForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceOfferingsForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4">
                                {serviceOfferingsForm.data.items.map((item, index) => (
                                    <div key={`service-offering-item-${index}`} className="space-y-4 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">Highlight #{index + 1}</p>
                                                <p className="text-xs text-muted-foreground">Konten highlight layanan.</p>
                                            </div>
                        \t                    <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeServiceOfferingItem(index)}
                                                disabled={serviceOfferingsForm.data.items.length <= 1}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                        <div className="grid gap-2 md:max-w-xs">
                                            <Label>Ikon</Label>
                                            <Select
                                                value={item.icon && item.icon !== '' ? item.icon : undefined}
                                                onValueChange={(value) => updateServiceOfferingIcon(index, value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih ikon" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {serviceIconOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {serviceOfferingsForm.errors[`items.${index}.icon`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceOfferingsForm.errors[`items.${index}.icon`]}
                                                </p>
                                            )}
                                        </div>
                                        {displayLanguages.map((lang) => (
                                            <div
                                                key={`service-offering-item-${index}-${lang.code}`}
                                                className="grid gap-4 md:grid-cols-2"
                                            >
                                                <div className="grid gap-2">
                                                    <Label>Judul ({lang.label})</Label>
                                                    <Input
                                                        value={item.title?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceOfferingItem(index, 'title', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceOfferingsForm.errors[`items.${index}.title.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceOfferingsForm.errors[`items.${index}.title.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Deskripsi ({lang.label})</Label>
                                                    <Textarea
                                                        value={item.description?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceOfferingItem(
                                                                index,
                                                                'description',
                                                                lang.code,
                                                                event.target.value,
                                                            )
                                                        }
                                                    />
                                                    {serviceOfferingsForm.errors[`items.${index}.description.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceOfferingsForm.errors[`items.${index}.description.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addServiceOfferingItem}>
                                    Tambah Highlight
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceOfferingsForm.processing}>
                                Simpan Highlight Layanan
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceTechStack}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Tech Stack Layanan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Tentukan teknologi yang ditampilkan pada halaman layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-tech-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-tech-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`service-tech-badge-${lang.code}`}
                                            value={serviceTechStackForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceTechStackForm.setData('badge', {
                                                    ...serviceTechStackForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceTechStackForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceTechStackForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-tech-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-tech-heading-${lang.code}`}
                                            value={serviceTechStackForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceTechStackForm.setData('heading', {
                                                    ...serviceTechStackForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceTechStackForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceTechStackForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-tech-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-tech-description-${lang.code}`}
                                            value={serviceTechStackForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceTechStackForm.setData('description', {
                                                    ...serviceTechStackForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceTechStackForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceTechStackForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4">
                                {serviceTechStackForm.data.items.map((item, index) => (
                                    <div key={`service-tech-item-${index}`} className="space-y-3 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">Teknologi #{index + 1}</p>
                                                <p className="text-xs text-muted-foreground">Nama teknologi dan logo opsional.</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeServiceTechStackItem(index)}
                                                disabled={serviceTechStackForm.data.items.length <= 1}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                        {displayLanguages.map((lang) => (
                                            <div key={`service-tech-item-${index}-${lang.code}`} className="grid gap-2">
                                                <Label>Nama ({lang.label})</Label>
                                                <Input
                                                    value={item.name?.[lang.code] ?? ''}
                                                    onChange={(event) =>
                                                        updateServiceTechStackName(index, lang.code, event.target.value)
                                                    }
                                                />
                                                {serviceTechStackForm.errors[`items.${index}.name.${lang.code}`] && (
                                                    <p className="text-xs text-rose-500">
                                                        {serviceTechStackForm.errors[`items.${index}.name.${lang.code}`]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                        <div className="grid gap-2 md:max-w-sm">
                                            <Label htmlFor={`service-tech-logo-${index}`}>Logo / URL Gambar</Label>
                                            <Input
                                                id={`service-tech-logo-${index}`}
                                                value={item.logo ?? ''}
                                                onChange={(event) => updateServiceTechStackLogo(index, event.target.value)}
                                            />
                                            {serviceTechStackForm.errors[`items.${index}.logo`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceTechStackForm.errors[`items.${index}.logo`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addServiceTechStackItem}>
                                    Tambah Teknologi
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceTechStackForm.processing}>
                                Simpan Tech Stack
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceProcess}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Proses Kerja</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Kelola tahapan proses kerja yang tampil pada halaman layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-process-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-process-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`service-process-badge-${lang.code}`}
                                            value={serviceProcessForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceProcessForm.setData('badge', {
                                                    ...serviceProcessForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceProcessForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceProcessForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-process-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-process-heading-${lang.code}`}
                                            value={serviceProcessForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceProcessForm.setData('heading', {
                                                    ...serviceProcessForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceProcessForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceProcessForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-process-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-process-description-${lang.code}`}
                                            value={serviceProcessForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceProcessForm.setData('description', {
                                                    ...serviceProcessForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceProcessForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceProcessForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4">
                                {serviceProcessForm.data.items.map((item, index) => (
                                    <div key={`service-process-item-${index}`} className="space-y-4 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">Tahap #{index + 1}</p>
                                                <p className="text-xs text-muted-foreground">Informasi langkah proses.</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeServiceProcessItem(index)}
                                                disabled={serviceProcessForm.data.items.length <= 1}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                        <div className="grid gap-2 md:max-w-xs">
                                            <Label>Ikon</Label>
                                            <Select
                                                value={item.icon && item.icon !== '' ? item.icon : undefined}
                                                onValueChange={(value) => updateServiceProcessIcon(index, value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih ikon" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {serviceIconOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {serviceProcessForm.errors[`items.${index}.icon`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceProcessForm.errors[`items.${index}.icon`]}
                                                </p>
                                            )}
                                        </div>
                                        {displayLanguages.map((lang) => (
                                            <div key={`service-process-item-${index}-${lang.code}`} className="grid gap-4 md:grid-cols-3">
                                                <div className="grid gap-2">
                                                    <Label>Langkah ({lang.label})</Label>
                                                    <Input
                                                        value={item.step?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceProcessItem(index, 'step', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceProcessForm.errors[`items.${index}.step.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceProcessForm.errors[`items.${index}.step.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2 md:col-span-1">
                                                    <Label>Judul ({lang.label})</Label>
                                                    <Input
                                                        value={item.title?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceProcessItem(index, 'title', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceProcessForm.errors[`items.${index}.title.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceProcessForm.errors[`items.${index}.title.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2 md:col-span-1">
                                                    <Label>Deskripsi ({lang.label})</Label>
                                                    <Textarea
                                                        value={item.description?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceProcessItem(index, 'description', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceProcessForm.errors[`items.${index}.description.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceProcessForm.errors[`items.${index}.description.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addServiceProcessItem}>
                                    Tambah Tahap
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceProcessForm.processing}>
                                Simpan Proses Layanan
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceAdvantages}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Keunggulan Layanan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Kelola konten section &quot;Mengapa Memilih Kami&quot; pada halaman layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-advantages-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-advantages-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`service-advantages-badge-${lang.code}`}
                                            value={serviceAdvantagesForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceAdvantagesForm.setData('badge', {
                                                    ...serviceAdvantagesForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceAdvantagesForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceAdvantagesForm.errors[`badge.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-advantages-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-advantages-heading-${lang.code}`}
                                            value={serviceAdvantagesForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceAdvantagesForm.setData('heading', {
                                                    ...serviceAdvantagesForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceAdvantagesForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceAdvantagesForm.errors[`heading.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-advantages-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-advantages-description-${lang.code}`}
                                            value={serviceAdvantagesForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceAdvantagesForm.setData('description', {
                                                    ...serviceAdvantagesForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceAdvantagesForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {serviceAdvantagesForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4">
                                {serviceAdvantagesForm.data.items.map((item, index) => (
                                    <div key={`service-advantage-item-${index}`} className="space-y-4 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">Keunggulan #{index + 1}</p>
                                                <p className="text-xs text-muted-foreground">Keunggulan utama yang ingin ditonjolkan.</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeServiceAdvantageItem(index)}
                                                disabled={serviceAdvantagesForm.data.items.length <= 1}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                        <div className="grid gap-2 md:max-w-xs">
                                            <Label>Ikon</Label>
                                            <Select
                                                value={item.icon && item.icon !== '' ? item.icon : undefined}
                                                onValueChange={(value) => updateServiceAdvantageIcon(index, value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih ikon" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {serviceIconOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {serviceAdvantagesForm.errors[`items.${index}.icon`] && (
                                                <p className="text-xs text-rose-500">
                                                    {serviceAdvantagesForm.errors[`items.${index}.icon`]}
                                                </p>
                                            )}
                                        </div>
                                        {displayLanguages.map((lang) => (
                                            <div
                                                key={`service-advantage-item-${index}-${lang.code}`}
                                                className="grid gap-4 md:grid-cols-2"
                                            >
                                                <div className="grid gap-2">
                                                    <Label>Judul ({lang.label})</Label>
                                                    <Input
                                                        value={item.title?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceAdvantageItem(index, 'title', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceAdvantagesForm.errors[`items.${index}.title.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceAdvantagesForm.errors[`items.${index}.title.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Deskripsi ({lang.label})</Label>
                                                    <Textarea
                                                        value={item.description?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceAdvantageItem(index, 'description', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceAdvantagesForm.errors[`items.${index}.description.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceAdvantagesForm.errors[`items.${index}.description.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addServiceAdvantageItem}>
                                    Tambah Keunggulan
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceAdvantagesForm.processing}>
                                Simpan Keunggulan
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitServiceFaqs}>
                    <Card>
                        <CardHeader>
                            <CardTitle>FAQ Layanan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Kelola daftar pertanyaan umum untuk halaman layanan.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`service-faq-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-faq-badge-${lang.code}`}>Badge</Label>
                                        <Input
                                            id={`service-faq-badge-${lang.code}`}
                                            value={serviceFaqForm.data.badge[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceFaqForm.setData('badge', {
                                                    ...serviceFaqForm.data.badge,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceFaqForm.errors[`badge.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceFaqForm.errors[`badge.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-faq-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`service-faq-heading-${lang.code}`}
                                            value={serviceFaqForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceFaqForm.setData('heading', {
                                                    ...serviceFaqForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceFaqForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceFaqForm.errors[`heading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`service-faq-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`service-faq-description-${lang.code}`}
                                            value={serviceFaqForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                serviceFaqForm.setData('description', {
                                                    ...serviceFaqForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {serviceFaqForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{serviceFaqForm.errors[`description.${lang.code}`]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4">
                                {serviceFaqForm.data.items.map((item, index) => (
                                    <div key={`service-faq-item-${index}`} className="space-y-4 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">FAQ #{index + 1}</p>
                                                <p className="text-xs text-muted-foreground">Pertanyaan dan jawaban singkat.</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeServiceFaqItem(index)}
                                                disabled={serviceFaqForm.data.items.length <= 1}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                        {displayLanguages.map((lang) => (
                                            <div key={`service-faq-item-${index}-${lang.code}`} className="space-y-2">
                                                <div className="grid gap-2">
                                                    <Label>Pertanyaan ({lang.label})</Label>
                                                    <Input
                                                        value={item.question?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceFaqItem(index, 'question', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceFaqForm.errors[`items.${index}.question.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceFaqForm.errors[`items.${index}.question.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Jawaban ({lang.label})</Label>
                                                    <Textarea
                                                        value={item.answer?.[lang.code] ?? ''}
                                                        onChange={(event) =>
                                                            updateServiceFaqItem(index, 'answer', lang.code, event.target.value)
                                                        }
                                                    />
                                                    {serviceFaqForm.errors[`items.${index}.answer.${lang.code}`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {serviceFaqForm.errors[`items.${index}.answer.${lang.code}`]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addServiceFaqItem}>
                                    Tambah FAQ
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={serviceFaqForm.processing}>
                                Simpan FAQ
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitCta}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Call to Action</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`cta-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`cta-heading-${lang.code}`}>Judul</Label>
                                        <Input
                                            id={`cta-heading-${lang.code}`}
                                            value={ctaForm.data.heading[lang.code] ?? ''}
                                            onChange={(event) =>
                                                ctaForm.setData('heading', {
                                                    ...ctaForm.data.heading,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {ctaForm.errors[`heading.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{ctaForm.errors[`heading.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`cta-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`cta-description-${lang.code}`}
                                            value={ctaForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                ctaForm.setData('description', {
                                                    ...ctaForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {ctaForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">{ctaForm.errors[`description.${lang.code}`]}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`cta-button-label-${lang.code}`}>Label Tombol</Label>
                                            <Input
                                                id={`cta-button-label-${lang.code}`}
                                                value={ctaForm.data.button_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    ctaForm.setData('button_label', {
                                                        ...ctaForm.data.button_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {ctaForm.errors[`button_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">{ctaForm.errors[`button_label.${lang.code}`]}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`cta-button-link-${lang.code}`}>Link Tombol</Label>
                                            <Input
                                                id={`cta-button-link-${lang.code}`}
                                                value={ctaForm.data.button_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    ctaForm.setData('button_link', {
                                                        ...ctaForm.data.button_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {ctaForm.errors[`button_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">{ctaForm.errors[`button_link.${lang.code}`]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={ctaForm.processing}>
                                Simpan CTA
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitProductCta}>
                    <Card>
                        <CardHeader>
                            <CardTitle>CTA Halaman Produk</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`product-cta-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>

                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`product-cta-badge-${lang.code}`}>Badge</Label>
                                            <Input
                                                id={`product-cta-badge-${lang.code}`}
                                                value={productCtaForm.data.badge[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    productCtaForm.setData('badge', {
                                                        ...productCtaForm.data.badge,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {productCtaForm.errors[`badge.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productCtaForm.errors[`badge.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`product-cta-heading-${lang.code}`}>Judul</Label>
                                            <Input
                                                id={`product-cta-heading-${lang.code}`}
                                                value={productCtaForm.data.heading[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    productCtaForm.setData('heading', {
                                                        ...productCtaForm.data.heading,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {productCtaForm.errors[`heading.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productCtaForm.errors[`heading.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`product-cta-description-${lang.code}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`product-cta-description-${lang.code}`}
                                            value={productCtaForm.data.description[lang.code] ?? ''}
                                            onChange={(event) =>
                                                productCtaForm.setData('description', {
                                                    ...productCtaForm.data.description,
                                                    [lang.code]: event.target.value,
                                                })
                                            }
                                        />
                                        {productCtaForm.errors[`description.${lang.code}`] && (
                                            <p className="text-xs text-rose-500">
                                                {productCtaForm.errors[`description.${lang.code}`]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`product-cta-primary-label-${lang.code}`}>Label tombol utama</Label>
                                            <Input
                                                id={`product-cta-primary-label-${lang.code}`}
                                                value={productCtaForm.data.primary_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    productCtaForm.setData('primary_label', {
                                                        ...productCtaForm.data.primary_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {productCtaForm.errors[`primary_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productCtaForm.errors[`primary_label.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`product-cta-primary-link-${lang.code}`}>Link tombol utama</Label>
                                            <Input
                                                id={`product-cta-primary-link-${lang.code}`}
                                                value={productCtaForm.data.primary_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    productCtaForm.setData('primary_link', {
                                                        ...productCtaForm.data.primary_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {productCtaForm.errors[`primary_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productCtaForm.errors[`primary_link.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`product-cta-secondary-label-${lang.code}`}>Label tombol sekunder</Label>
                                            <Input
                                                id={`product-cta-secondary-label-${lang.code}`}
                                                value={productCtaForm.data.secondary_label[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    productCtaForm.setData('secondary_label', {
                                                        ...productCtaForm.data.secondary_label,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {productCtaForm.errors[`secondary_label.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productCtaForm.errors[`secondary_label.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`product-cta-secondary-link-${lang.code}`}>Link tombol sekunder</Label>
                                            <Input
                                                id={`product-cta-secondary-link-${lang.code}`}
                                                value={productCtaForm.data.secondary_link[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    productCtaForm.setData('secondary_link', {
                                                        ...productCtaForm.data.secondary_link,
                                                        [lang.code]: event.target.value,
                                                    })
                                                }
                                            />
                                            {productCtaForm.errors[`secondary_link.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productCtaForm.errors[`secondary_link.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h4 className="text-sm font-semibold text-muted-foreground">Informasi kontak</h4>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addProductCtaContact}
                                    >
                                        Tambah kontak
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {productCtaForm.data.contacts.map((contact, index) => (
                                        <div key={`contact-${index}`} className="space-y-4 rounded-lg border p-4">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Label className="text-sm text-muted-foreground">Ikon</Label>
                                                    <Select
                                                        value={(contact.icon ?? 'phone') as string}
                                                        onValueChange={(value) =>
                                                            updateProductCtaContactIcon(index, value)
                                                        }
                                                    >
                                                        <SelectTrigger className="w-40">
                                                            <SelectValue placeholder="Pilih ikon" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {contactIconOptions.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {productCtaForm.errors[`contacts.${index}.icon`] && (
                                                        <p className="text-xs text-rose-500">
                                                            {productCtaForm.errors[`contacts.${index}.icon`]}
                                                        </p>
                                                    )}
                                                    {productCtaForm.data.contacts.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeProductCtaContact(index)}
                                                        >
                                                            Hapus
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            {displayLanguages.map((lang) => (
                                                <div key={`contact-${index}-${lang.code}`} className="grid gap-4 md:grid-cols-2">
                                                    <div className="grid gap-2">
                                                        <Label>Judul ({lang.label})</Label>
                                                        <Input
                                                            value={contact.title?.[lang.code] ?? ''}
                                                            onChange={(event) =>
                                                                updateProductCtaContact(
                                                                    index,
                                                                    'title',
                                                                    lang.code,
                                                                    event.target.value,
                                                                )
                                                            }
                                                        />
                                                        {productCtaForm.errors[`contacts.${index}.title.${lang.code}`] && (
                                                            <p className="text-xs text-rose-500">
                                                                {
                                                                    productCtaForm.errors[
                                                                        `contacts.${index}.title.${lang.code}`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Detail ({lang.label})</Label>
                                                        <Input
                                                            value={contact.detail?.[lang.code] ?? ''}
                                                            onChange={(event) =>
                                                                updateProductCtaContact(
                                                                    index,
                                                                    'detail',
                                                                    lang.code,
                                                                    event.target.value,
                                                                )
                                                            }
                                                        />
                                                        {productCtaForm.errors[`contacts.${index}.detail.${lang.code}`] && (
                                                            <p className="text-xs text-rose-500">
                                                                {
                                                                    productCtaForm.errors[
                                                                        `contacts.${index}.detail.${lang.code}`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={productCtaForm.processing}>
                                Simpan CTA Produk
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitMetrics}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistik Landing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Tulis satu statistik per baris dengan format <strong>nilai|deskripsi</strong>.
                            </p>
                            {displayLanguages.map((lang) => (
                                <div key={`metrics-${lang.code}`} className="grid gap-2">
                                    <Label htmlFor={`metrics-${lang.code}`}>
                                        Statistik ({lang.label})
                                    </Label>
                                    <Textarea
                                        id={`metrics-${lang.code}`}
                                        value={metricsForm.data.metrics[lang.code] ?? ''}
                                        onChange={(event) =>
                                            metricsForm.setData('metrics', {
                                                ...metricsForm.data.metrics,
                                                [lang.code]: event.target.value,
                                            })
                                        }
                                        rows={4}
                                    />
                                    {metricsForm.errors[`metrics.${lang.code}`] && (
                                        <p className="text-xs text-rose-500">{metricsForm.errors[`metrics.${lang.code}`]}</p>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={metricsForm.processing}>
                                Simpan Statistik
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                <form onSubmit={submitProductStats}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistik Halaman Produk</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {displayLanguages.map((lang) => (
                                <div key={`product-stats-${lang.code}`} className="grid gap-4 rounded-lg border p-4">
                                    <p className="text-sm font-medium text-muted-foreground">{lang.name}</p>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label>Label jumlah produk</Label>
                                            <Input
                                                value={productStatsForm.data.labels.products?.[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    updateProductStatsLabel('products', lang.code, event.target.value)
                                                }
                                            />
                                            {productStatsForm.errors[`labels.products.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productStatsForm.errors[`labels.products.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Label jumlah klien</Label>
                                            <Input
                                                value={productStatsForm.data.labels.clients?.[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    updateProductStatsLabel('clients', lang.code, event.target.value)
                                                }
                                            />
                                            {productStatsForm.errors[`labels.clients.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productStatsForm.errors[`labels.clients.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label>Label rating rata-rata</Label>
                                            <Input
                                                value={productStatsForm.data.labels.rating?.[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    updateProductStatsLabel('rating', lang.code, event.target.value)
                                                }
                                            />
                                            {productStatsForm.errors[`labels.rating.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productStatsForm.errors[`labels.rating.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Label penghargaan</Label>
                                            <Input
                                                value={productStatsForm.data.labels.awards?.[lang.code] ?? ''}
                                                onChange={(event) =>
                                                    updateProductStatsLabel('awards', lang.code, event.target.value)
                                                }
                                            />
                                            {productStatsForm.errors[`labels.awards.${lang.code}`] && (
                                                <p className="text-xs text-rose-500">
                                                    {productStatsForm.errors[`labels.awards.${lang.code}`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="grid gap-2">
                                <Label htmlFor="product-stats-awards">Jumlah penghargaan</Label>
                                <Input
                                    id="product-stats-awards"
                                    type="number"
                                    min={0}
                                    value={productStatsForm.data.awards}
                                    onChange={(event) => productStatsForm.setData('awards', event.target.value)}
                                />
                                {productStatsForm.errors.awards && (
                                    <p className="text-xs text-rose-500">{productStatsForm.errors.awards}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="submit" disabled={productStatsForm.processing}>
                                Simpan Statistik Produk
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
