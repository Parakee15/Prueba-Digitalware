import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { SignInAppComponent } from './sign-in-app/sign-in-app.component';


@NgModule({
  declarations: [LoginComponent, SignInAppComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ], providers: []
})
export class AuthModule { }
