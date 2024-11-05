import { Test, TestingModule } from '@nestjs/testing';

import { Product, Category, AvailabilityStatus } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const mockProducts = {
        data: [],
        products: [],
        total: 0,
        skip: 0,
        limit: 20
      };

      global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.resolve({ ...mockProducts, products: [] })
      });

      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a single product by id', async () => {
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

      global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.resolve(mockProduct)
      });

      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getCategories', () => {
    it('should return list of categories', async () => {
      const mockCategories: Category[] = [
        { slug: 'test', name: 'Test', url: 'test-url' }
      ];

      global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.resolve(mockCategories)
      });

      const result = await service.getCategories();
      expect(result).toEqual(mockCategories);
    });
  });
});
