import { Controller, Get, Query } from '@nestjs/common'

import { UserService } from './user.service'
import { UserExistsByEmailDto } from './dto/user-exists-by-email.dto'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('exists-by-email')
  userExistsByEmail(@Query() query: UserExistsByEmailDto) {
    return this.userService.userExistsByEmail(query.email)
  }
}
