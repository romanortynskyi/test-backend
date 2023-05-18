import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;

  @IsNumber()
  userId: number;
}
