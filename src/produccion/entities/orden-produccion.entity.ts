import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('ordenes_produccion')
export class OrdenProduccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numero: string;

  @Column()
  producto: string;

  @Column()
  cantidad: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progreso: number;

  @Column({ nullable: true })
  linea_produccion: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin: string;

  @CreateDateColumn()
  created_at: Date;
}
