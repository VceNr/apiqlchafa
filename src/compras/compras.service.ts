import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenCompra } from './entities/orden-compra.entity';
import { Proveedor } from './entities/proveedor.entity';
import { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(OrdenCompra)
    private ordenCompraRepo: Repository<OrdenCompra>,
    @InjectRepository(Proveedor)
    private proveedorRepo: Repository<Proveedor>,
  ) {}

  async getKpis() {
    const ordenesCount = await this.ordenCompraRepo.count();
    const pendientes = await this.ordenCompraRepo.count({ where: { estado: 'pendiente' } });
    const proveedoresActivos = await this.proveedorRepo.count({ where: { activo: true } });
    const gastoResult = await this.ordenCompraRepo
      .createQueryBuilder('o')
      .select('SUM(o.monto)', 'total')
      .getRawOne();
    const gastoTotal = Number(gastoResult?.total) || 0;

    return {
      gasto_mes: gastoTotal,
      variacion_mes: -3.2,
      ordenes_pendientes: pendientes,
      proveedores_activos: proveedoresActivos,
      tiempo_entrega_promedio_dias: 7.3,
      ahorro_negociacion: 4500000,
    };
  }

  async getGastoPorCategoria() {
    return this.proveedorRepo
      .createQueryBuilder('p')
      .select('p.categoria', 'categoria')
      .addSelect('SUM(p.monto_total)', 'monto')
      .groupBy('p.categoria')
      .getRawMany();
  }

  async getProveedores(): Promise<Proveedor[]> {
    return this.proveedorRepo.find({ where: { activo: true } });
  }

  async getProveedor(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepo.findOneBy({ id });
    if (!proveedor) throw new NotFoundException(`Proveedor ${id} no encontrado`);
    return proveedor;
  }

  async crearProveedor(dto: CreateProveedorDto): Promise<Proveedor> {
    const proveedor = this.proveedorRepo.create({
      ...dto,
      total_ordenes: 0,
      monto_total: 0,
      activo: true,
    });
    return this.proveedorRepo.save(proveedor);
  }

  async getOrdenes(): Promise<OrdenCompra[]> {
    return this.ordenCompraRepo.find({ order: { created_at: 'DESC' }, take: 50 });
  }

  async getOrden(id: number): Promise<OrdenCompra> {
    const orden = await this.ordenCompraRepo.findOneBy({ id });
    if (!orden) throw new NotFoundException(`Orden de compra ${id} no encontrada`);
    return orden;
  }

  async crearOrden(dto: CreateOrdenCompraDto): Promise<OrdenCompra> {
    const orden = this.ordenCompraRepo.create({
      ...dto,
      numero: `OC-${Date.now()}`,
      estado: dto.estado ?? 'pendiente',
    });
    return this.ordenCompraRepo.save(orden);
  }

  async actualizarOrden(id: number, dto: Partial<CreateOrdenCompraDto>): Promise<OrdenCompra> {
    const orden = await this.getOrden(id);
    Object.assign(orden, dto);
    return this.ordenCompraRepo.save(orden);
  }
}
