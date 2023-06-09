import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashflowEntity } from 'src/entities/cashflow.entity';
import { AuthModule } from '../auth/auth.module';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';

@Module({
  imports: [TypeOrmModule.forFeature([CashflowEntity]), AuthModule],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
