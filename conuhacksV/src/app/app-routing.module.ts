import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { LogOutComponent } from './log-out/log-out.component';

const routes: Routes = [
	{ path: 'list', component: ListComponent },
	{ path: 'profile', component: ProfileComponent },
  { path: 'LoginComponent', component: LoginComponent},
  { path: 'SignupComponent', component:  SignupComponent},
  { path: 'logout', component:  LogOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
