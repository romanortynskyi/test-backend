import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateDepositPaymentDto } from './create-deposit-payment.dto';

export class UpdateDepositPaymentDto
  implements Omit<Partial<CreateDepositPaymentDto>, 'userId'>
{
  @IsNumber()
  amount?: number;

  @IsDate()
  date?: Date;

  @IsString()
  description?: string;
}
