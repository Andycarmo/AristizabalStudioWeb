import { getThumbnail, getVideoUrl } from "./videos";

export default function VideoCard({ video }) {
  return (
    <a
      href={getVideoUrl(video.youtubeId)}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        block
      "
    >
      {/* Thumbnail */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          shadow-lg
        "
      >
        <img
          src={getThumbnail(video.youtubeId)}
          alt={video.title}
          className="
            w-full
            aspect-video
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-black/10
            group-hover:bg-black/30
            transition-all
            duration-300
            flex
            items-center
            justify-center
          "
        >
          {/* Play Button */}
          <div
            className="
              w-16
              h-16
              rounded-full
              bg-white/80
              backdrop-blur-sm
              flex
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              scale-90
              group-hover:scale-100
              shadow-lg
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#055651"
              className="w-8 h-8 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="mt-4">

        <h3
          className="
            font-cocomat
            text-lg
            text-studio-green
            line-clamp-2
            transition-colors
            duration-300
            group-hover:text-studio-pink
          "
        >
          {video.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-studio-green/60
          "
        >
          {new Date(video.publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

      </div>
    </a>
  );
}