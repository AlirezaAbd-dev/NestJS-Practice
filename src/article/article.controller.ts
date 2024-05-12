import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@User('id') userId: number, @Query() query: any) {
    return await this.articleService.findAll(userId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() user: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ) {
    const article = await this.articleService.createArticle(
      user,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getSingleArticle(@Param('slug') slug: string) {
    const article = await this.articleService.getSingleArticle(slug);

    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@Param('slug') slug: string) {
    return this.articleService.deleteArticle(slug);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ) {
    const article = await this.articleService.addArticleToFavorite(
      userId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleToFavorites(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ) {
    const article = await this.articleService.deleteArticleFromFavorite(
      userId,
      slug,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
