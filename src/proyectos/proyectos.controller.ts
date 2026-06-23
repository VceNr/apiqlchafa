import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Controller('proyectos')
// @UseGuards(JwtAuthGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get('kpis')
  getKpis() {
    return this.proyectosService.getKpis();
  }

  @Get()
  getProyectos() {
    return this.proyectosService.getProyectos();
  }

  @Get(':id')
  getProyecto(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.getProyecto(id);
  }

  @Post()
  crearProyecto(@Body() dto: CreateProyectoDto) {
    return this.proyectosService.crearProyecto(dto);
  }

  @Put(':id')
  actualizarProyecto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateProyectoDto>,
  ) {
    return this.proyectosService.actualizarProyecto(id, dto);
  }

  @Get(':id/tareas')
  getTareas(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.getTareas(id);
  }

  @Post(':id/tareas')
  crearTarea(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Record<string, any>,
  ) {
    return this.proyectosService.crearTarea(id, dto);
  }

  @Get(':id/horas')
  getHoras(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.getHoras(id);
  }

  @Post(':id/horas')
  registrarHoras(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Record<string, any>,
  ) {
    return this.proyectosService.registrarHoras(id, dto);
  }
}
