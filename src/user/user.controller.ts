import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto) {
    if (createUserDto) {
      const user = await this.userService.createUser(createUserDto);
      if (user) return this.userService.buildUserResponse(user);
      else return new HttpException('user already exists', HttpStatus.CONFLICT);
    }
  }
}
