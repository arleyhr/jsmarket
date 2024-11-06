interface TabProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

export default function TabButton({ isActive, label, onClick }: TabProps) {
  return (
    <button
      className={`px-8 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
        isActive
          ? 'border-yellow-500 text-yellow-600 hover:text-yellow-700'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
      onClick={() => onClick && onClick()}
    >
      {label}
    </button>
  );
}
