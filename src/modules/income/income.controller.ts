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
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeQuery } from './dto/get-income-query.dto';
import { IncomeService } from './income.service';
import { JwtGuard } from '../auth/guards';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAll(@Headers('Authorization') authorization: string, @Query() query: GetIncomeQuery) {
    return await this.incomeService.getAll(query, authorization);
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
