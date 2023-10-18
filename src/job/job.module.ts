import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [PrismaModule],
})
export class JobModule {}
