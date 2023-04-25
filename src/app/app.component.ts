import { Component } from '@angular/core';
import { ServiceUsersService } from './service/service-users.service';
import { myUser } from './models/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Actividad2"
  newUser: myUser = { name: '', description: '' };

  constructor(public userService: ServiceUsersService) { }

  ngOnInit() {
    this.getAllMyUsers();
  }

  getAllMyUsers() {
    this.userService.getAllUsers()
  }

  createMyUser() {
    this.userService.createMyUser(this.newUser)
    this.newUser.name = '';
    this.newUser.description = '';
  }
}
