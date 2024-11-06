type AddToCartProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const AddToCartButton = ({ label = 'Add to Cart', onClick, disabled }: AddToCartProps) => {
  return (
    <button
      className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-1 rounded-full text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default AddToCartButton;
