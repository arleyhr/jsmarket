import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseTestingModule } from '../../test-utils/database.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User, UserRole } from './entities/user.entity';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn()
  };

  const mockConfigService = {
    get: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule,
        ConfigModule,
        DatabaseTestingModule([User]),
        TypeOrmModule.forFeature([User])
      ],
      providers: [
        AuthResolver,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const userInput = {
        email: 'test@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      const savedUser = {
        role: UserRole.USER,
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User'
      };

      jest.spyOn(service, 'createUser').mockResolvedValue(savedUser as User);

      const result = await resolver.register(userInput);

      expect(result).toEqual({
        role: savedUser.role,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName
      });
    });
  });

  describe('login', () => {
    it('should return JWT token for valid credentials', async () => {
      const loginInput = {
        email: 'testuser@test.com',
        password: 'password123'
      };

      const token = 'jwt-token';

      jest.spyOn(service, 'login').mockResolvedValue(token);

      const result = await resolver.login(loginInput.email, loginInput.password);
      expect(result).toBe(token);
    });
  });

  describe('me', () => {
    it('should return current user info', async () => {
      const user = {
        role: UserRole.USER,
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User'
      };

      jest.spyOn(service, 'findUserByEmail').mockResolvedValue(user as User);

      const result = await resolver.me(user as User);

      expect(result).toEqual(user);
    });
  });
});
