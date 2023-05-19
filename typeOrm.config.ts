import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { CreateCashflow1684400984857 } from 'migrations/1684400984857-CreateCashflow';
import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CreditPaymentEntity } from 'src/entities/credit-payment.entity';
import { CreditEntity } from 'src/entities/credit.entity';
import { CreateUser1683525459189 } from './migrations/1683525459189-CreateUser';
import { AddUserImage1684060336867 } from './migrations/1684060336867-AddUserImage';
import { AddUserRecoveryCode1684327028472 } from './migrations/1684327028472-AddUserRecoveryCode';
import { UserEntity } from './src/entities/user.entity';

config({
  path: '.env.local',
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [UserEntity, CashflowEntity, CreditEntity, CreditPaymentEntity],
  migrations: [
    CreateUser1683525459189,
    AddUserImage1684060336867,
    AddUserRecoveryCode1684327028472,
    CreateCashflow1684400984857,
  ],
});
