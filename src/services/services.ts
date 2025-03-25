import { User } from '../model/model';
export class Services {
  private url: string;
  constructor() {
    this.url = 'https://dummyjson.com/users';
  }
  async getUsers(): Promise<{ users: User[] }> {
    const response = await fetch(`${this.url}`);
    if (!response.ok) {
      throw new Error('${response.status}:somethingerror');
    }
    const data = await response.json();
    return data;
  }
  addUser(): void {}
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
