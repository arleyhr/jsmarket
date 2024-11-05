import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';

import { CartItem } from './cart-item.entity';

@Entity()
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @OneToMany(() => CartItem, item => item.cart)
  @Field(() => [CartItem])
  items: CartItem[];

  @Column({ default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  completedAt?: Date;

  @Column('decimal', { default: 0 })
  @Field(() => Number)
  total: number;
}

@ObjectType()
export class Carts {
  @Field(() => [Cart])
  items: Cart[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;
}


