import { CoursesService } from './courses.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;


  beforeEach(async () => {
    service = new CoursesService();
    id = 'e037884a-98ed-4a5a-b38d-7aa610da44f8';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create course', async() => {
      const tagsExpect = [
        {
          id,
          name: 'nesj',
          created_at: date
        }
      ]

      const courseExpect= {
        id,
        name: 'create test',
        description: 'test description',
        created_at: date,
        tags: tagsExpect
      }

      const mockCousesRepository  = { 
        create: jest.fn().mockReturnValue(Promise.resolve(courseExpect)),
        save: jest.fn().mockReturnValue(Promise.resolve(courseExpect))
      }

      const mockTagRepository  = { 
        create: jest.fn().mockReturnValue(Promise.resolve(tagsExpect)),
        findOne: jest.fn()
      }

      //@ts-expect-error defined part of methods
      service['_courses'] = mockCousesRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const createCourseDto : CreateCourseDto = {
        name: 'Test',
        description: 'teste description',
        tags: ['nest']
        
      };

      const  newCourse = await service.create(createCourseDto);
      expect(mockCousesRepository.save).toHaveBeenCalled();
      expect(courseExpect).toStrictEqual(newCourse);
  });

  beforeEach(async () => {
    service = new CoursesService();
    id = 'e037884a-98ed-4a5a-b38d-7aa610da44f8';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('list one  course', async() => {
      const tagsExpect = [
        {
          id,
          name: 'nesj',
          created_at: date
        }
      ]

      const courseExpect= [{
        id,
        name: 'create test',
        description: 'test description',
        created_at: date,
        tags: tagsExpect
      }]

      const mockCousesRepository  = { 
        findAll: jest.fn().mockReturnValue(Promise.resolve(courseExpect)),
        find: jest.fn().mockReturnValue(Promise.resolve(courseExpect)),
      }

      

      //@ts-expect-error defined part of methods
      service['_courses'] = mockCousesRepository;

      const  newCourse = await service.findAll();
      expect(mockCousesRepository.find).toHaveBeenCalled();
      expect(courseExpect).toStrictEqual(newCourse);
  });


  it('list course', async() => {
    const tagsExpect = [
      {
        id,
        name: 'nesj',
        created_at: date
      }
    ]

    const courseExpect= [{
      id,
      name: 'create test',
      description: 'test description',
      created_at: date,
      tags: tagsExpect
    }]

    const mockCousesRepository  = { 
      findOne: jest.fn().mockReturnValue(Promise.resolve(courseExpect)),
    }

    

    //@ts-expect-error defined part of methods
    service['_courses'] = mockCousesRepository;

    const  newCourse = await service.findAll();
    expect(mockCousesRepository.findOne(id)).toHaveBeenCalled();
    expect(courseExpect).toStrictEqual(newCourse);
  });

  
});