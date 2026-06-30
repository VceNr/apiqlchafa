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
import { ComprasService } from './compras.service';
import { CreateOrdenCompraDto } from './dto/create-orden-compra.dto';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Controller('compras')
@UseGuards(JwtAuthGuard)
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get('kpis')
  getKpis() {
    return this.comprasService.getKpis();
  }

  @Get('gasto-por-categoria')
  getGastoPorCategoria() {
    return this.comprasService.getGastoPorCategoria();
  }

  @Get('proveedores')
  getProveedores() {
    return this.comprasService.getProveedores();
  }

  @Get('proveedores/:id')
  getProveedor(@Param('id', ParseIntPipe) id: number) {
    return this.comprasService.getProveedor(id);
  }

  @Post('proveedores')
  crearProveedor(@Body() dto: CreateProveedorDto) {
    return this.comprasService.crearProveedor(dto);
  }

  @Get('ordenes')
  getOrdenes() {
    return this.comprasService.getOrdenes();
  }

  @Get('ordenes/:id')
  getOrden(@Param('id', ParseIntPipe) id: number) {
    return this.comprasService.getOrden(id);
  }

  @Post('ordenes')
  crearOrden(@Body() dto: CreateOrdenCompraDto) {
    return this.comprasService.crearOrden(dto);
  }

  @Put('ordenes/:id')
  actualizarOrden(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateOrdenCompraDto>,
  ) {
    return this.comprasService.actualizarOrden(id, dto);
  }
}
