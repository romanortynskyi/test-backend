import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from 'src/entities/user.entity'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy'
import { UploadModule } from 'src/modules/upload/upload.module'
import { EmailModule } from '../email/email.module'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity]),
    UploadModule,
    EmailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
