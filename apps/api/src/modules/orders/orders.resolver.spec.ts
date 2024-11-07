import { OrderEvents, OrderStatus } from '@jsmarket/state-machines';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRole } from '../auth/entities/user.entity';

import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;
  let ordersService: OrdersService;

  const mockUser = {
    id: 1,
    email: 'test@test.com',
    role: UserRole.USER,
    password: 'password',
    hashPassword: jest.fn(),
    firstName: 'Test',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockOrder = {
    id: 1,
    user: mockUser,
    total: 100,
    status: OrderStatus.Pending,
    shippingAddress: '123 Test St, Test City, TS, 12345',
    billingAddress: '123 Test St, Test City, TS, 12345',
    items: [],
    statusHistory: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockOrdersService = {
    createOrder: jest.fn(),
    getOrder: jest.fn(),
    processOrderStatusUpdate: jest.fn(),
    getOrders: jest.fn(),
    getOrdersStatusLogs: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersResolver,
        {
          provide: OrdersService,
          useValue: mockOrdersService
        }
      ],
    }).compile();

    resolver = module.get<OrdersResolver>(OrdersResolver);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      mockOrdersService.createOrder.mockResolvedValue(mockOrder);

      const result = await resolver.createOrder(mockUser);

      expect(result).toEqual(mockOrder);
      expect(mockOrdersService.createOrder).toHaveBeenCalledWith(mockUser.id, mockUser);
    });

    it('should throw error if order creation fails', async () => {
      mockOrdersService.createOrder.mockRejectedValue(new Error('Failed to create order'));

      await expect(resolver.createOrder(mockUser)).rejects.toThrow('Failed to create order');
    });
  });

  describe('getOrder', () => {
    it('should get an order by id', async () => {
      mockOrdersService.getOrder.mockResolvedValue(mockOrder);

      const result = await resolver.getOrder(1, mockUser);

      expect(result).toEqual(mockOrder);
      expect(mockOrdersService.getOrder).toHaveBeenCalledWith(1, mockUser);
    });

    it('should throw error if order not found', async () => {
      mockOrdersService.getOrder.mockRejectedValue(new Error('Order not found'));

      await expect(resolver.getOrder(999, mockUser)).rejects.toThrow('Order not found');
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status', async () => {
      mockOrdersService.processOrderStatusUpdate.mockResolvedValue(mockOrder);

      const result = await resolver.updateOrderStatus(
        mockUser,
        1,
        OrderEvents.startPreparation,
        'Test comment'
      );

      expect(result).toEqual(mockOrder);
      expect(mockOrdersService.processOrderStatusUpdate).toHaveBeenCalledWith(
        1,
        mockUser,
        OrderEvents.startPreparation,
        'Test comment'
      );
    });

    it('should throw error if status update fails', async () => {
      mockOrdersService.processOrderStatusUpdate.mockRejectedValue(new Error('Invalid status transition'));

      await expect(
        resolver.updateOrderStatus(mockUser, 1, OrderEvents.startPreparation)
      ).rejects.toThrow('Invalid status transition');
    });
  });

  describe('getOrders', () => {
    it('should get all orders for user', async () => {
      const mockOrders = [mockOrder];
      mockOrdersService.getOrders.mockResolvedValue(mockOrders);

      const result = await resolver.getOrders(mockUser);
      expect(result).toEqual(mockOrders);
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith(mockUser, undefined, undefined);
    });

    it('should get filtered orders by status', async () => {
      const mockOrders = [mockOrder];
      mockOrdersService.getOrders.mockResolvedValue(mockOrders);

      const result = await resolver.getOrders(mockUser, false, OrderStatus.Pending);

      expect(result).toEqual(mockOrders);
      expect(mockOrdersService.getOrders).toHaveBeenCalledWith(mockUser, false, OrderStatus.Pending);
    });
  });

  describe('getOrdersStatusLogs', () => {
    it('should get status logs for all orders', async () => {
      const mockLogs = [{
        id: 1,
        orderId: 1,
        status: OrderStatus.Pending,
        previousStatus: null,
        comment: 'Initial status',
        createdAt: new Date()
      }];
      mockOrdersService.getOrdersStatusLogs.mockResolvedValue(mockLogs);

      const result = await resolver.getOrdersStatusLogs();

      expect(result).toEqual(mockLogs);
      expect(mockOrdersService.getOrdersStatusLogs).toHaveBeenCalledWith(undefined);
    });

    it('should get status logs for specific order', async () => {
      const mockLogs = [{
        id: 1,
        orderId: 1,
        status: OrderStatus.Pending,
        previousStatus: null,
        comment: 'Initial status',
        createdAt: new Date()
      }];
      mockOrdersService.getOrdersStatusLogs.mockResolvedValue(mockLogs);

      const result = await resolver.getOrdersStatusLogs(1);

      expect(result).toEqual(mockLogs);
      expect(mockOrdersService.getOrdersStatusLogs).toHaveBeenCalledWith(1);
    });
  });
});
