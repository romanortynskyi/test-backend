import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDepositDto } from './create-deposit.dto';

export class UpdateDepositDto
  implements Omit<Partial<CreateDepositDto>, 'userId'>
{
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  totalAmountToPay?: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
