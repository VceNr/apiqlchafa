import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  stock_actual: number;

  @IsNumber()
  stock_minimo: number;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsNumber()
  precio: number;
}
