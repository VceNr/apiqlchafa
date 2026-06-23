import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsOptional()
  @IsString()
  departamento?: string;

  @IsOptional()
  @IsString()
  fecha_ingreso?: string;

  @IsOptional()
  @IsNumber()
  salario?: number;

  @IsEmail()
  email: string;
}
