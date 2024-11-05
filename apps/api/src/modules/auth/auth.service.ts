import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      const result = await this.userRepository.save(newUser);

      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username already exists');
      }

      throw new Error('Error registering user');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    }

    return null;
  }

  async login(username: string, password: string): Promise<string> {
    try {
      const user = await this.validateUser(username, password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const payload = { username: user.username, sub: user.id, role: user.role };

      const token = this.jwtService.sign(payload, { secret: this.configService.get('SECRET_KEY') });

      return token;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
