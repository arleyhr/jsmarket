import { Field, InputType, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity({ name: 'users'})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  password: string;

  @Column({
    default: UserRole.USER
  })
  @Field()
  role: UserRole;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}

@InputType('UserInput')
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType('AuthUser')
export class AuthUser {
  @Field()
  username: string;

  @Field()
  role: UserRole;
}
