import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  amount: number;

  @IsDateString()
  date: Date;

  @MinLength(1)
  @IsString()
  description: string;

  @Transform((params) => parseInt(params.value))
  @IsNumber()
  userId: number;
}
