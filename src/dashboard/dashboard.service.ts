import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getKpis() {
    return {
      ventas_mes: { valor: 125430000, variacion: 8.5, unidad: 'CLP' },
      compras_mes: { valor: 78200000, variacion: -3.2, unidad: 'CLP' },
      margen_bruto: { valor: 37.6, variacion: 2.1, unidad: '%' },
      pedidos_pendientes: { valor: 47, variacion: 12, unidad: 'unidades' },
      clientes_activos: { valor: 234, variacion: 5, unidad: 'clientes' },
      empleados: { valor: 89, variacion: 2, unidad: 'personas' },
    };
  }

  getFinancialSummary() {
    return {
      ingresos: 125430000,
      gastos: 78200000,
      utilidad: 47230000,
      margen: 37.6,
      cuentas_por_cobrar: 32450000,
      cuentas_por_pagar: 18700000,
      flujo_caja: 28900000,
      presupuesto_ejecutado: 62.4,
    };
  }

  getRecentOrders() {
    return [
      { id: 1001, cliente: 'Empresa ABC Ltda', monto: 4850000, estado: 'pendiente', fecha: '2024-01-15' },
      { id: 1002, cliente: 'Comercial XYZ SpA', monto: 2340000, estado: 'procesando', fecha: '2024-01-15' },
      { id: 1003, cliente: 'Industrias Norte SA', monto: 7120000, estado: 'enviado', fecha: '2024-01-14' },
      { id: 1004, cliente: 'Distribuidora Sur Ltda', monto: 1890000, estado: 'entregado', fecha: '2024-01-14' },
      { id: 1005, cliente: 'Grupo Andino SA', monto: 5670000, estado: 'pendiente', fecha: '2024-01-13' },
    ];
  }

  getAlerts() {
    return [
      { id: 1, tipo: 'stock_critico', mensaje: '5 productos bajo stock mínimo', severidad: 'alta', modulo: 'inventario' },
      { id: 2, tipo: 'factura_vencida', mensaje: '3 facturas vencidas por cobrar', severidad: 'alta', modulo: 'finanzas' },
      { id: 3, tipo: 'orden_retrasada', mensaje: '2 órdenes de producción retrasadas', severidad: 'media', modulo: 'produccion' },
      { id: 4, tipo: 'empleado_cumpleanos', mensaje: '2 cumpleaños esta semana', severidad: 'baja', modulo: 'rrhh' },
    ];
  }

  getSystemStatus() {
    return {
      api: { estado: 'operativo', latencia_ms: 45 },
      base_datos: { estado: 'operativo', conexiones: 12, max_conexiones: 100 },
      almacenamiento: { estado: 'operativo', usado_gb: 45.2, total_gb: 200 },
      ultimo_backup: '2024-01-15T03:00:00Z',
      version: '2.4.1',
      uptime_horas: 720,
    };
  }

  getRecentActivity() {
    return [
      { id: 1, usuario: 'jperez', accion: 'Creó orden de venta #1005', modulo: 'ventas', fecha: '2024-01-15T14:32:00Z' },
      { id: 2, usuario: 'mgonzalez', accion: 'Aprobó orden de compra #OC-234', modulo: 'compras', fecha: '2024-01-15T13:55:00Z' },
      { id: 3, usuario: 'alopez', accion: 'Registró ingreso de inventario', modulo: 'inventario', fecha: '2024-01-15T13:20:00Z' },
      { id: 4, usuario: 'crodriguez', accion: 'Emitió factura #F-4521', modulo: 'contabilidad', fecha: '2024-01-15T12:45:00Z' },
      { id: 5, usuario: 'pmartinez', accion: 'Actualizó ficha empleado', modulo: 'rrhh', fecha: '2024-01-15T11:30:00Z' },
    ];
  }
}
