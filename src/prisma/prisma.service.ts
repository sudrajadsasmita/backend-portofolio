import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    this.$use(this.loggingMiddleware);
  }
  loggingMiddleware: Prisma.Middleware = async (params, next) => {
    if (
      params.model == 'User' ||
      params.model == 'Profile' ||
      params.model == 'Job' ||
      params.model == 'Project' ||
      params.model == 'Academic'
    ) {
      if (params.action === 'delete') {
        return next({
          ...params,
          action: 'update',
          args: {
            ...params.args,
            data: {
              deletedAt: new Date(),
            },
          },
        });
      }
      if (params.action === 'update') {
        return next({
          ...params,
          action: 'update',
          args: {
            ...params.args,
            data: {
              updatedAt: new Date(),
            },
          },
        });
      }
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        return next({
          ...params,
          action: 'findFirst',
          args: {
            ...params.args,
            where: {
              ...params.args?.where,
              deletedAt: null,
            },
          },
        });
      }
      if (params.action === 'findMany') {
        return next({
          ...params,
          args: {
            ...params.args,
            where: {
              ...params.args?.where,
              deletedAt: null,
            },
          },
        });
      }
      return next(params);
    }
    return next(params);
  };

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
