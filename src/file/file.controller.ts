import { Controller, Get, Header, HttpCode, Param, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @HttpCode(201)
  @Get(':userId/profile')
  @Header('Content-Type', 'image/png')
  async readProfile(@Param('userId') userId: string, @Res() res) {
    return this.fileService.readProfile(userId, res);
  }
  @HttpCode(201)
  @Get(':projectId/project')
  @Header('Content-Type', 'image/png')
  async readProjectScreenshot(@Param('projectId') userId: string, @Res() res) {
    return this.fileService.readProjectScreenshot(userId, res);
  }
}
