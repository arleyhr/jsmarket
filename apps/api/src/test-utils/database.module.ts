import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [...entities],
    synchronize: true,
  });
