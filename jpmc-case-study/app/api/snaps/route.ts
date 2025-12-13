import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // Path to the public/SNAPS folder
    const snapsDirectory = join(process.cwd(), 'public', 'SNAPS');
    
    // Read all files from the directory
    const files = await readdir(snapsDirectory);
    
    // Filter for image files (common image extensions)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.JPG', '.JPEG', '.PNG', '.WEBP', '.GIF'];
    const imageFiles = files.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext.toLowerCase()))
    );
    
    // Sort files alphabetically for consistent ordering
    const sortedImages = imageFiles.sort();
    
    // Return image paths (relative to public folder)
    const imagePaths = sortedImages.map(file => `/SNAPS/${file}`);
    
    return NextResponse.json({ images: imagePaths });
  } catch (error) {
    console.error('Error reading SNAPS directory:', error);
    return NextResponse.json(
      { error: 'Failed to read images', images: [] },
      { status: 500 }
    );
  }
}




