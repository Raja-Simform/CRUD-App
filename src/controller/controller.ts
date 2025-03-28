import { View } from '../view/view';
import { Services } from '../services/services';
import { User } from '../model/model';
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
  checkOption(obj:User):string[]{
       const arr=[];
       for(const a of Object.keys(obj)){
        if(typeof(obj[a])==='object'){
          continue;
        }
        arr.push(a);
       }
       return arr;
       
  }
  async init(): Promise<void> {
    const val = await this.Services.getUsers();
    this.View.render(val.users);
    const newval=val.users[0];
    const sortOption1=this.checkOption(newval)||'';
    
    const sortOption2 = ['Ascending', 'Descending'];
    const sortValue2 = ['asc', 'desc'];

    const select1 = document.getElementById('sort-field') as HTMLElement;

    const select2 = document.getElementById('order') as HTMLElement;
    this.View.renderSort(sortOption1, sortOption1, select1);
    this.View.renderSort(sortOption2, sortValue2, select2);
    const deletebtn = document.querySelectorAll('.delete-btn');
    if (deletebtn) {
      deletebtn.forEach((element) => {
        element.addEventListener('click', this.handleDelete.bind(this));
      });
    }
  }

  async handleAdd(): Promise<void> {
    const data = await this.View.addUser();
    if (data.length > 0) {
      const newUser = data[data.length - 1];
      const updatedUsers = this.Services.addUser(newUser);
      this.View.render(updatedUsers);

      const deletebtn = document.querySelectorAll('.delete-btn');
      if (deletebtn) {
        deletebtn.forEach((element) => {
          element.addEventListener('click', this.handleDelete.bind(this));
        });
      }
    }
  }

  async handleSort(): Promise<void> {
    const order = document.getElementById('order') as HTMLSelectElement;
    const sortFields = document.getElementById(
      'sort-field',
    ) as HTMLSelectElement;
    if (!order || !sortFields) {

    }
    const sortfield1 = order.value;
    const sortfield2 = sortFields.value;
    const data = await this.Services.sortUser(sortfield1, sortfield2);


    this.View.render(data.users);
  }

  handleDelete(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const userId = button.value;
    this.Services.deleteUser(userId);
    this.View.deleteUser(userId);
  }
}
