import { CashflowType } from 'src/types/cashflow.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CashflowEntity extends BaseEntity {
  @Column({ type: Number, nullable: false })
  amount: number;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: Date, nullable: false })
  date: Date;

  @Column({ enum: CashflowType })
  type: CashflowType;

  @ManyToOne(() => UserEntity, (user) => user.cashFlows)
  userId: string;
}
