import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if(currentUser) {
      this.authService.setUserData(currentUser);
    }
  }

  login(email: string, password: string) {
    if (email && password) {
      this.authService.login(email, password);
    } else {
      this.openSnackbar('Gelieven uw email/wachtwoord in te geven aub')
    }
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
