import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Cart } from '../carts/entities/cart.entity';

import { Order, OrderItem, OrderStatusHistory } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Cart, Order, OrderItem, OrderStatusHistory])
  ],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
