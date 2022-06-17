import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interface';

class Users {
  private all: IUser[];

  constructor() {
    this.all = [];
  }

  private findIndex(id: string): number {
    return this.all.findIndex((user: IUser) => {
      if (user.id === id) {
        return true;
      }
      return false;
    });
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
    const index: number = this.findIndex(id);

    return this.all[index];
  }

  update(id: string, user: IUser) {
    const index: number = this.findIndex(id);
    this.all[index] = user;
  }
  delete(id: string) {
    const index: number = this.findIndex(id);
    this.all.splice(index, index);
  }
}
const users = new Users();

export default users;
