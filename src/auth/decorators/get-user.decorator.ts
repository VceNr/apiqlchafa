import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Usuario => {
    const request = ctx.switchToHttp().getRequest<{ user: Usuario }>();
    return request.user;
  },
);
