import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoursesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    pot: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'course',
    autoLoadEntities: true,
    synchronize: false
  })
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
