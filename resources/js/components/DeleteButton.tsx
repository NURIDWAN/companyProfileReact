import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useState } from 'react';

type DeleteButtonProps = {
    url: string;
    confirmMessage?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
};

export function DeleteButton({ url, confirmMessage = 'Yakin ingin menghapus data ini?', size = 'sm', className }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        if (loading) return;
        if (!window.confirm(confirmMessage)) {
            return;
        }

        router.delete(url, {
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    return (
        <Button variant="destructive" size={size} onClick={handleDelete} disabled={loading} className={className}>
            {loading ? 'Menghapus...' : 'Hapus'}
        </Button>
    );
}
