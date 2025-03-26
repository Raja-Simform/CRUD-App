import { User } from '../model/model';

export class Services {
  private url: string;
  private users: User[] = [];

  constructor() {
    this.url = 'https://dummyjson.com/users';
  }

  async getUsers(): Promise<{ users: User[] }> {
    const response = await fetch(`${this.url}`);
    if (!response.ok) {
      throw new Error('${response.status}:somethingerror');
    }
    const data = await response.json();
    this.users = data.users;
    return data;
  }

  addUser(data: User): User[] {
    // return data;
    if (!data.id) {
      data.id = Date.now().toString();
    }
    this.users.push(data);
    return this.users;
  }

  async sortUser(
    sortfeild1: string,
    sortfeild2: string,
  ): Promise<{ users: User[] }> {
    const response = await fetch(
      `${this.url}?sortBy=${sortfeild2}&order=${sortfeild1}`,
    );
    const data = await response.json();
    return data;
  }
}
