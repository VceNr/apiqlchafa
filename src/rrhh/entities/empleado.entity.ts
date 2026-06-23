import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  cargo: string;

  @Column({ nullable: true })
  departamento: string;

  @Column({ type: 'date', nullable: true })
  fecha_ingreso: string;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  salario: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;
}
