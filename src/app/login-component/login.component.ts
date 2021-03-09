import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';;
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  formGroup: FormGroup;
  post: any = '';
  hide=true;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUserRole();
      console.log(this.roles);
      this.openSnackBar("You are already logged in")
      //this.routeToMyAccount();
    }
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  submit(post): void {
    this.authService.login(post).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(this.roles);
        this.openSnackBar("User created sucessfully");
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  routeToMyAccount(): void{
    this.router.navigate(["/myAccount"]);
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2000
    });
    this.reloadPage();
    this.routeToMyAccount();
  }

}
