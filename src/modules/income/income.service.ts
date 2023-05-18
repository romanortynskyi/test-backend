import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Raw, Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeQuery } from './dto/get-income-query.dto';
import { QueryIncomeStatsDto } from './dto/query-income-stats.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(CashflowEntity)
    private readonly cashflowRepository: Repository<CashflowEntity>,
  ) {}

  async create(dto: CreateIncomeDto) {
    return this.cashflowRepository.create({
      ...dto,
      type: CashflowType.Income,
    });
  }

  async getAll(query: GetIncomeQuery) {
    return this.cashflowRepository.find({
      order: {
        ...(query.date && { dateOfIncome: query.date }),
        ...(query.alphabetic && { description: query.alphabetic }),
      },
      where: {
        type: CashflowType.Income,
      },
      take: query.perPage,
    });
  }

  async getStats(query: QueryIncomeStatsDto) {
    const profit = await this.cashflowRepository
      .createQueryBuilder('cashflow')
      .where('cashflow.type = :type', { type: CashflowType.Income })
      .where('cashflow.date >= :startDate AND cashflow.date <= endDate', {
        startDate: query.startDate,
        endDate: query.endDate,
      })
      .select('SUM(cashflow.amount)', 'sum')
      .getRawOne();
    const totalCount = await this.cashflowRepository.count({
      where: {
        type: CashflowType.Income,
        date: Raw(
          (alias) =>
            `${alias} >= ${query.startDate} AND ${alias} <= ${query.endDate}`,
        ),
      },
    });

    return { totalCount, profit };
  }

  async update(id: number, dto: UpdateIncomeDto) {
    return this.cashflowRepository.update({ id }, dto);
  }

  async delete(id: number) {
    return this.cashflowRepository.delete(id);
  }
}
