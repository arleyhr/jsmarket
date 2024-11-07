import { OrderEvents, OrderStatus } from '@jsmarket/state-machines';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, registerEnumType } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AdminGuard, JwtAuthGuard } from '../auth/jwt.guard';

import { Order, OrderStatusHistory } from './entities/order.entity';
import { OrdersService } from './orders.service';

registerEnumType(OrderEvents, {
  name: 'OrderEvents',
});

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Order)
  createOrder(@CurrentUser() user: User) {
    return this.ordersService.createOrder(user.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Order, { name: 'order' })
  getOrder(@Args('orderId', { type: () => Int }) orderId: number, @CurrentUser() user: User) {
    return this.ordersService.getOrder(orderId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Order, { name: 'updateOrderStatus' })
  updateOrderStatus(
    @CurrentUser() user: User,
    @Args('orderId', { type: () => Int }) orderId: number,
    @Args('event', { type: () => OrderEvents }) event: OrderEvents,
    @Args('comment', { nullable: true }) comment?: string
  ) {
    return this.ordersService.processOrderStatusUpdate(orderId, user, event, comment);
  }

  @UseGuards(AdminGuard)
  @Query(() => [OrderStatusHistory], { name: 'ordersStatusLogs' })
  getOrdersStatusLogs(@Args('orderId', { type: () => Int, nullable: true }) orderId?: number) {
    return this.ordersService.getOrdersStatusLogs(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Order], { name: 'orders' })
  getOrders(
    @CurrentUser() user: User,
    @Args('admin', { type: () => Boolean, nullable: true }) admin?: boolean,
    @Args('status', { type: () => OrderStatus, nullable: true }) status?: OrderStatus,
  ) {
    return this.ordersService.getOrders(user, admin, status);
  }
}
