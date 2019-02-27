import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: any[];
  loading: boolean = false;

  api: string = environment.APIEndPoint;
  readonly USERS_REGISTER_URL = this.api + 'users/register/';
  readonly USERS_API_URL = this.api + 'users/api/users/';
  readonly USERS_SHIPMENTS_API_URL = this.api + 'users/api/shipments/';
  readonly USERS_URL = this.api + 'users/';
  

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }

  getAllUsers() {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    return new Promise(resolve => {
      this.loading = true;
      this.http.get(this.USERS_API_URL, { headers }).toPromise()
        .then((res) => {
          this.loading = false;
          resolve(res)
        })
        .catch((err) => {
          this.loading = false;
          console.log(err)
        });
    })
  }

  registerUser(data: any) {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    return new Promise(resolve => {
      this.loading = true;
      this.http.post(this.USERS_REGISTER_URL,
        {
          'firstName': data.firstName,
          'lastName': data.lastName,
          'email': data.email,
          'password': data.password,
          'company': data.company,
          'participant': data.selectedParticipant,
        }, { headers }).toPromise()
        .then(() => {
          this.loading = false;
          this.openSnackbar('Gebruiker ' + data.firstName + ' is aangemaakt');
          resolve();
        })
        .catch(() => {
          this.loading = false;
          this.openSnackbar('Er is iets mis gegaan met het aanmaken van de gebruiker');
        })
    });
  }

  deleteUser(firstName: string, userId: string) {
    const currentUser = this.authService.currentUserValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentUser.token
    });

    return new Promise(resolve => {
      this.loading = true;
      this.http.delete(this.USERS_URL + userId, { headers }).toPromise()
        .then(() => {
          this.loading = false;
          this.openSnackbar('Gebruiker ' + firstName + ' is verwijderd');
          resolve();
        })
        .catch(() => {
          this.loading = false;
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
      this.loading = true;
      this.http.get(this.USERS_SHIPMENTS_API_URL, { headers }).toPromise()
        .then((res) => {
          this.loading = false;
          resolve(res);
        })
        .catch((err) => {
          this.loading = false;
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
