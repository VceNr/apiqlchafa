import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenVenta } from '../ventas/entities/orden-venta.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Empleado } from '../rrhh/entities/empleado.entity';
import { MovimientoFinanciero } from '../finanzas/entities/movimiento-financiero.entity';
import { Producto } from '../inventario/entities/producto.entity';
import { LogAuditoria } from '../auditoria/entities/log-auditoria.entity';
import { AlertaSeguridad } from '../auditoria/entities/alerta-seguridad.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(OrdenVenta)
    private ordenVentaRepo: Repository<OrdenVenta>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Empleado)
    private empleadoRepo: Repository<Empleado>,
    @InjectRepository(MovimientoFinanciero)
    private movimientoRepo: Repository<MovimientoFinanciero>,
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
    @InjectRepository(LogAuditoria)
    private logRepo: Repository<LogAuditoria>,
    @InjectRepository(AlertaSeguridad)
    private alertaRepo: Repository<AlertaSeguridad>,
  ) {}

  async getKpis() {
    const now = new Date();
    const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);

    const [ventasMesResult, pedidosPendientes, clientesActivos, empleados, stockCritico] =
      await Promise.all([
        this.ordenVentaRepo
          .createQueryBuilder('o')
          .select('SUM(o.monto)', 'total')
          .where('o.created_at >= :inicio', { inicio: inicioMes })
          .getRawOne(),
        this.ordenVentaRepo.count({ where: { estado: 'pendiente' } }),
        this.clienteRepo.count({ where: { estado: 'activo' } }),
        this.empleadoRepo.count({ where: { activo: true } }),
        this.productoRepo
          .createQueryBuilder('p')
          .where('p.stock_actual <= p.stock_minimo')
          .getCount(),
      ]);

    const ventasMes = Number(ventasMesResult?.total) || 0;

    return [
      {
        label: 'Ventas del Mes',
        value: ventasMes.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }),
        delta: '',
        deltaDir: 'up' as const,
        color: 'blue',
      },
      {
        label: 'Pedidos Pendientes',
        value: pedidosPendientes.toString(),
        delta: 'órdenes',
        deltaDir: 'up' as const,
        color: 'amber',
      },
      {
        label: 'Stock Crítico',
        value: stockCritico.toString(),
        delta: stockCritico > 0 ? 'requieren reposición' : 'sin problemas',
        deltaDir: stockCritico > 0 ? ('down' as const) : ('up' as const),
        color: stockCritico > 0 ? 'red' : 'green',
      },
      {
        label: 'Clientes Activos',
        value: clientesActivos.toString(),
        delta: 'registrados',
        deltaDir: 'up' as const,
        color: 'teal',
      },
      {
        label: 'Empleados',
        value: empleados.toString(),
        delta: 'activos',
        deltaDir: 'up' as const,
        color: 'green',
      },
    ];
  }

  async getFinancialSummary() {
    const [ingresosResult, gastosResult, cuentasPorCobrarResult] = await Promise.all([
      this.movimientoRepo
        .createQueryBuilder('m')
        .select('SUM(m.monto)', 'total')
        .where('m.tipo = :tipo', { tipo: 'ingreso' })
        .getRawOne(),
      this.movimientoRepo
        .createQueryBuilder('m')
        .select('SUM(m.monto)', 'total')
        .where('m.tipo = :tipo', { tipo: 'gasto' })
        .getRawOne(),
      this.clienteRepo
        .createQueryBuilder('c')
        .select('SUM(c.deuda)', 'total')
        .where('c.deuda > 0')
        .getRawOne(),
    ]);

    const ingresos = Number(ingresosResult?.total) || 0;
    const gastos = Number(gastosResult?.total) || 0;
    const utilidad = ingresos - gastos;
    const margen = ingresos > 0 ? Math.round((utilidad / ingresos) * 100 * 10) / 10 : 0;
    const cuentasPorCobrar = Number(cuentasPorCobrarResult?.total) || 0;

    return { ingresos, gastos, utilidad, margen, cuentas_por_cobrar: cuentasPorCobrar };
  }

  async getRecentOrders() {
    const ordenes = await this.ordenVentaRepo.find({
      order: { created_at: 'DESC' },
      take: 5,
    });
    return ordenes.map(o => ({
      id: o.numero || `#${o.id}`,
      cliente: o.cliente || 'Sin cliente',
      monto: Number(o.monto),
      estado: o.estado,
      fecha: o.fecha || o.created_at?.toISOString().slice(0, 10) || '',
    }));
  }

  async getAlerts() {
    const [stockCritico, alertasDB] = await Promise.all([
      this.productoRepo
        .createQueryBuilder('p')
        .where('p.stock_actual <= p.stock_minimo')
        .getCount(),
      this.alertaRepo.find({ where: { resuelta: false }, order: { fecha: 'DESC' }, take: 10 }),
    ]);

    const alerts: Array<{ id: string; tipo: string; mensaje: string; modulo: string; fecha: string }> = [];

    if (stockCritico > 0) {
      alerts.push({
        id: 'stock-critico',
        tipo: 'stock_critico',
        mensaje: `${stockCritico} producto${stockCritico > 1 ? 's' : ''} bajo stock mínimo`,
        modulo: 'inventario',
        fecha: new Date().toISOString(),
      });
    }

    for (const a of alertasDB) {
      alerts.push({
        id: String(a.id),
        tipo: a.tipo,
        mensaje: a.descripcion,
        modulo: 'sistema',
        fecha: a.fecha?.toISOString() || '',
      });
    }

    return alerts;
  }

  getSystemStatus() {
    return {
      api: { estado: 'operativo', latencia_ms: 45 },
      base_datos: { estado: 'operativo' },
      version: '2.4.1',
    };
  }

  async getRecentActivity() {
    const logs = await this.logRepo.find({
      order: { fecha: 'DESC' },
      take: 5,
    });
    return logs.map(l => ({
      usuario: l.usuario,
      accion: l.accion,
      modulo: l.modulo,
      fecha: l.fecha?.toISOString() || '',
    }));
  }
}
