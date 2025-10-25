type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

export const StatCard = ({ title, value, icon, loading, onClick }: StatCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between 
        transition-all duration-300 ${
          onClick
            ? "cursor-pointer hover:shadow-md hover:-translate-y-1 active:scale-[0.98]"
            : ""
        }`}
    >
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {loading ? (
          <p className="text-gray-400 text-sm mt-1 animate-pulse">Đang tải...</p>
        ) : (
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        )}
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  );
};
