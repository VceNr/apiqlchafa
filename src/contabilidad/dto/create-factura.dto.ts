import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  cliente_proveedor: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  fecha_vencimiento?: string;
}
