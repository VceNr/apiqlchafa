import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('lineas_produccion')
export class LineaProduccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  eficiencia: number;

  @Column({ default: 'activa' })
  estado: string;

  @Column({ default: 0 })
  unidades_hoy: number;

  @Column({ nullable: true })
  operador: string;
}
