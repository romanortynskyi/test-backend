import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CashflowEntity } from 'src/entities/cashflow.entity';

import { UserEntity } from 'src/entities/user.entity';

export const ormOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: parseInt(configService.get('DATABASE_PORT')),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [
      UserEntity,
      CashflowEntity,
      // CreditEntity,
      // DepositEntity,
      // CreditPaymentEntity,
      // DepositPaymentEntity,
    ],
    logging: false,
    synchronize: true,
  }),
};
