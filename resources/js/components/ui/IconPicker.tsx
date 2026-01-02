import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { serviceIconOptions } from "@/lib/service-icons";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
    value?: string;
    onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredIcons = serviceIconOptions.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()) ||
        option.value.toLowerCase().includes(search.toLowerCase())
    );

    const SelectedIcon = serviceIconOptions.find((opt) => opt.value === value)?.icon;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {SelectedIcon ? (
                        <div className="flex items-center gap-2">
                            <SelectedIcon className="h-4 w-4" />
                            <span>{value}</span>
                        </div>
                    ) : (
                        <span>Pilih Icon</span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pilih Icon</DialogTitle>
                </DialogHeader>
                <div className="relative mb-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari icon..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="h-[300px] pr-4 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-2">
                        {filteredIcons.map((option) => (
                            <Button
                                key={option.value}
                                variant={value === option.value ? "default" : "outline"}
                                className="flex h-16 flex-col gap-1 p-2"
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                            >
                                <option.icon className="h-6 w-6" />
                                <span className="text-[10px] truncate w-full text-center">
                                    {option.value}
                                </span>
                            </Button>
                        ))}
                    </div>
                    {filteredIcons.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground py-8">
                            Tidak ada icon ditemukan.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
