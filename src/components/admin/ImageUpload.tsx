import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { apiClient, getStorageUrl } from '../../services/api';

export type UploadPurpose = 'icon' | 'logo' | 'favicon' | 'og_image' | 'photo';

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  purpose: UploadPurpose;
  hint?: string;
  className?: string;
  shape?: 'square' | 'wide';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  purpose,
  hint,
  className = '',
  shape = 'square',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('purpose', purpose);

    try {
      const res = await apiClient.post('/admin/media/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res.data?.data?.url as string;
      onChange(url);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Upload failed. Please try again.');
      setLocalPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const displayUrl = localPreview || (value ? getStorageUrl(value) : null);
  const dimensionClass = shape === 'wide' ? 'w-full aspect-video' : 'w-28 h-28';

  return (
    <div className={className}>
      {hint && <p className="text-[11px] text-slate-400 mb-2">{hint}</p>}
      <div className="flex items-start gap-3">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className={`${dimensionClass} relative rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer transition-colors shrink-0`}
        >
          {displayUrl ? (
            <img src={displayUrl} alt="" className="w-full h-full object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-slate-400 p-2 text-center">
              <Upload className="w-4 h-4" />
              <span className="text-[10px] font-bold">Upload</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
            </div>
          )}
        </div>

        {displayUrl && !uploading && (
          <button
            type="button"
            onClick={() => {
              setLocalPreview(null);
              onChange(null);
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && <p className="text-[11px] text-rose-600 mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};
