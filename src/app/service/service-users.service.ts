
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myUser } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsersService {
  myUser: myUser[] = []
  newUser: myUser = { name: '', description: '' }



  private apiUrl = 'http://localhost:8000/prueba'

  constructor(private http: HttpClient) { }

  getAllUsers() {

    this.http.get<myUser[]>(this.apiUrl).subscribe(userAux => {
      this.myUser = userAux;
      console.log(this.myUser)
    });


  }

  createMyUser(user: myUser) {
    this.http.post<myUser>(this.apiUrl, user).subscribe(userAux => {
      this.myUser.push(userAux);
    });
    this.getAllUsers()
  }

  borrarUno(id: String) {
    console.log(id)
    const url = `${this.apiUrl}/${id}`
    console.log(url)
    this.http.delete<myUser>(url).subscribe({
    });
    this.getAllUsers()
  }
}
