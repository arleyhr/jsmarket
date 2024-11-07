import { gql } from "@apollo/client";

import { TUser } from "./user";

const DEFAULT_ORDER_FIELDS = `
  id
  status
  total
  createdAt
  updatedAt
  user {
    email
    firstName
    lastName
    role
  }
  items {
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
`;

const GET_ORDERS = gql`
  query GetOrders($admin: Boolean, $status: OrderStatus) {
    orders(admin: $admin, status: $status) {
      ${DEFAULT_ORDER_FIELDS}
    }
  }
`;

const GET_ORDERS_STATUS_LOGS = gql`
  query GetOrdersStatusLogs($orderId: Int) {
    ordersStatusLogs(orderId: $orderId) {
      id
      orderId
      status
      previousStatus
      comment
      createdAt
  }
  }
`;

const GET_ORDER = gql`
  query GetOrder($orderId: Int!) {
    order(orderId: $orderId) {
      ${DEFAULT_ORDER_FIELDS}
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: Int!, $event: OrderEvents!, $comment: String) {
    updateOrderStatus(orderId: $orderId, event: $event, comment: $comment) {
      ${DEFAULT_ORDER_FIELDS}
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
  items: TOrderItem[];
  statusHistory: TOrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
};

export { GET_ORDERS, GET_ORDERS_STATUS_LOGS, GET_ORDER, UPDATE_ORDER_STATUS };
