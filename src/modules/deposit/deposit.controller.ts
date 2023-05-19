import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { DepositService } from './deposit.service';
import { CreateDepositPaymentDto } from './dto/create-deposit-payment.dto';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { QueryDepositPayment } from './dto/query-deposit-payment.dto';
import { UpdateDepositPaymentDto } from './dto/update-deposit-payment.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.depositService.get(id);
  }

  @Get(':id/cashflow')
  async getCashflow(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: QueryDepositPayment,
  ) {
    return await this.depositService.getPayments(id, query);
  }

  @Post()
  async create(@Body() dto: CreateDepositDto) {
    return await this.depositService.create(dto);
  }

  @Post(':id/cashflow')
  async createPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateDepositPaymentDto,
  ) {
    return await this.depositService.createPayment(id, dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepositDto,
  ) {
    return await this.depositService.update(id, dto);
  }

  @Patch(':id/cashflow')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepositPaymentDto,
  ) {
    return await this.depositService.updatePayment(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.depositService.delete(id);
  }

  @Delete(':id/cashflow')
  async deletePayment(@Param('id') id: number) {
    return await this.depositService.deletePayment(id);
  }
}
