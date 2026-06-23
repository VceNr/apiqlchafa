import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenVenta } from './entities/orden-venta.entity';
import { Vendedor } from './entities/vendedor.entity';
import { CreateOrdenVentaDto } from './dto/create-orden-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(OrdenVenta)
    private ordenVentaRepo: Repository<OrdenVenta>,
    @InjectRepository(Vendedor)
    private vendedorRepo: Repository<Vendedor>,
  ) {}

  async getKpis() {
    const totalOrdenes = await this.ordenVentaRepo.count();
    const pendientes = await this.ordenVentaRepo.count({ where: { estado: 'pendiente' } });
    const montoResult = await this.ordenVentaRepo
      .createQueryBuilder('o')
      .select('SUM(o.monto)', 'total')
      .getRawOne();
    const totalMonto = Number(montoResult?.total) || 0;
    const ticketPromedio = totalOrdenes > 0 ? Math.round(totalMonto / totalOrdenes) : 0;

    return {
      ventas_mes: totalMonto,
      variacion_mes: 8.5,
      ordenes_activas: pendientes,
      ticket_promedio: ticketPromedio,
      clientes_nuevos: 12,
      meta_cumplimiento: 78.4,
    };
  }

  async getVendedores(): Promise<Vendedor[]> {
    return this.vendedorRepo.find({ where: { activo: true }, order: { ventas_total: 'DESC' } });
  }

  getCanales() {
    return [
      { nombre: 'Directo', porcentaje: 45, monto: 128025000 },
      { nombre: 'Online', porcentaje: 28, monto: 79660000 },
      { nombre: 'Distribuidores', porcentaje: 18, monto: 51210000 },
      { nombre: 'Exportación', porcentaje: 9, monto: 25605000 },
    ];
  }

  async getOrdenes(): Promise<OrdenVenta[]> {
    return this.ordenVentaRepo.find({ order: { created_at: 'DESC' }, take: 50 });
  }

  async getOrden(id: string): Promise<OrdenVenta> {
    const orden = await this.ordenVentaRepo.findOneBy({ id: +id });
    if (!orden) throw new NotFoundException(`Orden ${id} no encontrada`);
    return orden;
  }

  async crearOrden(dto: CreateOrdenVentaDto): Promise<OrdenVenta> {
    const orden = this.ordenVentaRepo.create({
      ...dto,
      numero: `OV-${Date.now()}`,
      estado: dto.estado ?? 'pendiente',
    });
    return this.ordenVentaRepo.save(orden);
  }

  async actualizarOrden(id: string, dto: Partial<CreateOrdenVentaDto>): Promise<OrdenVenta> {
    const orden = await this.getOrden(id);
    Object.assign(orden, dto);
    return this.ordenVentaRepo.save(orden);
  }

  async eliminarOrden(id: string): Promise<{ message: string }> {
    const orden = await this.getOrden(id);
    await this.ordenVentaRepo.remove(orden);
    return { message: 'Orden eliminada exitosamente' };
  }
}
