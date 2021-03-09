import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { User } from './user/user';

const authUrl = 'http://weblab-f21-ffischer.el.eee.intern:3000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private http: HttpClient) { }

  login(formData): Observable<any> {
    let credentials = JSON.stringify({ "username": formData["name"], "password": formData["password"]});

    console.log(credentials)
    return this.http.post(authUrl + '/login', credentials, this.httpOptions);
  }

  register(formData): Observable<any> {
    let user = JSON.stringify({ "username": formData["name"], "password": formData["password"], "email": formData["email"],  "role": 'user' });
    console.log(user);
    return this.http.post(authUrl + '/register', user, this.httpOptions);
  }

  getUser(): Observable<any> {
    return this.http.get(authUrl + '/user', this.httpOptions);
  }
}
