import { OrderEvents, OrderStatus, getNextOrderStatus } from '@jsmarket/state-machines';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User, UserRole } from '../auth/entities/user.entity';
import { Cart } from '../carts/entities/cart.entity';

import {
  Order,
  OrderStatusHistory,
  OrderItem,
} from './entities/order.entity';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(OrderStatusHistory)
    private orderStatusHistoryRepository: Repository<OrderStatusHistory>,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    private dataSource: DataSource
  ) {}

  async createOrder(userId: number, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cart = await this.cartRepository.findOne({
        where: { user: { id: userId }, isActive: true },
        relations: ['items'],
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      if (cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      const order = this.orderRepository.create({
        userId: user.id,
        total: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        status: OrderStatus.Pending,
      });

      order.items = cart.items.map(item =>
        this.orderItemRepository.create({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })
      );

      order.statusHistory = [
        this.orderStatusHistoryRepository.create({
          status: OrderStatus.Pending,
          createdAt: new Date(),
        }),
      ];

      cart.isActive = false;

      await queryRunner.manager.save(order);
      await queryRunner.manager.save(cart);

      await queryRunner.commitTransaction();

      const orderResult = await this.getOrder(order.id, user);

      return orderResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrder(orderId: number, user: User) {
    const isAdmin = user.role === UserRole.ADMIN;

    const order = await this.orderRepository.findOne({
      where: { id: orderId, ...(isAdmin ? {} : { user: { id: user.id } }) },
      relations: ['items', 'statusHistory', 'user'],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async processOrderStatusUpdate(
    orderId: number,
    user: User,
    event: OrderEvents,
    comment?: string
  ) {
    try {
      const order = await this.changeOrderStatus(orderId, event, user, comment);
      return order;
    } catch (error) {
      throw new Error(`Order status update error: ${error.message}`);
    }
  }

  async changeOrderStatus(orderId: number, event: OrderEvents, user: User, comment?: string) {
    const order = await this.getOrder(orderId, user);

    if (!order) {
      throw new Error('Order not found');
    }

    const nextStatus = getNextOrderStatus(order.status as OrderStatus, event, user.role, order.total);

    order.status = nextStatus;

    const previousStatus = order.statusHistory[order.statusHistory.length - 1];
    const statusHistory = this.orderStatusHistoryRepository.create({
      status: order.status,
      previousStatus: previousStatus.status,
      comment,
      createdAt: new Date(),
    });

    order.statusHistory.push(statusHistory);

    await this.orderRepository.save(order);

    const result = await this.getOrder(orderId, user);

    return result;
  }

  async getOrders(user: User, admin?: boolean, status?: OrderStatus) {
    const isAdmin = user.role === UserRole.ADMIN && admin;

    const where = { ...(isAdmin ? {} : { user: { id: user.id } }), status };

    const orders = await this.orderRepository.find({
      where,
      relations: ['items', 'statusHistory', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });

    return orders;
  }

  async getOrdersStatusLogs(orderId?: number) {
    const where = orderId ? { order: { id: orderId } } : {};

    const logs = await this.orderStatusHistoryRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
      relations: [],
    });

    return logs;
  }
}
