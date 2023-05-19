import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('cashflow')
export class CashflowEntity extends BaseEntity {
  @Column({ type: Number, nullable: false })
  amount: number;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: Date, nullable: false })
  date: Date;

  @Column({ type: String })
  type: string;

  @ManyToOne(() => UserEntity)
  userId: number;
}
