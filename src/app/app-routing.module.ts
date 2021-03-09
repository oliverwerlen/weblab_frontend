import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BlogentriesComponent } from './blogentries/blogentries.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login-component/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/#/dashboard', pathMatch: 'full' },
  { path: '/#/dashboard', component: DashboardComponent }, 
  { path: '/#/blog', component: BlogComponent }, 
  { path: '/#/blog/:id', component: BlogentriesComponent },
  { path: '/#/myAccount', component: MyAccountComponent }, 
  { path: '/#/register', component: RegisterComponent}, 
  { path: '/#/login', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ], 
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
