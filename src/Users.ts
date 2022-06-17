import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interface';

class Users {
  private all: IUser[];

  constructor() {
    this.all = [];
  }

  getAllUsers(): IUser[] {
    return this.all;
  }

  add(user: IUser): IUser {
    const newUser: IUser = user;
    newUser.id = uuidv4();
    this.all.push(newUser);
    return newUser;
  }
}
const users = new Users();

export default users;
