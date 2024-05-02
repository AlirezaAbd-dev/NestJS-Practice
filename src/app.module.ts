import { Module } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { AppController } from '@app/app.controller';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/ormconfig';

@Module({
  imports: [TagModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
