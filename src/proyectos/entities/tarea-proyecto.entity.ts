import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('tareas_proyecto')
export class TareaProyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proyecto_id: number;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  asignado_a: string;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: string;

  @Column({ default: 'media' })
  prioridad: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  created_at: Date;
}
