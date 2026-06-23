import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfiguracionService } from './configuracion.service';
import { CreateConfiguracionGeneralDto } from './dto/create-configuracion-general.dto';

@Controller('config')
// @UseGuards(JwtAuthGuard)
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Get('general')
  getGeneral() {
    return this.configuracionService.getConfiguracionGeneral();
  }

  @Put('general')
  actualizarGeneral(@Body() dto: CreateConfiguracionGeneralDto) {
    return this.configuracionService.updateConfiguracionGeneral(dto);
  }

  @Get('integraciones')
  getIntegraciones() {
    return this.configuracionService.getIntegraciones();
  }

  @Put('integraciones/:id')
  actualizarIntegracion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: { activa?: boolean; [key: string]: any },
  ) {
    return this.configuracionService.updateIntegracion(id, dto);
  }

  @Get('notificaciones')
  getNotificaciones() {
    return this.configuracionService.getNotificaciones();
  }

  @Put('notificaciones')
  actualizarNotificaciones(
    @Body() updates: Array<{ id: number; activa: boolean }>,
  ) {
    return this.configuracionService.updateNotificaciones(updates);
  }
}
