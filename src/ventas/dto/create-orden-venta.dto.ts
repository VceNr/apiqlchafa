import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrdenVentaDto {
  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsString()
  vendedor?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  fecha?: string;
}
