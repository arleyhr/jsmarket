import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service';

import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productsService: ProductsService
  ) {}

  async findOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ['items'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ user: { id: userId }, isActive: true });
      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItemToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);

    const product = await this.productsService.findOne(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        productId,
        quantity,
        cartId: cart.id,
        productName: product.title,
        productImage: product.images[0],
        price: product.price,
      });

      await this.cartItemRepository.save(newItem);
    }

    const result = await this.findOrCreateCart(userId);

    return result;
  }

  async removeItemFromCart(userId: number, productId: number): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);

    const item = cart.items.find(item => item.productId === productId);

    if (item) {
      await this.cartItemRepository.delete(item.id);
    }

    const result = await this.findOrCreateCart(userId);

    return result;
  }

  async updateItemQuantity(action: 'add' | 'subtract', userId: number, productId: number, quantity: number): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);

    const item = cart.items.find(item => item.productId === productId);

    if (action === 'add') {
      item.quantity += quantity;
    } else if (action === 'subtract') {
      item.quantity -= quantity;
    }

    await this.cartItemRepository.save(item);

    const result = await this.findOrCreateCart(userId);

    return result;
  }
}
