import YoutubeIcon from "../../../assets/youtube.svg?react";
import Button, { buttonColors } from "../../../components/ui/Button";

import videos from "./videos";
import VideoCard from "./VideoCard";
import FeaturedVideo from "./FeaturedVideo";

export default function InsideStudio() {

  const featuredVideo = videos.find(video => video.featured);
  const otherVideos = videos.filter(video => !video.featured);

  return (
    <section
      className="
        bg-[#EDF6F2]
        py-20
        px-4
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* =========================
            VIDEO PRINCIPAL
        ========================== */}

        <div className="max-w-5xl mx-auto">

          <FeaturedVideo video={featuredVideo} />

        </div>

        {/* =========================
            TEXTO
        ========================== */}

        <div
          className="
            max-w-2xl
            mx-auto
            text-center
            mt-12
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              mb-5
            "
          >
            <h2
              className="
                font-cocomat 
                text-4xl
                md:text-5xl
                text-studio-green
                leading-none
              "
            >
              Inside the Studio
            </h2>
          </div>

          <p
            className="
              text-studio-green/80
              text-base
              md:text-lg
              leading-relaxed
              mb-8
            "
          >
            Step inside the studio and discover the creative
            process, inspiration and stories behind every
            artwork through the latest videos.
          </p>

          <Button
            to="https://www.youtube.com/@aristizabalstudio"
            target="_blank"
            rel="noopener noreferrer"
            color={buttonColors.green}
          >
            Visit YouTube Channel
          </Button>

        </div>

        {/* =========================
            VIDEOS SECUNDARIOS
        ========================== */}

        <div
          className="
            mt-16

            grid
            grid-cols-1
            md:grid-cols-2

            gap-8

            max-w-5xl
            mx-auto
          "
        >

          {otherVideos.map(video => (

            <VideoCard
              key={video.id}
              video={video}
            />

          ))}

        </div>

      </div>
    </section>
  );
}