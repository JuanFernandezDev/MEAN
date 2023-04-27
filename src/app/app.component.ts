import { Component, ViewChild } from '@angular/core';
import { ServiceUsersService } from './service/service-users.service';
import { myUser } from './models/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('nombreInput') html: any;
  title = "Actividad2"
  userEdit: myUser = { name: '', description: '' };
  newUser: myUser = { name: '', description: '' };
  editar: boolean = false

  selectedUser: myUser | null = null;

  constructor(public userService: ServiceUsersService) { }

  ngOnInit() {
    this.userService.getAllUsers()
  }

  createMyUser() {
    this.userService.createMyUser(this.newUser)
    this.newUser.name = '';
    this.newUser.description = '';
  }

  sacarEditar(user: myUser) {
    this.selectedUser = user;
    this.editar = !this.editar;
  }

  modificarUser(user: myUser, nombreInput: String, descrip: String) {
    var us: myUser = user

    us.name = nombreInput
    us.description = descrip

    console.log(us)

    this.userService.modificarUsuario(us)
    this.sacarEditar(user)
  }


}
