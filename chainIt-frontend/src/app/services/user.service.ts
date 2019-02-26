import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }
  userList: any[];

  getAllUsers() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8200/users/api/users').toPromise()
      .then((res) => resolve(res))
      .catch((err) => console.log(err));
    })
  }

  registerUser(data: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise(resolve => {
      this.http.post('http://localhost:8200/users/register',
        {
          'firstName': data.firstName,
          'lastName': data.lastName,
          'email': data.email,
          'password': data.password,
          'company': data.company,
          'participant': data.selectedParticipant,
        }, { headers }).toPromise()
        .then(() => {
          this.openSnackbar('Gebruiker ' + data.firstName + ' is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de gebruiker');
        })
    });
  }

  deleteUser(firstName: string, userId: string) {
    return new Promise(resolve => {
      this.http.delete('http://localhost:8200/users/' + userId).toPromise()
        .then(() => {
          this.openSnackbar('Gebruiker ' + firstName + ' is verwijderd');
          resolve();
        })
        .catch(() => {
          this.openSnackbar('Er is iets mis gegaan met het verwijderen van de gebruiker')
        })
    })
  }

  getAllUserShipments() {
    const currentUser = this.authService.currentUserValue;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token 
    });

    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8200/users/api/shipments', { headers }).toPromise()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
