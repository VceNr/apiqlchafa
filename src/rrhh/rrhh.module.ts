import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RrhhController } from './rrhh.controller';
import { RrhhService } from './rrhh.service';
import { Empleado } from './entities/empleado.entity';
import { Departamento } from './entities/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Departamento])],
  controllers: [RrhhController],
  providers: [RrhhService],
  exports: [RrhhService],
})
export class RrhhModule {}
