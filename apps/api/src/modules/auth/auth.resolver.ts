import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';

import { CurrentUser } from '../../decorators/get-user.decorator';

import { AuthService } from './auth.service';
import { AuthResponse, AuthUser, CreateUserInput, User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  async me(@CurrentUser() user: AuthUser): Promise<User> {
    const result = await this.authService.findUserByEmail(user.email);

    return result;
  }

  @Mutation(() => AuthResponse, { name: 'register' })
  async register(@Args('user') user: CreateUserInput): Promise<AuthResponse> {
    return this.authService.createUser(user);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('email') email: string, @Args('password') password: string): Promise<AuthResponse> {
    return this.authService.login(email, password);
  }
}
