import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('configuracion_notificaciones')
export class ConfiguracionNotificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: true })
  activa: boolean;
}
