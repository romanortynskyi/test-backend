import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditPaymentEntity } from 'src/entities/credit-payment.entity';
import { CreditEntity } from 'src/entities/credit.entity';
import { AuthModule } from '../auth/auth.module';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditEntity, CreditPaymentEntity]),
    AuthModule,
  ],
  providers: [CreditService],
  controllers: [CreditController],
})
export class CreditModule {}
