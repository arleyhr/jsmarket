import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Cart)
  addItemToCart(@CurrentUser() user: User, @Args('productId') productId: number, @Args('quantity') quantity: number) {
    return this.cartsService.addItemToCart(user.id, productId, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Cart)
  removeItemFromCart(@CurrentUser() user: User, @Args('productId') productId: number) {
    return this.cartsService.removeItemFromCart(user.id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Cart)
  updateItemQuantity(@CurrentUser() user: User, @Args('productId') productId: number, @Args('action') action: 'add' | 'subtract' | 'set', @Args('quantity') quantity: number) {
    return this.cartsService.updateItemQuantity(action, user.id, productId, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Cart, { name: 'cart' })
  async getCart(@CurrentUser() user: User) {
    const cart = await this.cartsService.findOrCreateCart(user.id);

    return cart;
  }
}
