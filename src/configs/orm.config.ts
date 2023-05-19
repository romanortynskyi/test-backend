import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CreditPaymentEntity } from 'src/entities/credit-payment.entity';
import { CreditEntity } from 'src/entities/credit.entity';
import { DepositPaymentEntity } from 'src/entities/deposit-payment.entity';
import { DepositEntity } from 'src/entities/deposit.entity';

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
      CreditEntity,
      DepositEntity,
      CreditPaymentEntity,
      DepositPaymentEntity,
    ],
    logging: false,
    synchronize: true,
  }),
};
