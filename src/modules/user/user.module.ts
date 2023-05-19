import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from 'src/entities/user.entity'
import { UploadModule } from 'src/modules/upload/upload.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UploadModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
