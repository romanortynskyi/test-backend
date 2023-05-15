import { IsDate, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsDate()
  dateOfIncome: Date;
}
