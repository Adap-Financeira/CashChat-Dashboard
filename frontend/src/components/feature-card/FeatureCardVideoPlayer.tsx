"use client";
import { Play } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
interface FeatureCardVideoPlayerProps {
  videoUrl?: string;
}
export default function FeatureCardVideoPlayer({ videoUrl }: FeatureCardVideoPlayerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  return (
    <div className="relative w-full max-w-lg aspect-video bg-slate-900 rounded-2xl shadow-2xl overflow-hidden group">
      {/* This div simulates the WhatsApp UI background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')",
        }}
      ></div>

      {!isVideoPlaying && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40 bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              "url('https://images.converteai.net/d2ec1a7a-c48a-4116-a136-5da85575b45e/players/682f9b38fad04d102b3622ba/thumbnail.jpg')",
          }}
        >
          <div className="relative flex flex-col items-center justify-center">
            <button
              className="bg-green-500 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-12 h-12 ml-2" fill="white" />
            </button>
            <p className="mt-4 text-white font-semibold text-lg tracking-wider">Ver na prática</p>
          </div>
        </div>
      )}

      {isVideoPlaying && videoUrl && (
        <ReactPlayer src={videoUrl} controls={true} width="100%" height="100%" />
      )}
    </div>
  );
}
