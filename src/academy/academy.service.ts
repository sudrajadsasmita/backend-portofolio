import { Injectable } from '@nestjs/common';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AcademyService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = new PrismaService();
  }
  async create(createAcademyDto: CreateAcademyDto, user: any) {
    const academic = await this.prisma.academic.create({
      data: {
        school: createAcademyDto.school,
        faculty: createAcademyDto.faculty,
        degree: createAcademyDto.degree,
        gpa: createAcademyDto.gpa,
        startStudy: new Date(createAcademyDto.startStudy),
        endStudy: new Date(createAcademyDto.endStudy),
        profileId: user.profile.id,
      },
    });
    return academic;
  }

  async findAll(user: any) {
    const academies = await this.prisma.academic.findMany({
      where: {
        profileId: user.profile.id,
      },
    });
    academies.forEach((academy) => {
      academy!.logo =
        academy!.logo == null
          ? null
          : `http://localhost:${process.env.PORT}/file/${academy?.id}/academy`;
    });
    return academies;
  }

  async findOne(id: string) {
    const academy = await this.prisma.academic.findUnique({
      where: {
        id: id,
      },
    });
    academy!.logo =
      academy!.logo == null
        ? null
        : `http://localhost:${process.env.PORT}/file/${academy?.id}/academy`;
    return academy;
  }

  async uploadAcademyLogo(logo: string, id: string) {
    const academic = await this.prisma.academic.update({
      where: {
        id: id,
      },
      data: {
        logo: logo,
        updatedAt: new Date(Date.now()),
      },
    });
    return academic;
  }

  async update(id: string, updateAcademyDto: UpdateAcademyDto) {
    const academy = await this.prisma.academic.update({
      where: {
        id: id,
      },
      data: {
        school: updateAcademyDto.school,
        faculty: updateAcademyDto.faculty,
        degree: updateAcademyDto.degree,
        gpa: updateAcademyDto.gpa,
        startStudy: new Date(updateAcademyDto.startStudy),
        endStudy: new Date(updateAcademyDto.endStudy),
        updatedAt: new Date(Date.now()),
      },
    });
    return academy;
  }

  async remove(id: string) {
    const academic = await this.prisma.academic.delete({
      where: {
        id: id,
      },
    });
    return academic;
  }
}
