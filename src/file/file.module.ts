import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [PrismaModule],
})
export class FileModule {}
