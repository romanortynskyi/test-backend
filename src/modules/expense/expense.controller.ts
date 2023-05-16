import {
  Body,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateIncomeDto } from '../income/dto/create-income.dto'
import { GetIncomeQuery } from '../income/dto/get-income-query.dto'
import { ExpenseService } from './expense.service'

@Injectable()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Get('')
  async getAll(@Query() query: GetIncomeQuery) {
    return await this.expenseService.getAll(query)
  }

  @Post('')
  async create(@Body() dto: CreateIncomeDto) {
    return await this.expenseService.create(dto)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateIncomeDto,
  ) {
    return await this.expenseService.update(id, dto)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.expenseService.delete(id)
  }
}
