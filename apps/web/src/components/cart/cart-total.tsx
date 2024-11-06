type CartTotalProps = {
  total: number;
};

const CartTotal = ({ total }: CartTotalProps) => (
  <div className="mb-4">
    <span className="block font-medium text-black text-center">Total:</span>
    <span className="block font-bold text-[#B12704] text-center">${total.toFixed(2)}</span>
  </div>
);

export default CartTotal;
