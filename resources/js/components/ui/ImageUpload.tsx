import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ImagePlus, Loader2, RefreshCw, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ImageUploadProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    label?: string;
    accept?: string;
}

export function ImageUpload({ value, onChange, label = "Image", accept = "image/*" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const [urlInput, setUrlInput] = useState(value || "");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [lastFile, setLastFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync preview with external value changes
    useEffect(() => {
        setPreview(value || null);
    }, [value]);

    const uploadFile = async (file: File) => {
        // Clear previous error
        setErrorMessage(null);
        setUploading(true);
        setLastFile(file);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(route("admin.upload.image"), {
                method: "POST",
                body: formData,
                credentials: "same-origin",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
                },
            });

            // Check if response is OK before parsing JSON
            if (!response.ok) {
                const errorText = await response.text().catch(() => "");
                throw new Error(`HTTP ${response.status}: ${response.statusText}${errorText ? ` - ${errorText}` : ""}`);
            }

            const data = await response.json();

            if (data.success) {
                setPreview(data.url);
                onChange(data.url);
                setLastFile(null); // Clear saved file on success
                setErrorMessage(null);
            } else {
                setErrorMessage(data.message || "Gagal mengupload gambar");
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            
            // Handle different types of network errors
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                setErrorMessage("Koneksi jaringan terputus. Klik 'Coba Lagi' untuk mengulang.");
            } else if (error.message?.includes('network') || error.message?.includes('ERR_NETWORK')) {
                setErrorMessage("Masalah jaringan terdeteksi. Klik 'Coba Lagi' untuk mengulang.");
            } else if (error.message?.includes('HTTP')) {
                setErrorMessage(`Server error: ${error.message}`);
            } else {
                setErrorMessage("Gagal mengupload gambar. Silakan coba lagi.");
            }
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrorMessage("File harus berupa gambar (jpg, png, webp, dll)");
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setErrorMessage("Ukuran file maksimal 2MB");
            return;
        }

        await uploadFile(file);
    };

    const handleRetry = async () => {
        if (lastFile) {
            await uploadFile(lastFile);
        }
    };

    const handleUrlSubmit = () => {
        if (!urlInput.trim()) {
            setErrorMessage("Masukkan URL yang valid");
            return;
        }
        setErrorMessage(null);
        setPreview(urlInput);
        onChange(urlInput);
    };

    const handleRemove = () => {
        setPreview(null);
        setUrlInput("");
        setErrorMessage(null);
        setLastFile(null);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const clearError = () => {
        setErrorMessage(null);
        setLastFile(null);
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
                    className={`px-3 py-1 rounded ${mode === "upload" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                    onClick={() => { setMode("upload"); clearError(); }}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    className={`px-3 py-1 rounded ${mode === "url" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                    onClick={() => { setMode("url"); clearError(); }}
                >
                    Use URL
                </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <p>{errorMessage}</p>
                        <div className="mt-2 flex gap-2">
                            {lastFile && (
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={handleRetry}
                                    disabled={uploading}
                                    className="h-7 text-xs"
                                >
                                    <RefreshCw className={`h-3 w-3 mr-1 ${uploading ? 'animate-spin' : ''}`} />
                                    {uploading ? 'Mengulang...' : 'Coba Lagi'}
                                </Button>
                            )}
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={clearError}
                                className="h-7 text-xs"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview */}
            {preview && (
                <div className="relative inline-block">
                    <img src={preview} alt="Preview" className="h-32 w-auto rounded border object-cover" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Upload Mode */}
            {mode === "upload" && !preview && (
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                        id={`image-upload-${label}`}
                    />
                    <label
                        htmlFor={`image-upload-${label}`}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed p-6 hover:bg-gray-50"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <ImagePlus className="h-5 w-5" />
                                <span>Click to upload image</span>
                                <span className="text-xs text-gray-500">(max 2MB, jpg/jpeg/png/webp)</span>
                            </>
                        )}
                    </label>
                </div>
            )}

            {/* URL Mode */}
            {mode === "url" && !preview && (
                <div className="flex gap-2">
                    <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
                    />
                    <Button type="button" onClick={handleUrlSubmit}>
                        Add
                    </Button>
                </div>
            )}
        </div>
    );
}
