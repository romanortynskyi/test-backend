import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'
import { envOptions, ormOptions } from './configs'

@Module({
  imports: [
    ConfigModule.forRoot(envOptions),
    TypeOrmModule.forRootAsync(ormOptions),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
