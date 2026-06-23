import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './entities/proyecto.entity';
import { TareaProyecto } from './entities/tarea-proyecto.entity';
import { HorasProyecto } from './entities/horas-proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, TareaProyecto, HorasProyecto])],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
