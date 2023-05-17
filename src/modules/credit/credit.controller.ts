import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreditService } from './credit.service';
import { CreateCreditPaymentDto } from './dto/create-credit-payment.dto';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.creditService.get(id);
  }

  @Post(':id/cashflow')
  async createCashflow(
    @Param('id') id: number,
    @Body() dto: CreateCreditPaymentDto,
  ) {
    return await this.creditService.createPayment(id, dto);
  }

  @Post()
  async create(@Body() dto: CreateCreditDto) {
    return await this.creditService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCreditDto,
  ) {
    return await this.creditService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.creditService.delete(id);
  }
}
