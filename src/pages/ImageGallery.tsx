import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ImageUpload from '../components/ImageUpload';
import { Trash2 } from 'lucide-react';

interface Image {
  name: string;
  url: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase.storage.from('images').list();
      
      if (error) {
        throw error;
      }

      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(file.name);
          
          return {
            name: file.name,
            url: publicUrl
          };
        })
      );

      setImages(imageUrls);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUploadComplete = (url: string) => {
    loadImages();
  };

  const handleDelete = async (name: string) => {
    try {
      const { error } = await supabase.storage.from('images').remove([name]);
      
      if (error) {
        throw error;
      }

      setImages(images.filter(img => img.name !== name));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Image Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload and manage your images
          </p>
        </div>

        <div className="mb-12">
          <ImageUpload onUploadComplete={handleUploadComplete} />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading images...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div key={image.name} className="glass-effect rounded-lg overflow-hidden group">
                <div className="relative aspect-w-16 aspect-h-9">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(image.name)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { ImageGallery };