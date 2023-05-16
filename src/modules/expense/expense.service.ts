import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from 'src/entities/expense.entity';

import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseQuery } from './dto/get-expense-query.dto';
import { UpdateExpanseDto } from './dto/update-expense.dto';
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly incomeRepository: Repository<ExpenseEntity>,
  ) {}

  async create(dto: CreateExpenseDto) {
    return this.incomeRepository.create(dto);
  }

  async getAll(query: GetExpenseQuery) {
    return await this.incomeRepository.find({
      order: {
        ...(query.date && { dateOfIncome: query.date }),
        ...(query.alphabetic && { description: query.alphabetic }),
      },
    });
  }

  async update(id: number, dto: UpdateExpanseDto) {
    return await this.incomeRepository.update(id, dto);
  }

  async delete(id: number) {
    return await this.incomeRepository.delete(id);
  }
}
