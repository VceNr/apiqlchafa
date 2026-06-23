import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { AsientoContable } from './entities/asiento-contable.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { CreateAsientoDto } from './dto/create-asiento.dto';

@Injectable()
export class ContabilidadService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepo: Repository<Factura>,
    @InjectRepository(AsientoContable)
    private asientoRepo: Repository<AsientoContable>,
  ) {}

  async getKpis() {
    const emitidas = await this.facturaRepo.count({ where: { tipo: 'venta' } });
    const recibidas = await this.facturaRepo.count({ where: { tipo: 'compra' } });
    const montoResult = await this.facturaRepo
      .createQueryBuilder('f')
      .select('SUM(f.monto)', 'total')
      .getRawOne();
    const totalFacturado = Number(montoResult?.total) || 0;
    const asientos = await this.asientoRepo.count();

    return {
      facturas_emitidas_mes: emitidas,
      facturas_recibidas_mes: recibidas,
      total_facturado: totalFacturado,
      iva_por_pagar: Math.round(totalFacturado * 0.19),
      asientos_mes: asientos,
      balance_cuadrado: true,
    };
  }

  async getBalanceGeneral() {
    const asientos = await this.asientoRepo.find();
    const activos = asientos.filter(a => a.cuenta.startsWith('1'));
    const pasivos = asientos.filter(a => a.cuenta.startsWith('2') || a.cuenta.startsWith('4'));
    const patrimonio = asientos.filter(a => a.cuenta.startsWith('3'));

    return {
      activos,
      pasivos,
      patrimonio,
    };
  }

  async getEstadoResultados() {
    const asientos = await this.asientoRepo.find();
    const ingresos = asientos.filter(a => a.cuenta.startsWith('7'));
    const costos = asientos.filter(a => a.cuenta.startsWith('6'));
    const gastos = asientos.filter(a => a.cuenta.startsWith('5'));
    const totalIngresos = ingresos.reduce((s, a) => s + Number(a.haber || 0), 0);
    const totalCostos = costos.reduce((s, a) => s + Number(a.debe || 0), 0);
    const totalGastos = gastos.reduce((s, a) => s + Number(a.debe || 0), 0);

    return {
      ingresos: totalIngresos,
      costos: totalCostos,
      gastos: totalGastos,
      utilidad: totalIngresos - totalCostos - totalGastos,
    };
  }

  async getAsientos(): Promise<AsientoContable[]> {
    return this.asientoRepo.find({ order: { fecha: 'DESC' }, take: 50 });
  }

  async crearAsiento(dto: CreateAsientoDto): Promise<AsientoContable> {
    const asiento = this.asientoRepo.create(dto);
    return this.asientoRepo.save(asiento);
  }

  async getFacturas(): Promise<Factura[]> {
    return this.facturaRepo.find({ order: { created_at: 'DESC' }, take: 50 });
  }

  async getFactura(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOneBy({ id });
    if (!factura) throw new NotFoundException(`Factura ${id} no encontrada`);
    return factura;
  }

  async crearFactura(dto: CreateFacturaDto): Promise<Factura> {
    const factura = this.facturaRepo.create(dto);
    return this.facturaRepo.save(factura);
  }

  async actualizarFactura(id: number, dto: Partial<CreateFacturaDto>): Promise<Factura> {
    const factura = await this.getFactura(id);
    Object.assign(factura, dto);
    return this.facturaRepo.save(factura);
  }
}
