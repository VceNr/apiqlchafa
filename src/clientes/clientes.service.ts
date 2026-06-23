import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { OrdenVenta } from '../ventas/entities/orden-venta.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(OrdenVenta)
    private ordenVentaRepo: Repository<OrdenVenta>,
  ) {}

  async getKpis() {
    const totalClientes = await this.clienteRepo.count();
    const activos = await this.clienteRepo.count({ where: { estado: 'activo' } });

    return {
      total_clientes: totalClientes,
      clientes_activos: activos,
      nuevos_mes: 12,
      tasa_retencion: 94.2,
      deuda_total: 32450000,
      ticket_promedio: 3250000,
    };
  }

  async getSegmentos() {
    return this.clienteRepo
      .createQueryBuilder('c')
      .select('c.segmento', 'segmento')
      .addSelect('COUNT(*)', 'total')
      .groupBy('c.segmento')
      .getRawMany();
  }

  async getActividadReciente() {
    return this.clienteRepo
      .createQueryBuilder('c')
      .orderBy('c.ultima_orden', 'DESC')
      .take(5)
      .getMany();
  }

  async getClientes(): Promise<Cliente[]> {
    return this.clienteRepo.find({ order: { nombre: 'ASC' } });
  }

  async getCliente(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.findOneBy({ id });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado`);
    return cliente;
  }

  async crearCliente(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create({ ...dto, deuda: 0, estado: 'activo' });
    return this.clienteRepo.save(cliente);
  }

  async actualizarCliente(id: number, dto: Partial<CreateClienteDto>): Promise<Cliente> {
    const cliente = await this.getCliente(id);
    Object.assign(cliente, dto);
    return this.clienteRepo.save(cliente);
  }

  async getClienteOrdenes(id: string) {
    return this.ordenVentaRepo.find({
      where: { cliente_id: +id },
      order: { fecha: 'DESC' },
    });
  }

  async getClienteDeuda(id: string) {
    const cliente = await this.clienteRepo.findOneBy({ id: +id });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado`);
    return { deuda: cliente.deuda, cliente: cliente.nombre };
  }
}
