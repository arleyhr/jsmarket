type LineButtonProps = {
  onClick?: () => void;
  text: string;
};

const LineButton = ({ onClick, text }: LineButtonProps) => (
  <button
    onClick={onClick}
    className="w-full border border-gray-300 hover:border-gray-500 text-black p-1 rounded-lg text-sm"
  >
    {text}
  </button>
);

export default LineButton;
