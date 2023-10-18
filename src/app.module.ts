import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { AcademyModule } from './academy/academy.module';

@Module({
  imports: [
    PrismaModule,
    ProjectModule,
    UserModule,
    AuthModule,
    FileModule,
    AcademyModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformationInterceptor,
    // },
  ],
})
export class AppModule {}
