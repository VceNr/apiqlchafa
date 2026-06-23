import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('logs_auditoria')
export class LogAuditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  usuario: string;

  @Column()
  accion: string;

  @Column()
  modulo: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ default: 'exitoso' })
  resultado: string;

  @Column({ nullable: true, type: 'text' })
  detalle: string;
}
