import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionController } from './configuracion.controller';
import { ConfiguracionService } from './configuracion.service';
import { ConfiguracionGeneral } from './entities/configuracion-general.entity';
import { Integracion } from './entities/integracion.entity';
import { ConfiguracionNotificacion } from './entities/configuracion-notificacion.entity';
import { Usuario } from '../auth/entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfiguracionGeneral, Integracion, ConfiguracionNotificacion, Usuario]),
    AuthModule,
  ],
  controllers: [ConfiguracionController],
  providers: [ConfiguracionService],
  exports: [ConfiguracionService],
})
export class ConfiguracionModule {}
