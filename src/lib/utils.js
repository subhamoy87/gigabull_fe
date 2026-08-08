import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an image File, Blob, Image URL, or Base64 string to a WEBP Data URL using Browser HTML5 Canvas.
 * @param {File|Blob|string} imageSource - The input image file, blob, or URL string
 * @param {number} quality - WEBP compression quality (0 to 1, default 0.85)
 * @returns {Promise<string>} - Resolves with data:image/webp;base64,... string
 */
export const convertImageToWebP = (imageSource, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!imageSource) {
      return reject(new Error('No image source provided'));
    }

    // If it's already a webp data URL, return directly
    if (typeof imageSource === 'string' && imageSource.startsWith('data:image/webp;base64,')) {
      return resolve(imageSource);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const cleanUp = () => {
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 600;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        cleanUp();
        resolve(webpDataUrl);
      } catch (err) {
        cleanUp();
        reject(err);
      }
    };

    img.onerror = (err) => {
      cleanUp();
      reject(new Error('Failed to load image for WebP canvas conversion'));
    };

    if (imageSource instanceof File || imageSource instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = (err) => {
        cleanUp();
        reject(err);
      };
      reader.readAsDataURL(imageSource);
    } else if (typeof imageSource === 'string') {
      img.src = imageSource;
    } else {
      cleanUp();
      reject(new Error('Invalid image source type'));
    }
  });
};

