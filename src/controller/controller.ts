import { View } from '../view/view';
import { Services } from '../services/services';

export class Controller {
  private Services: Services;
  private View: View;
  constructor(Services: Services, View: View) {
    this.Services = Services;
    this.View = View;
    this.init();

    const sortSubmit = document.getElementById('sort-submit');
    if (sortSubmit) {
      sortSubmit.addEventListener('click', this.handleSort.bind(this));
    }
    const add = document.getElementById('add_new_user');
    if (add) {
      add.addEventListener('click', this.handleAdd.bind(this));
    }
  }

  async init(): Promise<void> {
    const sortOption1 = ['First Name', 'Last Name', 'Age'];
    const sortValue1 = ['firstName', 'lastName', 'age'];
    const sortOption2 = ['Ascending', 'Descending'];
    const sortValue2 = ['asc', 'desc'];
    const select1 = document.getElementById('sort-feild') as HTMLElement;
    const select2 = document.getElementById('order') as HTMLElement;
    this.View.renderSort(sortOption1, sortValue1, select1);
    this.View.renderSort(sortOption2, sortValue2, select2);
    const val = await this.Services.getUsers();
    this.View.render(val.users);
  }

  async handleAdd(): Promise<void> {
    const data = await this.View.addUser();
    if (data.length > 0) {
      const newUser = data[data.length - 1];
      const updatedUsers = this.Services.addUser(newUser);

      this.View.render(updatedUsers);
    }
    console.log(data);
  }
  async handleSort(): Promise<void> {
    const order = document.getElementById('order') as HTMLSelectElement;
    const sortFeilds = document.getElementById(
      'sort-feild',
    ) as HTMLSelectElement;
    if (!order || !sortFeilds) {
      console.log('element not exists');
      return;
    }
    const sortfeild1 = order.value;
    const sortfeild2 = sortFeilds.value;
    const data = await this.Services.sortUser(sortfeild1, sortfeild2);
    console.log(data.users);
    this.View.render(data.users);
  }
}
