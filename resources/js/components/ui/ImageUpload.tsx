import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router } from "@inertiajs/react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useState, useRef } from "react";

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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(route("admin.upload.image"), {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
                },
            });

            const data = await response.json();

            if (data.success) {
                setPreview(data.url);
                onChange(data.url);
            } else {
                alert(data.message || "Failed to upload image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleUrlSubmit = () => {
        if (!urlInput.trim()) {
            alert("Please enter a valid URL");
            return;
        }
        setPreview(urlInput);
        onChange(urlInput);
    };

    const handleRemove = () => {
        setPreview(null);
        setUrlInput("");
        onChange(null);
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
                    className={`px-3 py-1 rounded ${mode === "upload" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setMode("upload")}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    className={`px-3 py-1 rounded ${mode === "url" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setMode("url")}
                >
                    Use URL
                </button>
            </div>

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
