import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
  Put,
  Query,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseJson } from 'src/helpers/response';

@Controller('user')
export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  @Get('/')
  async get(@Res() res) {
    await this.userService
      .get()
      .then((users) => {
        return ResponseJson.success(res, 'Fetcing data successfuly...', users);
      })
      .catch((error) => {
        return ResponseJson.failure(
          res,
          error.message,
          error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
