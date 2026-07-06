import { formatBytes } from "../../utils/imageOptimizer";

export default function ImageOptimizationSummary({
  optimizationSummary,
  showDetails,
  setShowDetails,
}) {
  if (!optimizationSummary) return null;
  return (
  <div
    className="
      mt-3
      mb-3
      rounded-2xl
      border
      border-green-500/20
      bg-gray-900
      p-3
      shadow-lg
    "
  >
     {/* HEADER COMPACTO */}
<div
  className="
    flex
    items-center
    justify-between
    gap-6
    flex-wrap
  "
>
  {/* Información */}
  <div
    className="
      flex
      items-center
      gap-6
      flex-wrap
      text-sm
    "
  >
    <span className="font-semibold text-green-400">
      ✓ {optimizationSummary.totalImages}{" "}
      {optimizationSummary.totalImages === 1
        ? "imagen optimizada"
        : "imágenes optimizadas"}
    </span>
    <span className="text-gray-400">
      📦
      <span className="ml-1 font-medium text-white">
        {formatBytes(optimizationSummary.originalBytes)}
      </span>
      <span className="mx-2 text-gray-500">
        →
      </span>
      ⚡
      <span className="ml-1 font-medium text-green-400">
        {formatBytes(optimizationSummary.optimizedBytes)}
      </span>
    </span>

    <span
      className="
        px-3
        py-1
        rounded-full
        bg-green-500/10
        text-green-400
        font-medium
      "
    >
      💾 {optimizationSummary.reduction}% menos espacio
    </span>

  </div>
  {/* Ver detalles */}
  <button
    type="button"
    onClick={() => setShowDetails(!showDetails)}
    className="
      text-sm
      text-studio-green
      hover:underline
      transition
      whitespace-nowrap
    "
  >
    {showDetails
      ? "▲ Ocultar detalles"
      : "▼ Ver detalles"}
  </button>
</div>
      {/* DETAILS */}
      {showDetails && (
        <div className="mt-6 space-y-5">
          {optimizationSummary.details.map(
            (img, index) => (
              <div
                key={index}
                className="
                  border-t
                  border-gray-700
                  pt-4
                "
              >
                <p className="font-medium mb-3">
                  🖼 {img.stats.original.name}
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">
                      Original
                    </p>
                    <p>
                      {img.stats.original.width} ×{" "}
                      {img.stats.original.height}
                    </p>
                    <p>
                      {formatBytes(
                        img.stats.original.size
                      )}
                    </p>
                  </div>
                  <div className="flex justify-center items-center text-gray-400">
                    ↓
                  </div>
                  <div>
                    <p className="text-gray-400">
                      Optimizada
                    </p>
                    <p>
                      {img.stats.result.width} ×{" "}
                      {img.stats.result.height}
                    </p>
                    <p>
                      {formatBytes(
                        img.stats.result.size
                      )}
                    </p>
                    <p className="text-green-400 font-medium">
                      {img.stats.reduction}% menos
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}