import { View } from '../view/view';
import { Services } from '../services/services';
// import { User } from '../model/model';

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

    // const deleteButtons = document.querySelectorAll('.delete-btn');
    // deleteButtons.forEach((button) => {
    //   button.addEventListener('click', this.handleDelete.bind(this));
    // });

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
  // handleDelete(): void {}

  async handleAdd(): Promise<void> {
    const data = await this.View.addUser();
    // const returnedData = this.Services.addUser(data);
    // this.View.render(returnedData);
    // if(data.length>0)
    // console.log('data came');
    // console.log(data);
    if (data.length > 0) {
      const newUser = data[data.length - 1]; // Get the last added user

      // Add the user to the service
      const updatedUsers = this.Services.addUser(newUser);
      // Re-render the view with updated users
      this.View.render(updatedUsers);
    }
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
