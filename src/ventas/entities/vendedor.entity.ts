import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('vendedores')
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  ventas_total: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  meta: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  porcentaje_cumplimiento: number;

  @Column({ default: true })
  activo: boolean;
}
