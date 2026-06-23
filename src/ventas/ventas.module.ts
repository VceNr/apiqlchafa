import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { OrdenVenta } from './entities/orden-venta.entity';
import { Vendedor } from './entities/vendedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenVenta, Vendedor])],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}
