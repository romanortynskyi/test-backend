import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DepositEntity } from 'src/entities/deposit.entity';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectRepository(DepositEntity)
    private readonly withdrawRepository: Repository<DepositEntity>,
  ) {}

  async get(id: number) {
    return this.withdrawRepository.findOne({ where: { id } });
  }

  async create(dto: CreateDepositDto) {
    return this.withdrawRepository.create(dto);
  }

  async update(id: number, dto: UpdateDepositDto) {
    return this.withdrawRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.withdrawRepository.delete(id);
  }
}
