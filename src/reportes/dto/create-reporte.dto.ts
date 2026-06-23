import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateReporteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  modulo: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsBoolean()
  @IsOptional()
  programado?: boolean;

  @IsString()
  @IsOptional()
  programacion_cron?: string;
}
