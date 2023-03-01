import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { TagEntity } from './entities/tag.entity';
import { coursesProviders } from './courses.providers';
import { databaseProviders } from '../database.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, ...coursesProviders],
  imports: [
   DatabaseModule
  ]
})
export class CoursesModule {}
