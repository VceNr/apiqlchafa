import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('cuentas_bancarias')
export class CuentaBancaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  banco: string;

  @Column()
  tipo: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  saldo: number;

  @Column({ nullable: true })
  numero_cuenta: string;

  @Column({ default: true })
  activo: boolean;
}
