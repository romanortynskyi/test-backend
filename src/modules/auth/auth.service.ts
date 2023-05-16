import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon from 'argon2'

import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { SignUpDto } from './dto/sign-up.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { getObjectWithoutKeys } from 'src/utils/get-object-without-keys'
import { LoginDto } from './dto/login.dto'
import { EMAIL_ALREADY_EXISTS, WRONG_EMAIL_OR_PASSWORD } from 'src/consts/error-messages'
import { UploadService } from 'src/upload/upload.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private uploadService: UploadService,
  ) {}

  signToken(user: UserEntity): Promise<string> {
    const secret = this.configService.get('JWT_SECRET')

    return this.jwtService.signAsync(user, {
      expiresIn: '365d',
      secret,
    })
  }

  async signUp(dto: SignUpDto, imageFile: Express.Multer.File) {
    const {
      email,
      password,
      firstName,
      lastName,
    } = dto
console.log(imageFile)
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
      imgSrc: null,
      imgKey: null,
    }

    let imageResult

    if (imageFile) {
      try {
        imageResult = await this.uploadService.uploadFile(imageFile, (progress) => {
          console.log(progress)
          // this.socketGateway.server.emit(`image-upload-progress-${userId}`, progress)
        })
  
        userToInsert.imgSrc = imageResult.Location
        userToInsert.imgKey = imageResult.Key
      }
      
      catch(error) {
        console.error(error)
      }
    }
    
    const user = await this.userRepository.save(userToInsert)
    const userWithoutPassword = getObjectWithoutKeys(user, ['password'])
    const token = await this.signToken(userWithoutPassword)
    const userWithToken = {
      ...userWithoutPassword,
      token,
    }

    return userWithToken
  }

  async login(dto: LoginDto) {
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

  async getUserByToken(bearerToken: string) {
    const token = bearerToken.split(' ')[1]

    const { id } = this.jwtService.decode(token) as UserEntity

    const user = await this.userRepository.findOneBy({
      id,
    })

    return user 
  }
}
