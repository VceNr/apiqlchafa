import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuditoriaService } from './auditoria.service';

@Controller('auditoria')
// @UseGuards(JwtAuthGuard)
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Get('logs')
  getLogs() {
    return this.auditoriaService.getLogs();
  }

  @Get('logs/:id')
  getLog(@Param('id', ParseIntPipe) id: number) {
    return this.auditoriaService.getLog(id);
  }

  @Get('alertas')
  getAlertas() {
    return this.auditoriaService.getAlertas();
  }

  @Get('actividad-por-modulo')
  getActividadPorModulo() {
    return this.auditoriaService.getActividadPorModulo();
  }

  @Get('estado-sistema')
  getEstadoSistema() {
    return this.auditoriaService.getEstadoSistema();
  }

  @Post('backup')
  ejecutarBackup() {
    return this.auditoriaService.ejecutarBackup();
  }

  @Get('historial-backup')
  getHistorialBackup() {
    return this.auditoriaService.getHistorialBackup();
  }
}
