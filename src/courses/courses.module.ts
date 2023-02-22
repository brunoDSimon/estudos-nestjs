import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { TagEntity } from './entities/tag.entity';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,TagEntity
    ])
  ]
})
export class CoursesModule {}
