import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { DepositService } from './deposit.service';
import { CreateDepositPaymentDto } from './dto/create-deposit-payment.dto';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { QueryDepositPayment } from './dto/query-deposit-payment.dto';
import { UpdateDepositPaymentDto } from './dto/update-deposit-payment.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { JwtGuard } from '../auth/guards';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @UseGuards(JwtGuard)
  @Get()
  getDeposits(@Headers('Authorization') authorization: string) {
    return this.depositService.getDeposits(authorization);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.depositService.get(id);
  }

  @Get(':id/payments')
  async getPayments(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: QueryDepositPayment,
    @Headers('Authorization') authorization: string,
  ) {
    return await this.depositService.getPayments(id, query, authorization);
  }

  @Post()
  async create(@Body() dto: CreateDepositDto) {
    return await this.depositService.create(dto);
  }

  @Post(':id/payments')
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

  @Patch(':id/payments')
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

  @Delete(':id/payments')
  async deletePayment(@Param('id') id: number) {
    return await this.depositService.deletePayment(id);
  }
}
