import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true, unique: true })
  rut: string;

  @Column({ nullable: true })
  segmento: string; // A | B | C

  @Column({ nullable: true, type: 'date' })
  ultima_orden: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  deuda: number;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  direccion: string;

  @CreateDateColumn()
  created_at: Date;
}
