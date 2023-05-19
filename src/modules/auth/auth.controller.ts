import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
  Query,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyRecoveryCodeDto } from './dto/verify-recovery-code.dto';
import { JwtGuard } from './guards';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('image'))
  signUp(@Body() dto: SignUpDto, @UploadedFile() image: Express.Multer.File) {
    return this.authService.signUp(dto, image);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Patch('forgot-password')
  @HttpCode(204)
  sendResetPaswordEmail(@Body() dto: ForgotPasswordDto) {
    return this.authService.sendResetPasswordEmail(dto);
  }

  @Patch('reset-password')
  @HttpCode(204)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Headers('Authorization') authorization: string) {
    return this.authService.getUserByToken(authorization);
  }

  @Get('verify-recovery-code')
  @HttpCode(204)
  verifyRecoveryCode(@Query() dto: VerifyRecoveryCodeDto) {
    return this.authService.verifyRecoveryCode(dto);
  }
}
