import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseQuery } from './dto/get-expense-query.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(CashflowEntity)
    private readonly cashflowRepository: Repository<CashflowEntity>,
  ) {}

  async create(dto: CreateExpenseDto) {
    return this.cashflowRepository.create({
      ...dto,
      type: CashflowType.Expense,
    });
  }

  async getAll(query: GetExpenseQuery) {
    return await this.cashflowRepository.find({
      order: {
        ...(query.date && { dateOfIncome: query.date }),
        ...(query.alphabetic && { description: query.alphabetic }),
        ...(query.amount && { amount: query.amount }),
      },
      where: { type: CashflowType.Expense },
      take: query.perPage,
      skip: query.page * query.perPage,
    });
  }

  async update(id: number, dto: UpdateExpenseDto) {
    return await this.cashflowRepository.update(id, dto);
  }

  async delete(id: number) {
    return await this.cashflowRepository.delete(id);
  }
}
