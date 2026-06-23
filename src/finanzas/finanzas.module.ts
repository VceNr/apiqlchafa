import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanzasController } from './finanzas.controller';
import { FinanzasService } from './finanzas.service';
import { MovimientoFinanciero } from './entities/movimiento-financiero.entity';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoFinanciero, CuentaBancaria])],
  controllers: [FinanzasController],
  providers: [FinanzasService],
  exports: [FinanzasService],
})
export class FinanzasModule {}
