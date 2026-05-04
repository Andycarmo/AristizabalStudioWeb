import { Link } from "react-router-dom";

export const buttonColors = {
  green: {
    bg: "bg-studio-green",
    text: "text-white",
    border: "border-studio-green",
    hoverText: "group-hover:text-studio-green",
    hoverBg: "bg-white",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-white",
    border: "border-blue-600",
    hoverText: "group-hover:text-blue-600",
    hoverBg: "bg-white",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-white",
    border: "border-pink-500",
    hoverText: "group-hover:text-pink-500",
    hoverBg: "bg-white",
  },

  // 🔥 NUEVO: variante invertida (como tu botón de shop)
  invertedPink: {
    bg: "bg-white",
    text: "text-pink-600",
    border: "border-studio-pink",
    hoverText: "group-hover:text-white",
    hoverBg: "bg-[#DE5D83]",
  },
};

export default function Button({ to, children, color = buttonColors.green }) {
  return (
    <Link to={to}>
      <button
        className={`
        relative overflow-hidden
        font-cocomat
        px-6 py-3 
        rounded-full
        border-2
        transition-colors duration-300
        group
        ${color.bg} ${color.text} ${color.border}
        `}
      >
        {/* FONDO ANIMADO */}
        <span
          className={`
          absolute inset-0
          ${color.hoverBg}
          translate-y-full
          group-hover:translate-y-0
          transition-transform duration-300 ease-in-out
          `}
        ></span>

        {/* TEXTO */}
        <span
          className={`
          relative z-10
          transition-colors duration-300
          ${color.hoverText}
          `}
        >
          {children}
        </span>
      </button>
    </Link>
  );
}