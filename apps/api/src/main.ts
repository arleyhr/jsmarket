import { UserRole } from '@jsmarket/state-machines';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const authService = app.get(AuthService);
  const logger = new Logger('Seed');
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  try {
    const users = await authService.findAllUsers();

    logger.log(`Found ${users?.length} users`);

    if (!users || users?.length === 0) {
      // Create admin user
      await authService.createUser({
        email: 'admin@jsmarket.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: UserRole.ADMIN
      });
      logger.log('✅ Admin user created successfully');

      // Create regular user
      await authService.createUser({
        email: 'john@wick.com',
        password: 'andy',
        firstName: 'John',
        lastName: 'Wick',
        role: UserRole.USER
      });
      logger.log('✅ Regular user created successfully');

    }

  } catch (error) {
    logger.error('❌ Error creating seed users:', error.message);
  }

  app.enableCors();
  Logger.log('CORS enabled');

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
