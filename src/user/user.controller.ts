import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from '../auth/guard/role.guard';
import { Constants } from '../../utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserByEmailDto } from './dto/user-by-email.dto';
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiSecurity('JWT-auth')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiSecurity('JWT-auth')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiSecurity('JWT-auth')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
  @Post('/userBy/email')
  @ApiSecurity('JWT-auth')
  async getByEmail(@Body() email: UserByEmailDto) {
    return this.userService.findByEmail(email.email);
  }
}
