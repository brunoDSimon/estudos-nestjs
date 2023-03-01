module.exports = {
    type: 'postgres',
    host: 'db',
    pot: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'course',
    autoLoadEntities: true,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}