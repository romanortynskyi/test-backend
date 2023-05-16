import { ConfigModuleOptions } from '@nestjs/config'

export const envOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env.local',
}
