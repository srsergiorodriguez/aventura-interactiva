/**
 * Processes and optimizes an uploaded image file.
 * Clamps the maximum dimension to 1920px to prevent memory issues 
 * in the canvas and exports a lightweight WebP data URL.
 */
export function processImageFile(file) {
  return new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = (e) => {

    // --- GIF BYPASS ---
    if (file.type === 'image/gif') {
      resolve(e.target.result);
      return;
    }

    // --- STANDARD COMPRESSION FOR STATIC IMAGES ---
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      const maxSize = 1920; 

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/webp', 0.8));
    };
    
    img.onerror = reject;
    img.src = e.target.result;
  };

  reader.onerror = reject;
  reader.readAsDataURL(file);
  });
}

/**
 * Triggers a native browser download for a generated file blob.
 */
export function downloadFile(content, filename, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give Safari/Firefox time to start the download before revoking the URL.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
