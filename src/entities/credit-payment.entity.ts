import { Entity, ManyToOne } from 'typeorm';
import { CashflowEntity } from './cashflow.entity';
import { CreditEntity } from './credit.entity';

@Entity('credit_payment')
export class CreditPaymentEntity extends CashflowEntity {
  @ManyToOne(() => CreditEntity)
  creditId: number;
}
