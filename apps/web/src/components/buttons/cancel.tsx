type CancelButtonProps = {
  onClick: () => void;
  label: string;
  disabled: boolean;
  loading: boolean;
}

export default function CancelButton({ onClick, label, disabled, loading }: CancelButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? 'Loading...' : label}
    </button>
  );
}
