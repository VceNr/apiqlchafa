import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Reporte } from './entities/reporte.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepo: Repository<Reporte>,
  ) {}

  async getReportes(): Promise<Reporte[]> {
    return this.reporteRepo.find({ order: { ultima_ejecucion: 'DESC' } });
  }

  async getProgramados(): Promise<Reporte[]> {
    return this.reporteRepo.find({ where: { programado: true } });
  }

  async getDescargasRecientes(): Promise<Reporte[]> {
    return this.reporteRepo.find({
      where: { ultima_ejecucion: Not(IsNull()) },
      order: { ultima_ejecucion: 'DESC' },
      take: 5,
    });
  }

  async getReporte(id: number): Promise<Reporte | null> {
    return this.reporteRepo.findOneBy({ id });
  }

  async generarReporte(id: number): Promise<{ url: string; generado_en: Date }> {
    const reporte = await this.reporteRepo.findOneBy({ id });
    if (reporte) {
      reporte.ultima_ejecucion = new Date();
      await this.reporteRepo.save(reporte);
    }
    return {
      url: '/exports/reporte-' + id + '.pdf',
      generado_en: new Date(),
    };
  }

  async exportarReporte(id: number): Promise<{ url: string }> {
    return {
      url: '/exports/reporte-' + id + '-export.xlsx',
    };
  }
}
