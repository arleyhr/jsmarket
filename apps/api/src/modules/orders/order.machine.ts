import { registerEnumType } from "@nestjs/graphql";

import { User } from "../auth/entities/user.entity";
import { UserRole } from "../auth/entities/user.entity";

import { Order } from "./entities/order.entity";

export enum OrderStatus {
  Pending = 'Pending',
  Review = 'Review',
  StartPreparation = 'Start Preparation',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}


export enum OrderEvents {
  startPreparation = 'startPreparation',
  cancel = 'cancel',
  ship = 'ship',
  deliver = 'deliver',
  approveReview = 'approveReview',
}

registerEnumType(OrderEvents, {
  name: 'OrderEvents',
});


const AMMOUNT_FOR_REVIEW = 1000;

type StateTransitions = Record<
  OrderStatus,
  {
    allowedEvents: OrderEvents[];
    nextStatus: OrderStatus;
    condition?: (order: Order, userContext: User) => boolean;
  }[]
>;

export const orderStateMachine: StateTransitions = {
  [OrderStatus.Pending]: [
    {
      allowedEvents: [OrderEvents.startPreparation],
      nextStatus: OrderStatus.StartPreparation,
      condition: (order, user) => user.role === UserRole.ADMIN && order.total <= AMMOUNT_FOR_REVIEW,
    },
    {
      allowedEvents: [OrderEvents.startPreparation],
      nextStatus: OrderStatus.Review,
      condition: (order, user) => user.role === UserRole.ADMIN && order.total > AMMOUNT_FOR_REVIEW,
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
      condition: (_, user) => user.role === UserRole.ADMIN,
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
      condition: (_, user) => user.role === UserRole.ADMIN,
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


export function getNextOrderStatus(order: Order, event: OrderEvents, user: User): OrderStatus {
  const possibleTransitions = orderStateMachine[order.status];
  const transition = possibleTransitions.find(
    t => t.allowedEvents.includes(event) && (!t.condition || t.condition(order, user))
  );

  if (!transition) {
    throw new Error(`Transition not allowed from ${order.status} with event ${event}`);
  }

  const nextStatus = transition.nextStatus;

  if (nextStatus === order.status) {
    throw new Error('Transition does not produce changes in the status');
  }

  return nextStatus;
}
