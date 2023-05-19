import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Raw, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseQuery } from './dto/get-expense-query.dto';
import { QueryExpenseStatsDto } from './dto/query-expense-stats.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
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

  async getStats(query: QueryExpenseStatsDto) {
    const profit = await this.cashflowRepository
      .createQueryBuilder('cashflow')
      .where('cashflow.type = :type', { type: CashflowType.Expense })
      .where('cashflow.date >= :startDate AND cashflow.date <= endDate', {
        startDate: query.startDate,
        endDate: query.endDate,
      })
      .select('SUM(cashflow.amount)', 'sum')
      .getRawOne();
    const totalCount = await this.cashflowRepository.count({
      where: {
        type: CashflowType.Expense,
        date: Raw(
          (alias) =>
            `${alias} >= ${query.startDate} AND ${alias} <= ${query.endDate}`,
        ),
      },
    });

    return { totalCount, profit };
  }

  async update(id: number, dto: UpdateExpenseDto) {
    return await this.cashflowRepository.update(id, dto);
  }

  async delete(id: number) {
    return await this.cashflowRepository.delete(id);
  }
}
