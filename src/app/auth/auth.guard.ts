import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthService} from "../auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userBool: boolean = true;
    this.authService.user$.subscribe(async (user) => {
        if (!user) {
          userBool = true
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        }
      }
    );
    if (userBool){
      return true;
    }
    return false;
  }
}
