import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon from 'argon2'

import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { SignUpRequestDto } from './dto/sign-up.request.dto'
import { UserResponseDto } from 'src/dto/user.response.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { getObjectWithoutKeys } from 'src/utils/get-object-without-keys'
import { LoginRequestDto } from './dto/login.request.dto'
import { EMAIL_ALREADY_EXISTS, WRONG_EMAIL_OR_PASSWORD } from 'src/consts/error-messages'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  signToken(user) {
    const secret = this.configService.get('JWT_SECRET')

    return this.jwtService.signAsync(user, {
      expiresIn: '365d',
      secret,
    })
  }

  async signUp(dto: SignUpRequestDto): Promise<UserResponseDto> {
    const {
      email,
      password,
      firstName,
      lastName,
    } = dto

    const userByEmail = await this.userRepository.findOneBy({
      email,
    })

    if (userByEmail) {
      throw new ConflictException(EMAIL_ALREADY_EXISTS)
    }
    
    const hashedPassword = await argon.hash(password)
    const userToInsert = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    }

    const user = await this.userRepository.save(userToInsert)

    const token = await this.signToken(user)
    const userWithToken = {
      ...getObjectWithoutKeys(user, ['password']),
      token,
    }

    return userWithToken
  }

  async login(dto: LoginRequestDto): Promise<UserResponseDto> {
    const { email, password } = dto

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'createdAt',
        'updatedAt',
      ],
    })
    
    if (!user) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD)
    }
    
    const passwordIsCorrect = await argon.verify(user.password, password)

    if (!passwordIsCorrect) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD)
    }
    
    const userWithoutPassword = getObjectWithoutKeys(user, ['password'])
    const token = await this.signToken(userWithoutPassword)
    const userWithToken = {
      ...userWithoutPassword,
      token,
    }
    
    return userWithToken
  }

  async getUserByToken(token: string): Promise<UserEntity> {
    const user = this.jwtService.decode(token)

    return user as UserEntity 
  }
}
