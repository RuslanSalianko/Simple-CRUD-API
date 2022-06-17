import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interface';

class Users {
  private all: IUser[];

  constructor() {
    this.all = [];
  }
}
const users = new Users();

export default users;
