import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { TagEntity } from '../entities/tag.entity';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly _courses: Repository<CourseEntity>,

        @InjectRepository(TagEntity)
        private readonly tag: Repository<TagEntity>
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
        const response = this._courses.findOne({id:id},{
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

    public async update(id:string , body: UpdateCourseDto) {
        const tags = body.tags && (
            await Promise.all(
                body.tags.map((name) => this.preloadTagByName(name))
            )
        )
       let temId = await this._courses.preload(
        {
            id:id,
            ...body, 
            tags
    }
        )
       
       if(!temId) {
        throw new NotFoundException('sem dados para consulta');
       } 
       return this._courses.save(temId)
    }


    public async remove(id) {
      let temDados = await this._courses.findOne({id: id});
      if(!temDados) {
        throw new NotFoundException('sem dados para consulta');
       }  else {
       return this._courses.remove(temDados)
       }
    }

    private async preloadTagByName(name: string): Promise<any> {
        const tag = await this.tag.findOne({name})

        if (tag) {
            return tag;
        }

        return this.tag.create({name});
    }

}
