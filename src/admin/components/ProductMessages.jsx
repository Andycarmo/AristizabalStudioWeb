export default function ProductMessages({
  success,
  successMessage,
  errorMessage,
}) {
  return (
    <>
      {/* SUCCESS */}
      {success && (
        <div
          className="
          fixed
          top-6
          right-6
          z-50
          bg-green-500/20
          border border-green-500
          text-green-300
          px-4 py-3
          rounded-xl
          backdrop-blur-md
          shadow-xl
          "
        >
          ✅ {successMessage}
        </div>
      )}

      {/* ERROR */}
      {errorMessage && (
        <div
          className="
          mb-6
          bg-red-500/20
          border border-red-500
          text-red-300
          px-4 py-3
          rounded-xl
          "
        >
          ❌ {errorMessage}
        </div>
      )}
    </>
  );
}