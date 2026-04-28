import { supabase } from './supabase';

/**
 * Uploads an image to Supabase Storage and returns the public download URL.
 * Requires a public bucket named 'portfolio-images'.
 * 
 * @param file The file object to upload
 * @param path The path in storage (e.g., 'projects/my-image.png')
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    console.log('Attempting upload to Supabase:', path);
    
    // Upload the file to the 'portfolio-images' bucket
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      // Handle potential bucket-not-found error specifically
      if (error.message.includes('bucket not found')) {
        throw new Error('Supabase bucket "portfolio-images" not found. Please create it in your Supabase dashboard.');
      }
      throw error;
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(data.path);

    console.log('Upload successful. Public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Supabase Storage Error:', error);
    throw error;
  }
}
