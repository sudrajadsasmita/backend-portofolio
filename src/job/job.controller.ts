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
  HttpException,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransformationInterceptor } from 'src/interceptor/transform.interceptor';
import { ResponseMessage } from 'src/decorator/response_message.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorator/user.decorator';
import { ApiFile } from 'src/decorator/file_upload.decorator';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Helper } from 'src/helpers/helper';

@Controller('api/job')
@ApiTags('job')
@UseInterceptors(TransformationInterceptor)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Create data successfully...')
  create(@Body() createJobDto: CreateJobDto, @User() user: any) {
    return this.jobService.create(createJobDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Fetch data successfully...')
  findAll(@User() user: any) {
    return this.jobService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Fetch data successfully...')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id/logo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Upload data successfully...')
  @ApiFile('logo', true, {
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
      destination: './uploads/job',
      filename: Helper.customFileName,
    }),
  })
  uploadJobLogo(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.jobService.uploadJobLogo(file.filename, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Update data successfully...')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ResponseMessage('Delete data successfully...')
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
