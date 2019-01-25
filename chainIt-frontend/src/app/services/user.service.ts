import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  userList;

  getAllUsers() {
    this.userList = this.http.get('http://localhost:8200/users/api/users');
    return this.userList;
  }

  registerUser(data: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise(resolve => {
      this.http.post('http://localhost:8200/users/register',
        {
          'firstname': data.firstname,
          'lastname': data.lastname,
          'email': data.email,
          'password': data.password
        }, { headers }).toPromise()
        .then(() => {
          this.openSnackbar('Gebruiker ' + data.firstname + ' is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de gebruiker');
        })
    });
  }

  deleteUser(firstname: string, userId: string) {
    return new Promise(resolve => {
      this.http.delete('http://localhost:8200/users/' + userId).toPromise()
        .then(() => {
          this.openSnackbar('Gebruiker ' + firstname + ' is verwijderd');
          resolve();
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het verwijderen van de gebruiker')
        })
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
