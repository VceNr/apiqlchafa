import { IsString, IsOptional } from 'class-validator';

export class CreateConfiguracionGeneralDto {
  @IsString()
  @IsOptional()
  empresa?: string;

  @IsString()
  @IsOptional()
  rut?: string;

  @IsString()
  @IsOptional()
  moneda?: string;

  @IsString()
  @IsOptional()
  zona_horaria?: string;

  @IsString()
  @IsOptional()
  formato_fecha?: string;

  @IsString()
  @IsOptional()
  idioma?: string;

  @IsString()
  @IsOptional()
  tema?: string;
}
