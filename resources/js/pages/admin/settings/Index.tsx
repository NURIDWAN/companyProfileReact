import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";

type Setting = {
    id: number;
    key: string;
    value: unknown;
    group: string;
    updated_at: string;
};

interface Props {
    settings: Setting[];
}

export default function SettingsIndex({ settings }: Props) {
    return (
        <AppLayout>
            <Head title="Pengaturan Konten" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Setting Konten</h1>
                    <Button asChild>
                        <Link href={route("admin.settings.create")}>Tambah Setting</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Setting</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Key</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Group</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Value</th>
                                    <th className="px-4 py-2 text-left font-medium text-muted-foreground">Update</th>
                                    <th className="px-4 py-2" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {settings.map((setting) => (
                                    <tr key={setting.id}>
                                        <td className="px-4 py-2 font-medium">{setting.key}</td>
                                        <td className="px-4 py-2 text-muted-foreground">{setting.group}</td>
                                        <td className="px-4 py-2 text-muted-foreground">
                                            <pre className="max-w-md whitespace-pre-wrap break-all rounded bg-muted/60 p-2 text-xs">
                                                {formatValue(setting.value)}
                                            </pre>
                                        </td>
                                        <td className="px-4 py-2 text-muted-foreground">
                                            {new Date(setting.updated_at).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route("admin.settings.edit", setting.id)}>Edit</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function formatValue(value: unknown) {
    if (typeof value === "string") {
        return value;
    }

    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value ?? "");
    }
}
