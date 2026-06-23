import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('configuracion_general')
export class ConfiguracionGeneral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  empresa: string;

  @Column({ nullable: true })
  rut: string;

  @Column({ default: 'CLP' })
  moneda: string;

  @Column({ default: 'America/Santiago' })
  zona_horaria: string;

  @Column({ default: 'DD/MM/YYYY' })
  formato_fecha: string;

  @Column({ default: 'es' })
  idioma: string;

  @Column({ default: 'light' })
  tema: string;
}
