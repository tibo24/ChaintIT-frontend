import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };


  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  emailLogin(email: string, password: string) {
    if (email && password) {
      console.log(email);
      console.log(password);
      /*this.authService.login(email, password);
      this.loginData.email = email;
      this.loginData.password = password;*/
    } else {
      this.openSnackbar('Gelieven een email/wachtwoord in te geven aub')
    }
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
