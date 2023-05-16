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

import { WithdrawService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller('deposits')
export class DepositController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.withdrawService.get(id);
  }

  @Post('')
  async create(@Body() dto: CreateDepositDto) {
    return await this.withdrawService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepositDto,
  ) {
    return await this.withdrawService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.withdrawService.delete(id);
  }
}
