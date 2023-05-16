import { IsIn } from 'class-validator';

import { OrderBy } from 'src/types/query.enum';

export class GetIncomeQuery {
  @IsIn([Object.values(OrderBy)])
  date?: OrderBy;

  @IsIn([Object.values(OrderBy)])
  alphabetic?: OrderBy;
}
