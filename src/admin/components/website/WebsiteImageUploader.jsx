import { useRef, useState } from "react";
import { optimizeImage } from "../../../utils/imageOptimizer";
import ImageOptimizationSummary from "../ImageOptimizationSummary";

export default function WebsiteImageUploader({
  label = "Imagen",
  value = "",
  ratio,
  minWidth = 0,
  minHeight = 0,
  maxSize = 10, // MB
  accepted = ["image/jpeg", "image/png", "image/webp"],
  onChange,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(value);
  const [error, setError] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  const [optimizationSummary, setOptimizationSummary] = useState(null);
  const [showDetails, setShowDetails] = useState(false);


async function handleImageChange(e) {
  const files = Array.from(e.target.files);

  const optimizedImages = await Promise.all(
    files.map(async (file) => {
      const optimized = await optimizeImage(file, "hero");

      return {
        file: optimized.file,
        preview: optimized.preview,
        stats: optimized,
      };
    })
  );

  if (optimizedImages.length === 0) return;

  const originalBytes = optimizedImages.reduce(
    (acc, img) => acc + img.stats.original.size,
    0
  );

  const optimizedBytes = optimizedImages.reduce(
    (acc, img) => acc + img.stats.result.size,
    0
  );

  const optimizedCount = optimizedImages.filter(
    img => img.stats.optimized
  ).length;

  const alreadyOptimized = optimizedImages.filter(
    img => !img.stats.optimized
  ).length;

  setOptimizationSummary({
    totalImages: optimizedCount,
    alreadyOptimized,
    originalBytes,
    optimizedBytes,
    reduction: (
      (1 - optimizedBytes / originalBytes) * 100
    ).toFixed(1),
    details: optimizedImages,
  });

  setPreview(optimizedImages[0].preview);

  setImageInfo({
    width: optimizedImages[0].stats.result.width,
    height: optimizedImages[0].stats.result.height,
    size: optimizedImages[0].stats.result.size,
    type: optimizedImages[0].stats.result.type,
    name: optimizedImages[0].stats.result.name,
  });

  onChange({
    file: optimizedImages[0].file,
    preview: optimizedImages[0].preview,
    stats: optimizedImages[0].stats,
  });
}

  return (
    <div className="space-y-3">

      <label className="block text-sm font-medium text-studio-green">
        {label}
      </label>

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="px-4 py-2 rounded bg-studio-green text-white hover:opacity-90"
      >
        Seleccionar imagen
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accepted.join(",")}
        onChange={handleImageChange}
      />

      {imageInfo && (
        <div className="text-sm text-gray-600 space-y-1">

          <p>
            <strong>Archivo:</strong> {imageInfo.name}
          </p>

          <p>
            <strong>Dimensiones:</strong>{" "}
            {imageInfo.width} × {imageInfo.height}px
          </p>

          <p>
            <strong>Peso:</strong>{" "}
            {(imageInfo.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <p>
            <strong>Formato:</strong>{" "}
            {imageInfo.type}
          </p>

        </div>
      )}

      {error && (
        <div className="rounded bg-red-100 border border-red-300 p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <ImageOptimizationSummary
          optimizationSummary={optimizationSummary}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
      />

    </div>
  );
}