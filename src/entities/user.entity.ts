import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { CashflowEntity } from './cashflow.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  imgSrc: string;

  @Column({ nullable: true })
  imgKey: string;

  @Column({ nullable: true })
  recoveryCode: string;

  @OneToMany(() => CashflowEntity, (cashflow) => cashflow.userId)
  cashFlows: CashflowEntity[];
}
