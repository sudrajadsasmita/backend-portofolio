import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/decorator/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = new PrismaService();
  }

  async create(createProjectDto: CreateProjectDto, userData: any) {
    console.log(userData);
    const user = await this.prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const project = await this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        description: createProjectDto.description,
        technologies: createProjectDto.technologies as Prisma.JsonArray,
        url: createProjectDto.url,
        repoUrl: createProjectDto.repoUrl,
        repoName: createProjectDto.repoName,
        profileId: user.profileId,
        jobId: createProjectDto.jobId,
      },
    });
    return project;
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
          : `http://localhost:${process.env.PORT}/file/${project?.screenshots}/project`;
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
        : `http://localhost:${process.env.PORT}/file/${project?.screenshots}/project`;
    return project;
  }

  async uploadScreenshot(fileName: string, id: string) {
    return await this.prisma.project.update({
      where: {
        id: id,
      },
      data: {
        screenshots: fileName,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.prisma.project.update({
      where: {
        id: id,
      },
      data: {
        title: updateProjectDto.title,
        description: updateProjectDto.description,
        technologies: updateProjectDto.technologies as Prisma.JsonArray,
        url: updateProjectDto.url,
        repoUrl: updateProjectDto.repoUrl,
        repoName: updateProjectDto.repoName,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.project.delete({
      where: {
        id: id,
      },
    });
  }
}
