import {
  Column,
  Entity,
} from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string
}
