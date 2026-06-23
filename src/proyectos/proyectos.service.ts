import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { TareaProyecto } from './entities/tarea-proyecto.entity';
import { HorasProyecto } from './entities/horas-proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,
    @InjectRepository(TareaProyecto)
    private tareaRepo: Repository<TareaProyecto>,
    @InjectRepository(HorasProyecto)
    private horasRepo: Repository<HorasProyecto>,
  ) {}

  async getKpis() {
    const activos = await this.proyectoRepo.count({ where: { estado: 'activo' } });
    const completados = await this.proyectoRepo.count({ where: { estado: 'completado' } });
    const enRiesgo = await this.proyectoRepo.count({ where: { estado: 'en_riesgo' } });
    const tareasPendientes = await this.tareaRepo.count({ where: { estado: 'pendiente' } });

    return {
      proyectos_activos: activos,
      proyectos_completados_mes: completados,
      tareas_pendientes: tareasPendientes,
      horas_registradas_mes: 456,
      proyectos_en_riesgo: enRiesgo,
      cumplimiento_fechas: 87.5,
    };
  }

  async getProyectos(): Promise<Proyecto[]> {
    return this.proyectoRepo.find({ order: { created_at: 'DESC' } });
  }

  async getProyecto(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectoRepo.findOneBy({ id });
    if (!proyecto) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return proyecto;
  }

  async crearProyecto(dto: CreateProyectoDto): Promise<Proyecto> {
    const proyecto = this.proyectoRepo.create({ ...dto, progreso: 0 });
    return this.proyectoRepo.save(proyecto);
  }

  async actualizarProyecto(id: number, dto: Partial<CreateProyectoDto>): Promise<Proyecto> {
    const proyecto = await this.getProyecto(id);
    Object.assign(proyecto, dto);
    return this.proyectoRepo.save(proyecto);
  }

  async getTareas(proyectoId: number): Promise<TareaProyecto[]> {
    return this.tareaRepo.find({
      where: { proyecto_id: proyectoId },
      order: { created_at: 'DESC' },
    });
  }

  async crearTarea(proyectoId: number, dto: Partial<TareaProyecto>): Promise<TareaProyecto> {
    const tarea = this.tareaRepo.create({ ...dto, proyecto_id: proyectoId });
    return this.tareaRepo.save(tarea);
  }

  async getHoras(proyectoId: number): Promise<HorasProyecto[]> {
    return this.horasRepo.find({
      where: { proyecto_id: proyectoId },
      order: { fecha: 'DESC' },
    });
  }

  async registrarHoras(proyectoId: number, dto: Partial<HorasProyecto>): Promise<HorasProyecto> {
    const horas = this.horasRepo.create({ ...dto, proyecto_id: proyectoId });
    return this.horasRepo.save(horas);
  }
}
