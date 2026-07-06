// ================= VALIDATE IMAGE =================
export async function validateImage(
  file,
  {
    ratio = 16 / 9,
    tolerance = 0.02,
    minWidth = 1600,
    minHeight = 900,
    maxSizeMB = 10,
  } = {}
) {
  // ================= FILE SIZE =================
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      message: `The image exceeds ${maxSizeMB} MB.`,
    };
  }
  // ================= READ IMAGE =================
  const image = new Image();
  image.src = URL.createObjectURL(file);
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  const width = image.width;
  const height = image.height;
  URL.revokeObjectURL(image.src);
  // ================= MIN SIZE =================
  if (width < minWidth || height < minHeight) {
    return {
      valid: false,
      message:
        `Minimum resolution is ${minWidth} × ${minHeight}px.`,
    };
  }

  // ================= RATIO =================
  const currentRatio = width / height;
  if (
    Math.abs(currentRatio - ratio)
    > tolerance
  ) {
    return {
      valid: false,
      message:
        "Hero images must use a 16:9 aspect ratio.",
    };
  }
  return {
    valid: true,
    width,
    height,
  };
}