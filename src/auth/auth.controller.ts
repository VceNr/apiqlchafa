import {
  Controller,
  Post,
  Get,
  Body,
  // UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { GetUser } from './decorators/get-user.decorator';
// import { Usuario } from './entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  async logout() {
    return { message: 'Sesión cerrada' };
  }

  @Get('me')
  // @UseGuards(JwtAuthGuard)
  async getMe() {
    // In production: return this.authService.getProfile(user.id);
    return {
      id: 1,
      username: 'admin',
      nombre: 'Administrador del Sistema',
      rol: 'admin',
      activo: true,
      ultimo_acceso: new Date().toISOString(),
    };
  }
}
