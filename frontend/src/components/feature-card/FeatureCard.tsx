import { Check, Play } from "lucide-react";
import FeatureCardVideoPlayer from "./FeatureCardVideoPlayer";

// Define the types for the component's props for better code quality and autocompletion
interface FeatureCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
  subDescription: string;
  features: string[];
  videoPosition?: "left" | "right";
  videoUrl?: string;
}

export default function FeatureCard({
  Icon,
  title,
  description,
  subDescription,
  features,
  videoPosition = "right", // Default to video on the right
  videoUrl,
}: FeatureCardProps) {
  // Define classes for text and video columns to handle ordering
  const textOrderClass = videoPosition === "left" ? "md:order-2" : "md:order-1";
  const videoOrderClass = videoPosition === "left" ? "md:order-1" : "md:order-2";

  return (
    <>
      <div className="container w-full mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* --- Text Content Column --- */}
          <div className={`flex flex-col justify-center ${textOrderClass}`}>
            <div className="flex items-center gap-4 mb-6">
              <Icon className="w-8 h-8 md:w-12 md:h-12 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

            <p className="text-gray-600 leading-relaxed mb-8">{subDescription}</p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Video Placeholder Column --- */}
          <div
            className={`flex items-center justify-center ${
              videoPosition === "left" ? "md:justify-start" : "md:justify-end"
            } ${videoOrderClass}`}
          >
            <FeatureCardVideoPlayer videoUrl={"https://www.youtube.com/watch?v=-YPYfMF7800"} />
          </div>
        </div>
      </div>
      {/* Optional decorative separator */}
      {/* <div className="container mx-auto px-6 mt-16">
        <div className="border-t-2 border-dotted border-pink-200"></div>
      </div> */}
    </>
  );
}
