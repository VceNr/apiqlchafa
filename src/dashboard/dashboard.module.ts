import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { OrdenVenta } from '../ventas/entities/orden-venta.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Empleado } from '../rrhh/entities/empleado.entity';
import { MovimientoFinanciero } from '../finanzas/entities/movimiento-financiero.entity';
import { Producto } from '../inventario/entities/producto.entity';
import { LogAuditoria } from '../auditoria/entities/log-auditoria.entity';
import { AlertaSeguridad } from '../auditoria/entities/alerta-seguridad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenVenta,
      Cliente,
      Empleado,
      MovimientoFinanciero,
      Producto,
      LogAuditoria,
      AlertaSeguridad,
    ]),
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
