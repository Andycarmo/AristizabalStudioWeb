import { ChevronDown, ChevronRight } from "lucide-react";

export default function CollapsibleSection({
    title,
    subtitle,
    icon: Icon,
    open,
    onToggle,
    children,
}) {
    return (
        <div
            className="
                bg-gray-800
                rounded-3xl
                border
                border-gray-700
                overflow-hidden
            "
        >
            {/* HEADER */}
            <button
                onClick={onToggle}
                className="
                    w-full
                    px-8
                    py-6
                    flex
                    justify-between
                    items-center
                    hover:bg-gray-700/40
                    transition
                "
            >
                <div className="flex items-center gap-4">
                    <Icon
                        size={22}
                        className="text-studio-green"
                    />
                    <div className="text-left">
                        <h2 className="text-white font-semibold">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-400">
                            {subtitle}
                        </p>
                    </div>
                </div>
                {open
                    ? <ChevronDown />
                    : <ChevronRight />
                }
            </button>
            {/* BODY */}
            {open && (
                <div
                    className="
                        border-t
                        border-gray-700
                        p-8
                    "
                >
                    {children}
                </div>
            )}
        </div>
    );
}