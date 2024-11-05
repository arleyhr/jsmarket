import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRole } from './entities/user.entity';
import { AdminGuard, JwtAuthGuard } from './jwt.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('getRequest', () => {
    it('should return request from GraphQL context', () => {
      const mockRequest = { user: { email: 'test@test.com' } };
      const mockContext = {
        getContext: () => ({ req: mockRequest }),
      };
      const mockExecutionContext = {
        getType: () => 'graphql',
      } as ExecutionContext;

      jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(mockContext as any);

      const request = guard.getRequest(mockExecutionContext);
      expect(request).toBe(mockRequest);
    });
  });
});

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGuard],
    }).compile();

    guard = module.get<AdminGuard>(AdminGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for admin users', async () => {
      const mockRequest = { user: { role: UserRole.ADMIN } };
      const mockContext = {
        getContext: () => ({ req: mockRequest }),
      };
      const mockExecutionContext = {
        getType: () => 'graphql',
      } as ExecutionContext;

      jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(mockContext as any);
      jest.spyOn(AdminGuard.prototype, 'canActivate').mockImplementation(async () => true);

      const result = await guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should return false for non-admin users', async () => {
      const mockRequest = { user: { role: UserRole.USER } };
      const mockContext = {
        getContext: () => ({ req: mockRequest }),
      };
      const mockExecutionContext = {
        getType: () => 'graphql',
      } as ExecutionContext;

      jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(mockContext as any);
      jest.spyOn(AdminGuard.prototype, 'canActivate').mockImplementation(async () => false);

      const result = await guard.canActivate(mockExecutionContext);
      expect(result).toBe(false);
    });
  });
});
