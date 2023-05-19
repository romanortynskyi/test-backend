import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositPaymentEntity } from 'src/entities/deposit-payment.entity';
import { DepositEntity } from 'src/entities/deposit.entity';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity, DepositPaymentEntity])],
  providers: [DepositService],
  controllers: [DepositController],
})
export class DepositModule {}
