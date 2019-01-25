import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  userList;

  getAllUsers() {
    this.userList = this.http.get('http://localhost:8200/users/api/users');
    return this.userList;
  }

}
