import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'src/modules/auth/auth.module'
import { UserModule } from 'src/modules/user/user.module'
import { envOptions, ormOptions } from './configs'
import { EmailModule } from './modules/email/email.module'

@Module({
  imports: [
    ConfigModule.forRoot(envOptions),
    TypeOrmModule.forRootAsync(ormOptions),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
