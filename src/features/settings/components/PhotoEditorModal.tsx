import { useState, useRef, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, ImagePlus, Loader2, Save } from "lucide-react";
import api from "../../../shared/lib/api";

interface PhotoEditorModalProps {
  imageFile: File;
  onClose: () => void;
  onSaved: (photoUrl: string) => void;
}

export default function PhotoEditorModal({
  imageFile,
  onClose,
  onSaved,
}: PhotoEditorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [uploading, setUploading] = useState(false);

  const CANVAS_SIZE = 280;

  // Load image from file
  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Create image element when src changes
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      setImageElement(img);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imageElement) return;

    const size = CANVAS_SIZE;
    canvas.width = size * 2; // High DPI
    canvas.height = size * 2;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(2, 2);

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Background
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, size, size);

    // Calculate scaled dimensions to cover the circle
    const imgAspect = imageElement.width / imageElement.height;
    let drawW: number, drawH: number;
    if (imgAspect > 1) {
      drawH = size * zoom;
      drawW = drawH * imgAspect;
    } else {
      drawW = size * zoom;
      drawH = drawW / imgAspect;
    }

    const drawX = (size - drawW) / 2 + offset.x;
    const drawY = (size - drawH) / 2 + offset.y;

    ctx.drawImage(imageElement, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Draw ring border
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [imageElement, zoom, offset]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Mouse / Touch handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Replace photo
  const handleReplacePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  // Export cropped image and upload
  const handleSave = async () => {
    if (!imageElement) return;

    setUploading(true);
    try {
      // Create an offscreen canvas to export the cropped circular area
      const exportCanvas = document.createElement("canvas");
      const exportSize = 512; // Export at 512x512
      exportCanvas.width = exportSize;
      exportCanvas.height = exportSize;
      const exportCtx = exportCanvas.getContext("2d")!;

      // Clip to circle
      exportCtx.beginPath();
      exportCtx.arc(exportSize / 2, exportSize / 2, exportSize / 2, 0, Math.PI * 2);
      exportCtx.closePath();
      exportCtx.clip();

      // Draw image with zoom and offset scaled to export size
      const scale = exportSize / CANVAS_SIZE;
      const imgAspect = imageElement.width / imageElement.height;
      let drawW: number, drawH: number;
      if (imgAspect > 1) {
        drawH = CANVAS_SIZE * zoom;
        drawW = drawH * imgAspect;
      } else {
        drawW = CANVAS_SIZE * zoom;
        drawH = drawW / imgAspect;
      }

      const drawX = ((CANVAS_SIZE - drawW) / 2 + offset.x) * scale;
      const drawY = ((CANVAS_SIZE - drawH) / 2 + offset.y) * scale;

      exportCtx.drawImage(imageElement, drawX, drawY, drawW * scale, drawH * scale);

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) =>
        exportCanvas.toBlob(resolve, "image/jpeg", 0.9)
      );

      if (!blob) {
        throw new Error("Gagal mengkonversi gambar");
      }

      // Upload via API
      const formData = new FormData();
      formData.append("photo", blob, "profile-photo.jpg");

      const response = await api.post("/tutor/profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedTutor = response.data.data;
      onSaved(updatedTutor.fotoUrl);
    } catch (error: any) {
      console.error("Gagal upload foto:", error);
      alert(error.response?.data?.message || "Gagal mengunggah foto profil");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900 text-base">Sesuaikan Foto</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas preview */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="rounded-full cursor-grab active:cursor-grabbing touch-none"
              style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
            <p className="text-[11px] text-gray-400 text-center mt-2.5">
              Geser foto untuk menyesuaikan posisi
            </p>
          </div>
        </div>

        {/* Zoom control */}
        <div className="flex items-center gap-3 px-2 mb-5">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.15))}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ZoomOut className="w-4.5 h-4.5" />
          </button>
          <input
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.15))}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ZoomIn className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleReplacePhoto}
            className="flex-1 py-2.5 px-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
            disabled={uploading}
          >
            <ImagePlus className="w-4 h-4" />
            Ganti Foto
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 px-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading || !imageElement}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan
              </>
            )}
          </button>
        </div>

        {/* Hidden file input for replace */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
