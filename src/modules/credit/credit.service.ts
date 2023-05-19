import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditPaymentEntity } from 'src/entities/credit-payment.entity';
import { CreditEntity } from 'src/entities/credit.entity';
import { Repository } from 'typeorm';
import { UpdateDepositPaymentDto } from '../deposit/dto/update-deposit-payment.dto';
import { CreateCreditPaymentDto } from './dto/create-credit-payment.dto';
import { CreateCreditDto } from './dto/create-credit.dto';
import { QueryCreditPayment } from './dto/query-credit-payment.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(CreditEntity)
    private readonly creditRepository: Repository<CreditEntity>,

    @InjectRepository(CreditPaymentEntity)
    private readonly creditPaymentRepository: Repository<CreditPaymentEntity>,
  ) {}

  async get(id: number) {
    return this.creditRepository.findOne({ where: { id } });
  }

  async create(dto: CreateCreditDto) {
    return this.creditRepository.create(dto);
  }

  async getPayments(id: number, query: QueryCreditPayment) {
    return this.creditPaymentRepository.findAndCount({
      where: { creditId: id },
      skip: query.perPage * query.page,
      take: query.perPage,
      order: {
        ...(query.date && { date: { direction: query.date } }),
        ...(query.alphabetic && { description: query.alphabetic }),
        ...(query.amount && { amount: query.amount }),
      },
    });
  }

  async createPayment(id: number, dto: CreateCreditPaymentDto) {
    return this.creditPaymentRepository.create({ creditId: id, ...dto });
  }

  async updatePayment(id: number, dto: UpdateDepositPaymentDto) {
    return this.creditPaymentRepository.update(id, dto);
  }

  async deletePayment(id: number) {
    return this.creditPaymentRepository.delete(id);
  }

  async update(id: number, dto: UpdateCreditDto) {
    return this.creditRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.creditRepository.delete(id);
  }
}
