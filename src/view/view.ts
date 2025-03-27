import { User } from '../model/model';

export class View {
  private user_list: HTMLElement;
  private submitHandler: ((e: SubmitEvent) => void) | null = null;
  constructor() {
    const userList = document.querySelector('.user_list');
    if (!userList) {
      throw new Error();
    }
    this.user_list = userList as HTMLElement;
    this.closebtn();
  }

  private closebtn() {
    const addForm = document.getElementById('addForm') as HTMLFormElement;
    const container = document.getElementById('containerId');
    const closeButton = document.createElement('button');

    closeButton.textContent = 'close';
    closeButton.id = 'close-form-btn';
    closeButton.type = 'button';
    closeButton.addEventListener('click', () => {
      if (addForm && container) {
        addForm.style.zIndex = '-1';
        container.style.opacity = '1';
        document.body.style.overflow = 'auto';
        addForm.reset();
      }
    });
    addForm.querySelector('.formInput')?.after(closeButton);
  }

  renderSort(sortOption: string[], sortValue: string[], select: HTMLElement) {
    for (let i = 0; i < sortOption.length; i++) {
      const option = document.createElement('option');
      if (sortOption[i] === 'id') {
        continue;
      }
      option.textContent = sortOption[i];
      option.value = sortValue[i];
      option.ariaLabel = sortOption[i];
      select.appendChild(option);
    }
  }

  render(data: User[]): void {
    this.user_list.innerHTML = '';
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const cellClassname = [
      'user_list_first_name',
      'user_list_last_name',
      'user_list_email',
      'user_list_username',
      'user_list_age',
      'user_list_gender',
    ];
    const headers = [
      'First Name',
      'Last Name',
      'Email',
      'Username',
      'Age',
      'Gender',
      'Actions',
    ];
    let count1 = 0;
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.className = cellClassname[count1];
      headerRow.appendChild(th);
      count1++;
    });
    table.appendChild(headerRow);

    data.forEach((element) => {
      const row = document.createElement('tr');
      row.id = element.id.toString();
      row.className = 'user_list_item';
      const cellData = [
        element.firstName,
        element.lastName,
        element.email,
        element.username,
        element.age,
        element.gender,
      ];

      let count = 0;
      cellData.forEach((data) => {
        const cell = document.createElement('td');
        cell.textContent = data;
        cell.className = cellClassname[count];
        row.appendChild(cell);
        count++;
      });

      const deleteCell = document.createElement('td');
      const deletebtn = document.createElement('button');
      deletebtn.className = 'delete-btn';
      deletebtn.textContent = 'Delete';
      deletebtn.value = element.id.toString();
      deletebtn.id = element.id.toString();
      deleteCell.appendChild(deletebtn);
      row.appendChild(deleteCell);
      table.appendChild(row);
    });

    this.user_list.appendChild(table);
  }

  addUser(): Promise<User[]> {
    const addForm = document.getElementById('addForm') as HTMLFormElement;
    addForm.style.display = 'flex';
    const container = document.getElementById('containerId');

    if (!addForm || !container) {
      return Promise.resolve([]);
    }
    const users: User[] = [];
    return new Promise((resolve) => {
      addForm.style.zIndex = '1';
      container.style.opacity = '0.2';
      document.body.style.overflow = 'hidden';
      if (this.submitHandler) {
        addForm.removeEventListener('submit', this.submitHandler);
      }
      this.submitHandler = (e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(addForm);
        const id = Date.now().toString();

        const validateNoSpaces = (value: string | null): boolean => {
          return value ? !/\s/.test(value) : false;
        };

        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const gender = data.get('gender') as string;
        const age = data.get('age') as string;
        if (
          !firstName ||
          !validateNoSpaces(firstName) ||
          !lastName ||
          !validateNoSpaces(lastName) ||
          !username ||
          !validateNoSpaces(username) ||
          !age ||
          !validateNoSpaces(age) ||
          !gender ||
          !validateNoSpaces(gender) ||
          !email ||
          !validateNoSpaces(email)
        ) {
          // eslint-disable-next-line no-undef
          alert('Please fill all feilds');
          return;
        }

        const newuser: User = {
          firstName: firstName,
          lastName: lastName,
          age: age,
          email: email,
          username: username,
          gender: gender,
          id: Number(id),
        };
        users.push(newuser);
        addForm.reset();
        addForm.style.zIndex = '-1';
        container.style.opacity = '1';
        document.body.style.overflow = 'auto';

        resolve(users);
      };
      addForm.addEventListener('submit', this.submitHandler);
    });
  }

  deleteUser(id: string): void {
    const val = document.getElementById(id);
    if (val) {
      val.style.display = 'none';
    }
  }
}
