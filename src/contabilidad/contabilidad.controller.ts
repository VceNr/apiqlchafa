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
import { ContabilidadService } from './contabilidad.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { CreateAsientoDto } from './dto/create-asiento.dto';

@Controller('contabilidad')
// @UseGuards(JwtAuthGuard)
export class ContabilidadController {
  constructor(private readonly contabilidadService: ContabilidadService) {}

  @Get('kpis')
  getKpis() {
    return this.contabilidadService.getKpis();
  }

  @Get('balance-general')
  getBalanceGeneral() {
    return this.contabilidadService.getBalanceGeneral();
  }

  @Get('estado-resultados')
  getEstadoResultados() {
    return this.contabilidadService.getEstadoResultados();
  }

  @Get('asientos')
  getAsientos() {
    return this.contabilidadService.getAsientos();
  }

  @Post('asientos')
  crearAsiento(@Body() dto: CreateAsientoDto) {
    return this.contabilidadService.crearAsiento(dto);
  }

  @Get('facturas')
  getFacturas() {
    return this.contabilidadService.getFacturas();
  }

  @Get('facturas/:id')
  getFactura(@Param('id', ParseIntPipe) id: number) {
    return this.contabilidadService.getFactura(id);
  }

  @Post('facturas')
  crearFactura(@Body() dto: CreateFacturaDto) {
    return this.contabilidadService.crearFactura(dto);
  }

  @Put('facturas/:id')
  actualizarFactura(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateFacturaDto>,
  ) {
    return this.contabilidadService.actualizarFactura(id, dto);
  }
}
