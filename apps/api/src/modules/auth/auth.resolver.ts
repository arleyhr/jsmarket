import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/get-user.decorator';

import { AuthService } from './auth.service';
import { AuthUser, CreateUserInput, User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => AuthUser, { name: 'me' })
  async me(@CurrentUser() user: AuthUser): Promise<AuthUser> {
    return user;
  }

  @Mutation(() => User, { name: 'register' })
  async register(@Args('user') user: CreateUserInput): Promise<User> {
    return this.authService.createUser(user);
  }

  @Mutation(() => String, { name: 'login' })
  async login(@Args('username') username: string, @Args('password') password: string): Promise<string> {
    return this.authService.login(username, password);
  }
}
