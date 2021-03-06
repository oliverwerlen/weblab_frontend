import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';;
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { TokenStorageService } from '../token-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  roles: string[] = [];
  post: any = '';
  hide = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, public dialog: MatDialog,private tokenStorage: TokenStorageService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]]
    });
  }


  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // not checking used emails in our application
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post): void {
    this.authService.register(post
    ).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.tokenStorage.saveToken(data.token);
        this.openSnackBar();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  routeToMyAccount(): void{
    this.router.navigate(["/myAccount"]);
  }

  openSnackBar() {
    this._snackBar.open("User created successfully", "Close", {
      duration: 2000,
    });
    this.reloadPage();
    this.routeToMyAccount();
  }

}
