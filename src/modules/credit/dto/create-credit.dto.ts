import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateCreditDto {
  @IsString()
  description: string;

  @IsNumber()
  totalAmountToPay: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  userId: number;
}
