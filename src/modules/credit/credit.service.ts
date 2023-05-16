import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditEntity } from 'src/entities/credit.entity';
import { Repository } from 'typeorm';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(CreditEntity)
    private readonly creditRepository: Repository<CreditEntity>,
  ) {}

  async get(id: number) {
    return this.creditRepository.findOne({ where: { id } });
  }

  async create(dto: CreateCreditDto) {
    return this.creditRepository.create(dto);
  }

  async update(id: number, dto: UpdateCreditDto) {
    return this.creditRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.creditRepository.delete(id);
  }
}
