import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContabilidadController } from './contabilidad.controller';
import { ContabilidadService } from './contabilidad.service';
import { Factura } from './entities/factura.entity';
import { AsientoContable } from './entities/asiento-contable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, AsientoContable])],
  controllers: [ContabilidadController],
  providers: [ContabilidadService],
  exports: [ContabilidadService],
})
export class ContabilidadModule {}
