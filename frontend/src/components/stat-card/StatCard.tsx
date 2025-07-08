interface StatCardProps {
  Icon: React.ElementType;
  value: string;
  description: React.ReactNode;
}
export default function StatCard({ Icon, value, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform hover:-translate-y-2 duration-300">
      <Icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
      <p className="text-gray-700 font-semibold">
        Mais de <span className="text-green-600 font-bold">{value}</span> {description}
      </p>
    </div>
  );
}
