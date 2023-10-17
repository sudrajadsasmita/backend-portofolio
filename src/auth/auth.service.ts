import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      status: true,
      message: "Login successfully...",
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(registerDto: CreateUserDto): Promise<Auth> {
    const hashPassword: string = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: hashPassword,
        profile: {
          create: {
            name: registerDto.name,
            birth_date: registerDto.dateBirth,
          },
        },
      },
    }); return {
      status: true,
      message: "Register successfully...",
      accessToken: this.jwtService.sign({ userId: user.id })
    }
  }
}
