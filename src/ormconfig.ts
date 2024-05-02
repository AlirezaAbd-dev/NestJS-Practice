import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: 'mediumclone',
  autoLoadEntities: true,
  synchronize: true,
};
export default config;
