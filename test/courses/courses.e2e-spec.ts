import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';

describe('Courses: / Courses <= nome do endpoint (e2e)', () => {
  let app: INestApplication;
  const course = {
    name: 'nest js typeorm',
    description: 'teste e2e',
    tags: ['nesjt', 'typeorm']
  }
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule,
      
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'docker',
          database: 'testdb',
          autoLoadEntities: true,
          synchronize: true,
        }),
      
      ],
    }).compile();


    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }))
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('/courses/lista (POST) Cria novo item', ()=> {
    return request(app.getHttpServer())
    .post('/courses/lista')
    .send(course as CreateCourseDto)
    .expect(HttpStatus.CREATED)
    .then(({ body }) => {
      const expectdCourse = jasmine.objectContaining({
        ...course,
        tags: jasmine.arrayContaining(
          course.tags.map((name) => jasmine.objectContaining({ name })),
        ),
      });
      expect(body).toEqual(expectdCourse);
    });
  }) 
});
