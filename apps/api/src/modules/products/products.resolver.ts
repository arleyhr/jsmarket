import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { JwtAuthGuard } from '../auth/jwt.guard';

import { Product, Products, Category } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => Products, { name: 'products' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('page', { type: () => Int }) page: number,
    @Args('perPage', { type: () => Int }) perPage: number,
    @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
    @Args('order', { type: () => String, nullable: true }) order?: string,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('category', { type: () => String, nullable: true }) category?: string
  ) {
    const result = await this.productsService.findAll(page, perPage, sortBy, order, search, category);

    return result;
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Query(() => [Category], { name: 'categories' })
  getCategories() {
    return this.productsService.getCategories();
  }
}
