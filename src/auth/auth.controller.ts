import { Post, Controller, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() loginDto: LoginDto) {
    //jwt token
    const user = req.user;
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
