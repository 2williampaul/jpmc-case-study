"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span: string;
  colStart?: string;
}

interface GalleryProps {
  data: GalleryImage[];
  onImageClick: (src: string) => void;
}

export function Gallery({ data, onImageClick }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr grid-flow-dense">
      {data.map((img) => (
        <div
          key={img.id}
          className={`relative overflow-hidden rounded-lg ${img.span} ${img.colStart || ''} aspect-square cursor-pointer`}
          onClick={() => onImageClick(img.src)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export function ImageModal({ src, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (src) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 opacity-100"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <Image
          src={src}
          alt="Enlarged view"
          width={1200}
          height={800}
          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl object-contain"
          onClick={(e) => e.stopPropagation()}
          unoptimized
        />
      </div>
      <button
        className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
        onClick={onClose}
        aria-label="Close modal"
      >
        &times;
      </button>
    </div>
  );
}

