import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAjusteDto {
  @IsNumber()
  producto_id: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  nota?: string;

  @IsOptional()
  @IsString()
  usuario?: string;
}
