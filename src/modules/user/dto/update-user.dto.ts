import { Transform } from 'class-transformer'
import { IsBoolean, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  firstName: string

  @IsString()
  @MinLength(1)
  lastName: string

  @Transform(({ value }) => value === 'true')
  shouldDeleteImage: boolean
}
