import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ImagePlus, X } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

interface ImageUploadProps {
    /** Current value - can be URL string (existing image) or File object (new upload) */
    value?: string | File | null;
    /** Callback when value changes - returns File for new uploads, string for URL input, null for removal */
    onChange: (value: string | File | null) => void;
    /** Label text */
    label?: string;
    /** Accepted file types */
    accept?: string;
    /** Max file size in MB (default 2MB) */
    maxSizeMB?: number;
}

export function ImageUpload({ 
    value, 
    onChange, 
    label = "Image", 
    accept = "image/*",
    maxSizeMB = 2 
}: ImageUploadProps) {
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const [urlInput, setUrlInput] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

    // Generate preview URL based on value type
    const previewUrl = useMemo(() => {
        if (!value) return null;
        if (typeof value === 'string') return value;
        // For File objects, we use localPreviewUrl which is created via URL.createObjectURL
        return localPreviewUrl;
    }, [value, localPreviewUrl]);

    // Create/cleanup object URL for File values
    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            setLocalPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
                setLocalPreviewUrl(null);
            };
        } else {
            setLocalPreviewUrl(null);
        }
    }, [value]);

    // Sync URL input when value is a string URL
    useEffect(() => {
        if (typeof value === 'string' && value) {
            setUrlInput(value);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Clear previous error
        setErrorMessage(null);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrorMessage("File harus berupa gambar (jpg, png, webp, dll)");
            return;
        }

        // Validate file size
        const maxBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxBytes) {
            setErrorMessage(`Ukuran file maksimal ${maxSizeMB}MB`);
            return;
        }

        // Pass File object to parent - preview will be generated via useEffect
        onChange(file);
    };

    const handleUrlSubmit = () => {
        const trimmedUrl = urlInput.trim();
        if (!trimmedUrl) {
            setErrorMessage("Masukkan URL yang valid");
            return;
        }

        // Basic URL validation
        try {
            new URL(trimmedUrl);
        } catch {
            setErrorMessage("URL tidak valid");
            return;
        }

        setErrorMessage(null);
        onChange(trimmedUrl);
    };

    const handleRemove = () => {
        setUrlInput("");
        setErrorMessage(null);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const clearError = () => {
        setErrorMessage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">{label}</Label>

            {/* Mode Toggle */}
            <div className="flex gap-2 text-sm">
                <button
                    type="button"
                    className={`px-3 py-1 rounded transition-colors ${mode === "upload" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                    onClick={() => { setMode("upload"); clearError(); }}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    className={`px-3 py-1 rounded transition-colors ${mode === "url" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                    onClick={() => { setMode("url"); clearError(); }}
                >
                    Gunakan URL
                </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <p>{errorMessage}</p>
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={clearError}
                            className="h-7 text-xs mt-1"
                        >
                            Tutup
                        </Button>
                    </div>
                </div>
            )}

            {/* Preview */}
            {previewUrl && (
                <div className="relative inline-block">
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="h-32 w-auto rounded border object-cover"
                        onError={(e) => {
                            // Handle broken image
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                        }}
                    />
                    {/* File indicator badge */}
                    {value instanceof File && (
                        <span className="absolute -top-2 -left-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                            Baru
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Upload Mode */}
            {mode === "upload" && !previewUrl && (
                <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-muted-foreground/50 hover:bg-muted/50"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Klik untuk memilih gambar
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Maks. {maxSizeMB}MB (JPG, PNG, WebP)
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}

            {/* URL Mode */}
            {mode === "url" && !previewUrl && (
                <div className="flex gap-2">
                    <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleUrlSubmit();
                            }
                        }}
                        className="flex-1"
                    />
                    <Button type="button" onClick={handleUrlSubmit} variant="secondary">
                        Terapkan
                    </Button>
                </div>
            )}

            {/* Change button when preview exists */}
            {previewUrl && (
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImagePlus className="h-4 w-4 mr-1" />
                        Ganti Gambar
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
}
