import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.location.reload();
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUserRole(): any {
    let token_decoded = jwt_decode(this.getToken());
    return token_decoded["role"];
  }

  public getUserId(): any {
    let token_decoded = jwt_decode(this.getToken());
    return token_decoded["id"];
  }
}
