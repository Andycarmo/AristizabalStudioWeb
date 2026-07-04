import { getThumbnail, getVideoUrl } from "./videos";

export default function FeaturedVideo({ video }) {
  return (
    <section className="w-full">

      {/* FROM THE STUDIO */}

      <div className="flex items-center gap-6 mb-8">

        <div className="flex-1 h-px bg-studio-green/20" />

        <span
          className="
            font-cocomat
            uppercase
            tracking-[0.45em]
            text-xs
            text-studio-green/60
            whitespace-nowrap
          "
        >
          From the Studio
        </span>

        <div className="flex-1 h-px bg-studio-green/20" />

      </div>

      {/* VIDEO */}

      <a
        href={getVideoUrl(video.youtubeId)}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            shadow-xl
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
              duration-700
              group-hover:scale-105
            "
          />

            {/* OVERLAY */}

            <div
            className="
                absolute
                inset-0

                flex
                flex-col
                justify-end

                bg-gradient-to-t
                from-black/70
                via-black/25
                to-transparent

                p-8
                md:p-12
            "
            >

            {/* Play */}

            <div
                className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-500
                "
            >
              <div
                className="
                    w-20
                    h-20
                    md:w-24
                    md:h-24
                    rounded-full
                    border
                    border-white/30
                    bg-white/15
                    backdrop-blur-md
                    shadow-2xl
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:bg-white/25
                    group-hover:border-white/50
                "
                >

                    <svg
                    viewBox="0 0 24 24"
                    className="
                        w-9
                        h-9
                        md:w-10
                        md:h-10

                        ml-1

                        fill-white

                        transition-all
                        duration-500

                        group-hover:fill-studio-green
                    "
                    >
                    <path d="M8 5v14l11-7z" />
                    </svg>

                </div>
            </div>

            {/* Texto */}

            <div className="relative z-10">

                <h2
                className="
                    font-cocomat
                    text-stone-50
                    text-3xl
                    md:text-5xl
                    leading-tight

                    mb-4
                "
                >
                {video.title}
                </h2>

                <p
                className="
                    text-white/90

                    max-w-2xl

                    text-base
                    md:text-lg

                    leading-relaxed

                    mb-6
                "
                >
                {video.description}
                </p>

                <span
                className="
                    inline-flex

                    items-center

                    gap-2

                    font-cocomat

                    text-lg

                    text-white

                    transition-all

                    duration-300

                    group-hover:translate-x-2
                "
                >
                Watch Video →

                </span>

            </div>

            </div>

        </div>

      </a>

    </section>
  );
}