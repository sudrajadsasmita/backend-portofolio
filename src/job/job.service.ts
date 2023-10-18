import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = new PrismaService();
  }
  async create(createJobDto: CreateJobDto, user: any) {
    const job = await this.prisma.job.create({
      data: {
        profileId: user.profile.id,
        title: createJobDto.title,
        position: createJobDto.position,
        company: createJobDto.company,
        description: createJobDto.description,
        status: createJobDto.status,
        startJob: new Date(createJobDto.startJob),
        endJob: new Date(createJobDto.endJob),
        isCurrent: createJobDto.isCurrent,
      },
    });
    return job;
  }

  async findAll(user: any) {
    const jobs = await this.prisma.job.findMany({
      where: {
        profileId: user.profile.id,
      },
    });
    jobs.forEach((job) => {
      job!.logo =
        job!.logo == null
          ? null
          : `http://localhost:${process.env.PORT}/file/${job?.logo}/job`;
    });
    return jobs;
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: {
        id: id,
      },
      include: {
        Project: true,
      },
    });
    job!.logo =
      job!.logo == null
        ? null
        : `http://localhost:${process.env.PORT}/file/${job?.logo}/job`;
    return job;
  }

  async uploadJobLogo(logo: string, id: string) {
    const job = await this.prisma.job.update({
      where: {
        id: id,
      },
      data: {
        logo: logo,
        updatedAt: new Date(Date.now()),
      },
    });
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.prisma.job.update({
      where: {
        id: id,
      },
      data: {
        title: updateJobDto.title,
        position: updateJobDto.position,
        company: updateJobDto.company,
        description: updateJobDto.description,
        status: updateJobDto.status,
        startJob: new Date(updateJobDto.startJob),
        endJob: new Date(updateJobDto.endJob),
        isCurrent: updateJobDto.isCurrent,
        updatedAt: new Date(Date.now()),
      },
    });
    return job;
  }

  async remove(id: string) {
    const job = await this.prisma.job.delete({
      where: {
        id: id,
      },
    });
    return job;
  }
}
