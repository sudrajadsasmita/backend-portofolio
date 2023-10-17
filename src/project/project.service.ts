import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/decorator/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import * as os from 'os';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async findAll(@User() user: any) {
    const projects = await this.prisma.project.findMany({
      where: {
        profileId: user.profile.id,
      },
    });

    projects.forEach((project) => {
      project!.screenshots =
        project!.screenshots == null
          ? null
          : `http://${os.hostname}:${process.env.PORT}/api/project-screenshots/${project?.screenshots}`;
    });
    return projects;
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
    project!.screenshots =
      project!.screenshots == null
        ? null
        : `http://${os.hostname}:${process.env.PORT}/api/project-screenshots/${project?.screenshots}`;
    return project;
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
