import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { Departamento } from './entities/departamento.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Injectable()
export class RrhhService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepo: Repository<Empleado>,
    @InjectRepository(Departamento)
    private departamentoRepo: Repository<Departamento>,
  ) {}

  async getKpis() {
    const totalEmpleados = await this.empleadoRepo.count();
    const activos = await this.empleadoRepo.count({ where: { activo: true } });
    const salarioResult = await this.empleadoRepo
      .createQueryBuilder('e')
      .select('SUM(e.salario)', 'total')
      .where('e.activo = true')
      .getRawOne();
    const costoNomina = Number(salarioResult?.total) || 0;

    return {
      total_empleados: totalEmpleados,
      activos,
      nuevos_mes: 3,
      renuncias_mes: 1,
      tasa_rotacion: 1.1,
      costo_nomina_mes: costoNomina,
      ausencias_hoy: 4,
    };
  }

  async getCumpleanosProximos() {
    const empleados = await this.empleadoRepo.find({ where: { activo: true } });
    const today = new Date();
    const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return empleados
      .filter(e => {
        if (!e.fecha_nacimiento) return false;
        const bday = new Date(e.fecha_nacimiento);
        const next = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
        if (next < today) next.setFullYear(today.getFullYear() + 1);
        return next <= in30Days;
      })
      .map(e => {
        const bday = new Date(e.fecha_nacimiento);
        const next = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
        if (next < today) next.setFullYear(today.getFullYear() + 1);
        const dias = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return {
          id: e.id,
          nombre: e.nombre,
          cargo: e.cargo,
          departamento: e.departamento,
          fecha_nacimiento: e.fecha_nacimiento,
          dias_para_cumpleanos: dias,
        };
      });
  }

  getAusencias() {
    return [
      { empleado: 'Laura Jiménez Soto', tipo: 'Médica', desde: '2026-06-20', hasta: '2026-06-22' },
      { empleado: 'Roberto Salinas', tipo: 'Vacaciones', desde: '2026-06-18', hasta: '2026-06-28' },
      { empleado: 'Felipe Castillo', tipo: 'Permiso', desde: '2026-06-22', hasta: '2026-06-22' },
    ];
  }

  async getDepartamentos(): Promise<Departamento[]> {
    return this.departamentoRepo.find({ order: { nombre: 'ASC' } });
  }

  async getEmpleadosPorDepartamento(id: number): Promise<Empleado[]> {
    const dept = await this.departamentoRepo.findOneBy({ id });
    if (!dept) throw new NotFoundException(`Departamento ${id} no encontrado`);
    return this.empleadoRepo.find({ where: { departamento: dept.nombre } });
  }

  async getEmpleados(): Promise<Empleado[]> {
    return this.empleadoRepo.find({ where: { activo: true }, order: { nombre: 'ASC' } });
  }

  async getEmpleado(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepo.findOneBy({ id });
    if (!empleado) throw new NotFoundException(`Empleado ${id} no encontrado`);
    return empleado;
  }

  async crearEmpleado(dto: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = this.empleadoRepo.create({ ...dto, activo: true, estado: 'activo' });
    return this.empleadoRepo.save(empleado);
  }

  async actualizarEmpleado(id: number, dto: Partial<CreateEmpleadoDto>): Promise<Empleado> {
    const empleado = await this.getEmpleado(id);
    Object.assign(empleado, dto);
    return this.empleadoRepo.save(empleado);
  }
}
