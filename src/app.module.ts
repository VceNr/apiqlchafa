import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupabaseModule } from './supabase/supabase.module';

// Modules
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VentasModule } from './ventas/ventas.module';
import { ComprasModule } from './compras/compras.module';
import { InventarioModule } from './inventario/inventario.module';
import { ClientesModule } from './clientes/clientes.module';
import { FinanzasModule } from './finanzas/finanzas.module';
import { ContabilidadModule } from './contabilidad/contabilidad.module';
import { RrhhModule } from './rrhh/rrhh.module';
import { ProduccionModule } from './produccion/produccion.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { ReportesModule } from './reportes/reportes.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';

// Entities
import { Usuario } from './auth/entities/usuario.entity';
import { OrdenVenta } from './ventas/entities/orden-venta.entity';
import { Vendedor } from './ventas/entities/vendedor.entity';
import { OrdenCompra } from './compras/entities/orden-compra.entity';
import { Proveedor } from './compras/entities/proveedor.entity';
import { Producto } from './inventario/entities/producto.entity';
import { MovimientoInventario } from './inventario/entities/movimiento-inventario.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { MovimientoFinanciero } from './finanzas/entities/movimiento-financiero.entity';
import { CuentaBancaria } from './finanzas/entities/cuenta-bancaria.entity';
import { Factura } from './contabilidad/entities/factura.entity';
import { AsientoContable } from './contabilidad/entities/asiento-contable.entity';
import { Empleado } from './rrhh/entities/empleado.entity';
import { Departamento } from './rrhh/entities/departamento.entity';
import { OrdenProduccion } from './produccion/entities/orden-produccion.entity';
import { LineaProduccion } from './produccion/entities/linea-produccion.entity';
import { Proyecto } from './proyectos/entities/proyecto.entity';
import { TareaProyecto } from './proyectos/entities/tarea-proyecto.entity';
import { HorasProyecto } from './proyectos/entities/horas-proyecto.entity';
import { Reporte } from './reportes/entities/reporte.entity';
import { LogAuditoria } from './auditoria/entities/log-auditoria.entity';
import { AlertaSeguridad } from './auditoria/entities/alerta-seguridad.entity';
import { ConfiguracionGeneral } from './configuracion/entities/configuracion-general.entity';
import { Integracion } from './configuracion/entities/integracion.entity';
import { ConfiguracionNotificacion } from './configuracion/entities/configuracion-notificacion.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('DATABASE_URL');
        const entities = [
          Usuario,
          OrdenVenta,
          Vendedor,
          OrdenCompra,
          Proveedor,
          Producto,
          MovimientoInventario,
          Cliente,
          MovimientoFinanciero,
          CuentaBancaria,
          Factura,
          AsientoContable,
          Empleado,
          Departamento,
          OrdenProduccion,
          LineaProduccion,
          Proyecto,
          TareaProyecto,
          HorasProyecto,
          Reporte,
          LogAuditoria,
          AlertaSeguridad,
          ConfiguracionGeneral,
          Integracion,
          ConfiguracionNotificacion,
        ];
        const base = {
          type: 'postgres' as const,
          entities,
          synchronize: true,
          logging: false,
          ssl: { rejectUnauthorized: false },
          extra: { family: 4 },
        };
        if (url) return { ...base, url };
        return {
          ...base,
          host: configService.get<string>('DB_HOST') || 'localhost',
          port: configService.get<number>('DB_PORT') || 5432,
          username: configService.get<string>('DB_USERNAME') || 'postgres',
          password: configService.get<string>('DB_PASSWORD') || 'postgres',
          database: configService.get<string>('DB_DATABASE') || 'postgres',
        };
      },
    }),
    AuthModule,
    DashboardModule,
    VentasModule,
    ComprasModule,
    InventarioModule,
    ClientesModule,
    FinanzasModule,
    ContabilidadModule,
    RrhhModule,
    ProduccionModule,
    ProyectosModule,
    ReportesModule,
    AuditoriaModule,
    ConfiguracionModule,
    SupabaseModule,
  ],
})
export class AppModule {}
