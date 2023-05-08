import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'

import { UserEntity } from './src/entities/user.entity'
import { CreateUser1683525459189 } from './migrations/1683525459189-CreateUser'

config({
  path: '.env.local',
})
 
const configService = new ConfigService()
 
export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [UserEntity],
  migrations: [CreateUser1683525459189]
})
