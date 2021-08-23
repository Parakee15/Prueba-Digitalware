import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignInAppComponent } from './sign-in-app/sign-in-app.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            }
        ]
    },
    {
        path: '',
        children: [
            {
                path: 'sign-in',
                component: SignInAppComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
