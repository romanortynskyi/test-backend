import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { CreditPaymentEntity } from './credit-payment.entity';
import { UserEntity } from './user.entity';
@Entity('credit')
export class CreditEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  description: string;

  @Column({ type: Number, nullable: false })
  totalAmountToPay: number;

  @Column({ type: Date, nullable: false })
  startDate: Date;

  @Column({ type: Date, nullable: false })
  endDate: Date;

  @OneToMany(
    () => CreditPaymentEntity,
    (creditPayment) => creditPayment.creditId,
  )
  payments: CreditPaymentEntity[];

  @ManyToOne(() => UserEntity)
  userId: number;
}
