import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api: string = environment.APIEndPoint;
  readonly LOGIN_API_URL = this.api + 'users/login';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  loading: boolean;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    this.meldAan(email, password);
  }

  meldAan(email: string, password: string) {
    this.loading = true;
    return this.http.post(this.LOGIN_API_URL, { email, password })
      .subscribe(
        (res) => {
          this.setUserData(res);
          this.loading = false;
        },
        (error) => {
          this.openSnackbar('Er is iets mis gegaan met het inloggen, gelieven je email/wachtwoord na te kijken')
          this.loading = false;
        }
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  setUserData(user) {
    if (user && user.token) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      if(user.role === "User") {
        this.router.navigate(['/main-dashboard']);
      }
      if(user.role === "Admin") {
        this.router.navigate(['/admin/shipments']);
      }
    } else {
      this.currentUserSubject.next(null);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
