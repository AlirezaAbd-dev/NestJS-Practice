import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  async create() {
    // const result = await this.tagRepository.insert({
    //   name: 'shervin ali too roghan',
    // });
    const result = this.tagRepository.find();
    return result;
  }
}
