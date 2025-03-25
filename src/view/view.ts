import { User } from '../model/model';
export class View {
  private user_list: HTMLElement;
  constructor() {
    const userList = document.querySelector('.user_list');
    if (!userList) {
      throw new Error();
    }
    this.user_list = userList as HTMLElement;
  }
  render(data: User[]): void {
    this.user_list.innerHTML = '';
    data.forEach((element) => {
      const user = document.createElement('div');
      const first_name = document.createElement('span');
      const last_name = document.createElement('span');
      const email = document.createElement('span');
      const username = document.createElement('span');
      const age = document.createElement('span');
      const gender = document.createElement('span');
      const editbtn = document.createElement('button');
      const deletebtn = document.createElement('button');
      editbtn.className = 'edit-btn';
      deletebtn.className = 'delete-btn';
      editbtn.textContent = 'Edit';
      deletebtn.textContent = 'Delete';

      user.className = 'user_list_item';
      first_name.className = 'user_list_first_name';
      last_name.className = 'user_list_last_name';
      age.className = 'user_list_age';
      email.className = 'user_list_email';
      username.className = 'user_list_username';
      gender.className = 'user_list_gender';
      first_name.textContent = element.firstName;
      last_name.textContent = element.lastName;
      email.textContent = element.email;
      username.textContent = element.username;
      age.textContent = element.age;
      gender.textContent = element.gender;
      editbtn.value = element.id;
      deletebtn.value = element.id;

      user.appendChild(first_name);
      user.appendChild(last_name);
      user.appendChild(email);
      user.appendChild(username);
      user.appendChild(age);
      user.appendChild(gender);
      user.appendChild(editbtn);
      user.appendChild(deletebtn);
      this.user_list.appendChild(user);
    });
  }
  addUser(): void {}
}
