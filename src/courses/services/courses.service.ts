import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { TagEntity } from '../entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        @Inject('COURSE_REPOSITORY')
        private readonly _courses: Repository<CourseEntity>,
        @Inject('TAGS_REPOSITORY')
        private tagRepository: Repository<TagEntity>
    ) {

    }
    

    public findAll() {
        return this._courses.find({
            relations: [
                'tags'
            ]
        })
    }

    public find(id) {
        const response = this._courses.findOne({
            where: id,
            relations: [
                'tags'
            ]
        });
        if(!response) {

            throw new NotFoundException('sem dados para consulta');
        }
        return response;

    }

    public async create(createDTO:CreateCourseDto) {
        let tags = await Promise.all(
            createDTO.tags.map((name) => this.preloadTagByName(name))
        )
        console.log(tags, 'tags')
       let response =  this._courses.create({
        ...createDTO,
        tags
       });
       return this._courses.save(response);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const tags =
          updateCourseDto.tags &&
          (await Promise.all(
            updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
          ));
    
        const course = await this._courses.preload({
          id,
          ...updateCourseDto,
          tags,
        });
    
        if (!course) {
          throw new NotFoundException(`Course ID ${id} not found`);
        }
    
        return this._courses.save(course);
      }


    public async remove(id) {
      let temDados = await this._courses.findOne({
        where: id
      });
      if(!temDados) {
        throw new NotFoundException('sem dados para consulta');
       }  else {
       return this._courses.remove(temDados)
       }
    }

    private async preloadTagByName(name: string): Promise<TagEntity> {
        const tag = await this.tagRepository.findOne({ where: { name } });
    
        if (tag) {
          return tag;
        }
    
        return this.tagRepository.create({ name });
      }

}
