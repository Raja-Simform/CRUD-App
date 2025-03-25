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

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', this.handleDelete.bind(this));
    });

    const add = document.getElementById('add_new_user');
    if (add) {
      add.addEventListener('click', this.handleAdd.bind(this));
    }
  }
  async init(): Promise<void> {
    const val = await this.Services.getUsers();
    // console.log(val);
    this.View.render(val.users);
  }
  handleDelete(): void {}

  handleAdd(): void {
    const data = this.View.addUser();
    // const returnedData = this.Services.addUser(data);
    // console.log(data);
    // this.View.render(data);
    console.log(data);
  }

  async handleSort(): Promise<void> {
    const order = document.getElementById('order') as HTMLSelectElement;
    const sortFeild = document.getElementById(
      'sort-feild',
    ) as HTMLSelectElement;
    if (!order || !sortFeild) {
      console.log('element not exists');
      return;
    }
    const sortfeild1 = order.value;
    const sortfeild2 = sortFeild.value;
    const data = await this.Services.sortUser(sortfeild1, sortfeild2);
    console.log(data.users);
    this.View.render(data.users);
  }
}
