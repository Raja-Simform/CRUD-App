import { User } from '../model/model';

export class Services {
  private url: string;
  private users: User[] = [];

  constructor() {
    this.url = 'https://dummyjson.com/users';
  }

  async getUsers(): Promise<{ users: User[] }> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error('${response.status}:somethingerror');
    }
    const data = await response.json();
    this.users = data.users;
    return data;
  }

  addUser(data: User): User[] {
    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        username: data.username,
        email: data.email,
        gender: data.gender,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
    if (!data.id) {
      data.id = Date.now();
    }
    this.users.unshift(data);
    return this.users;
  }

  async sortUser(
    sortfield1: string,
    sortfield2: string,
  ): Promise<{ users: User[] }> {
    const response = await fetch(
      `${this.url}?sortBy=${sortfield2}&order=${sortfield1}`,
    );
    const data = await response.json();
    return data;
  }

  async deleteUser(id: string) {
    fetch(`https://dummyjson.com/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(console.log);
  }
}
