const Button = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
    >
      {icon} {label}
    </button>
  );
};

export default Button;
