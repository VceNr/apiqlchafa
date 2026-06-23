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
import { ProduccionService } from './produccion.service';
import { CreateOrdenProduccionDto } from './dto/create-orden-produccion.dto';

@Controller('produccion')
// @UseGuards(JwtAuthGuard)
export class ProduccionController {
  constructor(private readonly produccionService: ProduccionService) {}

  @Get('kpis')
  getKpis() {
    return this.produccionService.getKpis();
  }

  @Get('lineas')
  getLineas() {
    return this.produccionService.getLineas();
  }

  @Put('lineas/:id')
  actualizarLinea(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Record<string, any>,
  ) {
    return this.produccionService.actualizarLinea(id, dto);
  }

  @Get('ordenes')
  getOrdenes() {
    return this.produccionService.getOrdenes();
  }

  @Get('ordenes/:id')
  getOrden(@Param('id', ParseIntPipe) id: number) {
    return this.produccionService.getOrden(id);
  }

  @Post('ordenes')
  crearOrden(@Body() dto: CreateOrdenProduccionDto) {
    return this.produccionService.crearOrden(dto);
  }

  @Put('ordenes/:id')
  actualizarOrden(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateOrdenProduccionDto>,
  ) {
    return this.produccionService.actualizarOrden(id, dto);
  }
}
