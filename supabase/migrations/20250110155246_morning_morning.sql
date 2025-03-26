/*
  # Create admin images table and storage

  1. New Table
    - `admin_images` table for storing image metadata
    - Includes image URL, title, and upload date
  
  2. Security
    - Enable RLS on the table
    - Add policies for admin access
*/

-- Create admin_images table
CREATE TABLE admin_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_images ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage images"
ON admin_images
USING (auth.jwt()->>'role' = 'admin')
WITH CHECK (auth.jwt()->>'role' = 'admin');