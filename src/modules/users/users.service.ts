/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  FindByIdSerRes,
  RegisterSerRes,
  UpdateSerRes,
} from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import validation from '../../utils/validation';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async register(createUserDto: CreateUserDto): Promise<RegisterSerRes> {
    try {
      const newUser = this.users.create(createUserDto);
      const result = await this.users.save(newUser);
      return {
        status: true,
        data: result,
        message: 'Register ok!',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateSerRes> {
    try {
      const userSource = await this.users.findOne({
        where: {
          id: userId,
        },
      });

      const userSourceUpdate = this.users.merge(userSource, updateUserDto);
      const result = await this.users.save(userSourceUpdate);
      return {
        status: true,
        data: result,
        message: 'Update ok!',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  async findById(userId: string): Promise<FindByIdSerRes> {
    try {
      const result = await this.users.findOne({
        where: {
          id: userId,
        },
      });

      if (!result) {
        throw new Error();
      }

      return {
        status: true,
        data: result,
        message: 'Find user by id ok!',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }

  async findByUserNameOrEmail(
    userNameOrEmail: string,
  ): Promise<FindByIdSerRes> {
    try {
      const result = await this.users.findOne({
        where: validation.isEmail(userNameOrEmail)
          ? {
              email: userNameOrEmail,
              emailAuthentication: true,
            }
          : {
              userName: userNameOrEmail,
            },
      });

      if (!result) {
        throw new Error();
      }

      return {
        status: true,
        data: result,
        message: 'Find user ok!',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Lỗi service',
      };
    }
  }
}
