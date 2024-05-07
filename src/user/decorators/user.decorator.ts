import { ExpressRequest } from '@app/types/expressRequestInterface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../user.entity';

export const User = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ExpressRequest>();

    if (!req.user) {
      return null;
    }

    if (data) {
      return req.user[data];
    }

    return req.user;
  },
);
