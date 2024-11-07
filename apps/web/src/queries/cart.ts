import { gql } from "@apollo/client";

const DEFAULT_CART_FIELDS = `
  total
  items {
    id
    price
    productId
    productImage
    productName
    quantity
    createdAt
    updatedAt
  }
`;

const GET_CART = gql`
  query GetCart {
    cart {
      ${DEFAULT_CART_FIELDS}
    }
  }
`;

const ADD_PRODUCT_TO_CART = gql`
  mutation AddItemToCart($productId: Float!, $quantity: Float!) {
    addItemToCart(productId: $productId, quantity: $quantity) {
      ${DEFAULT_CART_FIELDS}
    }
  }
`;

const REMOVE_PRODUCT_FROM_CART = gql`
  mutation RemoveItemFromCart($productId: Float!) {
    removeItemFromCart(productId: $productId) {
      ${DEFAULT_CART_FIELDS}
    }
  }
`;

const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($productId: Float!, $action: String!, $quantity: Float!) {
    updateItemQuantity(productId: $productId, action: $action, quantity: $quantity) {
      ${DEFAULT_CART_FIELDS}
    }
  }
`;

const CHECKOUT_CART = gql`
  mutation CheckoutCart {
    createOrder {
      id
      status
      total
    }
  }
`;

export type TCartItem = {
  id: number;
  price: number;
  productId: number;
  productImage: string;
  productName: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type TCart = {
  total: number;
  items: TCartItem[];
};

export { ADD_PRODUCT_TO_CART, CHECKOUT_CART, GET_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_CART_ITEM_QUANTITY };
