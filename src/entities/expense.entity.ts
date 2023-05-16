import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ExpenseEntity extends BaseEntity {
  @Column({ type: Number, nullable: false })
  amount: number;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: Date, nullable: false })
  dateOfIncome: Date;

  @ManyToOne(() => UserEntity)
  userId: string;
}
