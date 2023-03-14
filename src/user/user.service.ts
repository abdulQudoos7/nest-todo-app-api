import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Constants } from '../../utils/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        role: Constants.ROLES.NORMAL_ROLE,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(email: string): Promise<CreateUserDto | string> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(`email ${email} not exists.`);
    }
    return user;
  }

  remove(userId: number) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
