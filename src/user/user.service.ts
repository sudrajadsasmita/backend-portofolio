import { Get, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  async get(): Promise<object> {
    const users = await this.prismaClient.user.findMany({
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
    users.forEach((user) => {
      if (user.profile && user.profile.photo) {
        user.profile.photo = `${process.env.BASE_URL}/api/user-profile/${user.profile.photo}`;
      }
    });
    return users;
  }
}
