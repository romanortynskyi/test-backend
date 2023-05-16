import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { WithdrawService } from './deposit.service';

@Module({
  providers: [WithdrawService],
  controllers: [DepositController],
})
export class DepositModule {}
