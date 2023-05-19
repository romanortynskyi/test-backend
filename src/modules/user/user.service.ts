import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import {
  EMAIL_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/consts/error-messages';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadService } from 'src/modules/upload/upload.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly uploadService: UploadService,
  ) {}

  async updateUser(
    id: number,
    dto: UpdateUserDto,
    imageFile: Express.Multer.File,
  ) {
    const { firstName, lastName, shouldDeleteImage } = dto;

    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (shouldDeleteImage && user.imgSrc) {
      await this.uploadService.deleteFile(user.imgKey);
    }

    const { imgSrc, imgKey } = user;

    let imageResult = {
      Location: imgSrc,
      Key: imgKey,
    };

    if (imageFile) {
      imageResult = await this.uploadService.uploadFile(imageFile, () => {});
    }

    return this.userRepository.save({
      ...user,
      firstName,
      lastName,
      imgSrc: imageResult.Location,
      imgKey: imageResult.Key,
    });
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      return false;
    }

    throw new ConflictException(EMAIL_ALREADY_EXISTS);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    await this.userRepository.delete(id);
  }
}
