import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DatabaseTestingModule } from '../../test-utils/database.module';
import { User } from '../auth/entities/user.entity';
import { ProductsService } from '../products/products.service';

import { CartsService } from './carts.service';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

describe('CartsService', () => {
  let service: CartsService;
  let cartRepository: Repository<Cart>;
  let cartItemRepository: Repository<CartItem>;
  let productsService: ProductsService;

  const mockCartRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockCartItemRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockProductsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseTestingModule([User, Cart, CartItem]),
        TypeOrmModule.forFeature([User, Cart, CartItem]),
      ],
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useValue: mockCartRepository,
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: mockCartItemRepository,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    cartItemRepository = module.get<Repository<CartItem>>(getRepositoryToken(CartItem));
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOrCreateCart', () => {
    it('should return existing cart if found', async () => {
      const mockCart = { id: 1, items: [], total: 0 };
      mockCartRepository.findOne.mockResolvedValue(mockCart);

      const result = await service.findOrCreateCart(1);
      expect(result).toEqual({ ...mockCart, total: 0 });
    });

    it('should create new cart if not found', async () => {
      const mockCart = { id: 1, items: [] };
      mockCartRepository.findOne.mockResolvedValue(null);
      mockCartRepository.create.mockReturnValue(mockCart);
      mockCartRepository.save.mockResolvedValue(mockCart);

      const result = await service.findOrCreateCart(1);
      expect(result).toEqual(mockCart);
    });
  });

  describe('addItemToCart', () => {
    it('should add new item to cart', async () => {
      const mockCart = { id: 1, items: [] };
      const mockProduct = { id: 1, title: 'Test Product', images: ['image.jpg'], price: 100 };

      mockCartRepository.findOne.mockResolvedValue(mockCart);
      mockProductsService.findOne.mockResolvedValue(mockProduct);
      mockCartItemRepository.create.mockReturnValue({ id: 1 });
      mockCartItemRepository.save.mockResolvedValue({ id: 1 });

      await service.addItemToCart(1, 1, 1);

      expect(mockCartItemRepository.create).toHaveBeenCalled();
      expect(mockCartItemRepository.save).toHaveBeenCalled();
    });

    it('should update quantity if item exists', async () => {
      const existingItem = { id: 1, productId: 1, quantity: 1 };
      const mockCart = { id: 1, items: [existingItem] };
      const mockProduct = { id: 1, title: 'Test Product', images: ['image.jpg'], price: 100 };

      mockCartRepository.findOne.mockResolvedValue(mockCart);
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      await service.addItemToCart(1, 1, 1);

      expect(mockCartItemRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: 2 })
      );
    });

    it('should throw error if product not found', async () => {
      const mockCart = { id: 1, items: [] };
      mockCartRepository.findOne.mockResolvedValue(mockCart);
      mockProductsService.findOne.mockResolvedValue(null);

      await expect(service.addItemToCart(1, 1, 1)).rejects.toThrow('Product not found');
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove item from cart', async () => {
      const mockItem = { id: 1, productId: 1 };
      const mockCart = { id: 1, items: [mockItem] };

      mockCartRepository.findOne.mockResolvedValue(mockCart);

      await service.removeItemFromCart(1, 1);

      expect(mockCartItemRepository.delete).toHaveBeenCalledWith(mockItem.id);
    });

    it('should increase quantity when action is add', async () => {
      const mockItem = { id: 1, productId: 1, quantity: 1 };
      const mockCart = { id: 1, items: [mockItem] };

      mockCartRepository.findOne.mockResolvedValue(mockCart);

      await service.updateItemQuantity('add', 1, 1, 1);

      expect(mockCartItemRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: 2 })
      );
    });

    it('should decrease quantity when action is subtract', async () => {
      const mockItem = { id: 1, productId: 1, quantity: 2 };
      const mockCart = { id: 1, items: [mockItem] };

      mockCartRepository.findOne.mockResolvedValue(mockCart);

      await service.updateItemQuantity('subtract', 1, 1, 1);

      expect(mockCartItemRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: 1 })
      );
    });

    it('should set quantity when action is set', async () => {
      const mockItem = { id: 1, productId: 1, quantity: 2 };
      const mockCart = { id: 1, items: [mockItem] };

      mockCartRepository.findOne.mockResolvedValue(mockCart);

      await service.updateItemQuantity('set', 1, 1, 5);

      expect(mockCartItemRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: 5 })
      );
    });

    it('should remove item if quantity is set to zero', async () => {
      const mockItem = { id: 1, productId: 1, quantity: 2 };
      const mockCart = { id: 1, items: [mockItem] };

      mockCartRepository.findOne.mockResolvedValue(mockCart);

      await service.updateItemQuantity('set', 1, 1, 0);

      expect(mockCartItemRepository.delete).toHaveBeenCalledWith(mockItem.id);
    });
  });
});
