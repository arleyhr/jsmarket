import { Test, TestingModule } from '@nestjs/testing';

import { UserRole } from '../auth/entities/user.entity';

import { OrderEvents, OrderStatus } from './order.machine';
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
    username: 'testuser',
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
    processOrderStatusUpdate: jest.fn()
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
  });

  describe('getOrder', () => {
    it('should get an order by id', async () => {
      mockOrdersService.getOrder.mockResolvedValue(mockOrder);

      const result = await resolver.getOrder(1, mockUser);

      expect(result).toEqual(mockOrder);
      expect(mockOrdersService.getOrder).toHaveBeenCalledWith(1, mockUser);
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
  });
});
