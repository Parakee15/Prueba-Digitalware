import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userList: [];

  constructor(private _userService: UserService,
    private _alertService: AlertService) {
    this.getAll();
  }

  ngOnInit(): void {
  }

  private getAll() {
    this._userService.get().subscribe((res) => {
      this.userList = res.data.map((a: any) => {
        a.rolesDesc = a.roles.map((b: any) => b.name).join(', ');
        return a;
      });
    }, (err) => {
      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error consultando los usuarios registrados',
      //   icon: 'warning',
      // });
    });
  }

}
