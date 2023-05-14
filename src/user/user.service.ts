import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from 'src/entities/user.entity'
import { EMAIL_ALREADY_EXISTS } from 'src/consts/error-messages'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  
  async userExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      email,
    })

    if (!user) {
      return false
    }

    throw new ConflictException(EMAIL_ALREADY_EXISTS)
  }
}
