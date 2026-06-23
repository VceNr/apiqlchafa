import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLogAuditoriaDto {
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  accion: string;

  @IsString()
  @IsNotEmpty()
  modulo: string;

  @IsString()
  @IsOptional()
  ip?: string;

  @IsString()
  @IsOptional()
  resultado?: string;

  @IsString()
  @IsOptional()
  detalle?: string;
}
