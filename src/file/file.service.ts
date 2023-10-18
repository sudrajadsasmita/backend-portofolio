import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async readProfile(userId: string, res: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: false,
        createdAt: false,
        deletedAt: false,
        updatedAt: false,
        profile: true,
      },
    });
    const file = createReadStream(
      join(process.cwd(), `uploads/profiles/${user?.profile?.photo}`),
    );
    return file.pipe(res);
  }
  async readProjectScreenshot(projectId: string, res: any) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    const file = createReadStream(
      join(process.cwd(), `uploads/profiles/${project.screenshots}`),
    );
    return file.pipe(res);
  }
  async readAcademyLogo(academyId: string, res: any) {
    const academy = await this.prisma.academic.findUnique({
      where: {
        id: academyId,
      },
    });
    const file = createReadStream(
      join(process.cwd(), `uploads/profiles/${academy.logo}`),
    );
    return file.pipe(res);
  }
  async readJobLogo(jobId: string, res: any) {
    const job = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    const file = createReadStream(
      join(process.cwd(), `uploads/profiles/${job.logo}`),
    );
    return file.pipe(res);
  }
}
