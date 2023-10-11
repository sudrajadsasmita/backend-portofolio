import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformationInterceptor } from 'src/interceptor/transform.interceptor';
import { ResponseMessage } from 'src/decorator/response_message.decorator';

@Controller('user')
@ApiTags('user')
@UseInterceptors(TransformationInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage('Create data successfully...')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Fetch data successfully...')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Fetch data successfully...')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update data successfully...')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete data successfully...')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
