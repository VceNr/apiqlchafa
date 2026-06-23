import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('movimientos_inventario')
export class MovimientoInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // entrada | salida | ajuste

  @Column()
  producto_id: number;

  @Column()
  cantidad: number;

  @CreateDateColumn()
  fecha: Date;

  @Column({ nullable: true })
  usuario: string;

  @Column({ nullable: true })
  nota: string;
}
