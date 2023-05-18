import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateDepositPaymentDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;

  @IsNumber()
  userId: number;
}
