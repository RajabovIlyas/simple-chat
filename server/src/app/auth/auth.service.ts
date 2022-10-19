import { Injectable } from '@nestjs/common';
import * as randomName from 'node-random-name';
import { UserService } from '../user/user.service';
import constants from '../common/constants';
import { JwtService } from '@nestjs/jwt';
import { User } from "../user/user.entity";

const { pictureUrl } = constants;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp() {
    const name = randomName();
    const user = await this.userService.create({
      name,
      picture: `${pictureUrl}${name}`,
    });

    return { token: await this.getJwtToken(user), user };
  }

  authMe(userId: string) {
    return this.userService.findOne({ id: userId });
  }

  public async getJwtToken(user: User): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

}
