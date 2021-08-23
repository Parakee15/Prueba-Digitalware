import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {
  constructor(private _authService: AuthService,
    private _router: Router) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]) {
    const user = this._authService.getAuthInfo();
    const roles: string[] = route.data.roles;
    const authorization: boolean = roles.some((componentRole) => user.roles.some((userRole) => userRole.name == componentRole));
    console.log('authorization :>> ', authorization);
    if (!authorization) {
      switch (user.roles.some((rol: any) => rol.name == 'ROLE_ADMIN')) {
        case true:
          this._router.navigate(['/dashboard']);
          break;

        default:
          this._router.navigate(['/rentals']);
          break;
      }
    }
    return authorization;
  }
}
