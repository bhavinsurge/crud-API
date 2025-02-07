import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/db/entities/user-entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource,
  ) {
    this.manager = this.dataSource.manager;
  }

  // craete user
  async createUser(data: CreateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, {
        email: data.email,
      });
      if (user) {
        throw new Error('User already exists, Go to login');
      }
      const createUser = await this.manager.create(UserEntity, {
        email: data.email,
        name: data.name,
        password: data.password,
        mobile: data.mobile,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
      });
      await this.manager.save(UserEntity, createUser);
      return { message: 'User created succesfully', createUser };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  //update user
  async updateUser(id: string, data: UpdateUserDto) {
    try{
        const user = await this.manager.findOneBy(UserEntity,{id})
    if (!user) {
      throw new Error('User not Found');
    }
        user.email = data.email,
        user.name = data.name,
        user.password = data.password,
        user.mobile = data.mobile,
        user.gender = data.gender,
        user.date_of_birth = data.date_of_birth

        await this.manager.update(UserEntity,id, user)

        return {message: "User update Sucessfully"}
    }catch(error){
        throw new NotFoundException(`${error.message}`)
    }
    
  }

  //delete user
  async deleteUser(id: String) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
      if (!user) {
        throw new Error('User not found');
      }
      await this.manager.delete(UserEntity, id);
      return {message:'User deleted successfully'};
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  //get all user
  async getAllUser() {
    try {
      const user = await this.manager.find(UserEntity);
      if (user.length == 0) {
        throw new Error('Data not Found');
      }
      return { message: 'Get Data successfully', data: user };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  //get user by id
  async getUserById(id: String) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
      if (!user) {
        throw new Error('Data not Found');
      }
      return { message: 'Get Data successfully', data: user };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
