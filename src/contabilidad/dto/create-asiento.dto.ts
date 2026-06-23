import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAsientoDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  cuenta: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  debe?: number;

  @IsOptional()
  @IsNumber()
  haber?: number;

  @IsString()
  fecha: string;
}
