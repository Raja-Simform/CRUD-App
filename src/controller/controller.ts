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
  }
  async init(): Promise<void> {
    const val = await this.Services.getUsers();
    // console.log(val);
    this.View.render(val.users);
  }
  handleDelete(): void {}

  handleAdd(): void {}

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
