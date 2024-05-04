import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto) {
    if (createUserDto) {
      const user = await this.userService.createUser(createUserDto);
      return this.userService.buildUserResponse(user);
    }
  }

  @Post('users/login')
  async loginUser(@Body('user') loginUserDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
