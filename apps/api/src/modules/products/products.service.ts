import { Injectable } from '@nestjs/common';

import { Category, Product, Products } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly baseUrl = 'https://dummyjson.com';

  async findAll(
    page = 1,
    perPage = 20,
    sortBy = 'rating',
    order = 'desc',
    search = '',
    category = ''
  ): Promise<Products> {
    const query = `page=${page}&limit=${perPage}&sortBy=${sortBy}&order=${order}`;
    const url = search?.length
      ? `${this.baseUrl}/products/search?q=${search}&${query}`
      : category?.length
        ? `${this.baseUrl}/products/category/${category}?${query}`
        : `${this.baseUrl}/products?${query}`;

    const response = await fetch(url);
    const result = await response.json();

    return { ...result, data: result.products };
  }

  async findOne(id: number): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/products/${id}`);
    const result = await response.json();

    return result;
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/products/categories`);
    const result = await response.json();

    return result;
  }
}
