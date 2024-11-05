import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { AdminGuard, JwtAuthGuard } from '../auth/jwt.guard';

import { Order, OrderStatusHistory } from './entities/order.entity';
import { OrderEvents } from './order.machine';
import { OrdersService } from './orders.service';

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
  @Query(() => Order)
  getOrder(@Args('orderId') orderId: number, @CurrentUser() user: User) {
    return this.ordersService.getOrder(orderId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Order)
  updateOrderStatus(
    @CurrentUser() user: User,
    @Args('orderId') orderId: number,
    @Args('event', { type: () => OrderEvents }) event: OrderEvents,
    @Args('comment', { nullable: true }) comment?: string
  ) {
    return this.ordersService.processOrderStatusUpdate(orderId, user, event, comment);
  }

  @UseGuards(AdminGuard)
  @Query(() => [OrderStatusHistory])
  getOrdersStatusLogs() {
    return this.ordersService.getOrdersStatusLogs();
  }
}
