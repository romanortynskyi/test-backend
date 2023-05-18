import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeQuery } from './dto/get-income-query.dto';
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

  async update(id: number, dto: UpdateIncomeDto) {
    return this.cashflowRepository.update({ id }, dto);
  }

  async delete(id: number) {
    return this.cashflowRepository.delete(id);
  }
}
