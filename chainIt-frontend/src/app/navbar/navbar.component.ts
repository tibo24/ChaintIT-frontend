import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { Role } from '../models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modeView: String;
  currentUser: User;

  mode = this.breakpointObserver.observe(Breakpoints.Large)
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.modeView = 'side';
      } else {
        this.modeView = 'push';
      }
    }
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
  }

  windowResize() {
    window.dispatchEvent(new Event('resize'));
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isUser() {
    return this.currentUser && this.currentUser.role != Role.Admin;
  }

  getIsLoggedIn() {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
  }

}
