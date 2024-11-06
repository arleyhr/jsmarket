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

  @Column({ type: 'text' })
  password: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({
    default: UserRole.USER
  })
  @Field()
  role: UserRole;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}

@InputType('UserInput')
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;
}

@ObjectType('AuthUser')
export class AuthUser {
  @Field()
  email: string;

  @Field()
  role: UserRole;
}

@ObjectType('AuthResponse')
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
