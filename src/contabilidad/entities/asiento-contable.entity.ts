import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('asientos_contables')
export class AsientoContable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numero: string;

  @Column()
  cuenta: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  debe: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  haber: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ nullable: true })
  descripcion: string;

  @CreateDateColumn()
  created_at: Date;
}
