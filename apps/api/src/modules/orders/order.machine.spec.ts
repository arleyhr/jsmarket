import { User, UserRole } from '../auth/entities/user.entity';

import { Order } from './entities/order.entity';
import { getNextOrderStatus, OrderEvents, OrderStatus } from './order.machine';

describe('Order State Machine', () => {
  let adminUser: User;
  let customerUser: User;
  let order: Order;

  beforeEach(() => {
    adminUser = { role: UserRole.ADMIN } as User;
    customerUser = { role: UserRole.USER } as User;
    order = new Order();
  });

  describe('From Pending state', () => {
    beforeEach(() => {
      order.status = OrderStatus.Pending;
    });

    it('should transition to StartPreparation if amount is less than 1000 and user is admin', () => {
      order.total = 500;
      const nextStatus = getNextOrderStatus(order, OrderEvents.startPreparation, adminUser);
      expect(nextStatus).toBe(OrderStatus.StartPreparation);
    });

    it('should transition to Review if amount is greater than 1000 and user is admin', () => {
      order.total = 1500;
      const nextStatus = getNextOrderStatus(order, OrderEvents.startPreparation, adminUser);
      expect(nextStatus).toBe(OrderStatus.Review);
    });

    it('should transition to Canceled with cancel event', () => {
      const nextStatus = getNextOrderStatus(order, OrderEvents.cancel, customerUser);
      expect(nextStatus).toBe(OrderStatus.Canceled);
    });

    it('should fail if a non-admin user tries to start preparation', () => {
      expect(() => {
        getNextOrderStatus(order, OrderEvents.startPreparation, customerUser);
      }).toThrow();
    });
  });

  describe('From Review state', () => {
    beforeEach(() => {
      order.status = OrderStatus.Review;
    });

    it('should transition to StartPreparation if user is admin', () => {
      const nextStatus = getNextOrderStatus(order, OrderEvents.approveReview, adminUser);
      expect(nextStatus).toBe(OrderStatus.StartPreparation);
    });

    it('should fail if a non-admin user tries to approve', () => {
      expect(() => {
        getNextOrderStatus(order, OrderEvents.approveReview, customerUser);
      }).toThrow();
    });
  });

  describe('From StartPreparation state', () => {
    beforeEach(() => {
      order.status = OrderStatus.StartPreparation;
    });

    it('should transition to Shipped if user is admin', () => {
      const nextStatus = getNextOrderStatus(order, OrderEvents.ship, adminUser);
      expect(nextStatus).toBe(OrderStatus.Shipped);
    });

    it('should fail if a non-admin user tries to ship', () => {
      expect(() => {
        getNextOrderStatus(order, OrderEvents.ship, customerUser);
      }).toThrow();
    });
  });

  describe('From Shipped state', () => {
    beforeEach(() => {
      order.status = OrderStatus.Shipped;
    });

    it('should transition to Delivered if user is admin', () => {
      const nextStatus = getNextOrderStatus(order, OrderEvents.deliver, adminUser);
      expect(nextStatus).toBe(OrderStatus.Delivered);
    });

    it('should transition to Delivered if user is customer', () => {
      const nextStatus = getNextOrderStatus(order, OrderEvents.deliver, customerUser);
      expect(nextStatus).toBe(OrderStatus.Delivered);
    });

  });

  describe('Final states', () => {
    it('should fail when trying to transition from Delivered', () => {
      order.status = OrderStatus.Delivered;
      expect(() => {
        getNextOrderStatus(order, OrderEvents.deliver, adminUser);
      }).toThrow();
    });

    it('should fail when trying to transition from Canceled', () => {
      order.status = OrderStatus.Canceled;
      expect(() => {
        getNextOrderStatus(order, OrderEvents.startPreparation, adminUser);
      }).toThrow();
    });
  });
});
