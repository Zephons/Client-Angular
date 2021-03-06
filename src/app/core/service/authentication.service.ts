import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public spring_port: string = environment.spring_port;
  private token: string;
  private loggedInUserName: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.spring_port}/user/login`, user, {observe: 'response'}); // the 2nd arguement is the request body; the meta data, namely the 3rd argument here is to ask for the whole reponse, including the header which contains the jwt token, otherwise without the last argument, by default it will only return a response body.
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.spring_port}/user/register`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null || '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '' && !this.jwtHelper.isTokenExpired(this.token)) { // this might need review
          this.loggedInUserName = this.jwtHelper.decodeToken(this.token).sub;
          return true;
      }
    } else {
      this.logOut();
      return false;
    }
  }
}
