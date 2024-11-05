import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseTestingModule } from '../../test-utils/database.module';
import { User } from '../auth/entities/user.entity';

import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

describe('CartsResolver', () => {
  let resolver: CartsResolver;
  let service: CartsService;

  const mockCartsService = {
    findOrCreateCart: jest.fn(),
    addItemToCart: jest.fn(),
    removeItemFromCart: jest.fn(),
    updateItemQuantity: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseTestingModule([User, Cart, CartItem]),
        TypeOrmModule.forFeature([User, Cart, CartItem])
      ],
      providers: [
        CartsResolver,
        {
          provide: CartsService,
          useValue: mockCartsService
        }
      ],
    }).compile();

    resolver = module.get<CartsResolver>(CartsResolver);
    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCart', () => {
    it('should return cart for user', async () => {
      const mockCart = { id: 1, items: [] };
      const mockUser = { id: 1 } as User;

      mockCartsService.findOrCreateCart.mockResolvedValue(mockCart);

      const result = await resolver.getCart(mockUser);
      expect(result).toEqual(mockCart);
      expect(mockCartsService.findOrCreateCart).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const mockUser = { id: 1 } as User;
      const productId = 1;
      const quantity = 2;
      const mockCart = { id: 1, items: [] };

      mockCartsService.addItemToCart.mockResolvedValue(mockCart);

      const result = await resolver.addItemToCart(mockUser, productId, quantity);
      expect(result).toEqual(mockCart);
      expect(mockCartsService.addItemToCart).toHaveBeenCalledWith(mockUser.id, productId, quantity);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', async () => {
      const mockUser = { id: 1 } as User;
      const productId = 1;
      const mockCart = { id: 1, items: [] };

      mockCartsService.removeItemFromCart.mockResolvedValue(mockCart);

      const result = await resolver.removeItemFromCart(mockUser, productId);
      expect(result).toEqual(mockCart);
      expect(mockCartsService.removeItemFromCart).toHaveBeenCalledWith(mockUser.id, productId);
    });
  });

  describe('updateItemQuantity', () => {
    it('should update cart item quantity', async () => {
      const mockUser = { id: 1 } as User;
      const productId = 1;
      const action = 'add';
      const quantity = 1;
      const mockCart = { id: 1, items: [] };

      mockCartsService.updateItemQuantity.mockResolvedValue(mockCart);

      const result = await resolver.updateItemQuantity(mockUser, productId, action, quantity);
      expect(result).toEqual(mockCart);
      expect(mockCartsService.updateItemQuantity).toHaveBeenCalledWith(action, quantity, mockUser.id, productId);
    });
  });
});
