import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  nombre: string;

  @Column({ default: 0 })
  stock_actual: number;

  @Column({ default: 0 })
  stock_minimo: number;

  @Column({ nullable: true })
  categoria: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  precio: number;

  @Column({ default: 'activo' })
  estado: string;

  @CreateDateColumn()
  created_at: Date;
}
