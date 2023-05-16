import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CashflowEntity } from 'src/entities/cashflow.entity';
import { CashflowType } from 'src/types/cashflow.enum';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseQuery } from './dto/get-expense-query.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(CashflowEntity)
    private readonly incomeRepository: Repository<CashflowEntity>,
  ) {}

  async create(dto: CreateExpenseDto) {
    return this.incomeRepository.create({ ...dto, type: CashflowType.Expense });
  }

  async getAll(query: GetExpenseQuery) {
    return await this.incomeRepository.find({
      order: {
        ...(query.date && { dateOfIncome: query.date }),
        ...(query.alphabetic && { description: query.alphabetic }),
      },
      where: { type: CashflowType.Expense },
    });
  }

  async update(id: number, dto: UpdateExpenseDto) {
    return await this.incomeRepository.update(id, dto);
  }

  async delete(id: number) {
    return await this.incomeRepository.delete(id);
  }
}
