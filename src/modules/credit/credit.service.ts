import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditPaymentEntity } from 'src/entities/credit-payment.entity';
import { CreditEntity } from 'src/entities/credit.entity';
import { Repository } from 'typeorm';
import { CreateCreditCashflowDto } from './dto/create-credit-payment.dto';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(CreditEntity)
    private readonly creditRepository: Repository<CreditEntity>,

    private readonly creditPaymentRepository: Repository<CreditPaymentEntity>,
  ) {}

  async get(id: number) {
    return this.creditRepository.findOne({ where: { id } });
  }

  async create(dto: CreateCreditDto) {
    return this.creditRepository.create(dto);
  }

  async createPayment(id: number, dto: CreateCreditCashflowDto) {
    return this.creditPaymentRepository.create({ id, ...dto });
  }

  async update(id: number, dto: UpdateCreditDto) {
    return this.creditRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.creditRepository.delete(id);
  }
}
