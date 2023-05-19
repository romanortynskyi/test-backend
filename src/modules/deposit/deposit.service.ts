import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DepositPaymentEntity } from 'src/entities/deposit-payment.entity';
import { DepositEntity } from 'src/entities/deposit.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { AuthService } from '../auth/auth.service';
import { CreateDepositPaymentDto } from './dto/create-deposit-payment.dto';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { QueryDepositPayment } from './dto/query-deposit-payment.dto';
import { UpdateDepositPaymentDto } from './dto/update-deposit-payment.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(DepositEntity)
    private readonly depositRepository: Repository<DepositEntity>,

    @InjectRepository(DepositPaymentEntity)
    private readonly depositPaymentRepository: Repository<DepositPaymentEntity>,

    private readonly authService: AuthService,
  ) {}

  async get(id: number) {
    return this.depositRepository.findOne({ where: { id } });
  }

  async getPayments(id: number, query: QueryDepositPayment, auth) {
    const { page, perPage } = query;
    const user = await this.authService.getUserByToken(auth);

    return this.depositPaymentRepository
      .createQueryBuilder('cashflow')
      .where('cashflow.userId = :userId', { userId: user.id })
      .andWhere('cashflow.type = :type', { type: CashflowType.Deposit })
      .andWhere('cashflow.depositId = :depositId', { depositId: id })
      .skip(page * perPage)
      .limit(perPage)
      .getMany();
  }

  async create(dto: CreateDepositDto) {
    return this.depositRepository.save(dto);
  }

  async createPayment(id: number, dto: CreateDepositPaymentDto) {
    return this.depositPaymentRepository.save({
      depositId: id,
      ...dto,
      type: CashflowType.Deposit,
    });
  }

  async updatePayment(id: number, dto: UpdateDepositPaymentDto) {
    return this.depositPaymentRepository.update(id, dto);
  }

  async deletePayment(id: number) {
    return this.depositPaymentRepository.delete(id);
  }

  async update(id: number, dto: UpdateDepositDto) {
    return this.depositRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.depositRepository.delete(id);
  }
}
