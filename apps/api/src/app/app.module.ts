import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../modules/auth/auth.module';
import { User } from '../modules/auth/entities/user.entity';
import { CartsModule } from '../modules/carts/carts.module';
import { CartItem } from '../modules/carts/entities/cart-item.entity';
import { Cart } from '../modules/carts/entities/cart.entity';
import { Order, OrderItem, OrderStatusHistory } from '../modules/orders/entities/order.entity';
import { OrdersModule } from '../modules/orders/orders.module';
import { ProductsModule } from '../modules/products/products.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const isMySQLConfig = process.env?.DATABASE_URL?.includes('mysql');

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY') || 'test',
        signOptions: { expiresIn: '60s' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      [isMySQLConfig ? 'url' : 'database']: process.env?.DATABASE_URL ?? './db.sqlite',
      type: isMySQLConfig ? 'mysql' : 'sqlite',
      entities: [User, Cart, CartItem, Order, OrderItem, OrderStatusHistory],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      csrfPrevention: false,
    }),
    AuthModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
