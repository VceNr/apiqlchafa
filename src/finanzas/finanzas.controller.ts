import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FinanzasService } from './finanzas.service';
import { CreateMovimientoDto } from './dto/create-movimiento-financiero.dto';

@Controller('finanzas')
// @UseGuards(JwtAuthGuard)
export class FinanzasController {
  constructor(private readonly finanzasService: FinanzasService) {}

  @Get('kpis')
  getKpis() {
    return this.finanzasService.getKpis();
  }

  @Get('cuentas')
  getCuentas() {
    return this.finanzasService.getCuentas();
  }

  @Get('cuentas-por-cobrar')
  getCuentasPorCobrar() {
    return this.finanzasService.getCuentasPorCobrar();
  }

  @Get('cuentas-por-pagar')
  getCuentasPorPagar() {
    return this.finanzasService.getCuentasPorPagar();
  }

  @Get('flujo-caja')
  getFlujoCaja() {
    return this.finanzasService.getFlujoCaja();
  }

  @Get('movimientos')
  getMovimientos() {
    return this.finanzasService.getMovimientos();
  }

  @Post('movimientos')
  registrarMovimiento(@Body() dto: CreateMovimientoDto) {
    return this.finanzasService.registrarMovimiento(dto);
  }
}
