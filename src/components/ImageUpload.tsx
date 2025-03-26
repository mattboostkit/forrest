import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Show preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setError(null);
      setUploading(true);

      // Upload to Supabase
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(data.path);

      onUploadComplete?.(publicUrl);
      setUploading(false);
    } catch (err) {
      setError('Error uploading image. Please try again.');
      setUploading(false);
      console.error('Upload error:', err);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div className="glass-effect p-6 rounded-lg">
        {!preview ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
        ) : (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {uploading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;