import { IsDateString } from 'class-validator';

export class QueryIncomeStatsDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
