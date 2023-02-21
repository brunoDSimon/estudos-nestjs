import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly _courses: Repository<CourseEntity>
    ) {

    }

    public findAll() {
        return this._courses.find()
    }

    public find(id) {
        const response = this._courses.findOne({id:+id});
        if(!response) {

            throw new NotFoundException('sem dados para consulta');
        }
        return response;

    }

    public create(createDTO) {
       let response =  this._courses.create(createDTO);
       return this._courses.save(response);
    }

    public async update(id:string , body: UpdateCourseDto) {
       let temId = await this._courses.update({id:+id},body)
       console.log(temId)
       if(!temId) {
        throw new NotFoundException('sem dados para consulta');
       } 
       return 
    }


    public async remove(id) {
      let temDados = await this._courses.findOne({id: id});
      if(!temDados) {
        throw new NotFoundException('sem dados para consulta');
       }  else {
       return this._courses.remove(temDados)
       }
    }

}
