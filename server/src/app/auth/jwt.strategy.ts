import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import constants from '../common/constants';

const { jwtSecret } = constants;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(req: any) {
    if (req === null) {
      throw new UnauthorizedException();
    }
    return req;
  }
}
