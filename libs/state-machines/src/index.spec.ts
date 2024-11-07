import { getNextOrderStatus } from './lib/order/order-machine';
import { OrderEvents, OrderStatus, UserRole } from './lib/order/order-machine.types';

describe('State Machine', () => {
  describe('Order State Machine', () => {
    const maxAmountForReview = 1000;

    describe('From Pending status', () => {
      it('should transition to Start Preparation when amount <= maxAmountForReview and role is admin', () => {
        expect(
          getNextOrderStatus(OrderStatus.Pending, OrderEvents.startPreparation, UserRole.ADMIN, 500, maxAmountForReview)
        ).toBe(OrderStatus.StartPreparation);
      });

      it('should transition to Review when amount > maxAmountForReview and role is admin', () => {
        expect(
          getNextOrderStatus(OrderStatus.Pending, OrderEvents.startPreparation, UserRole.ADMIN, 1500, maxAmountForReview)
        ).toBe(OrderStatus.Review);
      });

      it('should transition to Canceled when cancel event', () => {
        expect(
          getNextOrderStatus(OrderStatus.Pending, OrderEvents.cancel, UserRole.USER, 500, maxAmountForReview)
        ).toBe(OrderStatus.Canceled);
      });

      it('should throw error when user role tries to start preparation', () => {
        expect(() =>
          getNextOrderStatus(OrderStatus.Pending, OrderEvents.startPreparation, UserRole.USER, 500, maxAmountForReview)
        ).toThrow('Only admins can start preparation');
      });
    });

    describe('From Review status', () => {
      it('should transition to Start Preparation when approved by admin', () => {
        expect(
          getNextOrderStatus(OrderStatus.Review, OrderEvents.approveReview, UserRole.ADMIN, 1500, maxAmountForReview)
        ).toBe(OrderStatus.StartPreparation);
      });

      it('should throw error when user tries to approve review', () => {
        expect(() =>
          getNextOrderStatus(OrderStatus.Review, OrderEvents.approveReview, UserRole.USER, 1500, maxAmountForReview)
        ).toThrow('Only admins can approve review');
      });
    });

    describe('From Start Preparation status', () => {
      it('should transition to Shipped when shipped by admin', () => {
        expect(
          getNextOrderStatus(OrderStatus.StartPreparation, OrderEvents.ship, UserRole.ADMIN, 500, maxAmountForReview)
        ).toBe(OrderStatus.Shipped);
      });

      it('should throw error when user tries to ship', () => {
        expect(() =>
          getNextOrderStatus(OrderStatus.StartPreparation, OrderEvents.ship, UserRole.USER, 500, maxAmountForReview)
        ).toThrow('Only admins can ship');
      });
    });

    describe('From Shipped status', () => {
      it('should transition to Delivered when delivered', () => {
        expect(
          getNextOrderStatus(OrderStatus.Shipped, OrderEvents.deliver, UserRole.USER, 500, maxAmountForReview)
        ).toBe(OrderStatus.Delivered);
      });
    });

    describe('From terminal states', () => {
      it('should throw error when trying to transition from Delivered status', () => {
        expect(() =>
          getNextOrderStatus(OrderStatus.Delivered, OrderEvents.ship, UserRole.ADMIN, 500, maxAmountForReview)
        ).toThrow('Transition not allowed');
      });

      it('should throw error when trying to transition from Canceled status', () => {
        expect(() =>
          getNextOrderStatus(OrderStatus.Canceled, OrderEvents.ship, UserRole.ADMIN, 500, maxAmountForReview)
        ).toThrow('Transition not allowed');
      });
    });
  });
});
