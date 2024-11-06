import { useMutation, useQuery } from "@apollo/client";

import { ADD_PRODUCT_TO_CART, CHECKOUT_CART, GET_CART, REMOVE_PRODUCT_FROM_CART, TCart, UPDATE_CART_ITEM_QUANTITY } from "../queries/cart";

export function useCart() {
  const { data, loading, error } = useQuery(GET_CART);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, { refetchQueries: [GET_CART] });
  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART, { refetchQueries: [GET_CART] });
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY, { refetchQueries: [GET_CART] });
  const [checkoutCart] = useMutation(CHECKOUT_CART);

  const cart: TCart = data?.cart ?? { items: [], total: 0 };

  const handleAddProductToCart = async (productId: number, quantity = 1) => {
    await addProductToCart({ variables: { productId, quantity } });
  };

  return {
    cart,
    error,
    addProductToCart: handleAddProductToCart,
    removeProductFromCart,
    updateCartItemQuantity,
    checkoutCart,
    loading,
  };
}
