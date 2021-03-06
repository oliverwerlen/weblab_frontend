import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User;
  roles: string[] = [];

  constructor(private tokenStorage: TokenStorageService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUserRole();
      //this.goToLogin();
      console.log(this.roles);
    }
  }

  goToLogin(): void{
    this.router.navigate(["/login"]);
  }

}
