import { useMutation, useQuery } from '@apollo/client';
import { makeVar, useReactiveVar } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import client from '../apollo';
import {
  ADD_PRODUCT_TO_CART,
  CHECKOUT_CART,
  GET_CART,
  REMOVE_PRODUCT_FROM_CART,
  TCart,
  UPDATE_CART_ITEM_QUANTITY,
} from '../queries/cart';

import { useAuth } from './useAuth';
import { useLoginModal } from './useLoginModal';

export function useCart() {
  const { data, loading, error } = useQuery(GET_CART);

  const cart: TCart = data?.cart ?? { items: [], total: 0 };

  return {
    cart,
    error,
    loading,
  };
}

export const isCartSidebarOpenVar = makeVar<boolean>(false);

export const useCartSidebar = () => {
  const isSidebarOpen = useReactiveVar(isCartSidebarOpenVar);

  const openSidebar = () => isCartSidebarOpenVar(true);
  const closeSidebar = () => isCartSidebarOpenVar(false);

  const location = useLocation();
  const isOnCartPage = location.pathname === '/cart';

  return {
    isSidebarOpen: isOnCartPage ? false : isSidebarOpen,
    openSidebar,
    closeSidebar,
  };
};

export function useRemoveFromCart() {
  const [removeFromCart, { loading, error }] = useMutation(REMOVE_PRODUCT_FROM_CART, {
    refetchQueries: [GET_CART],
  });

  const handleRemoveProductFromCart = (productId: number) =>
    removeFromCart({ variables: { productId } });

  return { removeFromCart: handleRemoveProductFromCart, loading, error };
}

export function useUpdateCartItemQuantity() {
  const [updateCartItemQuantity, { loading, error }] = useMutation(UPDATE_CART_ITEM_QUANTITY, {
    refetchQueries: [GET_CART],
  });

  const handleUpdateCartItemQuantity = (productId: number, quantity: number, action = 'set') =>
    updateCartItemQuantity({ variables: { productId, quantity, action } });

  return { updateCartItemQuantity: handleUpdateCartItemQuantity, loading, error };
}

export function useCheckoutCart() {
  const [checkoutCart, { loading, error }] = useMutation(CHECKOUT_CART, {
    onCompleted: () => {
      client.resetStore();
    },
  });
  const { closeSidebar } = useCartSidebar();

  const handleCheckoutCart = () => {
    closeSidebar();
    return checkoutCart();
  };

  return { checkoutCart: handleCheckoutCart, loading, error };
}

export function useAddToCart() {
  const { openSidebar } = useCartSidebar();
  const { openModal } = useLoginModal();
  const { isAuthenticated } = useAuth();
  const [addToCart, { loading, error }] = useMutation(ADD_PRODUCT_TO_CART, {
    refetchQueries: [GET_CART],
    onCompleted: () => {
      toast.success('Product added to cart');
    },
  });

  const handleAddProductToCart = (productId: number, quantity = 1) => {
    if (!isAuthenticated) {
      return openModal();
    }
    addToCart({ variables: { productId, quantity } });
    return openSidebar();
  };

  return { addToCart: handleAddProductToCart, loading, error };
}
