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
} from '@nestjs/common';

import { CreditService } from './credit.service';
import { CreateCreditPaymentDto } from './dto/create-credit-payment.dto';
import { CreateCreditDto } from './dto/create-credit.dto';
import { QueryCreditPayment } from './dto/query-credit-payment.dto';
import { UpdateCreditPaymentDto } from './dto/update-credit-payment.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.creditService.get(id);
  }

  @Post(':id/payments')
  async createPayment(
    @Param('id') id: number,
    @Body() dto: CreateCreditPaymentDto,
  ) {
    return await this.creditService.createPayment(id, dto);
  }

  // @UseGuards(JwtGuard)
  @Get(':id/payments')
  async getPayments(
    @Param('id') id: number,
    @Query() query: QueryCreditPayment,
    @Headers('Authorization') authorization: string,
  ) {
    return await this.creditService.getPayments(id, query, authorization);
  }

  @Patch(':id/payments')
  async updatePayment(
    @Param('id') id: number,
    @Body() dto: UpdateCreditPaymentDto,
  ) {
    return await this.creditService.updatePayment(id, dto);
  }

  @Delete(':id/payments')
  async deletePayment(@Param('id') id: number) {
    return await this.creditService.deletePayment(id);
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
