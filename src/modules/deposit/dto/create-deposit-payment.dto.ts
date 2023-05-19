import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateDepositPaymentDto {
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  amount: number;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;

  @IsNumber()
  @Transform((params) => parseInt(params.value))
  userId: number;
}
