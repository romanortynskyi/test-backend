import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @Matches(/^[0-9]{6}$/, { message: 'recoveryCode should consist of 6 digits' })
  recoveryCode: string;

  @IsString()
  @MinLength(6)
  password: string;
}
