import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {EMPTY, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IUserDto} from "../models/IUserDto";
import {map, switchMapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user?: User;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(loginOrEmail: string, password: string): Observable<User> {
    return this.httpClient.post<IUserDto>(`${environment.api}/user/login`, {login: loginOrEmail, password})
      .pipe(map(user => new User({login: user.login, email: user.email, token: user.token})));
  }

  register(login: string, password: string, email: string): Observable<void> {
    return this.httpClient.post<IUserDto>(`${environment.api}/user/register`, {login, password, email})
      .pipe(switchMapTo(EMPTY));
  }

  deauthenticate(): Observable<void> {
    return of<void>().pipe(tap(() => {
      this.user = null;
    }));
  }

  getToken(): string {
    return this.user.token;
  }
}
