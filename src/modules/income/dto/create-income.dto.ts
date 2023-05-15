import { IsDate, IsNumber } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  amount: number;

  @IsDate()
  dateOfIncome: Date;
}
