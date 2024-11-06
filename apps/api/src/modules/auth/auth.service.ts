import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AuthResponse, User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async createUser(user: Partial<User>): Promise<AuthResponse> {
    try {
      const newUser = this.userRepository.create(user);
      const result = await this.userRepository.save(newUser);

      const payload = { email: result.email, sub: result.id, role: result.role };

      const token = this.jwtService.sign(payload, { secret: this.configService.get('SECRET_KEY') });

      return {
        token,
        user: result,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }

      throw new Error('Error registering user');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    }

    return null;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const user = await this.validateUser(email, password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const payload = { email: user.email, sub: user.id, role: user.role };

      const token = this.jwtService.sign(payload, { secret: this.configService.get('SECRET_KEY') });

      return {
        token,
        user,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
