import { ExecutionContext } from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

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
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);

    if (!isAuth) {
      return false;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    return user?.role === UserRole.ADMIN;
  }
}
