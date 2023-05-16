import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from 'src/entities/deposit.entity';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity])],
  providers: [DepositService],
  controllers: [DepositController],
})
export class DepositModule {}
