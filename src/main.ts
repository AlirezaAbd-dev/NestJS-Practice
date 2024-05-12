import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { BackendValidation } from './shared/pipes/backendValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new BackendValidation());
  await app.listen(3000);
}
bootstrap();
