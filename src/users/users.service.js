import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import UsersException from './users.exception';

@Injectable()
@Dependencies(getModelToken('User'))
export class UsersService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(user, confirmationIsNeeded) {
    if (await this.findOneByEmail(user.email)) {
      throw new UsersException('EMAIL_ALREADY_REGISTERED');
    }
    if (await this.findOneByName(user.name)) {
      throw new UsersException('NAME_ALREADY_TAKEN');
    }
    const createdUser = new this.userModel(user);
    await createdUser.save();
    
    if (confirmationIsNeeded) {
      
    }

    return createdUser;
  }

  async findOneById(id) {
    return this.userModel.findById(id);
  }

  async findOneByLogin(login) {
    let user;
    if (login.indexOf('@') > -1) {
      user = this.userModel.findOne({
        email: login,
      });
    } else {
      user = this.userModel.findOne({
        name: login,
      });
    }
    return user;
  }

  async findOneByName(name) {
    return this.userModel.findOne({
      name,
    });
  }

  async findOneByEmail(email) {
    return this.userModel.findOne({
      email,
    });
  }

  // async findByLogins(logins: Array<string>): Promise<Array<User>> {
  //   const emails = [];
  //   const names = [];
  //   logins.forEach((login) => {
  //     if (login.indexOf('@') > -1) {
  //       emails.push(login);
  //     } else {
  //       names.push(login);
  //     }
  //   });
  //   return this.userModel.find({
  //     $or: {
  //       name: {
  //         $in: names,
  //       },
  //       email: {
  //         $in: emails,
  //       },
  //     },
  //   });
  // }
}
