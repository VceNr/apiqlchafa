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
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
@UseGuards(JwtAuthGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get('kpis')
  getKpis() {
    return this.clientesService.getKpis();
  }

  @Get('segmentos')
  getSegmentos() {
    return this.clientesService.getSegmentos();
  }

  @Get('actividad-reciente')
  getActividadReciente() {
    return this.clientesService.getActividadReciente();
  }

  @Get()
  getClientes() {
    return this.clientesService.getClientes();
  }

  @Post()
  crearCliente(@Body() dto: CreateClienteDto) {
    return this.clientesService.crearCliente(dto);
  }

  @Get(':id')
  getCliente(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.getCliente(id);
  }

  @Put(':id')
  actualizarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateClienteDto>,
  ) {
    return this.clientesService.actualizarCliente(id, dto);
  }

  @Get(':id/ordenes')
  getClienteOrdenes(@Param('id') id: string) {
    return this.clientesService.getClienteOrdenes(id);
  }

  @Get(':id/deuda')
  getClienteDeuda(@Param('id') id: string) {
    return this.clientesService.getClienteDeuda(id);
  }
}
