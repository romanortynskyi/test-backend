import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Raw, Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeQuery } from './dto/get-income-query.dto';
import { QueryIncomeStatsDto } from './dto/query-income-stats.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { AuthService } from '../auth/auth.service';
import { INCOME_NOT_FOUND } from 'src/consts/error-messages';
@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(CashflowEntity)
    private readonly cashflowRepository: Repository<CashflowEntity>,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateIncomeDto) {
    return this.cashflowRepository.save({
      ...dto,
      type: CashflowType.Income,
    });
  }

  async getAll(query: GetIncomeQuery, authorization: string) {
    const { id: userId } = await this.authService.getUserByToken(authorization)

    const {
      page,
      perPage,
    } = query

    return this.cashflowRepository
      .createQueryBuilder('cashflow')
      .where('cashflow.userId = :userId', { userId })
      .andWhere('cashflow.type = :type', { type: CashflowType.Income })
      .skip(page * perPage)
      .limit(perPage)
      .getMany()
  }

  async getStats(query: QueryIncomeStatsDto, authorization: string) {
    const { id: userId } = await this.authService.getUserByToken(authorization)

    const profit = await this.cashflowRepository
      .createQueryBuilder('cashflow')
      .where('cashflow.type = :type', { type: CashflowType.Income })
      .andWhere('cashflow.date >= :startDate AND cashflow.date <= endDate', {
        startDate: query.startDate,
        endDate: query.endDate,
      })
      .andWhere('cashflow.userId = :userId', { userId })
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
    const income = await this.cashflowRepository.findOneBy({
      id,
      type: CashflowType.Income,
    })

    if (!income) {
      throw new NotFoundException(INCOME_NOT_FOUND)
    }
    
    return this.cashflowRepository.save({
      ...income,
      ...dto,
    });
  }

  async delete(id: number) {
    return this.cashflowRepository.delete(id);
  }
}
