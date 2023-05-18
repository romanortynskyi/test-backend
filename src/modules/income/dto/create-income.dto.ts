import { IsDateString, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @MinLength(4)
  @IsString()
  description: string;

  @IsNumber()
  userId: number;
}
