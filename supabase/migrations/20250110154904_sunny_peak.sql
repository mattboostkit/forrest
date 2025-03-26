/*
  # Create public storage bucket for images

  1. New Storage Bucket
    - Creates a new public bucket named 'images' for storing gallery images
    - Enables public access for viewing images
    - Sets up RLS policies for authenticated users to upload/delete images

  2. Security
    - Enables RLS on the storage.objects table
    - Adds policies for authenticated users to manage their own images
*/

-- Create a new public bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update their images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images' AND owner = auth.uid());

CREATE POLICY "Authenticated users can delete their images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images' AND owner = auth.uid());