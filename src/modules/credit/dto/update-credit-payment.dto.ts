import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCreditPaymentDto } from './create-credit-payment.dto';

export class UpdateCreditPaymentDto implements Partial<CreateCreditPaymentDto> {
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
