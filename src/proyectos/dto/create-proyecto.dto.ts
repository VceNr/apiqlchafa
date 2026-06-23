import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsString()
  @IsNotEmpty()
  responsable: string;

  @IsString()
  fecha_limite: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
