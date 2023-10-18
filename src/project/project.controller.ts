import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformationInterceptor } from 'src/interceptor/transform.interceptor';
import { ResponseMessage } from 'src/decorator/response_message.decorator';
import { ApiFile } from 'src/decorator/file_upload.decorator';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Helper } from 'src/helpers/helper';

@Controller('api/project')
@ApiTags('project')
@UseInterceptors(TransformationInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Create data successfully...')
  create(@Body() createProjectDto: CreateProjectDto, @User() user) {
    return this.projectService.create(createProjectDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Fetch data successfully...')
  findAll(@User() user: any) {
    return this.projectService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Fetch data successfully...')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id/screenshot')
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
      destination: './uploads/projects',
      filename: Helper.customFileName,
    }),
  })
  uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.projectService.uploadScreenshot(file.filename, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Update data successfully...')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Delete data successfully...')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
