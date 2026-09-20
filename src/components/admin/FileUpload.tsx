import React, { useRef, useState } from 'react';
import { Paperclip, X, Loader2, FileText } from 'lucide-react';
import { apiClient, getStorageUrl } from '../../services/api';

interface FileUploadProps {
  value?: string | null;
  fileName?: string | null;
  onChange: (url: string | null, fileName: string | null) => void;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  fileName,
  onChange,
  accept = '.pdf,.doc,.docx',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('purpose', 'document');

    try {
      const res = await apiClient.post('/admin/media/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res.data?.data?.url as string;
      onChange(url, file.name);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className={className}>
      {value ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
          <a
            href={getStorageUrl(value)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 truncate text-emerald-700 hover:underline font-semibold"
          >
            {fileName || 'Attached file'}
          </a>
          <button
            type="button"
            onClick={() => onChange(null, null)}
            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
            title="Remove attachment"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 text-slate-500 hover:text-emerald-600 text-xs font-bold transition-colors"
        >
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Paperclip className="w-3.5 h-3.5" />}
          <span>{uploading ? 'Uploading...' : 'Attach file'}</span>
        </button>
      )}

      {error && <p className="text-[11px] text-rose-600 mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};
