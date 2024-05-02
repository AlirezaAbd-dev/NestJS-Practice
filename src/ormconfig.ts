import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
  url: 'postgres://postgres:1234@127.0.0.1:5432/mediumclone',
  retryAttempts: 1,
};
export default config;
