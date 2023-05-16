import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DepositEntity } from 'src/entities/deposit.entity';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(DepositEntity)
    private readonly depositRepository: Repository<DepositEntity>,
  ) {}

  async get(id: number) {
    return this.depositRepository.findOne({ where: { id } });
  }

  async create(dto: CreateDepositDto) {
    return this.depositRepository.create(dto);
  }

  async update(id: number, dto: UpdateDepositDto) {
    return this.depositRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.depositRepository.delete(id);
  }
}
