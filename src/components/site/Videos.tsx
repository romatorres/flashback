"use client";
import { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Videos = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2 });
  const featuresAnimation = useScrollAnimation({ threshold: 0.2 });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: "mKJGrCHO5s0",
      title: "Flashback Live - Show Completo",
      description: "Gravado na Enseada do Caeiro em Santo Amaro BA",
    },
  ];

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-pattern-grid"></div>
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={titleAnimation.ref}
          className={`text-center mb-20 transition-all duration-700 ${
            titleAnimation.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="flex justify-center font-gravitas-one text-4xl md:text-5xl lg:text-6xl sm:mb-24 mb-20 bg-gradient-disco bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Assista Nosso Show
          </h2>
        </div>
        <div ref={featuresAnimation.ref} className="max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              onClick={() => openVideo(video.id)}
              className={`group relative overflow-hidden rounded-2xl bg-card border-2 border-border hover:border-accent transition-all duration-700 delay-500 cursor-pointer${
                featuresAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  width={854}
                  height={480}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-disco-orange/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-orange">
                    <BiPlay
                      className="w-14 h-14 text-foreground ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-2xl text-disco-orange font-semibold group-hover:text-foreground transition-colors mb-1">
                  {video.title}
                </h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white text-4xl hover:text-accent transition-colors"
            >
              <IoClose />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Videos;
