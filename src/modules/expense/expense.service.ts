import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Raw, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseQuery } from './dto/get-expense-query.dto';
import { QueryExpenseStatsDto } from './dto/query-expense-stats.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(CashflowEntity)
    private readonly cashflowRepository: Repository<CashflowEntity>,

    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateExpenseDto) {
    return this.cashflowRepository.save({
      ...dto,
      type: CashflowType.Expense,
    });
  }

  async getAll(query: GetExpenseQuery, auth: string) {
    const { page, perPage } = query;
    const user = await this.authService.getUserByToken(auth);

    return await this.cashflowRepository
      .createQueryBuilder('cashflow')
      .where('cashflow.userId = :userId', { userId: user.id })
      .andWhere('cashflow.type = :type', { type: CashflowType.Expense })
      .skip(page * perPage)
      .limit(perPage)
      .getMany();
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
