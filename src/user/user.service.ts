import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (!userByEmail || !userByUsername) {
      const newUser = new UserEntity();
      Object.assign(newUser, createUserDto);
      return await this.userRepository.save(newUser);
    } else {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }

  async loginUser(user: LoginUserDto) {
    const findUsername = await this.userRepository.findOne({
      where: { username: user.username },
      select: ['bio', 'email', 'id', 'image', 'password', 'username'],
    });

    if (findUsername) {
      const comparePassword = await compare(
        user.password,
        findUsername.password,
      );

      if (comparePassword) {
        delete findUsername.password;
        return findUsername;
      } else {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  generateJwt(user: UserEntity) {
    return sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity) {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
