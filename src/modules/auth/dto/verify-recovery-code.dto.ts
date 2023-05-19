import { IsEmail, Matches } from 'class-validator'

export class VerifyRecoveryCodeDto {
  @Matches(/^[0-9]{6}$/, { message: 'recoveryCode should consist of 6 digits' })
  recoveryCode: string

  @IsEmail()
  email: string
}
