import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BlogentriesComponent } from './blogentries/blogentries.component';
import { UserComponent } from './user/user.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { MyAccountComponent } from './my-account/my-account.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login-component/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authInterceptorProviders } from './auth.interceptor';
import { MatFileUploadModule } from 'angular-material-fileupload'



@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    DashboardComponent,
    BlogentriesComponent,
    UserComponent,
    MyAccountComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule, 
    MatCardModule, 
    MatSidenavModule, 
    MatListModule,
    MatIconModule, 
    MatToolbarModule, 
    MatButtonModule, 
    HttpClientModule, 
    MatExpansionModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatRippleModule, 
    MatGridListModule, 
    MatMenuModule, 
    MatFormFieldModule, 
    MatDialogModule, 
    MatSnackBarModule, 
    MatFileUploadModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
