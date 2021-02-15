import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'blog', component: BlogComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ], 
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
