
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { myUser } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsersService {
  myUser: myUser[] = []
  newUser: myUser = { name: '', description: '' }

  constructor(private http: HttpClient) { }

  getAllUsers() {
    var url = "http://localhost:8000/datos"
    this.http.get<myUser[]>(url).subscribe(userAux => {
      this.myUser = userAux;
    });

  }

  createMyUser(user: myUser) {
    var url = "http://localhost:8000/subir"
    this.http.post<myUser>(url, user).subscribe(userAux => {
      this.myUser.push(userAux);
      this.getAllUsers()
    });

  }

  borrarUno(id: String) {
    var url = `http://localhost:8000/borrar/${id}`

    console.log(url)
    this.http.delete<myUser>(url).subscribe(user => {
      this.myUser.splice(this.myUser.indexOf(user), 1);
      this.getAllUsers()
    });

  }

  modificarUsuario(user: myUser) {

    var url = `http://localhost:8000/modificar/${user._id}`

    this.http.put<myUser>(url, user).subscribe(userAux => {
      this.getAllUsers()
    })

  }


  /* borrarTodo() {
    this.http.delete<myUser>(this.apiUrl).subscribe({
    });
    this.getAllUsers()
  } */


}
