import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformationInterceptor } from 'src/interceptor/transform.interceptor';
import { ResponseMessage } from 'src/decorator/response_message.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { ApiFile } from 'src/decorator/file_upload.decorator';
import { Helper } from 'src/helpers/helper';
import { extname } from 'path';

@Controller('api/user')
@ApiTags('user')
@UseInterceptors(TransformationInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Create data successfully...')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Fetch data successfully...')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Fetch data successfully...')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Update data successfully...')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/photo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Upload data successfully...')
  @ApiFile('file', true, {
    limits: {
      fileSize: 1024 * 1024 * 4,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
    storage: diskStorage({
      destination: './uploads/profiles',
      filename: Helper.customFileName,
    }),
  })
  uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') userId: string,
  ) {
    return this.userService.uploadPhoto(file.filename, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Delete data successfully...')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
