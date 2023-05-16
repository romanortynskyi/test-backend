import { Column } from 'typeorm';

import { BaseEntity } from './base.entity';

export class CreditEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: Number, nullable: false })
  totalAmountToPay: number;

  @Column({ type: Date, nullable: false })
  startDate: Date;

  @Column({ type: Date, nullable: false })
  endDate: Date;
}
