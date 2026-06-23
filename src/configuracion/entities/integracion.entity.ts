import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('integraciones')
export class Integracion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true, type: 'timestamp' })
  ultimo_sync: Date;

  @Column({ default: 'inactivo' })
  estado: string;

  @Column({ default: false })
  activa: boolean;

  @Column({ nullable: true, type: 'text' })
  config_json: string;
}
