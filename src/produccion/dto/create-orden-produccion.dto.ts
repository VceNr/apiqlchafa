import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrdenProduccionDto {
  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsNumber()
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  linea_produccion: string;

  @IsOptional()
  @IsString()
  fecha_inicio?: string;

  @IsOptional()
  @IsString()
  fecha_fin?: string;
}
