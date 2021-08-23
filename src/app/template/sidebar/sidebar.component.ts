import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

  public user: any;

  public menu: any[] = [
    {
      state: 'dashboard',
      name: 'Inicio',
      roles: ['ROLE_ADMIN']
    },
    {
      state: 'aircraft',
      name: 'Aeronaves',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
      state: 'rentals',
      name: ' Rentar Aeronave',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  ];

  constructor(private _authService: AuthService,
    private _router: Router) {
    this.user = this._authService.getAuthInfo();
    this.menu = this.menu.filter((menu) =>
      menu.roles.some((componentRole) => this.user.roles.some((userRole) => userRole.name == componentRole))
    );
  }

  ngOnInit(): void {
  }

  public logOut() {
    this._authService.logOut().then(() => this._router.navigate(['/authentication/login']));
  }

}
