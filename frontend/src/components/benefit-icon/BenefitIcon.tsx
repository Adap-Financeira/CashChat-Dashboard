interface BenefitIconProps {
  Icon: React.ElementType;
  text: string;
}

export const BenefitIcon = ({ Icon, text }: BenefitIconProps) => {
  return (
    <div className="flex items-center justify-center gap-4 rounded-2xl py-5 px-8 border w-80">
      <Icon className="w-12 h-12 text-green-600" />
      <p className="text-wrap text-sm font-semibold">{text}</p>
    </div>
  );
};
