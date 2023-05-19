import { IsDateString } from 'class-validator';

export class QueryExpenseStatsDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
