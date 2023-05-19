import { IsIn, IsNumber } from 'class-validator';
import { OrderBy } from 'src/types/query.enum';

export class GetIncomeQuery {
  @IsNumber()
  page: number;

  @IsNumber()
  perPage: number;

  @IsIn([Object.values(OrderBy)])
  date?: OrderBy;

  @IsIn([Object.values(OrderBy)])
  alphabetic?: OrderBy;

  @IsIn([Object.values(OrderBy)])
  amount?: OrderBy;
}
