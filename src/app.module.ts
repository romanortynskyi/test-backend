import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { envOptions, ormOptions } from './configs';
import { CreditModule } from './modules/credit/credit.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { IncomeModule } from './modules/income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot(envOptions),
    TypeOrmModule.forRootAsync(ormOptions),
    ExpenseModule,
    IncomeModule,
    CreditModule,
    DepositModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
