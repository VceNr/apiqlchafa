import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaController } from './auditoria.controller';
import { AuditoriaService } from './auditoria.service';
import { LogAuditoria } from './entities/log-auditoria.entity';
import { AlertaSeguridad } from './entities/alerta-seguridad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogAuditoria, AlertaSeguridad])],
  controllers: [AuditoriaController],
  providers: [AuditoriaService],
  exports: [AuditoriaService],
})
export class AuditoriaModule {}
