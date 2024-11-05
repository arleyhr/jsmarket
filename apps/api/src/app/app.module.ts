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
import { ProductsModule } from '../modules/products/products.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      type: 'sqlite',
      database: './db.sqlite',
      entities: [User, Cart, CartItem],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule,
    ProductsModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
