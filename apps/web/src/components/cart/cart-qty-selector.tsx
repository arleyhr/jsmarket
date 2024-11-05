
type QuantitySelectorProps = {
  quantity: number;
  onQuantityChange: (value: number) => void;
};

const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => (
  <select
    value={quantity}
    onChange={e => onQuantityChange(Number(e.target.value))}
    className="border rounded w-12 px-1 py-1 text-sm text-black"
  >
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
);

export default QuantitySelector;
