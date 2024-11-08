import TabButton from '../components/buttons/tab';
import LoadingBlock from '../components/loading/loading-block';
import ConfirmCancelOrderModal from '../components/orders/cancel-confirm-modal';
import OrderAdminCard from '../components/orders/order-admin-card';
import OrderDetailModal from '../components/orders/order-detail-modal';
import OrderLogItem from '../components/orders/order-log-item';
import OrderStatusUpdateModal from '../components/orders/order-status-update-modal';
import { StatusDropdown } from '../components/orders/status-dropdown';
import { useAdminOrders } from '../hooks/useAdminOrders';

export default function OrdersAdmin() {
  const {
    state,
    orders,
    statusLogs,
    statusLogsLoading,
    loading,
    handleStatusChange,
    handleCancel,
    confirmCancelOrder,
    getOrder,
    setCurrentTab,
    setSelectedOrder,
    setCancelOrderId,
    setCancelReason,
    updateLoading,
    setStatusFilter,
    setHistoryOrderId,
    setStatusComment,
    closeStatusUpdateModal,
    confirmStatusUpdate
  } = useAdminOrders();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Orders Administration Panel</h1>

      <div className="border-b">
        <nav className="flex justify-center space-x-8 -mb-px">
          <TabButton
            isActive={state.currentTab === 'orders'}
            label="Orders"
            onClick={() => setCurrentTab('orders')}
          />
          <TabButton
            isActive={state.currentTab === 'statusHistory'}
            label="Status History"
            onClick={() => setCurrentTab('statusHistory')}
          />
        </nav>
      </div>

      {state.currentTab === 'orders' && (
        <div className="p-6">
          <StatusDropdown value={state.statusFilter} onChange={status => setStatusFilter(status)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <LoadingBlock />}
            {orders.length === 0 && !loading && (
              <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg mb-2">No orders to display</p>
              </div>
            )}
            {orders.map(order => (
              <OrderAdminCard
                key={order.id}
                orderId={order.id}
                status={order.status}
                total={order.total}
                onChangeStatus={action => handleStatusChange(order.id, action)}
                onViewDetails={() => setSelectedOrder(order)}
                onCancel={() => handleCancel(order.id)}
                createdAt={new Date(order.createdAt)}
                customerName={`${order.user.firstName} ${order.user.lastName}`}
              />
            ))}
          </div>
        </div>
      )}

      {state.currentTab === 'statusHistory' && (
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
            <input
              type="number"
              className="min-w-[200px] rounded-md border border-gray-300 py-2 px-4 text-gray-600 placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 hover:border-gray-400"
              placeholder="Search by Order ID"
              value={state.historyOrderId || ''}
              onChange={e => setHistoryOrderId(parseInt(e.target.value))}
            />
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {statusLogs.map(log => (
                <OrderLogItem
                  key={log.id}
                  orderId={log.orderId}
                  previousStatus={log.previousStatus}
                  status={log.status}
                  timestamp={new Date(log.createdAt)}
                  viewOrderDetail={() => getOrder(log.orderId)}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      {state.cancelOrderId && (
        <ConfirmCancelOrderModal
          cancelReason={state.cancelReason}
          onCancel={() => setCancelOrderId(null)}
          onConfirm={confirmCancelOrder}
          onReasonChange={reason => setCancelReason(reason)}
          loading={updateLoading}
        />
      )}

      {state.selectedOrder && (
        <OrderDetailModal
          orderId={state.selectedOrder?.id}
          status={state.selectedOrder?.status}
          comment={state.selectedOrder?.statusHistory?.find(log => log.status === state.selectedOrder?.status)?.comment || ''}
          date={state.selectedOrder?.createdAt}
          total={state.selectedOrder?.total}
          items={state.selectedOrder?.items}
          customerName={`${state.selectedOrder?.user.firstName} ${state.selectedOrder?.user.lastName}`}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {state.statusUpdateModal.isOpen && (
        <OrderStatusUpdateModal
          loading={updateLoading}
          comment={state.statusUpdateModal.comment}
          onCancel={closeStatusUpdateModal}
          onConfirm={confirmStatusUpdate}
          onCommentChange={comment => setStatusComment(comment)}
          action={state.statusUpdateModal.action!}
        />
      )}
    </div>
  );
}
