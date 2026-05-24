import { Link } from "react-router-dom";

export const buttonColors = {
  green: {
    bg: "bg-studio-green",
    text: "text-white",
    border: "border-studio-green",
    hoverText: "group-hover/button:text-studio-green",
    hoverBg: "bg-white",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-white",
    border: "border-blue-600",
    hoverText: "group-hover/button:text-blue-600",
    hoverBg: "bg-white",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-white",
    border: "border-pink-500",
    hoverText: "group-hover/button:text-pink-500",
    hoverBg: "bg-white",
  },
    orange: {
    bg: "bg-[#c55c1e]",
    text: "text-white",
    border: "border-[#c55c1e]",
    hoverText: "group-hover/button:text-[#c55c1e]",
    hoverBg: "bg-white",
  },

  // 🔥 NUEVO: variante invertida (como tu botón de shop)
  invertedPink: {
    bg: "bg-white",
    text: "text-pink-600",
    border: "border-studio-pink",
    hoverText: "group-hover/button:text-white",
    hoverBg: "bg-[#DE5D83]",
  },
};

/* TAMAÑOS */
export const buttonSizes = {
  xsa: "px-2.5 py-[3px] text-[10px]",
  xsb: "px-6 py-[4px] text-[13px]",
  xs: "px-2 py-1 text-[11px]",
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  to,
  children,
  color = buttonColors.green,
  size = "md",
  onClick,
  className = "",
}) {

  const buttonContent = (
    <button
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        font-cocomat
        rounded-full
        border-2
        transition-colors
        duration-300
        group/button

        ${buttonSizes[size]}
        ${color.bg}
        ${color.text}
        ${color.border}

        ${className}
      `}
    >

      {/* BACKGROUND */}
      <span
        className={`
          absolute
          inset-0
          ${color.hoverBg}
          translate-y-full
          group-hover/button:translate-y-0
          transition-transform
          duration-300
          ease-in-out
        `}
      />

      {/* TEXT */}
      <span
        className={`
          relative
          z-10
          transition-colors
          duration-300
          ${color.hoverText}
        `}
      >
        {children}
      </span>

    </button>
  );

  // LINK BUTTON
  if (to) {
    return (
      <Link to={to}>
        {buttonContent}
      </Link>
    );
  }

  // NORMAL BUTTON
  return buttonContent;
}