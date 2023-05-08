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
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [UserEntity],
  migrations: [CreateUser1683525459189]
})
