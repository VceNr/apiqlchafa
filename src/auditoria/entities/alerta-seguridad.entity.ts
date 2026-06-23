import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('alertas_seguridad')
export class AlertaSeguridad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  descripcion: string;

  @Column({ default: 'MEDIA' })
  severidad: string; // ALTA | MEDIA | BAJA

  @CreateDateColumn()
  fecha: Date;

  @Column({ default: false })
  resuelta: boolean;
}
