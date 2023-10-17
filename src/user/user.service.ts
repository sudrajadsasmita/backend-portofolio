import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as os from 'os';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const hashPassword: string = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashPassword,
        profile: {
          create: {
            name: createUserDto.name,
            birth_date: createUserDto.dateBirth,
          },
        },
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
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
    if (!users) {
      throw new NotFoundException();
    }
    users.forEach((user) => {
      if (user.profile && user.profile.photo) {
        user.profile.photo = `${os.hostname}:${process.env.PORT}/api/user-profile/${user.profile.photo}`;
      }
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
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
    if (!user) {
      throw new NotFoundException(`No user found for id: ${id}`);
    }
    user!.profile!.photo =
      user!.profile!.photo == null
        ? null
        : `${os.hostname}:${process.env.PORT}/api/user-profile/${user.profile.photo}`;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: updateUserDto.email,
        profile: {
          update: {
            name: updateUserDto.name,
            birth_date: updateUserDto.dateBirth,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
