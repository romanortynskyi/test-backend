import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCreditDto } from './create-credit.dto';

export class UpdateCreditDto
  implements Omit<Partial<CreateCreditDto>, 'userId'>
{
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  totalAmountToPay?: number;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
