import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionGeneral } from './entities/configuracion-general.entity';
import { Integracion } from './entities/integracion.entity';
import { ConfiguracionNotificacion } from './entities/configuracion-notificacion.entity';
import { CreateConfiguracionGeneralDto } from './dto/create-configuracion-general.dto';

@Injectable()
export class ConfiguracionService {
  constructor(
    @InjectRepository(ConfiguracionGeneral)
    private configGeneralRepository: Repository<ConfiguracionGeneral>,
    @InjectRepository(Integracion)
    private integracionesRepository: Repository<Integracion>,
    @InjectRepository(ConfiguracionNotificacion)
    private notificacionesRepository: Repository<ConfiguracionNotificacion>,
  ) {}

  async getConfiguracionGeneral(): Promise<ConfiguracionGeneral | null> {
    return this.configGeneralRepository.findOne({ where: {} });
  }

  async updateConfiguracionGeneral(dto: CreateConfiguracionGeneralDto): Promise<ConfiguracionGeneral> {
    const existing = await this.configGeneralRepository.findOne({ where: {} });
    if (!existing) {
      const config = this.configGeneralRepository.create(dto);
      return this.configGeneralRepository.save(config);
    }
    Object.assign(existing, dto);
    return this.configGeneralRepository.save(existing);
  }

  getUsuarios() {
    return [
      { id: 1, username: 'admin', nombre: 'Administrador del Sistema', rol: 'admin', activo: true, ultimo_acceso: '2024-01-15T14:32:00Z' },
      { id: 2, username: 'jperez', nombre: 'Juan Carlos Pérez', rol: 'vendedor', activo: true, ultimo_acceso: '2024-01-15T13:55:00Z' },
      { id: 3, username: 'mgonzalez', nombre: 'María González', rol: 'compras', activo: true, ultimo_acceso: '2024-01-15T11:20:00Z' },
      { id: 4, username: 'crodriguez', nombre: 'Carolina Rodríguez', rol: 'contabilidad', activo: true, ultimo_acceso: '2024-01-14T18:45:00Z' },
      { id: 5, username: 'alopez', nombre: 'Andrés López', rol: 'inventario', activo: false, ultimo_acceso: '2023-12-20T09:00:00Z' },
    ];
  }

  async getIntegraciones(): Promise<Integracion[]> {
    const count = await this.integracionesRepository.count();
    if (count === 0) {
      return [
        { id: 1, nombre: 'SII (Servicio de Impuestos Internos)', ultimo_sync: new Date('2024-01-15T06:00:00Z'), estado: 'activo', activa: true, config_json: '{}' } as Integracion,
        { id: 2, nombre: 'Banco BCI - API Pagos', ultimo_sync: new Date('2024-01-15T12:00:00Z'), estado: 'activo', activa: true, config_json: '{}' } as Integracion,
        { id: 3, nombre: 'Correo Gmail SMTP', ultimo_sync: new Date('2024-01-15T14:00:00Z'), estado: 'activo', activa: true, config_json: '{}' } as Integracion,
        { id: 4, nombre: 'Proveedor Logística DHL', ultimo_sync: null as unknown as Date, estado: 'inactivo', activa: false, config_json: '{}' } as Integracion,
      ];
    }
    return this.integracionesRepository.find();
  }

  async updateIntegracion(id: number, dto: { activa?: boolean; [key: string]: any }): Promise<Integracion | null> {
    const integracion = await this.integracionesRepository.findOneBy({ id });
    if (!integracion) return null;
    integracion.activa = dto.activa ?? integracion.activa;
    integracion.estado = integracion.activa ? 'activo' : 'inactivo';
    return this.integracionesRepository.save(integracion);
  }

  async getNotificaciones(): Promise<ConfiguracionNotificacion[]> {
    const count = await this.notificacionesRepository.count();
    if (count === 0) {
      return [
        { id: 1, tipo: 'stock_critico', descripcion: 'Notificar cuando producto supera stock mínimo', activa: true } as ConfiguracionNotificacion,
        { id: 2, tipo: 'factura_vencida', descripcion: 'Notificar facturas vencidas', activa: true } as ConfiguracionNotificacion,
        { id: 3, tipo: 'orden_aprobada', descripcion: 'Notificar aprobación de órdenes de compra', activa: true } as ConfiguracionNotificacion,
        { id: 4, tipo: 'nuevo_empleado', descripcion: 'Notificar ingreso de nuevo empleado', activa: false } as ConfiguracionNotificacion,
        { id: 5, tipo: 'backup_completado', descripcion: 'Notificar cuando backup finaliza', activa: true } as ConfiguracionNotificacion,
      ];
    }
    return this.notificacionesRepository.find();
  }

  async updateNotificaciones(updates: Array<{ id: number; activa: boolean }>): Promise<ConfiguracionNotificacion[]> {
    for (const update of updates) {
      await this.notificacionesRepository.update(update.id, { activa: update.activa });
    }
    return this.notificacionesRepository.find();
  }
}
