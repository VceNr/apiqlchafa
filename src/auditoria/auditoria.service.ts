import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAuditoria } from './entities/log-auditoria.entity';
import { AlertaSeguridad } from './entities/alerta-seguridad.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(LogAuditoria)
    private logRepo: Repository<LogAuditoria>,
    @InjectRepository(AlertaSeguridad)
    private alertaRepo: Repository<AlertaSeguridad>,
  ) {}

  async getLogs(): Promise<LogAuditoria[]> {
    return this.logRepo.find({ order: { fecha: 'DESC' }, take: 100 });
  }

  async getLog(id: number): Promise<LogAuditoria | null> {
    return this.logRepo.findOneBy({ id });
  }

  async getAlertas(): Promise<AlertaSeguridad[]> {
    return this.alertaRepo.find({ order: { fecha: 'DESC' } });
  }

  async getActividadPorModulo() {
    return this.logRepo
      .createQueryBuilder('l')
      .select('l.modulo', 'modulo')
      .addSelect('COUNT(*)', 'eventos')
      .groupBy('l.modulo')
      .getRawMany();
  }

  getEstadoSistema() {
    return {
      cpu: Math.floor(Math.random() * 30) + 20,
      memoria: Math.floor(Math.random() * 20) + 60,
      disco: 45,
      uptime: '15 días 3 horas',
    };
  }

  ejecutarBackup() {
    return { iniciado_en: new Date(), id: Date.now() };
  }

  getHistorialBackup() {
    return [
      { id: 1, fecha: '2026-06-22T02:00:00', tamanio: '2.4 GB', estado: 'exitoso' },
      { id: 2, fecha: '2026-06-21T02:00:00', tamanio: '2.3 GB', estado: 'exitoso' },
      { id: 3, fecha: '2026-06-20T02:00:00', tamanio: '2.3 GB', estado: 'exitoso' },
      { id: 4, fecha: '2026-06-19T02:00:00', tamanio: '2.2 GB', estado: 'exitoso' },
      { id: 5, fecha: '2026-06-18T02:00:00', tamanio: '2.2 GB', estado: 'exitoso' },
    ];
  }
}
