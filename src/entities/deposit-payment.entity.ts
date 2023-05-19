import { Entity, ManyToOne } from 'typeorm';
import { CashflowEntity } from './cashflow.entity';
import { DepositEntity } from './deposit.entity';

@Entity('deposit_payment')
export class DepositPaymentEntity extends CashflowEntity {
  @ManyToOne(() => DepositEntity)
  depositId: number;
}
