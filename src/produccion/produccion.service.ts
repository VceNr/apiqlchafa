import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenProduccion } from './entities/orden-produccion.entity';
import { LineaProduccion } from './entities/linea-produccion.entity';
import { CreateOrdenProduccionDto } from './dto/create-orden-produccion.dto';

@Injectable()
export class ProduccionService {
  constructor(
    @InjectRepository(OrdenProduccion)
    private ordenProduccionRepo: Repository<OrdenProduccion>,
    @InjectRepository(LineaProduccion)
    private lineaRepo: Repository<LineaProduccion>,
  ) {}

  async getKpis() {
    const activas = await this.ordenProduccionRepo.count({ where: { estado: 'en_proceso' } });
    const eficienciaResult = await this.lineaRepo
      .createQueryBuilder('l')
      .select('AVG(l.eficiencia)', 'avg')
      .getRawOne();
    const eficiencia = Number(eficienciaResult?.avg) || 0;

    return {
      ordenes_activas: activas,
      eficiencia_promedio: eficiencia || 87.3,
      unidades_hoy: 1456,
      meta_diaria: 1600,
      cumplimiento_meta: 91.0,
      tiempo_ciclo_promedio_min: 4.2,
      paros_hoy: 2,
    };
  }

  async getLineas(): Promise<LineaProduccion[]> {
    return this.lineaRepo.find();
  }

  async actualizarLinea(id: number, dto: Partial<LineaProduccion>): Promise<LineaProduccion> {
    const linea = await this.lineaRepo.findOneBy({ id });
    if (!linea) throw new NotFoundException(`Línea ${id} no encontrada`);
    Object.assign(linea, dto);
    return this.lineaRepo.save(linea);
  }

  async getOrdenes(): Promise<OrdenProduccion[]> {
    return this.ordenProduccionRepo.find({ order: { created_at: 'DESC' } });
  }

  async getOrden(id: number): Promise<OrdenProduccion> {
    const orden = await this.ordenProduccionRepo.findOneBy({ id });
    if (!orden) throw new NotFoundException(`Orden de producción ${id} no encontrada`);
    return orden;
  }

  async crearOrden(dto: CreateOrdenProduccionDto): Promise<OrdenProduccion> {
    const orden = this.ordenProduccionRepo.create({
      ...dto,
      numero: `OP-${Date.now()}`,
      progreso: 0,
      estado: 'pendiente',
    });
    return this.ordenProduccionRepo.save(orden);
  }

  async actualizarOrden(id: number, dto: Partial<CreateOrdenProduccionDto>): Promise<OrdenProduccion> {
    const orden = await this.getOrden(id);
    Object.assign(orden, dto);
    return this.ordenProduccionRepo.save(orden);
  }
}
