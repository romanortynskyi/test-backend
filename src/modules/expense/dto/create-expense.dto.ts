import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @Transform((params) => parseInt(params.value))
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;

  @Transform((params) => parseInt(params.value))
  @IsNumber()
  userId: number;
}
