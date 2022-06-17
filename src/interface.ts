/* eslint-disable no-unused-vars */
export interface IUser {
  id?: string,
  username: string,
  age: number,
  hobbies: string[],
}
export interface IClassUsers {
  getAllUsers(): IUser[],
  add(user: IUser): IUser,
  getUser(id: string): IUser | undefined,
  update(id: string, user: IUser): void,
  delete(id: string): void,
}
