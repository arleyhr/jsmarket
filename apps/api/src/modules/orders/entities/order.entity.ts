import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { OrderStatus } from '../order.machine';


@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;


  @Field()
  @Column({
    default: OrderStatus.Pending
  })
  status: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  shippingAddress: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  billingAddress: string;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  @Field(() => [OrderStatusHistory])
  @OneToMany(() => OrderStatusHistory, history => history.order, { cascade: true })
  statusHistory: OrderStatusHistory[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
@Entity()
export class OrderItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Order)
  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @Field()
  @Column()
  orderId: number;

  @Field()
  @Column()
  productId: number;

  @Field()
  @Column()
  productName: string;

  @Field(() => String)
  @Column()
  productImage: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
@Entity()
export class OrderStatusHistory {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Order)
  @ManyToOne(() => Order, order => order.statusHistory)
  order: Order;

  @Field()
  @Column()
  orderId: number;

  @Field()
  @Column()
  status: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  previousStatus: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

