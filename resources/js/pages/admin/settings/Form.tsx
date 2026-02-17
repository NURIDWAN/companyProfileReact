import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo } from 'react';

type Setting = {
    id: number;
    key: string;
    value: unknown;
    group: string;
};

interface Props {
    setting?: Setting;
}

export default function SettingForm({ setting }: Props) {
    const title = setting ? 'Edit Setting' : 'Tambah Setting';
    const form = useForm({
        key: setting?.key ?? '',
        value: stringifyValue(setting?.value),
        group: setting?.group ?? 'general',
    });

    const { data, setData, processing, errors } = form;
    const generalError = (errors as typeof errors & { general?: string }).general;

    const action = useMemo(() => {
        return setting ? route('admin.settings.update', setting.id) : route('admin.settings.store');
    }, [setting]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
        };

        form.transform((current) => ({
            ...current,
            value: parseValue(current.value as string),
        }));

        if (setting) {
            form.put(action, options);
        } else {
            form.post(action, options);
        }
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="p-4">
                <div className="mb-4">
                    <Link href={route('admin.settings.index')} className="text-sm text-muted-foreground hover:text-foreground">
                        &larr; Kembali ke daftar setting
                    </Link>
                </div>
                <form onSubmit={submit}>
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
                                <Label htmlFor="key">Key</Label>
                                <Input id="key" value={data.key} onChange={(event) => setData('key', event.target.value)} required />
                                {errors.key && <p className="text-xs text-rose-500">{errors.key}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="group">Group</Label>
                                <Input id="group" value={data.group} onChange={(event) => setData('group', event.target.value)} />
                                {errors.group && <p className="text-xs text-rose-500">{errors.group}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="value">Value (JSON atau teks)</Label>
                                <Textarea
                                    id="value"
                                    className="min-h-[180px]"
                                    value={data.value}
                                    onChange={(event) => setData('value', event.target.value)}
                                />
                                {errors.value && <p className="text-xs text-rose-500">{errors.value}</p>}
                                <p className="text-xs text-muted-foreground">
                                    Masukkan teks biasa atau JSON valid (misal: {`{"title": "Tentang Kami"}`})
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                {setting ? 'Simpan Perubahan' : 'Simpan'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}

function stringifyValue(value: unknown) {
    if (value === null || value === undefined) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    return JSON.stringify(value, null, 2);
}

function parseValue(value: string) {
    if (!value.trim()) {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}
