import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, givenPassword: string) {
    const loginUser = await this.userService.findByEmail(email);
    if (typeof loginUser === 'object') {
      if (loginUser && loginUser.password == givenPassword) {
        return loginUser;
      } else {
        throw new UnauthorizedException('password or email does not match');
      }
    }
    return loginUser;
  }
}
