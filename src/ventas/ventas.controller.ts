import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VentasService } from './ventas.service';
import { CreateOrdenVentaDto } from './dto/create-orden-venta.dto';

@Controller('ventas')
@UseGuards(JwtAuthGuard)
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get('kpis')
  getKpis() {
    return this.ventasService.getKpis();
  }

  @Get('vendedores')
  getVendedores() {
    return this.ventasService.getVendedores();
  }

  @Get('canales')
  getCanales() {
    return this.ventasService.getCanales();
  }

  @Get('ordenes')
  getOrdenes() {
    return this.ventasService.getOrdenes();
  }

  @Post('ordenes')
  crearOrden(@Body() dto: CreateOrdenVentaDto) {
    return this.ventasService.crearOrden(dto);
  }

  @Get('ordenes/:id')
  getOrden(@Param('id') id: string) {
    return this.ventasService.getOrden(id);
  }

  @Put('ordenes/:id')
  actualizarOrden(
    @Param('id') id: string,
    @Body() dto: Partial<CreateOrdenVentaDto>,
  ) {
    return this.ventasService.actualizarOrden(id, dto);
  }

  @Delete('ordenes/:id')
  eliminarOrden(@Param('id') id: string) {
    return this.ventasService.eliminarOrden(id);
  }
}
