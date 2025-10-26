import { cn } from "@/lib/utils";

type TooltipPayload = {
    color?: string;
    name?: string;
    value?: number | string;
};

export interface ChartTooltipProps {
    active?: boolean;
    label?: string | number;
    payload?: TooltipPayload[];
    className?: string;
}

export function ChartTooltipContent({ active, payload, label, className }: ChartTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div
            className={cn(
                "rounded-lg border bg-popover/80 p-3 text-xs shadow-lg backdrop-blur supports-[backdrop-filter]:bg-popover/60",
                className
            )}
        >
            {label && <p className="mb-2 font-semibold text-foreground">{label}</p>}
            <div className="space-y-1">
                {payload.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-muted-foreground">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color ?? "#2563eb" }}
                        />
                        <span>{entry?.name}</span>
                        <span className="font-medium text-foreground">{entry?.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
