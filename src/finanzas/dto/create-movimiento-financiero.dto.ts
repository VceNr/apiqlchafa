import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMovimientoDto {
  @IsString()
  @IsNotEmpty()
  concepto: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  monto: number;

  @IsString()
  @IsNotEmpty()
  cuenta: string;

  @IsOptional()
  @IsString()
  fecha?: string;
}
