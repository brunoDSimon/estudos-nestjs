import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(
        private readonly cursesService: CoursesService 
    ) {}
    @Get('lista')
    findAll(){
        return this.cursesService.findAll();
    }

    @Get('lista/:id')
    findOne(@Param('id') id:string) {
        return this.cursesService.find(id);
    }

    @Post('lista') 
    create(@Body() body:CreateCourseDto) {
        this.cursesService.create(body)
    }
    

    @Patch('lista/update/:id') 
    update(@Param('id') id:string, @Body() body) {
        return this.cursesService.update(id, body)
    }

    @Delete('lista/:id')
    delete(@Param('id') id:string) {
        return this.cursesService.remove(id);
    }
} 
