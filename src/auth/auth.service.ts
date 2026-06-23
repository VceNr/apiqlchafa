import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ access_token: string; user: { id: number; nombre: string; email: string | null; rol: string } }> {
    const usuario = await this.validateUser(dto.username, dto.password);
    const payload = { sub: usuario.id, username: usuario.username, rol: usuario.rol };
    await this.usuariosRepository.update(usuario.id, { ultimo_acceso: new Date() });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: (usuario as any).email || '',
        rol: usuario.rol,
      },
    };
  }

  async validateUser(username: string, password: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { username } });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const passwordValid = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }
    return usuario;
  }

  async getProfile(userId: number): Promise<Partial<Usuario>> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: userId } });
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const { password_hash: _pw, ...profile } = usuario;
    return profile;
  }

  async createUsuario(dto: CreateUsuarioDto): Promise<Usuario> {
    const hash = await bcrypt.hash(dto.password, 10);
    const usuario = this.usuariosRepository.create({
      username: dto.username,
      password_hash: hash,
      nombre: dto.nombre,
      rol: dto.rol || 'user',
      activo: dto.activo !== undefined ? dto.activo : true,
    });
    return this.usuariosRepository.save(usuario);
  }

  async findAllUsuarios(): Promise<Partial<Usuario>[]> {
    const usuarios = await this.usuariosRepository.find();
    return usuarios.map(({ password_hash: _pw, ...u }) => u);
  }
}
