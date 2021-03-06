import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, } from '@angular/core';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'travelBlogg';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private roles: string[] = [];
  isLoggedIn = false;
  showLoggedInNav = false;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private tokenStorageService: TokenStorageService) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    if(this.isLoggedIn){
      this.showLoggedInNav = true;
      this.roles = this.tokenStorageService.getUserRole();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
  logout(){
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
  }
  
}
