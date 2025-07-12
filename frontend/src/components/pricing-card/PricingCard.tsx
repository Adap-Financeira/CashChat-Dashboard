// src/components/PricingCard.tsx

import { Check } from "lucide-react";
import Link from "next/link";

// Interfaces remain the same
interface Feature {
  text: string;
}

interface Plan {
  name: string;
  subtitle: string;
  features: Feature[];
  ctaText: string;
  isPopular?: boolean;
}

// Reusable FeatureListItem Component (no changes)
const FeatureListItem: React.FC<{ text: string; isPopular: boolean }> = ({ text, isPopular }) => {
  const iconColor = isPopular ? "text-green-300" : "text-green-500";
  const textColor = isPopular ? "text-gray-100" : "text-gray-600";

  return (
    <li className="flex items-start gap-3 h-12">
      {" "}
      {/* Added a fixed height */}
      <Check className={`w-5 h-5 flex-shrink-0 ${iconColor} mt-1`} />
      <span className={`${textColor} text-start`}>{text}</span>
    </li>
  );
};

// --- Reusable PricingCard Component ---
export default function PricingCard({ plan }: { plan: Plan }) {
  const isPopular = plan.isPopular || false;

  // The transform class is now applied by the parent.
  const cardClasses = isPopular
    ? "bg-green-600 text-white rounded-2xl shadow-2xl"
    : "bg-white text-gray-800 rounded-2xl shadow-lg border";

  const buttonClasses = isPopular
    ? "bg-white text-green-600 font-bold hover:bg-gray-100"
    : "bg-green-600 text-white font-bold hover:bg-green-700";

  return (
    // Added h-full to make the card fill its parent container's height
    <div className={`relative p-8 w-full max-w-[600px] mx-auto flex flex-col h-[557px] ${cardClasses}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="bg-yellow-400 text-green-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
            Mais Popular
          </span>
        </div>
      )}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className={`mt-2 text-sm ${isPopular ? "text-green-200" : "text-gray-500"}`}>{plan.subtitle}</p>

      <div className={`my-8 border-t ${isPopular ? "border-green-500" : "border-gray-200"}`}></div>

      <ul className="space-y-1 flex-grow">
        {plan.features.map((feature, index) => (
          <FeatureListItem key={index} text={feature.text} isPopular={isPopular} />
        ))}
      </ul>

      <Link
        href="/register"
        className={`w-full block text-center mt-10 py-3 rounded-lg transition-transform hover:scale-105 ${buttonClasses}`}
      >
        {plan.ctaText}
      </Link>
    </div>
  );
}
