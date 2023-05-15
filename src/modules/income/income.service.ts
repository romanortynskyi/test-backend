import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeEntity } from 'src/entities/income.entity';

import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeQuery } from './dto/get-income-query.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
  ) {}

  async create(dto: CreateIncomeDto) {
    return this.incomeRepository.create(dto);
  }

  async getAll(query: GetIncomeQuery) {
    return this.incomeRepository.find({
      order: {
        ...(query.date && { dateOfIncome: query.date }),
        ...(query.alphabetic && { description: query.alphabetic }),
      },
    });
  }

  async update(id: number, dto: UpdateIncomeDto) {
    return this.incomeRepository.update({ id }, dto);
  }

  async delete(id: number) {
    return this.incomeRepository.softDelete({ id });
  }
}
