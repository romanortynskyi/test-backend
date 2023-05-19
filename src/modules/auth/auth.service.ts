import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { getObjectWithoutKeys } from 'src/utils/get-object-without-keys';
import {
  EMAIL_ALREADY_EXISTS,
  INCORRECT_RECOVERY_CODE,
  USER_NOT_FOUND,
  WRONG_EMAIL_OR_PASSWORD,
} from 'src/consts/error-messages';
import { UploadService } from 'src/modules/upload/upload.service';
import { emailSubject } from 'src/consts/email-subject';
import { getRandomCode } from 'src/utils/get-random-code';
import { EmailService } from '../email/email.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyRecoveryCodeDto } from './dto/verify-recovery-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly uploadService: UploadService,
    private readonly emailService: EmailService,
  ) {}

  signToken(user: UserEntity) {
    const secret = this.configService.get('JWT_SECRET');

    return this.jwtService.signAsync(user, {
      expiresIn: '365d',
      secret,
    });
  }

  async signUp(dto: SignUpDto, imageFile: Express.Multer.File) {
    const { email, password, firstName, lastName } = dto;

    const userByEmail = await this.userRepository.findOneBy({
      email,
    });

    if (userByEmail) {
      throw new ConflictException(EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await argon.hash(password);
    const userToInsert = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      imgSrc: null,
      imgKey: null,
    };

    let imageResult;

    if (imageFile) {
      try {
        imageResult = await this.uploadService.uploadFile(imageFile, () => {});

        userToInsert.imgSrc = imageResult.Location;
        userToInsert.imgKey = imageResult.Key;
      } catch (error) {
        console.error(error);
      }
    }

    const user = await this.userRepository.save(userToInsert);
    const userWithoutPassword = getObjectWithoutKeys(user, ['password']);
    const token = await this.signToken(userWithoutPassword);
    const userWithToken = {
      ...userWithoutPassword,
      token,
    };

    return userWithToken;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: [
        'id',
        'firstName',
        'lastName',
        'imgSrc',
        'imgKey',
        'email',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD);
    }

    const passwordIsCorrect = await argon.verify(user.password, password);

    if (!passwordIsCorrect) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD);
    }

    const userWithoutPassword = getObjectWithoutKeys(user, ['password']);
    const token = await this.signToken(userWithoutPassword);
    const userWithToken = {
      ...userWithoutPassword,
      token,
    };

    return userWithToken;
  }

  async sendResetPasswordEmail(dto: ForgotPasswordDto) {
    const { email, language } = dto;

    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const { id, firstName } = user;
    const recoveryCode = getRandomCode(6);
    await this.userRepository.update(id, { recoveryCode });

    setTimeout(() => {
      this.userRepository.update(id, { recoveryCode: null });
    }, 24 * 60 * 60 * 1000); // 24 hours

    await this.emailService.sendEmail({
      email,
      subject: emailSubject.RESET_PASSWORD,
      language,
      text: {
        recoveryCode,
        firstName,
      },
    });
  }

  async verifyRecoveryCode(dto: VerifyRecoveryCodeDto) {
    const { email, recoveryCode } = dto;

    const user = await this.userRepository.findOneBy({
      email,
      recoveryCode,
    });

    if (!user) {
      throw new BadRequestException(INCORRECT_RECOVERY_CODE);
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { email, recoveryCode, password } = dto;

    const user = await this.userRepository.findOneBy({
      email,
      recoveryCode,
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const hashedPassword = await argon.hash(password);

    await this.userRepository.update(
      {
        email,
        recoveryCode,
      },
      { password: hashedPassword },
    );
  }

  async getUserByToken(bearerToken: string) {
    const token = bearerToken.split(' ')[1];

    const { id } = this.jwtService.decode(token) as UserEntity;

    const user = await this.userRepository.findOneBy({
      id,
    });

    return user;
  }
}
