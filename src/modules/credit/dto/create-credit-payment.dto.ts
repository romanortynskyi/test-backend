import { IsDateString, IsNumber } from 'class-validator';

export class CreateCreditPaymentDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;
}
