import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  private role: string;
  constructor(role: string) {
    this.role = role;
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (this.role == request.user.role) return true;

    return false;
  }
}
