import { JWT_SECRET } from '@app/config';
import { ExpressRequest } from '@app/types/expressRequestInterface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const verifiedToken = verify(token, JWT_SECRET) as UserEntity;

      const user = await this.userService.findById(verifiedToken.id);

      if (user) {
        req.user = user;
      }
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  }
}
