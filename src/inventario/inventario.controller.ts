import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InventarioService } from './inventario.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { CreateAjusteDto } from './dto/create-ajuste.dto';

@Controller('inventario')
@UseGuards(JwtAuthGuard)
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get('kpis')
  getKpis() {
    return this.inventarioService.getKpis();
  }

  @Get('stock-critico')
  getStockCritico() {
    return this.inventarioService.getStockCritico();
  }

  @Get('movimientos')
  getMovimientos() {
    return this.inventarioService.getMovimientos();
  }

  @Get('categorias')
  getCategorias() {
    return this.inventarioService.getCategorias();
  }

  @Get('productos')
  getProductos() {
    return this.inventarioService.getProductos();
  }

  @Get('productos/:sku')
  getProducto(@Param('sku') sku: string) {
    return this.inventarioService.getProducto(sku);
  }

  @Post('productos')
  crearProducto(@Body() dto: CreateProductoDto) {
    return this.inventarioService.crearProducto(dto);
  }

  @Put('productos/:sku')
  actualizarProducto(
    @Param('sku') sku: string,
    @Body() dto: Partial<CreateProductoDto>,
  ) {
    return this.inventarioService.actualizarProducto(sku, dto);
  }

  @Post('ajustes')
  registrarAjuste(@Body() dto: CreateAjusteDto) {
    return this.inventarioService.registrarAjuste(dto);
  }
}
