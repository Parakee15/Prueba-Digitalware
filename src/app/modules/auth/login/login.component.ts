import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService as FormHelper } from '../../../core/services/form.service';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { JwtService } from '../../../core/services/jwt.service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService,
    private _jwtService: JwtService,
    private _userService: UserService,
    private _router: Router) { }


  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formLogin = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public onSubmit() {
    if (!FormHelper.validateForm(this.formLogin)) return;
    this.login(this.formLogin.value);
  }

  private login(data: any) {
    this._authService.login(data).subscribe((res) => this.saveSession(res),
      (err) => {
        console.log('login err :>> ', err);
        this._alertService.openSwal({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error'
        })
      }
    );
  }

  private saveSession(jwt: any) {
    this._jwtService.setJwt(jwt).then((resSetJwt) => {
      this._userService.getById(jwt.user_id).subscribe((resById) => {
        this._authService.setAuthInfo(resById.data).then((resSetAuthInfo) => {
          this._router.navigate(['/dashboard'])
        });
      });
    });

  }
}
