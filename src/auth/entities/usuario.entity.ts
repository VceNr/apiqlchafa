import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password_hash: string;

  @Column()
  nombre: string;

  @Column({ default: 'user' })
  rol: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  ultimo_acceso: Date;

  @CreateDateColumn()
  created_at: Date;
}
