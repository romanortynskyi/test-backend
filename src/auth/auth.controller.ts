import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'

import { UserResponseDto } from 'src/dto/user.response.dto'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login.request.dto'
import { SignUpRequestDto } from './dto/sign-up.request.dto'
import { JwtGuard } from './guards'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpRequestDto): Promise<UserResponseDto> {
    return this.authService.signUp(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto): Promise<UserResponseDto> {
    return this.authService.login(dto)
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() request: Request) {
    return request.user
  }
}
