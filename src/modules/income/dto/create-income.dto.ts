import { IsDateString, IsNumber } from 'class-validator'

export class CreateIncomeDto {
  @IsNumber()
  amount: number

  @IsDateString()
  date: Date
}
