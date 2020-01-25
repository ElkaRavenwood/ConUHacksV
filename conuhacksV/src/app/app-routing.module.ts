import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
	{ path: 'list', component: ListComponent },
  { path: 'LoginComponent', component: LoginComponent},
  { path: 'SignupComponent', component:  SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
