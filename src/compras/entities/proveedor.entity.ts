import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  categoria: string;

  @Column({ default: 0 })
  total_ordenes: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  monto_total: number;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ nullable: true })
  contacto: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: true })
  activo: boolean;
}
