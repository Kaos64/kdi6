import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './screens/login.component';
import { LogoutComponent } from './screens/logout.component';
import { RegisterComponent } from './screens/register.component';
import { ForgotPasswordComponent } from './screens/forgot-password.component';
import { ResetComponent } from './screens/reset.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'prefix'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset', component: ResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KdiAuthRoutingModule { }
