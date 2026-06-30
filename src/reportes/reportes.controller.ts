import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportesService } from './reportes.service';

@Controller('reportes')
@UseGuards(JwtAuthGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get()
  getReportes() {
    return this.reportesService.getReportes();
  }

  @Get('programados')
  getProgramados() {
    return this.reportesService.getProgramados();
  }

  @Get('descargas-recientes')
  getDescargasRecientes() {
    return this.reportesService.getDescargasRecientes();
  }

  @Get(':id')
  getReporte(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.getReporte(id);
  }

  @Post(':id/generar')
  generarReporte(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.generarReporte(id);
  }

  @Get(':id/exportar')
  exportarReporte(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.exportarReporte(id);
  }
}
