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
import { JwtGuard } from '../auth/guards';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseQuery } from './dto/get-expense-query.dto';
import { QueryExpenseStatsDto } from './dto/query-expense-stats.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAll(
    @Headers('Authorization') authorization: string,
    @Query() query: GetExpenseQuery,
  ) {
    return await this.expenseService.getAll(query, authorization);
  }

  @Get('/statistics')
  async getStats(@Query() query: QueryExpenseStatsDto) {
    return await this.expenseService.getStats(query);
  }

  @Post()
  async create(@Body() dto: CreateExpenseDto) {
    return await this.expenseService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return await this.expenseService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.expenseService.delete(id);
  }
}
