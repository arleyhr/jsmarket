import { gql } from "@apollo/client";

import { TUser } from "./user";

const DEFAULT_CART_FIELDS = `
  total
  items {
    id
    price
    productId
    productImage
    productName
    quantity
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
    updateCartItemQuantity(productId: $productId, action: $action, quantity: $quantity) {
      ${DEFAULT_CART_FIELDS}
    }
  }
`;

const CHECKOUT_CART = gql`
  mutation CheckoutCart {
    createOrder {
      id
      user
      status
      total
      shippingAddress
      billingAddress
      items {
        id
        orderId
        productId
        productName
        productImage
        price
        quantity
        subtotal
        createdAt
        updatedAt
      }
      statusHistory {
        id
        orderId
        status
        previousStatus
        comment
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export type TOrderItem = {
  id: number;
  order: TOrder;
  orderId: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderStatusHistory = {
  id: number;
  orderId: number;
  status: string;
  previousStatus: string;
  comment: string;
  createdAt: string;
};

export type TOrder = {
  id: number;
  user: TUser;
  status: string;
  total: number;
  shippingAddress: string;
  billingAddress: string;
  items: TOrderItem[];
  statusHistory: TOrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
};

export type TCartItem = {
  id: number;
  price: number;
  productId: number;
  productImage: string;
  productName: string;
  quantity: number;
};

export type TCart = {
  total: number;
  items: TCartItem[];
};

export { ADD_PRODUCT_TO_CART, CHECKOUT_CART, GET_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_CART_ITEM_QUANTITY };
