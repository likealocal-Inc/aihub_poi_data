import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './config/core/interceptor/logger.interceptor';
import { LoggerMiddleware } from './config/core/middleware/http.logger.middleware';
import { HttpExceptionFilter } from './config/core/filters/http.exception.filter';
import { AirportModule } from './modules/airport/airport.module';
import { PoiModule } from './modules/poi/poi.module';
import { PrismaModule } from './config/core/prisma/prisma.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api*', '/docs*'],
    }),
    ConfigModule,
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.NODE_ENV}`] }),
    AirportModule,
    PoiModule,
    PrismaModule,

    ///////////////////
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
