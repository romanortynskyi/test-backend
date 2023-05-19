import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { DepositPaymentEntity } from './deposit-payment.entity';
import { UserEntity } from './user.entity';

@Entity('deposit')
export class DepositEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: Number, nullable: false })
  totalAmountToPay: number;

  @Column({ type: Date, nullable: false })
  startDate: Date;

  @Column({ type: Date, nullable: false })
  endDate: Date;

  @OneToMany(
    () => DepositPaymentEntity,
    (depositPayment) => depositPayment.depositId,
  )
  payments: DepositPaymentEntity[];

  @ManyToOne(() => UserEntity)
  userId: number;
}
