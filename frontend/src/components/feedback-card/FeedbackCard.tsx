import React from "react";
import Image from "next/image";

interface FeedbackCardProps {
  imgSrc: string;
  altText: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ imgSrc, altText }) => {
  return (
    <div className="flex justify-center bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out p-1.5 py-8">
      <Image
        src={imgSrc}
        alt={altText}
        width={389} // Using the original image width for correct aspect ratio
        height={631} // Using the original image height
        className="rounded-2xl" // Slightly smaller radius than the container for a "bezel" effect
      />
    </div>
  );
};

export default FeedbackCard;
