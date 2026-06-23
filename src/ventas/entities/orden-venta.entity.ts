import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('ordenes_venta')
export class OrdenVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numero: string;

  @Column({ nullable: true })
  cliente!: string;

  @Column({ nullable: true })
  cliente_id!: number;

  @Column({ nullable: true })
  vendedor!: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  monto: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fecha: string;

  @CreateDateColumn()
  created_at: Date;
}
