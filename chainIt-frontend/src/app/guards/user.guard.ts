import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {

      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
