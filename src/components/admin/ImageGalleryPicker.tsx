import React, { useRef } from 'react';
import { Star, Upload, X } from 'lucide-react';

export interface GalleryPickerItem {
  key: string;
  url: string;
  existingId?: number;
  file?: File;
}

interface ImageGalleryPickerProps {
  items: GalleryPickerItem[];
  featuredKey: string | null;
  onFilesSelected: (files: File[]) => void;
  onRemove: (key: string) => void;
  onSetFeatured: (key: string) => void;
  label?: string;
}

export const ImageGalleryPicker: React.FC<ImageGalleryPickerProps> = ({
  items,
  featuredKey,
  onFilesSelected,
  onRemove,
  onSetFeatured,
  label = 'Images',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) onFilesSelected(files);
    e.target.value = '';
  };

  return (
    <div>
      <label className="font-bold text-slate-700 block mb-1">{label} (multiple)</label>
      <p className="text-[11px] text-slate-400 mb-2">
        Upload one or more images, then click the star on a thumbnail to set it as the feature photo.
      </p>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const isFeatured = item.key === featuredKey;
          return (
            <div
              key={item.key}
              className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 group ${
                isFeatured ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200'
              }`}
            >
              <img src={item.url} alt="" className="w-full h-full object-cover" />

              <button
                type="button"
                onClick={() => onSetFeatured(item.key)}
                title={isFeatured ? 'Feature photo' : 'Set as feature photo'}
                className={`absolute top-1 left-1 p-1 rounded-full transition-colors ${
                  isFeatured
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/80 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-emerald-600'
                }`}
              >
                <Star className="w-3 h-3" fill={isFeatured ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={() => onRemove(item.key)}
                title="Remove image"
                className="absolute top-1 right-1 p-1 rounded-full bg-white/80 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-rose-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>

              {isFeatured && (
                <span className="absolute bottom-0 inset-x-0 bg-emerald-500 text-white text-[9px] font-bold text-center py-0.5">
                  Feature
                </span>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="text-[10px] font-bold">Add photos</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
