import { ExecutionContext } from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from "./auth.service";
import { UserRole } from "./entities/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class AdminGuard extends JwtAuthGuard {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);

    if (!isAuth) {
      return false;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    const result = await this.authService.findUserByEmail(user.email);

    return result?.role === UserRole.ADMIN;
  }
}
