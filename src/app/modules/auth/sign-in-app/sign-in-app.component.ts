import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../core/services/form.service';
import { UserService } from '../../../core/services/user.service';
import { AlertService } from '../../../core/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-app',
  templateUrl: './sign-in-app.component.html',
  styleUrls: ['./sign-in-app.component.scss']
})
export class SignInAppComponent implements OnInit {

  public formSignIn: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private _router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formSignIn = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  public onSubmit() {
    if (!FormService.validateForm(this.formSignIn)) return;
    this.save(this.formSignIn.value);
  }

  public save(data: any) {
    this._userService.save(data).subscribe((res) => {
      this._alertService.openSwal({
        title: 'Información',
        text: 'Guardada con exito, ¡Ingresa con tu nuevo usuario!',
        icon: 'success',
      });
      this._router.navigate(['/authentication/login'])
    }, (err) => {
    });
  }

}
