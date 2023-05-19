import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserExistsByEmailDto } from './dto/user-exists-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.updateUser(id, dto, image);
  }

  @Get('exists-by-email')
  userExistsByEmail(@Query() query: UserExistsByEmailDto) {
    return this.userService.userExistsByEmail(query.email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
