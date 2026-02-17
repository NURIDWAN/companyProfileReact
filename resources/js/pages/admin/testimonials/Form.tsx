import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo } from 'react';

type Testimonial = {
    id: number;
    author_name: string;
    author_role?: string | null;
    company?: string | null;
    avatar?: string | null;
    avatar_url?: string | null;
    quote: string;
    rating?: number | null;
    is_active: boolean;
};

interface Props {
    testimonial?: Testimonial;
}

export default function TestimonialForm({ testimonial }: Props) {
    const title = testimonial ? 'Edit Testimoni' : 'Tambah Testimoni';
    const form = useForm({
        author_name: testimonial?.author_name ?? '',
        author_role: testimonial?.author_role ?? '',
        company: testimonial?.company ?? '',
        avatar: testimonial?.avatar ?? '',
        avatar_file: undefined as File | undefined,
        quote: testimonial?.quote ?? '',
        rating: testimonial?.rating ?? 5,
        is_active: testimonial?.is_active ?? true,
    });

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return testimonial ? route('admin.testimonials.update', testimonial.id) : route('admin.testimonials.store');
    }, [testimonial]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        form.transform((formData) => {
            const transformed = {
                ...formData,
                avatar_file: formData.avatar_file ?? undefined,
            };

            return testimonial ? { ...transformed, _method: 'put' } : transformed;
        });

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => {
                setData('avatar_file', undefined);
                form.transform((data) => data);
            },
        });
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="p-4">
                <div className="mb-4">
                    <Link href={route('admin.testimonials.index')} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar testimoni
                    </Link>
                </div>
                <form onSubmit={submit} encType="multipart/form-data">
                    <Card>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {generalError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{generalError}</AlertDescription>
                                </Alert>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="author_name">Nama</Label>
                                <Input
                                    id="author_name"
                                    value={data.author_name}
                                    onChange={(event) => setData('author_name', event.target.value)}
                                    required
                                />
                                {errors.author_name && <p className="text-xs text-rose-500">{errors.author_name}</p>}
                            </div>
                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="author_role">Jabatan</Label>
                                    <Input
                                        id="author_role"
                                        value={data.author_role ?? ''}
                                        onChange={(event) => setData('author_role', event.target.value)}
                                    />
                                    {errors.author_role && <p className="text-xs text-rose-500">{errors.author_role}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company">Perusahaan</Label>
                                    <Input id="company" value={data.company ?? ''} onChange={(event) => setData('company', event.target.value)} />
                                    {errors.company && <p className="text-xs text-rose-500">{errors.company}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="avatar_file">Foto Testimoni</Label>
                                <Input
                                    id="avatar_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setData('avatar_file', event.target.files?.[0])}
                                />
                                {errors.avatar_file && <p className="text-xs text-rose-500">{errors.avatar_file}</p>}
                                {testimonial?.avatar_url && data.avatar !== '' && (
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={testimonial.avatar_url}
                                            alt={testimonial.author_name}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setData('avatar', '');
                                                setData('avatar_file', undefined);
                                            }}
                                        >
                                            Hapus Foto
                                        </Button>
                                    </div>
                                )}
                                {errors.avatar && <p className="text-xs text-rose-500">{errors.avatar}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quote">Testimoni</Label>
                                <Textarea id="quote" value={data.quote} onChange={(event) => setData('quote', event.target.value)} required />
                                {errors.quote && <p className="text-xs text-rose-500">{errors.quote}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating (1-5)</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={data.rating ?? 5}
                                    onChange={(event) => setData('rating', Number(event.target.value))}
                                />
                                {errors.rating && <p className="text-xs text-rose-500">{errors.rating}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox checked={data.is_active} onCheckedChange={(checked) => setData('is_active', Boolean(checked))} />
                                <span>Aktif</span>
                            </div>
                            {errors.is_active && <p className="text-xs text-rose-500">{errors.is_active}</p>}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                {testimonial ? 'Simpan Perubahan' : 'Simpan'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
