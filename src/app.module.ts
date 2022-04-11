import { Module } from '@nestjs/common';
import { UserModule } from './apis/users/user.module';
import { EventModule } from './apis/event/event.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config';

@Module({
  imports: [UserModule
    , EventModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [],
        autoLoadModels: true,
        logging: false,
        synchronize: false,
      }),
      inject: [ConfigService],
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
