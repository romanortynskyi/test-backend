import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { OrderBy } from 'src/types/query.enum';

export class GetIncomeQuery {
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  page: number;

  @IsNumber()
  @Transform((params) => parseInt(params.value))
  perPage: number;

  @IsOptional()
  @IsIn([Object.values(OrderBy)])
  date?: OrderBy;

  @IsOptional()
  @IsIn([Object.values(OrderBy)])
  alphabetic?: OrderBy;

  @IsOptional()
  @IsIn([Object.values(OrderBy)])
  amount?: OrderBy;
}
