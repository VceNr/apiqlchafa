import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { MovimientoInventario } from './entities/movimiento-inventario.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { CreateAjusteDto } from './dto/create-ajuste.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
    @InjectRepository(MovimientoInventario)
    private movimientoRepo: Repository<MovimientoInventario>,
  ) {}

  async getKpis() {
    const totalProductos = await this.productoRepo.count();
    const valorResult = await this.productoRepo
      .createQueryBuilder('p')
      .select('SUM(p.precio * p.stock_actual)', 'total')
      .getRawOne();
    const valorInventario = Number(valorResult?.total) || 0;
    const stockCritico = await this.productoRepo
      .createQueryBuilder('p')
      .where('p.stock_actual <= p.stock_minimo')
      .getCount();

    return {
      total_productos: totalProductos,
      valor_inventario: valorInventario,
      productos_stock_critico: stockCritico,
      rotacion_promedio_dias: 23,
      entradas_mes: 145,
      salidas_mes: 312,
    };
  }

  async getStockCritico() {
    return this.productoRepo
      .createQueryBuilder('p')
      .where('p.stock_actual <= p.stock_minimo')
      .getMany();
  }

  async getMovimientos(): Promise<MovimientoInventario[]> {
    return this.movimientoRepo.find({ order: { fecha: 'DESC' }, take: 50 });
  }

  async getCategorias() {
    return this.productoRepo
      .createQueryBuilder('p')
      .select('p.categoria', 'categoria')
      .addSelect('COUNT(*)', 'total_productos')
      .addSelect('SUM(p.precio * p.stock_actual)', 'valor')
      .groupBy('p.categoria')
      .getRawMany();
  }

  async getProductos(): Promise<Producto[]> {
    return this.productoRepo.find({ order: { nombre: 'ASC' } });
  }

  async getProducto(sku: string): Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({ sku });
    if (!producto) throw new NotFoundException(`Producto ${sku} no encontrado`);
    return producto;
  }

  async crearProducto(dto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepo.create({ ...dto, estado: 'activo' });
    return this.productoRepo.save(producto);
  }

  async actualizarProducto(sku: string, dto: Partial<CreateProductoDto>): Promise<Producto> {
    const producto = await this.getProducto(sku);
    Object.assign(producto, dto);
    return this.productoRepo.save(producto);
  }

  async registrarAjuste(dto: CreateAjusteDto): Promise<MovimientoInventario> {
    const movimiento = this.movimientoRepo.create({
      tipo: dto.tipo,
      producto_id: dto.producto_id,
      cantidad: dto.cantidad,
      nota: dto.nota,
      usuario: dto.usuario ?? 'sistema',
    });
    return this.movimientoRepo.save(movimiento);
  }
}
