import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { TagEntity } from './courses/entities/tag.entity';
import { CourseEntity } from './courses/entities/course.entity';

@Module({
  imports: [CoursesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    pot: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'course',
    autoLoadEntities: false,
    synchronize: false,
    entities: [
      CourseEntity,
      TagEntity
    ],
  })
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
