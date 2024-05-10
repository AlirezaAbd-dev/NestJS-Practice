import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import slugify from 'slugify';

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
    article.slug = this.getSlug(createArticleDto.title);

    article.author = user;

    return await this.articleRepository.save(article);
  }

  async getSingleArticle(slug: string) {
    const findArticle = await this.articleRepository.findOne({
      where: { slug },
    });

    if (!findArticle) {
      throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    }

    return findArticle;
  }

  async deleteArticle(slug: string) {
    return this.articleRepository.delete({ slug });
  }

  buildArticleResponse(article: ArticleEntity) {
    return { article };
  }

  private getSlug(title: string) {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
