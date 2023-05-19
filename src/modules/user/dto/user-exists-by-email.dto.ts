import { IsEmail } from 'class-validator';

export class UserExistsByEmailDto {
  @IsEmail()
  email: string;
}
