import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateCreditDto {
  @IsString()
  title: string;

  @IsNumber()
  totalAmountToPay: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
