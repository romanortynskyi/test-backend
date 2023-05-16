import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditEntity } from 'src/entities/credit.entity';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreditEntity])],
  providers: [CreditService],
  controllers: [CreditController],
})
export class CreditModule {}
