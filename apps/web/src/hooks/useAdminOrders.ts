import { OrderEvents, OrderStatus } from "@jsmarket/state-machines";
import { useReducer } from "react";

import client from "../apollo";
import { GET_ORDER, TOrder } from "../queries/orders";

import { useOrders, useOrdersStatusLogs, useUpdateOrderStatus } from "./useOrders";

const adminView = true;

type State = {
  selectedOrder: TOrder | null;
  currentTab: 'orders' | 'statusHistory';
  cancelOrderId: number | null;
  cancelReason: string;
  statusFilter: OrderStatus | '';
  historyOrderId: number | null;
}

type Action =
  | { type: 'SET_SELECTED_ORDER'; payload: TOrder | null }
  | { type: 'SET_CURRENT_TAB'; payload: 'orders' | 'statusHistory' }
  | { type: 'SET_CANCEL_ORDER_ID'; payload: number | null }
  | { type: 'SET_CANCEL_REASON'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: OrderStatus }
  | { type: 'SET_STATUS_HISTORY_ORDER_ID'; payload: number }
  | { type: 'RESET_CANCEL' };

const initialState: State = {
  selectedOrder: null,
  currentTab: 'orders',
  cancelOrderId: null,
  cancelReason: '',
  statusFilter: '',
  historyOrderId: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SELECTED_ORDER':
      return { ...state, selectedOrder: action.payload };
    case 'SET_CURRENT_TAB':
      return { ...state, currentTab: action.payload };
    case 'SET_CANCEL_ORDER_ID':
      return { ...state, cancelOrderId: action.payload };
    case 'SET_CANCEL_REASON':
      return { ...state, cancelReason: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };
    case 'SET_STATUS_HISTORY_ORDER_ID':
      return { ...state, historyOrderId: action.payload };
    case 'RESET_CANCEL':
      return { ...state, cancelOrderId: null, cancelReason: '' };
    default:
      return state;
  }
}

export const useAdminOrders = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { orders, loading, refetch } = useOrders(adminView);
  const { updateOrderStatus, loading: updateLoading } = useUpdateOrderStatus();
  const { statusLogs, loading: statusLogsLoading, refetch: refetchStatusLogs } = useOrdersStatusLogs();

  const handleStatusChange = (orderId: number, action: OrderEvents) => {
    const updateStatusLogs = true;
    updateOrderStatus(orderId, action as OrderEvents, '', updateStatusLogs);
  };

  const handleCancel = (orderId: number) => {
    dispatch({ type: 'SET_CANCEL_ORDER_ID', payload: orderId });
  };

  const confirmCancelOrder = () => {
    if (state.cancelOrderId) {
      const updateStatusLogs = true;
      updateOrderStatus(state.cancelOrderId, OrderEvents.cancel, state.cancelReason, updateStatusLogs);
      dispatch({ type: 'RESET_CANCEL' });
    }
  };

  const setCurrentTab = (tab: 'orders' | 'statusHistory') => {
    dispatch({ type: 'SET_CURRENT_TAB', payload: tab });
  };

  const setSelectedOrder = (order: TOrder | null) => {
    dispatch({ type: 'SET_SELECTED_ORDER', payload: order });
  };

  const setCancelOrderId = (id: number | null) => {
    dispatch({ type: 'SET_CANCEL_ORDER_ID', payload: id });
  };

  const setCancelReason = (reason: string) => {
    dispatch({ type: 'SET_CANCEL_REASON', payload: reason });
  };

  const setStatusFilter = (status: OrderStatus) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status });
    refetch(status);
  };

  const setHistoryOrderId = (orderId: number) => {
    dispatch({ type: 'SET_STATUS_HISTORY_ORDER_ID', payload: orderId });
    refetchStatusLogs(orderId);
  };

  const getOrder = async (orderId: number) => {
    if (!orderId) {
      setSelectedOrder(null);
      return;
    }

    const result = await client.query({ query: GET_ORDER, variables: { orderId: parseInt(orderId.toString()) } });

    if (result.data.order) {
      setSelectedOrder(result.data.order);
    }
  };

  return {
    state,
    orders,
    statusLogs,
    loading,
    getOrder,
    handleStatusChange,
    handleCancel,
    confirmCancelOrder,
    setCurrentTab,
    setSelectedOrder,
    setCancelOrderId,
    setCancelReason,
    updateLoading,
    statusLogsLoading,
    setStatusFilter,
    setHistoryOrderId,
  };
}
