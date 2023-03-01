import { DataSource } from 'typeorm';
import { CreateCoursesTable1677416918123 } from './migrations/1677416918123-CreateCoursesTable';
import { CreateTagsTable1677417619637 } from './migrations/1677417619637-CreateTagsTable';
import { CreateCoursesTagsTable1677447082835 } from './migrations/1677447082835-CreateCoursesTagsTable';
import { AddCoursesIdToTagsTable1677447728837 } from './migrations/1677447728837-AddCoursesIdToTagsTable';
import { AddTagsIdToCoursesTable1677448328678 } from './migrations/1677448328678-AddTagsIdToCoursesTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'course',
        entities: [
            __dirname + '/../**/*.entity.js',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [
    CreateCoursesTable1677416918123,
    CreateTagsTable1677417619637,
    CreateCoursesTagsTable1677447082835,
    AddCoursesIdToTagsTable1677447728837,
    AddTagsIdToCoursesTable1677448328678
  ],
});