import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RrhhService } from './rrhh.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Controller('rrhh')
@UseGuards(JwtAuthGuard)
export class RrhhController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Get('kpis')
  getKpis() {
    return this.rrhhService.getKpis();
  }

  @Get('cumpleanos-proximos')
  getCumpleanosProximos() {
    return this.rrhhService.getCumpleanosProximos();
  }

  @Get('ausencias')
  getAusencias() {
    return this.rrhhService.getAusencias();
  }

  @Get('departamentos')
  getDepartamentos() {
    return this.rrhhService.getDepartamentos();
  }

  @Get('departamentos/:id/empleados')
  getEmpleadosPorDepartamento(@Param('id', ParseIntPipe) id: number) {
    return this.rrhhService.getEmpleadosPorDepartamento(id);
  }

  @Get('empleados')
  getEmpleados() {
    return this.rrhhService.getEmpleados();
  }

  @Get('empleados/:id')
  getEmpleado(@Param('id', ParseIntPipe) id: number) {
    return this.rrhhService.getEmpleado(id);
  }

  @Post('empleados')
  crearEmpleado(@Body() dto: CreateEmpleadoDto) {
    return this.rrhhService.crearEmpleado(dto);
  }

  @Put('empleados/:id')
  actualizarEmpleado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateEmpleadoDto>,
  ) {
    return this.rrhhService.actualizarEmpleado(id, dto);
  }
}
