import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateDepositDto } from './create-deposit.dto';

export class UpdateDepositDto
  implements Omit<Partial<CreateDepositDto>, 'userId'>
{
  @IsString()
  title?: string;

  @IsNumber()
  totalAmountToPay?: number;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;
}
