import { useMutation, useQuery } from '@apollo/client';
import { OrderEvents, OrderStatus } from '@jsmarket/state-machines';
import { toast } from 'sonner';

import { GET_ORDERS, GET_ORDERS_STATUS_LOGS, GET_ORDER, UPDATE_ORDER_STATUS, TOrder, TOrderStatusHistory } from '../queries/orders';

export const useOrders = (admin?: boolean) => {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, { variables: { admin } });

  const orders: TOrder[] = data?.orders || [];

  const handleRefetchWithStatusFilter = (status: OrderStatus | '') => {
    if (status === '') {
      refetch({ admin, status: null });
    } else {
      refetch({ admin, status });
    }
  };

  return { orders, loading, error, refetch: handleRefetchWithStatusFilter };
};

export const useOrdersStatusLogs = () => {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS_STATUS_LOGS, {
    fetchPolicy: 'network-only'
  });

  const statusLogs: TOrderStatusHistory[] = data?.ordersStatusLogs || [];

  const handleRefetch = (orderId: number) => {
    refetch({ orderId });
  };

  return { statusLogs, loading, error, refetch: handleRefetch };
};

export const useOrder = (orderId?: number) => {
  const { data, loading, error } = useQuery(GET_ORDER, { variables: { orderId }, skip: !orderId });

  const order: TOrder = data?.order;

  return { order, loading, error };
};

export const useUpdateOrderStatus = () => {
  const [updateOrderStatus, { loading, error }] = useMutation(UPDATE_ORDER_STATUS, {
    onError: (error) => {
      toast.error(error.message, {
        duration: 6000,
        position: 'bottom-center',
      });
    },
  });

  const handleUpdateOrderStatus = (orderId: number, event: OrderEvents, comment?: string, updateStatusLogs?: boolean) => {
    updateOrderStatus({
      variables: { orderId: parseInt(orderId.toString()), event, comment },
      refetchQueries: [GET_ORDERS, updateStatusLogs ? GET_ORDERS_STATUS_LOGS : ''],
      onCompleted: () => {
        toast.success('Order status updated successfully');
      },
    });
  };

  return { updateOrderStatus: handleUpdateOrderStatus, loading, error };
};
