import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CreateCreditDto } from './create-credit.dto';

export class UpdateCreditDto
  implements Omit<Partial<CreateCreditDto>, 'userId'>
{
  @IsString()
  title?: string;

  @IsNumber()
  totalAmountToPay?: number;

  @IsDateString()
  startDate?: Date;

  @IsDateString()
  endDate?: Date;
}
