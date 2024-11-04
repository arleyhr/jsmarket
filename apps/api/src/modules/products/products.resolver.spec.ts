import { Test, TestingModule } from '@nestjs/testing';

import { Product, Products, Category } from './entities/product.entity';
import { AvailabilityStatus } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsResolver, ProductsService],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of products', async () => {
      const mockResult: Products = {
        data: [],
        total: 0,
        skip: 0,
        limit: 20
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(mockResult);

      const result = await resolver.findAll(1, 20, 'rating', 'desc', '', '');
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
        discountPercentage: 10,
        rating: 4.5,
        stock: 50,
        category: 'test',
        thumbnail: 'test.jpg',
        images: ['test.jpg'],
        brand: 'Test Brand',
        sku: 'TEST123',
        weight: 1.5,
        dimensions: { width: 10, height: 10, depth: 10 },
        warrantyInformation: 'Test Warranty',
        shippingInformation: 'Test Shipping',
        availabilityStatus: AvailabilityStatus.InStock,
        reviews: [],
        returnPolicy: 'Test Return Policy',
        minimumOrderQuantity: 1,
        meta: {
          createdAt: new Date(),
          updatedAt: new Date(),
          barcode: '123456789',
          qrCode: 'qr123456789'
        },
        tags: ['test']
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);

      const result = await resolver.findOne(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getCategories', () => {
    it('should return a list of categories', async () => {
      const mockCategories: Category[] = [
        { slug: 'test', name: 'Test', url: 'test-url' }
      ];

      jest.spyOn(service, 'getCategories').mockResolvedValue(mockCategories);

      const result = await resolver.getCategories();
      expect(result).toEqual(mockCategories);
    });
  });
});
