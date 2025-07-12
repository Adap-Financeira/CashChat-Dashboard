"use client";
import React from "react";
import ReactPlayer from "react-player";
interface VideoPlayerProps {
  videoUrl?: string;
}
export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  return (
    <div className="relative w-3xs md:w-1/3 max-w-[500px] min-h-[455px] aspect-video rounded-2xl shadow-2xl overflow-hidden group mx-auto">
      {/* This div simulates the WhatsApp UI background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20"></div>

      {!isVideoPlaying && (
        // Container for the background image
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('http://img.youtube.com/vi/${
              videoUrl?.split("shorts/")[1]
            }/maxresdefault.jpg')`,
          }}
        >
          {/* Overlay and content container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
              <button
                className="group flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform transform hover:scale-110"
                onClick={() => setIsVideoPlaying(true)}
              >
                {/* Ensure you have a 'Play' icon component or SVG */}
                <svg className="h-12 w-12 ml-2" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="mt-4 text-lg font-semibold tracking-wider text-white">Ver na prática</p>
            </div>
          </div>
        </div>
      )}

      {isVideoPlaying && videoUrl && (
        <div className="flex justify-center items-center h-full">
          <ReactPlayer src={videoUrl} controls={true} width="100%" height="100%" />
        </div>
      )}
    </div>
  );
}
