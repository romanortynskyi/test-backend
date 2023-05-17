import { IsDateString, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;
}
