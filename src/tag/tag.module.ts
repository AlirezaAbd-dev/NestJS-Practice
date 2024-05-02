import { Module } from '@nestjs/common';
import { TagController } from '@app/tag/tag.controller';
import { TagService } from '@app/tag/tag.service';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
