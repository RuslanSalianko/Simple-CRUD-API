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

  getUser(id: string): IUser | undefined {
    const index = this.all.findIndex((user: IUser) => {
      if (user.id === id) {
        return true;
      }
      return false;
    });

    return this.all[index];
  }
}
const users = new Users();

export default users;
