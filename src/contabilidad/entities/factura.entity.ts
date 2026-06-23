import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numero: string;

  @Column()
  cliente_proveedor: string;

  @Column()
  tipo: string; // venta | compra

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: string;

  @CreateDateColumn()
  created_at: Date;
}
