import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('movimientos_financieros')
export class MovimientoFinanciero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  concepto: string;

  @Column()
  tipo: string; // ingreso | gasto

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number;

  @Column({ nullable: true })
  cuenta: string;

  @CreateDateColumn()
  created_at: Date;
}
