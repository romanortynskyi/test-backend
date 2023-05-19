import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditPaymentEntity } from 'src/entities/credit-payment.entity';
import { CreditEntity } from 'src/entities/credit.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
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

    private readonly authService: AuthService,
  ) {}

  async get(id: number) {
    return this.creditRepository.findOne({ where: { id } });
  }

  async create(dto: CreateCreditDto) {
    return this.creditRepository.save(dto);
  }

  async getPayments(id: number, query: QueryCreditPayment, auth: string) {
    const { page, perPage } = query;
    const user = await this.authService.getUserByToken(auth);

    return this.creditPaymentRepository
      .createQueryBuilder('payment')
      .where('payment.userId = :userId', { userId: user.id })
      .andWhere('payment.type = :type', { type: CashflowType.Credit })
      .andWhere('payment.creditId = :creditId', { creditId: id })
      .skip(page * perPage)
      .limit(perPage)
      .getMany();
  }

  async createPayment(id: number, dto: CreateCreditPaymentDto) {
    return this.creditPaymentRepository.save({
      creditId: id,
      ...dto,
      type: CashflowType.Credit,
    });
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
