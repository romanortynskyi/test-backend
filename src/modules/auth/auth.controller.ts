import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { JwtGuard } from './guards'
import { ForgotPasswordDto } from './dto/forgot-password.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('image'))
  async signUp(@Body() dto: SignUpDto, @UploadedFile() image: Express.Multer.File) {
    return this.authService.signUp(dto, image)
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post('forgot-password')
  async sendResetPaswordEmail(@Body() dto: ForgotPasswordDto) {
    return this.authService.sendResetPasswordEmail(dto)
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Headers('Authorization') authorization: string) {
    return this.authService.getUserByToken(authorization)
  }
}
