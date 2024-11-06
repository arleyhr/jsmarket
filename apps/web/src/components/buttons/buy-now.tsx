interface BuyNowButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function BuyNowButton({ onClick, disabled = false, loading = false, className = '' }: BuyNowButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full mt-2 bg-orange-400 hover:bg-orange-500 text-black py-3 rounded-lg font-medium ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  )
}
