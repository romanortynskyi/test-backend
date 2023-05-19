import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateCreditPaymentDto } from './create-credit-payment.dto';

export class UpdateCreditPaymentDto implements Partial<CreateCreditPaymentDto> {
  @IsNumber()
  amount?: number;

  @IsDate()
  date?: Date;

  @IsString()
  description?: string;
}
