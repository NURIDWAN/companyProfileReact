import type { LucideIcon } from 'lucide-react';
import {
    Activity,
    CircuitBoard,
    Cloud,
    Code,
    Handshake,
    Layers,
    LayoutTemplate,
    Leaf,
    LifeBuoy,
    LineChart,
    Package,
    Paintbrush,
    Rocket,
    Search,
    Shield,
    Smartphone,
    Sparkles,
    Trophy,
    Users,
    Workflow,
} from 'lucide-react';

export type ServiceIconOption = {
    value: string;
    label: string;
    icon: LucideIcon;
};

export const serviceIconOptions: ServiceIconOption[] = [
    { value: 'Activity', label: 'Activity – Transformasi', icon: Activity },
    { value: 'CircuitBoard', label: 'Circuit Board – Teknologi', icon: CircuitBoard },
    { value: 'Cloud', label: 'Cloud – Digital Services', icon: Cloud },
    { value: 'Code', label: 'Code – Implementasi TI', icon: Code },
    { value: 'Handshake', label: 'Handshake – Kemitraan', icon: Handshake },
    { value: 'LayoutTemplate', label: 'Layout Template – Desain Sistem', icon: LayoutTemplate },
    { value: 'Layers', label: 'Layers – Strategi', icon: Layers },
    { value: 'Leaf', label: 'Leaf – Keberlanjutan', icon: Leaf },
    { value: 'LifeBuoy', label: 'Life Buoy – Support', icon: LifeBuoy },
    { value: 'LineChart', label: 'Line Chart – Analitik', icon: LineChart },
    { value: 'Package', label: 'Package – Operasional', icon: Package },
    { value: 'Paintbrush', label: 'Paintbrush – Desain', icon: Paintbrush },
    { value: 'Rocket', label: 'Rocket – Scale Up', icon: Rocket },
    { value: 'Search', label: 'Search – Diagnosa', icon: Search },
    { value: 'Shield', label: 'Shield – Compliance', icon: Shield },
    { value: 'Smartphone', label: 'Smartphone – Mobile', icon: Smartphone },
    { value: 'Sparkles', label: 'Sparkles – Inovasi', icon: Sparkles },
    { value: 'Trophy', label: 'Trophy – Prestasi', icon: Trophy },
    { value: 'Users', label: 'Users – Kolaborasi', icon: Users },
    { value: 'Workflow', label: 'Workflow – Proses', icon: Workflow },
];

export const serviceIconRegistry: Record<string, LucideIcon> = serviceIconOptions.reduce(
    (acc, option) => {
        acc[option.value] = option.icon;
        return acc;
    },
    {} as Record<string, LucideIcon>,
);

export const defaultServiceIcon = Layers;
