import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateDepositDto {
  @IsString()
  title: string;

  @IsNumber()
  @Transform((params) => parseInt(params.value))
  totalAmountToPay: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  @Transform((params) => parseInt(params.value))
  userId: number;
}
