import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  cliente: string;

  @Column({ nullable: true })
  responsable: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progreso: number;

  @Column({ type: 'date', nullable: true })
  fecha_limite: string;

  @Column({ default: 'activo' })
  estado: string;

  @CreateDateColumn()
  created_at: Date;
}
