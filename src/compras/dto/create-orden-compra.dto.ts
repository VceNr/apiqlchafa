import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrdenCompraDto {
  @IsNumber()
  proveedor_id: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsString()
  fecha_entrega?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
