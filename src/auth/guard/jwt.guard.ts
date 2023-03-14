import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Constants } from '../../../utils/constants';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
      if (request.url == Constants.BY_PASS_URLS[x]) return true;
    }
    return super.canActivate(context);
  }
}
