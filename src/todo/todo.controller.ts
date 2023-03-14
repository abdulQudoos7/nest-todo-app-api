import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId', ParseIntPipe) id: number) {
    return this.todoService.findByUserId(id);
  }

  @Get('completed/:userId')
  findCompletedByUserId(@Param('userId', ParseIntPipe) id: number) {
    return this.todoService.findCompletedByUserId(id);
  }

  @Get('not-completed/:userId')
  findNotCompletedByUserId(@Param('userId', ParseIntPipe) id: number) {
    return this.todoService.findNotCompletedByUserId(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
