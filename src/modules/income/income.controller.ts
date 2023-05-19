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
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeQuery } from './dto/get-income-query.dto';
import { IncomeService } from './income.service';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  async getAll(@Query() query: GetIncomeQuery) {
    return await this.incomeService.getAll(query);
  }

  @Post()
  async create(@Body() dto: CreateIncomeDto) {
    return await this.incomeService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateIncomeDto,
  ) {
    return await this.incomeService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.incomeService.delete(id);
  }
}
