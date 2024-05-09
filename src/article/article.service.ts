import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(user: UserEntity, createArticleDto: CreateArticleDto) {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }
    article.slug = 'foo';

    article.author = user;

    return await this.articleRepository.save(article);
  }
}
