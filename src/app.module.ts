import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { CourseEntity } from './courses/entities/course.entity';
import { TagEntity } from './courses/entities/tag.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoursesModule, 
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
