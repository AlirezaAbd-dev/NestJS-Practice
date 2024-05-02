import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TagEntity } from '@app/tag/tag.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: 'mediumclone',
  entities: [TagEntity],
  synchronize: true,
};
export default config;
