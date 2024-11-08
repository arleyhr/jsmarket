import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { DatabaseTestingModule } from '../../test-utils/database.module';

import { AuthService } from './auth.service';
import { User, UserRole } from './entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn()
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'testuser@test.com',
        password: 'password123',
        role: UserRole.USER
      };

      const savedUser = { ...userData, id: 1 };
      const token = 'jwt-token';

      mockUserRepository.create.mockReturnValue(userData);
      mockUserRepository.save.mockResolvedValue(savedUser);
      mockJwtService.sign.mockReturnValue(token);
      mockConfigService.get.mockReturnValue('test-secret');

      const result = await service.createUser(userData);

      expect(result).toEqual({
        token,
        user: savedUser
      });
      expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
      expect(mockUserRepository.save).toHaveBeenCalledWith(userData);
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        email: 'testuser@test.com',
        password: 'password123',
        role: UserRole.USER
      };

      mockUserRepository.create.mockReturnValue(userData);
      mockUserRepository.save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await expect(service.createUser(userData)).rejects.toThrow('Email already exists');
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'testuser@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user'
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.validateUser('testuser@test.com', 'password123');

      expect(result).toEqual(user);
    });

    it('should return null if credentials are invalid', async () => {
      const user = {
        id: 1,
        email: 'testuser@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user'
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.validateUser('testuser@test.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return JWT token for valid credentials', async () => {
      const user = {
        id: 1,
        email: 'testuser@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user'
      };

      const token = 'jwt-token';
      const secret = 'test-secret';

      mockUserRepository.findOne.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(token);
      mockConfigService.get.mockReturnValue(secret);

      const result = await service.login('testuser@test.com', 'password123');
      expect(result).toEqual({
        token,
        user
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { email: user.email, sub: user.id, role: user.role },
        { secret }
      );
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.login('testuser@test.com', 'wrongpassword')).rejects.toThrow();
    });
  });
});
