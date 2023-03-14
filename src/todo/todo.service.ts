import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todos.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        completed: createTodoDto.completed,
        userId: createTodoDto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.todos.findMany();
  }

  findByUserId(id: number) {
    return this.prisma.todos.findMany({
      where: {
        userId: id,
      },
    });
  }

  findCompletedByUserId(userId: number) {
    return this.prisma.todos.findMany({
      where: {
        userId: userId,
        completed: true,
      },
    });
  }

  findNotCompletedByUserId(userId: number) {
    return this.prisma.todos.findMany({
      where: {
        userId: userId,
        completed: false,
      },
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todos.update({
      where: {
        id: id,
      },
      data: {
        completed: updateTodoDto.completed,
      },
    });
  }

  remove(id: number) {
    return this.prisma.todos.delete({
      where: {
        id: id,
      },
    });
  }
}
