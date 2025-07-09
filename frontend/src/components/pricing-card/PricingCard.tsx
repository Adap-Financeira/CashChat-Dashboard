import { Check, X } from "lucide-react";
import Link from "next/link";

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  features: Feature[];
  ctaText: string;
  isPopular?: boolean;
}

// --- Reusable FeatureListItem Component ---
const FeatureListItem: React.FC<{ feature: Feature; isPopular: boolean }> = ({ feature, isPopular }) => {
  const iconColor = feature.included ? (isPopular ? "text-green-300" : "text-green-500") : "text-red-400";
  const textColor = isPopular ? "text-gray-100" : "text-gray-600";

  return (
    <li className="flex items-center gap-3">
      {feature.included ? (
        <Check className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
      ) : (
        <X className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
      )}
      <span className={textColor}>{feature.text}</span>
    </li>
  );
};

// --- Reusable PricingCard Component ---
export default function PricingCard({ plan }: { plan: Plan }) {
  const isPopular = plan.isPopular || false;

  const cardClasses = isPopular
    ? "bg-green-600 text-white rounded-2xl shadow-2xl scale-105 transform"
    : "bg-white text-gray-800 rounded-2xl shadow-lg border";

  const buttonClasses = isPopular
    ? "bg-white text-green-600 font-bold hover:bg-gray-100"
    : "bg-green-600 text-white font-bold hover:bg-green-700";

  return (
    <div className={`relative p-8 flex flex-col ${cardClasses}`}>
      {isPopular && (
        <div className="absolute top-0 -translate-x-10 -translate-y-1/2 w-full flex justify-center">
          <span className="bg-yellow-400 text-green-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
            Mais Popular
          </span>
        </div>
      )}
      <h3 className="text-2xl font-bold">{plan.name}</h3>
      <p className={`mt-2 text-sm ${isPopular ? "text-green-200" : "text-gray-500"}`}>{plan.subtitle}</p>

      <div className="mt-6">
        <span className="text-4xl font-extrabold">{plan.price}</span>
        <span className={`text-lg font-medium ${isPopular ? "text-green-200" : "text-gray-500"}`}>
          /{plan.period}
        </span>
      </div>

      <div className={`my-8 border-t ${isPopular ? "border-green-500" : "border-gray-200"}`}></div>

      <ul className="space-y-4 flex-grow">
        {plan.features.map((feature, index) => (
          <FeatureListItem key={index} feature={feature} isPopular={isPopular} />
        ))}
      </ul>

      <Link
        href="/register"
        className={`w-full mt-10 py-3 rounded-lg transition-transform hover:scale-105 ${buttonClasses}`}
      >
        {plan.ctaText}
      </Link>
    </div>
  );
}
