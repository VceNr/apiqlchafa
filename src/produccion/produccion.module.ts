import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionController } from './produccion.controller';
import { ProduccionService } from './produccion.service';
import { OrdenProduccion } from './entities/orden-produccion.entity';
import { LineaProduccion } from './entities/linea-produccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProduccion, LineaProduccion])],
  controllers: [ProduccionController],
  providers: [ProduccionService],
  exports: [ProduccionService],
})
export class ProduccionModule {}
