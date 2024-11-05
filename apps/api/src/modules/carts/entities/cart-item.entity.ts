import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Cart } from './cart.entity';

@ObjectType()
@Entity('cart_items')
export class CartItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  cartId: number;

  @Field(() => Int)
  @Column()
  productId: number;

  @Field(() => String)
  @Column()
  productName: string;

  @Field(() => String)
  @Column()
  productImage: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Cart)
  @ManyToOne(() => Cart, cart => cart.items)
  cart: Cart;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
