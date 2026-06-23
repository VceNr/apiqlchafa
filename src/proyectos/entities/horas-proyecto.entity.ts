import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('horas_proyecto')
export class HorasProyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proyecto_id: number;

  @Column()
  usuario: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  horas: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ nullable: true })
  descripcion: string;

  @CreateDateColumn()
  created_at: Date;
}
