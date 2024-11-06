interface AddProductButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function AddProductButton({ onClick, disabled = false, loading = false, className = '' }: AddProductButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full mt-4 bg-amber-300 hover:bg-amber-400 text-black py-3 rounded-lg font-medium ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
