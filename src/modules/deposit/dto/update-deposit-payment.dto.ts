import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDepositPaymentDto } from './create-deposit-payment.dto';

export class UpdateDepositPaymentDto
  implements Omit<Partial<CreateDepositPaymentDto>, 'userId'>
{
  @IsOptional()
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  amount?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  description?: string;
}
