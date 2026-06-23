import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('reportes')
export class Reporte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  modulo: string;

  @Column()
  tipo: string;

  @Column({ nullable: true, type: 'timestamp' })
  ultima_ejecucion: Date;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ default: false })
  programado: boolean;

  @Column({ nullable: true })
  programacion_cron: string;

  @CreateDateColumn()
  created_at: Date;
}
