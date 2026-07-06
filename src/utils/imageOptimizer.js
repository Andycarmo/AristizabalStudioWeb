import imageCompression from "browser-image-compression";
/*
==================================================
CONFIGURACIÓN
==================================================
*/
const IMAGE_RULES = {
  artwork: {
    maxWidth: 1600,
    maxSizeMB: 0.3,
    quality: 0.8,
  },
  print: {
    maxWidth: 1400,
    maxSizeMB: 0.25,
    quality: 0.8,
  },
  book: {
    maxWidth: 1400,
    maxSizeMB: 0.25,
    quality: 0.8,
  },
  brush: {
    maxWidth: 1000,
    maxSizeMB: 0.18,
    quality: 0.8,
  },
  kit: {
    maxWidth: 1000,
    maxSizeMB: 0.18,
    quality: 0.8,
  },
  accessory: {
    maxWidth: 1000,
    maxSizeMB: 0.18,
    quality: 0.8,
  },
};

/*
==================================================
LEE INFORMACIÓN DE LA IMAGEN
==================================================
*/
function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        size: file.size,
        name: file.name,
        type: file.type,
      });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
/*
==================================================
FORMATEA BYTES
==================================================
*/
export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes","KB","MB","GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(2))
    + " "
    + sizes[i]
  );
}
/*
==================================================
OPTIMIZAR
==================================================
*/
export async function optimizeImage(file, productType = "artwork") {
  const original = await getImageInfo(file);
  const rule =
    IMAGE_RULES[productType] || IMAGE_RULES.artwork;
  /*
  Si ya es pequeña, no tocarla.
  */
  if (
    original.width <= rule.maxWidth &&
    original.size <= rule.maxSizeMB * 1024 * 1024
  ) {
    return {
      file,
      preview: URL.createObjectURL(file),
      optimized: false,
      original,
      result: original,
      reduction: 0,
      savedBytes: 0,
    };
  }
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: rule.maxWidth,
    maxSizeMB: rule.maxSizeMB,
    initialQuality: rule.quality,
    useWebWorker: true,
    fileType: "image/webp",
  });
  const result = await getImageInfo(compressed);
  return {
    file: compressed,
    preview: URL.createObjectURL(compressed),
    optimized: true,
    original,
    result,
    reduction: Number(
      (
        (1 - result.size / original.size) * 100
      ).toFixed(1)
    ),
    savedBytes:
      original.size - result.size,
  };
}