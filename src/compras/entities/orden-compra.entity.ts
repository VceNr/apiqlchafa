import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('ordenes_compra')
export class OrdenCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numero: string;

  @Column()
  proveedor_id: number;

  @Column()
  descripcion: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fecha_entrega: string;

  @CreateDateColumn()
  created_at: Date;
}
