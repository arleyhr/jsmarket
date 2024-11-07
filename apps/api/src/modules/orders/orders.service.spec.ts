import { OrderEvents, OrderStatus } from '@jsmarket/state-machines';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { DatabaseTestingModule } from '../../test-utils/database.module';
import { User, UserRole } from '../auth/entities/user.entity';
import { CartItem } from '../carts/entities/cart-item.entity';
import { Cart } from '../carts/entities/cart.entity';

import { Order, OrderItem, OrderStatusHistory } from './entities/order.entity';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: Repository<Order>;
  let orderItemRepository: Repository<OrderItem>;
  let orderStatusHistoryRepository: Repository<OrderStatusHistory>;
  let cartRepository: Repository<Cart>;
  let dataSource: DataSource;

  const mockUser: User = {
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

  const mockOrder: Order = {
    id: 1,
    userId: mockUser.id,
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

  const mockCartRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockOrderRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockOrderItemRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockOrderStatusHistoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseTestingModule([User, Cart, CartItem, Order, OrderItem, OrderStatusHistory]),
        TypeOrmModule.forFeature([User, Cart, CartItem, Order, OrderItem, OrderStatusHistory])
      ],
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useValue: mockOrderItemRepository,
        },
        {
          provide: getRepositoryToken(OrderStatusHistory),
          useValue: mockOrderStatusHistoryRepository,
        },
        {
          provide: getRepositoryToken(Cart),
          useValue: mockCartRepository,
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
              manager: {
                save: jest.fn(),
              },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderItemRepository = module.get<Repository<OrderItem>>(getRepositoryToken(OrderItem));
    orderStatusHistoryRepository = module.get<Repository<OrderStatusHistory>>(getRepositoryToken(OrderStatusHistory));
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrder', () => {
    it('should return an order for regular user', async () => {
      const mockOrder = {
        id: 1,
        userId: 1,
        user: {
          id: 1,
          email: 'test@test.com',
          role: UserRole.USER,
          password: 'password',
          hashPassword: jest.fn(),
          firstName: 'Test',
          lastName: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        items: [],
        status: OrderStatus.Pending,
        total: 100,
        shippingAddress: '123 Test St',
        billingAddress: '123 Test St',
        statusHistory: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockOrderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await service.getOrder(1, mockUser);
      expect(result).toEqual(mockOrder);
    });

    it('should throw error if order not found', async () => {
      mockOrderRepository.findOne.mockResolvedValue(null);

      await expect(service.getOrder(1, mockUser)).rejects.toThrow('Order not found');
    });

    it('should return order status logs', async () => {
      const mockOrderStatusHistory = {
        id: 1,
        order: mockOrder,
        status: OrderStatus.Pending,
        previousStatus: OrderStatus.Pending,
        comment: 'Test comment',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockOrderStatusHistoryRepository.find.mockResolvedValue([mockOrderStatusHistory]);
      const result = await service.getOrdersStatusLogs();
      expect(result).toEqual([mockOrderStatusHistory]);
    });
  });

  describe('createOrder', () => {
    it('should create an order from active cart', async () => {
      const mockCart = {
        id: 1,
        user: mockUser,
        items: [
          {
            productId: 1,
            productName: 'Test Product',
            productImage: 'test.jpg',
            price: 50,
            quantity: 2
          }
        ],
        isActive: true
      };

      const newMockOrder = {
        ...mockOrder,
        items: [],
        statusHistory: []
      };

      mockCartRepository.findOne.mockResolvedValue(mockCart);
      mockOrderRepository.create.mockReturnValue(newMockOrder);
      mockOrderRepository.save.mockResolvedValue(newMockOrder);
      jest.spyOn(service, 'getOrder').mockResolvedValue(newMockOrder);

      const result = await service.createOrder(1, mockUser);
      expect(result).toEqual(newMockOrder);
    });

    it('should throw error if no active cart found', async () => {
      mockCartRepository.findOne.mockResolvedValue(null);

      await expect(service.createOrder(1, mockUser)).rejects.toThrow('Cart not found');
    });
  });

  describe('processOrderStatusUpdate', () => {
    it('should update order status', async () => {
      jest.spyOn(service, 'changeOrderStatus').mockResolvedValue(mockOrder);

      const result = await service.processOrderStatusUpdate(1, mockUser, OrderEvents.startPreparation);
      expect(result).toEqual(mockOrder);
    });

    it('should throw error if status update fails', async () => {
      jest.spyOn(service, 'changeOrderStatus').mockRejectedValue(new Error('Update failed'));

      await expect(
        service.processOrderStatusUpdate(1, mockUser, OrderEvents.deliver)
      ).rejects.toThrow('Order status update error: Update failed');
    });
  });

  describe('getOrders', () => {
    it('should return orders for regular user', async () => {
      const mockOrders = [mockOrder];
      mockOrderRepository.find.mockResolvedValue(mockOrders);

      const result = await service.getOrders(mockUser);
      expect(result).toEqual(mockOrders);
    });

    it('should return all orders for admin user', async () => {
      const adminUser = {
        ...mockUser,
        role: UserRole.ADMIN,
        hashPassword: jest.fn()
      };
      const mockOrders = [mockOrder];
      mockOrderRepository.find.mockResolvedValue(mockOrders);

      const result = await service.getOrders(adminUser, true);
      expect(result).toEqual(mockOrders);
    });

    it('should filter orders by status', async () => {
      const mockOrders = [mockOrder];
      mockOrderRepository.find.mockResolvedValue(mockOrders);

      const result = await service.getOrders(mockUser, false, OrderStatus.Pending);
      expect(result).toEqual(mockOrders);
    });
  });

  describe('changeOrderStatus', () => {
    it('should change order status successfully', async () => {
      const mockStatusHistory = {
        status: OrderStatus.StartPreparation,
        previousStatus: OrderStatus.Pending,
        comment: 'Test comment',
        createdAt: new Date()
      };

      const updatedOrder = {
        ...mockOrder,
        status: OrderStatus.StartPreparation,
        statusHistory: [mockStatusHistory]
      };
      jest.spyOn(service, 'getOrder')
        .mockResolvedValueOnce({
          ...mockOrder,
          statusHistory: [{
            id: 1,
            order: mockOrder,
            orderId: mockOrder.id,
            status: OrderStatus.Pending,
            previousStatus: null,
            comment: '',
            createdAt: new Date()
          }]
        })
        .mockResolvedValueOnce({
          ...mockOrder,
          status: OrderStatus.StartPreparation,
          statusHistory: [{
            id: 1,
            order: mockOrder,
            orderId: mockOrder.id,
            status: OrderStatus.StartPreparation,
            previousStatus: OrderStatus.Pending,
            comment: 'Test comment',
            createdAt: new Date()
          }]
        });

      mockOrderStatusHistoryRepository.create.mockReturnValue({
        id: 1,
        order: mockOrder,
        orderId: mockOrder.id,
        ...mockStatusHistory
      });
      mockOrderRepository.save.mockResolvedValue(updatedOrder);
      const result = await service.changeOrderStatus(1, OrderEvents.startPreparation, { ...mockUser, role: UserRole.ADMIN } as any, 'Test comment');
      expect(result).toMatchObject(updatedOrder);
    });

    it('should throw error if order not found', async () => {
      jest.spyOn(service, 'getOrder').mockResolvedValue(null);

      await expect(
        service.changeOrderStatus(1, OrderEvents.startPreparation, mockUser)
      ).rejects.toThrow('Order not found');
    });
  });
});
