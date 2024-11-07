import { StateTransitions } from '../types';
import { handleStateTransition } from '../utils/state-machine';

import { OrderEvents, OrderStatus, UserRole } from './order-machine.types';

const DEFAULT_MAX_AMOUNT_FOR_REVIEW = 1000;

export const orderStateMachine: StateTransitions<OrderStatus, OrderEvents, UserRole> = {
  [OrderStatus.Pending]: [
    {
      allowedEvents: [OrderEvents.startPreparation],
      nextStatus: OrderStatus.StartPreparation,
      condition: (_, role, orderAmount, maxAmountForReview) => {
        if (role !== UserRole.ADMIN) {
          throw new Error('Only admins can start preparation');
        }

        return orderAmount <= maxAmountForReview;
      },
    },
    {
      allowedEvents: [OrderEvents.startPreparation],
      nextStatus: OrderStatus.Review,
      condition: (_, role, orderAmount, maxAmountForReview) => {
        if (role !== UserRole.ADMIN) {
          throw new Error('Only admins can approve review');
        }

        return orderAmount > maxAmountForReview;
      },
    },
    {
      allowedEvents: [OrderEvents.cancel],
      nextStatus: OrderStatus.Canceled,
    },
  ],
  [OrderStatus.Review]: [
    {
      allowedEvents: [OrderEvents.approveReview],
      nextStatus: OrderStatus.StartPreparation,
      condition: (_, role) => {
        if (role !== UserRole.ADMIN) {
          throw new Error('Only admins can approve review');
        }

        return true;
      },
    },
    {
      allowedEvents: [OrderEvents.cancel],
      nextStatus: OrderStatus.Canceled,
    },
  ],
  [OrderStatus.StartPreparation]: [
    {
      allowedEvents: [OrderEvents.ship],
      nextStatus: OrderStatus.Shipped,
      condition: (_, role) => {
        if (role !== UserRole.ADMIN) {
          throw new Error('Only admins can ship');
        }

        return true;
      },
    },
    {
      allowedEvents: [OrderEvents.cancel],
      nextStatus: OrderStatus.Canceled,
    },
  ],
  [OrderStatus.Shipped]: [
    {
      allowedEvents: [OrderEvents.deliver],
      nextStatus: OrderStatus.Delivered,
    },
  ],
  [OrderStatus.Delivered]: [],
  [OrderStatus.Canceled]: [],
};

export function getNextOrderStatus(
  status: OrderStatus,
  event: OrderEvents,
  role: UserRole,
  orderAmount: number,
  maxAmountForReview = DEFAULT_MAX_AMOUNT_FOR_REVIEW,
): OrderStatus {
  return handleStateTransition(orderStateMachine, status, event, role, orderAmount, maxAmountForReview);
}

export const canCancelOrder = (status: OrderStatus): boolean => {
  return status !== OrderStatus.Shipped && status !== OrderStatus.Delivered && status !== OrderStatus.Canceled;
}

export const getNextEvent = (currentStatus: OrderStatus) => {
  const nextEventMap = {
    [OrderStatus.Pending]: OrderEvents.startPreparation,
    [OrderStatus.Review]: OrderEvents.approveReview,
    [OrderStatus.StartPreparation]: OrderEvents.ship,
    [OrderStatus.Shipped]: OrderEvents.deliver,
    [OrderStatus.Delivered]: null,
    [OrderStatus.Canceled]: null
  }

  return nextEventMap[currentStatus] || null;
}
